/* <rock-roof>: the cave roof, identical on every page. */

import { mountRock } from './rock.js';
import { ROOF } from './rock-shapes.js';

class RockRoof extends HTMLElement {
  connectedCallback() {
    if (this.firstChild) return;
    this.classList.add('rock');
    mountRock(this, ROOF);
  }
}
customElements.define('rock-roof', RockRoof);
