function initMap() {

  const map = new google.maps.Map(
    document.querySelector('#myMap'),
    { zoom: 8, center: { lat: 41.3977381, lng: 2.190471916 }, styles: mapStyles.aubergine }
  )

  getRouteDetails(map)
}




function getRouteDetails(map) {

  const routeDetails = {
    origin: { lat: 41.3977381, lng: 2.190471916 },
    destination: 'Fabrik Madrid',
    travelMode: 'DRIVING'
  }

  const directionsService = new google.maps.DirectionsService

  directionsService.route(routeDetails, (details, status) => {
    printRouteInfo(details)
    drawRoute(details, map)
  })
}



function printRouteInfo(details) {

  // const steps = details.routes[0].legs[0].steps
  // const duration = details.routes[0].legs[0].duration

  const { steps, duration } = details.routes[0].legs[0]

  let stepsCode = ''
  steps.forEach(elm => stepsCode += `<li>${elm.instructions}</li>`)

  document.querySelector('#steps ul').innerHTML = stepsCode
  document.querySelector('#steps h5').innerHTML = `Duración total: ${duration.text}`
}


function drawRoute(details, map) {
  const directionsDisplay = new google.maps.DirectionsRenderer
  directionsDisplay.setDirections(details)
  directionsDisplay.setMap(map)
}