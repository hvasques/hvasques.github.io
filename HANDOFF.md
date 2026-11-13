# Handoff: build the portfolio site from the design canvas

This file is for the coding agent that turns the approved design into the real site. Read it in full, then read `CLAUDE.md`. Its rules apply to you too, including the rule to explain every change step by step and log it as a new "Etapa".

## 1. Goal

Build three pages as static HTML, CSS and JavaScript, published by GitHub Pages from `main` / root of `hvasques/hvasques.github.io`:

| Page | File to create | Design source |
|---|---|---|
| Home | `index.html` (replaces the current "WIP" page) | `prototypes/design-canvas/Main.dc.html` |
| Portfolio | `portfolio/index.html` | `prototypes/design-canvas/Portfolio.dc.html` |
| Project page **template** | `portfolio/_template/index.html` | `prototypes/design-canvas/WIP.dc.html` |
| First project, made from the template | `portfolio/project-one/index.html` | same |

The project page is a **template**: every project page is made from it, and only the content changes. See §6 → *Project page template*.

Folder-style URLs (`/portfolio/`, `/portfolio/project-one/`) keep links clean on GitHub Pages without a build step.

## 2. Hard constraints

- **No build step and no framework.** Use plain HTML, CSS and JS, per `CLAUDE.md` → *Stack e convenções*. If you think you need a framework, stop and ask.
- Put files where `CLAUDE.md` says: `assets/css/`, `assets/js/`, `assets/img/`. Use one shared stylesheet, plus small per-page scripts only where a page has behaviour.
- **Do not push**, create remotes, or change repo visibility without the owner's OK. Make small local commits.
- After each change, explain it to the owner in numbered steps, in plain Portuguese, and append an "Etapa" to `CLAUDE.md`. The owner wants to understand how the site works.
- Site copy is in English, as in the design. Notes in `CLAUDE.md` are in Portuguese.
- Follow the style rules, which are non-negotiable: everything is flat 2D (no shadows, perspective or gradients) and angular (sharp corners, few long edges, no `border-radius`). The rock has no outline. Only the **path** color means "go here".

## 3. Source of truth

- **Live canvas:** https://claude.ai/artifact/HekNeSAtctbyZUTuXCMq1q (private to the owner). Use Play to click through it.
- **Copies in this repo:** `prototypes/design-canvas/*.dc.html`. These are the canvas's own source files, copied when this handoff was written. If the owner changes the canvas later, ask them whether the copies are stale.

### How to read a `.dc.html` file

These files use a small template format. They don't run on their own outside the canvas. To translate one:

- The markup inside `<x-dc>…</x-dc>` is the page. The `<helmet>` block holds the font link and global CSS.
- `{{ path }}` is the accent color (a canvas "tweak"). Replace it with the CSS variable `var(--path)`.
- Other `{{ … }}` holes are values computed in `renderVals()` in the `<script type="text/x-dc">` block at the bottom. Rewrite that logic as vanilla JS that sets attributes or styles directly, and render static parts as static HTML.
- `<sc-for list="{{ items }}" as="x">` is a loop. Write the repeated items out by hand, or build them in JS where they are data-driven.
- `onClick="{{ fn }}"` and `onMouseEnter="{{ fn }}"` are event handlers. Use `addEventListener`.
- `Main.dc.html` contains a stray hand-drawn circle: the last `<svg>` inside `.shell`, positioned at `left: 729px; top: 111px`. It is the owner's comment annotation. **Do not port it.**
- Inline styles are fine in the design files but not in the site. Move them into classes in `assets/css/style.css`.

## 4. Design tokens

Put these on `:root` in `assets/css/style.css`.

```css
:root {
  --ground:  #EEF1F3; /* page background */
  --surface: #C9D0D6; /* rock (roof, walls), grade badge background */
  --ink:     #1B2433; /* text */
  --muted:   #4C5763; /* secondary text, inactive routes/holds */
  --texture: #A3AEB9; /* strata lines and grey holds on the rock */
  --path:    #C2461F; /* the ONLY "where to go" color. Alternative: Rooftop #D9121A */
}
```

