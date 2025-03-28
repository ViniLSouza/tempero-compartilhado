/**
 * Rotas para o módulo de curtidas
 * Este arquivo define todas as rotas relacionadas às operações de curtidas:
 * - Adicionar, remover e verificar curtidas
 * - Contar curtidas e listar usuários que curtiram
 */

const express = require('express');
const router = express.Router();
const curtidaController = require('../controllers/curtidaController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Rotas Públicas
 * Estas rotas não necessitam de autenticação para serem acessadas
 */

/**
 * @route GET /api/curtidas/contar/:postId
 * @desc Conta o número de curtidas de um post
 * @access Public
 */
router.get('/contar/:postId', curtidaController.contarCurtidas);

/**
 * @route GET /api/curtidas/usuarios/:postId
 * @desc Lista os usuários que curtiram um post
 * @access Public
 */
router.get('/usuarios/:postId', curtidaController.listarUsuariosCurtiram);

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
 * @route POST /api/curtidas
 * @desc Adiciona uma curtida a um post
 * @access Private
 */
router.post('/', curtidaController.adicionarCurtida);

/**
 * @route DELETE /api/curtidas/:postId
 * @desc Remove uma curtida de um post
 * @access Private
 */
router.delete('/:postId', curtidaController.removerCurtida);

/**
 * @route GET /api/curtidas/verificar/:postId
 * @desc Verifica se o usuário já curtiu um post
 * @access Private
 */
router.get('/verificar/:postId', curtidaController.verificarCurtida);

module.exports = router; 