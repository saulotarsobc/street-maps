const ZOOM_DEFALT = 16;

const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const dataParam = params.get("data");

if (dataParam !== null) {
  try {
    const jsonStringData = atob(dataParam);
    const uriDecoded = decodeURIComponent(jsonStringData);
    const jsonData = JSON.parse(uriDecoded);

    var map = L.map("map").setView(
      [jsonData[0].latitude, jsonData[0].longitude],
      ZOOM_DEFALT
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      // maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    jsonData.forEach((info) => {
      var marker = L.marker([info.latitude, info.longitude]).addTo(map);
      marker.bindPopup(
        `
        <center>
          <h3>${info?.nome}</h3>
          <p>${info?.descricao}</p>
          <span>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${info.latitude},${info.longitude}" target="_blanck">Ir para</a>
          </span>
        </center>
        `
      );
    });
  } catch (error) {
    console.log(error);
    window.alert(error);
  }
} else {
  console.log('O parâmetro "data" não foi encontrado na URL.');
}