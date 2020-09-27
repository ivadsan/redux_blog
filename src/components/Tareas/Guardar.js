import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as tareasActions from '../../actions/tareasActions';

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id },
      },
      tareas,
      cambiarTitulo,
      cambiarUsuarioId,
      limpiarForma,
    } = this.props;

    if (usu_id && tar_id && Object.keys(tareas).length) {
      const tarea = tareas[usu_id][tar_id];
      cambiarUsuarioId(tarea.userId);
      cambiarTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }

  changeModuleTitle() {
    const {
      match: {
        params: { usu_id, tar_id },
      },
    } = this.props;

    if (usu_id && tar_id) {
      return 'Edit task';
    } else {
      return 'New task';
    }
  }

  cambiarUsuarioId = (event) => {
    return this.props.cambiarUsuarioId(event.target.value);
  };

  cambiarTitulo = (event) => {
    return this.props.cambiarTitulo(event.target.value);
  };

  guardar = () => {
    const {
      usuario_id,
      titulo,
      agregar,
      match: {
        params: { usu_id, tar_id },
      },
      tareas,
      editar,
    } = this.props;

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    };

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id,
      };
      editar(tarea_editada);
    } else {
      agregar(nueva_tarea);
    }
  };

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;

    if (cargando) return true;
    if (!usuario_id || !titulo) return true;
    return false;
  };

  mostrarAccion = () => {
    const { cargando, error } = this.props;
    if (cargando) return <Spinner />;
    if (error) return <Fatal mensaje={error} />;
  };

  render() {
    return (
      <div className='form'>

        {this.props.regresar ? <Redirect to='/tareas' /> : ''}
        <h1 className='title'>{this.changeModuleTitle()}</h1>
        <label>User Id:</label>
        <input
          type='number'
          value={this.props.usuario_id}
          onChange={this.cambiarUsuarioId}
        />
        <br />
        <br />
        <label>Task:</label>
        <input
          type='text'
          value={this.props.titulo}
          onChange={this.cambiarTitulo}
        />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()} className='button'>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
