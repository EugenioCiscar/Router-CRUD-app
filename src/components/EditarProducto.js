import React, {useState, useRef} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function EditarProducto (props){

    //DESTRUCTURING DE PROPS

    const {producto, history, guardarRecargarProductos}  = props

    //GENERAR LOS REFS
    const precioPlatoRef= useRef('');
    const nombrePlatoRef= useRef('');

    const [error, guardarError]= useState(false);
    const [categoria, guardarCategoria]= useState ('');


    const editarProducto = async e =>{
        e.preventDefault();

        //VALIDAR
        const nuevoNombrePlato=  precioPlatoRef.current.value
        const nuevoPrecioPlato=  nombrePlatoRef.current.value

        if(nuevoNombrePlato === '' || nuevoPrecioPlato===''|| categoria === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        //REVISAR SI CAMBIO LA CATEGORIA DE LO CONTRARIO ASIGNAR NUEVO VALOR

        let categoriaPlato = (categoria === '') ? producto.categoria : categoria

        console.log (categoriaPlato)

        // OBTENER LOS VALORES DEL FORMULARIO
            const editarPlato = {
                precioPlato : nuevoPrecioPlato,
                nombrePlato : nuevoNombrePlato,
                categoria : categoriaPlato
            }
            // ENVIAR EL REQUEST

            const url = `http://localhost:4000/restaurant/${producto.id}`;

            try {
                const resultado = await axios.put(url, editarPlato);
              if(resultado.status ===200){
                  Swal.fire(
                      'Producto Editado',
                      'El producto se edito correctamente',
                      'success'
                  )
              }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    type:'error',
                    title:'Error',
                    text:'Hubo un error. vuelva a intentarlo'
                })
                
            }

            // REDIRIGIR AL USUARIO, CONSULTA API
            guardarRecargarProductos(true)
            history.push('/productos');

    }     
    const leerValorRadio = e => {
        guardarCategoria(e.target.value);
    }   

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar producto</h1>

            {(error) ? <Error mensaje='Todos los campos son obligatorios'/> : null}

            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Plato</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Plato"
                        ref={nombrePlatoRef}
                        defaultValue={producto.nombrePlato}
                       
                    />
                </div>

                <div className="form-group">
                    <label>Precio Plato</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Plato"
                        ref={precioPlatoRef}
                        defaultValue={producto.precioPlato}
                        
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'postre')}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'bebida')}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'cortes')}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'ensalada')}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    )
}

export default withRouter(EditarProducto);