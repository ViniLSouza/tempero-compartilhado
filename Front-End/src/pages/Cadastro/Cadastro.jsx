/**
 * Página de cadastro do blog
 * Permite que novos usuários criem suas contas
 */
import { useState } from "react"; 
import { useAuth } from "../../contexts/AuthContext";
import { validateCadastroForm } from "../../utils/validation";
import { formatTelefone } from "../../utils/formatters";
import { VALIDATION } from "../../utils/constants";
import "./Cadastro.css";

/**
 * Componente Cadastro
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.navigate - Função de navegação do React Router
 */
const Cadastro = ({ navigate }) => {
  // Hook de autenticação
  const { cadastrar } = useAuth();

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    bio: ""
  });

  // Estados para controle de erros e submissão
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  /**
   * Manipula as mudanças nos campos do formulário
   * @param {Event} e - Evento de mudança
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Aplica formatação específica para o telefone
    if (name === 'telefone') {
      const formattedTelefone = formatTelefone(value);
      setFormData({ ...formData, [name]: formattedTelefone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Limpar erros quando o usuário digita
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  /**
   * Manipula o envio do formulário
   * @param {Event} e - Evento de submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida os dados do formulário
    const errors = validateCadastroForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Dados a serem enviados para a API
        const dadosParaEnvio = {
          nome: formData.nome.trim(),
          email: formData.email.trim(),
          telefone: formData.telefone,
          senha: formData.senha,
          bio: formData.bio.trim() || ""
        };

        // Usa o serviço de autenticação para cadastrar o usuário
        await cadastrar(dadosParaEnvio);
        
        // Atualiza o estado para mostrar a mensagem de sucesso
        setCadastroSucesso(true);
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          senha: "",
          confirmarSenha: "",
          bio: ""
        });
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        
        // Tratamento de erros específicos
        if (error.message === "Email já cadastrado") {
          setFormErrors({ email: "Este email já está cadastrado" });
        } else {
          setFormErrors({ 
            submit: error.message || "Ocorreu um erro ao cadastrar. Tente novamente." 
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Renderiza a tela de sucesso após o cadastro
  if (cadastroSucesso) {
    return (
      <div className="cadastro-container">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Cadastro Realizado com Sucesso!</h2>
          <p>Bem-vindo ao Tempero Compartilhado! Sua conta foi criada e você já pode fazer login para começar a compartilhar suas receitas.</p>
          <div className="success-buttons">
            <button 
              onClick={() => navigate('/login')}
              className="primary-button"
            >
              Fazer Login
            </button>
            <button 
              onClick={() => setCadastroSucesso(false)} 
              className="secondary-button"
            >
              Voltar ao Cadastro
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Renderiza o formulário de cadastro
  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <div className="brand">
            <span role="img" aria-label="pimenta">🌶️</span> Tempero Compartilhado
          </div>
          <h1>Criar Conta</h1>
          <p>Junte-se à nossa comunidade de criadores de conteúdo</p>
        </div>

        {/* Mensagem de erro geral */}
        {formErrors.submit && (
          <div className="error-message">{formErrors.submit}</div>
        )}

        <form className="cadastro-form" onSubmit={handleSubmit}>
          {/* Campo de nome */}
          <div className="form-group">
            <label htmlFor="nome">
              Nome <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className={`form-control ${formErrors.nome ? 'error' : ''}`}
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
            {formErrors.nome && <div className="field-error">{formErrors.nome}</div>}
          </div>

          {/* Campo de email */}
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required-star">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${formErrors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@email.com"
              required
            />
            {formErrors.email && <div className="field-error">{formErrors.email}</div>}
          </div>

          {/* Campo de telefone */}
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              className={`form-control ${formErrors.telefone ? 'error' : ''}`}
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              maxLength={VALIDATION.MAX_TELEFONE_LENGTH}
            />
            {formErrors.telefone && <div className="field-error">{formErrors.telefone}</div>}
          </div>

          {/* Campo de senha */}
          <div className="form-group">
            <label htmlFor="senha">
              Senha <span className="required-star">*</span>
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className={`form-control ${formErrors.senha ? 'error' : ''}`}
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres"
              required
            />
            {formErrors.senha && <div className="field-error">{formErrors.senha}</div>}
            <div className="password-strength">
              <div className="strength-bar">
                <div className={`strength-bar-fill ${
                  formData.senha.length === 0 ? '' :
                  formData.senha.length < 8 ? 'weak' :
                  formData.senha.length < 12 ? 'medium' : 'strong'
                }`} />
              </div>
              <span className="strength-text">
                {formData.senha.length === 0 ? 'Digite sua senha' :
                 formData.senha.length < 8 ? 'Senha fraca' :
                 formData.senha.length < 12 ? 'Senha média' : 'Senha forte'}
              </span>
            </div>
          </div>

          {/* Campo de confirmar senha */}
          <div className="form-group">
            <label htmlFor="confirmarSenha">
              Confirmar Senha <span className="required-star">*</span>
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              className={`form-control ${formErrors.confirmarSenha ? 'error' : ''}`}
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Digite a senha novamente"
              required
            />
            {formErrors.confirmarSenha && (
              <div className="field-error">{formErrors.confirmarSenha}</div>
            )}
          </div>

          {/* Campo de biografia */}
          <div className="form-group">
            <label htmlFor="bio">Sobre Você</label>
            <textarea
              id="bio"
              name="bio"
              className={`form-control ${formErrors.bio ? 'error' : ''}`}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Conte um pouco sobre você..."
              rows={4}
            />
            {formErrors.bio && <div className="field-error">{formErrors.bio}</div>}
          </div>

          {/* Botão de cadastro */}
          <button
            type="submit"
            className="cadastro-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        {/* Link para login */}
        <div className="login-link">
          Já tem uma conta?
          <a href="/login" onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}>
            Fazer Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cadastro; 