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
  return textContent = `Зовут ${values.name}-${values.male}. Мне ${values.age}, я из ${values.city}. Commented: '${values.commented}'`;
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
  let dayweek = `<table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  dayweek += `${"<td></td>".repeat(date.getUTCDay())}`;
  const n = date.getUTCDay();
  while(date.getMonth() === month) {
    if ((date.getDate() + n) % 7 === 0) {
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
