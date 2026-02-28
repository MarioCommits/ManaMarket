const Movie = require('../models/movie.model');
const movieCtrl = {};

//Funciones CRUD

// Obtener todas las películas
movieCtrl.getMovies = async (req, res) => {
    const movies = await Movie.find()
        .then((data)=>res.status(200).json({status:data}))
        .catch((err)=>res.status(400).json({status:err}));
};

// Obtener una película por ID
movieCtrl.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id)
        .then(data=>
        {
            if(data!=null) res.status(200).json({status:data});
            else res.status(404).json({status:'Movie not found'})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

// Agregar una película nueva
movieCtrl.addMovie = async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save()
        .then((data)=> res.status(201).json({status:'Movie Successully Inserted'}))
        .catch((err)=>res.status(400).json({status:err}));
};

// Actualizar una película
movieCtrl.updateMovie = async (req, res) => {
    const movie = req.body;
    await Movie.findByIdAndUpdate(
        req.params.id,
        {$set: movie},
        {new: true})
        .then((data)=> {
            if(data)res.status(200).json({status:'Movie Successully Updated'});
            else res.status(404).json({status:'Movie not found'})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

// Eliminar una película
movieCtrl.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
        .then((data)=> {
            if(data)res.status(200).json({status:'Movie Successully Deleted'});
            else res.status(404).json({status:'Movie not found'})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

// Saca la Lista de Generos
movieCtrl.getGenres = async (req, res) => {
    await Movie.find().distinct('genres')
        .then((data)=> {
            res.status(200).json({status:data})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

module.exports = movieCtrl;