const express = require('express');
const router = express.Router();

let db = {}; // Para demo, reemplaza por DB real en producción

router.post('/save', (req, res) => {
  const { wallet, ingredients } = req.body;
  if (!wallet || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Missing data' });
  }
  db[wallet] = ingredients;
  res.json({ success: true });
});

router.post('/load', (req, res) => {
  const { wallet } = req.body;
  if (!wallet) return res.status(400).json({ error: 'Missing wallet' });
  res.json({ ingredients: db[wallet] || [] });
});

module.exports = router;