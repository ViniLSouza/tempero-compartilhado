/**
 * Middleware de autenticação
 * Este middleware verifica se o usuário está autenticado antes de permitir
 * o acesso a rotas protegidas.
 * 
 * Processo:
 * 1. Extrai o token JWT do header Authorization
 * 2. Verifica se o token é válido
 * 3. Verifica se o usuário associado ao token existe
 * 4. Permite o acesso à rota ou retorna erro
 */

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

// Inicializa o cliente Prisma para comunicação com o banco de dados
const prisma = new PrismaClient();

/**
 * Middleware de autenticação
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função para passar para o próximo middleware/controlador
 */
module.exports = async (req, res, next) => {
  try {
    // Verifica se o header de autorização está presente
    const authHeader = req.headers.authorization;
    
    // Retorna erro 401 se não houver header de autorização
    if (!authHeader) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }
    
    // Divide o header em partes: "Bearer" e o token
    const parts = authHeader.split(' ');
    
    // Verifica se o header tem exatamente duas partes
    if (parts.length !== 2) {
      return res.status(401).json({ erro: 'Erro no formato do token' });
    }
    
    // Desestrutura as partes em scheme (deve ser "Bearer") e token
    const [scheme, token] = parts;
    
    // Verifica se o scheme é "Bearer" (case insensitive)
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ erro: 'Token mal formatado' });
    }
    
    // Verifica a validade do token JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      // Retorna erro 401 se o token for inválido ou estiver expirado
      if (err) {
        return res.status(401).json({ erro: 'Token inválido' });
      }
      
      // Busca o usuário pelo ID armazenado no token
      const usuario = await prisma.usuario.findUnique({
        where: { id: decoded.id }
      });
      
      // Retorna erro 401 se o usuário não existir mais
      if (!usuario) {
        return res.status(401).json({ erro: 'Usuário não encontrado' });
      }
      
      // Armazena o ID do usuário na requisição para uso nas rotas protegidas
      req.usuarioId = decoded.id;
      
      // Continua para o próximo middleware ou controlador
      return next();
    });
  } catch (erro) {
    // Log do erro e resposta de erro genérica
    console.error(erro);
    return res.status(500).json({ erro: 'Erro na autenticação' });
  }
}; 