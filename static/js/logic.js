// API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // GET Request
  d3.json(queryUrl).then(function(ssData)
  {
    ssCreateFeature(ssData.features);
  }
  );

function ssCreateFeature(earthquakeData){

  //Function for running on each feature in the features portion of the array aswell as giving a popup for palce and time.
function ssOnEachFeat(feature , layer) {
    layer.bindPopup( `<h3> ${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }
    
  //Create a GEOJSON layer with the features array from earthquake data.
var earthquakes = L.geoJSON(earthquakeData, 
    //run ssOnEachFeat for each index of data in the array.
    {
    ssOnEachFeat: ssOnEachFeat
    });
    createMap(earthquakes);
  }


function createMap(earthquakes) {

  //creating standard base layers
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  
var baseMaps = 
  {
    "Street Map": street,
  };

  //Create object to hold the overlay
var overlayMaps = 
  {
    Earthquakes: earthquakes
  };

  //Creating my map
var myMap = L.map("map", 
  {
    center: [
      45, -100
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, 
  {
    collapsed: false
  }).addTo(myMap);
  

}