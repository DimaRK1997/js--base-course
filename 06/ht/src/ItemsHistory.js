const dataHistory = JSON.parse(localStorage.getItem("history")) || { city: [] };

async function itemsHistory(city) {
  if (dataHistory.city.length === 5) {
    dataHistory.city.pop();
  }
  dataHistory.city.unshift(city);
  localStorage.setItem("history", JSON.stringify(dataHistory));
}

async function drawHistiryHTML(element) {
  return (element.innerHTML = dataHistory.city
    .map((el) => {
      return `<li>${el}</li>`;
    })
    .join(""));
}

module.exports = { itemsHistory, drawHistiryHTML };
