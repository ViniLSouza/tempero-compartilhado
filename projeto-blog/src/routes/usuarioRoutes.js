/**
 * Rotas para o módulo de usuários
 * Este arquivo define todas as rotas relacionadas às operações de usuário:
 * - Criação, login, listagem, edição e remoção de usuários
 * - Rotas públicas e rotas protegidas por autenticação
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const usuarioController = require('../controllers/usuarioController');
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Rotas Públicas
 * Estas rotas não necessitam de autenticação para serem acessadas
 */

/**
 * @route POST /api/usuarios/cadastro
 * @desc Cadastra um novo usuário no sistema
 * @access Public
 * @body {nome, email, senha, telefone}
 */
router.post('/cadastro', usuarioController.criarUsuario);

/**
 * @route POST /api/usuarios/login
 * @desc Autentica um usuário e retorna um token JWT
 * @access Public
 * @body {email, senha}
 */
router.post('/login', usuarioController.login);

/**
 * @route GET /api/usuarios
 * @desc Lista todos os usuários cadastrados
 * @access Public
 */
router.get('/', usuarioController.listarUsuarios);

/**
 * Middleware de Autenticação
 * Todas as rotas abaixo deste middleware precisarão de autenticação
 * O token JWT deve ser enviado no header Authorization: Bearer [token]
 */
router.use(authMiddleware);

/**
 * Rotas Protegidas
 * Estas rotas só podem ser acessadas por usuários autenticados
 */

/**
 * @route PUT /api/usuarios/:id
 * @desc Atualiza os dados de um usuário específico
 * @access Private
 * @params {id} - ID do usuário a ser editado
 * @body {nome, email, telefone, senha}
 */
router.put('/:id', usuarioController.editarUsuario);

/**
 * @route DELETE /api/usuarios/:id
 * @desc Remove um usuário do sistema
 * @access Private
 * @params {id} - ID do usuário a ser removido
 */
router.delete('/:id', usuarioController.deletarUsuario);

// Rotas de Upload de Imagem
router.post(
  '/profile-image',
  multer(multerConfig).single('imagem'),
  uploadController.uploadProfileImage
);

router.delete('/profile-image', uploadController.removerProfileImage);

module.exports = router; 