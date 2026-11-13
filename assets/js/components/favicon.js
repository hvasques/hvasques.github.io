/* Site icon: a hold in the path color, built from the same shape and color
   tokens as the rest of the site, so it follows a palette change.
   Fallbacks for anything that doesn't run this (bookmarks, iOS home screen):
   /favicon.ico and /apple-touch-icon.png, made from assets/img/favicon.svg. */

import { HOLD_SHAPES } from './holds.js';

const path = getComputedStyle(document.documentElement).getPropertyValue('--path').trim();
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-18 -18 36 36"><polygon points="${HOLD_SHAPES.lip}" transform="rotate(-12)" fill="${path}"/></svg>`;

const link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/svg+xml';
link.href = `data:image/svg+xml,${encodeURIComponent(icon)}`;
document.head.append(link);
