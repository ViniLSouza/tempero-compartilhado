/**
 * Rotas para o módulo de publicações (posts)
 * Este arquivo define todas as rotas relacionadas às operações de posts:
 * - Criação, listagem, visualização, edição e remoção de posts
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Rotas Públicas
 * Estas rotas não necessitam de autenticação para serem acessadas
 */

/**
 * @route GET /api/posts
 * @desc Lista todas as publicações
 * @access Public
 */
router.get('/', postController.listarPosts);

/**
 * @route GET /api/posts/:id
 * @desc Busca uma publicação pelo ID
 * @access Public
 */
router.get('/:id', postController.buscarPost);

/**
 * @route GET /api/posts/usuario/:usuarioId
 * @desc Lista publicações de um usuário específico
 * @access Public
 */
router.get('/usuario/:usuarioId', postController.listarPostsDoUsuario);

/**
 * Middleware de Autenticação
 * Todas as rotas abaixo deste middleware precisarão de autenticação
 */
router.use(authMiddleware);

/**
 * Rotas Protegidas
 * Estas rotas só podem ser acessadas por usuários autenticados
 */

/**
 * @route POST /api/posts
 * @desc Cria uma nova publicação
 * @access Private
 */
router.post('/', postController.criarPost);

/**
 * @route PUT /api/posts/:id
 * @desc Atualiza uma publicação
 * @access Private
 */
router.put('/:id', postController.atualizarPost);

/**
 * @route DELETE /api/posts/:id
 * @desc Remove uma publicação
 * @access Private
 */
router.delete('/:id', postController.deletarPost);

module.exports = router; 