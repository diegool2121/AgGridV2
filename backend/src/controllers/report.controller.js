const { generarReporteUsuariosPorGrupo } = require('../services/report.service');

const obtenerReportePDF = async (req, res) => {
  try {
    const pdf = await generarReporteUsuariosPorGrupo();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Reporte_UsuariosPorGrupo.pdf"');
    res.send(pdf);
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    res.status(500).json({ message: 'Error al generar el reporte' });
  }
};

module.exports = { obtenerReportePDF };
