function Calendar(options) {
  localStorage.setItem("objOptions", JSON.stringify(options));
  this.element = document.querySelector("#" + options.el);
  this.setShowMonth = showMonth(options.showMonth);
  this.setAllowAdd = allowAdd(options.allowAdd);
  this.setAllowRemove = allowRemove(options.allowRemove);
  this.setMonthDate = month;
  this.setYearDate = year;
}

function showMonth(option) {
  //if (option) console.log("запустить функцию showMonth");
}

function allowAdd(option) {
  //if (option) console.log("запустить функцию allowAdd");
}

function allowRemove(option) {
  //if (option) console.log("запустить функцию allowRemove");
}

function month(bool) {}
function year(bool) {}

function drawInteractiveCalendar(el) {
  el.innerHTML = `
<div class="title">
  <button class="last">&#11164;</button>
  <div class="text-date">
    <span class="month"></span>/<span class="year"></span>
  </div>
  <button class="next">&#11166;</button>
</div>
<div class="table_calendar"></div>
<div class="content-notes"></div>`;

  const headerElement = el.querySelector(".title");
  const monthElement = el.querySelector(".month");
  const yearElement = el.querySelector(".year");
  const contentElement = el.querySelector(".table_calendar");

  const date = new Date();

  drawCalendarTable(date.getFullYear(), date.getMonth(), contentElement);

  const calendarNotes = JSON.parse(localStorage.getItem(el.id)) || [];

  contentElement.addEventListener("click", function (e) {
    const target = e.target;
    if (Number(target.textContent)) {
      const eventDate = prompt(`Заметка на ${target.textContent}`, "");
      if (!eventDate) return;
      const noteDate = `${target.textContent}.${monthElement.textContent}.${yearElement.textContent}: ${eventDate}`;
      saveCalendarNotes(noteDate, el, calendarNotes);
      drawCalendarNotes(el.querySelector(".content-notes"), calendarNotes);
    }
  });

  monthElement.textContent = date.getMonth() + 1;
  yearElement.textContent = date.getFullYear();

  headerElement.addEventListener("click", function (e) {
    if (e.target.matches(".last")) {
      date.setMonth(date.getMonth() - 1);
    } else if (e.target.matches(".next")) {
      date.setMonth(date.getMonth() + 1);
    }
    monthElement.textContent = date.getMonth() + 1;
    yearElement.textContent = date.getFullYear();
    drawCalendarTable(date.getFullYear(), date.getMonth(), contentElement);
  });
  el.addEventListener("load", drawCalendarNotes(el.querySelector(".content-notes"), calendarNotes));
}

function drawCalendarTable(year, month, htmlEl) {
  const date = new Date(year, month);
  let table = `<table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  const startDayWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;
  table += `${"<td></td>".repeat(startDayWeek)}`;
  while (date.getMonth() === month) {
    table += `<td>${date.getDate()}</td>`;
    if ((date.getDate() + startDayWeek) % 7 === 0) {
      table += `</tr><tr>`;
    }
    date.setDate(date.getDate() + 1);
  }
  table += `</tr></table>`;
  htmlEl.innerHTML = table;
}

function saveCalendarNotes(textNote, element, calendarNotes) {
  calendarNotes.push(textNote);
  localStorage.setItem(element.id, JSON.stringify(calendarNotes));
}

function drawCalendarNotes(notesCalendar, calendarNotes) {
  notesCalendar.innerHTML = calendarNotes.map((note) => `<p>${note}</p>`).join("");
}

function getRandId() {
  return `n${Math.random() * 10 ** 18}`;
}

function createNewCalendar(idNew) {
  if (document.querySelector(`#${idNew}`)) document.querySelector(`#${idNew}`).remove();
  const creatElement = document.createElement("div");
  creatElement.id = idNew;
  document.querySelector("body").appendChild(creatElement);
  drawInteractiveCalendar(document.querySelector(`#${idNew}`));
}

function createCalendars() {
  const arrCalendars = JSON.parse(localStorage.getItem("calendars")) || [getRandId(), getRandId()];
  arrCalendars.map((id) => createNewCalendar(id));
  localStorage.setItem("calendars", JSON.stringify(arrCalendars));
}

// createCalendars();
