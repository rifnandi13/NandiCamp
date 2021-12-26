const express = require('express')
const router = express.Router()
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync')
const { areLoggedIn, isOwner, validateCampground } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

const Campground = require('../models/campground')
const { path } = require('express/lib/application')

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(areLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', areLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(areLoggedIn, isOwner, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(areLoggedIn, isOwner, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', areLoggedIn, isOwner, catchAsync(campgrounds.renderEditForm))



module.exports = router
