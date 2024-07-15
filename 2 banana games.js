/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: the two bananas game
@author: sridhar
@tags: ['#bananasarecool']
@addedOn: 2024-00-00
*/

const player1 = "p"
const player2 = "t"
const soccerBall = "s"
const leftGoal = "l"
const rightGoal = "r"
const sumoBounds = "b"
const bBallBasketLeft = "a"
const bBallBasketRight = "c"
const bBall = "d"

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
// to freeze char if its transitioning from one lvl to another
let transitioning = false;

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
...0000000000...`]
)

setSolids(
  [player1, player2, soccerBall, bBall]
)

// game level score
let level = 1
const levels = [
  map`
........
........
........
........
........`, // menu (still need building)
  map`
l...........r
l...........r
l...........r
l...p.s.t...r
l...........r
l...........r
l...........r`, // soccer game
  map`
bbbbbbbbb
b.......b
b.......b
b.......b
b.p...t.b
b.......b
b.......b
b.......b
bbbbbbbbb`, // sumo
  map`
...............
...............
...............
..c..p.d.t..c..
...............
...............
...............` //basketball
]

// core functionality
setMap(levels[level])

// sets title of the game
function resetGameTitle() {
  if (level == 1) {addText("Soccer Game", {y:1, color: color`2`})}
  else if (level == 2) {addText("Sumo Game", {y:1, color: color`0`})}
  else if (level == 3) {addText("Basketball Game", {y:1, color: color`2`})}
}
resetGameTitle();

setPushables({
  [ player1 ]: [ player2, soccerBall, bBall],
  [ player2 ]: [ player1, soccerBall, bBall ],
  [ soccerBall ]: [ player1, player2 ],
  [ bBall ]: [ player1, player2 ]
})

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
  // sumo game functionality
    const playerOneOut = tilesWith(sumoBounds, player1).length;
    const playerTwoOut = tilesWith(sumoBounds, player2).length;
    console.log(playerOneOut, playerTwoOut, ballInLeftGoal, ballInRightGoal)
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
  // basketball game functionality
    const ballInLeftBasket = tilesWith(bBallBasketLeft, bBall).length;
    const ballInRightBasket = tilesWith(bBallBasketRight, bBall).length;
    if (ballInLeftBasket == 1 && !theEnd && !transitioning) {
      addText("player two wins!", { y: 4, color: color`3` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
    }
    else if (ballInRightBasket == 1 && !theEnd && !transitioning) {
      addText("player one wins!", { y: 4, color: color`5` });
      transitioning = true;
      setTimeout(advanceLevel, 3000);
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
    addText("the end!", { y: 4, color: color`0` });
    console.log(theEnd);
  }
  transitioning = false;
}
