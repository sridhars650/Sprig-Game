/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: the banana game
@author: sridhar
@tags: [#bananasarecool]
@addedOn: 2024-00-00
*/

const player = "p"
const player2 = "t"
const soccerBall = "s"
const goal = "g"


// for computer people; one and two stands for player one and player two
let upKeyOne = "w"
let leftKeyOne = "a"
let downKeyOne = "s"
let rightKeyOne = "d"

let upKeyTwo = "i"
let leftKeyTwo = "j"
let downKeyTwo = "k"
let rightKeyTwo = "l"


setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ player2, bitmap`
................
....00000000....
....0......0....
....0......0....
....0......0....
....0......0....
....0......0....
....00000000....
................
.....0....0.....
.....0....0.....
.....0....0.....
.....0....0.....
....00....00....
................
................`],
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
  [ goal, bitmap`
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
  [player, player2 , soccerBall]
)

let level = 0
const levels = [
  map`
g...........g
g...........g
g...........g
g...p.s.t...g
g...........g
g...........g
g...........g`
]

setMap(levels[level])

setPushables({
  [ player ]: [ soccerBall, player2],
  [ player2 ]: [ soccerBall, player]
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
  // checks for if goal tiles and the ball tile is in one tile
  const ballInGoal = tilesWith(goal, soccerBall).length;
  if (ballInGoal == 1) {
    addText("you win!", { y: 4, color: color`3` });
  }
  
})