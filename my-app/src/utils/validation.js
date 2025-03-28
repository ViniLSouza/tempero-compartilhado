/**
 * Módulo de validação de formulários
 * Contém funções para validar os formulários de cadastro e login
 */
import { VALIDATION, REGEX } from './constants';

/**
 * Valida o formulário de cadastro de usuário
 * @param {Object} formData - Dados do formulário
 * @param {string} formData.nome - Nome do usuário
 * @param {string} formData.email - Email do usuário
 * @param {string} formData.telefone - Telefone do usuário
 * @param {string} formData.bio - Biografia do usuário (opcional)
 * @param {string} formData.senha - Senha do usuário
 * @param {string} formData.confirmarSenha - Confirmação da senha
 * @returns {Object} Objeto contendo mensagens de erro para cada campo inválido
 */
export const validateCadastroForm = (formData) => {
  const errors = {};
  
  /**
   * Validação do campo Nome:
   * - Não pode estar vazio
   * - Deve respeitar o limite máximo de caracteres
   */
  if (!formData.nome.trim()) {
    errors.nome = "Por favor, digite seu nome";
  } else if (formData.nome.length > VALIDATION.MAX_NOME_LENGTH) {
    errors.nome = `O nome deve ter no máximo ${VALIDATION.MAX_NOME_LENGTH} caracteres`;
  }
  
  /**
   * Validação do campo Email:
   * - Não pode estar vazio
   * - Deve respeitar o limite máximo de caracteres
   * - Deve seguir o formato padrão de email
   */
  if (!formData.email.trim()) {
    errors.email = "Por favor, digite seu email";
  } else if (formData.email.length > VALIDATION.MAX_EMAIL_LENGTH) {
    errors.email = `O email deve ter no máximo ${VALIDATION.MAX_EMAIL_LENGTH} caracteres`;
  } else if (!REGEX.EMAIL.test(formData.email)) {
    errors.email = "Por favor, digite um email válido";
  }
  
  /**
   * Validação do campo Telefone:
   * - Opcional, mas se preenchido deve seguir o formato (XX) XXXXX-XXXX
   */
  if (formData.telefone.trim() && !REGEX.TELEFONE.test(formData.telefone)) {
    errors.telefone = "Por favor, use o formato (XX) XXXXX-XXXX";
  }
  
  /**
   * Validação do campo Bio (opcional):
   * - Se preenchido, deve respeitar o limite máximo de caracteres
   */
  if (formData.bio && formData.bio.length > VALIDATION.MAX_BIO_LENGTH) {
    errors.bio = `A biografia deve ter no máximo ${VALIDATION.MAX_BIO_LENGTH} caracteres`;
  }
  
  /**
   * Validação do campo Senha:
   * - Não pode estar vazio
   * - Deve ter um tamanho mínimo
   * - Deve ter um tamanho máximo
   * - Deve conter caracteres especiais conforme regex
   */
  if (!formData.senha) {
    errors.senha = "Por favor, digite sua senha";
  } else if (formData.senha.length < VALIDATION.MIN_SENHA_LENGTH) {
    errors.senha = `A senha deve ter pelo menos ${VALIDATION.MIN_SENHA_LENGTH} caracteres`;
  } else if (formData.senha.length > VALIDATION.MAX_SENHA_LENGTH) {
    errors.senha = `A senha deve ter no máximo ${VALIDATION.MAX_SENHA_LENGTH} caracteres`;
  } else if (!REGEX.SENHA.test(formData.senha)) {
    errors.senha = "A senha deve incluir letras maiúsculas, minúsculas, números e caracteres especiais";
  }
  
  /**
   * Validação da confirmação de senha:
   * - Deve ser igual à senha informada
   */
  if (!formData.confirmarSenha) {
    errors.confirmarSenha = "Por favor, confirme sua senha";
  } else if (formData.senha !== formData.confirmarSenha) {
    errors.confirmarSenha = "As senhas não correspondem";
  }
  
  return errors;
};

/**
 * Valida o formulário de login
 * @param {Object} formData - Dados do formulário
 * @param {string} formData.email - Email do usuário
 * @param {string} formData.senha - Senha do usuário
 * @returns {Object} Objeto contendo mensagens de erro para cada campo inválido
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  /**
   * Validação do campo Email:
   * - Não pode estar vazio
   */
  if (!formData.email.trim()) {
    errors.email = "Por favor, digite seu email";
  } else if (!REGEX.EMAIL.test(formData.email)) {
    errors.email = "Por favor, digite um email válido";
  }
  
  /**
   * Validação do campo Senha:
   * - Não pode estar vazio
   */
  if (!formData.senha) {
    errors.senha = "Por favor, digite sua senha";
  }
  
  return errors;
}; 