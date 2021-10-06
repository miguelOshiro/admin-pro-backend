const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        //mongodb+srv://mean_user:akwcSEjSNubiYq70@cluster0.6l2ar.mongodb.net/hospitaldb
        //await mongoose.connect('mongodb+srv://mean_user:akwcSEjSNubiYq70@cluster0.6l2ar.mongodb.net/hospitaldb', {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        //useCreateIndex: true
        //});
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al Iniciar la BD ver logs');
    }

}


module.exports = {
    dbConnection
}