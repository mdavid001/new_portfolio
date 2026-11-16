/* =========================================================
   project.js — renders one case study from data.js.
   URL: project.html?id=sibas   (ids are in data.js)
   ========================================================= */

(function () {
  "use strict";

  var U = window.U;
  var projects = window.PROJECTS || [];
  var params = new URLSearchParams(location.search);
  var index = projects.findIndex(function (p) { return p.id === params.get("id"); });
  var caseEl = document.getElementById("case");
  var pager = document.getElementById("pager");

  // links back to the home page keep recruiter mode if it's on
  document.querySelectorAll(".js-home").forEach(function (a) {
    var hash = a.getAttribute("href").split("#")[1];
    a.href = U.withView("./") + (hash ? "#" + hash : "");
  });
  document.getElementById("homeLink").href = U.withView("./");

  function url(p) { return U.withView("project.html?id=" + encodeURIComponent(p.id)); }

  /* ---------- unknown id ---------- */
  if (index === -1) {
    document.title = "Project not found · Michelle David";
    caseEl.innerHTML =
      '<h1 class="case-missing">That cell is empty.</h1>' +
      '<p>There\'s no project with that name. <a href="' + U.withView("./") + '#nine">See all nine projects</a>.</p>';
    return;
  }

  var p = projects[index];
  var n = index + 1;

  /* ---------- page title, description and share tags ---------- */
  document.title = p.name + " · Michelle David";
  function setMeta(sel, value) { var m = document.querySelector(sel); if (m) m.setAttribute("content", value); }
  setMeta('meta[name="description"]', p.summary);
  setMeta('meta[property="og:title"]', p.name + " · Michelle David");
  setMeta('meta[property="og:description"]', p.summary);

  /* ---------- building blocks ---------- */
  function paras(list) { return list.map(function (t) { return "<p>" + U.text(t) + "</p>"; }).join(""); }
  function items(list) { return list.map(function (t) { return "<li>" + U.text(t) + "</li>"; }).join(""); }

  // one case-study section: heading, the assignment requirement it covers, body
  function section(id, title, req, body) {
    return (
      '<section class="case-sec" aria-labelledby="h-' + id + '">' +
        '<div class="sec-label"><h2 id="h-' + id + '">' + title + '</h2><p class="req-label">' + req + "</p></div>" +
        '<div class="sec-body">' + body + "</div>" +
      "</section>"
    );
  }

  function linkButton(href, label, primary) {
    if (U.hasLink(href)) {
      return '<a class="btn' + (primary ? " btn-primary" : "") + '" href="' + U.esc(href) + '" target="_blank" rel="noopener">' +
        label + ' ↗<span class="visually-hidden"> (opens in a new tab)</span></a>';
    }
    return U.isTodo(href) ? '<span class="todo">' + U.esc(href) + "</span>" : "";
  }

  // an image you can tap to see in full (opens the lightbox below)
  function zoomable(cls, src, alt, caption, w, h, loading, fallback) {
    return (
      '<button type="button" class="zoom ' + cls + '" data-caption="' + U.esc(caption) + '">' +
        '<img src="' + U.esc(src) + '" alt="' + U.esc(alt) + '" width="' + w + '" height="' + h +
          '" loading="' + loading + '" decoding="async" data-fallback="' + U.esc(fallback) + '">' +
        '<span class="zoom-hint" aria-hidden="true">View full image</span>' +
        '<span class="visually-hidden"> (view full image)</span>' +
      "</button>"
    );
  }

  var shots = p.shots.map(function (s) {
    return (
      '<figure class="shot">' +
        zoomable("shot-frame", s.src, s.alt, s.caption, 1200, 750, "lazy", "Screenshot coming: " + s.caption) +
        '<figcaption class="pencil">' + U.esc(s.caption) + "</figcaption>" +
      "</figure>"
    );
  }).join("");

  var tech = '<dl class="tech">' + p.tech.map(function (t) {
    return "<div><dt>" + U.text(t.name) + "</dt><dd>" + U.text(t.use) + "</dd></div>";
  }).join("") + "</dl>";

  var meta = [p.role, p.dates].filter(Boolean).map(U.esc).join(" · ");

  /* ---------- the page ---------- */
  caseEl.innerHTML =
    '<header class="case-head">' +
      '<span class="case-digit" aria-hidden="true">' + n + "</span>" +
      "<div>" +
        '<p class="kicker">Project ' + n + " of " + projects.length + (p.status ? " · " + U.esc(p.status) : "") + "</p>" +
        "<h1>" + U.esc(p.name) + "</h1>" +
        '<p class="case-meta">' + meta + "</p>" +
        '<ul class="chips" aria-label="Tech stack">' + p.tools.map(function (t) { return "<li>" + U.esc(t) + "</li>"; }).join("") + "</ul>" +
        '<div class="actions">' + linkButton(p.links.live, "Live site", true) + linkButton(p.links.code, "GitHub / code", false) + "</div>" +
      "</div>" +
    "</header>" +

    '<figure class="case-cover">' + zoomable("cover-frame", p.cover.src, p.cover.alt, p.name, 1600, 1000, "eager", "Screenshot coming") + "</figure>" +

    section("overview", "Overview", "Full description", paras(p.overview)) +
    section("givens", "Givens", "Problem I solved", paras(p.problem)) +
    section("constraints", "Constraints", "What made it hard", '<ul class="constraint-list">' + items(p.constraints) + "</ul>") +
    section("built", "What I built", "Features", '<ol class="feature-list">' + items(p.features) + "</ol>") +
    section("shots", "Screenshots", "Screenshots", '<div class="shots">' + shots + "</div>") +
    section("tech", "Technologies", "Technologies used", tech) +
    section("learned", "What I learned", "What I learned", paras(p.learned));

  caseEl.querySelectorAll("img[data-fallback]").forEach(U.watchImage);

  /* ---------- lightbox: tap an image to see it in full ----------
     Uses the built-in <dialog>, which handles Esc, focus and screen readers. */
  var lb = document.createElement("dialog");
  lb.className = "lightbox";
  lb.setAttribute("aria-label", "Full-size image");
  lb.innerHTML =
    '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-caption"></figcaption></figure>' +
    '<button type="button" class="lb-btn lb-close" aria-label="Close">✕</button>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">‹</button>' +
    '<button type="button" class="lb-btn lb-next" aria-label="Next image">›</button>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector(".lb-img");
  var lbCap = lb.querySelector(".lb-caption");
  var gallery = [];   // images that actually loaded (placeholders are skipped)
  var current = 0;

  function show(i) {
    current = (i + gallery.length) % gallery.length;
    var btn = gallery[current];
    var img = btn.querySelector("img");
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = btn.dataset.caption + (gallery.length > 1 ? "  ·  " + (current + 1) + " of " + gallery.length : "");
    lb.classList.toggle("single", gallery.length < 2);
  }

  caseEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".zoom");
    if (!btn || !btn.querySelector("img")) return;          // placeholder: nothing to open
    gallery = Array.prototype.filter.call(caseEl.querySelectorAll(".zoom"), function (b) {
      var img = b.querySelector("img");
      return img && img.naturalWidth > 0;
    });
    var i = gallery.indexOf(btn);
    if (i === -1) return;
    show(i);
    lb.showModal();
  });

  lb.querySelector(".lb-close").addEventListener("click", function () { lb.close(); });
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });

  // tap the dark area around the image to close
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.classList.contains("lb-figure")) lb.close();
  });

  lb.addEventListener("keydown", function (e) {
    if (gallery.length < 2) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
  });

  /* ---------- previous / next ---------- */
  var prev = projects[(index - 1 + projects.length) % projects.length];
  var next = projects[(index + 1) % projects.length];
  pager.innerHTML =
    '<a class="pager-link" href="' + url(prev) + '" rel="prev"><span class="pager-dir">← Previous</span><span class="pager-name">' + U.esc(prev.name) + "</span></a>" +
    '<a class="pager-home" href="' + U.withView("./") + '#nine">Back to the nine</a>' +
    '<a class="pager-link pager-next" href="' + url(next) + '" rel="next"><span class="pager-dir">Next →</span><span class="pager-name">' + U.esc(next.name) + "</span></a>";

  /* ---------- keys 1-9 jump between projects ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || lb.open) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
    if (!/^[1-9]$/.test(e.key)) return;
    var target = projects[Number(e.key) - 1];
    if (target && target !== p) location.href = url(target);
  });
})();