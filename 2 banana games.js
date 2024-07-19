/*
@title: the two bananas game
@author: sridhar
@tags: ['#bananasarecool']
@addedOn: 2024-00-00
*/

// all sprites
const player1 = "p"
const player2 = "t"
const soccerBall = "s"
const leftGoal = "l"
const rightGoal = "r"
const sumoBounds = "b"
const bBallBasketLeft = "a"
const bBallBasketRight = "c"
const bBall = "d"
const finishLine = "f"
const obstacle = "o"
const obstacle2 = "q"

// for computer people; one and two stands for player one and player two
let upKeyOne = "w"
let leftKeyOne = "a"
let downKeyOne = "s"
let rightKeyOne = "d"

let upKeyTwo = "i"
let leftKeyTwo = "j"
let downKeyTwo = "k"
let rightKeyTwo = "l"

//bool val where it checks if its the end
let theEnd = false;
// basketball game - to check if ball is at top
let isAtTop = false;
// temp var for bball game
let count = 0;
// to freeze char if its transitioning from one lvl to another
let transitioning = false;

// menu stuffs
let menuPCColor = 0;
let menuConsoleColor = 0;
let menuHelpColor = 9;
let menuSelection = "Play on PC"

setLegend(
  [ player1, bitmap`
................
................
.......000......
.......050......
......0550......
......05550.0...
....0005550.0...
....0.0555000...
....0.05550.....
......05550.....
.....055550.....
.....05550......
......000.......
......0.0.......
.....00.00......
................` ],
  [ player2, bitmap`
................
................
......000.......
......030.......
......0330......
...0.03330......
...0.0333000....
...0003330.0....
.....03330.0....
.....03330......
.....033330.....
......03330.....
.......000......
.......0.0......
......00.00.....
................` ],
  [ soccerBall, bitmap`
.....00000000...
..000.......00..
.00..........00.
00.00.........0.
0..0......00..00
0.........00...0
0..............0
0..............0
0..00...00.....0
0..00...00.....0
0..............0
00.........0..00
.00.......00..0.
..00........000.
...000.....00...
......000000....`], // soccer game
  [ leftGoal, bitmap`
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..`], // soccer game
  [ rightGoal, bitmap`
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..
.0............0.
..0..........0..`], // soccer game
  [ sumoBounds, bitmap`
0.0.0.0..0.0.0.0
.0.0.0....0.0.0.
0.0.0.0..0.0.0.0
.0.0.0....0.0.0.
0.0.0.0..0.0.0.0
................
0.....0..0.....0
.0.0.0....0.0.0.
0.....0..0.....0
................
................
0.0.0.0..0.0.0.0
.0.0.0....0.0.0.
0.0.0.0..0.0.0.0
.0.0.0....0.0.0.
0.0.0.0..0.0.0.0`], // sumo game
  [ bBallBasketLeft, bitmap`
................
................
................
................
0000000000000000
..0.0.0..0.0.0..
..000000000000..
..0.0.0..0.0.0..
...0000000000...
....0.0..0.0....
....00000000....
....0.0..0.0....
.....00..00.....
......0000......
................
................`],
  [ bBallBasketRight, bitmap`
................
................
................
................
0000000000000000
..0.0.0..0.0.0..
..000000000000..
..0.0.0..0.0.0..
...0000000000...
....0.0..0.0....
....00000000....
....0.0..0.0....
.....00..00.....
......0000......
................
................`],
  [ bBall, bitmap`
...0000000000...
..099999099990..
.00999990990990.
0990999900990990
0999099990099990
0999909999009990
0999990999900990
0000999099990000
0990099909999990
0999009990999990
0999900999099990
0990990099909990
0999099099990990
.09999909999900.
..099990999990..
...0000000000...`],
  [ finishLine, bitmap`
0.0.0.0..0.0.0.0
.0.0.0.00.0.0.0.
0.0.0.0..0.0.0.0
.0.0.0.00.0.0.0.
0.0.0.0..0.0.0.0
.0.0.0.00.0.0.0.
0.0.0.0..0.0.0.0
.0.0.0.00.0.0.0.
0.0.0.0..0.0.0.0
.0.0.0.00.0.0.0.
0.0.0.0..0.0.0.0
.0.0.0.00.0.0.0.
0.0.0.0..0.0.0.0
.0.0.0.00.0.0.0.
0.0.0.0..0.0.0.0
.0.0.0.00.0.0.0.`],
  [ obstacle, bitmap`
................
.....0000000....
.....0111110....
.....0111110....
.....0111110....
.....0111110....
0000000000000000
0DDDDDDDDDDDDDD0
0D0DDDDDDDDDDDD0
0D0DDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0000000000000000
..0L0.....0L0...
..000.....000...
................
................`],
  [ obstacle2, bitmap`
......0000......
......0990......
.....009900.....
.....029920.....
.....092290.....
....00999900....
....09999990....
....02999920....
....09222290....
.00009999990000.
0099009999009900
0999900000099990
0099999999999900
.00099999999000.
...000099000....
......0000......`]
)

