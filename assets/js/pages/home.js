/* Home: the overhang wall with the route that climbs to the menu. */

import '../site.js';
import { svg } from '../lib/svg.js';
import { hold } from '../components/holds.js';
import { mountRock } from '../components/rock.js';
import { HOME_WALL } from '../components/rock-shapes.js';

// Starts low right, traverses left, swings back right, then follows the roof out to the lip.
// The line is a smooth curve through the center of each hold below.
const ROUTE_LINE =
  'M478 732 C 468 723, 434 695, 420 680 C 406 665, 387 659, 392 640 C 397 621, 434 586, 450 566 C 466 546, 490 543, 488 520 C 486 497, 459 448, 440 428 C 421 408, 392 418, 372 400 C 352 382, 335 341, 318 322 C 301 303, 290 303, 270 288 C 250 273, 222 253, 196 230 C 170 207, 140 188, 128 178';

const ROUTE_HOLDS = [
  ['f', 478, 732], ['b', 420, 680, -15], ['a', 392, 640, 30], ['d', 450, 566, -20],
  ['e', 488, 520, -20], ['f', 440, 428, 25], ['a', 372, 400, -20], ['d', 318, 322, 10],
  ['b', 270, 288, 25], ['c', 196, 230, 15], ['lip', 128, 178, -20],
];

const wall = mountRock(document.querySelector('.wall--home'), HOME_WALL);
wall.overlay.append(
  svg('path', { class: 'route-line', d: ROUTE_LINE }),
  ...ROUTE_HOLDS.map((spec) => hold(spec, 'route'))
);
