export function saveLocalStorage(name, value) {
  let data = JSON.parse(localStorage.getItem(name)) || [];
  if (!value) {
    return data;
  } else if (name === "history") {
    if (data.length === 5) {
      data.pop();
    }
    data.unshift(value);
  } else {
    data.push(value);
  }
  localStorage.setItem(name, JSON.stringify(data));
  return data;
}
