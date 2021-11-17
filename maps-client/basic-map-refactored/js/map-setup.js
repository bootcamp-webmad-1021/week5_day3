function initMap() {

    const map = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 16,
            center: directions.ironhackBCN.coords,
            styles: mapStyles.electric
        }

    )

    // Argumentos: callback de éxito, callback de fracaso
    navigator.geolocation.getCurrentPosition(
        positionObj => centerMap(positionObj, map),
        error => console.log('FRACASO! Esto es lo que ha pasado', error)
    )
}


function centerMap(positionObj, map) {
    const position = { lat: positionObj.coords.latitude, lng: positionObj.coords.longitude }
    map.setCenter(position)
    new google.maps.Marker({ position, map })
}

