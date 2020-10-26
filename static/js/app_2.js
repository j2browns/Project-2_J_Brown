
// console.log because we can
console.log("app_2.js");

// create variable for course data and map
//var courseData;
var myMap;
var lightmap;

// function to create map
 
function mapCreate(courseData) {
    console.log(courseData);


    // create tile layer that is background of map
    lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });


    // initialize layer groups
    var layers = {
        PUBLIC: new L.LayerGroup(),
        PRIVATE: new L.LayerGroup(),
        SEMIPRIVATE: new L.LayerGroup(),
        RESORT: new L.LayerGroup(),
        MILITARY: new L.LayerGroup()
    };
    console.log("Initiated layer groups");


    // create map with layers
    myMap = L.map("map", {
        center: [41.800719, -89.627245], // center of Mpls [46.392410, -94.636230]
        zoom: 4.8,
        layers: [
            layers.PUBLIC,
            layers.PRIVATE,
            layers.SEMIPRIVATE,
            layers.RESORT,
            layers.MILITARY
        ]
    });
    console.log("Created map object.");

    // add lightmap tile layer to the map
    lightmap.addTo(myMap);
    console.log("Added tile layer");

  
        
    // create overlays object to add to the layer control
    var overlays = {
        "Public": layers.PUBLIC,
        "Private": layers.PRIVATE,
        "Semi-Private": layers.SEMIPRIVATE,
        "Resort": layers.RESORT,
        "Military": layers.MILITARY
    };

    // create control for layers
    L.control.layers(null, overlays).addTo(myMap);


    // create legend to display indo
    var info = L.control({
        position: "bottomright"
    });

        
    // when layer control is added, insert div with class of legend
    info.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
            div.innerHTML += "<h3>Access</h3>";
            console.log(div);
            div.innerHTML += "<span class='public'>Public</span></br>";
            div.innerHTML += "<span class='private'>Private</span></br>";
            div.innerHTML += "<span class='semiPrivate'>Semi-Private</span></br>";
            div.innerHTML += "<span class='resort'>Resort</span></br>";
            div.innerHTML += "<span class='military'>Military</span></br>";
        return div;
    };


    // add info legend to map
    info.addTo(myMap);

    // TA Farshad helped with the for loop section
    // loop through course data
    for (var i=0; i < courseData.length; i++) {

        var golf_info = courseData[i];


        var lat = golf_info.lat;
        var lng = golf_info.lng;

        var type;
        var style = {};

        // set types for layers
        if (golf_info.public_private == "Public") {
            type = "PUBLIC";
            style = {
                radius: 5,
                fillColor: '#7FFF00',
                fillOpacity: 1,
                color: '#000000',
            };
        }
        else if (golf_info.public_private == "Private") {
            type = "PRIVATE";
            style = {
                radius: 5,
                fillColor: '#DC143C',
                fillOpacity: 1,
                color: '#000000',
            };    
        }
        else if (golf_info.public_private == "Semi-Private" || golf_info.public_private == "Semi Private") {
            type = "SEMIPRIVATE";
            style = {
                radius: 5,
                fillColor: '#5F9EA0',
                fillOpacity: 1,
                color: '#000000',
            };
        }
        else if (golf_info.public_private == "Resort") {
            type = "RESORT";
            style = {
                radius: 5,
                fillColor: '#00FFFF',
                fillOpacity: 1,
                color: '#000000',
            };
        }
        else if (golf_info.public_private == "Military") {
            type = "MILITARY";
            style = {
                radius: 5,
                fillColor: '#000000',
                fillOpacity: 1,
                color: '#000000',
            };
        };

        // create new circle markers
        var newMarker = L.circleMarker([lat, lng], style);

        // add circle markers to the layers
        newMarker.addTo(layers[type]);

        //add popup to selected marker
        newMarker.bindPopup("<h6>" + golf_info.course + "</h6> <hr> <p><strong>Address: </strong></br>" + golf_info.street + "<br>" + golf_info.city + ", " + golf_info.state + " " + golf_info.zip_code + "<br><strong>Phone: </strong>" + golf_info.phone + "</p><p><strong>Access: </strong>" + golf_info.public_private + "</br><strong>Holes: </strong>" + golf_info.hole + "</br><strong>Rental Cart Available: </strong>" + golf_info.rental_cart_available + "</br><strong>Rental Clubs Available: </strong>" + golf_info.rental_club +"<br><strong>Golf Season: </strong>" + golf_info.golf_season + "<br><strong>Range: </strong>" + golf_info.range + "<br><strong>Architect: </strong>" + golf_info.architect + "</p>").addTo(myMap);

            // show popup on mouseover
        newMarker.on('mouseover', overMarker(i)) 
            // plotCreate(golf_info,parseInt(golf_info.course_id));
            // console.log(`golf info; ${golf_info}`);
            newMarker.on('mouseover', function(event) {
                this.openPopup();
            })

            // console.log(`course highlighted in app_2 ${golf_info.course_id}`);


        newMarker.on('mouseout', function(event) {
            this.closePopup();
            

        });
       
        // newMarker.on('click', function(event) {
        //     console.log(`course highlighted in app_2 ${this.course_id} ${i}`);
        //     plotCreate(courseData,parseInt(this.course_id));
        // });
        
  
    };

    function overMarker(i) {
        row = courseData[i];
        courseSelect = row.course_id;
        plotCreate(row, courseSelect);
    }



};