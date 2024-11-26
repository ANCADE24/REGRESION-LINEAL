/**
 * Calcula los parámetros de la regresión lineal y coeficientes de correlación
 * @param {number[]} x - Array de valores independientes (eje X)
 * @param {number[]} y - Array de valores dependientes (eje Y)
 * @returns {Object} Objeto con los parámetros de regresión
 * @property {number} m - Pendiente de la línea de regresión
 * @property {number} b - Intersección con el eje Y
 * @property {number} r - Coeficiente de correlación
 * @property {number} r2 - Coeficiente de determinación
 */
export function calculateRegression(x, y) {
  // Calcular la media de X e Y
  const n = x.length;
  const xMean = x.reduce((a, b) => a + b) / n;
  const yMean = y.reduce((a, b) => a + b) / n;

  // Calcular las sumas necesarias para la regresión
  let sumXY = 0, sumX2 = 0, sumY2 = 0;
  for (let i = 0; i < n; i++) {
    sumXY += (x[i] - xMean) * (y[i] - yMean);
    sumX2 += (x[i] - xMean) ** 2;
    sumY2 += (y[i] - yMean) ** 2;
  }

  // Calcular parámetros de la regresión
  const m = sumXY / sumX2;                    // Pendiente
  const b = yMean - m * xMean;                // Intersección Y
  const r = sumXY / Math.sqrt(sumX2 * sumY2); // Correlación
  const r2 = r * r;                           // Determinación

  return { m, b, r, r2 };
}