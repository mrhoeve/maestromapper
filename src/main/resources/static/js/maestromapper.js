let map = null;
let chart = null;

let mousemarker = null;
let marker=null;

// Get the path to the current site
let path_to_site = window.location.href.substring(0, window.location.href.lastIndexOf('/'));

// DETECT BROWSER

// Opera 8.0+
let isOpera = (!!window.opr && !!opr.addons) || window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
let isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
let isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
let isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
let isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
let isBlink = (isChrome || isOpera) && !!window.CSS;

//$(document).ready(function () {
$(async function () {
    // Put License information in console
    console.log('Maestromapper.com\n(Leaflet version)\n\n© Rebuild by Marc Hoeve and Mart Roumen\nPatent pending ;-)\n\nLeaflet:\n' +
        'Copyright (c) 2010-2018, Vladimir Agafonkin\n' +
        'Copyright (c) 2010-2011, CloudMade\n' +
        'All rights reserved.\n' +
        '\n' +
        'Redistribution and use in source and binary forms, with or without modification, are\n' +
        'permitted provided that the following conditions are met:\n' +
        '\n' +
        '   1. Redistributions of source code must retain the above copyright notice, this list of\n' +
        '      conditions and the following disclaimer.\n' +
        '\n' +
        '   2. Redistributions in binary form must reproduce the above copyright notice, this list\n' +
        '      of conditions and the following disclaimer in the documentation and/or other materials\n' +
        '      provided with the distribution.\n' +
        '\n' +
        'THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY\n' +
        'EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF\n' +
        'MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE\n' +
        'COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n' +
        'EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\n' +
        'SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)\n' +
        'HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR\n' +
        'TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS\n' +
        'SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\n' +
        // LEAFLET MOUSEPOSITION
        'Contains Leaflet.MousePosition from https://github.com/ardhi/Leaflet.MousePosition\n\nCopyright 2012 Ardhi Lukianto\n' +
        '\n' +
        'Permission is hereby granted, free of charge, to any person obtaining\n' +
        'a copy of this software and associated documentation files (the\n' +
        '"Software"), to deal in the Software without restriction, including\n' +
        'without limitation the rights to use, copy, modify, merge, publish,\n' +
        'distribute, sublicense, and/or sell copies of the Software, and to\n' +
        'permit persons to whom the Software is furnished to do so, subject to\n' +
        'the following conditions:\n' +
        '\n' +
        'The above copyright notice and this permission notice shall be\n' +
        'included in all copies or substantial portions of the Software.\n' +
        '\n' +
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,\n' +
        'EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n' +
        'MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\n' +
        'NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\n' +
        'LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION\n' +
        'OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION\n' +
        'WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n' +
        // LEAFLET FILELAYER
        'Uses Leaflet.FileLayer from https://github.com/makinacorpus/Leaflet.FileLayer\n\nMIT License\n' +
        '\n' +
        'Copyright (c) 2012 Makina Corpus\n' +
        '\n' +
        'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n' +
        '\n' +
        'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n' +
        '\n' +
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n' +
        // toGeoJSON
        'Uses toGeoJSON from https://github.com/mapbox/togeojson\n\nCopyright (c) 2016 Mapbox All rights reserved.\n' +
        '\n' +
        'Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:\n' +
        '\n' +
        '1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.\n' +
        '\n' +
        '2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.\n' +
        '\n' +
        'THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n');

    // Leafletjs implementation
    map = new L.Map('map_canvas');

    // Start the map
    map.setView(new L.LatLng(52.7, 6.3), 5);
    await addAvailableMaps();

    // Register mouse movements so we can display the current lat/lon
    L.control.mousePosition().addTo(map);

    // // Add fileLayer control so we can import json files
    // L.Control.FileLayerLoad.LABEL = '<img class="icon" src="./images/folder.svg" alt="file icon"/>';
    // L.Control.fileLayerLoad({
    //     // Allows you to use a customized version of L.geoJson.
    //     // For example if you are using the Proj4Leaflet leaflet plugin,
    //     // you can pass L.Proj.geoJson and load the files into the
    //     // L.Proj.GeoJson instead of the L.geoJson.
    //     layer: L.geoJson,
    //     // See http://leafletjs.com/reference.html#geojson-options
    //     layerOptions: {style: {color:'red'}},
    //     // Add to map after loading (default: true) ?
    //     addToMap: true,
    //     // File size limit in kb (default: 1024) ?
    //     fileSizeLimit: 1024,
    //     // Restrict accepted file formats (default: .geojson, .json, .kml, and .gpx) ?
    //     // formats: [
    //     //     '.geojson',
    //     //     '.kml'
    //     // ]
    // }).addTo(map);
    //
    // Mark the current point when clicking the contextmenubutton (normally the right mouse button)
    map.on('contextmenu', function (e) {
        document.getElementById('latlng').value = L.Util.formatNum(e.latlng.lat, 5) + ", " + L.Util.formatNum(e.latlng.lng, 5);
        if (marker != null) {
            map.removeLayer(marker);
            marker = null;
        }
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        codeLatLng(e);
    });

    // // Add new marker for the center
    let iconCenterIcon = L.icon({
        iconUrl: path_to_site + '..\\images\\5star.gif'
    });
    // Place the icon on the map
    let centerIcon = L.marker(map.getCenter(), {icon: iconCenterIcon}).addTo(map);
    // Add listener
    map.on('move', function (e) {
        // 0.1 seconds after the center of the map has changed,
        // set back the marker position.
        window.setTimeout(function () {
            centerIcon.setLatLng(map.getCenter());
        }, 100);
    });

    // Add listener for resize of the map
    window.onresize = function () {
        window.setTimeout(function () {
            setFloatingSearchBar();
            handlePositionElement();
        }, 100);
    };

    // Some stuff to setup and initialise the GUI
    handlePositionElement();
    // some basic stuff for a correct functioning site
    // add class to header button and make it clickable
    document.getElementById("searchButton").classList.add("searchButton");
    document.getElementById("searchButton").onclick = function () {
        showSearchBar();
    };
    document.getElementById("closer").onclick = function () {
        collapseSearchBar();
    };
    // make sure the searchbar is not visible by removing the class sticky
    document.getElementById("searchBar").classList.remove("sticky");
    // Make sure we handle a change in the sticky part of the search box
    document.getElementById("stickySearchBar").onclick = function () {
        changeStickySearchBar(this.checked);
    };
});

/*
    GUI FUNCTIONS
 */

// Define all the available maps
async function addAvailableMaps() {
    let restResult = await fetch('api/maps');
    if(restResult.ok) {
        let availableMaps = await restResult.json();
        if(availableMaps.length !== 0) {
            let availableLayers = []
            for(let availableMap of availableMaps) {
                let options = [];
                if(availableMap.minZoom != null && availableMap.maxZoom != null ) {
                    options["minZoom"] = availableMap.minZoom;
                    options["maxZoom"] = availableMap.maxZoom;
                }
                if(availableMap.boundX1 != null && availableMap.boundY1 != null && availableMap.boundX2 != null && availableMap.boundY2 != null) {
                    options["bounds"] = [[availableMap.boundX1, availableMap.boundY1], [availableMap.boundX2, availableMap.boundY2]];
                }
                options["attribution"] = availableMap.attribution;
                if(availableMap.isDefault) {
                    availableLayers[availableMap.name] = L.tileLayer(availableMap.mapUrl, options).addTo(map);
                } else {
                    availableLayers[availableMap.name] = L.tileLayer(availableMap.mapUrl, options);
                }
            }

            L.control.layers(availableLayers).addTo(map);
            console.log(availableMaps);
            console.log(availableLayers);
        }
    }
    // let data_attrib = ' | data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    //
    // // Define and create default layer
    // let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //     {
    //         minZoom: 3,
    //         maxZoom: 19,
    //         attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    //     });
    //
    // let OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {attribution: 'Map: <a href="http://viewfinderpanoramas.org">SRTM</a>' + data_attrib}).addTo(map);
    // let worldmap = L.tileLayer('http://world.maestromapper.com/world/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/world/">MR</a>' + data_attrib});
    // let historisch = L.tileLayer('http://share.maestromapper.com/historisch/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/world/">MR</a>' + data_attrib});
    // let tibet = L.tileLayer('http://share.maestromapper.com/tibet/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/world/">MR</a>' + data_attrib});
    // let westafrika = L.tileLayer('http://share.maestromapper.com/westafrika/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/world/">MR</a>' + data_attrib});
    // let noordafrika = L.tileLayer('http://share.maestromapper.com/noordafrika/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/world/">MR</a>' + data_attrib});
    // let worldimage = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: 'Map: <a href="http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/">MR</a>' + data_attrib});
    // let eritrea = L.tileLayer('http://share.maestromapper.com/eritrea/{z}/{x}/{y}.png', {attribution: 'Map: <a href="http://share.maestromapper.com/eritrea/">MR</a>' + data_attrib});
    // let afghanistan = L.tileLayer('http://share.maestromapper.com/afghanistan/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/afghanistan/">MR</a>' + data_attrib});
    // let somalia = L.tileLayer('http://share.maestromapper.com/somalia/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/somalia/">MR</a>' + data_attrib});
    // let syria = L.tileLayer('http://share.maestromapper.com/syria/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/syria/">MR</a>' + data_attrib});
    // let iraq = L.tileLayer('http://share.maestromapper.com/iraq/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/iraq/">MR</a>' + data_attrib});
    // let sudan = L.tileLayer('http://share.maestromapper.com/sudan/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/sudan/">MR</a>' + data_attrib});
    // let etn = L.tileLayer('http://share.maestromapper.com/etn/{z}/{x}/{y}.jpg', {attribution: 'Map: <a href="http://share.maestromapper.com/etn/">MR</a>' + data_attrib});
    // let drcburundi = L.tileLayer('http://share.maestromapper.com/drcburundi/{z}/{x}/{y}.jpg', {attribution: "Map: <a href='http://share.maestromapper.com/drcburundi/'>MR</a>" + data_attrib});
    // let wrldIncompl = L.tileLayer('http://from.maestromapper.com/incomplete/{z}/{x}/{y}.jpg', {attribution: "Map: <a href='http://from.maestromapper.com/incomplete/'>MR</a>" + data_attrib});
    // let wrldMore = L.tileLayer('http://from.maestromapper.com/more/{z}/{x}/{y}.jpg', {attribution: "Map: <a href='http://from.maestromapper.com/more/'>MR</a>" + data_attrib});
    // let Esri_WTMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles © Esri — Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'});
    // let nllucht17 = L.tileLayer('https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/Actueel_ortho25/EPSG:3857/{z}/{x}/{y}.jpeg', {
    //     minZoom: 6,
    //     maxZoom: 19,
    //     bounds: [[50.5, 3.25], [54, 7.6]],
    //     attribution: 'Kaartgegevens © Kadaster'
    // });
    // let infonames = L.tileLayer('http://world.maestromapper.com/vec/{z}/{x}/{y}.png', {attribution: 'Map: <a href="http://world.maestromapper.com/world/">MR</a>' + data_attrib});
    //
    // //add the favored layers to an JSON-object
    // let baseLayers = {
    //     'OpenStreetMap': osm,
    //     'Worldmap': worldmap,
    //     'Historisch': historisch,
    //     'Tibet': tibet,
    //     'West-Afrika': westafrika,
    //     'Noord-Afrika': noordafrika,
    //     'OpenTopoMap': OpenTopoMap,
    //     'Worldimage': worldimage,
    //     'Eritrea': eritrea,
    //     'Afghanistan': afghanistan,
    //     'Somalia': somalia,
    //     'Syria': syria,
    //     'Iraq': iraq,
    //     'Sudan': sudan,
    //     'Burundi': drcburundi,
    //     'Etnisch': etn,
    //     'Esri': Esri_WTMap,
    //     'Nederland 2017': nllucht17,
    //     'Infonames': infonames,
    //     'World wip - inc.': wrldIncompl,
    //     'World wip - more': wrldMore
    // };
    //
    // L.control.layers(baseLayers).addTo(map);
}

// Positions position element div to the center of the map or hides it if the screen is too narrow
function handlePositionElement() {
    let dirElDiv = document.getElementById("goToAndCurrentPosition");
    let siteWidth = document.getElementById("site").getBoundingClientRect().width;
    let divWidth = dirElDiv.getBoundingClientRect().width;
    let searchIsSticky = document.getElementById("searchBar").classList.contains("sticky");
    let requiredWidth = divWidth + 100;
    if (searchIsSticky) {
        requiredWidth = requiredWidth + 250;
    }
    if (siteWidth <= requiredWidth) {
        dirElDiv.style.visibility = "hidden";
    } else {
        dirElDiv.style.visibility = "unset";
    }
    let leftpos = ((siteWidth - divWidth) / 2);
    if (searchIsSticky) {
        leftpos = leftpos + 125;
    }
    dirElDiv.style.left = leftpos + "px";
}

// Positions the floating search bar
function setFloatingSearchBar() {
    let searchBar = document.getElementById("searchBar");
    let isSticky = searchBar.classList.contains("sticky");
    if (document.getElementById("searchDiv").classList.contains("hide") === false) {
        if (isSticky) {
            searchBar.style.removeProperty("height");
        }
        searchBar.style.height = document.getElementById("map_canvas").clientHeight + "px";
        // Execute this only if the class hasn't been made sticky
        if (searchBar.classList.contains("sticky") === false) {
            let divElement = document.getElementById("map_canvas");
            let divTop = divElement.getBoundingClientRect().top + 1;  // Add 1 because of the border
            searchBar.style.top = divTop + "px";
        }
    }
}

// sets or unsets the sticky part of the search bar
function changeStickySearchBar(checkedStatus) {
    if (checkedStatus === true) {
        document.getElementById("searchBar").classList.remove("floatingSearchBar");
        document.getElementById("searchBar").style.removeProperty("top");
        document.getElementById("searchBar").classList.add("sticky");
        document.getElementById("closer").classList.add("hide");
        document.getElementById("main").classList.remove("mainNonFloating");
    } else {
        document.getElementById("searchBar").classList.remove("sticky");
        document.getElementById("searchBar").classList.add("floatingSearchBar");
        document.getElementById("closer").classList.remove("hide");
        document.getElementById("main").classList.add("mainNonFloating");
        setFloatingSearchBar();
    }
    handlePositionElement();
}

// Shows the search bar when the button is clicked
function showSearchBar() {
    if (document.getElementById("searchButton").classList.contains("searchButton") === true) {
        let searchBar = document.getElementById("searchBar");
        // Only perform following actions when its like a button
        document.getElementById("searchButton").classList.remove("searchButton");
        document.getElementById("searchButton").classList.add("searchHeader");
        document.getElementById("closer").classList.remove("hide");
        document.getElementById("searchDiv").classList.remove("hide");
        document.getElementById("message").classList.remove("hide");
        document.getElementById("information").classList.remove("hide");
        document.getElementById("map_info").classList.remove("floatingMapInfo");
        document.getElementById("map_info").classList.remove("hide");
        document.getElementById("map_info").classList.add("inSearchBar");
        searchBar.classList.add("floatingSearchBar");
        setFloatingSearchBar();
    }
}

// Collapse the search bar when necessary
function collapseSearchBar() {
    if (document.getElementById("searchBar").classList.contains("sticky") !== true) {
        document.getElementById("searchBar").style.removeProperty("height");
        document.getElementById("searchButton").classList.add("searchButton");
        document.getElementById("searchButton").classList.remove("searchHeader");
        document.getElementById("closer").classList.add("hide");
        document.getElementById("searchDiv").classList.add("hide");
        document.getElementById("message").classList.add("hide");
        document.getElementById("information").classList.add("hide");
        document.getElementById("map_info").classList.remove("inSearchBar");
        document.getElementById("map_info").classList.add("floatingMapInfo");
        if (document.getElementById("map_info").innerHTML.trim() === "") {
            document.getElementById("map_info").style.zIndex = "-1";
            document.getElementById("map_info").classList.add("hide");
        }
    }
}

/*
    END OF GUI FUNCTIONS
 */


/*
    SITE CONTENT FUNCTIONS
    USED IN INDEX.PHP -- DO NOT REMOVE
 */

// Function gets called when a user rightclicks in the map
function codeLatLng(e) {
    let codeURL = 'https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng;
    let str = "";
    $.getJSON(codeURL, {})
        .done(function (data) {
            str = "<strong>Lat:<\/strong> " + e.latlng.lat + "<br\/>";
            str += "<strong>Lng:<\/strong> " + e.latlng.lng + "<br\/><br\/>";
            if(data.features[0].properties.geocoding.admin.level10 != null)
            {
                str += "<strong>Suburb:<\/strong> " + data.features[0].properties.geocoding.admin.level10 + "<br\/>";
            }
            if(data.features[0].properties.geocoding.admin.level9 != null)
            {
                str += "<strong>City district:<\/strong> " + data.features[0].properties.geocoding.admin.level9 + "<br\/>";
            }
            if(data.features[0].properties.geocoding.admin.level8 != null)
            {
                str += "<strong>Village:<\/strong> " + data.features[0].properties.geocoding.admin.level8 + "<br\/>";
            }
            if(data.features[0].properties.geocoding.admin.level7 != null)
            {
                str += "<strong>County:<\/strong> " + data.features[0].properties.geocoding.admin.level7 + "<br\/>";
            }
            if(data.features[0].properties.geocoding.admin.level6 != null)
            {
                str += "<strong>(unknown level)<\/strong> " + data.features[0].properties.geocoding.admin.level6 + "<br\/>";
            }
            if(data.features[0].properties.geocoding.admin.level5 != null)
            {
                str += "<strong>Sate district:<\/strong> " + data.features[0].properties.geocoding.admin.level5 + "<br\/>";
            }
            if(data.features[0].properties.geocoding.admin.level4 != null)
            {
                str += "<strong>Sate:<\/strong> " + data.features[0].properties.geocoding.admin.level4 + "<br\/>";
            }
            if(data.features[0].properties.geocoding.admin.level2 != null)
            {
                str += "<strong>Country:<\/strong> " + data.features[0].properties.geocoding.admin.level2 + "<br\/>";
            }
            if(data.features[0].properties.geocoding.label != null) {
                str += "<strong>Address:</strong> " + data.features[0].properties.geocoding.label + "<br\/>";
            }
            str += "<br\/>" + data.geocoding.attribution + "<br\/><br\/>";
            $("#map_info").html(str);

            // GUI element to make sure the div is shown if the search bar isn't sticky
            document.getElementById("map_info").style.zIndex = "1001";
            if (document.getElementById("map_info").classList.contains("hide")) {
                document.getElementById("map_info").classList.remove("hide");
            }
        });
}

// Function gets called when the user enters a lat/lng
function coderLatLng() {
    let input = document.getElementById('latlng').value;
    let latlngStr = input.split(',', 2);
    let lat = parseFloat(latlngStr[0]);
    let lng = parseFloat(latlngStr[1]);
    map.setView(new L.LatLng(lat, lng), 12);
}


