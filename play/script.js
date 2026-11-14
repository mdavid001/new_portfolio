const $ = s => document.querySelector(s);

let sol;                 // full solution
let puz;                 // starting puzzle (0 = empty); these cells are the "givens"
let board;               // what's currently on the board
let notes;               // notes[i] is a Set of pencil-mark numbers for cell i
let sel = -1;            // selected cell index (0-80), -1 = none
let won = false;
let notesMode = false;

/* ---------- puzzle generation ---------- */

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// can value v go at index i without clashing in its row, column or box?
function ok(g, i, v) {
  const r = (i / 9) | 0, c = i % 9;
  for (let k = 0; k < 9; k++) {
    if (g[r * 9 + k] === v || g[k * 9 + c] === v) return false;
  }
  const br = r - (r % 3), bc = c - (c % 3);
  for (let a = 0; a < 3; a++)
    for (let b = 0; b < 3; b++)
      if (g[(br + a) * 9 + bc + b] === v) return false;
  return true;
}

// backtracking: fill the grid with a random valid solution
function fill(g) {
  const i = g.indexOf(0);
  if (i < 0) return true;
  for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (ok(g, i, v)) {
      g[i] = v;
      if (fill(g)) return true;
      g[i] = 0;
    }
  }
  return false;
}

function newGame() {
  sol = Array(81).fill(0);
  fill(sol);
  puz = sol.slice();
  shuffle([...Array(81).keys()]).slice(0, +$('#diff').value).forEach(i => (puz[i] = 0));
  board = puz.slice();
  notes = Array.from({ length: 81 }, () => new Set());
  sel = -1;
  won = false;
  $('#msg').textContent = '';
  render();
}

/* ---------- helpers ---------- */

// are cells a and b in the same row, column or box?
function sameUnit(a, b) {
  const ra = (a / 9) | 0, ca = a % 9, rb = (b / 9) | 0, cb = b % 9;
  return ra === rb || ca === cb || (((ra / 3) | 0) === ((rb / 3) | 0) && ((ca / 3) | 0) === ((cb / 3) | 0));
}

// does cell i duplicate a number somewhere in its row, column or box?
function bad(i) {
  const v = board[i];
  if (!v) return false;
  for (let j = 0; j < 81; j++) {
    if (j !== i && board[j] === v && sameUnit(i, j)) return true;
  }
  return false;
}

// the 9 cell indexes of the row, column or box that contains cell i
function unitCells(type, i) {
  const r = (i / 9) | 0, c = i % 9, out = [];
  if (type === 'row') for (let k = 0; k < 9; k++) out.push(r * 9 + k);
  else if (type === 'col') for (let k = 0; k < 9; k++) out.push(k * 9 + c);
  else {
    const br = r - (r % 3), bc = c - (c % 3);
    for (let a = 0; a < 3; a++)
      for (let b = 0; b < 3; b++) out.push((br + a) * 9 + bc + b);
  }
  return out;
}

// full and correct = nine different numbers, no empty cells
function unitDone(cells) {
  return cells.every(i => board[i]) && new Set(cells.map(i => board[i])).size === 9;
}

/* ---------- drawing ---------- */

function build() {
  const g = $('#grid');
  for (let i = 0; i < 81; i++) {
    const d = document.createElement('div');
    const r = (i / 9) | 0, c = i % 9;
    d.className = 'c' + (c === 2 || c === 5 ? ' cb' : '') + (r === 2 || r === 5 ? ' rb' : '');
    d.onclick = () => { sel = i; render(); };
    d.addEventListener('animationend', () => {
      d.classList.remove('flash');
      d.style.animationDelay = '';
    });
    g.appendChild(d);
  }

  const p = $('#pad');
  for (let n = 1; n <= 9; n++) {
    const b = document.createElement('button');
    b.textContent = n;
    b.onclick = () => enter(n);
    p.appendChild(b);
  }
  const e = document.createElement('button');
  e.textContent = '⌫';
  e.setAttribute('aria-label', 'Erase');
  e.onclick = () => enter(0);
  p.appendChild(e);
}

function render() {
  [...$('#grid').children].forEach((d, i) => {
    // content: a number, or pencil marks, or nothing
    if (board[i]) {
      d.textContent = board[i];
    } else if (notes[i].size) {
      d.innerHTML =
        '<div class="notes">' +
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<span>${notes[i].has(n) ? n : ''}</span>`).join('') +
        '</div>';
    } else {
      d.textContent = '';
    }

    // classes (keep the structural ones and any running animation)
    const cls = d.className.split(' ').filter(c => ['c', 'cb', 'rb', 'flash'].includes(c));
    if (sel >= 0 && i !== sel && sameUnit(sel, i)) cls.push('peer');
    if (i === sel) cls.push('sel');
    cls.push(puz[i] ? 'given' : 'user');
    if (bad(i)) cls.push('bad');
    d.className = cls.join(' ');
  });
}

// green wave across a finished row / column / box
function celebrate(cells) {
  const els = $('#grid').children;
  cells.forEach((i, k) => {
    const d = els[i];
    d.classList.remove('flash');
    void d.offsetWidth; // forces the browser to restart the animation
    d.style.animationDelay = k * 50 + 'ms';
    d.classList.add('flash');
  });
}

/* ---------- input ---------- */

function enter(n) {
  if (sel < 0 || puz[sel] !== 0 || won) return;

  // erase
  if (n === 0) {
    board[sel] = 0;
    notes[sel].clear();
    render();
    return;
  }

  // notes mode: toggle a pencil mark
  if (notesMode) {
    if (board[sel]) return;
    if (notes[sel].has(n)) notes[sel].delete(n);
    else notes[sel].add(n);
    render();
    return;
  }

  // normal mode: place a number, and clear that number from related notes
  board[sel] = n;
  notes[sel].clear();
  for (let j = 0; j < 81; j++) if (sameUnit(sel, j)) notes[j].delete(n);
  render();

  // did this finish a row, column or box correctly?
  ['row', 'col', 'box']
    .map(t => unitCells(t, sel))
    .filter(unitDone)
    .forEach(celebrate);

  if (board.every(v => v) && board.every((_, i) => !bad(i))) {
    won = true;
    $('#msg').textContent = 'Solved! 🎉';
  }
}

function toggleNotes() {
  notesMode = !notesMode;
  $('#notes').classList.toggle('on', notesMode);
  $('#notes').setAttribute('aria-pressed', notesMode);
  $('#pad').classList.toggle('notes-on', notesMode);
}

document.addEventListener('keydown', e => {
  if (e.key >= '1' && e.key <= '9') enter(+e.key);
  else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') enter(0);
  else if (e.key === 'n' || e.key === 'N') toggleNotes();
  else if (sel >= 0) {
    const m = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -9, ArrowDown: 9 }[e.key];
    if (m) {
      e.preventDefault();
      const n = sel + m;
      const wrapped = (m === -1 && sel % 9 === 0) || (m === 1 && sel % 9 === 8);
      if (n >= 0 && n < 81 && !wrapped) { sel = n; render(); }
    }
  }
});

$('#new').onclick = newGame;
$('#notes').onclick = toggleNotes;
build();
newGame();
