# Tempero Compartilhado 🌶️

Um blog colaborativo onde usuários podem compartilhar suas experiências culinárias, receitas e dicas de cozinha.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Backend (Back-End)
- API REST construída com Node.js e Express
- Banco de dados PostgreSQL com Prisma ORM
- Autenticação JWT
- Upload de imagens
- Sistema de posts, comentários e curtidas

### Frontend (Front-End)
- Aplicação React moderna usando Vite
- Interface responsiva e amigável
- Sistema de autenticação
- Gerenciamento de posts, comentários e curtidas
- Upload de imagens de perfil

## Requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/tempero-compartilhado.git
cd tempero-compartilhado
```

2. Configure o Backend:
```bash
cd Back-End
npm install
cp .env.example .env
# Edite o arquivo .env com suas configurações
npx prisma migrate dev
```

3. Configure o Frontend:
```bash
cd Front-End
npm install
```

## Executando o Projeto

### Backend
```bash
cd Back-End
npm run dev
```
O servidor backend estará rodando em `http://localhost:3000`

### Frontend
```bash
cd Front-End
npm run dev
```
A aplicação frontend estará rodando em `http://localhost:5173`

## Funcionalidades

### Posts
- Criação de posts com título e conteúdo
- Edição de posts próprios
- Exclusão de posts próprios
- Visualização de todos os posts
- Sistema de curtidas

### Comentários
- Adição de comentários em posts
- Exclusão de comentários próprios
- Visualização de comentários por post

### Perfil de Usuário
- Cadastro de usuários
- Login/Logout
- Edição de perfil
- Upload de foto de perfil

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- Multer para upload de arquivos

### Frontend
- React
- Vite
- Context API para gerenciamento de estado
- CSS Modules para estilização
- React Router para navegação

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Seu Nome - [@seu_twitter](https://twitter.com/seu_twitter) - email@exemplo.com

Link do Projeto: [https://github.com/ViniLSouza/tempero-compartilhado](https://github.com/ViniLSouza/tempero-compartilhado) 