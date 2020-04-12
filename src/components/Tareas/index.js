import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/css/components/Tasks.css';

import * as tareasActions from '../../actions/tareasActions';

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import NewTask from '../../assets/images/new.png';
import Edit from '../../assets/images/edit.png';
import Delete from '../../assets/images/delete.png';

class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }

  componentDidUpdate() {
    const { tareas, traerTodas, cargando } = this.props;

    if (!Object.keys(tareas).length && !cargando) {
      traerTodas();
    }
  }

  mostrarContenido() {
    const { tareas, cargando, error } = this.props;
    if (error) return <Fatal mensaje={error} />;
    if (cargando) return <Spinner />;

    return Object.keys(tareas).map((usu_id) => (
      <div key={usu_id}>
        <h2>User {usu_id}</h2>
        <div className='task_container'>{this.ponerTareas(usu_id)}</div>
      </div>
    ));
  }

  ponerTareas = (usu_id) => {
    const { tareas, cambioCheck, eliminar } = this.props;

    const por_usuario = {
      ...tareas[usu_id],
    };

    return Object.keys(por_usuario).map((tar_id) => (
      <div key={tar_id} className='task_row'>
        <div className='task_col1'>
          <input
            type='checkbox'
            defaultChecked={por_usuario[tar_id].completed}
            onChange={() => {
              cambioCheck(usu_id, tar_id);
            }}
          />
        </div>
        <div className='task_col2'>{por_usuario[tar_id].title}</div>
        <div className='task_col3'>
          <Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>
            <img src={Edit} alt='Edit' className='icon' />
          </Link>
        </div>
        <div className='task_col4'>
          <img
            src={Delete}
            alt='Delete'
            onClick={() => {
              eliminar(tar_id);
            }}
            className='icon'
          />
        </div>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1 className='title'>Tasks </h1>
        <Link to='/tareas/guardar'>
          <img src={NewTask} alt='New Task' />
        </Link>
        {this.mostrarContenido()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
