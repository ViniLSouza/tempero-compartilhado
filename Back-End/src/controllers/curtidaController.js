/**
 * Controller para gerenciamento de curtidas
 * Este arquivo é responsável por:
 * - Adicionar curtidas a posts
 * - Remover curtidas de posts
 * - Verificar se usuário curtiu um post
 * - Contar curtidas de um post
 * - Listar usuários que curtiram um post
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Adiciona uma curtida a um post
 * @route POST /api/curtidas
 * @param {Object} req.body - Dados da curtida (postId)
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Dados da curtida criada
 */
exports.adicionarCurtida = async (req, res) => {
  try {
    const { postId } = req.body;
    const usuarioId = req.usuarioId; // Obtido do middleware de autenticação

    // Validação básica
    if (!postId) {
      return res.status(400).json({ erro: 'ID do post é obrigatório' });
    }

    // Verifica se o post existe
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) }
    });

    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }

    // Verifica se o usuário já curtiu este post
    const curtidaExistente = await prisma.curtida.findUnique({
      where: {
        postId_usuarioId: {
          postId: Number(postId),
          usuarioId
        }
      }
    });

    if (curtidaExistente) {
      return res.status(400).json({ erro: 'Você já curtiu este post' });
    }

    // Adiciona a curtida
    const curtida = await prisma.curtida.create({
      data: {
        postId: Number(postId),
        usuarioId
      }
    });

    // Conta o total de curtidas do post após adicionar a nova curtida
    const totalCurtidas = await prisma.curtida.count({
      where: { postId: Number(postId) }
    });

    return res.status(201).json({
      curtida,
      totalCurtidas
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao adicionar curtida' });
  }
};

/**
 * Remove uma curtida de um post
 * @route DELETE /api/curtidas/:postId
 * @param {number} req.params.postId - ID do post
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Mensagem de sucesso
 */
exports.removerCurtida = async (req, res) => {
  try {
    const { postId } = req.params;
    const usuarioId = req.usuarioId; // Obtido do middleware de autenticação

    // Verifica se a curtida existe
    const curtida = await prisma.curtida.findUnique({
      where: {
        postId_usuarioId: {
          postId: Number(postId),
          usuarioId
        }
      }
    });

    if (!curtida) {
      return res.status(404).json({ erro: 'Você não curtiu este post' });
    }

    // Remove a curtida
    await prisma.curtida.delete({
      where: {
        postId_usuarioId: {
          postId: Number(postId),
          usuarioId
        }
      }
    });

    // Conta o total de curtidas do post após remover a curtida
    const totalCurtidas = await prisma.curtida.count({
      where: { postId: Number(postId) }
    });

    return res.status(200).json({
      mensagem: 'Curtida removida com sucesso',
      totalCurtidas
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao remover curtida' });
  }
};

/**
 * Verifica se o usuário já curtiu um post
 * @route GET /api/curtidas/verificar/:postId
 * @param {number} req.params.postId - ID do post
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Status da curtida (se o usuário curtiu ou não)
 */
exports.verificarCurtida = async (req, res) => {
  try {
    const { postId } = req.params;
    const usuarioId = req.usuarioId; // Obtido do middleware de autenticação

    // Verifica se a curtida existe
    const curtida = await prisma.curtida.findUnique({
      where: {
        postId_usuarioId: {
          postId: Number(postId),
          usuarioId
        }
      }
    });

    return res.json({
      curtiu: !!curtida // Converte para booleano
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao verificar curtida' });
  }
};

/**
 * Conta o número de curtidas de um post
 * @route GET /api/curtidas/contar/:postId
 * @param {number} req.params.postId - ID do post
 * @returns {Object} Total de curtidas do post
 */
exports.contarCurtidas = async (req, res) => {
  try {
    const { postId } = req.params;

    // Verifica se o post existe
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) }
    });

    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }

    // Conta o total de curtidas
    const totalCurtidas = await prisma.curtida.count({
      where: { postId: Number(postId) }
    });

    return res.json({ total: totalCurtidas });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao contar curtidas' });
  }
};

/**
 * Lista os usuários que curtiram um post
 * @route GET /api/curtidas/usuarios/:postId
 * @param {number} req.params.postId - ID do post
 * @returns {Array} Lista de usuários que curtiram o post
 */
exports.listarUsuariosCurtiram = async (req, res) => {
  try {
    const { postId } = req.params;

    // Verifica se o post existe
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) }
    });

    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }

    // Busca os usuários que curtiram o post
    const curtidas = await prisma.curtida.findMany({
      where: { postId: Number(postId) },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      },
      orderBy: {
        dataCurtida: 'desc'
      }
    });

    // Extrai apenas os dados dos usuários
    const usuarios = curtidas.map(curtida => curtida.usuario);

    return res.json(usuarios);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar usuários que curtiram' });
  }
}; 