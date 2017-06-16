# ex-pipe

## Introduction
This is a very tiny library to help make composing functions a lot easier.
Inspiration for this library was taken from the Elixir programming language.
Specifically the pipe operator or |>. The library takes an initial value, and
an arbitrary number of pipe stages and passes the output of the previous pipe stage
as input for the next pipe stage. See usage section for examples or the Elixir School
page on the pipe operator [Elixir School](https://elixirschool.com/lessons/basics/pipe-operator/).

## Installation
`npm install --save ex-pipe`

## Usage
The idea here is to be able to compose functions easily and pass the result of one
as input to the next. For example, if I had the following functions:
```javascript
function AddOne(val) {
  return val +1;
}

function MultiplyFive(val) {
  return val * 5;
}

function DivideTwo(val) {
  return val / 2;
}

```

I could easily compose them as follows:
```javascript
let P = require('ex-pipe').ExecPipe;

P(10,
  AddOne,
  MultiplyFive,
  DivideTwo
); // Output of 27.5
```

You can also pass more than one variable to the provided functions. Like Elixir, the output of the
previous function is the first argument into the next function, and any arguments come after. See below:
```javascript
let P = require('ex-pipe').ExecPipe;

function AddVal(val, add) {
  return val + add;
}

P(10,
  [AddVal, 5],
  [AddVal, 10],
); // Output of 25

```


You can also create reusable pipelines of functions like so:
```javascript
let G = require('ex-pipe').GenPipe;

function AddFive(val) {
  return val + 5;
}

function AddTen(val) {
  return val +10
}

let AddFifteen = G(
  AddFive,
  AddTen
);

AddFifteen(10); // Output 25
```
