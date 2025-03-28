/**
 * Arquivo de constantes globais da aplicação
 * Contém URLs, limites de validação e expressões regulares
 */

/**
 * URL base da API
 * Utilizada para todas as requisições HTTP
 */
export const API_URL = "http://localhost:3000/api";

/**
 * Constantes para validação de campos do formulário
 * Define os limites máximos e mínimos para cada campo
 */
export const VALIDATION = {
  MAX_NOME_LENGTH: 100,     // Limite máximo de caracteres para o nome
  MAX_EMAIL_LENGTH: 100,    // Limite máximo de caracteres para o email
  MAX_TELEFONE_LENGTH: 15,  // Limite máximo de caracteres para o telefone
  MIN_SENHA_LENGTH: 6,      // Limite mínimo de caracteres para a senha
  MAX_SENHA_LENGTH: 50,     // Limite máximo de caracteres para a senha
  MAX_BIO_LENGTH: 500      // Limite máximo de caracteres para a biografia
};

/**
 * Expressões regulares para validação de campos
 * Define os padrões que cada campo deve seguir
 */
export const REGEX = {
  /**
   * Regex para validação de email
   * Aceita: letras, números, pontos, underscores e hífens antes do @
   * Requer um domínio válido após o @
   * Exemplo válido: usuario@dominio.com
   */
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,

  /**
   * Regex para validação de telefone
   * Formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
   * Exemplo válido: (11) 98765-4321
   */
  TELEFONE: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,

  /**
   * Regex para validação de senha
   * Requer:
   * - Pelo menos uma letra minúscula
   * - Pelo menos uma letra maiúscula
   * - Pelo menos um número
   * - Pelo menos um caractere especial (@$!%*?&)
   */
  SENHA: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
}; 