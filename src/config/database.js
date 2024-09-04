import mongoose from 'mongoose';

// Actualizando URL de conecci�n
mongoose.connect('MONGO_URL');

const db = mongoose.connection;

// Configurando excepci�n gestionada
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;
