/* Portfolio: builds the project list and the topo from data/projects.js.
   Hovering or focusing a row, or hovering a route on the wall, selects that
   project: its row and its route light up together. Both are links to the
   project page once the project is published. */

import '../site.js';
import { svg } from '../lib/svg.js';
import { hold } from '../components/holds.js';
import { mountRock } from '../components/rock.js';
import { TOPO_WALL } from '../components/rock-shapes.js';
import { PROJECTS } from '../data/projects.js';

/* ---- Hover cursor: a tilted, path-colored tag reading "KMON! →" -----------
   The tag's tip is the click point. Cursor images can't use web fonts and are
   ignored above 128px, hence Arial Black on a 114 x 42 canvas. */
const TILT = -7; // degrees; negative = the tag rises to the right
const TIP = [2, 9]; // where the tip sits on the canvas (leaves room for the tilt)

const tokens = getComputedStyle(document.documentElement);
const token = (name) => tokens.getPropertyValue(name).trim();
const tag = `<svg xmlns="http://www.w3.org/2000/svg" width="114" height="42" viewBox="0 0 114 42"><g transform="translate(${TIP[0]} ${TIP[1]}) rotate(${TILT}) translate(-1 -1)"><polygon points="1,1 15,8 110,8 102,33 8,33 8,15" fill="${token('--path')}"/><text x="18" y="26.5" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="14" letter-spacing="0.5" fill="${token('--on-path')}">KMON! &#8594;</text></g></svg>`;
const CURSOR = `url('data:image/svg+xml,${encodeURIComponent(tag)}') ${TIP[0]} ${TIP[1]}, pointer`;

const urlOf = (p) => (p.published ? `/portfolio/${p.slug}/` : null);

/* ---- List ---------------------------------------------------------------- */
const rows = new Map();
const list = document.querySelector('[data-routes]');

for (const p of PROJECTS) {
  const row = document.createElement('a');
  row.className = 'row';
  if (urlOf(p)) {
    row.href = urlOf(p);
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
const hits = [];

for (const p of PROJECTS) {
  const ends = [p.topo.start, p.topo.top];
  badges.set(p.n, ends.map(([x, y]) => hold(['badge', x, y], 'badge')));
  for (const [x, y] of ends) {
    const text = svg('text', { class: 'topo-num', x, y: y + 5 });
    text.textContent = p.n;
    numbers.push(text);
  }

  // Invisible, wider copy of the route and its badges: what the mouse hits.
  // The rows already cover keyboard and screen readers, so it's skipped there.
  const hit = svg('a', { class: 'topo-hit', tabindex: -1, 'aria-hidden': 'true', href: urlOf(p) }, [
    svg('path', { d: p.topo.d }),
    ...ends.map(([x, y]) => hold(['badge', x, y, 0, 1.3])),
  ]);
  if (urlOf(p)) hit.style.cursor = CURSOR;
  hit.addEventListener('mouseenter', () => {
    select(p.n);
    rows.get(p.n).classList.add('is-hot');
  });
  hit.addEventListener('mouseleave', () => rows.get(p.n).classList.remove('is-hot'));
  // No focus ring or text selection when a route is clicked or double-clicked
  hit.addEventListener('mousedown', (e) => e.preventDefault());
  hits.push(hit);
}

wall.overlay.append(
  ...PROJECTS.map((p) => svg('path', { class: 'topo-route', d: p.topo.d })),
  selected,
  ...[...badges.values()].flat(),
  ...numbers,
  ...hits
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
