class Storage {
  setData(value) {
    const URL = "https://myfirstproject-361208-default-rtdb.firebaseio.com/settingsCalendar/.json";
    return fetch(URL, {
      method: "PUT",
      body: JSON.stringify(value),
    })
      .then((res) => errStatus(res))
      .then((res) => res)
      .catch((err) => console.error("Status: ", err));
  }
  getData() {
    const URL = "https://myfirstproject-361208-default-rtdb.firebaseio.com/settingsCalendar/.json";
    return fetch(URL)
      .then((res) => errStatus(res))
      .then((res) => res)
      .catch((err) => console.error("Status: ", err));
  }
}

class TaskData {
  tasksAll() {
    const URL = "https://myfirstproject-361208-default-rtdb.firebaseio.com/tasks/.json";
    return fetch(URL)
      .then((res) => errStatus(res))
      .then((res) => res)
      .catch((err) => console.error("Status: ", err));
  }
  addTask(dataNotes) {
    const URL = "https://myfirstproject-361208-default-rtdb.firebaseio.com/tasks/.json";
    return fetch(URL, {
      method: "POST",
      body: JSON.stringify(dataNotes),
    })
      .then((res) => errStatus(res))
      .then((res) => res)
      .catch((err) => console.error("Status: ", err));
  }
  removeTask(idToRemove) {
    const URL = `https://myfirstproject-361208-default-rtdb.firebaseio.com/tasks/${idToRemove}/.json`;
    return fetch(URL, { method: "DELETE" });
  }
}

function errStatus(res) {
  if (res.status === 200) {
    return Promise.resolve(res.json());
  }
  return Promise.reject(res);
}

const date = new Date();
const storage = new Storage();
const tasksstorage = new TaskData();

function Calendar(options) {
  this.id = options.el || getRandId();
  createNewCalendar(this.id, options);
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
      const target = e.target;
      if (Number(target.textContent) && !target.classList.contains("day_no-active")) {
        const eventDate = prompt(`Заметка на ${target.textContent}`, "");
        if (!eventDate) return;
        const noteDate = `${target.textContent}.${monthElement.textContent}.${yearElement.textContent}: ${eventDate}`;
        saveCalendarNotes(noteDate, el);
      }
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
      const idToRemove = e.target.parentNode.parentNode.getAttribute("note-calendar");
      if (idToRemove) {
        tasksstorage.removeTask(idToRemove).then(() => {
          tasksstorage.tasksAll().then((res) => {
            drawCalendarNotes(el.querySelector(".content-notes"), res);
          });
        });
      }
    }
  });

  tasksstorage.tasksAll().then((data) => {
    drawCalendarNotes(el.querySelector(".content-notes"), data || []);
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

function saveCalendarNotes(textNote, el) {
  const nowdate = new Date();
  const dataNotes = {
    text: "",
    date: "",
  };
  dataNotes.date =
    nowdate.getHours() +
    ":" +
    nowdate.getMinutes() +
    "|" +
    nowdate.getDate() +
    "." +
    (nowdate.getMonth() + 1) +
    "." +
    nowdate.getFullYear();
  dataNotes.text = textNote;
  tasksstorage.addTask(dataNotes).then(() => {
    tasksstorage.tasksAll().then((res) => {
      drawCalendarNotes(el.querySelector(".content-notes"), res);
    });
  });
}

function drawCalendarNotes(notesCalendar, calendarNotes) {
  notesCalendar.innerHTML = Object.entries(calendarNotes || [])
    .map((calendarNote) => {
      return `
    <div class="note" note-calendar="${calendarNote[0]}">
      <div class="text-btn">
        <p>${calendarNote[1].text}</p>
        <button>✖</button>
      </div>
      <span>Создано:(${calendarNote[1].date})</span>
    </div>`;
    })
    .join("");
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
  return obj.el;
}
