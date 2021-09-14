const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define review schema
const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})


//export schema for use in rest of program
module.exports = mongoose.model('Review', reviewSchema);