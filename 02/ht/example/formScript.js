const formContent = document.querySelector("#formContent");

let content = `
<br><form id="form">
<label for="name">Name:</label><br>
<input type="text" id="name" name="name"><br><br>
<label for="city">City:</label><br>
<select name="city" id="city">
    <option value="Minsk">Minsk</option>
    <option value="Grodno">Grodno</option>
    <option value="Brest">Brest</option>
    <option value="Gomel">Gomel</option>
</select><br><br>
<label for="commented">Commented:</label><br>
<textarea id="commented" name="commented"></textarea><br><br>
<label for="male">male:</label><br>
<input type="radio" id="woman" name="male" value="woman" checked>
<label for="woman">woman</label><br>
<input type="radio" id="man" name="male" value="man">
<label for="man">man</label><br><br>
<button id="btnsbm">submit</button>
</form>
<div id="titleform"></div>`;

formContent.innerHTML = content;

const form = document.querySelector("#form");

let textContent = "";

const btnsbm = document.querySelector("#btnsbm");
btnsbm.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    document.getElementById("name").value === "" ||
    document.getElementById("name").value === ""
  ) {
    return alert("Заполните все поля!");
  }
  titleform = document.querySelector("#titleform");
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  textContent =
    `<p> Зовут ${values.name}-${values.male}, я из ${values.city}.<br> Commented: '${values.commented}'</p>` +
    textContent;
  titleform.innerHTML = textContent;
});

function drawInteractiveCalendar(el) {
  let titleCalendar = `<table id="title">
                          <tr>
                            <td><button id="last"><</button></td><td><span id="month">9</span>/<span id="year">1997</span></td><td><button id="next">></button></td>
                          </tr>
                        </table>
                        <div id="content"></div>`;
  el.innerHTML = titleCalendar;
  let data = new Date();
  drawCalendar(
    data.getFullYear(),
    data.getMonth(),
    document.querySelector("#content")
  );
  const titleclick = document.querySelector("#title");

  const spmonth = document.querySelector("#month");
  const spyear = document.querySelector("#year");

  spmonth.innerHTML = data.getMonth() + 1;
  spyear.innerHTML = data.getFullYear();

  titleclick.addEventListener("click", function (e) {
    if (e.target.matches("#last")) {
      data.setMonth(data.getMonth() - 1);
    } else if (e.target.matches("#next")) {
      data.setMonth(data.getMonth() + 1);
    }
    spmonth.innerHTML = data.getMonth() + 1;
    spyear.innerHTML = data.getFullYear();
    drawCalendar(
      data.getFullYear(),
      data.getMonth(),
      document.querySelector("#content")
    );
  });
}

function drawCalendar(year, month, htmlEl) {
  let data = new Date(year, month, 0);
  let dayweek = `<table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  for (let i = 0; i < data.getDay(); i++) {
    dayweek += `<td></td>`;
  }
  for (
    let i = data.getDay(), n = 1;
    i < data.getDate() + data.getDay();
    i++, n++
  ) {
    if (i % 7 === 0 && i !== 0) dayweek += `</tr><tr>`;
    if (n !== 0) dayweek += `<td>${n}</td>`;
  }
  dayweek += `</tr>`;
  htmlEl.innerHTML = dayweek;
}

drawInteractiveCalendar(document.querySelector("#calendar"));
