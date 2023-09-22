let m;
let r;
let s;
let list = [];
let R1 = new Set();
let R2 = new Set();
let R3 = new Set();
let R4 = new Set();
let R5 = new Set();
let R6 = new Set();

let resultString = "";

function to_output(txt) {
    resultString += txt + "\n"
}

function univ(i) {
  let result = new Set();
  for (let j = 1; j <= i; j++) {
    result.add(j);
  }
  return result;
}

function uni(set1, set2) {
  let result = new Set(set1);
  for (let elem of set2) {
    result.add(elem);
  }
  return result;
}

function dif(set1, set2) {
  let result = new Set();
  for (let elem of set1) {
    if (!set2.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}

function sec(set1, set2) {
  let result = new Set();
  for (let elem of set1) {
    if (set2.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}

function printSet(txt, myset) {
  to_output(txt + [...myset].join(' '));
}

function userInsertInt(text) {
  const userInput = prompt(text + ":\n");
  return parseInt(userInput);
}

function userInsertVec(txt) {
  let integers = [];

  const inputLines = txt.split(/\s+/)

  for (const line of inputLines) {
    let num = parseInt(line);
    if (!isNaN(num)) {
      integers.push(num);
    } else {
      console.error("Invalid input. Please enter an integer.");
    }
  }

  if (integers.length === 0) {
    to_output("List has no elements. Try again!");
    return userInsertVec(txt);
  }

  to_output("You entered the following integers:");
  to_output(integers.join(' '));
  to_output("------------------");
  return integers;
}

function userInsert(txt) {
  let integers = new Set();

  const inputLines = txt.trim().split(/\s+/);
  for (const line of inputLines) {
    let num = parseInt(line);
    if (!isNaN(num)) {
      integers.add(num);
    } else {
      console.error("Invalid input. Please enter an integer.");
    }
  }

  to_output("You entered the following integers:");
  to_output([...integers].join(' '));
  return integers;
}

function userInsertInt(txt) {
    const inputLines = txt.trim().split(/\s+/);

    for (const line of inputLines) {
        let num = parseInt(line);
        if (!isNaN(num)) {
          return num;
        } else {
          console.error("Invalid input. Please enter an integer.");
          return userInsertInt(txt)
        }
      }
}


function getCalcRes(i) {
  if (i >= list.length) {
    to_output("Sry \"list\" was too short!!!!!!!!!!!!!!!!!!!!!");
    return -1000000000000000000;
  }

  let ii = i + 1;
  if (R1.has(ii)) {
    return (2 * m - 1) * (2 * m - 1) * list[i];
  } else if (R2.has(ii)) {
    return 2 * (m - 1) * (2 * m - 1) * list[i];
  } else if (R3.has(ii)) {
    return 2 * 2 * (m - 1) * (2 * m - 1) * list[i];
  } else if (R4.has(ii)) {
    return 2 * 2 * m * m * list[i];
  } else if (R5.has(ii)) {
    return 2 * 2 * m * (m - 1) * list[i];
  } else if (R6.has(ii)) {
    return 2 * m * (2 * m - 1) * list[i];
  }
  return 0;
}

function doStuff(input) {
  resultString = ""
  const lines = input.trim().split('\n');

  list = userInsertVec(lines.shift());

  const A1 = userInsert(lines.shift());
  const A2 = userInsert(lines.shift());
  const A3 = userInsert(lines.shift());

  const B1 = userInsert(lines.shift());
  const B2 = userInsert(lines.shift());
  const B3 = userInsert(lines.shift());

  r = userInsertInt(lines.shift());
  to_output("r: " + r)
  s = userInsertInt(lines.shift());
  to_output("s: " + s)
  m = userInsertInt(lines.shift());
  to_output("m: " + m)

  const rs = r + s;

  R1 = sec(uni(A2, A3), uni(B2, B3));
  R2 = uni(sec(uni(A2, A3), A1), sec(uni(B2, B3), B1));
  R3 = sec(A1, B1);
  R4 = sec(dif(univ(rs), uni(uni(A1, A2), A3)), dif(univ(rs), uni(uni(B1, B2), B3)));
  R5 = uni(sec(A1, dif(univ(rs), uni(uni(B1, B2), B3))), sec(B1, dif(univ(rs), uni(uni(A1, A2), A3))));
  R6 = uni(sec(uni(A2, A3), dif(univ(rs), uni(uni(B1, B2), B3))), sec(uni(B2, B3), dif(univ(rs), uni(uni(A1, A2), A3))));

  to_output("::::::::::::::::RESULT:::::::::::::::::");
  printSet("R1: ", R1);
  printSet("R2: ", R2);
  printSet("R3: ", R3);
  printSet("R4: ", R4);
  printSet("R5: ", R5);
  printSet("R6: ", R6);

  let result = 0;
  for (let i = 0; i < rs; i++) {
    let res = getCalcRes(i);
    if (i > r) res *= 2;
    result += res;
  }

  to_output("result: " + result);
  to_output(":::::::::::::RESULT:END::::::::::::::::");
  return resultString
}

const input = `1 2 3 4 5
1 2 3
2 3 4
3 4 5
5 6 7
6 7 8
7 8 9
2
3
4`;

//doStuff(input);
