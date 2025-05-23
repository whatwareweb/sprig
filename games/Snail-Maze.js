/*
@title: Snail Maze
@author: unknown
@tags: []
@description: A recreation of Sega's Snail Maze easter egg from the Master System. Guide your snail through a maze using the arrow keys. Collect items and avoid obstacles to reach the goal. The game features classic maze navigation mechanics with a nostalgic twist.
@addedOn: 2025-01-04

Based on Sega's Snail Maze easter egg(?) for the Master System

*/

const playerRight = "v"
const playerUp = "w"
const playerLeft = "x"
const playerDown = "y"
const blank = "u"
const floor = "z"
const goal = "t"
const maze = "v"

let time = 60

let movable = true

setLegend(
  [playerRight, bitmap`
..666666666.....
..666666666.....
6666FFFFF6666.22
6666FFFFF6666.22
66FF66666FF66.99
66FF66666FF66999
66FF66FFF6666999
66FF66FFF6666999
66FF666666666999
66FF666666666999
6666FFFFFFF66999
6666FFFFFFF66999
..66666666699999
..66666666699999
99999999999999..
99999999999999..`],
  [playerUp, bitmap`
..229999999999..
..229999999999..
.....99999999999
..66666666669999
..66666666669999
6666FF6666FF6699
6666FF6666FF6699
66FF66FF66FF6699
66FF66FF66FF6699
66FF66FF66FF6699
66FF666666FF6699
66FF666666FF6699
6666FFFFFF666699
6666FFFFFF666699
..6666666666..99
..6666666666..99`],
  [playerLeft, bitmap`
.....666666666..
.....666666666..
22.6666FFFFF6666
22.6666FFFFF6666
99.66FF66666FF66
99966FF66666FF66
9996666FFF66FF66
9996666FFF66FF66
999666666666FF66
999666666666FF66
99966FFFFFFF6666
99966FFFFFFF6666
99999666666666..
99999666666666..
..99999999999999
..99999999999999`],
  [playerDown, bitmap`
99..6666666666..
99..6666666666..
996666FFFFFF6666
996666FFFFFF6666
9966FF666666FF66
9966FF666666FF66
9966FF66FF66FF66
9966FF66FF66FF66
9966FF66FF66FF66
9966FF6666FF6666
9966FF6666FF6666
99996666666666..
99996666666666..
99999999999.....
..999999999922..
..999999999922..`],
  [blank, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [floor, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [goal, bitmap`
....666666666666
....666666666666
..66666666666666
..666...........
66666...........
666.............
666.............
666.............
666.....66666666
666.....66666666
666.........6666
66666.......6666
..666.......6666
..66666666666666
....666666666666
....666666666666`],
  ["a", bitmap`
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............`],
  ["b", bitmap`
7777777777777777
7777777777777777
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  ["c", bitmap`
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77`],
  ["d", bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
7777777777777777
7777777777777777`],
  ["e", bitmap`
7777777777777777
7777777777777777
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............`],
  ["f", bitmap`
7777777777777777
7777777777777777
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77`],
  ["g", bitmap`
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
7777777777777777
7777777777777777`],
  ["h", bitmap`
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
7777777777777777
7777777777777777`],
  ["i", bitmap`
7777777777777777
7777777777777777
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
7777777777777777
7777777777777777`],
  ["j", bitmap`
7777777777777777
7777777777777777
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77`],
  ["k", bitmap`
7777777777777777
7777777777777777
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
..............77
7777777777777777
7777777777777777`],
  ["l", bitmap`
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
7777777777777777
7777777777777777`],
  ["m", bitmap`
7777777777777777
7777777777777777
................
................
................
................
................
................
................
................
................
................
7777777777777777
7777777777777777`],
  ["n", bitmap`
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77
77............77`],
)

let bgmTracks = [
  tune`
300,
266.667: A4^133.3335,
266.667: E5^133.3335,
266.667: C#5^133.3335,
266.667: E5^133.3335,
266.667: D5^133.3335,
266.667: B4^133.3335,
266.667: C#5^133.3335,
266.667: B4^133.3335,
266.667: A4^133.3335,
266.667: B4^133.3335,
266.667: C#5^133.3335,
266.667: B4^133.3335,
266.667: E4^133.3335,
266.667: F#4^133.3335,
533.334: E4^133.3335,
266.667: A4^133.3335,
266.667: E5^133.3335,
266.667: C#5^133.3335,
266.667: E5^133.3335,
266.667: D5^133.3335,
266.667: B4^133.3335,
266.667: C#5^133.3335,
266.667: B4^133.3335,
266.667: C#5^133.3335,
266.667: B4^133.3335,
266.667: A4^133.3335,
266.667: G#4^133.3335,
266.667: A4^133.3335,
266.667: A4^133.3335,
533.334: A4^133.3334999999991,
266.667: A4^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: D5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: A4^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: E4^133.3334999999991,
266.667: F#4^133.33350000000087,
533.334: E4^133.3334999999991,
266.667: A4^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: D5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: A4^133.3334999999991,
266.667: G#4^133.33350000000087,
266.6669999999982: A4^133.3334999999991,
266.66700000000174: A4^133.33350000000266,
266.66700000000174: A4^133.33350000000266,
`,
  tune`
300,
266.667: A4^133.3335,
266.667: E5^133.3335,
266.667: C#5^133.3335,
266.667: E5^133.3335,
266.667: D5^133.3335,
266.667: B4^133.3335,
266.667: C#5^133.3335,
266.667: B4^133.3335,
266.667: A4^133.3335,
266.667: B4^133.3335,
266.667: C#5^133.3335,
266.667: B4^133.3335,
266.667: E4^133.3335,
266.667: F#4^133.3335,
533.334: E4^133.3335,
266.667: A4^133.3335,
266.667: E5^133.3335,
266.667: C#5^133.3335,
266.667: E5^133.3335,
266.667: D5^133.3335,
266.667: B4^133.3335,
266.667: C#5^133.3335,
266.667: B4^133.3335,
266.667: C#5^133.3335,
266.667: B4^133.3335,
266.667: A4^133.3335,
266.667: G#4^133.3335,
266.667: A4^133.3335,
266.667: A4^133.3335,
533.334: A4^133.3334999999991,
266.667: A4^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: D5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: A4^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: E4^133.3334999999991,
266.667: F#4^133.33350000000087,
533.334: E4^133.3334999999991,
266.667: A4^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: D5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: C#5^133.3334999999991,
266.667: B4^133.33350000000087,
266.667: A4^133.3334999999991,
266.667: G#4^133.33350000000087,
266.6669999999982: A4^133.3334999999991,
266.66700000000174: A4^133.33350000000266,
266.66700000000174: A4^133.33350000000266,
`,
  tune`
300,
266.667: A3^133.3335,
266.667: A4^133.3335,
266.667: A3^133.3335,
266.667: A4^133.3335,
266.667: D4^133.3335,
266.667: D5^133.3335,
266.667: E4^133.3335,
266.667: E5^133.3335,
266.667: A3^133.3335,
266.667: E4^133.3335,
266.667: A3^133.3335,
266.667: A4^133.3335,
266.667: E3^133.3335,
266.667: B3^133.3335,
266.667: E3^133.3335,
266.667: E4^133.3335,
266.667: A3^133.3335,
266.667: A4^133.3335,
266.667: A3^133.3335,
266.667: A4^133.3335,
266.667: D4^133.3335,
266.667: D5^133.3335,
266.667: E4^133.3335,
266.667: E5^133.3335,
280.0003499999999: A3^133.3335,
253.3336500000001: D4^133.3335,
266.667: A3^133.3335,
266.667: E4^133.3335,
266.667: A3^133.3335,
266.667: A4^133.3335,
533.334: A3^133.3334999999991,
266.667: A3^133.3334999999991,
266.667: A4^133.33350000000087,
266.667: A3^133.3334999999991,
266.667: A4^133.33350000000087,
266.667: D4^133.3334999999991,
266.667: D5^133.33350000000087,
266.667: E4^133.3334999999991,
266.667: E5^133.33350000000087,
266.667: A3^133.3334999999991,
266.667: E4^133.33350000000087,
266.667: A3^133.3334999999991,
266.667: A4^133.33350000000087,
266.667: E3^133.3334999999991,
266.667: B3^133.33350000000087,
266.667: E3^133.3334999999991,
266.667: E4^133.33350000000087,
266.667: A3^133.3334999999991,
266.667: A4^133.33350000000087,
266.667: A3^133.3334999999991,
266.667: A4^133.33350000000087,
266.667: D4^133.3334999999991,
266.667: D5^133.33350000000087,
266.667: E4^133.3334999999991,
266.667: E5^133.33350000000087,
280.0003499999999: A3^133.3334999999991,
253.3336500000001: D4^133.3334999999991,
266.667: A3^133.3334999999991,
266.667: E4^133.33350000000087,
266.6669999999982: A3^133.3334999999991,
266.66700000000174: A4^133.33350000000266,
266.66700000000174: A4^133.33350000000266,
`,
  tune`
300,
266.667: G#2^66.66675,
266.667: D2^66.66675,
133.3335: G#2^66.66675,
133.3335: G#2^66.66675,
266.667: D2^66.66675,
266.667: G#2^66.66675,
266.667: D2^66.66675,
133.3335: G#2^66.66675,
133.3335: G#2^66.66675,
266.667: D2^66.66675,
266.667: G#2^66.66675,
266.667: D2^66.66675,
133.3335: G#2^66.66675,
133.3335: G#2^66.66675,
266.667: D2^66.66675,
266.667: G#2^66.66675,
266.667: D2^66.66675,
133.3335: G#2^66.66675,
133.3335: G#2^66.66675,
266.667: D2^66.66674999999955,
266.667: G#2^66.66674999999955,
266.667: D2^66.66674999999955,
133.3335: G#2^66.66674999999955,
133.3335: G#2^66.66675000000043,
266.667: D2^66.66674999999955,
266.667: G#2^66.66674999999955,
266.667: D2^66.66674999999955,
133.3335: G#2^66.66674999999955,
133.3335: G#2^66.66675000000043,
266.667: D2^66.66674999999955,
266.667: G#2^66.66674999999955,
266.667: D2^66.66674999999955,
133.3335: G#2^66.66674999999955,
133.3335: G#2^66.66675000000043,
266.667: D2^66.66674999999955,
266.667: G#2^66.66674999999955,
266.667: D2^66.66674999999955,
133.3334999999991: G#2^66.66674999999955,
133.33350000000087: G#2^66.66675000000133,
266.667: D2^66.66674999999955,
266.667: G#2^66.66674999999955,
266.667: D2^66.66674999999955,
133.3334999999991: G#2^66.66674999999955,
133.33350000000087: G#2^66.66675000000133,
266.667: D2^66.66674999999955,
266.667: G#2^66.66674999999955,
266.667: D2^66.66674999999955,
133.3334999999991: G#2^66.66674999999955,
133.33350000000087: G#2^66.66675000000133,
266.667: D2^66.66674999999955,
266.6669999999982: G#2^66.66674999999955,
266.66700000000174: D2^66.6667500000031,
133.3334999999991: G#2^66.66674999999955,
133.33350000000266: G#2^66.66674999999955,
133.33350000000266: G#2^66.66674999999955,
`,
];

let roundEndTracks = [
  tune`
0,
133.3335: C#5^133.3335,
133.3335: B4^133.3335,
133.3335: C#5^133.3335,
133.3335: E5^133.3335,
133.3335: C#5^133.3335,
133.3335: E5^133.3335,
800.001: A5^800.001,
`,
  tune`
0,
133.3335: A4^133.3335,
133.3335: G#4^133.3335,
133.3335: A4^133.3335,
133.3335: C#5^133.3335,
133.3335: A4^133.3335,
133.3335: C#5^133.3335,
800.001: F#5^800.001,
`,
  tune`
0,
133.3335: A3^133.3335,
133.3335: A3^133.3335,
133.3335: A3^133.3335,
133.3335: E3^133.3335,
133.3335: E3^133.3335,
133.3335: E3^133.3335,
800.001: C#4^800.001,
`,
  tune`
0,
133.3335: B1^66.66675,
266.667: B1^66.66675,
133.3335: D2^66.66675,
133.3335: B1^66.66675,
133.3335: B1^66.66675,
800.001: D2^1066.668,
`,
];

let congratsTracks = [
  tune`
`,
  tune`
0,
200: B3^200,
200: B3^200,
200.00000000000006: B3^200.00000000000006,
1300: B3^1300,
300.00000000000006: A3^300.00000000000006,
299.99999999999983: A3^299.99999999999983,
300.0000000000003: B3^300.0000000000003,
2800.0000000000005: C#4^1600,
`,
  tune`
`,
  tune`
0,
200: D#5^200,
200: D#5^200,
200.00000000000006: D#5^200.00000000000006,
1300: E5^1300,
300.00000000000006: C#5^300.00000000000006,
299.99999999999983: C#5^299.99999999999983,
300.0000000000003: D#5^300.0000000000003,
2800.0000000000005: F5^1600,
`,
  tune`
`,
  tune`
0,
200: F#5^200,
200: F#5^200,
200.00000000000006: F#5^200.00000000000006,
1300: G#5^1300,
300.00000000000006: E5^300.00000000000006,
299.99999999999983: E5^299.99999999999983,
300.0000000000003: F#5^300.0000000000003,
2800.0000000000005: G#5^1600,
`,
  tune`
0,
200: G#2^100,
200: G#2^100.00000000000003,
200.00000000000006: G#2^99.99999999999997,
1300: D2^99.99999999999997,
300.00000000000006: B1^99.99999999999987,
299.99999999999983: B1^100.00000000000009,
300.0000000000003: B1^100.00000000000009,
2800.0000000000005: D2^2000.0000000000005,
`,
  tune`
`,
];

setSolids([])

let level = 0
let paused = false
const levels = [
  map`
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
.ddddddddddddddddddddddd.
cdc....c........a.......a
c.c..bfdgbfbfbf.hef.efc.a
c.bf.ea..ccccccd.hn.ngc.a
c.bc.aabfgdgdgdcddg.hdg.a
c.eb.affc.c.ccc.......cta
c.af.hcc.c.cfccbbbbbfbbba
c.fc..ccbbbf.c..bbbfc.bba
c.ncgbbc.bbbcbf.aefccbb.a
c.ac.cbfbbbbbcc.aab...f.a
c.ebcbcccbbbbbc.bbbbbfc.a
c.hfbfcbfdbbbbbbbbbbfcc.a
c..c.acc.cdebbbbbffbccc.a
c.fb.fbcbg.gbfbfdddgbcc.a
cva.e..e....c.c......ec.a
.bbbbbbbbbbbbbbbbbbbbbbb.`,
  map`
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
.ddddddddddddddddddddddd.
cc.c.....c...c.....c.c.da
cdgdgbbahedecc.bf.fdgcd.a
c.dddgd.a.agbfbbcfddcddda
c.a..addaehcccdmmcdcddd.a
c.be.aada.ccc.c.dg.cd.g.a
c.aahadadefdgcgdcdcdc.a.a
cvaaa.adadhdg..gdccdddnta
c.aaaeaaa.a.ccd.gc.c..gda
cdaadaaaf.handg.aggc.ha.a
c.dhddanc..aa.c...ccdddaa
c.ac...cbmdaebcbbecd.a.aa
c.ahgbfb.a..aebc.ba..aa.a
c.h.accdbaemaaebf.bbbae.a
c....e.c..a...aabbbb..aba
.bbbbbbbbbbbbbbbbbbbbbbb.`,
  map`
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
.ddddddddddddddddddddddd.
c........c...c...c..c...a
c.ebebbbfcbf.bcbfccbc.f.a
c.aaabebc.cccfbcccc.bcb.a
c..ae.afbbbc.c.fc.cbbf.ba
cbbabbbc.ebbcbbcc.bbccf.a
cc.bfbfc.bbbbcbbcbbff.c.a
ccfc.cccbbbffbcbbcfcddeta
ccccbfbcc.bf.cbc.fcdddg.a
c.c.cc.ebbbcfbbbbc......a
cbbbbc.babfdgcdmff.cbbf.a
c.ecbbbaafc.cdccc.cb.fc.a
c.bb.ababf.c...ccbbcbbc.a
c.ebbbafbccbbbec.cbbcbf.a
cvbbb.f..bb.e.bbbbcbb.b.a
.bbbbbbbbbbbbbbbbbbbbbbb.`,
  map`
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
.ddddddddddddddddddddddd.
c.a...c..c..c..a...ac...a
c.daebbcbccc.c.bcbabacb.a
cd.aabbe.bbcbbbbb.eaebc.a
c.dabbabebfbc.bbba.acbb.a
c.hddaehgfc.bbbbabbebcbba
cv.adah.cccbfbf.fbaaebc.a
cdaaddddccdgg.bbc.aaebe.a
c..a.c.cdc.cccbfm.aa.aaaa
c.bbaec.cdgccccdd.abmaaha
cbb.aaffc..cccc.cdf.ada.a
c.beae.cc.bbcccc.gcddhg.a
cb.a.aebccbbfccg.dg.ddc.a
c.ebbaaebfcfdgdc.addacd.a
c..f..a.f......c..a.c..ta
.bbbbbbbbbbbbbbbbbbbbbbb.`,
  map`
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
.ddddddddddddddddddddddd.
cv......................a
cbbbbbbbbbbbbbbbbbbbbbf.a
c.ebbbbbbbbbbbbbbbbbbfc.a
c.aebbbbbbbbbbbbbbbbfcc.a
c.aaebbbbbbbbbbbbbbfccc.a
c.aaaebbbbbbbbbbbbfcccc.a
c.aaaaemmmmmmmmmmfccccc.a
c.aaaant.........cccccc.a
c.aaaahmmmmmmmmmmmgcccc.a
c.aaahdddddddddddddgccc.a
c.aahdddddddddddddddgcc.a
c.ahdddddddddddddddddgc.a
c.hdddddddddddddddddddg.a
c.......................a
.bbbbbbbbbbbbbbbbbbbbbbb.`,
  map`
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
uuuuuuuuuuuuuuuuuuuuuuuuu
.ddddddddddddddddddddddd.
c.......................a
c.v...................t.a
c.......................a
c........i.j.k.l........a
c.......................a
c.......................a
c....l.i.a.a.j..........a
c....n.h.h.h.l..........a
c..................c....a
c....c.c.ef.ef.a..ef....a
c....cgg.hg.ai.hd.hg....a
c.......................a
c.......................a
c.......................a
.bbbbbbbbbbbbbbbbbbbbbbb.`
]

setMap(levels[level])

setBackground(floor)

function getPlayer() {
  const sprites = getAll()
  for (var i = 0; i < sprites.length; i++) {
    const tileType = sprites[i].type
    if (tileType == playerRight || tileType == playerUp || tileType == playerLeft || tileType == playerDown) {
      return sprites[i]
    }
  }
}

function getMovable(direction) {
  if (movable == false) {
    return false
  }

  const playerSprite = getPlayer()
  if (direction == "up") {
    const tiles = getTile(playerSprite.x, playerSprite.y)
    const tilesForward = getTile(playerSprite.x, playerSprite.y - 1)

    for (var i = 0; i < tiles.length; i++) {
      const tileType = tiles[i].type
      if (tileType == "b" || tileType == "e" || tileType == "f" || tileType == "m") {
        return false
      }
    }

    for (var i = 0; i < tilesForward.length; i++) {
      const tileType = tilesForward[i].type
      if (tileType == "d" || tileType == "g" || tileType == "h" || tileType == "m") {
        return false
      }
    }
  } else if (direction == "left") {
    const tiles = getTile(playerSprite.x, playerSprite.y)
    const tilesForward = getTile(playerSprite.x - 1, playerSprite.y)

    for (var i = 0; i < tiles.length; i++) {
      const tileType = tiles[i].type
      if (tileType == "a" || tileType == "e" || tileType == "h" || tileType == "n") {
        return false
      }
    }

    for (var i = 0; i < tilesForward.length; i++) {
      const tileType = tilesForward[i].type
      if (tileType == "c" || tileType == "f" || tileType == "g" || tileType == "n") {
        return false
      }
    }
  } else if (direction == "down") {
    const tiles = getTile(playerSprite.x, playerSprite.y)
    const tilesForward = getTile(playerSprite.x, playerSprite.y + 1)

    for (var i = 0; i < tiles.length; i++) {
      const tileType = tiles[i].type
      if (tileType == "d" || tileType == "g" || tileType == "h" || tileType == "m") {
        return false
      }
    }

    for (var i = 0; i < tilesForward.length; i++) {
      const tileType = tilesForward[i].type
      if (tileType == "b" || tileType == "e" || tileType == "f" || tileType == "m") {
        return false
      }
    }
  } else if (direction == "right") {
    const tiles = getTile(playerSprite.x, playerSprite.y)
    const tilesForward = getTile(playerSprite.x + 1, playerSprite.y)

    for (var i = 0; i < tiles.length; i++) {
      const tileType = tiles[i].type
      if (tileType == "c" || tileType == "f" || tileType == "g" || tileType == "n") {
        return false
      }
    }

    for (var i = 0; i < tilesForward.length; i++) {
      const tileType = tilesForward[i].type
      if (tileType == "a" || tileType == "e" || tileType == "h" || tileType == "n") {
        return false
      }
    }
  }

  return true
}

playingTracks = []

function play() {
  bgmTracks.forEach((e) => playingTracks.push(playTune(e, Infinity)))
}

function playRoundEnd() {
  roundEndTracks.forEach((e) => playTune(e))
}

function playCongrats() {
  congratsTracks.forEach((e) => playTune(e))
}

function stop() {
  playingTracks.forEach((e) => e.end())
}

play()

function drawText() {
  clearText()
  addText("RD", {
    x: 7,
    y: 2,
    color: color`2`
  })
  addText("" + (level + 1), {
    x: 10,
    y: 2,
    color: color`6`
  })
  addText("TIME", {
    x: 12,
    y: 2,
    color: color`2`
  })
  addText("" + time, {
    x: 17,
    y: 2,
    color: color`6`
  })
}

function drawSuccess() {
  clearText()
  addText("CONGRATULATIONS!", {
    x: 2,
    y: 2,
    color: color`6`
  })
}

function drawGameOver() {
  clearText()
  addText("GAME OVER!", {
    x: 5,
    y: 2,
    color: color`6`
  })
}

drawText()

onInput("w", () => {
  getPlayer().type = playerUp
  if (getMovable("up")) {
    getPlayer().y -= 1
  }
})

onInput("a", () => {
  getPlayer().type = playerLeft
  if (getMovable("left")) {
    getPlayer().x -= 1
  }
})

onInput("s", () => {
  getPlayer().type = playerDown
  if (getMovable("down")) {
    getPlayer().y += 1
  }
})

onInput("d", () => {
  getPlayer().type = playerRight
  if (getMovable("right")) {
    getPlayer().x += 1
  }
})

afterInput(() => {
  if (movable == false) {
    return
  }

  const playerSprite = getPlayer()
  const tiles = getTile(playerSprite.x, playerSprite.y)
  for (var i = 0; i < tiles.length; i++) {
    const tileType = tiles[i].type
    if (tileType == goal) {
      tiles[i].type = floor
      paused = true
      movable = false
      stop()
      playRoundEnd()
      setTimeout(() => {
        if (level + 2 >= levels.length) { // dont want our test map to show so we add 2 to
          playCongrats() // our level count!
          drawSuccess()
        } else {
          time += 30
          level += 1
          setMap(levels[level])
          movable = true
          paused = false
          drawText()
          play()
        }
      }, 3000)
      return
    }
  }
})

setInterval(() => {
  if (paused == false) {
    time -= 1
    drawText()
    if (time < 0) {
      drawGameOver()
      movable = false
      paused = true
      stop()
      setTimeout(() => {
        level = 0
        time = 60
        movable = true
        paused = false
        setMap(levels[level])
        drawText()
        play()
      }, 3000)
    }
  }
}, 1000)