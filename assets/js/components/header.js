/* <site-header current="home|portfolio|about">: logo + menu, identical on
   every page. Below Home, the logo's slash continues into a breadcrumb:
     Portfolio page                            HVASQUES / PORTFOLIO
     project page (<body data-project="slug">) HVASQUES / PORTFOLIO / PROJECT NAME */

import { PROJECTS } from '../data/projects.js';

/** The menu. Edit here to add, remove or rename a page. */
export const NAV = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio/' },
  { id: 'about', label: 'About', href: '#about' }, // no page yet
];

const SLASH = '<span class="slash" aria-hidden="true">/</span>';

/** The crumbs after the logo. The last one is the current page (no link). */
function crumbsFor(current) {
  const slug = document.body.dataset.project; // undefined unless it's a project page
  if (slug !== undefined) {
    const name = PROJECTS.find((p) => p.slug === slug)?.name ?? 'Project name';
    return [{ label: 'Portfolio', href: '/portfolio/' }, { label: name }];
  }
  if (current === 'portfolio') return [{ label: 'Portfolio' }];
  return [];
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.firstChild) return;
    const current = this.getAttribute('current');
    const crumbs = crumbsFor(current);

    const brand = crumbs.length
      ? `<nav class="brand" aria-label="Breadcrumb"><ol>
           <li><a href="/">hvasques</a>${SLASH}</li>
           ${crumbs
             .map(({ href }, i) =>
               href
                 ? `<li><a class="crumb-mid" href="${href}" data-crumb="${i}"></a>${SLASH}</li>`
                 : `<li><span aria-current="page" data-crumb="${i}"></span></li>`
             )
             .join('')}
         </ol></nav>`
      : `<a class="brand" href="/">hvasques${SLASH}</a>`;

    const links = NAV.map(
      ({ id, label, href }) => `<a href="${href}"${id === current ? ' aria-current="page"' : ''}>${label}</a>`
    ).join('');

    this.innerHTML = `${brand}<nav class="nav" aria-label="Main">${links}</nav>`;
    crumbs.forEach(({ label }, i) => {
      this.querySelector(`[data-crumb="${i}"]`).textContent = label;
    });
  }
}
customElements.define('site-header', SiteHeader);
