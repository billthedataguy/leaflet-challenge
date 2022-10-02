// logic.js

// console.log("This is logic.js");

// Globals 

let features;
let depthArray = [];

// Create map object 

let map = L.map('map').setView([18.4762, -77.8939], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '© OpenStreetMap'
}).addTo(map);

// API GeoJSON

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data) {

  features = data.features;  

  // Iterate over features

  for (let i=0; i<features.length; i++) 
  {

      // Use for placing circles on map

      let coords = features[i].geometry.coordinates;
      let lon = coords[0];
      let lat = coords[1];

      // Use for size of circles, color of circles, and popup text

      let depth = parseInt(coords[2]);
      
      if (!Number.isNaN(depth)) {
        depthArray.push(depth);
      }
            
      // console.log(depth);

      let mag = parseFloat(features[i].properties.mag);

      if (mag < 0) {
        mag = Math.abs(mag);
      }  

      if (depth < 0) {
        depth = Math.abs(depth);
      }  

      let title = features[i].properties.title;

      // console.log("LON: ", lon);
      // console.log("LAT: ", lat);
      // console.log("DEPTH: ", depth);
      // console.log("MAG: ", mag);
      // console.log("TITLE: ", title);

      // Size circles
      
      let radius = (50000 * mag) / Math.PI;

      // Light to dark, less opaque to more opaque, for circles based on depth
    
      if (depth <= 10) {
        color = "#2cba00";
        fillOpacity = 0.2;
      } else if (depth <= 30) {
        color = "#a3ff00";
        fillOpacity = 0.4;
      } else if (depth <= 50) {
        color = "#fff400";
        fillOpacity = 0.6;
      } else if (depth <= 70) {
        color = "#ffa700";
        fillOpacity = 0.8;
      } else if (depth <= 90) {
        color = "#ff0000";
        fillOpacity = 0.9;
      } else {
        color = "#8b2323";
        fillOpacity = 1.0;
      }

      let circle = L.circle([lat, lon], {
        color: "grey",
        fillColor: color,
        fillOpacity: fillOpacity,
        radius: radius
      }).addTo(map);     
      
      let popupText = title + "<br><br><b>Depth: </b>" + depth;
     
      circle.bindPopup(popupText);
            
  }

  let ascDepthArray = depthArray.sort(function(a, b){return a-b});

  // console.log(ascDepthArray);
  // console.log("MAX: ", ascDepthArray[ascDepthArray.length - 1]);
  // console.log("MIN: ", ascDepthArray[0]);

  let legend = L.control({position: "bottomright"});

  legend.onAdd = function(map) {
      let div = L.DomUtil.create("div", "legend");      
      div.innerHTML += "<h4>Depth</h4>";
      div.innerHTML += '<i style="background: #2cba00"></i><span><=10</span><br>';
      div.innerHTML += '<i style="background: #a3ff00"></i><span>11-30</span><br>';
      div.innerHTML += '<i style="background: #fff400"></i><span>31-50</span><br>';
      div.innerHTML += '<i style="background: #ffa700"></i><span>51-70</span><br>';
      div.innerHTML += '<i style="background: #ff0000"></i><span>71-90</span><br>';
      div.innerHTML += '<i style="background: #8b2323"></i><span>>90</span><br>';
      
      return div;   

  };
  
  legend.addTo(map);

});