const express = require('express');
const cartaCtrl = require('../controllers/carta.controller');
const router = express.Router();

// Rutas originales (compatibilidad hacia atrás)
router.get('/', cartaCtrl.getCartas);
router.get('/carta/:id', cartaCtrl.getCarta);
router.post('/publicar', cartaCtrl.addCarta);
router.put('/editar/:id', cartaCtrl.updateCarta);
router.delete('/eliminar/:id', cartaCtrl.deleteCarta);

// Rutas REST en inglés que usan los frontends (/api/v1/cards/...)
// Importante: /collections debe ir antes que /:id para que no colisione
router.get('/collections', cartaCtrl.getGenres);
router.get('/:id', cartaCtrl.getCarta);
router.post('/', cartaCtrl.addCarta);
router.put('/:id', cartaCtrl.updateCarta);
router.delete('/:id', cartaCtrl.deleteCarta);

module.exports = router;