setSolids(
  [player1, player2, soccerBall, bBall, obstacle, obstacle2]
)

// game level score
let level = 0
const levels = [
  map`
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................`, // menu (still need building) ; 0
  map`
l...........r
l...........r
l...........r
l...p.s.t...r
l...........r
l...........r
l...........r`, // soccer game;1
  map`
bbbbbbbbb
b.......b
b.......b
b.......b
b.p...t.b
b.......b
b.......b
b.......b
bbbbbbbbb`, // sumo;2
  map`
...............
...............
...............
..a..p.d.t..c..
...............
...............
...............`, // basketball;3
  map`
qqqq.q.q..q..q..q..q..f
p....q.q...o.q..o..q..f
qq...q.q.o...q...q.q.qf
.q.........q..q...o..qf
.qq..o.....q....q..o.qf
.qq..q..q..q..o.q....qf
.q......q..q....o.qqqqf
qq....q.o...o.o.q.q...f
t.....q.o.....q.qqq.o.f
qqqq..q.q..q.q......o.f` // the race;4
]

// core functionality
setMap(levels[level])
setPushables({
  [ player1 ]: [ player2, soccerBall, bBall],
  [ player2 ]: [ player1, soccerBall, bBall ],
  [ soccerBall ]: [ player1, player2 ],
  [ bBall ]: [ player1, player2 ]
})

// sets title of the game
function resetGameTitle() {
  if (level == 1) {addText("Soccer Game", {y:1, color: color`2`})}
  else if (level == 2) {addText("Sumo Game", {y:2, color: color`0`})}
  else if (level == 3) {addText("Basketball Game", {y:1, color: color`2`})}
  else if (level == 4) {addText("The Race", {y:1,color:color`2`})}
}
resetGameTitle();
function setMenu() {
  addText("Play on PC", {
    x:1,
    y:1,
    color: color`${menuPCColor}`,
  })
  addText("Play on Console", {
    x:1,
    y:3,
    color: color`${menuConsoleColor}`
  })
  addText("Help", {
    x:1,
    y:5,
    color: color`${menuHelpColor}`
  })
  addText("Left Controls:", {
    x:1,
    y:10,
    color: color`0`
  })
  addText("to navigate menu", {
    x:1,
    y:11,
    color: color`0`
  })
  addText("Right Down Key:", {
    x:1,
    y:13,
    color: color`0`
  })
  addText("to select", {
    x:1,
    y:14,
    color: color`0`
  })
}
setMenu()

// THIS IS ONLY FOR MENU
if (level == 0) {
  onInput(upKeyOne, () => {
    if (menuPCColor != 9) {
      if (menuHelpColor == 9) {
        menuHelpColor = 0
        menuConsoleColor = 9;
        menuSelection = "Help"
        setMenu()
      }
      else if (menuConsoleColor == 9) {
        menuConsoleColor = 0;
        menuPCColor = 9;
        menuSelection = "Play on Console"
        setMenu()
      }
    }
  })
}

