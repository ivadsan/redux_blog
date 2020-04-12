import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';
import Tareas from './Tareas';
import Publicaciones from './Publicaciones';
import TareasGuardar from './Tareas/Guardar';

const App = () => (
  <BrowserRouter>
    <Menu />
    <div id='container'>
      <Switch>
        <Route exact path='/' component={Usuarios} />
        <Route exact path='/tareas' component={Tareas} />
        <Route exact path='/tareas/guardar' component={TareasGuardar} />
        <Route
          exact
          path='/tareas/guardar/:usu_id/:tar_id'
          component={TareasGuardar}
        />
        <Route exact path='/publicaciones/:key' component={Publicaciones} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
