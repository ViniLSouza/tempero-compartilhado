/**
 * Serviço de API centralizado para gerenciar todas as requisições HTTP da aplicação
 * Importa a URL base da API definida nas constantes
 */
import { API_URL } from '../utils/constants';

/**
 * Função auxiliar que verifica e processa a resposta da API
 * @param {Response} response - Objeto de resposta do fetch
 * @throws {Error} Lança um erro se a resposta não for bem-sucedida
 * @returns {Promise<any>} Dados da resposta em formato JSON
 */
const checkResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }
  return response.json();
};

/**
 * Recupera o token de autenticação do localStorage
 * @returns {string|null} Token de autenticação ou null se não existir
 */
const getAuthToken = () => localStorage.getItem('token');

/**
 * Gera os headers padrão para as requisições, incluindo o token de autenticação
 * @returns {Object} Headers para as requisições HTTP
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Objeto que contém todos os métodos de requisição HTTP da aplicação
 */
export const apiService = {
  /**
   * Realiza uma requisição GET
   * @param {string} endpoint - Endpoint da API
   * @returns {Promise<any>} Dados da resposta
   */
  async get(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: getAuthHeaders()
    });
    return checkResponse(response);
  },

  /**
   * Realiza uma requisição POST
   * @param {string} endpoint - Endpoint da API
   * @param {Object} data - Dados a serem enviados no corpo da requisição
   * @returns {Promise<any>} Dados da resposta
   */
  async post(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return checkResponse(response);
  },

  /**
   * Realiza uma requisição PUT
   * @param {string} endpoint - Endpoint da API
   * @param {Object} data - Dados a serem enviados no corpo da requisição
   * @returns {Promise<any>} Dados da resposta
   */
  async put(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return checkResponse(response);
  },

  /**
   * Realiza uma requisição DELETE
   * @param {string} endpoint - Endpoint da API
   * @returns {Promise<any>} Dados da resposta
   */
  async delete(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return checkResponse(response);
  },

  /**
   * Realiza upload de arquivos
   * @param {string} endpoint - Endpoint da API
   * @param {File} file - Arquivo a ser enviado
   * @returns {Promise<any>} Dados da resposta
   */
  async uploadFile(endpoint, file) {
    const formData = new FormData();
    formData.append('imagem', file);

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: formData
    });
    return checkResponse(response);
  }
}; 