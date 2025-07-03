// test-gemini.js
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

// Importa la función que realmente usará tu backend.
// Asegúrate de que ESTE archivo exista y funcione en src/services/gemini.js
const { generateRecipe } = require('./src/services/gemini');

async function testGemini() {
  const ingredients = ['huevo', 'pan', 'queso'];
  try {
    const receta = await generateRecipe(ingredients);
    console.log('✅ Conexión a Gemini exitosa');
    console.log('Respuesta de Gemini:\n', receta);
  } catch (error) {
    console.error('❌ Error al conectar con Gemini:', error.message);
    process.exit(1);
  }
  console.log(process.env); // Agregado para depurar
  console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
}

testGemini();
