const express = require('express');
const router = express.Router();

router.post('/share', (req, res) => {
  // Aquí podrías guardar la receta y retornar una URL pública
  // Por ahora solo un mock:
  res.json({ sharedUrl: 'https://yourapp.com/shared/abc123' });
});

module.exports = router;