The design has a light theme only. Don't add dark mode unless the owner asks.

**Fonts.** Load them all in one Google Fonts link, exactly as in the `.dc.html` `<helmet>`:
`Chakra+Petch:wght@500;600;700`, `Funnel+Display:wght@700;800`, `Funnel+Sans:wght@400;500;600`, `Geologica:wght@400;500`.

| Use | Font |
|---|---|
| Logo, menu, breadcrumb, buttons, grades, route numbers | Chakra Petch, uppercase, letter-spacing 0.06–0.1em |
| Page titles (h1) | Funnel Display 800 |
| Project names, section headings (h2) | Funnel Sans 600 |
| Body | Geologica 400 |
| Labels | Body text plus a **hold-shaped marker** (small SVG polygon `1,2 8.5,0.5 10,7.5 2,10`). Never use a monospace uppercase overline. |

## 5. Shared pieces (same on every page)

1. **Cave roof.** An SVG with a full-width jagged polygon and one strata polyline. It is `position: absolute; top: 0; z-index: 1`, with `preserveAspectRatio="none"` so it stretches with the width. Its height scales with the window height: `calc(max(760px, 100vh) * 150 / 760)`. The source uses `100% * 150 / 760` on Home and Portfolio, which works only because those pages are exactly one screen tall. Use the `max(760px, 100vh)` form everywhere so every page behaves the same.
2. **Header in the roof.** Logo on the left, menu on the right (`justify-content: space-between`), with 64px side padding (20px under 860px). The header has **no max-width**: the menu always ends 64px from the window's right edge. The menu items are Home, Portfolio, About. *About has no page yet.* Either keep it as `#about` or ask the owner. The current page gets `aria-current="page"` and a 3px underline in `--path` (`box-shadow: inset 0 -3px 0 var(--path)`).
3. **Logo.** `HVASQUES/`, where the slash is in `--path`. On the project page, the slash continues into a **breadcrumb**: `HVASQUES / PORTFOLIO / PROJECT ONE`. Use a `<nav aria-label="Breadcrumb"><ol>`; the middle crumb is muted and links back, and the last crumb has `aria-current="page"`.
4. **Content starts under the roof.** `margin-top: calc(max(760px, 100vh) * 152 / 760 - Npx)`, with N = 18 on Home and 30 on Portfolio. This ties the title to the roof's height so the roof never overlaps the text.
5. **Layering.** Wall art is z-index 0, the roof is 1, and the content shell is 2. Wall art has `pointer-events: none`.
6. **Primary button.** Chakra Petch 600, uppercase, filled with `--path`, white text, and the right edge cut diagonally: `clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)`.
7. **Grade badge.** Chakra Petch 700 on an irregular hold shape: `clip-path: polygon(8% 8%, 92% 0, 100% 70%, 78% 100%, 4% 92%, 0 40%)`. The background is `--surface`, or `--path` with white text when active.
8. **Page root.** `min-height: max(760px, 100vh)`, so the walls always reach the floor.

## 6. Page by page

### Home (`index.html`)

- Title: "Find the next **hold**", with "hold" in `--path`. Intro: "Projects and experiments from someone who climbs and plays games. Start anywhere on the wall." One button: "See the portfolio" → `/portfolio/`.
- **Overhang wall.** An SVG on the right edge, `height: 100%; aspect-ratio: 520/760`, with `preserveAspectRatio="xMaxYMin meet"`. It holds a rock polygon, strata lines, 16 grey "other route" holds, and the route: a dashed path in `--path` through 11 holds, also in `--path`. Copy the geometry verbatim from `Main.dc.html`. The route's dashes animate (`stroke-dashoffset`). Turn the animation off under `prefers-reduced-motion`.
- Responsive: below 1100px the copy is limited to 46% of the width; below 860px the wall is hidden.
- Known gap: the Home wall has no width clamp, unlike Portfolio. In a very tall, narrow window it can run under the text. Apply the same fix as Portfolio, `max-width: calc(100% - <text column>px)` on the wall, and log it in the Etapa.

