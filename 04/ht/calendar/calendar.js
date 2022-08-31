class Storage {
  setData(key, value) {
    Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
  }
  getData(key) {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
}

const dataNotes = {
  id: "",
  text: "",
};

const date = new Date();
const storage = new Storage();

function Calendar(options) {
  this.id = idCheck(options);
  createCalendar = createNewCalendar(this.id, options);
}

function drawInteractiveCalendar(el, options) {
  el.innerHTML = `
    <div class="title" ${!options.date ? "style='display: none'" : ""}>
      <button class="last" ${!options.showMonth ? "disabled" : ""}>&#11164;</button>
      <div class="text-date">
        <span class="month"></span>/<span class="year"></span>
      </div>
      <button class="next" ${!options.showMonth ? "disabled" : ""}>&#11166;</button>
    </div>
    <div class="table_calendar" add-notes=${options.allowAdd}></div>
    <div class="content-notes" remove-notes=${options.allowRemove}></div>`;

  const headerElement = el.querySelector(".title");
  const monthElement = el.querySelector(".month");
  const yearElement = el.querySelector(".year");
  const contentElement = el.querySelector(".table_calendar");

  drawCalendarTable(date.getFullYear(), date.getMonth(), contentElement);

  contentElement.addEventListener("dblclick", function (e) {
    if (document.querySelector("[add-notes='true']")) {
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

  document.querySelector(".content-notes").addEventListener("click", function (e) {
    if (document.querySelector("[remove-notes='true']")) {
      const elementClear = e.target.classList.value;
      storage.getData(el.id).then((res) => {
        for (let key in res) {
          if (res[key].id === elementClear) {
            document.getElementById(elementClear).remove();
            delete res[key];
            const strres = JSON.stringify(res)
              .replaceAll("null,", "")
              .replaceAll(",null]", "]")
              .replaceAll("[null", "[");
            storage.setData(el.id, JSON.parse(strres));
          }
        }
      });
    }
  });

  storage.getData(el.id).then((res) => {
    res = res || [];
    el.addEventListener("load", drawCalendarNotes(el.querySelector(".content-notes"), res));
  });
}

function drawCalendarTable(year, month, htmlEl) {
  const datelast = new Date(year, month, 0);
  const dateCurrent = new Date(year, month);

  let table = `<table><tr class="day-week"><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  const startDayWeek = dateCurrent.getDay() === 0 ? 6 : dateCurrent.getDay() - 1;

  for (let i = datelast.getDate() - startDayWeek + 1; i <= datelast.getDate(); i++) {
    table += `<td class="day_no-active">${i}</td>`;
  }

  let daysMonth = 0;

  while (dateCurrent.getMonth() === month) {
    table += `<td>${dateCurrent.getDate()}</td>`;
    if ((dateCurrent.getDate() + startDayWeek) % 7 === 0) {
      table += `</tr>`;
    }
    dateCurrent.setDate(dateCurrent.getDate() + 1);
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
  dataNotes.id = "#" + new Date().getTime();
  dataNotes.text = textNote;
  calendarNotes.push(dataNotes);
  storage.setData(element.id, calendarNotes);
}

function drawCalendarNotes(notesCalendar, calendarNotes) {
  notesCalendar.innerHTML = "";
  for (let key in calendarNotes) {
    if (calendarNotes[key]) {
      notesCalendar.innerHTML += `<div id="${calendarNotes[key].id}" class="note">
        <p>${calendarNotes[key].text}</p>
        <button class="${calendarNotes[key].id}">✖</button>
      </div>`;
    }
  }
}

function getRandId() {
  return `n${Math.random() * 10 ** 18}`;
}

function createNewCalendar(idNew, options) {
  const elementForCalendar = document.querySelector(".calendar-textarea") || document.querySelector("body");
  const creatElement = document.createElement("div");
  creatElement.id = idNew;
  elementForCalendar.appendChild(creatElement);
  drawInteractiveCalendar(document.querySelector(`#${idNew}`), options);
}

function idCheck(obj) {
  obj.el = obj.el || getRandId();
  storage.setData("settingsCalendar", obj);
  return obj.el;
}
