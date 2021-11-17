function startMap() {
  const ironhackBCN = {
    lat: 41.3977381,
    lng: 2.190471916
  };
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 13,
      center: ironhackBCN
    }
  );

  const origin = { lat: 41.3977381, lng: 2.190471916 }
  const destination = "Paseo de la Chopera, 14, Madrid"
  calcRoute(map, origin, destination)

}

function calcRoute(map, origin, destination) {
  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer;

  const directionRequest = {
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING'
  };

  directionsService.route(
    directionRequest,
    (routeDetails, status) => {
      if (status === 'OK') {
        // everything is ok
        console.log("Los detalles de la ruta: ", routeDetails.routes[0].legs[0])
        directionsDisplay.setDirections(routeDetails);

        directionsDisplay.setMap(map);


      } else {
        // something went wrong
        window.alert('Directions request failed due to ' + status);
      }
    }
  )
}