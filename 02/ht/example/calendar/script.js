function drawInteractiveCalendar(el) {
  let titleCalendar = `<table class="title">
                          <tr>
                            <td><button class="last"><</button></td><td><span class="month"></span>/<span class="year"></span></td><td><button class="next">></button></td>
                          </tr>
                        </table>
                        <div class="content"></div>
                        <div class="content-notes"></div>`;
  el.innerHTML = titleCalendar;

  const titleElement = el.querySelector(".title");
  const monthElement = el.querySelector(".month");
  const yearElement = el.querySelector(".year");

  const date = new Date();
  drawCalendar(
    date.getFullYear(),
    date.getMonth(),
    el.querySelector(".content")
  );

  const arrNotes = JSON.parse(localStorage.getItem(`${el.id}`)) || [];

  el.querySelector(".content").addEventListener("click", function (e) {
    const target = e.target;
    if (Number(target.textContent)) {
      const eventDate = prompt(`Заметка на ${target.textContent}`, "");
      if (!eventDate) return;
      const noteDate = `${target.textContent}.${
        el.querySelector(".month").textContent
      }.${el.querySelector(".year").textContent}: ${eventDate}`;
      setTextLocal(noteDate, el, arrNotes);
      showTextNote(el.querySelector(".content-notes"), arrNotes);
    }
  });

  monthElement.textContent = date.getMonth() + 1;
  yearElement.textContent = date.getFullYear();

  titleElement.addEventListener("click", function (e) {
    if (e.target.matches(".last")) {
      date.setMonth(date.getMonth() - 1);
    } else if (e.target.matches(".next")) {
      date.setMonth(date.getMonth() + 1);
    }
    monthElement.textContent = date.getMonth() + 1;
    yearElement.textContent = date.getFullYear();
    drawCalendar(
      date.getFullYear(),
      date.getMonth(),
      el.querySelector(".content")
    );
  });
}

function drawCalendar(year, month, htmlEl) {
  const date = new Date(year, month);
  let daysWeek = `<table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>`;
  const startDayWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;
  daysWeek += `${"<td></td>".repeat(startDayWeek)}`;
  while (date.getMonth() === month) {
    daysWeek += `<td>${date.getDate()}</td>`;
    if ((date.getDate() + startDayWeek) % 7 === 0) {
      daysWeek += `</tr><tr>`;
    }
    date.setDate(date.getDate() + 1);
  }
  daysWeek += `</tr>`;
  htmlEl.innerHTML = daysWeek;
}

function setTextLocal(textNote, element, arrNotes) {
  arrNotes.push(textNote);
  localStorage.setItem(element.id, JSON.stringify(arrNotes));
}

function showTextNote(notesCalendar, arrNotes) {
  notesCalendar.innerHTML = arrNotes.map((note) => `<p>${note}</p>`).join("");
}

function getRandId() {
  return `n${Math.random() * 10 ** 17}`;
}

function creatNewCalendar(idNew) {
  const creatElement = document.createElement("div");
  creatElement.id = idNew;
  document.querySelector("body").appendChild(creatElement);
  drawInteractiveCalendar(document.querySelector(`#${idNew}`));
}
creatNewCalendar(getRandId());
creatNewCalendar(getRandId());
