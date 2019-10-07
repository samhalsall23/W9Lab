var Actor = require('../models/Actor');
var Movie = require('../models/Movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    // Q1 Delete Movie By ID
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    // Q4 Remove an actor from the list of actors in a movi
    deleteActFromMovie : function (req, res){
        let actorIdToRemove = req.params.actid;
        let movieIdToRemove = req.params.movid;
        
        Movie.findOne({ _id: movieIdToRemove }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: actorIdToRemove }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.pull(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    // Q5 Add an existing actor to the list of actors in a movie
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.movid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    // Q6 Retrieve (GET) all the movies produced between year1 and year2, where year1>year2.
    getBetween: function (req, res){
        let y2 = parseInt(req.params.y2);
        let y1 = parseInt(req.params.y1);
        Movie.find({ year: {$lte: y1, $gte: y2}}, function (err, movies) {
            if (err) return res.status(400).json(err);
            else res.json(movies);
        });
    },
    //Q8 New Get All Movies Method
    getAllNew: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(movies);
            }
        });
    },

    // WEEK 9 LAB
    // Task 3: Delete Between 2 Years
    deleteBefore:function (req,res){    
        let y = parseInt(req.params.y);
        Movie.deleteMany({year:{$lt:y}}).exec(function(err,movies){
            if (err) return res.status(400).json(err);
            else res.json(movies);
        });
    },
    // Task 4: Add Actor to Movie
    addActorW9: function(req, res){
        Movie.findOne({ title : req.params.movieTitle }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            // console.log(movie);
            
            Actor.findOne({ name : req.body.name }, function (err, actor) {
                // console.log(actor);
                
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

}