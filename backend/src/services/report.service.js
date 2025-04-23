const jsreport = require('jsreport');
const { getUsuariosPorGrupo } = require('../repositories/report.repository');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Configuración de jsreport
const jsreportInstance = jsreport({
  httpPort: 3001
});

jsreportInstance.init();

// Función para generar el gráfico como imagen base64
const generarGraficoComoImagen = async (conteo) => {
  const canvas = new ChartJSNodeCanvas({ width: 500, height: 500 });
  const configuration = {
    type: 'pie',
    data: {
      labels: Object.keys(conteo),
      datasets: [{
        data: Object.values(conteo),
        backgroundColor: ['#60a5fa', '#f59e0b', '#10b981', '#f43f5e', '#a78bfa', '#34d399', '#ef4444']
      }]
    }
  };
  const imageBuffer = await canvas.renderToBuffer(configuration);
  return imageBuffer.toString('base64');
};

// Función para generar el texto descriptivo
const generarDescripcion = (conteo) => {
  const totalUsuarios = Object.values(conteo).reduce((acc, val) => acc + val, 0);
  let descripcion = `<p>Este gráfico muestra la distribución de usuarios según sus grupos. En total hay <strong>${totalUsuarios}</strong> usuarios.</p>`;

  descripcion += `<div class="lista-grupos"><ul>`;
  Object.keys(conteo).forEach((grupo) => {
    const porcentaje = ((conteo[grupo] / totalUsuarios) * 100).toFixed(2);
    descripcion += `<li><span class="grupo">${grupo}</span>: <strong>${conteo[grupo]}</strong> usuario(s) (${porcentaje}%)</li>`;
  });
  descripcion += `</ul></div>`;

  return descripcion;
};

// Función para generar el reporte
const generarReporteUsuariosPorGrupo = async () => {
  const conteo = await getUsuariosPorGrupo();
  const base64Image = await generarGraficoComoImagen(conteo);
  const descripcion = generarDescripcion(conteo);

  const report = await jsreportInstance.render({
    template: {
      content: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                padding: 40px;
                color: #1f2937;
                background-color: #f9fafb;
              }
              h1 {
                text-align: center;
                color: #111827;
                margin-bottom: 30px;
              }
              img {
                display: block;
                margin: 0 auto 30px auto;
                max-width: 400px;
              }
              p {
                text-align: justify;
                margin-bottom: 20px;
              }
              .lista-grupos ul {
                list-style-type: none;
                padding: 0;
              }
              .lista-grupos li {
                background-color: #ffffff;
                margin: 8px 0;
                padding: 10px 15px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
              }
              .grupo {
                font-weight: bold;
                color: #2563eb;
              }
            </style>
          </head>
          <body>
            <h1>📊 Reporte de Usuarios por Grupo</h1>
            <img src="data:image/png;base64,{{{base64Image}}}" alt="Gráfico de usuarios por grupo" />
            ${descripcion}
          </body>
        </html>
      `,
      engine: 'handlebars',
      recipe: 'chrome-pdf',
    },
    data: { base64Image },
  });

  return report.content;
};

module.exports = { generarReporteUsuariosPorGrupo };
