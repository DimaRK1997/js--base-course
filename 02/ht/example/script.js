/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
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
        if (!(objA[v] === objA && objB[v] === objB)) {
          if (!isDeepEqual(objA[v], objB[v])) {
            return false;
          }
        }
      }
      return true;
    }
  } else if (typeof objB === "number" && typeof objA === "number") {
    return isNaN(objA) && isNaN(objB);
  }
  return false;
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
  return function () {
    func.apply(context, arguments);
  };
}

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function (context) {
  return bind(this, context);
};

/**
 * создать объект с волшебным свойством,
 * чтобы при присвоении ему значения, в консоль выводилась текущая дата и значение, которое присваиваем.
 * А при чтении всегда выводилось число на 1 больше предыдущего
 * o.magicProperty = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
 * console.log(o.magicProperty); // 6
 * console.log(o.magicProperty); // 7
 * console.log(o.magicProperty); // 8
 */

let o = {
  count: 0,
  get magicProperty() {
    return (this.count += 1);
  },
  set magicProperty(value) {
    this.count = value;
    console.log(new Date() + "--" + this.count);
  },
};

/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */

function ASK() {
  this.askName = function () {
    this.name = prompt("You name?", "");
    return this;
  };
  this.askAge = function () {
    this.age = prompt("Age?", "");
    return this;
  };
  this.showAgeInConsole = function () {
    console.log("You name is " + this.age);
    return this;
  };
  this.showNameInAlert = function () {
    alert("You name is " + this.name);
    return this;
  };
}

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

function calculate(z) {
  return function (a) {
    return function (b) {
      switch (z) {
        case "+":
          return a + b;
        case "*":
          return a * b;
        case "-":
          return a - b;
        case "/":
          return a / b;
      }
    };
  };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
  if (Singleton.example === undefined) {
    Singleton.example = this;
  }
  return Singleton.example;
}
/**
 * Создайте функцию ForceConstructor
 * которая работает как конструктор независимо от того,
 * вызвана она с new или без
 * и сохраняет параметры в создаваемый объект с именами параметров
 */
function ForceContructor(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  if (!new.target) {
    return new ForceContructor(a, b, c);
  }
}

/**
 * Написать фукнцию сумматор, которая будет работать
 * var s = sum();
 * log(s); // 0
 * log(s(1)); // 1
 * log(s(1)(2)); //3
 * log(s(3)(4)(5)); // 12
 * Число вызовов может быть неограниченым
 */
function sum(a) {
  let res = a || 0;

  function f(b) {
    b = b || 0;
    return sum(res + b);
  }
  f.toString = function () {
    return res;
  };

  return f;
}

function log(x) {
  console.log(+x);
}

/**
 * Написать каррирующую функцию и покрыть ее тестами
 * Функция должна поддерживать каррирование функций с 2,3,4,5 параметрами
 * пример работы  функции
 *
 * function target1(a,b,c,d) { return a + b + c + d }
 * function target2(a,b) { return a + b }
 * curry(target1)(1)(2)(3)(4) // 10
 * curry(target2)(5)(8) // 13
 *
 * Примеры тестов смотреть в файле тестов
 *
 * Читать
 * http://prgssr.ru/development/vvedenie-v-karrirovanie-v-javascript.html
 * https://github.com/MostlyAdequate/mostly-adequate-guide-ru/blob/master/ch4-ru.md
 * @param {*} func
 */


 function target1(a,b,c,d) { 
  return a + b + c + d 
}

function curry(func) {
  let arr = [];
  let res = 0;
  function check(a) {
    arr.push(a);
    if(arr.length < func.length) {
      return check;
    } else {
      for(let v of arr) {
        res += v;
      }
      return res;
    }
  }
  return check;
}

console.log(curry(target1)(1)(2)(3)(4));
/*
Написать код, который для объекта созданного с помощью конструктора будет показывать,
что объект является экземпляром двух классов
*/

function User() {}

function PreUser() {}

User.prototype = Array.prototype;
PreUser.prototype = Array.prototype;

/* Тут ваш код */
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

/*
Создать веб страницу. Добавить на нее форму с полями
- имя (строкое поле),
- родной город (Выпадающий список),
- Комментарий (многострочное поле), пол (radiobutton).
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой,
после чего поля очистить.
*/

/*
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {}
