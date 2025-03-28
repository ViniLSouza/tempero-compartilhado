import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import Home from '../pages/Home/Home';
import CriarPost from '../pages/CriarPost/CriarPost';
import EditarPerfil from '../pages/EditarPerfil/EditarPerfil';

/**
 * Componente de roteamento simplificado
 */
const Router = () => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Atualizar a rota quando a URL mudar
    const handleRouteChange = () => {
      const path = window.location.pathname;
      setCurrentRoute(path);
    };

    // Verificar a rota inicial
    handleRouteChange();

    // Adicionar listener para capturar eventos de navegação
    window.addEventListener('popstate', handleRouteChange);

    // Remover listener quando o componente for desmontado
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Função para navegar entre as páginas
  const navigate = (path) => {
    window.history.pushState(null, '', path);
    setCurrentRoute(path);
  };

  // Renderizar o componente correto com base na rota atual
  const renderContent = () => {
    // Se não estiver autenticado, só pode acessar login e cadastro
    if (!isAuthenticated()) {
      switch (currentRoute) {
        case '/login':
          return <Login navigate={navigate} />;
        case '/cadastro':
          return <Cadastro navigate={navigate} />;
        default:
          // Redirecionar para login como página padrão para usuários não autenticados
          navigate('/login');
          return null;
      }
    }
    
    // Rotas para usuários autenticados
    switch (currentRoute) {
      case '/':
        return <Home navigate={navigate} />;
      case '/criar-post':
        return <CriarPost navigate={navigate} />;
      case '/editar-perfil':
        return <EditarPerfil navigate={navigate} />;
      default:
        navigate('/');
        return null;
    }
  };

  return renderContent();
};

export default Router; 