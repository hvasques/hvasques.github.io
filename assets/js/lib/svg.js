const NS = 'http://www.w3.org/2000/svg';

/** Creates an SVG element: svg('path', { d: '…' }, [children]). */
export function svg(tag, attrs = {}, children = []) {
  const el = document.createElementNS(NS, tag);
  for (const [name, value] of Object.entries(attrs)) {
    if (value != null) el.setAttribute(name, value);
  }
  el.append(...children);
  return el;
}
