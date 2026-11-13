/* <site-header current="home|portfolio|about">: logo + menu, identical on
   every page. On a project page (<body data-project="slug">) the logo's slash
   continues into a breadcrumb: HVASQUES / PORTFOLIO / PROJECT NAME. */

import { PROJECTS } from '../data/projects.js';

/** The menu. Edit here to add, remove or rename a page. */
export const NAV = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio/' },
  { id: 'about', label: 'About', href: '#about' }, // no page yet
];

const SLASH = '<span class="slash" aria-hidden="true">/</span>';

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.firstChild) return;
    const current = this.getAttribute('current');
    const slug = document.body.dataset.project; // undefined unless it's a project page

    const brand =
      slug === undefined
        ? `<a class="brand" href="/">hvasques${SLASH}</a>`
        : `<nav class="brand" aria-label="Breadcrumb"><ol>
             <li><a href="/">hvasques</a>${SLASH}</li>
             <li><a class="crumb-mid" href="/portfolio/">Portfolio</a>${SLASH}</li>
             <li><span aria-current="page" data-crumb></span></li>
           </ol></nav>`;

    const links = NAV.map(
      ({ id, label, href }) => `<a href="${href}"${id === current ? ' aria-current="page"' : ''}>${label}</a>`
    ).join('');

    this.innerHTML = `${brand}<nav class="nav" aria-label="Main">${links}</nav>`;

    const crumb = this.querySelector('[data-crumb]');
    if (crumb) crumb.textContent = PROJECTS.find((p) => p.slug === slug)?.name ?? 'Project name';
  }
}
customElements.define('site-header', SiteHeader);
