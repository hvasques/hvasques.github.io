/* Portfolio: builds the project list and the topo from data/projects.js.
   Hovering or focusing a row selects it and highlights its route. */

import '../site.js';
import { svg } from '../lib/svg.js';
import { hold } from '../components/holds.js';
import { mountRock } from '../components/rock.js';
import { TOPO_WALL } from '../components/rock-shapes.js';
import { PROJECTS } from '../data/projects.js';

/* ---- Hover cursor: a path-colored tag reading "KMON! →" -------------------
   Its tip (top-left) is the click point. Cursor images can't use web fonts and
   are ignored above 128px, hence Arial Black at 112 x 34. */
const tokens = getComputedStyle(document.documentElement);
const token = (name) => tokens.getPropertyValue(name).trim();
const tag = `<svg xmlns="http://www.w3.org/2000/svg" width="112" height="34" viewBox="0 0 112 34"><polygon points="1,1 15,8 110,8 102,33 8,33 8,15" fill="${token('--path')}"/><text x="18" y="26.5" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="14" letter-spacing="0.5" fill="${token('--on-path')}">KMON! &#8594;</text></svg>`;
const CURSOR = `url('data:image/svg+xml,${encodeURIComponent(tag)}') 1 1, pointer`;

/* ---- List ---------------------------------------------------------------- */
const rows = new Map();
const list = document.querySelector('[data-routes]');

for (const p of PROJECTS) {
  const row = document.createElement('a');
  row.className = 'row';
  if (p.published) {
    row.href = `/portfolio/${p.slug}/`;
    row.style.cursor = CURSOR;
  }
  row.innerHTML = `
    <span class="row__n"></span>
    <span class="row__body"><span class="row__name"></span><span class="label"></span></span>
    <span class="grade"></span>
    <span class="row__arrow" aria-hidden="true">&rarr;</span>`;
  row.querySelector('.row__n').textContent = p.n;
  row.querySelector('.row__name').textContent = p.name;
  row.querySelector('.label').textContent = p.label;
  row.querySelector('.grade').textContent = p.grade;
  row.addEventListener('mouseenter', () => select(p.n));
  row.addEventListener('focus', () => select(p.n));
  rows.set(p.n, row);
  list.append(row);
}

/* ---- Topo ---------------------------------------------------------------- */
const wall = mountRock(document.querySelector('.wall--topo'), TOPO_WALL, {
  label: `Topo of the cave wall with ${PROJECTS.length} numbered routes climbing from the floor to the roof; the selected project's route is highlighted`,
});

// SVG has no z-index: the selected route is a copy drawn after the others.
const selected = svg('path', { class: 'topo-route topo-route--on' });
const badges = new Map();
const numbers = [];

for (const p of PROJECTS) {
  const pair = [p.topo.start, p.topo.top].map(([x, y]) => hold(['badge', x, y], 'badge'));
  badges.set(p.n, pair);
  for (const [x, y] of [p.topo.start, p.topo.top]) {
    const text = svg('text', { class: 'topo-num', x, y: y + 5 });
    text.textContent = p.n;
    numbers.push(text);
  }
}

wall.overlay.append(
  ...PROJECTS.map((p) => svg('path', { class: 'topo-route', d: p.topo.d })),
  selected,
  ...[...badges.values()].flat(),
  ...numbers
);

/* ---- Selection ----------------------------------------------------------- */
function select(n) {
  for (const p of PROJECTS) {
    const on = p.n === n;
    rows.get(p.n).classList.toggle('is-on', on);
    badges.get(p.n).forEach((b) => b.classList.toggle('is-on', on));
    if (on) selected.setAttribute('d', p.topo.d);
  }
}

select(PROJECTS[0].n);
