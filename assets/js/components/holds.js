/* ==========================================================================
   Hold component. Every climbing hold on the site (decoration on the walls,
   the Home route, the section holds on project pages, the number badges on
   the topo) is one of these shapes, placed with hold().
   Colors come from CSS classes in base.css (.hold, .hold--route, …).
   ========================================================================== */

import { svg } from '../lib/svg.js';

/** Hand-tuned shapes. Points are relative to the hold's center. Don't redraw. */
export const HOLD_SHAPES = {
  a:     '-9,-6 8,-8 9,5 -7,7',                      // small crimp
  b:     '-12,-8 10,-12 12,7 -8,12',                 // square-ish edge
  c:     '-13,-2 -4,-12 12,-7 9,10 -9,9',            // pentagon
  d:     '-15,-4 0,-10 15,-4 10,8 -11,8',            // wide sloper
  e:     '-11,-10 9,-9 12,3 2,11 -10,6',             // pinch
  f:     '-13,-9 11,-11 13,4 7,11 -12,9 -13,-2',     // jug
  lip:   '-16,-11 13,-14 16,5 9,13 -14,11 -16,-2',   // big final hold
  badge: '-15,-12 13,-14 16,4 9,14 -14,12 -16,-1',   // route-number badge
};

export function holdTransform(x, y, rot = 0, scale = 1) {
  return `translate(${x} ${y}) rotate(${rot}) scale(${scale})`;
}

/**
 * One hold. `spec` is [shape, x, y, rotation, scale]; rotation and scale are
 * optional. `variant` adds a color class: 'route', 'badge' or 'section'.
 */
export function hold([shape, x, y, rot = 0, scale = 1], variant = '') {
  return svg('polygon', {
    class: variant ? `hold hold--${variant}` : 'hold',
    points: HOLD_SHAPES[shape],
    transform: holdTransform(x, y, rot, scale),
  });
}
