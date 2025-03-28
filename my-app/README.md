# 🌶️ Tempero Compartilhado - Blog de Culinária

Uma plataforma para compartilhar receitas e experiências culinárias.

## 📋 Sobre o Projeto

O Tempero Compartilhado é uma aplicação web moderna que permite aos usuários compartilharem suas receitas favoritas, dicas culinárias e experiências na cozinha. A plataforma oferece uma interface intuitiva e responsiva, facilitando a interação entre os usuários.

### 🎯 Funcionalidades

- **Autenticação de Usuários**
  - Cadastro de novos usuários com validações
  - Login com email e senha
  - Recuperação de senha
  - Validação de força de senha

- **Publicações**
  - Criação de posts com título e conteúdo
  - Edição de publicações existentes
  - Exclusão de publicações com confirmação
  - Visualização de posts de outros usuários
  - Editor de texto rico para formatação
  - Contador de caracteres
  - Gradientes e efeitos visuais modernos

- **Perfil do Usuário**
  - Edição completa do perfil
  - Alteração de senha com validação
  - Confirmação de senha atual para mudanças
  - Histórico de publicações
  - Configurações da conta

- **Interação**
  - Sistema de curtidas com feedback visual
  - Comentários em publicações
  - Expansão de seção de comentários
  - Exclusão de comentários próprios
  - Animações suaves nas interações
  - Feedback visual em tempo real

## 🛠️ Tecnologias Utilizadas

- **Frontend**
  - React.js 18
  - CSS Moderno com variáveis
  - React Router v6
  - Context API
  - Axios para requisições HTTP
  - Animações CSS personalizadas

- **Backend**
  - Node.js
  - Express
  - PostgreSQL
  - JWT para autenticação
  - Bcrypt para criptografia

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- PostgreSQL

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ViniLSouza/blog-front.git
cd blog-front/my-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/      # Contextos React (Auth, Theme)
├── pages/         # Páginas da aplicação
│   ├── Home/      # Página principal
│   ├── Login/     # Autenticação
│   ├── Cadastro/  # Registro
│   └── EditarPerfil/ # Edição de perfil
├── services/      # Serviços e APIs
└── styles/        # Estilos globais
```

## 🎨 Design System

O projeto utiliza um design system consistente com as seguintes características:

- **Cores**
  - Primária: #FF6B6B
  - Fundo: #F8F9FA
  - Texto: #343A40
  - Erro: #DC3545
  - Cinzas: variações para hierarquia visual

- **Tipografia**
  - Fonte Principal: Sistema padrão
  - Tamanhos: xs (12px), sm (14px), base (16px), lg (18px), xl (20px)

- **Espaçamento**
  - Padding: 0.5rem, 1rem, 1.5rem, 2rem
  - Margin: 0.5rem, 1rem, 1.5rem, 2rem
  - Gap: 0.5rem, 1rem, 1.5rem

- **Bordas**
  - Raio: 4px, 8px, 12px
  - Espessura: 1px, 2px
  - Estados: normal, hover, focus, error

## 🔄 Atualizações Recentes

### Versão 1.2.0
- Implementado gradientes nos cards de posts
- Melhorada a interação com curtidas
- Adicionada expansão de comentários
- Aprimorada a estilização geral
- Implementadas animações suaves
- Melhorado o feedback visual das interações

---

⭐️ Se você gostou deste projeto, por favor, deixe uma estrela no GitHub!
