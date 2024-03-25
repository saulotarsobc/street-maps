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

    /* para usar o mapbox */
    // L.tileLayer(
    //   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    //   {
    //     attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    //     id: "mapbox/streets-v12",
    //     accessToken:
    //       "pk.eyJ1IjoibWFwYm94LW1hcC1kZXNpZ24iLCJhIjoiY2syeHpiaHlrMDJvODNidDR5azU5NWcwdiJ9.x0uSqSWGXdoFKuHZC5Eo_Q",
    //   }
    // ).addTo(map);

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
          <h3>${info.nome}</h3>
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

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map);
// }

// map.on("click", onMapClick);

// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);

// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");
