/* =========================================================
   home.js — The nine (projects grid), tool filter, keyboard
   shortcuts, row/column hover, and recruiter mode.
   Everything is built from window.PROJECTS in data.js.
   ========================================================= */

(function () {
  "use strict";

  var U = window.U;
  var projects = window.PROJECTS || [];
  var grid = document.getElementById("nineGrid");
  var filtersEl = document.getElementById("filters");
  var statusEl = document.getElementById("filterStatus");
  var plainList = document.getElementById("plainList");
  var plainSection = document.getElementById("plain");
  var toggle = document.getElementById("plainToggle");

  function projectUrl(p) { return U.withView("project.html?id=" + encodeURIComponent(p.id)); }

  /* ---------- 1. Build the nine cells ---------- */
  function cellHTML(p, i) {
    var live = U.hasLink(p.links.live)
      ? '<a href="' + U.esc(p.links.live) + '" target="_blank" rel="noopener">Live site ↗<span class="visually-hidden"> (opens in a new tab)</span></a>'
      : "";

    return (
      '<li class="cellcard" data-r="' + Math.floor(i / 3) + '" data-c="' + (i % 3) + '" data-tools="' + U.esc(p.tools.join("|")) + '">' +
        '<div class="cellcard-top">' +
          '<span class="digit" aria-hidden="true">' + (i + 1) + "</span>" +
          (p.status ? '<span class="status">' + U.esc(p.status) + "</span>" : "") +
        "</div>" +
        '<figure class="thumb"><img src="' + U.esc(p.cover.src) + '" alt="' + U.esc(p.cover.alt) +
          '" width="800" height="500" loading="lazy" decoding="async" data-fallback="Screenshot coming"></figure>' +
        '<h3><a href="' + projectUrl(p) + '"><span class="visually-hidden">Project ' + (i + 1) + ": </span>" + U.esc(p.name) + "</a></h3>" +
        '<p class="one-liner">' + U.esc(p.oneLiner) + "</p>" +
        '<ul class="chips" aria-label="Tech stack">' + p.tools.map(function (t) { return "<li>" + U.esc(t) + "</li>"; }).join("") + "</ul>" +
        '<p class="match-note"></p>' +
        '<div class="cell-links"><span class="read" aria-hidden="true">Case study →</span>' + live + "</div>" +
      "</li>"
    );
  }

  grid.innerHTML = projects.map(cellHTML).join("");
  grid.querySelectorAll("img").forEach(U.watchImage);
  var cells = Array.prototype.slice.call(grid.children);

  /* ---------- 2. Tool filter (same-number highlight) ---------- */
  var active = null;

  function applyFilter(tool) {
    active = tool;
    var names = [];

    filtersEl.querySelectorAll(".pill").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.tool === tool));
    });

    cells.forEach(function (cell, i) {
      var uses = !!tool && cell.dataset.tools.split("|").indexOf(tool) > -1;
      cell.classList.toggle("match", uses);
      cell.querySelector(".match-note").textContent = uses ? "Uses " + tool : "";
      if (uses) names.push(projects[i].name);
    });

    // say it in words too, so colour isn't the only signal
    statusEl.textContent = tool
      ? tool + ": " + names.length + (names.length === 1 ? " project" : " projects") + " (" + names.join(", ") + ")"
      : "";
  }

  window.FILTERS.forEach(function (tool) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "pill";
    b.dataset.tool = tool;
    b.textContent = tool;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () { applyFilter(active === tool ? null : tool); });
    filtersEl.appendChild(b);
  });

  /* ---------- 3. Row and column highlight on hover/focus (3-column layout only) ---------- */
  var wide = window.matchMedia("(min-width: 960px)");

  function highlightPeers(cell) {
    cells.forEach(function (c) {
      var peer = !!cell && wide.matches && c !== cell && (c.dataset.r === cell.dataset.r || c.dataset.c === cell.dataset.c);
      c.classList.toggle("peer", peer);
    });
  }

  cells.forEach(function (cell) {
    cell.addEventListener("mouseenter", function () { highlightPeers(cell); });
    cell.addEventListener("focusin", function () { highlightPeers(cell); });
  });
  grid.addEventListener("mouseleave", function () { highlightPeers(null); });
  grid.addEventListener("focusout", function (e) { if (!grid.contains(e.relatedTarget)) highlightPeers(null); });

  /* ---------- 4. Keys 1-9 open a project ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
    var t = e.target;
    if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;   // typing in the form
    if (!/^[1-9]$/.test(e.key)) return;
    var p = projects[Number(e.key) - 1];
    if (p) location.href = projectUrl(p);
  });

  /* ---------- 5. Recruiter mode: plain list from the same data ---------- */
  plainList.innerHTML = projects.map(function (p, i) {
    var live = U.hasLink(p.links.live) ? ' · <a href="' + U.esc(p.links.live) + '" target="_blank" rel="noopener">Live site</a>' : "";
    return (
      "<li>" +
        '<h3><a href="' + projectUrl(p) + '">' + (i + 1) + ". " + U.esc(p.name) + "</a></h3>" +
        "<p>" + U.esc(p.oneLiner) + (p.status ? " (" + U.esc(p.status) + ")" : "") + "</p>" +
        '<p class="meta">' + U.esc(p.tools.join(", ")) + live + "</p>" +
      "</li>"
    );
  }).join("");

  function setPlain(on) {
    document.body.classList.toggle("plain", on);
    plainSection.hidden = !on;
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "Back to the puzzle" : "Skip the puzzle";

    // keep the choice in the URL for this visit only
    var url = new URL(location.href);
    if (on) url.searchParams.set("view", "plain"); else url.searchParams.delete("view");
    history.replaceState(null, "", url);

    // project links pick up (or drop) ?view=plain
    cells.forEach(function (c, i) { c.querySelector("h3 a").href = projectUrl(projects[i]); });
    plainList.querySelectorAll("h3 a").forEach(function (a, i) { a.href = projectUrl(projects[i]); });

    if (!on && window.Board) window.Board.finish();   // show the finished board, no replay
  }

  toggle.addEventListener("click", function () { setPlain(!document.body.classList.contains("plain")); });
  if (document.body.classList.contains("plain")) setPlain(true);
})();
