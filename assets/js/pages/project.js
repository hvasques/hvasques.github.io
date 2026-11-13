/* Project page (every copy of portfolio/_template/).
   1. Fills the label and grade from this project's entry in data/projects.js.
   2. Draws the reading route on the thin wall. It is built from the page
      itself: every <h2 data-sec> becomes a hold, placed by where that heading
      sits in the page, so adding, removing or moving sections changes the
      route with no other edits. It reads like the page: it starts at the top
      and turns solid downward as you scroll. Each hold is a link to its
      section. The route's two ends are badges, as on the Portfolio topo:
      the start (this route's number) goes back to the top of the page, and
      the finish (an arrow) goes to the bottom. */

import '../site.js';
import { svg } from '../lib/svg.js';
import { hold } from '../components/holds.js';
import { mountRock, unit } from '../components/rock.js';
import { READING_WALL } from '../components/rock-shapes.js';
import { PROJECTS } from '../data/projects.js';

/* ---- 1. Project data ------------------------------------------------------ */
const project = PROJECTS.find((p) => p.slug === document.body.dataset.project);
if (project) {
  const label = document.querySelector('[data-project-label]');
  const grade = document.querySelector('[data-project-grade]');
  if (label) label.textContent = `${project.label} · Route ${project.n}`;
  if (grade) grade.textContent = project.grade;
}

/* ---- 2. Reading route ------------------------------------------------------ */
// All in design units (the wall is 200 wide)
const WALL_WIDTH = 200;
const ROOF_BOTTOM = 150;
const TOP_GAP = 26; // the route starts this far under the roof (or the top of the window)
const FLOOR_GAP = 56; // and ends this far above the bottom of the window
const START_RUN = 64; // clear stretch of route between the start and the first hold
const END_RUN = 52; // and between the last hold and the finish
const END_SCROLL = 0.08; // the route covers END_RUN during this last share of the scroll
const HOLD_X = [72, 124, 80, 132, 90, 118]; // zigzag across the wall
const HOLD_SHAPE = ['f', 'b', 'd', 'e', 'c'];
const HOLD_ROT = [-15, 20, -25, 10, 30, -10];
const HOLD_SCALE = 1.25;
// Degrees. The hover tags take these in turn down the route (start, each
// section, finish): positive = the tag rises away from its tip, negative = drops
const TAG_TILTS = [7, -7];

const pick = (list, i) => list[i % list.length];
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

const sections = [...document.querySelectorAll('[data-sec]')];
const wall = mountRock(document.querySelector('.wall--read'), READING_WALL, {
  role: 'navigation',
  label: 'Sections of this page, as holds on a route that fills in as you read',
});

/* The tag that replaces the cursor over a hold: like "KMON!", with the section's title */
const tag = document.createElement('div');
tag.className = 'hold-tag';
tag.hidden = true;
tag.setAttribute('aria-hidden', 'true');
document.body.append(tag);
let tagTilt = TAG_TILTS[0];
const moveTag = (e) => {
  tag.style.transform = `translate(calc(${e.clientX}px - 100%), ${e.clientY}px) rotate(${tagTilt}deg)`;
};

/** Shows the tag with `text` while the mouse is over `link`, the `order`-th stop on the route. */
function tagOnHover(link, text, order) {
  link.addEventListener('mousedown', (e) => e.preventDefault()); // no focus ring on click
  link.addEventListener('mouseenter', (e) => {
    tag.textContent = text;
    tagTilt = pick(TAG_TILTS, order);
    moveTag(e);
    tag.hidden = false;
  });
  link.addEventListener('mousemove', moveTag);
  link.addEventListener('mouseleave', () => (tag.hidden = true));
}

/** One end of the route: a badge with a number or arrow on it, as a link. */
function endBadge({ text, href, label, variant }) {
  const shape = hold(['badge', 0, 0], variant);
  const mark = svg('text', { class: 'hold-num', y: 5 });
  mark.textContent = text;
  const link = svg('a', { class: 'read-hold', href, 'aria-label': label }, [
    svg('circle', { class: 'read-hold__hit', r: 26 }),
    shape,
    mark,
  ]);
  return { link, shape };
}

/* Start of the route: this route's number. Takes you back to the top. */
const start = endBadge({ text: project?.n ?? '', href: '#', label: 'Back to the top of the page', variant: 'badge' });
start.shape.classList.add('is-on');
start.link.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: smooth() });
});
tagOnHover(start.link, '\u2191 Back to top', 0);

/* Finish: takes you to the bottom of the page. Lights up once you've read to the end. */
const finish = endBadge({ text: '\u2193', href: '#', label: 'Go to the bottom of the page', variant: 'section' });
finish.link.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: smooth() });
});
tagOnHover(finish.link, '\u2193 Go to bottom', sections.length + 1);