### Portfolio (`portfolio/index.html`)

- Title: "Pick a **line**". Below it is a list of 4 projects. Each row shows the number, the name (Funnel Sans), a label with a hold marker, and a grade badge. The copy and grades are placeholders; keep them and flag them to the owner.
- The rows are rendered from `assets/js/projects.js` (see the project page template below). Each row is an `<a>` to `/portfolio/<slug>/`. Hovering or focusing a row **selects** it: the number, marker and grade badge turn `--path`, a `→` appears after the grade, and that project's route is highlighted on the topo.
- **Custom cursor on rows:** a `--path` tag reading "KMON! →", with its tip at the top-left, which is the click point. It's an SVG data-URI cursor built in `renderVals()` in the source. Two things to keep in mind:
  1. Cursor images can't load web fonts. The source uses Arial Black, and the owner has been told this. A JS label that follows the mouse could use Chakra Petch; that's the owner's call.
  2. Cursor images over 128px are ignored by browsers. Keep the current 112×34.
  The cursor's color follows `--path`. Build the SVG string in JS once at load time; don't hard-code the color in CSS.
- **Topo wall.** A `div.wall`: `position: absolute; right: 0; height: 100%; aspect-ratio: 720/760; max-width: calc(100% - 560px)`. It contains two SVGs:
  - The rock, `preserveAspectRatio="none"`, so it stretches from floor to roof. Its strata lines use `vector-effect: non-scaling-stroke`.
  - The routes, `preserveAspectRatio="xMaxYMax meet"`, so they keep their shape. All 4 routes are drawn in muted grey. The selected route is drawn again **on top** in `--path` (SVG has no z-index). Each route has ink number badges at its start and top; the selected route's two badges turn `--path`.
  - Route paths and badge positions are in the `routes` object in `Portfolio.dc.html`.
- Responsive: below 1100px the topo stops overlaying and stacks under the list at full width.

### Project page template (`portfolio/_template/index.html`)

The design shows "Project one", but treat it as the template for **every** project page. Build it so that adding a project means copying a folder and writing content, without touching CSS or JS.

**How the template works (no build step):**

