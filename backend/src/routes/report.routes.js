const express = require('express');
const { obtenerReportePDF } = require('../controllers/report.controller');

const router = express.Router();

router.get('/', obtenerReportePDF);

module.exports = router;
