import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


function ProductoLista({producto,guardarRecargarProductos}){

    const eliminarProducto =  id =>{
        console.log('eliminando', id);
        // TODO: ELIMINAR LOS REGISTROS    
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podrás volver recueprar el producto eliminado!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
            
          }).then(async(result) => {
            if (result.value) {  
                
           //MANDAR LA PETICION DE ELIMINAR A LA API

           try {
               const url= `http://localhost:4000/restaurant/${id}`

                    
                const resultado = await axios.delete(url);
                if(resultado.status === 200){
                            
                    Swal.fire(
                        'Borrado!',
                        'El producto ha sido borrado',
                        'success'
                    )
                     //CONSULTAD DE NUEVO LA API PARA Q PINTE LA ACTUALIZACION
                guardarRecargarProductos(true)
                }

               
                    
           } catch (error) {
            Swal.fire({
                type:'error',
                title:'Error',
                text:'Hubo un error. vuelva a intentarlo'
            })
               
           }

            }
          })

                


    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <p data-categoria={producto.categoria}>
                {producto.nombrePlato}{'   '}
                <span className="font-weight-bold">{producto.precioPlato}€</span>
            </p>
            <div>
                <Link
                    to={`/productos/editar/${producto.id}`}
                    className="btn btn-success mr-2"
                >Editar</Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={()=> eliminarProducto(producto.id)}
                >Eliminar &times; </button>
            </div>
        </li>
    )
}

export default ProductoLista;