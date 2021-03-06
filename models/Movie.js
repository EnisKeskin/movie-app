const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieShema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunldur'],
        maxlength: [50, '`{PATH}` alanı (`{VALUE}`), ({Maxlength}) büyük olmalıdır '],
        minlength: 1,
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('movie', MovieShema);