// if statement ensures for menu only
if (level > 0) {
  onInput(upKeyOne, () => {
    if (!transitioning) getFirst(player1).y -= 1
  })
  
  onInput(leftKeyOne, () => {
    if (!transitioning) getFirst(player1).x -= 1
  })
  
  onInput(downKeyOne, () => {
    if (!transitioning) getFirst(player1).y += 1
  })
  
  onInput(rightKeyOne, () => {
    if (!transitioning) getFirst(player1).x += 1
  })
  
  onInput(upKeyTwo, () => {
    if (!transitioning) getFirst(player2).y -= 1
  })
  
  onInput(leftKeyTwo, () => {
    if (!transitioning) getFirst(player2).x -= 1
  })
  
  onInput(downKeyTwo, () => {
    if (!transitioning) getFirst(player2).y += 1
  })
  
  onInput(rightKeyTwo, () => {
    if (!transitioning) getFirst(player2).x += 1
  })
}
// rebinds the wasd keys for console to make 2 player easier
function rebindKeysForConsole() {
  // player one controls on console
  upKeyOne = "d"
  leftKeyOne = "w"
  rightKeyOne = "s"
  downKeyOne = "a"
  // for player two controls on console
  upKeyTwo = "j"
  leftKeyTwo = "k"
  rightKeyTwo = "i"
  downKeyTwo = "l"
}

afterInput(() => {

  // soccer game functionality
  if (level == 1) {
    // checks for if goal tiles and the ball tile is in one tile
    const ballInLeftGoal = tilesWith(leftGoal, soccerBall).length;
    const ballInRightGoal = tilesWith(rightGoal, soccerBall).length;
    // if player two scored then and its not the end
    if (ballInLeftGoal == 1 && !theEnd && !transitioning) {
      addText("player two wins!", { y: 4, color: color`3` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
    else if (ballInRightGoal == 1 && !theEnd && !transitioning) {
      addText("player one wins!", { y: 4, color: color`5` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
  }
  // sumo game functionality
  if (level == 2) {
    const playerOneOut = tilesWith(sumoBounds, player1).length;
    const playerTwoOut = tilesWith(sumoBounds, player2).length;
    if (playerOneOut == 1 && !theEnd && !transitioning) {
      addText("player two wins!", { y: 4, color: color`3` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
    else if (playerTwoOut == 1 && !theEnd && !transitioning) {
      addText("player one wins!", { y: 4, color: color`5` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
  }
  // basketball game functionality
  if (level == 3) { 
    const ballInLeftBasket = tilesWith(bBallBasketLeft, bBall).length;
    const ballInRightBasket = tilesWith(bBallBasketRight, bBall).length;
    // checks if ball is on top of basket
    if (((getFirst(bBall).x == 12) && getFirst(bBall).y == 2))
    {
      isAtTop = true;
      setSolids([player1, player2, soccerBall, bBall, obstacle, obstacle2])
      count = 0
    }
    else if (((getFirst(bBall).x == 2) && getFirst(bBall).y == 2))
    {
      isAtTop = true;
      setSolids([player1, player2, soccerBall, bBall, obstacle, obstacle2])
      count = 0
    }
      // else it counts; this counter is to prevent it from not working when in goal
    else {count++}
    // checks how long it can be set to "on top of basket goal" 
    if (count == 2)
    {
        isAtTop = false;
        setSolids([player1, player2, soccerBall, bBall, obstacle, obstacle2, bBallBasketLeft, bBallBasketRight])
        count = 0;
    }
    // goal functionality
    if (ballInLeftBasket == 1 && !theEnd && !transitioning && isAtTop) {
      addText("player two wins!", { y: 4, color: color`3` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
    else if (ballInRightBasket == 1 && !theEnd && !transitioning && isAtTop) {
      addText("player one wins!", { y: 4, color: color`5` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
  }
  // the race game functionality
  if (level == 4) {
    const playerOneInFinishLine = tilesWith(finishLine, player1).length;
    const playerTwoInFinishLine = tilesWith(finishLine, player2).length;
    if (playerOneInFinishLine == 1 && !theEnd && !transitioning) {
      addText("player one wins!", { y: 13, color: color`5` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
    else if (playerTwoInFinishLine == 1 && !theEnd && !transitioning) {
      addText("player two wins!", { y: 13, color: color`3` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
  }
})

// this function makes the game advance to the next level
function advanceLevel() {
  level++;
  const nextLevel = levels[level]

  if (nextLevel !== undefined) {
    clearText();
    setMap(nextLevel);
    resetGameTitle();
  } else {
    clearText();
    theEnd = true;
    addText("the end!", { y: 2, color: color`H` });
    console.log(theEnd);
  }
  transitioning = false;
}
