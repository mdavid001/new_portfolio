/* =========================================================
   site.js — shared helpers used on every page.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- small helpers, shared through window.U ---------- */

  // escape text before putting it into HTML
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // content that still needs Michelle's input starts with "[TODO"
  function isTodo(s) { return typeof s === "string" && s.trim().indexOf("[TODO") === 0; }

  // safe text, with TODO items visibly marked
  function text(s) {
    return isTodo(s) ? '<span class="todo">' + esc(s) + "</span>" : esc(s);
  }

  // a usable link exists (not empty, not a TODO)
  function hasLink(s) { return !!s && !isTodo(s); }

  // replace a missing image with a neat "coming soon" card
  function swapForPlaceholder(img) {
    var ph = document.createElement("div");
    ph.className = "ph";
    ph.textContent = img.getAttribute("data-fallback") || "Screenshot coming";
    img.replaceWith(ph);
  }

  function watchImage(img) {
    if (img.complete && img.naturalWidth === 0) { swapForPlaceholder(img); return; }
    img.addEventListener("error", function () { swapForPlaceholder(img); }, { once: true });
  }

  /* ---------- recruiter mode ("Skip the puzzle") ----------
     Kept in the URL (?view=plain) so it survives moving between
     pages in one visit, and is forgotten next time. No cookies. */
  var plain = new URLSearchParams(location.search).get("view") === "plain";
  if (plain) document.body.classList.add("plain");

  // add ?view=plain to an internal URL when recruiter mode is on
  function withView(url) {
    if (!document.body.classList.contains("plain")) return url;
    return url + (url.indexOf("?") > -1 ? "&" : "?") + "view=plain";
  }

  window.U = { esc: esc, isTodo: isTodo, text: text, hasLink: hasLink, watchImage: watchImage, withView: withView };

  /* ---------- run on every page ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var site = window.SITE || {};

    // keep contact links in sync with data.js
    document.querySelectorAll(".js-email").forEach(function (a) { a.href = "mailto:" + site.email; });
    document.querySelectorAll(".js-whatsapp").forEach(function (a) {
      a.href = "https://wa.me/" + site.whatsapp + "?text=" + encodeURIComponent("Hi Michelle, I saw your portfolio.");
    });

    // newspaper dateline: today's date
    var today = document.getElementById("today");
    if (today) {
      today.textContent = new Date().toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      });
    }

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    document.querySelectorAll("img[data-fallback]").forEach(watchImage);
  });
})();
