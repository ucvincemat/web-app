const express = require('express');
const router = express.Router();
const drgController = require('../controllers/drgController');

router.get('/', drgController.getAllSeeds);
router.get('/:seed_g/:seed_m/:seed_p/:season', drgController.getSeed);
router.post('/', drgController.addSeed);
router.put('/:seed_g/:seed_m/:seed_p/:season', drgController.updateSeed);
router.delete('/:seed_g/:seed_m/:seed_p/:season', drgController.deleteSeed);

module.exports = router;