/* One hold per section: a link placed on the wall by update() */
const holds = sections.map((heading, i) => {
  const title = heading.textContent.trim();
  if (!heading.id) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    heading.id = slug && !document.getElementById(slug) ? slug : `section-${i + 1}`;
  }
  const shape = hold([pick(HOLD_SHAPE, i), 0, 0, pick(HOLD_ROT, i), HOLD_SCALE], 'section');
  const link = svg('a', { class: 'read-hold', href: `#${heading.id}`, 'aria-label': `Go to section: ${title}` }, [
    svg('circle', { class: 'read-hold__hit', r: 26 }), // a bigger target than the hold itself
    shape,
  ]);
  link.addEventListener('click', (e) => {
    e.preventDefault();
    heading.scrollIntoView({ behavior: smooth(), block: 'start' });
  });
  tagOnHover(link, title, i + 1);
  return { link, shape };
});

const clip = svg('rect', { x: 0, width: WALL_WIDTH });
const todo = svg('path', { class: 'read-route read-route--todo' });
const done = svg('path', { class: 'read-route read-route--done', 'clip-path': 'url(#read-so-far)' });
wall.overlay.append(
  svg('defs', {}, [svg('clipPath', { id: 'read-so-far' }, [clip])]),
  todo,
  done,
  start.link,
  ...holds.map((h) => h.link),
  finish.link
);

/** A smooth curve through the points (Catmull-Rom, written as cubic Béziers). */
function curve(pts) {
  let d = `M${pts[0].x} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y.toFixed(1)}`;
  }
  return d;
}

let lastPath = '';

function update() {
  const vh = window.innerHeight;
  const u = unit();
  const wallH = vh / u; // wall height in design units
  const range = Math.max(1, document.documentElement.scrollHeight - vh);
  const progress = clamp01(window.scrollY / range); // 0 at the top, 1 at the end

  // The route runs from just under the roof down to near the floor, in the
  // same direction as the page. The roof scrolls away with the page but the
  // wall stays, so the start of the route follows the roof's edge up: once
  // the roof is gone, the route uses the whole height of the wall instead of
  // leaving a blank band at the top.
  const roofInView = Math.max(0, ROOF_BOTTOM - window.scrollY / u);
  const startY = roofInView + TOP_GAP;
  const endY = wallH - FLOOR_GAP;

  // Where a fraction of the page (0 = top, 1 = end) sits on the wall. A
  // stretch of route is kept clear at each end (START_RUN, END_RUN), so the
  // two badges never sit on top of a hold.
  const firstY = startY + START_RUN;
  const lastY = endY - END_RUN;
  const onWall = (t) => firstY + t * (lastY - firstY);

  // A section's fraction = how far you've scrolled when its heading reaches
  // the reading line (60% down the window)
  const fractions = sections.map((el) => {
    const box = el.getBoundingClientRect();
    return clamp01((box.top + window.scrollY + box.height / 2 - vh * 0.6) / range);
  });

  const pts = [
    { x: 104, y: startY },
    ...fractions.map((f, i) => ({ x: pick(HOLD_X, i), y: onWall(f) })),
    { x: 96, y: endY },
  ];
  const d = curve(pts);
  if (d !== lastPath) {
    lastPath = d;
    todo.setAttribute('d', d);
    done.setAttribute('d', d);
    const place = ({ link }, p) => link.setAttribute('transform', `translate(${p.x} ${p.y.toFixed(1)})`);
    place(start, pts[0]);
    holds.forEach((h, i) => place(h, pts[i + 1]));
    place(finish, pts[pts.length - 1]);
  }

  // Solid part: from the top of the wall down to where you've read. The start
  // run is solid from the beginning; the end run fills in over the last
  // END_SCROLL of the scroll, so the line reaches the finish exactly at the end.
  const lineY = onWall(progress) + END_RUN * clamp01((progress - (1 - END_SCROLL)) / END_SCROLL);
  clip.setAttribute('y', 0);
  clip.setAttribute('height', Math.max(0, lineY).toFixed(1));
  // A hold lights up when the line reaches it
  holds.forEach(({ shape }, i) => shape.classList.toggle('is-on', pts[i + 1].y <= lineY + 0.5));
  finish.shape.classList.toggle('is-on', progress >= 0.999);
}

let frame = 0;
const queue = () => {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    update();
  });
};

window.addEventListener('scroll', queue, { passive: true });
window.addEventListener('resize', queue);
new ResizeObserver(queue).observe(document.body); // page height changes (fonts, images)
update();
