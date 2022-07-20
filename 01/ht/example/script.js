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
    (i % 15 === 0) && log("FizzBuzz") ||
    (i % 3 === 0) && log("Fizz") ||
    (i % 5 === 0) && log("Buzz") ||
    log(i);
  }
}
fizzBuzz();


/**
 * реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */

let swap;
function isPolindrom(textString) {
  /* Ваше решение */
  swap = textString;
  swap = swap.split('').reverse().join('');
  return textString == swap;
}
isPolindrom('asdasfff')

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
  for (let i = data.getDay(), n = 0; i <= data.getDate() + data.getDay(); i++, n++) {
    if (i%7 == 0 && i != 0) dayweek += `</tr><tr>`;
    if (n != 0) dayweek += `<td>${n}</td>`;
  }
  dayweek += `</tr>`;
  htmlEl.innerHTML = dayweek;
}
drawCalendar(2022, 7, document.createElement("div"))


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
  } else if ((objA != null && typeof objA == 'object') && (typeof objB == 'object' && objB != null)) {
    if (Object.keys(objA).length == Object.keys(objB).length) {
      for (let v in objA) {
        if (!isDeepEqual(objA[v], objB[v])) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
isDeepEqual({name: 3, family: { man: 'dima', woman: 'vika'}}, {family: { man: 'dima', woman: 'vika'}});


function quadraticEquation(a, b, c) {
  let d = Math.pow(b, 2) - 4*a*c;
  if(d == 0) {
    return `[${(-1*b + Math.pow(d, 0.5))/(2*a)}]`;
  } else if(d < 0) {
    return `[]`;
  } else {
    return `[${(-1*b + Math.pow(d, 0.5))/(2*a)}, ${(-1*b - Math.pow(d, 0.5))/(2*a)}]`;
  }
}
quadraticEquation(1, 10, 9);

function spiral(arr) {
  for (let i = 0; i < arr.length; i++) {
    for ( let j = 0; j < arr[i].length; j++) {
      

    }
    console.log(arr[i])
  }
}
spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);