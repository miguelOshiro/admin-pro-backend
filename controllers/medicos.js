const { response } = require('express');
const Medico = require('../models/medico')

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);
        if (!medico) {

            return res.status(400).json({
                ok: false,
                msg: 'Medico no encontrado x id',
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'actualizarHospital',
            medico: medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;


    try {

        const medico = await Medico.findById(id);
        if (!medico) {

            return res.status(400).json({
                ok: false,
                msg: 'Medico no encontrado x id',
            });
        }

        await Medico.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}







module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}