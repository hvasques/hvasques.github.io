/* Project page (every copy of portfolio/_template/).
   1. Fills the label and grade from this project's entry in data/projects.js.
   2. Draws the reading route: every <h2 data-sec> is a hold on the thin wall,
      and the route turns solid from the bottom up as you scroll. */

import '../site.js';
import { svg } from '../lib/svg.js';
import { hold, holdTransform } from '../components/holds.js';
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
const WALL_WIDTH = 200;
const ROOF_BOTTOM = 150;
const HOLD_X = [72, 124, 80, 132, 90, 118]; // zigzag across the wall
const HOLD_SHAPE = ['f', 'b', 'd', 'e', 'c'];
const HOLD_ROT = [-15, 20, -25, 10, 30, -10];
const HOLD_SCALE = 1.25;

const sections = [...document.querySelectorAll('[data-sec]')];
const wall = mountRock(document.querySelector('.wall--read'), READING_WALL, {
  label: `Route ${project?.n ?? ''} on a thin wall beside the text; it starts at the bottom, each section is a hold, and the route fills in upward as you read`,
});

const clip = svg('rect', { x: 0, width: WALL_WIDTH });
const todo = svg('path', { class: 'read-route read-route--todo' });
const done = svg('path', { class: 'read-route read-route--done', 'clip-path': 'url(#read-so-far)' });
const holds = sections.map((_, i) =>
  hold([HOLD_SHAPE[i % HOLD_SHAPE.length], 0, 0, HOLD_ROT[i % HOLD_ROT.length], HOLD_SCALE], 'section')
);
wall.overlay.append(svg('defs', {}, [svg('clipPath', { id: 'read-so-far' }, [clip])]), todo, done, ...holds);

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/** A smooth curve through the points (Catmull-Rom, written as cubic Béziers). */
function curve(pts) {
  let d = `M${pts[0].x} ${pts[0].y}`;
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
  const wallH = vh / unit(); // wall height in design units
  const range = Math.max(1, document.documentElement.scrollHeight - vh);
  const progress = clamp01(window.scrollY / range); // 0 at the top, 1 at the end

  // The route runs from near the floor up to just under the roof
  const startY = wallH - 56;
  const topY = ROOF_BOTTOM + 26;
  const span = startY - topY;

  // A section's place on the wall = how far you've scrolled when its heading
  // reaches the reading line (60% down the window)
  const fractions = sections.map((el) => {
    const box = el.getBoundingClientRect();
    return clamp01((box.top + window.scrollY + box.height / 2 - vh * 0.6) / range);
  });

  const pts = [
    { x: 96, y: startY },
    ...fractions.map((f, i) => ({ x: HOLD_X[i % HOLD_X.length], y: startY - f * span })),
    { x: 104, y: topY },
  ];
  const d = curve(pts);
  if (d !== lastPath) {
    lastPath = d;
    todo.setAttribute('d', d);
    done.setAttribute('d', d);
    holds.forEach((el, i) =>
      el.setAttribute('transform', holdTransform(pts[i + 1].x, pts[i + 1].y.toFixed(1), HOLD_ROT[i % HOLD_ROT.length], HOLD_SCALE))
    );
  }

  // Solid part: from the bottom of the window up to the current progress
  const progressY = startY - progress * span;
  clip.setAttribute('y', progressY.toFixed(1));
  clip.setAttribute('height', Math.max(0, wallH - progressY).toFixed(1));
  holds.forEach((el, i) => el.classList.toggle('is-on', fractions[i] <= progress + 0.0005));
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
