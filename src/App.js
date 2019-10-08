import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import AgregarProducto from './components/AgregarProducto';
import EditarProducto from './components/EditarProducto';
import Productos from './components/Productos';
import Producto from './components/Producto';
import Header from './components/Header';


function App() {

  const [productos, guardarProductos]= useState([]);
  const [recargarProductos, guardarRecargarProductos]= useState(true);

 useEffect(() =>{ 
  if(recargarProductos){
    const consultarApi = async()=>{
    //CONSULTAR API DE JSON-SERVER
    const resultado = await axios.get('http://localhost:4000/restaurant');
   

    guardarProductos(resultado.data)
  }
  consultarApi(); 

  //CAMBIAR A FALSE LA RECARGA DE LOS PRODUCTOS
  guardarRecargarProductos(false);
}
  
},[recargarProductos])

  return (
      <Router>
        <Header/>
        <main className="container mt-5">
        <Switch>
              <Route exact path="/productos" 
                      render={()=>(
                        <Productos
                          productos={productos}
                          guardarRecargarProductos={guardarRecargarProductos}
                          />
                      )}
              />        
              <Route exact path="/nuevo-producto" 
                      render={()=>(
                        <AgregarProducto
                        guardarRecargarProductos={guardarRecargarProductos}
                        />
                      )}
                        />
              <Route exact path="/productos/:id" component={Producto}/>
              <Route exact path="/productos/editar/:id" 
                      render={props =>{

                        // COGER EL ID DEL PRODUCTO
                        const idProducto = parseInt(props.match.params.id);

                        //EL PRODUCTO QUE SE PASA AL STATE
                        const producto = productos.filter (producto => producto.id === idProducto);

                        return(
                          <EditarProducto
                            producto={producto[0]}
                            guardarRecargarProductos={guardarRecargarProductos}
                          />
                        )
                      }}  />
                        
        </Switch>
        </main>
        <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
      </Router>
  );
}

export default App;
