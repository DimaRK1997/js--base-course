/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a
 */
function log(a) {
  console.log(a);
}

/* Раместите ваш код ниже */

/**
 * реализовать фукнцию `fizzBuzz`
 * которая выводит числа от 1 до 100.
 * Если число кратно 3 - вместо числа вывести `Fizz`.
 * Если кратно 5 - вывести вместо числа `Buzz`.
 * Если число кратно и 3 и 5 - вывести вместо числа `FizzBuzz`.
 * Для вывода использовать фукнцию `log` (аналогично заданию в классе).
 * В теле функции нельзя использовать  `if`, `switch`, тернарный оператор `? :`
 */
function fizzBuzz() {
  for (let i = 1; i <= 100; i++) {
    (i % 15 === 0 && log("FizzBuzz")) ||
      (i % 3 === 0 && log("Fizz")) ||
      (i % 5 === 0 && log("Buzz")) ||
      log(i);
  }
}

/**
 * реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */

function isPolindrom(textString) {
  return textString === textString.split("").reverse().join("");
}

/**
 * Реализовать фукнцию `drawCalendar` ,
 * которая принимает три аргумента - год, месяц, htmlElement
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).
 * @param {number} year
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl
 */
function drawCalendar(year, month, htmlEl) {
  let data = new Date(year, month, 0);
  let dayweek = `<table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  for (let i = 1; i <= data.getDay() + 1; i++) {
    dayweek += `<td></td>`;
  }
  for (
    let i = data.getDay(), n = 0;
    i <= data.getDate() + data.getDay();
    i++, n++
  ) {
    if (i % 7 === 0 && i !== 0) dayweek += `</tr><tr>`;
    if (n !== 0) dayweek += `<td>${n}</td>`;
  }
  dayweek += `</tr>`;
  htmlEl.innerHTML = dayweek;
}

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
  /* Ваше решение */
  if (objA === objB) {
    return true;
  } else if (
    objA !== null &&
    typeof objA === "object" &&
    typeof objB === "object" &&
    objB !== null
  ) {
    if (Object.keys(objA).length === Object.keys(objB).length) {
      for (let v in objA) {
        if (!isDeepEqual(objA[v], objB[v])) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}

function quadraticEquation(a, b, c) {
  let arr = [];
  let d = Math.pow(b, 2) - 4 * a * c;
  if (d === 0) {
    arr.push((-1 * b + Math.pow(d, 0.5)) / (2 * a));
  } else if (d > 0) {
    arr.push(
      (-1 * b + Math.pow(d, 0.5)) / (2 * a),
      (-1 * b - Math.pow(d, 0.5)) / (2 * a)
    );
  }
  return arr;
}

function spiral(arr) {
  const size = [].concat(...arr).length;
  let res = [];
  let row = 0;
  let maxrowy = arr.length - 1;
  let col = 0;
  let maxcolx = arr[row].length - 1;

  while (res.length < size) {
    for (let i = col; i <= maxcolx; i++) {
      res.push(arr[row][i]);
    }
    row++;
    for (let i = row; i <= maxrowy; i++) {
      res.push(arr[i][maxcolx]);
    }
    maxcolx--;
    for (let i = maxcolx; col <= i; i--) {
      res.push(arr[maxrowy][i]);
    }
    maxrowy--;
    for (let i = maxrowy; row <= i; i--) {
      res.push(arr[i][col]);
    }
    col++;
  }
  return res;  
}

