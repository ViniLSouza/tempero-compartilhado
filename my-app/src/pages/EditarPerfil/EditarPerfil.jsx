import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import { validateCadastroForm } from '../../utils/validation';
import { VALIDATION, REGEX } from '../../utils/constants';
import './EditarPerfil.css';
import { authService } from '../../services/authService';

// URL base do servidor backend
const API_BASE_URL = 'http://localhost:3000';

// Imagem padrão em base64 (círculo cinza com ícone de usuário)
const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIxMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMTAwIDEwNUM4NS4wMzggMTA1IDczIDkyLjk2MiA3MyA3OEM3MyA2My4wMzggODUuMDM4IDUxIDEwMCA1MUMxMTQuOTYyIDUxIDEyNyA2My4wMzggMTI3IDc4QzEyNyA5Mi45NjIgMTE0Ljk2MiAxMDUgMTAwIDEwNVoiIGZpbGw9IiM5NDk0OTQiLz48cGF0aCBkPSJNMTAwIDExMkM2NS4yIDExMiAzNyAxMjcuMiAzNyAxNDZWMTYxSDE2M1YxNDZDMTYzIDEyNy4yIDEzNC44IDExMiAxMDAgMTEyWiIgZmlsbD0iIzk0OTQ5NCIvPjwvc3ZnPg==';

const EditarPerfil = ({ navigate }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [modalError, setModalError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nome: user.nome || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erros quando o usuário digita
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      const response = await apiService.uploadFile('/usuarios/profile-image', selectedImage);

      if (response.usuario) {
        updateUser(response.usuario);
        setSuccess('Foto de perfil atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setError('Erro ao fazer upload da imagem. Por favor, tente novamente.');
    }
  };

  const handlePasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const validateSenha = (senha) => {
    if (!senha) return null;
    
    if (senha.length < VALIDATION.MIN_SENHA_LENGTH) {
      return `A senha deve ter pelo menos ${VALIDATION.MIN_SENHA_LENGTH} caracteres`;
    }
    
    if (senha.length > VALIDATION.MAX_SENHA_LENGTH) {
      return `A senha deve ter no máximo ${VALIDATION.MAX_SENHA_LENGTH} caracteres`;
    }
    
    if (!REGEX.SENHA.test(senha)) {
      return "A senha deve incluir letras maiúsculas, minúsculas, números e caracteres especiais";
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setModalError('');
    setFormErrors({});

    // Validações específicas para edição de perfil
    const errors = {};
    
    // Validação do nome
    if (!formData.nome.trim()) {
      errors.nome = "Por favor, digite seu nome";
    } else if (formData.nome.length > VALIDATION.MAX_NOME_LENGTH) {
      errors.nome = `O nome deve ter no máximo ${VALIDATION.MAX_NOME_LENGTH} caracteres`;
    }

    // Validação do email
    if (!formData.email.trim()) {
      errors.email = "Por favor, digite seu email";
    } else if (formData.email.length > VALIDATION.MAX_EMAIL_LENGTH) {
      errors.email = `O email deve ter no máximo ${VALIDATION.MAX_EMAIL_LENGTH} caracteres`;
    } else if (!REGEX.EMAIL.test(formData.email)) {
      errors.email = "Por favor, digite um email válido";
    }

    // Validação da senha (se fornecida)
    if (formData.senha) {
      const senhaError = validateSenha(formData.senha);
      if (senhaError) {
        errors.senha = senhaError;
      }
    }

    // Validação da confirmação de senha
    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      errors.confirmarSenha = "As senhas não correspondem";
    }

    // Se houver erros, exibe-os
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setShowPasswordModal(true);
  };

  const handleConfirmUpdate = async () => {
    setIsSubmitting(true);
    setModalError('');

    try {
      // Primeiro, tenta fazer login com a senha atual
      const loginResponse = await apiService.post('/usuarios/login', {
        email: user.email,
        senha: currentPassword
      });

      // Se chegou aqui, significa que a senha está correta
      // Se a senha estiver incorreta, o catch vai capturar o erro
      const updateData = {
        nome: formData.nome,
        email: formData.email
      };

      if (formData.senha) {
        updateData.senha = formData.senha;
      }

      const response = await apiService.put(`/usuarios/${user.id}`, updateData);
      
      // Atualiza o usuário no contexto
      if (response.data) {
        updateUser(response.data);
      }

      setSuccess('Perfil atualizado com sucesso!');
      setShowPasswordModal(false);
      setCurrentPassword('');

      // Se houver uma nova imagem selecionada, faz o upload
      if (selectedImage) {
        await handleImageUpload();
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      if (error.response?.status === 401) {
        setModalError('Senha atual incorreta. Por favor, tente novamente.');
      } else {
        setModalError('Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editar-perfil-container">
      <div className="editar-perfil-content">
        <div className="editar-perfil-card">
          <div className="editar-perfil-header">
            <div className="brand">
              <span role="img" aria-label="pimenta">🌶️</span> Tempero Compartilhado
            </div>
            <h1>Editar Perfil</h1>
            <p>Atualize suas informações pessoais</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="editar-perfil-form">
            {/* Seção de foto de perfil */}
            <div className="profile-image-section">
              <div className="profile-image-container">
                <img 
                  src={imagePreview || (user?.foto ? `${API_BASE_URL}${user.foto}` : DEFAULT_AVATAR)} 
                  alt="Foto de perfil" 
                  className="profile-image" 
                />
                <label className="profile-image-upload">
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">Alterar foto</div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <p className="profile-image-hint">Clique na foto para alterar • JPG, PNG ou GIF</p>
            </div>

            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`form-control ${formErrors.nome ? 'error' : ''}`}
                required
              />
              {formErrors.nome && <div className="field-error">{formErrors.nome}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${formErrors.email ? 'error' : ''}`}
                required
              />
              {formErrors.email && <div className="field-error">{formErrors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="senha">Nova Senha (opcional)</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className={`form-control ${formErrors.senha ? 'error' : ''}`}
                placeholder="Mínimo 6 caracteres"
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

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className={`form-control ${formErrors.confirmarSenha ? 'error' : ''}`}
                placeholder="Digite a senha novamente"
              />
              {formErrors.confirmarSenha && (
                <div className="field-error">{formErrors.confirmarSenha}</div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate('/')}
              >
                Voltar
              </button>
              <button
                type="submit"
                className="save-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmação de senha */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirmar Alterações</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword('');
                  setModalError('');
                }}
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Por favor, digite sua senha atual para confirmar as alterações:</p>
              <div className="form-group">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                  placeholder="Senha atual"
                  required
                />
              </div>
              {modalError && <div className="error-message">{modalError}</div>}
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword('');
                  setModalError('');
                }}
              >
                Cancelar
              </button>
              <button
                className="save-button"
                onClick={handleConfirmUpdate}
                disabled={isSubmitting || !currentPassword}
              >
                {isSubmitting ? 'Confirmando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarPerfil; 