/* =========================================================
   contact.js — contact form via Web3Forms (static-site friendly).
   If the form can't send, it falls back to the visitor's email app.
   ========================================================= */

(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var site = window.SITE || {};
  var statusEl = document.getElementById("formStatus");
  var mini = document.getElementById("miniBoard");
  var button = form.querySelector('button[type="submit"]');

  /* ---------- validation with inline messages ---------- */
  var rules = {
    name: function (v) { return v ? "" : "Enter your name."; },
    email: function (v) {
      if (!v) return "Enter your email so I can reply.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "That email doesn't look right. Check it and try again.";
    },
    message: function (v) { return v ? "" : "Write a short message."; }
  };

  function showError(field, msg) {
    var id = field.id + "-error";
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement("p");
      el.className = "error";
      el.id = id;
      field.parentNode.appendChild(el);
    }
    el.textContent = msg;
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) field.setAttribute("aria-describedby", id); else field.removeAttribute("aria-describedby");
  }

  function validate() {
    var firstBad = null;
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      var msg = rules[name](field.value.trim());
      showError(field, msg);
      if (msg && !firstBad) firstBad = field;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  // clear an error as soon as the visitor edits the field
  Object.keys(rules).forEach(function (name) {
    form.elements[name].addEventListener("input", function () {
      if (this.getAttribute("aria-invalid") === "true") showError(this, "");
    });
  });

  /* ---------- fallback: open the visitor's email app ---------- */
  function mailtoHref() {
    var body = form.elements.message.value + "\n\n" + form.elements.name.value + " (" + form.elements.email.value + ")";
    return "mailto:" + site.email + "?subject=" + encodeURIComponent("Portfolio enquiry") + "&body=" + encodeURIComponent(body);
  }

  function say(msg, kind) {
    statusEl.className = "form-status" + (kind ? " " + kind : "");
    statusEl.innerHTML = msg;
  }

  function solved() {
    say("Sent. Thanks, I'll get back to you soon.", "ok");
    form.reset();
    if (mini) {
      var you = mini.querySelector(".you");
      you.textContent = "5";
      you.classList.remove("you");
      mini.classList.add("solved");
    }
  }

  /* ---------- submit ---------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;

    var keyMissing = !site.web3formsKey || site.web3formsKey.indexOf("TODO") === 0;
    if (keyMissing) {
      // form service not set up yet: hand over to the email app instead
      location.href = mailtoHref();
      say('Your email app should open with the message ready. If it doesn\'t, write to <a href="mailto:' + site.email + '">' + site.email + "</a>.");
      return;
    }

    button.disabled = true;
    say("Sending…");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: site.web3formsKey,
        subject: "New message from your portfolio",
        from_name: "Portfolio: " + form.elements.name.value,
        name: form.elements.name.value,
        email: form.elements.email.value,
        message: form.elements.message.value,
        botcheck: form.elements.botcheck.checked
      })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) solved();
        else throw new Error(data.message || "failed");
      })
      .catch(function () {
        say('That didn\'t send. <a href="' + mailtoHref() + '">Send it by email instead</a>, and nothing you typed is lost.', "err");
      })
      .then(function () { button.disabled = false; });
  });
})();
