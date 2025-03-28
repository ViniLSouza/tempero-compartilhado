# 🌶️ Tempero Compartilhado - Frontend

Interface moderna e responsiva para a plataforma de compartilhamento de receitas.

## 📋 Sobre o Frontend

O frontend do Tempero Compartilhado foi desenvolvido com React e Vite, focando em performance, usabilidade e experiência do usuário. A interface combina um design moderno com funcionalidades intuitivas para criar uma experiência agradável de compartilhamento de receitas.

## 🎯 Funcionalidades Principais

### 🔐 Autenticação e Perfil
- **Sistema Completo de Autenticação**
  - Login seguro com validações
  - Registro de novos usuários
  - Recuperação de senha
  - Tokens JWT com refresh
  - Persistência de sessão

- **Gerenciamento de Perfil**
  - Upload de foto com preview
  - Edição de dados pessoais
  - Alteração de senha segura
  - Preferências do usuário
  - Histórico de atividades

### 📝 Gerenciamento de Posts
- **Criação e Edição**
  - Editor rico de texto
  - Upload de múltiplas imagens
  - Preview em tempo real
  - Salvamento automático
  - Tags e categorias

- **Visualização**
  - Layout responsivo
  - Lazy loading de imagens
  - Paginação infinita
  - Filtros e busca
  - Ordenação flexível

### 💬 Interação Social
- **Sistema de Comentários**
  - Comentários em tempo real
  - Edição e exclusão
  - Respostas aninhadas
  - Notificações
  - Moderação

- **Engajamento**
  - Curtidas com animação
  - Compartilhamento
  - Salvamento de posts
  - Seguir usuários
  - Feed personalizado

## 🛠️ Tecnologias e Ferramentas

### Core
- **React** ^19.0.0 - Biblioteca UI
- **Vite** ^6.2.0 - Build tool
- **React Router** ^7.4.0 - Navegação
- **Context API** - Gerenciamento de estado

### Estilização
- **CSS Modules** - Estilos componentizados
- **CSS Variables** - Design system
- **CSS Grid/Flexbox** - Layouts responsivos
- **Animações CSS** - Transições suaves

### Desenvolvimento
- **ESLint** ^9.21.0 - Linting
- **TypeScript** - Tipagem
- **React Hooks** - Lógica de componentes
- **Axios** - Requisições HTTP

## 📦 Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── UI/             # Componentes de interface
│   ├── Forms/          # Componentes de formulário
│   └── Layout/         # Componentes de layout
├── contexts/           # Contextos React
│   ├── AuthContext/    # Contexto de autenticação
│   └── ThemeContext/   # Contexto de tema
├── hooks/              # Hooks customizados
├── pages/              # Páginas da aplicação
├── services/           # Serviços e APIs
├── styles/             # Estilos globais
├── utils/              # Utilitários
└── types/              # Tipagens TypeScript
```

## 🎨 Design System

### Cores
```css
:root {
  --primary: #FF6B6B;
  --primary-dark: #FF5252;
  --secondary: #4ECDC4;
  --background: #F8F9FA;
  --text: #343A40;
  --error: #DC3545;
  --success: #28A745;
}
```

### Tipografia
- **Família**: Sistema padrão otimizada
- **Tamanhos**: 12px, 14px, 16px, 18px, 20px, 24px
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Espaçamento
- **Grid**: 4px (base unit)
- **Margins**: 8px, 16px, 24px, 32px, 48px
- **Paddings**: 8px, 16px, 24px, 32px
- **Gaps**: 8px, 16px, 24px

### Breakpoints
```css
--mobile: 320px
--tablet: 768px
--desktop: 1024px
--large: 1440px
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js >= 14
- npm ou yarn
- Backend rodando

### Instalação
```bash
# Clone o repositório
git clone https://github.com/ViniLSouza/tempero-compartilhado.git
cd tempero-compartilhado/Front-End

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env conforme necessário

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📱 Responsividade

### Mobile First
- Layouts adaptáveis
- Touch targets adequados
- Gestos touch
- Performance otimizada

### Breakpoints
- **< 768px**: Mobile
- **768px - 1024px**: Tablet
- **1024px - 1440px**: Desktop
- **> 1440px**: Large Desktop

## ⚡ Performance

### Otimizações
- Code splitting
- Lazy loading
- Memoização
- Debounce/Throttle
- Cache de requisições

### Métricas
- First Paint < 1s
- TTI < 3s
- Bundle size < 200kb
- Lighthouse > 90

## 🔒 Segurança

- Sanitização de inputs
- Proteção XSS
- CSRF tokens
- Validação de dados
- HTTP only cookies

## 🧪 Testes

### Unitários
- Jest
- React Testing Library
- Cobertura > 80%

### E2E
- Cypress
- Fluxos principais
- Relatórios

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint

# Testes
npm run test
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Convenções

### Commits
- feat: Nova feature
- fix: Correção de bug
- docs: Documentação
- style: Formatação
- refactor: Refatoração
- test: Testes
- chore: Tarefas

### Código
- ESLint config
- Prettier
- EditorConfig
- TypeScript strict

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

---

⭐ Se você gostou deste projeto, por favor, deixe uma estrela no GitHub!
