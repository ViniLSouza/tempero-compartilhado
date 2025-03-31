/**
 * Página principal do blog
 * Responsável por exibir, criar, editar e excluir posts
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import './Home.css';

// Imagem padrão em base64 (círculo cinza com ícone de usuário)
const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIxMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMTAwIDEwNUM4NS4wMzggMTA1IDczIDkyLjk2MiA3MyA3OEM3MyA2My4wMzggODUuMDM4IDUxIDEwMCA1MUMxMTQuOTYyIDUxIDEyNyA2My4wMzggMTI3IDc4QzEyNyA5Mi45NjIgMTE0Ljk2MiAxMDUgMTAwIDEwNVoiIGZpbGw9IiM5NDk0OTQiLz48cGF0aCBkPSJNMTAwIDExMkM2NS4yIDExMiAzNyAxMjcuMiAzNyAxNDZWMTYxSDE2M1YxNDZDMTYzIDEyNy4yIDEzNC44IDExMiAxMDAgMTEyWiIgZmlsbD0iIzk0OTQ5NCIvPjwvc3ZnPg==';

// URL base do servidor backend
const API_BASE_URL = 'http://localhost:3000';

/**
 * Componente Home
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.navigate - Função de navegação do React Router
 */
const Home = ({ navigate }) => {
  // Estados para gerenciamento de autenticação
  const { user, logout } = useAuth();

  // Estados para gerenciamento de posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [curtidas, setCurtidas] = useState({});
  const [comentarios, setComentarios] = useState({});
  const [comentariosExpandidos, setComentariosExpandidos] = useState({});
  const [novosComentarios, setNovosComentarios] = useState({});
  const [comentarioParaExcluir, setComentarioParaExcluir] = useState(null);
  const [modalExcluirComentarioAberto, setModalExcluirComentarioAberto] = useState(false);
  const [textareaFocado, setTextareaFocado] = useState(null);

  // Estados para o formulário de criação de post
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postError, setPostError] = useState('');

  // Estados para o seletor de emojis
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const MAX_CONTENT_LENGTH = 4000;

  // Estados para edição de post
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    titulo: '',
    conteudo: ''
  });

  // Estados para confirmação de exclusão
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const MAX_COMENTARIO_LENGTH = 1000;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  /**
   * Carrega os posts ao montar o componente
   */
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Busca todos os posts e suas curtidas da API
   */
  const fetchPosts = async () => {
    try {
      const response = await apiService.get('/posts');
      setPosts(response);
      
      // Buscar curtidas e comentários de cada post
      const curtidasMap = {};
      const comentariosMap = {};
      
      for (const post of response) {
        try {
          // Buscar curtidas
          const curtidasResponse = await apiService.get(`/curtidas/contar/${post.id}`);
          const verificarResponse = await apiService.get(`/curtidas/verificar/${post.id}`);
          curtidasMap[post.id] = {
            total: curtidasResponse.total,
            curtiu: verificarResponse.curtiu
          };

          // Buscar comentários
          const comentariosResponse = await apiService.get(`/comentarios/post/${post.id}`);
          comentariosMap[post.id] = comentariosResponse;
        } catch (error) {
          console.error(`Erro ao buscar dados do post ${post.id}:`, error);
          curtidasMap[post.id] = { total: 0, curtiu: false };
          comentariosMap[post.id] = [];
        }
      }
      
      setCurtidas(curtidasMap);
      setComentarios(comentariosMap);
      
      console.log('Posts recebidos:', response);
      console.log('Curtidas recebidas:', curtidasMap);
      console.log('Comentários recebidos:', comentariosMap);
    } catch (error) {
      setError('Erro ao carregar os posts');
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Realiza o logout do usuário e redireciona para a página de login
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * Manipula as mudanças nos campos do formulário de criação
   * @param {Event} e - Evento de mudança
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'conteudo' && value.length > MAX_CONTENT_LENGTH) {
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /**
   * Adiciona um emoji ao conteúdo do post
   * @param {string} emoji - Emoji selecionado
   */
  const handleEmojiClick = (emoji) => {
    const newContent = formData.conteudo + emoji;
    if (newContent.length <= MAX_CONTENT_LENGTH) {
      setFormData(prevState => ({
        ...prevState,
        conteudo: newContent
      }));
    }
    setShowEmojiPicker(false);
  };

  // Lista de emojis disponíveis
  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🌟', '🔥', '💡', '🌶️', '🍽️', '👨‍🍳', '🥘'];

  /**
   * Envia o formulário de criação de post
   * @param {Event} e - Evento de submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostError('');
    setIsSubmitting(true);

    try {
      const now = new Date();
      const postData = {
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        usuarioId: user.id,
        dataCriacao: now.toISOString()
      };

      console.log('Enviando post com data:', postData.dataCriacao);
      await apiService.post('/posts', postData);
      setFormData({ titulo: '', conteudo: '' });
      fetchPosts();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setPostError('Erro ao criar post. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Formata uma data para o formato brasileiro
   * @param {string} dateString - Data em formato ISO
   * @returns {string} Data formatada
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Data inválida';

      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);
    } catch (error) {
      console.error('Erro ao formatar data:', dateString, error);
      return 'Data inválida';
    }
  };

  /**
   * Inicia a edição de um post
   * @param {Object} post - Post a ser editado
   */
  const handleEdit = (post) => {
    setEditingPost(post);
    setEditFormData({
      titulo: post.titulo,
      conteudo: post.conteudo
    });
  };

  /**
   * Manipula as mudanças nos campos do formulário de edição
   * @param {Event} e - Evento de mudança
   */
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Envia as alterações do post para a API
   */
  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      await apiService.put(`/posts/${editingPost.id}`, editFormData);
      
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...editFormData }
          : post
      ));
      
      setEditingPost(null);
    } catch (error) {
      console.error('Erro ao editar post:', error);
      setError('Erro ao editar post. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia o processo de exclusão de um post
   * @param {Object} post - Post a ser excluído
   */
  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteConfirm(true);
  };

  /**
   * Confirma e realiza a exclusão do post
   */
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await apiService.delete(`/posts/${postToDelete.id}`);
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setShowDeleteConfirm(false);
      setPostToDelete(null);
      setEditingPost(null);
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      setError('Erro ao excluir post. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manipula a curtida de um post
   * @param {number} postId - ID do post
   */
  const handleLike = async (postId) => {
    try {
      const jaCurtiu = curtidas[postId]?.curtiu;
      
      if (jaCurtiu) {
        // Atualiza o estado otimisticamente
        setCurtidas(prevCurtidas => ({
          ...prevCurtidas,
          [postId]: {
            ...prevCurtidas[postId],
            curtiu: false,
            total: prevCurtidas[postId].total - 1
          }
        }));
        
        // Remove a curtida na API
        const response = await apiService.delete(`/curtidas/${postId}`);
        setCurtidas(prevCurtidas => ({
          ...prevCurtidas,
          [postId]: {
            ...prevCurtidas[postId],
            total: response.totalCurtidas
          }
        }));
      } else {
        // Atualiza o estado otimisticamente
        setCurtidas(prevCurtidas => ({
          ...prevCurtidas,
          [postId]: {
            ...prevCurtidas[postId],
            curtiu: true,
            total: prevCurtidas[postId].total + 1
          }
        }));
        
        // Adiciona a curtida na API
        const response = await apiService.post('/curtidas', { postId });
        setCurtidas(prevCurtidas => ({
          ...prevCurtidas,
          [postId]: {
            ...prevCurtidas[postId],
            total: response.totalCurtidas
          }
        }));
      }
    } catch (error) {
      console.error('Erro ao curtir post:', error);
      // Reverte o estado em caso de erro
      fetchPosts();
      setError('Erro ao curtir post. Por favor, tente novamente.');
    }
  };

  const handleComentar = async (postId, event) => {
    event.preventDefault();
    const comentario = novosComentarios[postId]?.trim();
    
    if (!comentario) return;

    try {
      const response = await apiService.post('/comentarios', {
        comentario,
        postId
      });

      // Atualiza o estado dos comentários com o novo comentário
      setComentarios(prev => ({
        ...prev,
        [postId]: [response, ...(prev[postId] || [])]
      }));

      // Limpa o campo de comentário
      setNovosComentarios(prev => ({
        ...prev,
        [postId]: ''
      }));

      // Remove o foco do textarea
      setTextareaFocado(null);
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const handleComentarioChange = (postId, value) => {
    if (value.length <= MAX_COMENTARIO_LENGTH) {
      setNovosComentarios(prev => ({
        ...prev,
        [postId]: value
      }));
    }
  };

  const handleTextareaInput = (e) => {
    const textarea = e.target;
    textarea.style.height = '44px';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const abrirModalExcluirComentario = (postId, comentarioId) => {
    setComentarioParaExcluir({ postId, comentarioId });
    setModalExcluirComentarioAberto(true);
  };

  const fecharModalExcluirComentario = () => {
    setModalExcluirComentarioAberto(false);
    setComentarioParaExcluir(null);
  };

  const handleDeletarComentario = async (postId, comentarioId) => {
    try {
      await apiService.delete(`/comentarios/${comentarioId}`);
      
      // Atualiza o estado dos comentários removendo o comentário excluído
      setComentarios(prev => ({
        ...prev,
        [postId]: prev[postId].filter(comentario => comentario.id !== comentarioId)
      }));

      fecharModalExcluirComentario();
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
      setError('Erro ao excluir comentário. Por favor, tente novamente.');
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length >= 2) {
      try {
        const response = await apiService.get(`/usuarios/buscar?nome=${term}`);
        setSearchResults(response);
        setShowSearchResults(true);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  return (
    <div className="home-container">
      {/* Cabeçalho com logo e menu do usuário */}
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="blog icon">🌶️</span> Tempero Compartilhado
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
            onFocus={() => setShowSearchResults(true)}
          />
          {showSearchResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((usuario) => (
                <div key={usuario.id} className="search-result-item">
                  <img 
                    src={usuario.foto ? `${API_BASE_URL}${usuario.foto}` : DEFAULT_AVATAR}
                    alt={`Foto de ${usuario.nome}`}
                    className="search-result-avatar"
                  />
                  <span className="search-result-name">{usuario.nome}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="user-menu">
          <img 
            src={user?.foto ? `${API_BASE_URL}${user.foto}` : DEFAULT_AVATAR} 
            alt="Foto de perfil" 
            className="user-profile-pic"
            onClick={() => navigate('/editar-perfil')}
          />
          <span className="welcome-message">Olá, {user?.nome?.split(' ')[0]}</span>
          <button className="edit-profile-button" onClick={() => navigate('/editar-perfil')}>
            Editar Perfil
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Seção de criação de post */}
        <section className="create-post-section">
          <form onSubmit={handleSubmit} className="post-form">
            <div className="form-group">
              <label htmlFor="titulo">
                Título <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                maxLength={100}
                className="form-control"
                placeholder="Título da sua publicação"
              />
            </div>

            <div className="form-group">
              <label htmlFor="conteudo">
                Conteúdo <span className="required-star">*</span>
              </label>
              <div className="textarea-container">
                <textarea
                  id="conteudo"
                  name="conteudo"
                  value={formData.conteudo}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="form-control"
                  placeholder="O que você quer compartilhar hoje?"
                />
                {/* Rodapé do textarea com contador de caracteres e botão de emoji */}
                <div className="textarea-footer">
                  <button 
                    type="button" 
                    className="emoji-button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    title="Adicionar emoji"
                    onMouseDown={(e) => e.preventDefault()} // Previne o onBlur do textarea
                  >
                    😊
                  </button>
                  <span className="character-count">
                    {formData.conteudo.length}/{MAX_CONTENT_LENGTH}
                  </span>
                </div>
                {/* Seletor de emojis */}
                {showEmojiPicker && (
                  <div 
                    className="emoji-picker"
                    onMouseDown={(e) => e.preventDefault()} // Previne o onBlur do textarea
                  >
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        className="emoji-option"
                        onClick={() => handleEmojiClick(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {postError && <div className="error-message">{postError}</div>}

            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </form>
        </section>

        {/* Seção de exibição de posts */}
        <section className="posts-section">
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-author">
                    <img 
                      src={post.usuario?.foto ? `${API_BASE_URL}${post.usuario.foto}` : DEFAULT_AVATAR}
                      alt={`Foto de perfil de ${post.usuario?.nome}`}
                      className="post-author-avatar"
                    />
                    <span>{post.usuario?.nome || 'Usuário Anônimo'}</span>
                  </div>
                  <div className="post-meta-right">
                    {post.usuarioId === user?.id && (
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(post)}
                        aria-label="Editar post"
                      >
                        ✏️
                      </button>
                    )}
                    <span>{formatDate(post.dataCriacao)}</span>
                  </div>
                </div>
                <h2 className="post-title">{post.titulo}</h2>
                <p className="post-content">{post.conteudo}</p>
                <div className="post-footer">
                  <button
                    className={`like-button ${curtidas[post.id]?.curtiu ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                    aria-label="Curtir post"
                  >
                    <span className="like-icon">
                      {curtidas[post.id]?.curtiu ? '❤️' : '🤍'}
                    </span>
                    <span className="like-count">{curtidas[post.id]?.total || 0}</span>
                  </button>
                </div>
                <div className="comentarios-section">
                  <div className="comentarios-header">
                    <h3>Comentários</h3>
                  </div>
                  
                  <div className="novo-comentario">
                    <div className="textarea-container">
                      <textarea
                        value={novosComentarios[post.id] || ''}
                        onChange={(e) => {
                          handleComentarioChange(post.id, e.target.value);
                          handleTextareaInput(e);
                        }}
                        placeholder="Adicione um comentário..."
                        onInput={handleTextareaInput}
                        onFocus={() => setTextareaFocado(post.id)}
                        onBlur={() => setTextareaFocado(null)}
                      />
                      {textareaFocado === post.id && (
                        <div className="textarea-footer">
                          <span className="character-count">
                            {(novosComentarios[post.id] || '').length}/{MAX_COMENTARIO_LENGTH}
                          </span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleComentar(post.id, e)}
                      disabled={!(novosComentarios[post.id] || '').trim()}
                    >
                      Comentar
                    </button>
                  </div>

                  <div className={`comentarios-lista ${comentariosExpandidos[post.id] ? 'expandido' : ''}`}>
                    {comentarios[post.id]?.map(comentario => (
                      <div key={comentario.id} className="comentario-item">
                        <div className="comentario-header">
                          <div className="comentario-autor">
                            <img 
                              src={comentario.usuario?.foto ? `${API_BASE_URL}${comentario.usuario.foto}` : DEFAULT_AVATAR}
                              alt={`Foto de perfil de ${comentario.usuario?.nome}`}
                              className="comentario-autor-avatar"
                            />
                            <span>{comentario.usuario?.nome}</span>
                          </div>
                          <span className="comentario-data">{formatDate(comentario.dataComentario)}</span>
                        </div>
                        <p className="comentario-texto">{comentario.comentario}</p>
                        {(comentario.usuarioId === user.id || post.usuarioId === user.id) && (
                          <button
                            className="deletar-comentario"
                            onClick={() => abrirModalExcluirComentario(post.id, comentario.id)}
                            title="Deletar comentário"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {comentarios[post.id]?.length > 3 && (
                    <button
                      className="ver-mais-comentarios"
                      onClick={() => toggleComentariosExpandidos(post.id)}
                    >
                      {comentariosExpandidos[post.id] ? 'Ver menos' : 'Ver mais comentários'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal de edição de post */}
      {editingPost && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Editar Publicação</h2>
              <button 
                className="close-button"
                onClick={() => setEditingPost(null)}
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="edit-titulo">
                  Título <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="edit-titulo"
                  name="titulo"
                  value={editFormData.titulo}
                  onChange={handleEditChange}
                  className="form-control"
                  placeholder="Título da publicação"
                  maxLength={100}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-conteudo">
                  Conteúdo <span className="required-star">*</span>
                </label>
                <textarea
                  id="edit-conteudo"
                  name="conteudo"
                  value={editFormData.conteudo}
                  onChange={handleEditChange}
                  className="form-control"
                  rows={6}
                  placeholder="Conteúdo da publicação"
                  required
                />
                <div className="character-count">
                  {editFormData.conteudo.length}/{MAX_CONTENT_LENGTH} caracteres
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
            <div className="modal-footer">
              <button 
                className="delete-button"
                onClick={() => handleDeleteClick(editingPost)}
                title="Excluir publicação"
              >
                Excluir
              </button>
              <div className="action-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => setEditingPost(null)}
                >
                  Cancelar
                </button>
                <button 
                  className="save-button"
                  onClick={handleEditSubmit}
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h2>Confirmar Exclusão</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setPostToDelete(null);
                }}
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja excluir esta publicação?</p>
              <p>Esta ação não pode ser desfeita.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setPostToDelete(null);
                }}
              >
                Cancelar
              </button>
              <button 
                className="delete-button"
                onClick={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão de comentário */}
      {modalExcluirComentarioAberto && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h2>Excluir Comentário</h2>
              <button className="close-button" onClick={fecharModalExcluirComentario}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja excluir este comentário?</p>
              <p>Esta ação não poderá ser desfeita.</p>
            </div>
            <div className="modal-footer">
              <div className="action-buttons">
                <button className="cancel-button" onClick={fecharModalExcluirComentario}>
                  Cancelar
                </button>
                <button 
                  className="delete-button"
                  onClick={() => comentarioParaExcluir && handleDeletarComentario(
                    comentarioParaExcluir.postId,
                    comentarioParaExcluir.comentarioId
                  )}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Tempero Compartilhado. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home; 