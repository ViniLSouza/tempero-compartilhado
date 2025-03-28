/**
 * Importação dos componentes e contextos necessários
 * AuthProvider: Provedor de contexto para gerenciamento de autenticação
 * Router: Componente responsável pelo roteamento da aplicação
 */
import { AuthProvider } from './contexts/AuthContext';
import Router from './routes/Router';

/**
 * Componente principal da aplicação
 * Envolve toda a aplicação com o AuthProvider para gerenciar o estado de autenticação
 * e renderiza o Router dentro de um container com a classe 'app'
 * @returns {JSX.Element} Retorna o componente App
 */
function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App; 