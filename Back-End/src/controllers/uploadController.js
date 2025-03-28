const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhuma imagem foi enviada' });
    }

    const imagemUrl = `/uploads/profile/${req.file.filename}`;
    
    // Atualiza a foto do usuário no banco de dados
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: req.usuarioId },
      data: { foto: imagemUrl },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        foto: true,
        criadoEm: true,
        atualizadoEm: true
      }
    });

    return res.json({
      mensagem: 'Imagem de perfil atualizada com sucesso',
      usuario: usuarioAtualizado
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao fazer upload da imagem' });
  }
};

exports.removerProfileImage = async (req, res) => {
  try {
    // Atualiza removendo a foto do usuário
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: req.usuarioId },
      data: { foto: null },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        foto: true,
        criadoEm: true,
        atualizadoEm: true
      }
    });

    return res.json({
      mensagem: 'Imagem de perfil removida com sucesso',
      usuario: usuarioAtualizado
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao remover imagem de perfil' });
  }
}; 