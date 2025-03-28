require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const postRoutes = require('./routes/postRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const curtidaRoutes = require('./routes/curtidaRoutes');

const port = process.env.PORT || 3000;

app.use(express.json());

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL do frontend
  credentials: true
}));

// Configuração para servir arquivos estáticos
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// Rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/curtidas', curtidaRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do Blog!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 