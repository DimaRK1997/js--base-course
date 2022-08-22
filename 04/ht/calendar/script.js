// настройки и изображение
function showCalendarCreate() {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  body.append(div);

  div.innerHTML = `<a id="link-calendar" href="">Calendar</a> | <a id="link-create" href="">Create</a>`;
  const linkCalendar = document.querySelector("#link-calendar");
  const linkCreate = document.querySelector("#link-create");
  linkCalendar.addEventListener("click", function (e) {
    e.preventDefault();
  });
  linkCreate.addEventListener("click", function (e) {
    e.preventDefault();
    div.innerHTML += `<div>
    <h4>Configure Calendar</h4>
    <form>
    <input type="checkbox" id="change" value="true" />
    <label for="change">allow change month</label><br />
    <input type="checkbox" id="add" value="true" />
    <label for="add">allow add tasks</label><br />
    <input type="checkbox" id="remove" value="true" />
    <label for="remove">allow remove tasks</label><br />

    <label for="id">??:</label>
    <input type="number" id="id" name="name" min="1" max="10" required/><br />
    <label for="id">??:</label>
    <input type="number" id="id" name="name" min="1" max="10" required/><br />
    </form>
    </div>`;
  });
}

showCalendarCreate();
