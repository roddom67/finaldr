import React, { Fragment, useEffect, useState } from "react";
import Modal from 'react-modal';

function Home() {
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  const [listUpdated,setListUpdated] = useState(false);

  const [puestos, setPuestos] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpenAlta, setModalIsOpenAlta] = useState(false)

  //Selecciona la imagen actual en el modal
  const [actualImage, setActualImage] = useState(null);

  useEffect( () =>{
    Modal.setAppElement('body')
    
    fetch('http://localhost:8000/imagenes/get')
    .then(res => res.json())
    .then(res => setImageList(res))
    .catch(err => {
      console.error(err)
    })

    

  })
//selecciona archivo
  const selectedHandler = e =>{ 
    setFile(e.target.files[0]);
  }
//envia archivo
  const sendHandler = e =>{
    const inputs = e.target.parentElement.parentElement.children;
    if (!file){
      alert('Subí un archivo')
      return
    }
    // formatear los datos
    const formdata = new FormData();
    formdata.append('imagen', file);
    formdata.append('nombre',inputs[0].children[1].value);
    formdata.append('apellido',inputs[1].children[1].value);
    formdata.append('fecha_nac',inputs[2].children[1].value);
    formdata.append('puesto',inputs[3].children[1].value);

    // POST
    fetch('http://localhost:8000/imagenes/post',{
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then (res => console.log(res))
    .catch(err => {
      console.error(err)
    })
    
    //resetear formulario y volver estado a null 
    document.getElementById('fileinput').value = null
    setFile(null)
  }

  const modalHandler = (isOpen, image) => {
    setModalIsOpen(isOpen);
    setActualImage(image);
  }
  const modalHandlerAlta = (isOpen) => {
    setModalIsOpenAlta(isOpen);
    fetch('http://localhost:8000/puestos/get')
    .then(res => res.json())
    .then(res => setPuestos(res))
    .catch(err => {
      console.error(err)
    })
  }

  const deleteHandler = () => {
    let imagenId = actualImage.split('-');
    fetch('http://localhost:8000/imagenes/delete/' + imagenId[0], {
      method: 'DELETE'
    })
    .then(res => res.text())
    .then(res => console.log(res))
    
    .catch(err => {
      console.error(err)
    })
    
    setModalIsOpen(false);
    setListUpdated(true);
  }
    return (
        <Fragment>
     
            
            <div className="container mt-3 d-flex flex-wrap">
              <div className="d-flex flex-wrap col-12">
                <h1>Empleados</h1>
                <button className="btn btn-dark ms-auto" onClick={()=> modalHandlerAlta(true)} >Alta Empleado</button>
              </div>
              {imageList.map(empleado => (
              <div key={empleado.id} className="card col-12 col-md-3 p-4 m-3">
                  <img src={'http://localhost:8000/' + empleado.id + '-empleado.png'} alt={empleado.nombre} className="card-img-top mb-1" style={{ height: "200px", width: "200px" }} />
                  <h2>{empleado.nombre} {empleado.apellido}</h2>
                  <p>Puesto: {empleado.puesto}</p>
                  <p>Fecha Nac.: {empleado.fecha_nac.slice(0, 10)}</p>
                  <div className="card-body">
                  <button className="btn btn-dark" onClick={()=> modalHandler(true, empleado.id)} >Click para eliminar</button>
                  </div>
              </div>
              ))}
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => modalHandler(false)} size="sm" aria-labelledby="example-modal-sizes-title-sm">
                <div className="card m-2">
                <img src={'http://localhost:8000/' + actualImage + '-empleado.png'} alt="..." style={{height:"200px", width:"200px"}}  />
                <div className="card-body">
                    <button className="btn btn-dark" onClick={()=>deleteHandler()}>Eliminar</button>
                </div>
                </div>
            </Modal>

            <Modal isOpen={modalIsOpenAlta} onRequestClose={() => modalHandlerAlta(false)} >
                <div className="container mt-5">
                    <h2>Alta de empleado</h2>
                    <div className="card p-3">
                        <div className="row">
                            <div className="col-12 col-md-6 pt-3">
                                <label for="nombre">Nombre</label>
                                <input id="nombre" name="nombre" className="form-control" type="text" placeholder="Ingese el nombre del empleado" />
                            </div>
                            <div className="col-12 col-md-6 pt-3">
                                <label for="apellido">Apellido</label>
                                <input id="apellido" name="apellido" className="form-control" type="text" placeholder="Ingese el apellido del empleado" />
                            </div>
                            <div className="col-12 col-md-4 pt-3">
                                <label for="fecha_nac">Fecha Nac.</label>
                                <input id="fecha_nac" naame="fecha_nac" className="form-control" type="text" placeholder="Ingese la fecha de nacimiento del empleado" />
                            </div>
                            <div className="col-12 col-md-4 pt-3">
                                <label for="puesto">Puesto</label>
                                <select id="puesto" name="puesto" className="form-control">
                                {puestos.map(puesto => (
                                    <option value={puesto.id} >{puesto.puesto} </option>
                                ))}
                                </select>
                            </div>
                            <div className="col-12 col-md-4 pt-3">
                                <label for="fileinput">Foto del Empleado</label>
                                <input id="fileinput" onChange={selectedHandler} className="form-control" type="file" />
                            </div>
                            <div  className="col-12 col-md-10"></div>
                            <div className="col-12 col-md-2 pt-3">
                            <button onClick={sendHandler} className="btn btn-primary"> Subir</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
      
        </Fragment>
    );
}

export default Home;