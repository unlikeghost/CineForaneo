import Swal from 'sweetalert2';
import { useState } from 'react';
import LayoutMain from './layout';

export default function Home() {
    const [nombre, setNombre] = useState('');
    const [url, setUrl] = useState('');

    const handlerInput = (e) => {
        if (e.target.name === 'nombre') {
            setNombre(e.target.value);
        } else if (e.target.name === 'url') {
            setUrl(e.target.value);
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        const movie = {
            nombre: nombre,
            url: url,
            visto: false
        }        

        fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setNombre('');
        setUrl('');

        Swal.fire(
            {title:'Pelicula agregada a la lista',
            imageUrl: '/nyan-cat-nyan.gif',
            text: 'Nos vemos el viernes!'
            }
        );
    }

    return (
        <LayoutMain>
            <section className='formSection'>
                <form onSubmit={handlerSubmit}>
                    <div className='wrapper'>
                        <label htmlFor="nombre">Nombre de la pelicula</label>
                        <input 
                            autoFocus
                            id="nombre"
                            type="text"
                            name="nombre"
                            className='form-control'
                            onChange={handlerInput} 
                            value={nombre}
                            required />

                        <label htmlFor="url">URL de la pelicula</label>

                        <input 
                            id="url" 
                            name="url" 
                            type="text"
                            className='form-control'
                            onChange={handlerInput} 
                            value={url}
                            required
                            />
                    </div>
                    <button type="submit" className='btn'>
                        Agregar pelicula
                    </button>
                </form>
            </section>
        </LayoutMain>
    )
}
