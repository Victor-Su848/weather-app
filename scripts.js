const form = document.querySelector("form");
const input = document.getElementById("name");
const infoName = document.querySelector(".info h2");

async function getInfo(name) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=94ed81b061343f42225830b57876c92c`,
      { mode: "cors" },
    );
    const location = await response.json();
    return location;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function displayInfo(response) {
  try {
    const name = await response.name;
    infoName.textContent = name;
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener("submit", () => {
  const i = input.value;
  getInfo(i).then((response) => {
    console.log(response);
    displayInfo(response);
  });
});
