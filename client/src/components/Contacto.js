import React from 'react';

const Contacto = ()=>{
    return(
        <main>
            <div className="container mt-3 d-flex flex-wrap">
                <h2>Soy contacto</h2>
                <form action="" method="POST" >
                    <fieldset className="d-flex flex-wrap">
                        <legend>Formulario de consulta</legend>
                        <div className="form-group m-3 col-6">
                            <label for="name">Nombre: </label>
                            <input type="text" name="name" id="name" placeholder="Ingresá tu Nombre"  class="form-control"/>
                        </div>
                        <div className="form-group m-3 col-6">
                            <label for="surname">Apellido: </label>
                            <input type="text" name="surname" id="surname" placeholder="Ingresá tu Apellido"  class="form-control"/>
                        </div>
                        <div className="form-group m-3 col-6">
                            <label for="email">Email: </label>
                            <input type="email" name="email" id="email" placeholder="Ingresá tu Email"  class="form-control"/>
                        </div>
                        <div className="form-group m-3 col-6">
                            <label for="password">Contraseña: </label>
                            <input type="password" name="password" id="password" placeholder="Ingresá una Contraseña"  class="form-control"/>
                        </div>
                        <div className="form-group m-3 col-6">
                            <input type="submit" value="Enviar"  class="btn btn-primary m-1"/>
                            <input type="reset" value="Limpiar"  class="btn btn-secondary m-1"/>
                        </div>
                    </fieldset>
                </form>
            </div>
        </main>
    )
}

export default Contacto;