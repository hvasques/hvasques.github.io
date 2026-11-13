/* ==========================================================================
   Rock engine. Draws the roof and every wall from SEGMENTS instead of
   stretching one drawing.

   A rock strip is described by (see rock-shapes.js):
     axis     'x' = horizontal strip, rock above the edge (the roof)
              'y' = vertical strip, rock to the right of the edge (a wall)
     anchor   'start' or 'end': which end the body is pinned to
     body     the hand-drawn piece from the design
     fillers  2-3 extra segments, repeated in order to cover whatever space
              the body doesn't (ultrawide or very tall windows)

   A piece is { size, edge, strata, holds }:
     size     its length along the axis, in design units
     edge     the rock's outline, as [x, y] points in the piece's own coords
     strata   texture lines, as SVG "x,y x,y" strings
     holds    decorative holds, as [shape, x, y, rotation, scale]

   Pieces are joined edge-to-edge with straight lines into ONE polygon, so
   there are never seams, and nothing is ever stretched: the drawing is always
   at scale --u and simply cut off where the window ends.
   ========================================================================== */

import { svg } from '../lib/svg.js';
import { hold } from './holds.js';

let probe;

/** Size of one design unit in px: the --u token from tokens.css. */
export function unit() {
  if (!probe) {
    probe = document.createElement('div');
    probe.style.cssText =
      'position:absolute;top:0;left:0;height:0;visibility:hidden;pointer-events:none;width:calc(100 * var(--u))';
    document.body.append(probe);
  }
  return probe.getBoundingClientRect().width / 100 || 1;
}

/** Places the body at its anchor and repeats fillers until `length` is covered. */
function layout({ body, fillers = [], anchor = 'start' }, length) {
  const placed = [];
  let i = 0;
  if (anchor === 'start') {
    placed.push({ piece: body, offset: 0 });
    for (let at = body.size; at < length && fillers.length; i++) {
      const piece = fillers[i % fillers.length];
      placed.push({ piece, offset: at });
      at += piece.size;
    }
  } else {
    let at = length - body.size;
    placed.push({ piece: body, offset: at });
    for (; at > 0 && fillers.length; i++) {
      const piece = fillers[i % fillers.length];
      at -= piece.size;
      placed.unshift({ piece, offset: at });
    }
  }
  return placed;
}

/**
 * Draws a rock strip inside `host` and keeps it fitted as the host resizes.
 * Returns { svg, overlay }: `overlay` is a <g> in the body's coordinates,
 * where a page draws its own things (routes, holds) on top of the rock.
 * With a `label` the drawing is announced to screen readers (as `role`,
 * an image by default); without one it is hidden from them.
 */
export function mountRock(host, spec, { label, role = 'img' } = {}) {
  const horizontal = spec.axis === 'x';
  const fill = svg('polygon', { class: 'rock__fill' });
  const pieces = svg('g');
  const overlay = svg('g');
  const root = svg(
    'svg',
    { preserveAspectRatio: 'none', ...(label ? { role, 'aria-label': label } : { 'aria-hidden': 'true' }) },
    [fill, pieces, overlay]
  );
  host.append(root);

  const shift = (offset) => (horizontal ? `translate(${offset} 0)` : `translate(0 ${offset})`);
  let drawn = '';

  function render() {
    const box = host.getBoundingClientRect();
    if (!box.width || !box.height) return; // hidden (e.g. narrow screens)
    const u = unit();
    const w = box.width / u;
    const h = box.height / u;
    const key = `${w.toFixed(1)}x${h.toFixed(1)}`;
    if (key === drawn) return;
    drawn = key;

    root.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const placed = layout(spec, horizontal ? w : h);

    // One continuous outline through every piece
    const edge = placed.flatMap(({ piece, offset }) =>
      piece.edge.map(([x, y]) => (horizontal ? [x + offset, y] : [x, y + offset]))
    );
    const first = edge[0];
    const last = edge[edge.length - 1];
    const outline = horizontal
      ? [
          ...(first[0] > 0 ? [[0, first[1]]] : []),
          ...edge,
          ...(last[0] < w ? [[w, last[1]]] : []),
          [w, 0],
          [0, 0],
        ]
      : [
          ...(first[1] > 0 ? [[first[0], 0]] : []),
          ...edge,
          ...(last[1] < h ? [[last[0], h]] : []),
          [w, h],
          [w, 0],
        ];
    fill.setAttribute('points', outline.map((p) => p.join(',')).join(' '));

    pieces.replaceChildren(
      ...placed.map(({ piece, offset }) =>
        svg('g', { transform: shift(offset) }, [
          svg('g', { class: 'rock__strata' }, (piece.strata || []).map((points) => svg('polyline', { points }))),
          ...(piece.holds || []).map((h) => hold(h)),
        ])
      )
    );
    overlay.setAttribute('transform', shift(placed.find((p) => p.piece === spec.body).offset));
  }

  new ResizeObserver(render).observe(host);
  window.addEventListener('resize', render);
  render();

  return { svg: root, overlay };
}
