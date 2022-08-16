const formElement = document.querySelector("form");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = getFormData();
  showFormResults(formData);
  formElement.reset();
});

function getFormData() {
  const form = new FormData(formElement);
  const values = Object.fromEntries(form);
  return `Зовут ${values.name}-${values.male}. Мне ${values.age}, я из ${values.city}. Commented: '${values.commented}'`;
}

function showFormResults(textForms) {
  const contentElement = document.createElement("p");
  const formDataElement = document.querySelector("#form-data");
  formDataElement.append(contentElement);
  contentElement.textContent = textForms;
}

function drawInteractiveCalendar(el) {
  let titleCalendar = `<table id="title">
                          <tr>
                            <td><button id="last"><</button></td><td><span id="month"></span>/<span id="year"></span></td><td><button id="next">></button></td>
                          </tr>
                        </table>
                        <div id="content"></div>`;
  el.innerHTML = titleCalendar;
  const date = new Date();
  drawCalendar(
    date.getFullYear(),
    date.getMonth(),
    document.querySelector("#content")
  );

  const titleElement = document.querySelector("#title");
  const monthElement = document.querySelector("#month");
  const yearElement = document.querySelector("#year");

  monthElement.textContent = date.getMonth() + 1;
  yearElement.textContent = date.getFullYear();

  titleElement.addEventListener("click", function (e) {
    if (e.target.matches("#last")) {
      date.setMonth(date.getMonth() - 1);
    } else if (e.target.matches("#next")) {
      date.setMonth(date.getMonth() + 1);
    }
    monthElement.textContent = date.getMonth() + 1;
    yearElement.textContent = date.getFullYear();
    drawCalendar(
      date.getFullYear(),
      date.getMonth(),
      document.querySelector("#content")
    );
  });
}

function drawCalendar(year, month, htmlEl) {
  const date = new Date(year, month);
  let daysWeek = `<table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  const cleartd = () => (date.getDay() === 0 ? 6 : date.getDay() - 1);
  daysWeek += `${"<td></td>".repeat(cleartd())}`;
  const indexDay = cleartd();
  while (date.getMonth() === month) {
    daysWeek += `<td>${date.getDate()}</td>`;
    if ((date.getDate() + indexDay) % 7 === 0) {
      daysWeek += `</tr><tr>`;
    }
    date.setDate(date.getDate() + 1);
  }
  daysWeek += `</tr>`;
  htmlEl.innerHTML = daysWeek;
}

drawInteractiveCalendar(document.querySelector("#calendar"));

function tableClick(e) {
  const target = e.target;
  if (Number(target.textContent)) {
    const eventDate = prompt(`Заметка на ${target.textContent}`, "");
    if (!eventDate) return;
    const noteDate = `${target.textContent}.${
      document.getElementById("month").textContent
    }.${document.getElementById("year").textContent}: ${eventDate}`;
    setTextLocal(noteDate);
    showTextNote();
  }
}

document.querySelector("#content").addEventListener("click", tableClick);

//calendar
const calendarDiv = document.querySelector("#calendar");
const notesCalendar = document.createElement("div");
calendarDiv.append(notesCalendar);
let textNotes;
if (localStorage.getItem("notedays")) {
  textNotes = localStorage.getItem("notedays");
} else {
  textNotes = "";
}

function setTextLocal(textNote) {
  textNotes += `${textNote},`;
  localStorage.setItem("notedays", textNotes);
}

function showTextNote() {
  notesCalendar.innerHTML = "";
  textNotes.split(",").map((el) => {
    return (notesCalendar.innerHTML += `<p>${el}</p>`);
  });
}

document.addEventListener("load", showTextNote());
