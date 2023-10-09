const {client } = require('./mongodb');

class Database {
    constructor() {
        const db = client.db('Peliculas');
        this.collection = db.collection("Peliculas");
    }

    async addMovie(movie) {
        try {
            await this.collection.insertOne(movie);
            console.log('Película agregada a MongoDB');
        } catch (error) {
            console.error('Error al agregar película a MongoDB:', error);
        }
    }

    async getMovies() {
        
        try {
            const movies = await this.collection.find({}).toArray();
            return movies;
        } catch (error) {
            console.error('Error al obtener películas de MongoDB:', error);
            return [];
        }
    }

    async getMoviesName() {
        try {
            const movies = await this.collection.find({ visto: false }).toArray();
            return movies.map((movie) => ({
                nombre: movie.nombre,
                url: movie.url,
            }));
        } catch (error) {
            console.error('Error al obtener películas de MongoDB:', error);
            return [];
        }
    }

    async setMovieWatched(nombre) {
        try {

            await this.collection.updateOne({ nombre }, { $set: { visto: true } });
            console.log('Película marcada como vista en MongoDB');
        } catch (error) {
            console.error('Error al marcar película como vista en MongoDB:', error);
        }
    }
}

const Db = new Database();
module.exports = Db;
