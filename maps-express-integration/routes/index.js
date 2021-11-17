const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// GET => render the form to create a new restaurant
router.get('/new', (req, res, next) => res.render('restaurants/new'))

// POST => to create new restaurant and save it to the DB
router.post('/', (req, res, next) => {
	//3. Instrucciones: Hemos convertido la info del formulario a un objeto 
	//		que cuadre con nuestro modelo
	let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
	}

	Restaurant.create({
		name: req.body.name,
		description: req.body.description,
		location: location
	})
		.then(() => res.redirect("/restaurants"))
		.catch(err => next(error))

});

// GET => to retrieve all the restaurants from the DB
router.get('/', (req, res, next) => {
	Restaurant.find()
		.then(restaurantsFromDB => res.render('restaurants/index', { restaurants: restaurantsFromDB }))
		.catch(err => next(err))
})

// GET => get the form pre-filled with the details of one restaurant
router.get('/:restaurant_id/edit', (req, res, next) => {
	Restaurant.findById(req.params.restaurant_id)
		.then(restaurant => res.render('restaurants/update', { restaurant }))
		.catch(err => next(error))
})

// POST => save updates in the database
router.post('/:restaurant_id', (req, res, next) => {
	const { name, description } = req.body

	Restaurant.findByIdAndUpdate(req.params.restaurant_id, { name, description })
		.then(restaurant => res.redirect(`/restaurants/${req.params.restaurant_id}`))
		.catch(err => next(err))
});

// DELETE => remove the restaurant from the DB
router.get('/:restaurant_id/delete', (req, res, next) => {
	Restaurant.findByIdAndRemove(req.params.restaurant_id)
		.then(() => res.redirect('/restaurants'))
		.catch(err => next(err))
});


// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/api', (req, res, next) => {
	Restaurant.find()
		.then(allRestaurants => {
			res.status(200).json({ restaurants: allRestaurants });
		})
		.catch(err => console.log(err))
});

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get('/api/:id', (req, res, next) => {
	let restaurantId = req.params.id;
	Restaurant.findById(restaurantId)
		.then(oneRestaurantFromDB => res.status(200).json({ restaurant: oneRestaurantFromDB }))
		.catch(err => next(err))
})

// GET => get the details of one restaurant
router.get('/:restaurant_id', (req, res, next) => {
	Restaurant.findById(req.params.restaurant_id)
		.then(restaurant => res.render('restaurants/show', { restaurant: restaurant }))
		.catch(err => next(err))
});

module.exports = router;
