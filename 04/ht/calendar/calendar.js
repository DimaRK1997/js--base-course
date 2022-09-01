const URL = "https://myfirstproject-361208-default-rtdb.firebaseio.com/";

class Storage {
  setData(key, value) {
    Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
  }
  getData(key) {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
}

class TaskData {
  tasksAll(path) {
    return fetch(URL + path + "/.json").then((res) => res.json());
  }
  addTask(path, dataNotes) {
    fetch(URL + path + "/.json", {
      method: "POST",
      body: JSON.stringify(dataNotes),
    }).then((data) => data.json());
  }

  removeTask(path) {
    return fetch(URL + path + ".json", { method: "DELETE" });
  }
}

const dataNotes = {
  text: "",
  date: "",
};

const date = new Date();
const storage = new Storage();
const tasksstorage = new TaskData();

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

  // contentElement.addEventListener("dblclick", function (e) {
  //   if (document.querySelector("[add-notes='true']")) {
  //     const target = e.target;
  //     if (Number(target.textContent) && !target.classList.contains("day_no-active")) {
  //       const eventDate = prompt(`Заметка на ${target.textContent}`, "");
  //       if (!eventDate) return;
  //       const noteDate = `${target.textContent}.${monthElement.textContent}.${yearElement.textContent}: ${eventDate}`;
  //       tasksstorage.addTask("tasks", noteDate).then((res) => {
  //         saveCalendarNotes(noteDate);
  //         tasksstorage.tasksAll("tasks").then((res) => {
  //           drawCalendarNotes(el.querySelector(".content-notes"), res);
  //         });
  //       });
  //     }
  //   }
  // });

  contentElement.addEventListener("dblclick", function (e) {
    if (document.querySelector("[add-notes='true']")) {
      const target = e.target;
      if (Number(target.textContent) && !target.classList.contains("day_no-active")) {
        const eventDate = prompt(`Заметка на ${target.textContent}`, "");
        if (!eventDate) return;
        const noteDate = `${target.textContent}.${monthElement.textContent}.${yearElement.textContent}: ${eventDate}`;
        saveCalendarNotes(noteDate);
        tasksstorage.tasksAll("tasks").then((res) => {
          drawCalendarNotes(el.querySelector(".content-notes"), res);
        });
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
      const remove = e.target.parentNode.getAttribute("note-calendar");
      if (remove) {
        tasksstorage.removeTask("tasks/" + remove).then(() => {
          tasksstorage.tasksAll("tasks").then((res) => {
            drawCalendarNotes(el.querySelector(".content-notes"), res);
          });
        });
      }
    }
  });

  tasksstorage.tasksAll("tasks").then((data) => {
    drawCalendarNotes(el.querySelector(".content-notes"), data || []);
  });
  // tasksstorage
  //   .tasksAll("tasks")
  //   .then((data) => data.json())
  //   .then((res) => {

  //   });
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

function saveCalendarNotes(textNote) {
  const nowdate = new Date();
  dataNotes.date = nowdate.getDate() + "." + (nowdate.getMonth() + 1) + "." + nowdate.getFullYear();
  dataNotes.text = textNote;
  tasksstorage.addTask("tasks", dataNotes);
}

function drawCalendarNotes(notesCalendar, calendarNotes) {
  notesCalendar.innerHTML = Object.entries(calendarNotes || [])
    .map((calendarNote) => {
      return `
    <div class="note" note-calendar="${calendarNote[0]}">
      <p>${calendarNote[1].text}</p>
      <button>✖</button>
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
  storage.setData("settingsCalendar", obj);
  return obj.el;
}
