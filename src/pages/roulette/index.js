import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutMain from '../layout';
import Link from 'next/link';
import Swal from 'sweetalert2';


export default function Roulette() {

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
                getRandomMovie();
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();

    }, []);

    const getRandomMovie = () => {
        let timerInterval;
        setPelicula(null);
        Swal.fire({
            imageUrl: '/bh187-spongebob.gif',
            title: "Espera...",
            html: 'La pelicula correcta estara lista en <b></b> milisegundos.',
            timer: 1000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
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
            }
        })

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

    return (
        <LayoutMain>
            <section className='roulette'>
                {pelicula &&
                    <>
                        <div className='wrapper'>
                            <div className='showMovie'>
                                <img src="/bubbles-ppg.gif"></img>
                                <div>
                                    <h2> {pelicula.nombre} </h2>
                                    <Link href={pelicula.url} target="_blank">
                                        <h3> {pelicula.url} </h3>
                                    </Link>
                                </div>
                            </div>

                            <div className='button-wrapper'>
                                <button onClick={setMovieWatched} className='btn'>
                                    Marcar como vista
                                </button>
                                <button className="btn" name="roulette" onClick={getRandomMovie}>
                                    Girar ruleta de nuevo
                                </button>
                            </div>
                        </div>
                    </>

                }
                {NoPelicula &&
                    <>
                        <div className='showMovie-add'>
                            <h2>
                                No tienes peliculas!
                            </h2>
                            <img src="/bh187-spongebob (1).gif">
                            </img>

                            <button className="btn" onClick={() => router.push("/")}>
                                Agregar peliculas
                            </button>

                        </div>
                    </>
                }

            </section>
        </LayoutMain>

    )
}
