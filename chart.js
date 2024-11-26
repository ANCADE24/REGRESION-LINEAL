import Chart from 'chart.js/auto';

// Variable global para mantener la referencia al gráfico actual
let scatterChart;

/**
 * Crea o actualiza el gráfico de dispersión con los datos proporcionados
 * @param {Array<{x: number, y: number}>} data - Array de puntos para el gráfico
 * @param {Object} [regressionLine=null] - Parámetros de la línea de regresión
 * @param {number} regressionLine.m - Pendiente de la línea
 * @param {number} regressionLine.b - Intersección Y
 */
export function createChart(data, regressionLine = null) {
  const ctx = document.getElementById('scatterChart');
  
  // Destruir el gráfico existente si hay uno
  if (scatterChart) {
    scatterChart.destroy();
  }

  // Configurar el conjunto de datos para los puntos
  const datasets = [{
    label: 'Gasto Publicitario vs Ingresos',
    data: data,
    backgroundColor: 'rgb(75, 192, 192)',
    borderColor: 'rgb(75, 192, 192)',
    type: 'scatter'
  }];

  // Agregar línea de regresión si existe y hay suficientes puntos
  if (regressionLine && data.length > 1) {
    const xValues = data.map(point => point.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    
    datasets.push({
      label: 'Línea de Regresión',
      data: [
        { x: minX, y: regressionLine.m * minX + regressionLine.b },
        { x: maxX, y: regressionLine.m * maxX + regressionLine.b }
      ],
      type: 'line',
      borderColor: 'rgb(255, 99, 132)',
      fill: false
    });
  }

  // Crear nueva instancia del gráfico
  scatterChart = new Chart(ctx, {
    data: { datasets },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Relación entre Gasto Publicitario e Ingresos'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Gasto Publicitario (dólares)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Ingresos (dólares)'
          }
        }
      }
    }
  });
}