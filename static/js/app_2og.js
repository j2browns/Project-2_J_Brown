function mapCreate(courseData) {
    // console.log because we can
    console.log("app_2.js");

    // create variable for course data and map
    //var courseData;
    var myMap;
    var lightmap;


    // create function to initialize the map
    function initMap() {

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
            // layers: [
            //     layers.PUBLIC,
            //     layers.PRIVATE,
            //     layers.SEMIPRIVATE,
            //     layers.RESORT,
            //     layers.MILITARY
            // ]
        });
        console.log("Created map object.");

        lightmap.addTo(myMap);
        console.log("Added tile layer");


    
        
        // // create overlays object to add to the layer control
        // var overlays = {
        //     "Public": layers.PUBLIC,
        //     "Private": layers.PRIVATE,
        //     "Semi-Private": layers.SEMIPRIVATE,
        //     "Resort": layers.RESORT,
        //     "Military": layers.MILITARY
        // };

        // // create control for layers
        // L.control.layers(null, overlays).addTo(myMap);


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

    


    }

    // create function to read in course data
    function getCourseData() {


        // d3.csv("/results/MissRiver_golf_details.csv").then(function(data) {
            courseSet = courseData;
            addMarkers();
        // });
    }



    // create function to add markers
    function addMarkers() {


        courseData.forEach(function(c) {
            var marker = L.circleMarker([+c.lat, +c.lng]);
            var public = c.public_private === 'Public';
            var private = c.public_private === 'Private';
            var semiPrivate = c.public_private === 'Semi-Private';
            var resort = c.public_private === 'Resort';
            var military = c.public_private === 'Military';


            if(public) {
                marker.setStyle({
                    radius: 5,
                    fillColor: '#7FFF00',
                    fillOpacity: 1,
                    color: '#000000',
                });
            } 

            else if(private) {
                marker.setStyle({
                    radius: 5,
                    fillColor: '#DC143C',
                    fillOpacity: 1,
                    color: '#000000',
                });
            }

            else if(semiPrivate) {
                marker.setStyle({
                    radius: 5,
                    fillColor: '#5F9EA0',
                    fillOpacity: 1,
                    color: '#000000',
                });
            }

            else if(resort) {
                marker.setStyle({
                    radius: 5,
                    fillColor: '#00FFFF',
                    fillOpacity: 1,
                    color: '#000000',
                });
            }

            else if(military) {
                marker.setStyle({
                    radius: 5,
                    fillColor: '#000000',
                    fillOpacity: 1,
                    color: '#000000',
                });
            }
            
            else{
            marker.setStyle({
                radius: 5,
                fillColor: '#F8F8FF',
                color: '#000000',
                fillOpacity: 1
            });
            }

            marker.addTo(myMap);
            
        
        // add popup to selected marker
        marker.bindPopup("<h6>" + c.course + "</h6> <hr> <p><strong>Address: </strong></br>" + c.street + "<br>" + c.city + ", " + c.state + " " + c.zip_code + "<br><strong>Phone: </strong>" + c.phone + "</p><p><strong>Access: </strong>" + c.public_private + "</br><strong>Holes: </strong>" + c.hole + "</br><strong>Rental Cart Available: </strong>" + c.rental_cart_available + "</br><strong>Rental Clubs Available: </strong>" + c.rental_club +"<br><strong>Golf Season: </strong>" + c.golf_season + "<br><strong>Range: </strong>" + c.range + "<br><strong>Pro in House: </strong>" + c.pro_in_house + "<br><strong>Architect: </strong>" + c.architect + "<p>")
        .addTo(myMap);

        // show popup on mouseover
        marker.on('mouseover', function(event) {
            console.log(c.course_id);
            plotCreate(c, c.course_id)
            marker.openPopup();
            
            
        });

        marker.on('mouseout', function(event) {
            marker.closePopup();
        });


        })
    }
    

// call functions
initMap();
getCourseData();
};