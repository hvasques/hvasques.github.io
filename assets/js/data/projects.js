/* ==========================================================================
   The list of projects. The Portfolio page (list + topo) is built from this,
   and each project page reads its own entry (found by `slug`).

     n          route number
     slug       folder name: the page lives at /portfolio/<slug>/
     name       shown in the list and in the breadcrumb
     label      short kind of project, shown next to the hold marker
     grade      French sport grade: how hard the project was
     published  true once /portfolio/<slug>/ exists; until then the row is
                shown but isn't a link
     topo       the route on the Portfolio wall (720 x 760 units):
                `d` is the line, `start` and `top` are the number badges
   ========================================================================== */

export const PROJECTS = [
  {
    n: 1,
    slug: 'insured-portal',
    name: 'Policyholder portal',
    label: 'Portal',
    grade: '6c',
    published: true,
    topo: {
      d: 'M200 690 C 230 620, 300 590, 320 520 S 300 420, 330 340 S 330 230, 318 190',
      start: [200, 690],
      top: [318, 176],
    },
  },
  {
    n: 2,
    slug: 'project-two',
    name: 'Project two [WIP]',
    label: 'Work in progress',
    grade: '7a',
    published: false,
    topo: {
      d: 'M390 712 C 410 640, 380 560, 420 480 S 460 330, 430 260 S 420 210, 430 190',
      start: [390, 712],
      top: [430, 176],
    },
  },
  {
    n: 3,
    slug: 'scheduled-renewal-survey',
    name: 'Scheduled renewal survey',
    label: 'Research',
    grade: '5c',
    published: true,
    topo: {
      d: 'M500 716 C 560 690, 610 640, 610 570 S 640 420, 600 330 S 560 220, 560 190',
      start: [500, 716],
      top: [560, 176],
    },
  },
];
