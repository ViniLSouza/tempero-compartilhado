import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import './CriarPost.css';

const CriarPost = ({ navigate }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const postData = {
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        usuario_id: user.id,
        data_criacao: new Date().toISOString()
      };

      await apiService.post('/posts', postData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setError('Erro ao criar post. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="criar-post-container">
      <div className="criar-post-content">
        <div className="criar-post-card">
          <div className="criar-post-header">
            <div className="brand">
              <span role="img" aria-label="pimenta">🌶️</span> Tempero Compartilhado
            </div>
            <h1>Nova Publicação</h1>
            <p>Compartilhe sua receita com a comunidade</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="criar-post-form" onSubmit={handleSubmit}>
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
                placeholder="Digite o título da sua receita"
              />
              <div className="character-count">
                {formData.titulo.length}/100 caracteres
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="conteudo">
                Conteúdo <span className="required-star">*</span>
              </label>
              <textarea
                id="conteudo"
                name="conteudo"
                value={formData.conteudo}
                onChange={handleChange}
                required
                rows={10}
                className="form-control"
                placeholder="Descreva os ingredientes e o modo de preparo..."
              />
            </div>

            <div className="action-buttons">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="draft-button"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="publish-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CriarPost; 