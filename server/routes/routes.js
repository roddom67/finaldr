const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, "../imagenes/"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-empleado-" + file.originalname)
    },
});
const fileUpload = multer({
    storage: diskstorage, limits: 1000000
}).single("imagen");
router.get("/", (req, res) => {
    res.send("Se conecta perfectamente");
});
// Crear un middleware para manejar la imagen del cliente 
router.post("/imagenes/post", fileUpload, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("Server error");

        console.log(req.body)

        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const fecha_nac = req.body.fecha_nac;
        const puesto = req.body.puesto;

        const type = req.file.mimetype;
        const imagen = req.file.originalname;
        const data = fs.readFileSync(
            path.join(__dirname, "../imagenes/" + req.file.filename)
        );

        conn.query(
            "INSERT INTO empleados SET ?",
            [{ nombre, apellido, fecha_nac, puesto, type, imagen, data }],
            (err, rows) => {
                 console.log(err)
                if (err) return res.status(500).send("Server error Insert");
                res.send("imagen guardada!");
            }

        );
    });
});
//Solicitar las imagenes con get
router.get("/imagenes/get", (req, res) => {
    req.getConnection((err, conn) => {
        
        if (err) return res.status(500).send("Server error");
        conn.query("SELECT * FROM empleados", (err, rows) => {
            if (err) return res.status(500).send("server error");
            // res.send('ok')
            //res.json(rows)
            rows.map((img) => {
                fs.writeFileSync(
                    path.join(__dirname, "../dbimagenes/" + img.id + "-empleado.png"),
                    img.data
                );
            });

            const imagedir = fs.readdirSync(path.join(__dirname, "../dbimagenes/"));
            res.json(rows);

        });
    });
});

//Eliminar imágenes con get
router.delete("/imagenes/delete/:id", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("server error");
        conn.query("DELETE FROM empleados WHERE id = ?",[req.params.id], (err, rows) => {
            if (err) return res.status(500).send("server error DELETE");
            const imagedir = fs.unlinkSync(path.join(__dirname, "../dbimagenes/" + req.params.id + "-empleado.png"));
            res.json(imagedir);
        });
    });
});

//Solicitar los puestos con get
router.get("/puestos/get", (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send("Server error");
        conn.query("SELECT * FROM puesto", (err, rows) => {
            if (err) return res.status(500).send("server error");
            // res.send('ok')
            //res.json(rows)
            // console.log(res.json(rows))
            res.json(rows);
        });
    });
});



module.exports = router;