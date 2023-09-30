import * as fs from 'fs';
import path from 'path';

class Database {
    constructor() {

        const jsonDirectory = path.join(process.cwd(), 'tmp');

        this.filename = path.join(jsonDirectory, 'peliculas.json');
        try{
            fs.writeFileSync(this.filename, JSON.stringify({ peliculas: [] }));
        }
        catch(err){
            console.log(err);
        }
    }

    addMovie(movie) {
        const movies = this.getMovies();
        movies.peliculas.push(movie);
        this.saveMovies(movies);
    }

    getMovies() {
        return JSON.parse(fs.readFileSync(this.filename));
    }

    getMoviesName() {
        const movies = this.getMovies();
        return movies.peliculas.filter((movie) => !movie.visto).map((movie) => ({
            nombre: movie.nombre,
            url: movie.url
        }));
    }

    setMovieWatched(nombre) {
        const movies = this.getMovies();
        const movie = movies.peliculas.find((movie) => movie.nombre === nombre);
        movie.visto = true;
        this.saveMovies(movies);
    }

    saveMovies(movies) {
        fs.writeFileSync(this.filename, JSON.stringify(movies));
    }
}

const Db = new Database();
export default Db;