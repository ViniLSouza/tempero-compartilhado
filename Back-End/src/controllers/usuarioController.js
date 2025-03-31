/**
 * Controller para gerenciamento de usuários
 * Este arquivo é responsável por:
 * - Criação de usuários
 * - Autenticação (login)
 * - Listagem de usuários
 * - Edição de dados do usuário
 * - Remoção de usuários
 * - Gerenciamento de fotos de perfil
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inicializa o cliente Prisma para comunicação com o banco de dados
const prisma = new PrismaClient();

/**
 * Cria um novo usuário no sistema
 * @route POST /api/usuarios/cadastro
 * @param {Object} req.body - Dados do usuário (nome, email, senha, telefone, foto)
 * @returns {Object} Dados do usuário criado (sem a senha)
 */
exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, telefone, foto } = req.body;

    // Verifica se já existe um usuário com o mesmo email
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    // Retorna erro 400 se o email já estiver em uso
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    // Criptografa a senha do usuário para armazenamento seguro
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria o usuário no banco de dados com Prisma
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        telefone,
        foto
      }
    });

    // Remove a senha do objeto de resposta por segurança
    const { senha: _, ...usuarioSemSenha } = usuario;

    // Retorna os dados do usuário criado com status 201 (Created)
    return res.status(201).json(usuarioSemSenha);
  } catch (erro) {
    // Log do erro e resposta de erro genérica
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};

/**
 * Autenticação de usuário (login)
 * @route POST /api/usuarios/login
 * @param {Object} req.body - Credenciais do usuário (email, senha)
 * @returns {Object} Dados do usuário e token JWT para autenticação
 */
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    // Retorna erro 401 se o usuário não for encontrado
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Verifica se a senha fornecida corresponde à senha armazenada
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    // Retorna erro 401 se a senha não for válida
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Gera um token JWT com o ID do usuário
    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token válido por 1 dia
    );

    // Remove a senha do objeto de resposta por segurança
    const { senha: _, ...usuarioSemSenha } = usuario;

    // Retorna os dados do usuário e o token de acesso
    return res.json({
      usuario: usuarioSemSenha,
      token
    });
  } catch (erro) {
    // Log do erro e resposta de erro genérica
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

/**
 * Lista todos os usuários cadastrados no sistema
 * @route GET /api/usuarios
 * @returns {Array} Lista de usuários sem as senhas
 */
exports.listarUsuarios = async (req, res) => {
  try {
    // Busca todos os usuários, selecionando apenas os campos necessários
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        criadoEm: true,
        atualizadoEm: true
        // Senha é excluída deliberadamente da seleção
      }
    });
    
    // Retorna o array de usuários
    return res.json(usuarios);
  } catch (erro) {
    // Log do erro e resposta de erro genérica
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};

/**
 * Atualiza os dados de um usuário específico
 * @route PUT /api/usuarios/:id
 * @param {number} req.params.id - ID do usuário a ser editado
 * @param {Object} req.body - Novos dados do usuário (nome, email, telefone, senha, foto)
 * @returns {Object} Dados atualizados do usuário (sem a senha)
 */
exports.editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, senha, foto } = req.body;
    
    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) }
    });
    
    // Retorna erro 404 se o usuário não for encontrado
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    // Prepara os dados para atualização
    const dadosAtualizacao = { nome, email, telefone, foto };
    
    // Se uma nova senha foi fornecida, criptografa antes de salvar
    if (senha) {
      dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
    }
    
    // Atualiza o usuário no banco de dados
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: dadosAtualizacao
    });
    
    // Remove a senha do objeto de resposta por segurança
    const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
    
    // Retorna os dados atualizados do usuário
    return res.json(usuarioSemSenha);
  } catch (erro) {
    // Log do erro e resposta de erro genérica
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao editar usuário' });
  }
};

/**
 * Remove um usuário do sistema
 * @route DELETE /api/usuarios/:id
 * @param {number} req.params.id - ID do usuário a ser removido
 * @returns {Object} Mensagem de sucesso
 */
exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) }
    });
    
    // Retorna erro 404 se o usuário não for encontrado
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    // Remove o usuário do banco de dados
    await prisma.usuario.delete({
      where: { id: Number(id) }
    });
    
    // Retorna mensagem de sucesso
    return res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (erro) {
    // Log do erro e resposta de erro genérica
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
}; 