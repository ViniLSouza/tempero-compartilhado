/**
 * Arquivo principal do Backend
 * Este arquivo é o ponto de entrada da aplicação Node.js/Express, responsável por:
 * - Configurar o servidor Express
 * - Configurar middlewares (CORS, JSON parsing)
 * - Configurar rotas estáticas para uploads
 * - Definir rotas da API
 * - Iniciar o servidor
 */

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

// Middlewares
app.use(express.json());
app.use(cors());

// Configuração para servir arquivos estáticos
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// Rotas da API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/curtidas', curtidaRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do Blog!' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 