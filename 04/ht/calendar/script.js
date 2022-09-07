const settingsCalendar = {
  el: "calendar",
  showMonth: true,
  allowAdd: true,
  allowRemove: true,
  date: true,
};

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

  storage.getData().then((res) => {
    const options = res || settingsCalendar;
    const calendar = new Calendar(options);
    document.getElementById(calendar.id).classList.toggle("calendar");
  });
}

function pageCreate() {
  calendarElement.innerHTML = `
    <div class="settings"></div>
    <div class="calendar-textarea">
      <div class="content-for-script">
        <pre class="text-script"></pre>
      </div>
    </div>`;

  storage.getData().then((res) => {
    const options = res || settingsCalendar;
    const calendar = new Calendar(options);

    const settings = document.querySelector(".settings");
    settings.innerHTML = `
      <form>
        <fieldset>
          <legend>Configure Calendar</legend>
          <input type="checkbox" id="change" name="showMonth" ${options.showMonth ? "checked" : ""} value="true"/>
          <label for="change">allow change month</label><br />
          <input type="checkbox" id="add" name="allowAdd" ${options.allowAdd ? "checked" : ""} value="true"/>
          <label for="add">allow add tasks</label><br />
          <input type="checkbox" id="remove" name="allowRemove"  ${options.allowRemove ? "checked" : ""} value="true"/>
          <label for="remove">allow remove tasks</label><br />
          <input type="checkbox" id="date" name="date" ${options.date ? "checked" : ""} value="true"/>
          <label for="date">show month / year</label><br />
          <label for="month">month:</label>
          <input type="number" id="month" name="month" value="${date.getMonth() + 1}" required /><br />
          <label for="year">year:</label>
          <input type="number" id="year" name="year" value="${date.getFullYear()}" required /><br />
          <label for="id-text">id:</label>
          <input type="text" id="id-text" name="el" value="${options.el || ""}" required /><br />
        </fieldset>
      </form>`;

    options.showMonth = document.querySelector("#change").hasAttribute("checked");
    options.allowAdd = document.querySelector("#add").hasAttribute("checked");
    options.allowRemove = document.querySelector("#remove").hasAttribute("checked");
    options.date = document.querySelector("#date").hasAttribute("checked");

    const formElement = document.querySelector("form");

    formElement.addEventListener("change", function (e) {
      e.preventDefault();
      const form = new FormData(formElement);
      date.setMonth(document.querySelector("#month").value - 1);
      date.setFullYear(document.querySelector("#year").value);
      storage.setData(Object.fromEntries(form)).then(() => {
        pageCreate();
      });
    });

    document.getElementById(calendar.id).classList.toggle("calendar-small");
    document.querySelector(".text-script").textContent = generatorScript(options);
  });
}

window.addEventListener("hashchange", showPages);
window.addEventListener("load", showPages);

function generatorScript(data) {
  return `
  <script src="https://raw.githack.com/\n\tDimaRK1997/js--base-course/\n\ttask-4/04/ht/calendar/calendar.js">
  </script>
  <script>
    (function() {
      new Calendar({
        el: "${data.el}",
        showMonth: ${data.showMonth},
        allowAdd: ${data.allowAdd},
        allowRemove: ${data.allowRemove},
        date: ${data.date}
      })
    })();
  </script>
  `;
}
