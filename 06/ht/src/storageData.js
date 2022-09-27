const dataUser = JSON.parse(localStorage.getItem("DataUser")) || { city: [] };

export async function saveLocalStorage(key, value) {
  if (key === "city") {
    if (dataUser[key].length === 5) {
      dataUser[key].pop();
    }
    dataUser[key].unshift(value);
  } else {
    dataUser[key] = value;
  }
  localStorage.setItem("DataUser", JSON.stringify(dataUser));
  return dataUser;
}
