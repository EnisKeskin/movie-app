const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

router.get('/', (req, res, next) => {
    const promise = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        },
        {
            $unwind: '$director'
        }
    ])
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
})

router.post('/', (req, res, next) => {
    const movie = new Movie(req.body);
    const promise = movie.save();

    promise.then((data) => {
        res.json({ status: 1 });
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/top10', (req, res, next) => {
    const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 })

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:movieId', (req, res, next) => {
    const promise = Movie.findById(req.params.movieId);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/:movieId', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(req.params.movieId, req.body);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
})

router.delete('/:movieId', (req, res, next) => {
    const promise = Movie.findByIdAndDelete(req.params.movieId);
    promise.then((data) => {
        res.json({ status: 1 });
    }).catch((err) => {
        res.json(err);
    });
})

router.get('/between/:start_year/:end_year', (req, res, next) => {
    const { start_year, end_year } = req.params
    const promise = Movie.find({
        year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;