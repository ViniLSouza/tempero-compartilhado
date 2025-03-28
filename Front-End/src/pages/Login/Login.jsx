/**
 * Página de login do blog
 * Permite que usuários existentes acessem suas contas
 */
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

/**
 * Componente Login
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.navigate - Função de navegação do React Router
 */
const Login = ({ navigate }) => {
  // Hook de autenticação
  const { login } = useAuth();

  // Estados do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  /**
   * Manipula o envio do formulário de login
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, senha);
      navigate('/');
    } catch (error) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="brand">
            <span role="img" aria-label="pimenta">🌶️</span> Tempero Compartilhado
          </div>
          <h1>Bem-vindo de volta!</h1>
          <p>Entre na sua conta para continuar</p>
        </div>

        {/* Mensagem de erro */}
        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Campo de email */}
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required-star">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${error ? 'error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              required
            />
          </div>

          {/* Campo de senha */}
          <div className="form-group">
            <label htmlFor="senha">
              Senha <span className="required-star">*</span>
            </label>
            <input
              type="password"
              id="senha"
              className={`form-control ${error ? 'error' : ''}`}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <div className="forgot-password">
              <a href="#" onClick={(e) => { e.preventDefault(); /* TODO: Implementar recuperação de senha */ }}>
                Esqueceu a senha?
              </a>
            </div>
          </div>

          {/* Botão de login */}
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        {/* Link para cadastro */}
        <div className="register-link">
          Não tem uma conta?
          <a href="/cadastro" onClick={(e) => {
            e.preventDefault();
            navigate('/cadastro');
          }}>
            Criar Conta
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login; 