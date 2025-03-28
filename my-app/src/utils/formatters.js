/**
 * Formata um número de telefone para o padrão (XX) XXXXX-XXXX enquanto o usuário digita
 * @param {string} value - O valor a ser formatado
 * @returns {string} - O telefone formatado
 */
export const formatTelefone = (value) => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, "");
  
  // Aplica a máscara conforme o usuário digita
  if (numbers.length <= 2) {
    return numbers.length ? `(${numbers}` : "";
  } else if (numbers.length <= 7) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
  } else {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`;
  }
}; 