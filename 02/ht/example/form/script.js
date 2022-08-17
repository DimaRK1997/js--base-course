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
  return `Зовут ${values.name}-${values.male}. Мне ${values.age}, я из ${values.city}. Commented: '${values.commented}'`;
}

function showFormResults(textForms) {
  const contentElement = document.createElement("p");
  const formDataElement = document.querySelector("#form-data");
  formDataElement.append(contentElement);
  contentElement.textContent = textForms;
}
