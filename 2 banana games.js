/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: the two bananas game
@author: sridhar
@tags: [#bananasarecool]
@addedOn: 2024-00-00
*/

const player = "p"
const player2 = "t"
const soccerBall = "s"
const leftGoal = "l"
const rightGoal = "r"

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


setLegend(
  [ player, bitmap`
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
......000000....`],
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
..0..........0..`],
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
..0..........0..`]
)


setSolids(
  [player, player2, soccerBall]
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
]

// core functionality
setMap(levels[level])

setPushables({
  [ player ]: [ player2, soccerBall ],
  [ player2 ]: [ player, soccerBall ],
  [ soccerBall ]: [player, player2]
})

onInput(upKeyOne, () => {
  getFirst(player).y -= 1
})

onInput(leftKeyOne, () => {
  getFirst(player).x -= 1
})

onInput(downKeyOne, () => {
  getFirst(player).y += 1
})

onInput(rightKeyOne, () => {
  getFirst(player).x += 1
})

onInput(upKeyTwo, () => {
  getFirst(player2).y -= 1
})

onInput(leftKeyTwo, () => {
  getFirst(player2).x -= 1
})

onInput(downKeyTwo, () => {
  getFirst(player2).y += 1
})

onInput(rightKeyTwo, () => {
  getFirst(player2).x += 1
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
  downKeyOne = "l"
}

afterInput(() => {

  // soccer game functionality
    // checks for if goal tiles and the ball tile is in one tile
    const ballInLeftGoal = tilesWith(leftGoal, soccerBall).length;
    const ballInRightGoal = tilesWith(rightGoal, soccerBall).length;
    // if player two scored then and its not the end
    if (ballInLeftGoal == 1 && !theEnd) {
      addText("player two wins!", { y: 4, color: color`3` });
      if (!theEnd)
      {
        setTimeout(advanceLevel,3000);
        theEnd = !theEnd;
      } else {advanceLevel()}
    }
    else if (ballInRightGoal == 1 && !theEnd) {
      addText("player one wins!", { y: 4, color: color`3` });
      if (!theEnd)
      {
        setTimeout(advanceLevel,3000);
        theEnd = !theEnd;
      } else {advanceLevel()}
    }
  
})

// this function makes the game advance to the next lvl
function advanceLevel() {
  level++;
  const nextLevel = levels[level]

  if (nextLevel !== undefined)
  {
    setMap(currentLevel);
  } else {
    clearText();
    addText("the end!", { y:4, color: color`5`});
    console.log(theEnd);
  }
}