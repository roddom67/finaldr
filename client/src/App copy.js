import React, { Fragment, useEffect, useState } from "react";
import Modal from 'react-modal';
function App() {
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  const [listUpdated,setListUpdated] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false)

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
  }
  )
//selecciona archivo
  const selectedHandler = e =>{ 
    setFile(e.target.files[0])}
//envia archivo
  const sendHandler = e =>{
    if (!file){
      alert('Subí un archivo')
      return
    }
    // formatear los datos
    const formdata = new FormData()
    formdata.append('imagen', file)
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

  const deleteHandler = () => {
    let imagenId = actualImage.split('-');
    
    fetch('http://localhost:8000/imagenes/delete/' + imagenId,{
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            Navbar
          </a>
          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input id="fileinput" onChange={selectedHandler} className="form-control" type="file" />
            </div>
            <div className="col-2">
              <button onClick={sendHandler} className="btn btn-primary"> Subir</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3 d-flex flex-wrap">
        {imageList.map(image => (
          <div key={image} className="card m-2">
            <img src={'http://localhost:8000/' + image} alt="..." className="card-img-top" style={{ height: "200px", width: "300px" }} />
            <div className="card-body">
              <button className="btn btn-dark" onClick={()=> modalHandler(true)} >Click para ver</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => modalHandler(false)} >
        <div className="card m-2">
          <img src={'http://localhost:8000/' + actualImage} alt="..."   />
          <div className="card-body">
            <button className="btn btn-dark" onClick={()=>deleteHandler()}>Eliminar</button>
          </div>
        </div>
      </Modal>
      
    </Fragment>
  );
}
export default App;