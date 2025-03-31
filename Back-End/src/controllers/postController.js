/**
 * Controller para gerenciamento de posts
 * Este arquivo é responsável por:
 * - Criação de posts
 * - Listagem de posts (todos ou por usuário)
 * - Visualização de post específico
 * - Edição de posts
 * - Remoção de posts
 * - Gerenciamento de curtidas
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Cria uma nova publicação
 * @route POST /api/posts
 * @param {Object} req.body - Dados do post (titulo, conteudo)
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Dados do post criado
 */
exports.criarPost = async (req, res) => {
  try {
    const { titulo, conteudo } = req.body;
    const usuarioId = req.usuarioId; // Obtido do middleware de autenticação

    // Validação básica
    if (!titulo || !conteudo) {
      return res.status(400).json({ 
        erro: 'Título e conteúdo são obrigatórios' 
      });
    }

    // Criar o post no banco de dados
    const post = await prisma.post.create({
      data: {
        titulo,
        conteudo,
        usuarioId
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });

    return res.status(201).json(post);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar publicação' });
  }
};

/**
 * Lista todas as publicações
 * @route GET /api/posts
 * @returns {Array} Lista de posts
 */
exports.listarPosts = async (req, res) => {
  try {
    // Primeiro, busca todos os posts com seus relacionamentos
    const posts = await prisma.post.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            foto: true
          }
        },
        _count: {
          select: { curtidas: true } // Conta as curtidas
        }
      },
      orderBy: {
        dataCriacao: 'desc' // Ordenar por data de criação, mais recentes primeiro
      }
    });

    // Formata a resposta para ter um campo "totalCurtidas"
    const postsFormatados = posts.map(post => {
      const { _count, ...restPost } = post;
      return {
        ...restPost,
        totalCurtidas: _count.curtidas
      };
    });

    return res.json(postsFormatados);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar publicações' });
  }
};

/**
 * Busca uma publicação pelo ID
 * @route GET /api/posts/:id
 * @param {number} req.params.id - ID do post
 * @returns {Object} Dados do post
 */
exports.buscarPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            foto: true
          }
        },
        _count: {
          select: { curtidas: true } // Conta as curtidas
        }
      }
    });

    if (!post) {
      return res.status(404).json({ erro: 'Publicação não encontrada' });
    }

    // Formata a resposta para ter um campo "totalCurtidas"
    const { _count, ...restPost } = post;
    const postFormatado = {
      ...restPost,
      totalCurtidas: _count.curtidas
    };

    return res.json(postFormatado);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar publicação' });
  }
};

/**
 * Lista publicações de um usuário específico
 * @route GET /api/posts/usuario/:usuarioId
 * @param {number} req.params.usuarioId - ID do usuário
 * @returns {Array} Lista de posts do usuário
 */
exports.listarPostsDoUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(usuarioId) }
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const posts = await prisma.post.findMany({
      where: { usuarioId: Number(usuarioId) },
      orderBy: {
        dataCriacao: 'desc'
      }
    });

    return res.json(posts);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao listar publicações do usuário' });
  }
};

/**
 * Atualiza uma publicação
 * @route PUT /api/posts/:id
 * @param {number} req.params.id - ID do post
 * @param {Object} req.body - Novos dados do post (titulo, conteudo)
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Dados do post atualizado
 */
exports.atualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;
    const usuarioId = req.usuarioId; // Obtido do middleware de autenticação

    // Busca o post
    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    });

    // Verifica se o post existe
    if (!post) {
      return res.status(404).json({ erro: 'Publicação não encontrada' });
    }

    // Verifica se o usuário é o dono do post
    if (post.usuarioId !== usuarioId) {
      return res.status(403).json({ 
        erro: 'Você não tem permissão para editar esta publicação' 
      });
    }

    // Atualiza o post
    const postAtualizado = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        titulo,
        conteudo
      }
    });

    return res.json(postAtualizado);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao atualizar publicação' });
  }
};

/**
 * Remove uma publicação
 * @route DELETE /api/posts/:id
 * @param {number} req.params.id - ID do post
 * @param {number} req.usuarioId - ID do usuário autenticado (vindo do middleware de autenticação)
 * @returns {Object} Mensagem de sucesso
 */
exports.deletarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId; // Obtido do middleware de autenticação

    // Busca o post
    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    });

    // Verifica se o post existe
    if (!post) {
      return res.status(404).json({ erro: 'Publicação não encontrada' });
    }

    // Verifica se o usuário é o dono do post
    if (post.usuarioId !== usuarioId) {
      return res.status(403).json({ 
        erro: 'Você não tem permissão para deletar esta publicação' 
      });
    }

    // Deleta o post
    await prisma.post.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json({ mensagem: 'Publicação deletada com sucesso' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao deletar publicação' });
  }
}; 