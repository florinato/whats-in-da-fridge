const express = require('express');
const router = express.Router();
const { generateRecipe } = require('../services/gemini');

router.post('/recipe', async (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'No ingredients provided' });
  }
  try {
    const recipe = await generateRecipe(ingredients);
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Gemini error', detail: err.message });
  }
});

module.exports = router;