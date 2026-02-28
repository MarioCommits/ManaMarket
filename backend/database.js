const mongoose = require('mongoose');
const URI = 'mongodb+srv://root:root@cluster0.rrnplxo.mongodb.net/DAW2026?appName=Cluster0';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;