/**
 * Contexto de Autenticação
 * Este arquivo é responsável por:
 * - Gerenciar o estado de autenticação da aplicação
 * - Fornecer funções para login, logout e registro
 * - Armazenar e gerenciar o token JWT
 * - Disponibilizar informações do usuário autenticado
 */
import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

/**
 * Contexto de autenticação
 * @type {React.Context}
 */
export const AuthContext = createContext(null);

/**
 * Hook personalizado para acessar o contexto de autenticação
 * @returns {Object} Objeto contendo o estado e funções de autenticação
 * @throws {Error} Se usado fora do AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

/**
 * Provedor do contexto de autenticação
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export const AuthProvider = ({ children }) => {
  // Estado do usuário autenticado
  const [user, setUser] = useState(null);
  
  // Estado de carregamento inicial
  const [loading, setLoading] = useState(true);
  
  /**
   * Efeito para carregar o usuário do localStorage ao montar o componente
   * Verifica se existe um usuário salvo e atualiza o estado
   */
  useEffect(() => {
    const loadUser = () => {
      const savedUser = authService.getUsuario();
      if (savedUser) {
        setUser(savedUser);
      }
      setLoading(false);
    };
    loadUser();
  }, []);
  
  /**
   * Realiza o login do usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise<Object>} Dados do usuário logado
   * @throws {Error} Se houver erro no login
   */
  const login = async (email, senha) => {
    try {
      const usuario = await authService.login(email, senha);
      setUser(usuario);
      return usuario;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };
  
  /**
   * Realiza o cadastro de um novo usuário
   * @param {Object} userData - Dados do usuário para cadastro
   * @returns {Promise<Object>} Resposta da API de cadastro
   * @throws {Error} Se houver erro no cadastro
   */
  const cadastrar = async (userData) => {
    try {
      const data = await authService.cadastrar(userData);
      return data;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  };
  
  /**
   * Realiza o logout do usuário
   * Remove os dados do localStorage e limpa o estado
   */
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  /**
   * Atualiza os dados do usuário no contexto e no localStorage
   * @param {Object} updatedUser - Novos dados do usuário
   */
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    authService.setUsuario(updatedUser);
  };
  
  /**
   * Verifica se existe um usuário autenticado
   * @returns {boolean} true se houver usuário autenticado, false caso contrário
   */
  const isAuthenticated = () => {
    return !!user;
  };
  
  /**
   * Valor do contexto que será disponibilizado para a aplicação
   * @type {Object}
   */
  const contextValue = {
    user,          // Dados do usuário atual
    loading,       // Estado de carregamento
    login,         // Função de login
    cadastrar,     // Função de cadastro
    logout,        // Função de logout
    isAuthenticated, // Função para verificar autenticação
    updateUser
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 