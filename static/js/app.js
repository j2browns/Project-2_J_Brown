// console.log because we can
console.log("Project 2 - Jeanine, Jeff, & Emily");
console.log("app.js");

// initialize data and map variables
var data, myMap;

// create initMap function


// initialize LayerGroups
var layers = {
  PUBLIC: new L.LayerGroup(),
  PRIVATE: new L.LayerGroup(),
  HOLES: new L.LayerGroup()
};

// Creating map object
var myMap = L.map("map", {
  center: [46.392410, -94.636230],
  zoom: 6.5,
  layers: [
    layers.PUBLIC
  ]
});
console.log("Created map object.");

// create overlays object to add to layers
var overlays = {
  "Public": layers.PUBLIC
}


// create control for layers and add overlay layers to map
L.control.layers(null, overlays).addTo(myMap);

// create legend to display info
var info = L.control({
  position: "topright"
});

// create a legend
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
}

// add legend to map
info.addTo(myMap);


// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

console.log("Added tile layer");

var coordinates = []
var public = []

// read in course_subset.csv file
d3.csv("/results/course_subset.csv").then(function(addressData) {
  for (var i=0; i < addressData.length; i++) {
    var location = addressData[i];
    // console.log(location.lat);
    // console.log(location.lng);
    coordinates.push([location.lat, location.lng]);
    // console.log(coordinates);
    console.log(location.public_private);

    L.marker(coordinates[i])
    .bindPopup("<h6>" + location.course + "</h6> <hr> <p><strong>Address: </strong></br>" + location.street + "<br>" + location.city + ", " + location.state + " " + location.zip_code + "</p>")
    .addTo(myMap);

  }

});



