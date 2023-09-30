import Db from '@/database/db';
// import { NextResponse } from 'next/server';

// export default async function GET(req, res) {
//     const movies = Db.getMoviesName();
//     // res.status(200).json(movies);
//     return NextResponse.json(movies);
// }

// export default async function POST(req, res) {
//     try {
//         const movie = req.body;
//         Db.addMovie(movie);
//         return NextResponse.json({ message: 'Pelicula agregada correctamente' });
//         // res.status(200).json({ message: 'Pelicula agregada correctamente' });
//     }
//     catch (err) {
//         // res.status(500).json({ message: err.message });
//         return NextResponse.error(err.message);
//     }
// }

// export default  async function PUT(req, res) {
//     try {
//         const movie = req.body;
//         Db.setMovieWatched(movie.nombre);
//         return NextResponse.json({ message: 'Pelicula actualizada correctamente' });
//         // res.status(200).json({ message: 'Pelicula actualizada correctamente' });
//     }
//     catch (err) {
//         return NextResponse.error(err.message);
//         // res.status(500).json({ message: err.message });
//     }
// }

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

// export default asynchandler;