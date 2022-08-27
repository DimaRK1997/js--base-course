const calendarElement = document.querySelector(".content__calendar");

const pages = {
  calendar: pageCalendar,
  create: pageCreate,
};

function showPages() {
  const page = location.href.split("#")[1];
  (pages[page] || pageCalendar)();
}

function pageCalendar() {
  calendarElement.innerHTML = `
  <div class="calendar-textarea"></div>`;

  const calendar = new Calendar({
    el: "cal",
    showMonth: true,
    allowAdd: false,
    allowRemove: true,
    date: null,
  });

  document.getElementById(calendar.id).classList.toggle("calendar");
}

function pageCreate() {
  const date = new Date();

  calendarElement.innerHTML = `
    <div class="settings"></div>
    <div class="calendar-textarea">
      <div class="pre">
        <pre></pre>
      </div>
    </div>`;

  const calendar = new Calendar({
    el: "cal",
    showMonth: true,
    allowAdd: false,
    allowRemove: true,
    date: null,
  });

  const settings = document.querySelector(".settings");
  settings.innerHTML = `
      <form>
        <fieldset>
          <legend>Configure Calendar</legend>
          <input type="checkbox" id="change" name="showMonth" value="true" ${calendar.showMonth ? "checked" : ""}/>
          <label for="change">allow change month</label><br />
          <input type="checkbox" id="add" name="allowAdd" value="true" ${calendar.allowAdd ? "checked" : ""}/>
          <label for="add">allow add tasks</label><br />
          <input type="checkbox" id="remove" name="allowRemove" value="true" ${calendar.allowRemove ? "checked" : ""}/>
          <label for="remove">allow remove tasks</label><br />
          <input type="checkbox" id="date" name="date" value="true" ${calendar.date ? "checked" : ""}/>
          <label for="date">show month / year</label><br />
          <label for="month">month:</label>
          <input type="number" id="month" name="month" value="${date.getMonth() + 1}" required /><br />
          <label for="year">year:</label>
          <input type="number" id="year" name="year" value="${date.getFullYear()}" required /><br />
          <label for="id-text">id:</label>
          <input type="text" id="id-text" name="el" value="${calendar.id || ""}" required /><br />
        </fieldset>
      </form>`;

  document.getElementById(calendar.id).classList.toggle("calendar-small");
}

window.addEventListener("hashchange", showPages);
window.addEventListener("load", showPages);
