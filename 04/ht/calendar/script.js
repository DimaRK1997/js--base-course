// настройки и изображение
const objOptions = JSON.parse(localStorage.getItem("objOptions"));

function showCalendarCreate() {
  const linkCalendar = document.querySelector("#link-calendar");
  const linkCreate = document.querySelector("#link-create");
  document.querySelector(`#${objOptions.el}`).classList = "calendar";
  drawInteractiveCalendar(document.querySelector(`#${objOptions.el}`));

  linkCalendar.addEventListener("click", function (e) {
    e.preventDefault();
    if (document.querySelector(".content__setings")) document.querySelector(".content__setings").remove();
    if (document.querySelector(".content__textarea-calendar"))
      document.querySelector(".content__textarea-calendar").remove();
    createNewCalendar(objOptions.el);
    document.querySelector(`#${objOptions.el}`).classList = "calendar";
  });

  linkCreate.addEventListener("click", function (e) {
    e.preventDefault();
    if (document.querySelector(".content__setings")) document.querySelector(".content__setings").remove();
    if (document.querySelector(".content__textarea-calendar"))
      document.querySelector(".content__textarea-calendar").remove();

    if (document.querySelector(`#${objOptions.el}`)) document.querySelector(`#${objOptions.el}`).remove();
    const date = new Date();

    const divContentElement = document.querySelector(".content");

    const divSetingsElement = document.createElement("div");
    divSetingsElement.classList = "content__setings";
    divContentElement.appendChild(divSetingsElement);

    const divCreate = document.createElement("div");
    divCreate.classList = "content__textarea-calendar";
    divContentElement.appendChild(divCreate);
    document.querySelector(".content__textarea-calendar").innerHTML = `
    <div class="content_textarea">
    <textarea disabled></textarea>
    </div>
    <div class="content_calendar">
      <div id="${objOptions.el}"></div>
    </div>`;
    document.querySelector(`#${objOptions.el}`).classList = "calendar";
    drawInteractiveCalendar(document.querySelector(`#${objOptions.el}`));

    document.querySelector(".content__setings").innerHTML = `
      <form>
        <fieldset>
          <legend>Configure Calendar</legend>
          <input type="checkbox" id="change" name="showMonth" value="true" ${objOptions.showMonth ? "checked" : ""}/>
          <label for="change">allow change month</label><br />
          <input type="checkbox" id="add" name="allowAdd" value="true" ${objOptions.allowAdd ? "checked" : ""}/>
          <label for="add">allow add tasks</label><br />
          <input type="checkbox" id="remove" name="allowRemove" value="true" ${objOptions.allowRemove ? "checked" : ""}/>
          <label for="remove">allow remove tasks</label><br />
          <input type="checkbox" id="date" name="date" value="true" ${objOptions.date ? "checked" : ""}/>
          <label for="date">show month / year</label><br />
          <label for="month">month:</label>
          <input type="number" id="month" name="month" value="${date.getMonth() + 1}" required /><br />
          <label for="year">year:</label>
          <input type="number" id="year" name="year" value="${date.getFullYear()}" required /><br />
          <label for="id-text">id:</label>
          <input type="text" id="id-text" name="el" value="${objOptions.el || ""}" required /><br />
        </fieldset>
      </form>`;

    // const formElement = document.querySelector("form");

    // formElement.addEventListener("change", function (e) {

    //   e.preventDefault();
    //   getFormData(formElement);
    //   //formElement.reset();
    //   document.querySelector('textarea').textContent = '';
    //   document.querySelector('textarea').textContent = `
    // `
    // });
  });
}

// function getFormData(formElement) {
//   const form = new FormData(formElement);
//   const setings = Object.fromEntries(form);
//   new Calendar(setings);
// }

showCalendarCreate();
