import { apiService } from './apiService';

/**
 * Serviço para gerenciar autenticação de usuários
 */
export const authService = {
  /**
   * Realiza o cadastro de um novo usuário
   * @param {Object} userData - Dados do usuário (nome, email, telefone, senha, bio)
   * @returns {Promise} - Promise com a resposta da API
   */
  async cadastrar(userData) {
    try {
      const response = await apiService.post('/usuarios/cadastro', userData);
      return response;
    } catch (error) {
      console.error('Erro na requisição de cadastro:', error);
      throw error;
    }
  },
  
  /**
   * Realiza o login de um usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise} - Promise com a resposta da API
   */
  async login(email, senha) {
    try {
      const response = await apiService.post('/usuarios/login', { email, senha });
      
      if (!response.token) {
        throw new Error('O servidor não retornou dados de autenticação válidos');
      }
      
      this.setAuthData(response.token, response.usuario);
      return response.usuario;
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      throw error;
    }
  },
  
  /**
   * Realiza o logout do usuário
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },
  
  /**
   * Salva os dados de autenticação no localStorage
   * @param {string} token - Token JWT
   * @param {Object} usuario - Dados do usuário
   */
  setAuthData(token, usuario) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  },

  /**
   * Atualiza os dados do usuário no localStorage
   * @param {Object} usuario - Novos dados do usuário
   */
  setUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  },
  
  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  },
  
  /**
   * Obtém os dados do usuário logado
   * @returns {Object|null}
   */
  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },
  
  /**
   * Obtém o token de autenticação
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  }
}; 