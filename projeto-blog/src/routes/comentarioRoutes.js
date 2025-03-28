/**
 * Rotas para o módulo de comentários
 * Este arquivo define todas as rotas relacionadas às operações de comentários:
 * - Criação, listagem, edição e remoção de comentários
 */

const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Rotas Públicas
 * Estas rotas não necessitam de autenticação para serem acessadas
 */

/**
 * @route GET /api/comentarios/post/:postId
 * @desc Lista todos os comentários de um post
 * @access Public
 */
router.get('/post/:postId', comentarioController.listarComentariosPorPost);

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
 * @route POST /api/comentarios
 * @desc Cria um novo comentário
 * @access Private
 */
router.post('/', comentarioController.criarComentario);

/**
 * @route PUT /api/comentarios/:id
 * @desc Atualiza um comentário
 * @access Private
 */
router.put('/:id', comentarioController.atualizarComentario);

/**
 * @route DELETE /api/comentarios/:id
 * @desc Remove um comentário
 * @access Private
 */
router.delete('/:id', comentarioController.deletarComentario);

module.exports = router; 