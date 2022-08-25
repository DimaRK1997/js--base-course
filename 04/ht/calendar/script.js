const instCalend = new Calendar({
  //el: "cal",
  showMonth: true,
  allowAdd: false,
  allowRemove: true,
  date: null,
});

const divCalendarTextarea = document.querySelector(".content__calendar-textarea");
const links = document.querySelector(".content__links");

const settingsCalendar = JSON.parse(localStorage.getItem("settingsCalendar"));

const idCalendar = settingsCalendar.el;

const pages = {
  calendar: pageCalendar,
  create: pageCreate,
};

function showLinks() {
  const page = location.href.split("#")[1];
  (pages[page] || pageCalendar)();
}

function pageCalendar() {
  divCalendarTextarea.innerHTML = "";
  if (document.querySelector(".content__settings")) {
    document.querySelector(".content__settings").remove();
  }
  instCalend.element(idCalendar);

  document.getElementById(idCalendar).classList.toggle("calendar");
}

function pageCreate() {
  divCalendarTextarea.innerHTML = "";

  const date = new Date();

  divCalendarTextarea.innerHTML = `
    <div class="textarea">
      <textarea disabled></textarea>
    </div>
    `;
  instCalend.element(idCalendar);

  const settings = document.createElement("div");
  settings.classList = "content__settings";
  divCalendarTextarea.parentNode.insertBefore(settings, divCalendarTextarea);

  settings.innerHTML = `
      <form>
        <fieldset>
          <legend>Configure Calendar</legend>
          <input type="checkbox" id="change" name="showMonth" value="true" ${
            settingsCalendar.showMonth ? "checked" : ""
          }/>
          <label for="change">allow change month</label><br />
          <input type="checkbox" id="add" name="allowAdd" value="true" ${settingsCalendar.allowAdd ? "checked" : ""}/>
          <label for="add">allow add tasks</label><br />
          <input type="checkbox" id="remove" name="allowRemove" value="true" ${
            settingsCalendar.allowRemove ? "checked" : ""
          }/>
          <label for="remove">allow remove tasks</label><br />
          <input type="checkbox" id="date" name="date" value="true" ${settingsCalendar.date ? "checked" : ""}/>
          <label for="date">show month / year</label><br />
          <label for="month">month:</label>
          <input type="number" id="month" name="month" value="${date.getMonth() + 1}" required /><br />
          <label for="year">year:</label>
          <input type="number" id="year" name="year" value="${date.getFullYear()}" required /><br />
          <label for="id-text">id:</label>
          <input type="text" id="id-text" name="el" value="${idCalendar || ""}" required /><br />
        </fieldset>
      </form>`;

  document.getElementById(idCalendar).classList.toggle("calendar-small");
}

window.addEventListener("hashchange", showLinks);
window.addEventListener("load", showLinks);
