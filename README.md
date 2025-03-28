# 🌶️ Tempero Compartilhado

Uma plataforma moderna para compartilhar experiências culinárias, receitas e dicas de cozinha.

## 📋 Sobre o Projeto

O Tempero Compartilhado é uma aplicação web completa que permite aos usuários compartilharem suas receitas favoritas e interagirem com outros amantes da culinária. A plataforma oferece uma interface moderna e intuitiva, combinando as melhores práticas de desenvolvimento com uma experiência de usuário excepcional.

## 🏗️ Estrutura do Projeto

O projeto está dividido em duas partes principais:

### 🔙 Backend (Back-End)
- API REST construída com Node.js e Express
- Banco de dados PostgreSQL com Prisma ORM
- Autenticação segura com JWT
- Upload e gerenciamento de imagens
- Sistema completo de posts, comentários e curtidas
- Documentação detalhada das rotas
- Validações e tratamento de erros

### 🎨 Frontend (Front-End)
- Aplicação React moderna usando Vite
- Interface responsiva e amigável
- Sistema robusto de autenticação
- Gerenciamento de estado com Context API
- Upload e preview de imagens
- Feedback visual em tempo real
- Animações suaves e transições
- Design system consistente

## ⚙️ Requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn
- Espaço para upload de imagens

## 🚀 Configuração do Ambiente

### 1. Clone o Repositório
```bash
git clone https://github.com/ViniLSouza/tempero-compartilhado.git
cd tempero-compartilhado
```

### 2. Configure o Backend
```bash
cd Back-End
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações:
# DATABASE_URL="postgresql://user:password@localhost:5432/tempero_db"
# JWT_SECRET="sua_chave_secreta"
# PORT=3000

# Execute as migrações do banco de dados
npx prisma migrate dev
```

### 3. Configure o Frontend
```bash
cd ../Front-End
npm install

# Configure as variáveis de ambiente (se necessário)
cp .env.example .env
```

## 🎯 Executando o Projeto

### Backend
```bash
cd Back-End
npm run dev
```
O servidor estará disponível em `http://localhost:3000`

### Frontend
```bash
cd Front-End
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

## 💡 Funcionalidades

### 📝 Gerenciamento de Posts
- Criação de posts com título e conteúdo rico
- Edição e exclusão de posts próprios
- Upload de imagens para posts
- Sistema de curtidas e comentários
- Visualização de posts de outros usuários

### 💬 Sistema de Comentários
- Adição de comentários em posts
- Edição e exclusão de comentários próprios
- Expansão/contração da seção de comentários
- Notificações de novos comentários

### 👤 Perfil de Usuário
- Cadastro e autenticação seguros
- Edição completa do perfil
- Upload de foto de perfil
- Histórico de atividades
- Gerenciamento de preferências

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação e autorização
- **Multer** - Upload de arquivos
- **Cors** - Segurança de requisições
- **Bcrypt** - Criptografia de senhas

### Frontend
- **React** - Biblioteca UI
- **Vite** - Build tool e dev server
- **React Router** - Navegação
- **Context API** - Gerenciamento de estado
- **CSS Modules** - Estilização
- **Axios** - Cliente HTTP
- **React Icons** - Ícones
- **React Toastify** - Notificações

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
   ```bash
   git checkout -b feature/MinhaFeature
   ```
3. Commit suas mudanças
   ```bash
   git commit -m 'feat: Adiciona nova feature'
   ```
4. Push para a branch
   ```bash
   git push origin feature/MinhaFeature
   ```
5. Abra um Pull Request

## 📝 Convenções de Código

- **Commits:** Seguimos o padrão Conventional Commits
- **Código:** ESLint e Prettier para formatação
- **Branches:** feature/, hotfix/, bugfix/
- **Documentação:** JSDoc para documentação de código

## 🔒 Segurança

- Autenticação JWT
- Sanitização de inputs
- Proteção contra XSS
- Rate limiting
- Validação de dados
- Criptografia de senhas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📱 Responsividade

- Mobile First
- Breakpoints consistentes
- Adaptação de layout
- Touch-friendly
- Otimização de imagens

## ⚡ Performance

- Lazy loading de imagens
- Code splitting
- Caching otimizado
- Compressão de assets
- Otimização de bundle

## 🌐 Deploy

- Frontend: Vercel/Netlify
- Backend: Heroku/Railway
- Banco de dados: Railway
- Imagens: Amazon S3/Cloudinary

## 📞 Contato

Vinícius Souza (Desenvolvedor Frontend)
- GitHub: [@ViniLSouza](https://github.com/ViniLSouza)
- Repositório original do Frontend: [blog-front](https://github.com/ViniLSouza/blog-front)

Felipe Souza (Desenvolvedor Backend)
- GitHub: [@souza-felipe](https://github.com/souza-felipe)
- Repositório original do Backend: [projeto-blog](https://github.com/souza-felipe/projeto-blog)

> Este projeto é uma colaboração entre Vinícius (Frontend) e Felipe (Backend). Você pode conferir o início do desenvolvimento nos repositórios originais de cada desenvolvedor.

## 🔄 Status do Projeto

![GitHub last commit](https://img.shields.io/github/last-commit/ViniLSouza/tempero-compartilhado)
![GitHub issues](https://img.shields.io/github/issues/ViniLSouza/tempero-compartilhado)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ViniLSouza/tempero-compartilhado)
![GitHub stars](https://img.shields.io/github/stars/ViniLSouza/tempero-compartilhado)

---

⭐ Se você gostou deste projeto, por favor, deixe uma estrela no GitHub! 