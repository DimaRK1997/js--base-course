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
  const contentElement = document.createElement("div");
  const titleform = document.querySelector("#titleform");
  titleform.append(contentElement);
  contentElement.textContent = textForms;
}

function drawInteractiveCalendar(el) {
  let titleCalendar = `<table id="title">
                          <tr>
                            <td><button id="last"><</button></td><td><span id="month">9</span>/<span id="year">1997</span></td><td><button id="next">></button></td>
                          </tr>
                        </table>
                        <div id="content"></div>`;
  el.innerHTML = titleCalendar;
  let date = new Date();
  drawCalendar(
    date.getFullYear(),
    date.getMonth(),
    document.querySelector("#content")
  );
  const titleclick = document.querySelector("#title");

  const spmonth = document.querySelector("#month");
  const spyear = document.querySelector("#year");

  spmonth.textContent = date.getMonth() + 1;
  spyear.textContent = date.getFullYear();

  titleclick.addEventListener("click", function (e) {
    if (e.target.matches("#last")) {
      date.setMonth(date.getMonth() - 1);
    } else if (e.target.matches("#next")) {
      date.setMonth(date.getMonth() + 1);
    }
    spmonth.textContent = date.getMonth() + 1;
    spyear.textContent = date.getFullYear();
    drawCalendar(
      date.getFullYear(),
      date.getMonth(),
      document.querySelector("#content")
    );
  });
}

function drawCalendar(year, month, htmlEl) {
  const date = new Date(year, month);
  let dayweek = `<table onclick="tableClick(event)"><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  const cleartd = () => (date.getDay() === 0)?6:(date.getDay()-1);
  dayweek += `${"<td></td>".repeat(cleartd())}`;
  const indexDay = cleartd();
  while (date.getMonth() === month) { 
    if ((date.getDate() + indexDay) % 7 === 0) {
      dayweek += `<td>${date.getDate()}</td></tr><tr>`;
    } else {
      dayweek += `<td>${date.getDate()}</td>`;
    }
    date.setDate(date.getDate() + 1);
  }
  dayweek += `</tr>`;
  htmlEl.innerHTML = dayweek;
}

drawInteractiveCalendar(document.querySelector("#calendar"));

function tableClick(e) {
    const target = e.target;
    if(Number(target.textContent)) {
        const eventDate = prompt(`Заметка на ${target.textContent}`,'');
        if(eventDate === null || eventDate === '') return;
        const stroutput = `${target.textContent}.${document.getElementById('month').textContent}.${document.getElementById('year').textContent}: ${eventDate}`;
        localText(stroutput)  
        addText()
    } 
}

//calendar
const calendarDiv = document.querySelector("#calendar");
const eventCalendar = document.createElement("div");
calendarDiv.append(eventCalendar);
let localtext = localStorage.getItem("stroutput")?localStorage.getItem("stroutput"):''

function localText(text) {
  localtext = localtext + `${text},`;
  localStorage.setItem("stroutput", localtext)
}

function addText() {
  eventCalendar.innerHTML = '';
  for(let el of localtext.split(',')) {
    eventCalendar.innerHTML = eventCalendar.innerHTML + `<p> ${eventCalendar.textContent = el} </p>` 
  }
}

document.addEventListener('load', addText());


// sleep
console.log(new Date());
sleep(3);
console.log(new Date());

function sleep(seconds) {
    const start = new Date().getTime() + seconds*1000;
    let finish = new Date().getTime();
    while(start >= finish) {
        finish = new Date().getTime();
    }
}