const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see .env file)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("API Key:", process.env.GEMINI_API_KEY);

async function generateRecipe(ingredients) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite-preview-02-05" });
  const prompt = `Dame una receta divertida usando SOLO estos ingredientes: ${ingredients.join(', ')}. Devuélvela estructurada: título, ingredientes y pasos.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return {
    recipe: text,
    steps: []
  };
}

module.exports = { generateRecipe };