1. **One data file lists the projects:** `assets/js/projects.js`. Each entry has `n` (route number), `slug`, `name`, `label`, `grade` and `topo` (that route's path and badge positions on the Portfolio topo). The Portfolio list and topo are rendered from this array, so a new project shows up on the Portfolio page by adding one entry.
2. **Each project page is a copy of `portfolio/_template/`.** You copy it to `portfolio/<slug>/` and edit only the content: the title, the label, the grade, the intro and the sections. Everything else (roof, menu, breadcrumb, wall, route) comes from shared CSS and JS.
3. **The page identifies itself with one attribute:** `<body data-project="<slug>">`. The page script reads the matching entry from `projects.js` to fill the breadcrumb's last crumb, the "Case study · Route N" label and the grade badge. The title and body copy stay as plain HTML in the page, so the owner can edit them directly.
4. **Sections are free-form.** Any `h2` with `data-sec` becomes a hold. A project can have 3 sections or 8; the reading route adapts, because it measures the headings at runtime. Don't hard-code 5 holds.
5. **`_template/` is not linked from anywhere** and has `<meta name="robots" content="noindex">`. Its sections are the bracketed prompts from the design (Context, The problem, What I tried, What shipped, What I learned), which act as the writing guide for each new project.
6. **Add a short "How to add a project" section to `README.md`:** copy the folder, rename it to the slug, add the entry to `projects.js`, and write the content.

Alternative, for the owner to decide (§8): Jekyll layouts would remove the duplicated header markup in each copy, but they mean deleting `.nojekyll` and adding a generator, which `CLAUDE.md` asks to avoid without a clear reason. With three or four projects, copying the template is simpler to understand. Don't switch to Jekyll without the owner's OK.

**Template content (from the design):**

- Header: breadcrumb (see 5.3), with the last crumb set to the project's name. Then a label "Case study · Route N" with a hold marker, the h1 project name, and the grade badge in `--path`. One intro line, then the sections. In the template all body text is bracketed placeholders. **Don't invent content for real projects.** `project-one` keeps the brackets until the owner writes it.
- At the end, a "← Back to the routes" button → `/portfolio/`.
- **Reading route (the signature interaction):**
  - A thin wall (200px wide) is **fixed to the window** (`position: fixed; right: 0; top: 0; height: 100vh`) and doesn't scroll. It has a flat, angular rock with strata lines.
  - The page's route (route N, from `data-project`) starts near the bottom of the window (`y = vh - 56`) and climbs to just under the roof (`y = roofH + 26`). It shows no route numbers; the owner asked for them removed.
  - Each `h2` (marked `data-sec`) becomes a **hold**. Its height on the wall is where the section sits in the page: `f = clamp((sectionY - 0.6*vh) / (pageH - vh), 0, 1)` and `wallY = startY - f * (startY - topY)`. Hold x positions zigzag: `[72, 124, 80, 132, 90, 118]`. The curve through the points is Catmull-Rom converted to cubic Bézier; the code is in `renderVals()`.
  - Scroll progress is `p = scrollY / (pageH - vh)`. The whole route is drawn dashed in muted grey, and a solid `--path` copy is clipped to the band from the bottom up to `startY - p*span`. A hold turns `--path` once `f <= p`.
  - Recompute on `scroll`, `resize` and a `ResizeObserver` on the page, throttled with `requestAnimationFrame`. Hold colors have a 0.25s fill transition; turn it off under reduced motion.
  - Below 860px the wall is hidden and the text takes the full width.
  - The menu sits above the top of the wall, inside the roof. That's intended.

## 7. Accessibility checklist

- Use real `<a>` and `<button>` elements and visible focus styles (2px ink outline). Keyboard focus on a portfolio row selects it, just as hover does.
- Decorative SVGs get `aria-hidden="true"`. The topo and reading-route SVGs get `role="img"` plus an `aria-label` (the source has wording you can reuse).
- Contrast: `--muted` on `--ground` and white on `--path` both pass AA. Never put `--texture` on text.
- Every animation and transition respects `prefers-reduced-motion`.
- `<html lang="en">` (the copy is English), and each page gets its own `<title>`.

## 8. Not verified / open questions for the owner

- The canvas was never visually checked by the agent that built it; the owner reviewed it through comments. Check every page yourself in a browser at 1280×760, at 1920×1080, in a tall narrow window and at phone width.
- **About** page: not designed. Ask the owner before building one.
- Projects 2–4: create them from the template only if the owner asks. Until then, their rows can link to project one, or be rendered without a link. Ask which.
- Template mechanism: copy-per-project (recommended above) or Jekyll layouts. Confirm with the owner before you start.
- KMON cursor font: Arial Black, or a mouse-following label in Chakra Petch? This is the owner's call.
- The canvas's accent-color tweak (orange / Rooftop red / ink) becomes the single `--path` variable. The owner chose Alpenglow orange.

## 9. Definition of done

- [ ] `index.html`, `portfolio/index.html`, `portfolio/_template/index.html` and `portfolio/project-one/index.html` exist and match the canvas at 1280×760.
- [ ] One `assets/css/style.css` with the tokens; JS only in `assets/js/` (`projects.js` data, portfolio selection and cursor, reading route).
- [ ] Adding a project is: copy `_template/`, add one entry to `projects.js`, write content. Prove it by making a throwaway second project locally (with 3 sections instead of 5), checking that it appears on Portfolio and its route works, then deleting it. The steps are documented in `README.md`.
- [ ] Menu, roof and logo are identical on all pages, and the menu ends 64px from the right edge.
- [ ] Walls reach the floor at any window height, and text never runs under the roof or a wall.
- [ ] Phone width works: walls hidden or stacked as described, no horizontal scroll.
- [ ] The reading route fills from the bottom as you scroll and is complete at the end of the page.
- [ ] `CLAUDE.md` has a new Etapa explaining what was built and how to check it; local commits only, nothing pushed.
