const express = require('express')
const router = express.Router({mergeParams: true})
const {validateReview, areLoggedIn, isAuthor} = require('../middleware')
const Campground = require('../models/campground')
const Review = require('../models/review')
const reviews = require('../controllers/reviews')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

router.post('/', areLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', areLoggedIn, isAuthor, catchAsync(reviews.deleteReview))

module.exports = router