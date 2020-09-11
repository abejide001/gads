const table = document.getElementById("data");

let values = JSON.parse(localStorage.getItem("data"));

if (values && values.length !== 0) {
  table.innerHTML = `
    <tr>
    <td data-label="City Name">${values[0]}</td>
    <td data-label="Weather Description">${values[1]}</td>
    <td data-label="Humidity">${values[2]}</td>
    <td data-label="Temperature">${values[3]}°C</td>
  </tr>
    `;
}
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("input-res").value;
    if (name.length === 0) {
        alert("enter a city")
        return
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=57ce7823501eeffc5ee389b714086289`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "data",
          JSON.stringify([
            data.name,
            data.weather[0].description,
            data.main.humidity,
            data.main.temp,
          ])
        );
       let values = JSON.parse(localStorage.getItem("data"));
        table.innerHTML = `
            <tr>
            <td data-label="City Name">${values[0]}</td>
            <td data-label="Weather Description">${values[1]}</td>
            <td data-label="Humidity">${values[2]}</td>
            <td data-label="Temperature">${values[3]}</td>
          </tr>
            `;
      })
      .catch((err) => {
        alert(err.message)
      });

    document.getElementById("input-res").value = "";
  });

   // ServiceWorker is a progressive technology. Ignore unsupported browsers
   if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('./service-worker.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }