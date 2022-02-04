// Global variables

let map;
let lat = 34;
let lon = -118;
let zl = 9;

let geojsonPath = 'https://raw.githubusercontent.com/LCIWaterProjects/lacwatergovmap_spanish/main/data/SpanUpdate.geojson';
let geojson_data;
let geojson_layer;


let brew = new classyBrew();
let legend = L.control({position: 'bottomleft'});
let info_panel = L.control();
let fieldtomap = 'GovCode' ;
let fieldtype='choropleth'



// initialize+
$( document ).ready(function() {
    createMap(lat,lon,zl);
    getGeoJSON();
});

 
// create the map
function createMap(lat,lon,zl){
    map = L.map('map').setView([lat,lon], zl);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
	{
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'light-v10',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1Ijoic2FyYWhwZXJlejEiLCJhIjoiY2t0MG9hZDNnMDZ2NDJ1c2M5dzBmb201OSJ9.5fv8NqX5cfA0NMcmEW_63g'
	})
    .addTo(map);
    const search = new GeoSearch.GeoSearchControl({
        provider: new GeoSearch.OpenStreetMapProvider(),});
        map.addControl(search);
      
      const searchControl = new SearchControl({
          provider: new OpenStreetMapProvider(),
          style: 'bar',
          position: 'topleft',
        });
      
        map.addControl(searchControl);
        
   
}

// function to get the geojson data
    $.getJSON(geojsonPath,function(data){
        
        // put the data in a global variable
        geojson_data = data;

        // call the map function
        mapGeoJSON(fieldtomap,5,'YlOrRd','quantiles');
    })
   
function mapGeoJSON(field,num_classes,color,scheme){

    // clear layers in case it has been mapped already
    if (geojson_layer){
        geojson_layer.clearLayers()
    }
    
    // globalize the field to map
    fieldtomap = field;
    
    // create an empty array
    let values = [];

    // based on the provided field, enter each value into the array
    geojson_data.features.forEach(function(item,index){
        if((item.properties[field] != undefined ) ){
            values.push(item.properties[field])
        }
    })

    // set up the "brew" options
    brew.setSeries(values);
    brew.setNumClasses(num_classes);
    brew.setColorCode(color);
    brew.classify(scheme);

    // create the layer and add to map
    geojson_layer = L.geoJson(geojson_data, {
        style: getStyle, //call a function to style each feature
        onEachFeature: onEachFeature // actions on each feature
    }).addTo(map);
    
    // turning off fit bounds so that we stay in mainland USA
    // map.fitBounds(geojson_layer.getBounds())


    // create the legend
    createLegend();

    // create the infopanel
    createInfoPanel();

    //create table
    // createTable();

 
}

//original getstyle commented out
//function getStyle(feature){return {stroke: true,color: 'white', weight: 1, fill: true,fillColor: brew.getColorInRange(feature.properties[fieldtomap]),fillOpacity: 0.8}}

//Coding for English Data
function getStyle(feature){
    if(fieldtomap == 'GovCode'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return d == 9  ? '#272727' :
                   d == 8  ? '#C47335 ' :
                   d == 7  ? '#1AC8ED' : 
                   d == 6  ? '#F46036 ' :
                   d == 5  ? '#109648 ' :
                   d == 4  ? '#51344D' :
                   d == 3  ? '#FED18C' :
                   d == 2  ? '#5BC8AF ' :
                   d == 1  ? '#6C91BF':
                                '#5B769A';
                              
        }
     }
     else if(fieldtomap == 'New_MechCo'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return d == 0  ? '#CECfC7' :
                   d == 3  ? '#F3A712' :
                   d == 2  ? '#E4572E':
                   d == 1  ? '#64B6AC':
                                '#8CB369';
                              
        }
    }
    else if(fieldtomap == 'Population'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d > 476000  ? '#8D3C01' :
                    d > 270000  ? '#BD580F' :
                    d > 115000  ? '#E37826' :
                    d > 70000  ? '#FF990A' :
                    d > 35000  ? '#FFC247':
                                 '#FFD899';
                              
        }
    }
    else if(fieldtomap == 'Service_Co'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d > 100000 ? '#330462' :
                    d > 30000  ? '#584884' :
                    d > 10000 ? '#6A7AA0' :
                    d > 3300 ? '#62A7A6' :
                    d > 500  ? '#8DCEB4':
                                 '#BFEDCF';
                              
        }
    }
    else if(fieldtomap == 'WaterBill'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d > 90  ? '#6C0F12' :
                    d > 72 ? '#A4161A' :
                    d > 57 ? '#D71D24' :
                    d > 38  ? '#E74B51':
                    d > 0 ? '#EE8185':
                                 '#CECFC7';
                              
        }
    }
    else if(fieldtomap == 'HMW'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d > 7  ? '#003D2D' :
            d > 6  ? '#00523D' :
            d > 5  ? '#0B6B46' :
            d > 4  ? '#16834F' :
            d > 3  ? '#55A630' :
            d > 2  ? '#97D91C' :
            d > 1 ? '#DCF613' :
            d > 0  ? '#F0FB9D' :
                         '#CECFC7';
        }
    }
    else if(fieldtomap == 'RiskCode'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d == 0 ? '#cecfc7' :
            d == 1  ? '#20bf55' :
            d == 2 ? '#f9c846':
            d == 3 ? '#f96900':
            d == 4 ? '#e3170a':
                         '#412722';
        }
    }
    else if(fieldtomap == 'FiveMCL'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d == 0 ? '#b4dce4' :
            d == 1  ? '#1f78b4' :
            d == 2 ? '#f96900':
            d == 3 ? '#f96900':
            d == 4 ? '#f96900':
            d == 5 ? '#e3170a':
            d > 5 ? '#e3170a':
                         '#CECFC7';
        }
    }
    else if(fieldtomap == 'OperatorBe'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d == 2  ? '#FA0F36' :
            d == 1 ? '#028090' :
            d == 0  ? '#ABB4C4' :
                         '#412722';
        }
    }
    else if(fieldtomap == 'PWS_Code'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d == 5 ? '#B3AF8F' :
            d == 4  ? '#FFC482' :
            d == 3  ? '#66999B' :
            d == 2  ? '#2B3A67' :
            d == 1  ? '#89A7BD' :
            d == 0  ? '#CECFC7' :

                         '#412722';
        }
    }
 
    
   //Coding for Spanish Data  
 if(fieldtomap == 'SpanGovernanceCode'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return d == 9  ? '#cab2d6' :
                   d == 8  ? '#ff7f00' :
                   d == 7  ? '#fdbf6f' :
                   d == 6  ? '#e31a1c' :
                   d == 5  ? '#fb9a99' :
                   d == 4  ? '#33a02c' :
                   d == 3  ? '#b2df8a' :
                   d == 2  ? '#1f78b4' :
                   d == 1  ? '#a6cee3':
                                '#412722';
                              
        }
     }
    else if(fieldtomap == 'SpanMechanismCode'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return d == 3  ? '#fc8d62' :
                   d == 2  ? '#8da0cb' :
                   d == 1  ? '#66c2a5':
                                '#412722';
                              
        }
    }
    else if(fieldtomap == 'SpanPopulation'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d > 476000  ? '#33a02c' :
                    d > 270000  ? '#b2df8a' :
                    d > 115000  ? '#1f78b4' :
                    d > 70000  ? '#fb9a99' :
                    d > 35000  ? '#a6cee3':
                                 '#412722';
                              
        }
    }
    else if(fieldtomap == 'SpanService_Co'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d > 100000 ? '#33a02c' :
                    d > 30000  ? '#b2df8a' :
                    d > 10000 ? '#1f78b4' :
                    d > 3300 ? '#fb9a99' :
                    d > 500  ? '#a6cee3':
                                 '#412722';
                              
        }
    }
    else if(fieldtomap == 'SpanWaterBill'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d > 90  ? '#b2df8a' :
                    d > 72 ? '#1f78b4' :
                    d > 57 ? '#fb9a99' :
                    d > 38  ? '#a6cee3':
                    d > 0 ? '#cab2d6':
                                 '#412722';
                              
        }
    }
    else if(fieldtomap == 'SpanHMW'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d == 8  ? '#cab2d6' :
            d == 7  ? '#ff7f00' :
            d == 6  ? '#fdbf6f' :
            d == 5  ? '#e31a1c' :
            d == 4  ? '#fb9a99' :
            d == 3  ? '#33a02c' :
            d == 2  ? '#b2df8a' :
            d == 1  ? '#1f78b4' :
                         '#412722';
        }
    }
    else if(fieldtomap == 'SpanOperator Below Required'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d == 1 ? '#cab2d6' :
            d == 0  ? '#ff7f00' :
                         '#412722';
        }
    }
    else if(fieldtomap == 'SpanNo operator'){
        return {
            stroke: true,
            color: 'white',
            weight: 1,
            fill: true,
            fillColor: getColor(feature.properties[fieldtomap]),
            fillOpacity: 0.8
        }

        function getColor(d) {

            return  d == 1 ? '#cab2d6' :
            d == 0  ? '#ff7f00' :
                         '#412722';
        }
    }
    else{
    return {
        stroke: true,
        color: 'white',

        weight: 1,
        fill: true,
        fillColor: brew.getColorInRange(feature.properties[fieldtomap]),
        fillOpacity: 0.8
        }
    }
}

function createLegend(){
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        breaks = brew.getBreaks(),
        labels = [],
        from, to;
        console.log('mapping '+fieldtomap)

        //Coding for English Legends

        if(fieldtomap == 'GovCode'){
            div.innerHTML =
            '<b>Tipo de Gobernanza del Sistema de Agua</b><br>'+
            '<div style="background-color: #6C91BF"></div>Ciudad/Municipal<br>' +
            '<div style="background-color: #5BC8AF"></div>Condado<br>' +
            '<div style="background-color: #51344D"></div>Utilidad Propiedad del Inversionista<br>' +
            '<div style="background-color: #FED18C"></div>Compañía de Agua Mutua<br>'+
            '<div style="background-color: #109648"></div>Distrito Especial<br>' +
            '<div style="background-color: #F46036"></div>Casa Móvil/Remolque/Parque de<br>Casas Rodantes<br>' +
            '<div style="background-color: #1AC8ED"></div>Distrito de Riego<br>'+
            '<div style="background-color: #C47335"></div>Otra Privada<br>'+
            '<div style="background-color: #272727"></div>Desconocida<br>'
            return div;
            
    
        }
        else if(fieldtomap == 'New_MechCo'){
            div.innerHTML =
            
            '<b>Como se Elige Liderazgo</b><br>'+
            '<div style="background-color: #CECFC7"></div>Sin Datos<br>'+
            '<div style="background-color: #64B6AC"></div>Elección Municipal<br>'+
            '<div style="background-color: #E4572E"></div>Elección de las Partes Interesadas<br>'+
            '<div style="background-color: #F3A712"></div>Nombramiento<br>'
           
           
            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'Population'){
            div.innerHTML =
            '<b>Población del Sistema</b><br>'+
            '<div style="background-color: #FFD899"></div>0 - 35,000<br>'+
            '<div style="background-color: #FFC247"></div>35,001 - 70,000<br>'+
            '<div style="background-color: #FF990A"></div>70,001 - 115,000<br>'+
            '<div style="background-color: #E37826"></div>115,001 - 270,000<br>'+
            '<div style="background-color: #BD580F"></div>270,001 - 476000<br>'+
            '<div style="background-color: #8D3C01"></div>Mas de 476,000<br>'

            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'Service_Co'){
            div.innerHTML =
            '<b>Conexiones de Servicio del Sistema</b><br>'+
            '<div style="background-color: #BFEDCF"></div>0 - 500<br>'+
            '<div style="background-color: #8DCEB4"></div>501 - 3,300<br>'+
            '<div style="background-color: #62A7A6"></div>3,301 - 10,000<br>'+
            '<div style="background-color: #6A7AA0"></div>10,001 - 30,000<br>'+
            '<div style="background-color: #584884"></div>30,001 - 100,000<br>'+
            '<div style="background-color: #330462"></div>Mas de 100,000<br>'

            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'WaterBill'){
            div.innerHTML =
            
            '<b>Factura de Agua</b><br>'+
            '<div style="background-color: #CECFC7"></div>Sin Datos<br>'+
            '<div style="background-color: #F5B7B9"></div>$0 - $38<br>'+
            '<div style="background-color: #EE8185"></div>$38 -$57<br>'+
            '<div style="background-color: #E74B51"></div>$57 - $72<br>'+
            '<div style="background-color: #D71D24"></div>$72 - $90<br>'+
            '<div style="background-color: #A4161A"></div>Mas de $90<br>'
           
            

            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'HMW'){
            div.innerHTML =
            '<b>Horas de Salario Minimo</b>'+
            '<br><div style="background-color: #CECFC7"></div>Sin Datos<br>'+
            '<div style="background-color: #F0FB9D"></div>1 Hora<br>' +
            '<div style="background-color: #DCF613"></div>2 Horas<br>' +
            '<div style="background-color: #97D91C"></div>3 Horas<br>'+
            '<div style="background-color: #55A630"></div>4 Horas<br>' +
            '<div style="background-color: #16834F"></div>5 Horas<br>' +
            '<div style="background-color: #0B6B46"></div>6 Horas<br>' +
            '<div style="background-color: #00523D"></div>7 Horas<br>'+
            '<div style="background-color: #003D2D"></div>8 Horas<br>'
          


            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'RiskCode'){
            div.innerHTML =
            '<b>Puntaje de Riesgo</b><br>'+
            '<div style="background-color: #CECFC7"></div>No en Evaluación de Riesgos<br>' +
            '<div style="background-color: #20BF55"></div>No en Riesgo<br>' +
            '<div style="background-color: #F9C846"></div>Potencialmente en Riesgo<br>' +
            '<div style="background-color: #F96900"></div>En Riesgo<br>' +
            '<div style="background-color: #E3170A"></div>Fallando<br>' 
            


            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'OperatorBe'){
            div.innerHTML =
            '<b>Certificación del Operador</b><br>'+
            '<div style="background-color: #FA0F36"></div>Este sistema no tiene operador.<br>' +
            '<div style="background-color: #028090"></div>El operador está por debajo de la certificación.<br>' +
            '<div style="background-color: #ABB4C4"></div>Este operador cumple con las certificaciones.<br>' 


            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'PWS_Code'){
            div.innerHTML =
            '<b>Fuente de Agua Primaria</b><br>'+
            '<div style="background-color: #CECFC7"></div>Sin Datos<br>' +
            '<div style="background-color: #2B3A67"></div>Agua Subterránea<br>' +
            '<div style="background-color: #89A7BD"></div>Agua Superficial Comprada<br>' +
            '<div style="background-color: #66999B"></div>Agua Superficial<br>' +
            '<div style="background-color: #B3AF8F"></div>Agua Subterránea Comprada<br>' +
            '<div style="background-color: #FFC482"></div>Agua Subterránea Bajo la<br>Influencia del Agua Superficial<br>' 
            


            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'FiveMCL'){
            div.innerHTML =
            '<b>Infracciones del Sistema</b><br>'+
            '<div style="background-color: #CECFC7"></div>Sin Datos<br>' +
            '<div style="background-color: #B4DCE4"></div>Sin Violaciones<br>' +
            '<div style="background-color: #1f78b4"></div>1<br>' +
            '<div style="background-color: #F96900"></div>2-4<br>' +
            '<div style="background-color: #E3170A"></div>5 o Mas<br>' 
             
            


            return div;
            console.log('mapping mechanism code')



        }
//Coding for Spanish Legends 

        if(fieldtomap == 'SpanGovernanceCode'){
            div.innerHTML =
            '<b>Water System Governance Type</b><br>'+
            '<div style="background-color: #a6cee3"></div>City/Municpal<br>' +
            '<div style="background-color: #1f78b4"></div>County<br>' +
            '<div style="background-color: #b2df8a"></div>Mutual Water Company<br>'+
            '<div style="background-color: #33a02c"></div>Investor Owned Utility<br>' +
            '<div style="background-color: #fb9a99"></div>Special District<br>' +
            '<div style="background-color: #e31a1c"></div>Mobile Home<br>' +
            '<div style="background-color: #fdbf6f"></div>Irrigation District<br>'+
            '<div style="background-color: #ff7f00"></div>Other Private<br>'+
            '<div style="background-color: #cab2d6"></div>Unknown<br>'
            return div;
            
    
        }
        else if(fieldtomap == 'SpanMechanismCode'){
            div.innerHTML =
            '<b>How Is Leadership Chosen?/b>'+
            '<div style="background-color: #66c2a5"></div>Election<br>'+
            '<div style="background-color: #8da0cb"></div>Appointment<br>'+
            '<div style="background-color: #fc8d62"></div>No Data<br>'
            return div;
            



        }
        else if(fieldtomap == 'SpanPopulation'){
            div.innerHTML =
            '<b>Water System Population</b>'+
            '<div style="background-color: #412722"></div>0 - 35,000<br>'+
            '<div style="background-color: #8da0cb"></div>35,001 - 70,000<br>'+
            '<div style="background-color: #8da0cb"></div>70,001 - 115,000<br>'+
            '<div style="background-color: #8da0cb"></div>115,001 - 270,000<br>'+
            '<div style="background-color: #8da0cb"></div>270,001 - 476000 <br>'+
            '<div style="background-color: #8da0cb"></div>Over 476,000<br>'

            return div;
            



        }
        else if(fieldtomap == 'SpanService_Co'){
            div.innerHTML =
            '<b>Water System Service Connections</b>'+
            '<div style="background-color: #F0D6FF"></div>0 - 500<br>'+
            '<div style="background-color: #DCADFF"></div>501 - 3,300<br>'+
            '<div style="background-color: #A965E2"></div>3,301 - 10,000<br>'+
            '<div style="background-color: #8A37D2"></div>10,001 - 30,000<br>'+
            '<div style="background-color: #5C199F"></div>30,001 - 100,000 <br>'+
            '<div style="background-color: #34085E"></div>Over 100,000<br>'

            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'SpanWaterBill'){
            div.innerHTML =
            '<b>Average<br> Water Bill</b>'+
            '<div style="background-color: #8da0cb"></div>$0 - $38<br>'+
            '<div style="background-color: #8da0cb"></div>$38 -$57<br>'+
            '<div style="background-color: #8da0cb"></div>$57 - $72<br>'+
            '<div style="background-color: #8da0cb"></div>$72 - $90 <br>'+
            '<div style="background-color: #8da0cb"></div>Over $90<br>'+
            '<div style="background-color: #412722"></div>No Rate Data<br>'

            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'SpanHMW'){
            div.innerHTML =
            '<b>Minimum Wage Hours</b>'+
            '<div style="background-color: #a6cee3"></div>1 Hour<br>' +
            '<div style="background-color: #1f78b4"></div>2 Hours<br>' +
            '<div style="background-color: #b2df8a"></div>3 Hours<br>'+
            '<div style="background-color: #33a02c"></div>4 Hours<br>' +
            '<div style="background-color: #fb9a99"></div>5 Hours<br>' +
            '<div style="background-color: #e31a1c"></div>6 Hours<br>' +
            '<div style="background-color: #fdbf6f"></div>7 Hours<br>'+
            '<div style="background-color: #ff7f00"></div>8 Hours<br>'+
            '<div style="background-color: #ff7f00"></div>No Data<br>'


            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'SpanOperator Below Required'){
            div.innerHTML =
            '<b>Operator Below Required</b>'+
            '<div style="background-color: #a6cee3"></div>Yes<br>' +
            '<div style="background-color: #1f78b4"></div>No<br>' 
            


            return div;
            console.log('mapping mechanism code')



        }
        else if(fieldtomap == 'SpanNo operator'){
            div.innerHTML =
            '<b>Does my water system have an operator</b>'+
            '<div style="background-color: #a6cee3"></div>Yes<br>' +
            '<div style="background-color: #1f78b4"></div>No<br>' 
            


            return div;
            console.log('mapping mechanism code')



        }
        else {
            console.log('mapping other var')
            for (var i = 0; i < breaks.length; i++) {
                from = breaks[i];
                to = breaks[i + 1];
                if(to) {
                    labels.push(
                        '<i style="background:' + brew.getColorInRange(to) + '"></i> ' +
                        from.toFixed(0) + ' &ndash; ' + to.toFixed(0));
                    }
                }
                
                div.innerHTML =
              '<b>Data Legend <b>'
               
                return div;
            }; 
    
    
    
        }
    
        
        legend.addTo(map);
}

function createInfoPanel(){

    info_panel.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info_panel.update = function (properties) {
        // if feature is highlighted
        //English Info Panel Code here 
        if(properties){
            this._div.innerHTML =`<br><b> ${properties['name']}</b>`
            if(fieldtomap == 'GovCode'){
            this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados. 
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
            <br><b>Información de Gobernancia</b>
            <br>Para obtener más información sobre los tipos de gobernanza, lea la
            <br><a href="https://innovation.luskin.ucla.edu/" target="_blank"><div class="links">Guía de Rendimiento del Sistema de Agua del Condado de Los Ángeles</a></div>
            <br><b>Tipo de Gobierno:</b> ${properties['GovType']}
            <br><b>Órgano de Gobierno:</b> ${properties['GoverningB']}
            <br><b>Cómo se Elige el Liderazgo:</b> ${properties['New_Mechan']}
            <br><b>Compensación Promedio para el Liderazgo:</b> ${properties['AvgComp']}
            <br><b>Próximo Año Electoral:</b> ${properties['UpcomingEl']}
            <br>
            <br><b>Comparación de Población y Liderazgo</b>
            <table style="width:100%">
            <tr>
            <th>Población</th>
            <th>Liderazgo</th>
            </tr>
            <tr>
            <td><div id="apexchart"></td>
            <td><div id="Leader"></td>
            </tr>
            </table>
            <br>Para obtener más información sobre representación en el liderazgo del sistema de agua del condado de Los Ángeles lea el informe del Luskin Center for Innovation sobre<a href="https://innovation.luskin.ucla.edu/wp-content/uploads/2021/06/Urban-Drinking-Water-Governing-Bodies.pdf" target="_blank"><div class="links">Órganos Rectores de agua Potable Urbana</a></div>
    
            </div></p>
            
            ` 
            }    
        else if(fieldtomap == 'New_MechCo'){
            this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados.
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
            <br><b>Información de Gobernancia</b>
            <br>Para obtener más información sobre los tipos de gobernanza, lea la 
            <br><a href="https://innovation.luskin.ucla.edu/" target="_blank"><div class="links">Guía de Rendimiento del Sistema de Agua del Condado de Los Ángeles</a></div>
            <br><b>Tipo de Gobierno:</b> ${properties['GovType']}
            <br><b>Órgano de Gobierno:</b> ${properties['GoverningB']}
            <br><b>Cómo se Elige el Liderazgo:</b> ${properties['New_Mechan']}
            <br><b>Compensación Promedio para el Liderazgo:</b> ${properties['AvgComp']}
            <br><b>Próximo Año Electoral:</b> ${properties['UpcomingEl']}
            <br>
            <br><b>Comparación de Población y Liderazgo</b>
            <table style="width:100%">
            <tr>
            <th>Población</th>
            <th>Liderazgo</th>
            </tr>
            <tr>
            <td><div id="apexchart"></td>
            <td><div id="Leader"></td>
            </tr>
            </table>
            <br>Para obtener más información sobre representación en el liderazgo del sistema de agua del condado de Los Ángeles lea el informe del Luskin Center for Innovation sobre<a href="https://innovation.luskin.ucla.edu/wp-content/uploads/2021/06/Urban-Drinking-Water-Governing-Bodies.pdf" target="_blank"><div class="links">Órganos Rectores de agua Potable Urbana</a></div>
    
            </div></p>
            `}    
            else if(fieldtomap == 'Population'){
                this._div.innerHTML =`
                <p style="color:black;font-size:14px;line-height:1em;">
                <b>${properties['name']}</b>
                <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados.
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
            <br><b>Información de Gobernancia</b>
            <br>Para obtener más información sobre los tipos de gobernanza, lea la 
            <br><a href="https://innovation.luskin.ucla.edu/" target="_blank"><div class="links">Guía de Rendimiento del Sistema de Agua del Condado de Los Ángeles</a></div>
            <br><b>Tipo de Gobierno:</b> ${properties['GovType']}
            <br><b>Órgano de Gobierno:</b> ${properties['GoverningB']}
            <br><b>Cómo se Elige el Liderazgo:</b> ${properties['New_Mechan']}
            <br><b>Compensación Promedio para el Liderazgo:</b> ${properties['AvgComp']}
            <br><b>Próximo Año Electoral:</b> ${properties['UpcomingEl']}
            <br>
            <br><b>Comparación de Población y Liderazgo</b>
            <table style="width:100%">
            <tr>
            <th>Población</th>
            <th>Liderazgo</th>
            </tr>
            <tr>
            <td><div id="apexchart"></td>
            <td><div id="Leader"></td>
            </tr>
            </table>
            <br>Para obtener más información sobre representación en el liderazgo del sistema de agua del condado de Los Ángeles lea el informe del Luskin Center for Innovation sobre<a href="https://innovation.luskin.ucla.edu/wp-content/uploads/2021/06/Urban-Drinking-Water-Governing-Bodies.pdf" target="_blank"><div class="links">Órganos Rectores de agua Potable Urbana</a></div>
        
            </div></p>
            ` }    

       else if(fieldtomap == 'Service_Co'){
        this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados.
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
            <br><b>Información de Gobernancia</b>
            <br>Para obtener más información sobre los tipos de gobernanza, lea la 
            <br><a href="https://innovation.luskin.ucla.edu/" target="_blank"><div class="links">Guía de Rendimiento del Sistema de Agua del Condado de Los Ángeles</a></div>
            <br><b>Tipo de Gobierno:</b> ${properties['GovType']}
            <br><b>Órgano de Gobierno:</b> ${properties['GoverningB']}
            <br><b>Cómo se Elige el Liderazgo:</b> ${properties['New_Mechan']}
            <br><b>Compensación Promedio para el Liderazgo:</b> ${properties['AvgComp']}
            <br><b>Próximo Año Electoral:</b> ${properties['UpcomingEl']}
            <br>
            <br><b>Comparación de Población y Liderazgo</b>
            <table style="width:100%">
            <tr>
            <th>Población</th>
            <th>Liderazgo</th>
            </tr>
            <tr>
            <td><div id="apexchart"></td>
            <td><div id="Leader"></td>
            </tr>
            </table>
            <br>Para obtener más información sobre representación en el liderazgo del sistema de agua del condado de Los Ángeles lea el informe del Luskin Center for Innovation sobre<a href="https://innovation.luskin.ucla.edu/wp-content/uploads/2021/06/Urban-Drinking-Water-Governing-Bodies.pdf" target="_blank"><div class="links">Órganos Rectores de agua Potable Urbana</a></div>
    
            </div></p> 
            ` }    
        else if(fieldtomap == 'WaterBill'){
            this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados. 
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
                <br><b>Información de la Factura de Agua</b>
                <br>
                <br><b>Factura Media de Agua:</b> ${properties['Bill_Panel']}
                <br>
                <br>Mi factura de agua es <b>${properties['OverUnder']}% ${properties['OU']}</b> la factura promedio
                <br> en el condado de Los Ángeles.
                <br>
                <br>Se necesitan <b>${properties['HMW']} horas de salario mínimo</b>
                <br> para pagar mi factura de agua.
                </p> 
 `}     
        else if(fieldtomap == 'HMW'){
            this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados. 
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
                <br><b>Información de la Factura de Agua</b>
                <br>
                <br><b>Factura Media de Agua:</b> ${properties['Bill_Panel']}
                <br>
                <br>Mi factura de agua es <b>${properties['OverUnder']}% ${properties['OU']}</b> la factura promedio
                <br> en el condado de Los Ángeles.
                <br>
                <br>Se necesitan <b>${properties['HMW']} horas de salario mínimo</b>
                <br> para pagar mi factura de agua.
                </p> 
                 `}  
        else if(fieldtomap == 'RiskCode'){
            this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados. 
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
                <br><b>Rendimiento del Sistema</b>
                <br>
                <br><b>Fuente Primaria de Agua:</b> ${properties['PWS']}
                <br>
                <br><b>Nivel de Operador de Sistema Requerido:</b> ${properties['ReqOp']}
                <br><b>Nivel Actual de Operador del Sistema:</b> ${properties['HighestOp']}
                <br>Este sistema tuvo <b> ${properties['FiveMCL']} violaciones de salud</b> de 2014-2018.
                <br>
                <br><b>Calificación de Riesgo:</b> ${properties['RiskScore']}
                <br><a href="https://innovation.luskin.ucla.edu/wp-content/uploads/2021/07/LA-County-Small-Water-System-Risk-Assessment.pdf" target="_blank"><div class="links">Lea la Evaluación de Riesgos del Condado de Los Ángeles aquí. </a></div>  
                </p>`}  
        else if(fieldtomap == 'FiveMCL'){
            this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados. 
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
                <br><b>Rendimiento del Sistema</b>
                <br>
                <br><b>Fuente Primaria de Agua:</b> ${properties['PWS']}
                <br>
                <br><b>Nivel de Operador de Sistema Requerido:</b> ${properties['ReqOp']}
                <br><b>Nivel Actual de Operador del Sistema:</b> ${properties['HighestOp']}
                <br>Este sistema tuvo <b> ${properties['FiveMCL']} violaciones de salud</b> de 2014-2018.
                <br>
                <br><b>Calificación de Riesgo:</b> ${properties['RiskScore']}
                <br><a href="https://innovation.luskin.ucla.edu/wp-content/uploads/2021/07/LA-County-Small-Water-System-Risk-Assessment.pdf" target="_blank"><div class="links">Lea la Evaluación de Riesgos del Condado de Los Ángeles aquí. </a></div>  
                </p>`}    
        else if(fieldtomap == 'OperatorBe'){
            this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados. 
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
                <br><b>Rendimiento del Sistema</b>
                <br>
                <br><b>Fuente Primaria de Agua:</b> ${properties['PWS']}
                <br>
                <br><b>Nivel de Operador de Sistema Requerido:</b> ${properties['ReqOp']}
                <br><b>Nivel Actual de Operador del Sistema:</b> ${properties['HighestOp']}
                <br>Este sistema tuvo <b> ${properties['FiveMCL']} violaciones de salud</b> de 2014-2018.
                <br>
                <br><b>Calificación de Riesgo:</b> ${properties['RiskScore']}
                <br><a href="https://innovation.luskin.ucla.edu/wp-content/uploads/2021/07/LA-County-Small-Water-System-Risk-Assessment.pdf" target="_blank"><div class="links">Lea la Evaluación de Riesgos del Condado de Los Ángeles aquí. </a></div>  
                </p>`}  
        else if(fieldtomap == 'PWS_Code'){
            this._div.innerHTML =`
            <p style="color:black;font-size:14px;line-height:1em;">
            <b>${properties['name']}</b>
            <br><a href="${properties['URL']}"target="_blank"><div class="links">Sitio del Sistema de Agua</a></div>
            <br>Los sistemas de agua deben publicar informes de confianza del consumidor que informen sobre las fuentes de agua y los resultados de la calidad del agua para los contaminantes regulados. 
            <br><a href="${properties['CCR']}"target"_blank"><div class="links">Informe de Confianza del Consumidor</a></div>
            <br><b>Conexiones de Servicio:</b> ${properties['connections_Connections']}
            <br><b>Población del Sistema:</b> ${properties['TableData_']}
            <br><b>Ingreso Familiar Medio:</b> ${properties['Median']}
            <br>
                <br><b>Rendimiento del Sistema</b>
                <br>
                <br><b>Fuente Primaria de Agua:</b> ${properties['PWS']}
                <br>
                <br><b>Nivel de Operador de Sistema Requerido:</b> ${properties['ReqOp']}
                <br><b>Nivel Actual de Operador del Sistema:</b> ${properties['HighestOp']}
                <br>Este sistema tuvo <b> ${properties['FiveMCL']} violaciones de salud</b> de 2014-2018.
                <br>
                <br><b>Calificación de Riesgo:</b> ${properties['RiskScore']}
                <br><a href="https://innovation.luskin.ucla.edu/wp-content/uploads/2021/07/LA-County-Small-Water-System-Risk-Assessment.pdf" target="_blank"><div class="links">Lea la Evaluación de Riesgos del Condado de Los Ángeles aquí. </a></div>  
                </p>`}  
//Spanish Info Box Code Here 
                                            if(fieldtomap == 'SpanGovernanceCode'){
                                                this._div.innerHTML =`<br><b>Governance Information</b>
                                                <div><b>${properties['Name']}</b>
                                                <br>Link to Water System Website if able
                                                <br><b>Governance Type:</b> ${properties['GovernanceType']}
                                                <br><b>How is Leadership Chosen?:</b> ${properties['Mechanism']}
                                                <br><b>Next Election Year:</b> ${properties['UpcomingElectionYear']}
                                                <br>Table with appointed members and compensation
                                                <br>Participation Info here? 
                                                <br><b>Service Connections</b> ${properties['Service_Co']}
                                                <br><b>System Population:</b> ${properties['Population']}
                                                <br> Insert Population Chart here?
                                                <br`}    
                                            else if(fieldtomap == 'SpanMechanismCode'){
                                                this._div.innerHTML = `<br><b>Governance Information</b>
                                                <div><b>${properties['Name']}</b>
                                                <br>Link to Water System Website if able
                                                <br><b>Governance Type:</b> ${properties['GovernanceType']}
                                                <br><b>How is Leadership Chosen?:</b> ${properties['Mechanism']}
                                                <br><b>Next Election Year:</b> ${properties['UpcomingElectionYear']}
                                                <br>Table with appointed members and compensation
                                                <br>Participation Info here? 
                                                <br><b>Service Connections</b> ${properties['Service_Co']}
                                                <br><b>System Population:</b> ${properties['Population']}
                                                <br> Insert Population Chart here?
                                                <br`}    
                                                else if(fieldtomap == 'SpanPopulation'){
                                                    this._div.innerHTML = `<br><b>Governance Information</b>
                                                    <div><b>${properties['Name']}</b>
                                                    <br>Link to Water System Website if able
                                                    <br><b>Governance Type:</b> ${properties['GovernanceType']}
                                                    <br><b>How is Leadership Chosen?:</b> ${properties['Mechanism']}
                                                    <br><b>Next Election Year:</b> ${properties['UpcomingElectionYear']}
                                                    <br>Table with appointed members and compensation
                                                    <br>Participation Info here? 
                                                    <br><b>Service Connections</b> ${properties['Service_Co']}
                                                    <br><b>System Population:</b> ${properties['Population']}
                                                    <br> Insert Population Chart here?
                                                    <br`}    
                                    
                                           else if(fieldtomap == 'SpanService_Co'){
                                                    this._div.innerHTML = `<br><b>Governance Information</b>
                                                                            <div><b>${properties['Name']}</b>
                                                                            <br>Link to Water System Website if able
                                                                            <br><b>Governance Type:</b> ${properties['GovernanceType']}
                                                                            <br><b>How is Leadership Chosen?:</b> ${properties['Mechanism']}
                                                                            <br><b>Next Election Year:</b> ${properties['UpcomingElectionYear']}
                                                                            <br>Table with appointed members and compensation
                                                                            <br>Participation Info here? 
                                                                            <br><b>Service Connections</b> ${properties['Service_Co']}
                                                                            <br><b>System Population:</b> ${properties['Population']}
                                                                            <br> Insert Population Chart here?
                                                                            <br`}    
                                            else if(fieldtomap == 'SpanWaterBill'){
                                                    this._div.innerHTML = `<b>Water Bill Information</b>
                                                                        <br>Couple sentences about how we calculate average water bill and what that means. 
                                                                        <div><b>${properties['Name']}</b>
                                                                        <br><b>Average Water Bill:</b> $${properties['WaterBill']}
                                                                        <br>My water bill is <b>${properties['AbsFromAvg']}% ${properties['OU']}</b> than average bill in LA County
                                                                        <br>It takes working <b>${properties['HMW']} hours at minimum wage</b> to pay my water bill.
                                                                         <br`}     
                                            else if(fieldtomap == 'SpanHMW'){
                                                     this._div.innerHTML =`<b>Water Bill Information</b>
                                                                            <br>Couple sentences about how we calculate average water bill and what that means. 
                                                                            <div><b>${properties['Name']}</b>
                                                                            <br><b>Average Water Bill:</b> $${properties['WaterBill']}
                                                                            <br>My water bill is <b>${properties['AbsFromAvg']}% ${properties['OU']}</b> than average bill in LA County
                                                                            <br>It takes working <b>${properties['HMW']} hours at minimum wage</b> to pay my water bill.
                                                                            <br`}  
                                            else if(fieldtomap == 'SpanOperator Below Required'){
                                                    this._div.innerHTML =`<b>System Performance</b>
                                                                                <br>Describe system performance here
                                                                                <div><b>${properties['Name']}</b>
                                                                                <br>link to CCR report? 
                                                                                <br>Required System Operator Level 
                                                                                <br>Does my system have an operator?
                                                                                <br>Does my system have the required operator level? 
                                                                                <br>DO we want to add NA or LA NA Risk scores here?
                                                                                <br>Perhaps adding an MCL variable to the map (button and here)
                                                                                <br`}  
                                            else if(fieldtomap == 'SpanNo Operator'){
                                                    this._div.innerHTML =`<b>System Performance</b>
                                                                                <br>Describe system performance here
                                                                                <div><b>${properties['Name']}</b>
                                                                                <br>link to CCR report? 
                                                                                <br>Required System Operator Level 
                                                                                <br>Does my system have an operator?
                                                                                <br>Does my system have the required operator level? 
                                                                                <br>DO we want to add NA or LA NA Risk scores here?
                                                                                <br>Perhaps adding an MCL variable to the map (button and here)
                                                                                <br`}                                             
    }
        else if(properties){
            this._div.innerHTML = `
                                    <div><b>${properties['Name']}</b>
                                    <br><b>Service Connections</b> ${properties['Service_Co']}
                                    <br><b>System Population:</b> ${properties['Population']}
                                    <br> Insert Population Chart here?
                                    <p class = "info-value">Test</p>
                                    <div id=apexchart style= "width:400px;height:400px"></div>
                                    <br><b>Governance Information</b>
                                    <br><b>Governance Type:</b> ${properties['GovernanceType']}
                                    <br><b>How is Leadership Chosen?:</b> ${properties['Mechanism']}
                                    <br><b>Next Election Year:</b> ${properties['UpcomingElectionYear']}
                                    <br><b>Water Bill</b>
                                    <br><b>Average Water Bill:</b> $${properties['WaterBill']}
                                    <br>My water bill is <b>${properties['AbsFromAvg']}% ${properties['OU']}</b> than average bill in LA County
                                    <br>It takes working <b>${properties['HMW']} hours at minimum wage</b> to pay my water bill.
                                    
                                    `
                                    ;}

       
        // if feature is not highlighted
        else
        {
            this._div.innerHTML = 'Haga clic en una Sistema de Agua<br>'
                                   
        }
    };

    info_panel.addTo(map);

}

// Function that defines what will happen on user interactions with each feature
function onEachFeature(feature, layer) {
    layer.on({
        //mouseover: highlightFeature,
        //mouseout: resetHighlight,
        click: highlightFeature, 
    });
}

// on mouse over, highlight the feature
function highlightFeature(e) {
    //resetHighlight(e)
    geojson_layer.resetStyle()
  
    var layer = e.target;

    // style to use on mouse over
    layer.setStyle({
        weight: 2,
        color: '#666',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info_panel.update(layer.feature.properties);
    createDashboard(layer.feature.properties);
    createNewDashboard(layer.feature.properties);
    
   
}

// on mouse out, reset the style, otherwise, it will remain highlighted
function resetHighlight(e) {
    geojson_layer.resetStyle(e.target);
    info_panel.update() // resets infopanel
}

// on mouse click on a feature, zoom in to it
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    info_panel.update(layer.feature.properties);
};
//function createDashboard(properties){

	// clear dashboard
	//$('.dashboard').empty();

	//console.log(properties)

// var options = {
//     chart: {
//       type: 'line'
//     },
//     series: [{
//       name: 'sales',
//       data: [30,40,35,50,49,60,70,91,125]
//     }],
//     xaxis: {
//       categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
//     }
//   }
  
//   var chart = new ApexCharts(document.querySelector("#chart"), options);
//   chart.render()
// //}
function createDashboard(properties){

	// clear dashboard
	$('.dashboard').empty();

	console.log(properties)

    // var options = {
    //     series: [
    //                    properties['Hispanic'],
    //                    properties['White'],
    //                    properties['Black'],
    //                    properties['Asian'],
    //                    properties['AIAN'],
    //                    properties['NHOPI'],
    //                    properties['Other'],
                       
    //            ],
    //     chart: {
    //     height: 250,
    //     type: 'radialBar',
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       offsetY: 0,
    //       offsetX: 50,
    //       startAngle: 0,
    //       endAngle: 270,
    //       hollow: {
    //         margin: 5,
    //         size: '30%',
    //         background: 'transparent',
    //         image: undefined,
    //       },
    //       dataLabels: {
    //         name: {
    //           show: false,
    //         },
    //         value: {
    //           show: false,
    //         }
    //       }
    //     }
    //   },
    //   colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#39539E','#0077B5','#0077B5'],
    //   labels: ['Hispanic', 'White', 'Black', 'Asian','American Indian','Native Hawaiin or<br>Pacific Islander','Other',],
    //   legend: {
    //     show: true,
        
    //     floating: true,
    //     fontSize: '10px',
    //     position: 'left',
    //     offsetX: 1,
    //     offsetY: 1,
    //     labels: {
    //       useSeriesColors: true,
    //     },
    //     markers: {
    //       size: 0
    //     },
    //     formatter: function(seriesName, opts) {
    //       return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
    //     },
    //     itemMargin: {
    //       vertical: 0,
    //       position: 'left', 
    //     }
    //   },
    //   responsive: [{
    //     breakpoint: 480,
    //     options: {
    //       legend: {
    //           show: true
    //       }
    //     }
    //   }]
    //   };

    //   var chart = new ApexCharts(document.querySelector("#apexradial"), options);
    //   chart.render();
    
    

    
   // chart title
   let title = 'Racial Demographics ' + properties['Name'];
   // data values
   let data = [
           properties['Hispanic'],
           properties['White'],
           properties['Black'],
           properties['Asian'],
           properties['AIAN'],
           properties['NHOPI'],
           properties['Other'],
           properties['TwoOrMore'],
   ]
   // data fields
   let fields = [
       'Hispano',
       'Blanco',
       'Negro',
       'Asiático',
       'Indigena Americana y Nativa de Alaska',
       'Nativo de Hawái y Otras Islas del Pacífico',
       'Otra Raza',
       'Dos o Mas Razas',
   ]
console.log(data)


   var options2= {
       chart: {
           type: 'pie',
           plotOptions: {
                radialBar: {
                  offsetY: 75,
                  offsetX: 50,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 0,
                    size: '20%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    }
                  }
                }
              },
           height: 150,
           width: '60%',  
           animations: {
               enabled: true,
           }, 
       },
       title: {},
       colors: ['#003452', '#005687', '#4E8FB4', '#9CC8E0', '#DD7F03','#FCA636','#FDBB63','#FFE985'],
       series: data,
       stroke: {
        width: 0,
        color: '#808080'
        },
       labels: fields,
       legend: {
        show: false,
        floating: true,
        fontSize: '10px',
        position: 'left',
        offsetX: 50,
        offsetY: 50,
        labels: {
          useSeriesColors: true,
          position: 'center',
        },
        markers: {
          size: 0
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
        itemMargin: {
          vertical: 0,
          position: 'center', 
        }
      },
   };

   var chart = new ApexCharts(document.querySelector("#apexchart"), options2)
   chart.render()
}

function createNewDashboard(properties){

	// clear dashboard
	$('.Newdashboard').empty();

	console.log(properties)

// chart title
let title = 'Leadership Demographics ' + properties['Name'];
// data values
let data = [
        properties['L_Hispanic'],
        properties['L_White'],
        properties['L_Black'],
        properties['L_Asian'],
        properties['L_TwoOrMor'],
]
// data fields
let fields = [
    'Hispano',
    'Blanco',
    'Negro',
    'Asiático',
    'Dos o Mas Razas',
]
console.log(data)


var options2= {
    chart: {
        type: 'pie',
        plotOptions: {
             radialBar: {
               offsetY: 100,
               offsetX: 50,
               startAngle: 0,
               endAngle: 270,
               hollow: {
                 margin: 0,
                 size: '30%',
                 background: 'transparent',
                 image: undefined,
               },
               dataLabels: {
                 name: {
                   show: false,
                 },
                 value: {
                   show: false,
                 }
               }
             }
           },
        height: 150,
        width: '60%',  
        animations: {
            enabled: true,
        }, 
    },
    title: {},
    colors: ['#003452', '#005687', '#4E8FB4', '#9CC8E0','#FFE985'],
    series: data,
    stroke: {
     width: 0,
     color: '#808080'
     },
    labels: fields,
    legend: {
     show: false,
     floating: true,
     fontSize: '10px',
     position: 'left',
     offsetX: 50,
     offsetY: 50,
     labels: {
       useSeriesColors: true,
       position: 'center',
     },
     markers: {
       size: 0
     },
     formatter: function(seriesName, opts) {
       return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
     },
     itemMargin: {
       vertical: 0,
       position: 'center', 
     }
   },
};

var chart = new ApexCharts(document.querySelector("#Leader"), options2)
chart.render()
}
  
function zoomTo(geoid){

	let zoom2poly = geojson_layer.getLayers().filter(item => item.feature.properties.GEO_ID === geoid)

	map.fitBounds(zoom2poly[0].getBounds())
}

// function createTable(){


// 	// empty array for our data
//     let datafortable = [];

//     // loop through the data and add the properties object to the array
//     geojson_data.features.forEach(function(item){
//         datafortable.push(item.properties)
//     })

//     console.log(datafortable)
// 	// array to define the fields: each object is a column
// 	let fields = [
// 		{ name: "Name", type: "text", width: "200px"},
// 		{ name: 'pwsid', type: 'number', width: "200px"},
// 		{ name: 'Population', type: 'text', width: "200px"},
//         { name: 'Service Connections', type: 'text', width: "200px"},
// 		{ name: 'RiskCode', type: 'number', width: "200px"},
//         { name: 'Water Source', type: 'number', width: "200px"},
//         { name: 'Average Bill', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},
//         { name: 'RiskCode_RiskCode', type: 'number', width: "200px"},

        
// 	]

// 	// create the table in our footer
// 	$(".footertable").jsGrid({
// 		width: "98%",
// 		height: "500px",
        
// 		editing: true,
// 		sorting: true,
// 		paging: true,
// 		autoload: true,
 
// 		pageSize: 250,
// 		pageButtonCount: 5,
//         // search with current grid filter
     
 
// 		data: datafortable,
// 		fields: fields,
// 		rowClick: function(args) { 
//             console.log(args)
//             zoomTo(args.item.Name)
//         },
//         });
//         }
function zoomTo(Name){

let zoom2poly = geojson_layer.getLayers().filter(item => item.feature.properties.Name === Name)

map.fitBounds(zoom2poly[0].getBounds())

}



// create buttons function
function myPopFunction(){
    mapGeoJSON('Population',5,'YlOrRd','quantiles');}
function myServeFunction(){
    mapGeoJSON('Service_Co',5,'Dark2','quantiles');}

function myGovTypeFunction(){
    mapGeoJSON('GovCode',7,'Paired','jenks');}

function myGovTypeFunctionSpanish(){
        mapGeoJSON('SpanGovernanceCode',7,'Paired','jenks');}

function myMechTypeFunction(){
    mapGeoJSON('New_MechCo',3,'Accent','equal interval');}

function myMechTypeFunctionSpanish(){
      mapGeoJSON('SpanMechanismCode',3,'Accent','equal interval');}

function myBillFunction(){
    mapGeoJSON('WaterBill',5,'YlOrRd','quantiles');}

function MinWageFunction(){
        mapGeoJSON('HMW',5,'YlOrRd','natural breaks');}
    
function myOpBelowFunction(){
    mapGeoJSON('OperatorBe',4,'Accent','natural breaks');}

function myNoOpFunction(){
    mapGeoJSON('PWS_Code',7,'Accent','natural breaks');}

function RiskFunction(){
        mapGeoJSON('RiskCode',5,'Accent','natural breaks');}

function SpanRiskFunction(){
            mapGeoJSON('OperatorBe',5,'Accent','natural breaks');}
function MCLFunction(){
                mapGeoJSON('FiveMCL',5,'Accent','natural breaks');}
function SpanMCLFunction(){
                    mapGeoJSON('NewSpanMerge_FiveMCL',5,'Accent','natural breaks');}

function on() {
        document.getElementById("overlay").style.display = "block";
                      }
                      
function off() {
            document.getElementById("overlay").style.display = "none";
                      }
function IntroOn() {
            document.getElementById("Introoverlay").style.display = "block";
                                      }
                                      
function IntroOff() {
            document.getElementById("Introoverlay").style.display = "none";
                                      }
function TutorialOn() {
            document.getElementById("Tutorialoverlay").style.display = "block";
                                                                  }
                                                                  
function TutorialOff() {
            document.getElementById("Tutorialoverlay").style.display = "none";
                                                                  }               

