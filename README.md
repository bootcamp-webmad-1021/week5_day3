## Google Maps

### Preparación

Para renderizar un mapa de google maps en el html hemos de:
  - Incluir un div en el html con un id para poder seleccionarlo desde el js.
  - Darle un width y un height para poder visualizarlo.
  - Incluir el script de google maps en el html. 

```js
  //Sustituir la api por la vuestra y el function callback por el nombre de la función que arranque el mapa
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR-API-KEY&callback=FUNCTION_CALLBACK"></script>
```

### Renderizado

Para pintar el mapa llamamos a `new google.maps.Map(nodoHtml, {opciones})` pasándole como primer argumento el *div* dónde se renderizará el mapa y segundo argumento un objecto con *zoom* y *center*. Lo ideal es guardar esta instancia en una variable para poder operar con el mapa más tarde.

## Markers

Para poner pines en el mapa llamaremos a `new google.maps.Marker({ position, map })`. Este método recibe como argumentos una posición con propiedades *lat* y *lng* y el mapa dónde se renderizará el marcador.

Igual que en el caso anterior si queremos operar más tarde con los markers deberíamos guardarlos en un array.

## Routes

Las rutas se componen de dos partes:
  - DirectionsService, que nos devuelve la info de la ruta.
  - DirectionsRenderer, que traza la ruta en el mapa.

### Directions Service

Primero instanciamos el servicio.
  ```js 
    const directionsService = new google.maps.DirectionsService
  ```
Después llamamos al método route pasandole un objeto con origin, destination y travelMode. Cómo segundo argumento recibe una función callback que se ejecuta cuando el servicio responde. 

  ```js
    directionsService.route(routeDetails, (routeDetails, status) => {
      console.log(routeDetails)
    })
  ```

### Directions Renderer

Instanciamos el servicio.
  ```js     
    const directionsDisplay = new google.maps.DirectionsRenderer
  ```
Después configuramos las direcciones e indicamos en que mapa han de dibujarse.

  ```js
    directionsDisplay.setDirections(routeDetails)
    directionsDisplay.setMap(map)
  ```

## GEOJSON

### Modelo

La estructura GEOJSON requiere de un campo location con una propiedad type y un array de coordenadas. Se puede incluir en el modelo como:

```js
  location: {
      type: {
        type: String
      },
      coordinates: [Number]
    }
```

También hemos de señalar en el esquema que se trata de un geojson.

`someSchema.index({ location: '2dsphere' });`

### Pintar marcadores que llegan desde el servidor.

Una vez tengamos el mapa renderizado podemos llamar al backend a través de ajax/axios. Tendremos que tener preparado un endpoint que devuelva un json (res.json) con los documentos que queramos representar en el mapa.

