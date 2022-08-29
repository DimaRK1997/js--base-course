class Storage {
  setData(key, value) {
    Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
  }
  getData(key) {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
}

const storage = new Storage();

function Calendar(options) {
  this.id = idCheck(options);
  createCalendar = createNewCalendar(this.id);
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

function drawInteractiveCalendar(el) {
  const date = new Date();

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

  drawCalendarTable(date.getFullYear(), date.getMonth(), contentElement);

  contentElement.addEventListener("click", function (e) {
    storage.getData(el.id).then((res) => {
      res = res || [];
      if (res) {
        const target = e.target;
        if (Number(target.textContent) && !target.classList.contains("day_no-active")) {
          const eventDate = prompt(`Заметка на ${target.textContent}`, "");
          if (!eventDate) return;
          const noteDate = `${target.textContent}.${monthElement.textContent}.${yearElement.textContent}: ${eventDate}`;
          saveCalendarNotes(noteDate, el, res);
          drawCalendarNotes(el.querySelector(".content-notes"), res);
        }
      }
    });
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

  storage.getData(el.id).then((res) => {
    res = res || [];
    el.addEventListener("load", drawCalendarNotes(el.querySelector(".content-notes"), res));
  });
}

function drawCalendarTable(year, month, htmlEl) {
  const datelast = new Date(year, month, 0);
  const date = new Date(year, month);

  let table = `<table><tr class="day-week"><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  const startDayWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;

  for (let i = datelast.getDate() - startDayWeek + 1; i <= datelast.getDate(); i++) {
    table += `<td class="day_no-active">${i}</td>`;
  }

  let daysMonth = 0;

  while (date.getMonth() === month) {
    table += `<td>${date.getDate()}</td>`;
    if ((date.getDate() + startDayWeek) % 7 === 0) {
      table += `</tr>`;
    }
    date.setDate(date.getDate() + 1);
    daysMonth++;
  }

  const addTDtable = 42 - startDayWeek - daysMonth;
  for (let i = 1; i <= addTDtable; i++) {
    if (i === addTDtable - 6 && i !== 36) {
      table += `</tr><tr>`;
    }
    table += `<td class="day_no-active">${i}</td>`;
  }

  table += `</tr></table>`;
  htmlEl.innerHTML = table;
}

function saveCalendarNotes(textNote, element, calendarNotes) {
  calendarNotes.push(textNote);
  storage.setData(element.id, calendarNotes);
}

function drawCalendarNotes(notesCalendar, calendarNotes) {
  notesCalendar.innerHTML = calendarNotes.map((note) => `<p>${note}</p>`).join("");
}

function getRandId() {
  return `n${Math.random() * 10 ** 18}`;
}

function createNewCalendar(idNew) {
  const creatElement = document.createElement("div");
  creatElement.id = idNew;
  document.querySelector(".calendar-textarea").appendChild(creatElement);
  drawInteractiveCalendar(document.querySelector(`#${idNew}`));
}

function idCheck(obj) {
  obj.el = obj.el || getRandId();
  storage.setData("settingsCalendar", obj);
  return obj.el;
}
