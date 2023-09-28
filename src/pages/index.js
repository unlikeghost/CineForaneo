import {useState} from 'react';
import { Input, Button } from "@chakra-ui/react"

export default function Home() {
    const [nombre, setNombre] = useState('');
    const [url, setUrl] = useState('');

    const handlerInput = (e) => {
        if(e.target.name === 'nombre'){
            setNombre(e.target.value);
        }else if(e.target.name === 'url'){
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

        console.log(movie);

        fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setNombre('');
        setUrl('');

        
    }

    return(
        <main>
            <section >
                <form onSubmit={handlerSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre de la pelicula</label>
                        <Input type="text" name="nombre" id="nombre" onChange={handlerInput} required/>
                        <label htmlFor="url">URL de la pelicula</label>
                        <Input name="url" id="url" type="url"
                        onChange={handlerInput}required/>
                    </div>
                    <Button type="submit">
                        Agregar pelicula
                    </Button>
                </form>
            </section>
        </main>
    )
}