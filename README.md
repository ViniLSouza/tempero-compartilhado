# 🌶️ Tempero Compartilhado

Uma rede social para compartilhar e descobrir receitas deliciosas.

## 📋 Sobre o Projeto

O Tempero Compartilhado é uma plataforma onde os usuários podem compartilhar suas receitas favoritas, interagir com outros cozinheiros através de curtidas e comentários, e descobrir novas inspirações culinárias.

## 🚀 Funcionalidades

- 👤 Cadastro e autenticação de usuários
- 📝 Criação, edição e exclusão de posts
- ❤️ Sistema de curtidas
- 💬 Comentários em posts
- 🖼️ Upload de fotos de perfil
- 🔍 Visualização de posts de outros usuários

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js
- CSS3 com variáveis
- Fetch API para requisições HTTP

### Backend
- Node.js
- Express.js
- Prisma (ORM)
- MySQL
- JWT para autenticação
- Multer para upload de arquivos

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/tempero-compartilhado.git
```

2. Instale as dependências do backend:
```bash
cd projeto-blog
npm install
```

3. Instale as dependências do frontend:
```bash
cd my-app
npm install
```

4. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na pasta `projeto-blog` com as seguintes variáveis:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
```

5. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

6. Inicie o servidor backend:
```bash
npm run dev
```

7. Em outro terminal, inicie o frontend:
```bash
cd my-app
npm run dev
```

## 📁 Estrutura do Projeto

```
projeto-blog/          # Backend
├── src/
│   ├── config/       # Configurações
│   ├── controllers/  # Controladores
│   ├── middlewares/  # Middlewares
│   ├── routes/       # Rotas
│   └── uploads/      # Arquivos enviados
└── prisma/           # Schemas e migrações

my-app/               # Frontend
├── src/
│   ├── components/   # Componentes React
│   ├── contexts/     # Contextos
│   ├── pages/        # Páginas
│   ├── services/     # Serviços
│   └── utils/        # Utilitários
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [GitHub](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Agradeça aqui quem ajudou no projeto
- Mencione bibliotecas importantes utilizadas
- Etc... 