require('dotenv').config();
const express = require('express');
const geminiRouter = require('./src/routes/gemini');
const fridgeRouter = require('./src/routes/fridge');
const shareRouter = require('./src/routes/share');

const app = express();
app.use(express.json());

app.use('/api/gemini', geminiRouter);
app.use('/api/fridge', fridgeRouter);
app.use('/api/recipe', shareRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));