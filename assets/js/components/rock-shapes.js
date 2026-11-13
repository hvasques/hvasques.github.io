/* ==========================================================================
   All rock geometry in one place: the roof and the three walls.
   Format is explained at the top of rock.js. Units are design units
   (the 1280 x 760 frame); [x, y] is relative to each piece's own top-left.

   The `body` pieces are the approved design: don't redraw them.
   The `fillers` only show when the window has a different shape than the
   design frame. Add, remove or reorder them freely; any filler can follow
   any other, they are joined with straight lines.
   ========================================================================== */

/** Cave roof. Pinned to the right (where it meets the walls); fillers extend it to the left. */
export const ROOF = {
  axis: 'x',
  anchor: 'end',
  body: {
    size: 1280,
    edge: [
      [0, 132], [80, 144], [180, 126], [280, 140], [380, 124], [480, 142], [580, 128],
      [680, 146], [780, 132], [880, 148], [980, 136], [1080, 152], [1180, 140], [1280, 150],
    ],
    strata: ['0,70 180,84 380,72 560,90 760,80 980,96 1280,86'],
  },
  // Each filler starts on a high tooth and ends on a low one, so the zigzag
  // keeps its rhythm. Strata start and end at y=70 to stay one continuous line.
  fillers: [
    { size: 400, edge: [[0, 130], [100, 146], [200, 126], [300, 142]], strata: ['0,70 150,86 300,74 400,70'] },
    { size: 600, edge: [[0, 134], [110, 150], [210, 128], [300, 146], [410, 122], [500, 140]], strata: ['0,70 130,82 290,68 460,88 600,70'] },
    { size: 200, edge: [[0, 128], [100, 146]], strata: ['0,70 100,84 200,70'] },
  ],
};

/** Home: the overhang. Pinned to the roof; fillers continue it down as a column. */
export const HOME_WALL = {
  axis: 'y',
  anchor: 'start',
  body: {
    size: 760,
    edge: [
      [0, 0], [0, 128], [40, 136], [84, 160], [124, 212], [164, 300],
      [206, 390], [252, 480], [298, 570], [350, 660], [410, 760],
    ],
    strata: [
      '520,250 430,262 330,300 250,310',
      '520,420 440,440 360,470 310,480',
      '520,600 460,620 410,660',
      '150,170 220,150 320,160 520,140',
    ],
    // Holds from "other routes"
    holds: [
      ['a', 505, 690, 15], ['b', 452, 636, -30, 0.8], ['c', 505, 606, 20, 0.8], ['d', 402, 522, -15, 0.8],
      ['a', 348, 472, 30], ['e', 296, 438, -10, 0.8], ['b', 505, 400, 10, 0.8], ['a', 420, 352, -25],
      ['f', 474, 326, 35, 0.7], ['e', 236, 350, 20, 0.8], ['d', 386, 250, -20, 0.8], ['a', 500, 242, 10],
      ['b', 256, 180, 25, 0.8], ['c', 330, 196, -15, 0.7], ['a', 410, 192, 40], ['e', 478, 176, -5, 0.8],
    ],
  },
  fillers: [
    {
      size: 300,
      edge: [[436, 110], [402, 230]],
      strata: ['520,150 468,166 428,160'],
      holds: [['c', 480, 70, 20, 0.8], ['a', 462, 250, -25]],
    },
    {
      size: 240,
      edge: [[388, 60], [420, 180]],
      strata: ['520,110 452,128'],
      holds: [['e', 474, 150, 10, 0.8]],
    },
    {
      size: 340,
      edge: [[442, 90], [408, 200], [430, 300]],
      strata: ['520,90 476,104', '520,260 458,276 436,268'],
      holds: [['b', 486, 40, -30, 0.8], ['d', 470, 190, -15, 0.8], ['a', 492, 318, 30]],
    },
  ],
};

/** Portfolio: the topo wall. Pinned to the floor (routes start there); fillers go up behind the roof. */
export const TOPO_WALL = {
  axis: 'y',
  anchor: 'end',
  body: {
    size: 760,
    edge: [[138, 136], [150, 220], [160, 300], [176, 400], [150, 480], [128, 560], [100, 660], [120, 760]],
    strata: [
      '260,240 380,232 500,242 620,234',
      '280,360 400,350 520,360 640,352',
      '520,470 620,462 720,470',
      '160,560 300,572 440,560',
      '130,680 260,690 380,682',
    ],
  },
  fillers: [
    { size: 280, edge: [[158, 60], [130, 190]], strata: ['250,110 380,102 510,112 630,104'] },
    { size: 340, edge: [[120, 70], [168, 190], [146, 290]], strata: ['200,140 330,150 470,140', '480,260 600,252 720,260'] },
    { size: 240, edge: [[162, 80], [138, 180]], strata: ['300,120 430,112 560,122'] },
  ],
};

/** Project pages: the thin reading wall. A short cap under the roof, then only fillers. */
export const READING_WALL = {
  axis: 'y',
  anchor: 'start',
  body: { size: 120, edge: [[0, 0], [0, 90]] },
  fillers: [
    { size: 300, edge: [[40, 0], [18, 150]], strata: ['60,140 130,134 200,146'] },
    { size: 300, edge: [[50, 0], [26, 150]], strata: ['60,30 130,36 200,24', '60,220 130,214 200,226'] },
    { size: 300, edge: [[46, 0], [14, 150]], strata: ['60,110 130,116 200,104'] },
  ],
};
