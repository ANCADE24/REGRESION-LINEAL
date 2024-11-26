import { calculateRegression } from './utils.js';
import { createChart } from './chart.js';

// Almacena los datos del gráfico
let chartData = [];

/**
 * Actualiza los resultados estadísticos en la interfaz
 * @param {Object} stats - Estadísticas de la regresión
 * @param {number} stats.m - Pendiente
 * @param {number} stats.b - Intersección Y
 * @param {number} stats.r - Correlación
 * @param {number} stats.r2 - Determinación
 */
function updateResults(stats) {
  document.getElementById('regression').textContent = 
    `y = ${stats.m.toFixed(4)}x + ${stats.b.toFixed(4)}`;
  document.getElementById('correlation').textContent = 
    stats.r.toFixed(4);
  document.getElementById('determination').textContent = 
    stats.r2.toFixed(4);
}

/**
 * Agrega un nuevo punto al gráfico y actualiza los cálculos
 * Esta función es llamada desde el HTML cuando se hace clic en "Agregar Punto"
 */
window.addPoint = () => {
  const xInput = document.getElementById('xValue');
  const yInput = document.getElementById('yValue');
  
  const x = Number(xInput.value);
  const y = Number(yInput.value);
  
  if (!isNaN(x) && !isNaN(y)) {
    // Agregar nuevo punto a los datos
    chartData.push({ x, y });
    
    // Actualizar gráfico y estadísticas si hay más de un punto
    if (chartData.length > 1) {
      const stats = calculateRegression(
        chartData.map(p => p.x),
        chartData.map(p => p.y)
      );
      updateResults(stats);
      createChart(chartData, stats);
    } else {
      createChart(chartData);
    }
    
    // Limpiar campos de entrada
    xInput.value = '';
    yInput.value = '';
  } else {
    alert('Por favor ingrese valores numéricos válidos');
  }
};

/**
 * Limpia todos los datos y reinicia el gráfico
 * Esta función es llamada desde el HTML cuando se hace clic en "Limpiar Datos"
 */
window.clearData = () => {
  chartData = [];
  createChart([]);
  document.getElementById('regression').textContent = '-';
  document.getElementById('correlation').textContent = '-';
  document.getElementById('determination').textContent = '-';
};

// Inicializar el gráfico vacío al cargar la página
createChart([]);