const formContent = document.querySelector("#formContent");

let content = `
<form id="form">
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
  textContent += `<p> Зовут ${values.name}-${values.male}, я из ${values.city}.<br> Commented: '${values.commented}'</p>`;
  titleform.innerHTML = textContent;
});