// Clear all overlays, reset the array of points, and hide the chart
function reset() {
    // Remove the marker if any is placed
    if(marker != null) {
        map.removeLayer(marker);
        document.getElementById('latlng').value='';
    }

    document.getElementById("map_info").innerHTML = "";
    if (document.getElementById("map_info").classList.contains("floatingMapInfo")) {
        document.getElementById("map_info").style.zIndex = "-1";
        document.getElementById("map_info").classList.add("hide");
    }
}

// PERFORMS THE SEARCH
function performSearch() {
    writeMessage('', true);
    writeMessage('<p>Searching for ' + document.findPlaceForm.q.value + ' in ' + '</p><p><img src="./images/fuzzyg.gif" /> and <img src="./images/mysql.png" /></p>', false);

    // Build countrypart of URL
    let countryquery = document.findPlaceForm.cc.options[document.findPlaceForm.cc.selectedIndex].value;
    if (countryquery.length == 2) {
        countryquery = '&cc=' + countryquery;
    }
    if (countryquery == '&cc=') {
        countryquery = '';
    }

    // Call performsearch.php
    let url = path_to_site + "/performsearch.php?q=" + document.findPlaceForm.q.value + countryquery;
    loadAndShowXML(url);
    return false;
}

// Load and show the wanted XML
function loadAndShowXML(url) {
    let xml = loadXMLDoc(url);
    let xsl = loadXMLDoc(path_to_site + "/xsl/layout.xsl");

    // code for IE
    if (isIE) {
        document.getElementById("message").innerHTML = xml.transformNode(xsl);
    }
    // code for Chrome, Firefox, Opera, etc.
    else {

        let xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        let resultDocument = xsltProcessor.transformToFragment(xml, document);
        document.getElementById("message").appendChild(resultDocument);
    }
}

// The actual loading of the XML
function loadXMLDoc(filename) {
    let xhttp;
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    try {
        xhttp.responseType = "msxml-document";
    } catch (err) {
    } // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
}

// Helper function to write messages in the div
function writeMessage(t, clear) {
    if (clear === true) {
        document.getElementById("message").innerHTML = t;
    } else {
        document.getElementById("message").innerHTML = document.getElementById('message').innerHTML + '<br />' + t;
    }
}

/*
    END OF SITE CONTENT FUNCTIONS
 */

/*
    XSL MARKUP FUNCTIONS
    USED IN XSL FILE -- DO NOT REMOVE
 */

// Handles the Go! click in the XML
function handleXSLClick(fullname, lat, lng) {
    collapseSearchBar();
    if (document.getElementById('showEarth').checked === true) {
        window.location = 'gearth.php?lat=' + lat + '&lng=' + lng + '&fullname=' + fullname;
    } else {
        map.setView(new L.LatLng(lat, lng), 12);
    }
}

// Handles the RS! click in the XML
function performRadiusSearch(lat, lng, cc) {
    writeMessage('', true);
    writeMessage('<p>Perform radius search on lat/lng ' + lat + ',' + lng + '<br />using local <img src="./images/mysql.png" /></p>', false);

    let url = path_to_site + "/radiussearch.php?lat=" + lat + "&lng=" + lng + "&cc=" + cc;
    loadAndShowXML(url);
}

L.Control.MousePosition = L.Control.extend({
    options: {
        position: 'bottomleft',
        separator: ', ',
        emptyString: 'Unavailable',
        lngFirst: false,
        numDigits: 5,
        lngFormatter: undefined,
        latFormatter: undefined,
        prefix: ""
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML=this.options.emptyString;
        return this._container;
    },

    onRemove: function (map) {
        map.off('mousemove', this._onMouseMove)
    },

    _onMouseMove: function (e) {
        var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
        var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
        var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
        var prefixAndValue = this.options.prefix + '' + value;
//        this._container.innerHTML = prefixAndValue;
        document.getElementById('curpos').value=prefixAndValue;
    }

});

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};
