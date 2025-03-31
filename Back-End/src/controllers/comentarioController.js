/**
 * Controller para gerenciamento de comentários
 * Este arquivo é responsável por:
 * - Criação de comentários
 * - Listagem de comentários por post
 * - Edição de comentários
 * - Remoção de comentários
 * - Gerenciamento de permissões
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Cria um novo comentário em um post
 * @route POST /api/comentarios
 * @param {Object} req.body - Dados do comentário (comentario, postId)
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Dados do comentário criado
 */
exports.criarComentario = async (req, res) => {
  try {
    const { comentario, postId } = req.body;
    const usuarioId = req.usuarioId; // Obtido do middleware de autenticação

    // Validação básica
    if (!comentario || !postId) {
      return res.status(400).json({ 
        erro: 'Comentário e ID do post são obrigatórios' 
      });
    }

    // Verifica se o post existe
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) }
    });

    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }

    // Cria o comentário
    const novoComentario = await prisma.comentario.create({
      data: {
        comentario,
        postId: Number(postId),
        usuarioId
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        post: {
          select: {
            id: true,
            titulo: true
          }
        }
      }
    });

    return res.status(201).json(novoComentario);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar comentário' });
  }
};

/**
 * Lista todos os comentários de um post
 * @route GET /api/comentarios/post/:postId
 * @param {number} req.params.postId - ID do post
 * @returns {Array} Lista de comentários do post
 */
exports.listarComentariosPorPost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Verifica se o post existe
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) }
    });

    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }

    // Busca os comentários do post
    const comentarios = await prisma.comentario.findMany({
      where: { postId: Number(postId) },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            foto: true
          }
        }
      },
      orderBy: {
        dataComentario: 'desc' // Comentários mais recentes primeiro
      }
    });

    return res.json(comentarios);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar comentários' });
  }
};

/**
 * Atualiza um comentário
 * @route PUT /api/comentarios/:id
 * @param {number} req.params.id - ID do comentário
 * @param {Object} req.body - Novos dados do comentário (comentario)
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Dados do comentário atualizado
 */
exports.atualizarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { comentario } = req.body;
    const usuarioId = req.usuarioId;

    // Validação básica
    if (!comentario) {
      return res.status(400).json({ erro: 'Comentário é obrigatório' });
    }

    // Busca o comentário
    const comentarioExistente = await prisma.comentario.findUnique({
      where: { id: Number(id) }
    });

    // Verifica se o comentário existe
    if (!comentarioExistente) {
      return res.status(404).json({ erro: 'Comentário não encontrado' });
    }

    // Verifica se o usuário é o dono do comentário
    if (comentarioExistente.usuarioId !== usuarioId) {
      return res.status(403).json({ 
        erro: 'Você não tem permissão para editar este comentário' 
      });
    }

    // Atualiza o comentário
    const comentarioAtualizado = await prisma.comentario.update({
      where: { id: Number(id) },
      data: { comentario }
    });

    return res.json(comentarioAtualizado);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao atualizar comentário' });
  }
};

/**
 * Remove um comentário
 * @route DELETE /api/comentarios/:id
 * @param {number} req.params.id - ID do comentário
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Mensagem de sucesso
 */
exports.deletarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    // Busca o comentário
    const comentario = await prisma.comentario.findUnique({
      where: { id: Number(id) },
      include: {
        post: {
          select: {
            usuarioId: true
          }
        }
      }
    });

    // Verifica se o comentário existe
    if (!comentario) {
      return res.status(404).json({ erro: 'Comentário não encontrado' });
    }

    // Verifica se o usuário é o dono do comentário OU o dono do post
    const eDonoDoPot = comentario.post.usuarioId === usuarioId;
    const eDonoDoComentario = comentario.usuarioId === usuarioId;

    if (!eDonoDoComentario && !eDonoDoPot) {
      return res.status(403).json({ 
        erro: 'Você não tem permissão para deletar este comentário' 
      });
    }

    // Deleta o comentário
    await prisma.comentario.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json({ mensagem: 'Comentário deletado com sucesso' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao deletar comentário' });
  }
}; 