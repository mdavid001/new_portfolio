/* =========================================================
   board.js — the hero Sudoku that solves itself.
   Uses a hard-coded valid solution (no solver needed).
   When a row, column or box completes, its cells flash green.
   One cell is left empty and yellow: that one is for you.
   ========================================================= */

(function () {
  "use strict";

  var board = document.getElementById("board");
  if (!board) return;

  // a valid, solved Sudoku, row by row
  var SOLUTION = [
    5,3,4, 6,7,8, 9,1,2,
    6,7,2, 1,9,5, 3,4,8,
    1,9,8, 3,4,2, 5,6,7,
    8,5,9, 7,6,1, 4,2,3,
    4,2,6, 8,5,3, 7,9,1,
    7,1,3, 9,2,4, 8,5,6,
    9,6,1, 5,3,7, 2,8,4,
    2,8,7, 4,1,9, 6,3,5,
    3,4,5, 2,8,6, 1,7,9
  ];

  // starting digits (1 = given). Row 5 keeps a few so the mobile strip looks alive.
  var GIVEN = [
    1,1,0, 0,1,0, 0,0,0,
    1,0,0, 1,1,1, 0,0,0,
    0,1,1, 0,0,0, 0,1,0,
    1,0,0, 0,1,0, 0,0,1,
    1,0,0, 0,0,1, 0,0,1,
    1,0,0, 0,1,0, 0,0,1,
    0,1,0, 0,0,0, 1,1,0,
    0,0,0, 1,1,1, 0,0,1,
    0,0,0, 0,1,0, 0,1,1
  ];

  var OPEN = 4 * 9 + 3;                         // row 5, column 4 stays empty for "you"
  var NOTES = { 12: "3 7", 30: "6 7", 58: "4 7" }; // a few pencil marks before they get solved

  var cells = [];
  var filled = [];
  var timer = null;

  /* ---------- build the 81 cells ---------- */
  for (var i = 0; i < 81; i++) {
    var r = Math.floor(i / 9), c = i % 9;
    var d = document.createElement("div");
    d.className = "cell" +
      (c === 2 || c === 5 ? " box-r" : "") +
      (r === 2 || r === 5 ? " box-b" : "") +
      (r === 8 ? " last-row" : "");
    d.dataset.r = r;
    if (GIVEN[i]) { d.textContent = SOLUTION[i]; d.classList.add("given"); }
    else if (NOTES[i]) { d.textContent = NOTES[i]; d.classList.add("notes"); }
    if (i === OPEN) d.classList.add("open");
    d.addEventListener("animationend", function () { this.classList.remove("flash"); });
    board.appendChild(d);
    cells.push(d);
    filled.push(!!GIVEN[i]);
  }

  /* ---------- helpers ---------- */
  function unitsOf(i) {
    var r = Math.floor(i / 9), c = i % 9, br = r - r % 3, bc = c - c % 3;
    var row = [], col = [], box = [];
    for (var k = 0; k < 9; k++) { row.push(r * 9 + k); col.push(k * 9 + c); }
    for (var a = 0; a < 3; a++) for (var b = 0; b < 3; b++) box.push((br + a) * 9 + bc + b);
    return [row, col, box];
  }

  function place(i) {
    var d = cells[i];
    d.classList.remove("notes");
    d.classList.add("filled");
    d.textContent = SOLUTION[i];
    filled[i] = true;
  }

  function flash(unit) {
    unit.forEach(function (j) {
      var d = cells[j];
      d.classList.remove("flash");
      void d.offsetWidth;            // restart the animation
      d.classList.add("flash");
    });
  }

  /* ---------- the order cells get solved in ----------
     Shuffled (with a fixed seed, so it's the same every visit),
     then the bottom row last so it visibly "clicks into place". */
  var order = [], lastRow = [];
  for (var j = 0; j < 81; j++) {
    if (filled[j] || j === OPEN) continue;
    (j >= 72 ? lastRow : order).push(j);
  }
  var seed = 7;
  function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  for (var k = order.length - 1; k > 0; k--) {
    var m = Math.floor(rand() * (k + 1));
    var t = order[k]; order[k] = order[m]; order[m] = t;
  }
  order = order.concat(lastRow);

  /* ---------- play / finish ---------- */
  function finish() {
    clearTimeout(timer);
    order.forEach(function (j) { if (!filled[j]) place(j); });
  }

  function play() {
    var step = 0;
    function next() {
      if (step >= order.length) return;
      var i = order[step++];
      place(i);
      unitsOf(i).forEach(function (unit) {
        if (unit.every(function (j) { return filled[j]; })) flash(unit);
      });
      timer = setTimeout(next, i >= 72 ? 160 : 55);   // slow down for the last row
    }
    timer = setTimeout(next, 500);
  }

  window.Board = { finish: finish };

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || document.body.classList.contains("plain")) finish();
  else play();
})();
