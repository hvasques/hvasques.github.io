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
   ignored above 128px, hence Arial Black on a small canvas.
   Negative tilt = rises to the right, positive = drops to the right. With
   more than one value here, the projects take them in turn down the list. */
const TILTS = [-7];

const tokens = getComputedStyle(document.documentElement);
const token = (name) => tokens.getPropertyValue(name).trim();
const TAG_SHAPE = [[0, 0], [14, 7], [109, 7], [101, 32], [7, 32], [7, 14]]; // from the tip

function kmonCursor(tilt) {
  // Rotate the tag around its tip, then size the canvas to what it covers
  const rad = (tilt * Math.PI) / 180;
  const turned = TAG_SHAPE.map(([x, y]) => [x * Math.cos(rad) - y * Math.sin(rad), x * Math.sin(rad) + y * Math.cos(rad)]);
  const xs = turned.map((pt) => pt[0]);
  const ys = turned.map((pt) => pt[1]);
  const tipX = Math.ceil(2 - Math.min(...xs));
  const tipY = Math.ceil(2 - Math.min(...ys));
  const w = Math.ceil(tipX + Math.max(...xs) + 2);
  const h = Math.ceil(tipY + Math.max(...ys) + 2);
  const tag = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g transform="translate(${tipX} ${tipY}) rotate(${tilt})"><polygon points="${TAG_SHAPE.map((pt) => pt.join(',')).join(' ')}" fill="${token('--path')}"/><text x="17" y="25.5" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="14" letter-spacing="0.5" fill="${token('--on-path')}">KMON! &#8594;</text></g></svg>`;
  return `url('data:image/svg+xml,${encodeURIComponent(tag)}') ${tipX} ${tipY}, pointer`;
}
const cursors = TILTS.map(kmonCursor);
const cursorOf = (p) => cursors[PROJECTS.indexOf(p) % cursors.length];

const urlOf = (p) => (p.published ? `/portfolio/${p.slug}/` : null);

// False on touch screens: there, nothing is "selected"; a tap opens the project
const canHover = matchMedia('(hover: hover)').matches;

/* ---- List ---------------------------------------------------------------- */
const rows = new Map();
const list = document.querySelector('[data-routes]');

for (const p of PROJECTS) {
  const row = document.createElement('a');
  row.className = 'row';
  if (urlOf(p)) {
    row.href = urlOf(p);
    row.style.cursor = cursorOf(p);
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
  // Mouse only: on iOS, reacting to a touch "hover" swallows the first tap,
  // and the link would need a second tap to open
  row.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && select(p.n));
  row.addEventListener('focus', () => canHover && select(p.n));
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
    const text = svg('text', { class: 'hold-num', x, y: y + 5 });
    text.textContent = p.n;
    numbers.push(text);
  }

  // Invisible, wider copy of the route and its badges: what the mouse hits.
  // The rows already cover keyboard and screen readers, so it's skipped there.
  const hit = svg('a', { class: 'topo-hit', tabindex: -1, 'aria-hidden': 'true', href: urlOf(p) }, [
    svg('path', { d: p.topo.d }),
    ...ends.map(([x, y]) => hold(['badge', x, y, 0, 1.3])),
  ]);
  if (urlOf(p)) hit.style.cursor = cursorOf(p);
  hit.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    select(p.n);
    rows.get(p.n).classList.add('is-hot');
  });
  hit.addEventListener('pointerleave', () => rows.get(p.n).classList.remove('is-hot'));
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

if (canHover) select(PROJECTS[0].n);
