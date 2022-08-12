const formContent = document.querySelector("#formContent");

formContent.addEventListener("submit", function (e) {
  e.preventDefault();
  const titleform = document.querySelector("#titleform");
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  const textContent = `Зовут ${values.name}-${values.male}. Мне ${values.age}, я из ${values.city}. Commented: '${values.commented}'`;
  const crdivcnt = document.createElement("div");
  crdivcnt.id = "contentData";
  titleform.append(crdivcnt);
  crdivcnt.textContent = textContent;
  form.reset();
});

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
  let date = new Date(year, month, 0);
  let dayweek = `<table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  dayweek += `${"<td></td>".repeat(date.getDay())}`;
  for (
    let i = date.getDay(), n = 1;
    i < date.getDate() + date.getDay();
    i++, n++
  ) {
    if (i % 7 === 0 && i !== 0) dayweek += `</tr><tr>`;
    if (n !== 0) dayweek += `<td>${n}</td>`;
  }
  dayweek += `</tr>`;
  htmlEl.innerHTML = dayweek;
}

drawInteractiveCalendar(document.querySelector("#calendar"));
