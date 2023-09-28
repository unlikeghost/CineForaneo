import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button } from "@chakra-ui/react"


export default function Roulette() {

    const [todasLasPeliculas, setTodasLasPeliculas] = useState([]);
    const [pelicula, setPelicula] = useState('');
    const [NoPelicula, setNoPelicula] = useState(false);

    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/movies');
                const data = await response.json();
                if (data.length === 0) {
                    setNoPelicula(true);
                    return;
                }
                setTodasLasPeliculas(data.map((movie) => movie.nombre));
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const getRandomMovie = () => {
        setPelicula(null);
        fetch('/api/movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length === 0) {
                    setNoPelicula(true);
                    return;
                }
                const random = Math.floor(Math.random() * data.length);
                setPelicula(data[random]);
            })
            .catch((error) => {
                setError(error.message);
            });

    };

    const setMovieWatched = () => {
        fetch('/api/movies', {
            method: 'PUT',
            body: JSON.stringify(pelicula),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });

        router.push('/');
    }

    const goTo = (e) => {
        const path = e.target.name;
        console.log(path);
        if (path === 'roulette') {
            window.location.reload();
        }
        else if (path === 'form') {
            router.push('/');
        }
    };


    return (
        <main>
            <section>
                {pelicula &&
                    <>

                        <div>
                            <h2> {pelicula.nombre} </h2>
                            <p> {pelicula.url} </p>
                        </div>
                        <div>
                            <Button onClick={setMovieWatched}>
                                Marcar como vista
                            </Button>
                            <Button name="roulette" onClick={goTo}>
                                Girar ruleta de nuevo
                            </Button>
                        </div>
                    </>

                }
                {(!pelicula && !NoPelicula) &&
                    <>
                        <div className="roulette">
                            {todasLasPeliculas.map((pelicula, index) => (
                                <div className="number"
                                    key={index}
                                    style={{ transform: `rotate(${index * (360 / todasLasPeliculas.length)}deg)` }}>
                                    {pelicula}
                                </div>
                            ))}
                        </div>
                        <Button onClick={getRandomMovie}>
                            Girar ruleta
                        </Button>
                    </>
                }
                {NoPelicula &&
                    <div>
                        <h2> No hay peliculas </h2>
                        <Button name="form" onClick={goTo}>
                            Agregar pelicula
                        </Button>
                    </div>
                }

            </section>
        </main>
    )
}
