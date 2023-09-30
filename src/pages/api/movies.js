import Db from '@/pages/api/db';

export default async function handler(req, res){
    if (req.method === 'GET') {
        const movies = Db.getMoviesName();
        res.status(200).json(movies);
    } else if (req.method === 'POST') {
        try {
            const movie = req.body;
            Db.addMovie(movie);
            res.status(200).json({ message: 'Pelicula agregada correctamente' });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const movie = req.body;
            Db.setMovieWatched(movie.nombre);
            res.status(200).json({ message: 'Pelicula actualizada correctamente' });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}