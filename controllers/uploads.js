const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipo
    const tiposVadidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposVadidos.includes(tipo)) {
        return res.status(400).json({
            ok: true,
            msg: 'No es un medico, usuario u hospital (tipo)'
        });
    }
    //Validar si existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }
    //Procesar la img
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar Extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la img
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    //Mover la img
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la img'
            });
        }

        //Actualizar DB
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'File uploads',
            nombreArchivo
        });
    });

}

const retornaImagen = (req, res) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen x defecto
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        const pathImagen = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImagen);

    }


}



module.exports = {
    fileUpload,
    retornaImagen
}