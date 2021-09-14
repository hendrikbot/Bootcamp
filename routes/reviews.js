const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync'); //requires async error handling code
const ExpressError = require('../utils/ExpressError'); //require express error class

const Campground = require('../models/campground') // require the file where Schema and model is
const Review = require('../models/review'); //require the review model
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//to be able to delete a review - need review ID and the campground ID it is associated with 
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;