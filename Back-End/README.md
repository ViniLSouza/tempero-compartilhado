# 🌶️ Tempero Compartilhado - Backend

API robusta e escalável para a plataforma de compartilhamento de receitas.

## 📋 Sobre o Backend

O backend do Tempero Compartilhado foi desenvolvido com Node.js e Express, focando em segurança, performance e escalabilidade. A API oferece endpoints RESTful para todas as funcionalidades da plataforma, com autenticação JWT e validação de dados.

## 🎯 Funcionalidades Principais

### 🔐 Autenticação e Autorização
- **Sistema JWT Completo**
  - Geração de tokens
  - Refresh tokens
  - Blacklist de tokens
  - Rate limiting
  - Roles e permissões

- **Segurança**
  - Criptografia bcrypt
  - Validação de dados
  - Sanitização de inputs
  - Headers de segurança
  - CORS configurável

### 📝 API de Posts
- **CRUD Completo**
  - Criação com validação
  - Leitura paginada
  - Atualização parcial
  - Deleção lógica
  - Versionamento

- **Recursos**
  - Upload de imagens
  - Cache em memória
  - Busca avançada
  - Filtros dinâmicos
  - Ordenação flexível

### 👤 Gerenciamento de Usuários
- **Perfis**
  - CRUD completo
  - Avatares
  - Preferências
  - Histórico
  - Analytics

- **Relacionamentos**
  - Seguidores
  - Bloqueios
  - Notificações
  - Atividades
  - Timeline

### 💬 Sistema de Comentários
- **Funcionalidades**
  - Comentários aninhados
  - Edição com histórico
  - Moderação
  - Denúncias
  - Métricas

## 🛠️ Tecnologias e Ferramentas

### Core
- **Node.js** ^18.0.0
- **Express** ^4.18.0
- **PostgreSQL** ^14.0
- **TypeScript** ^5.0.0
- **Prisma** ^5.0.0

### Segurança
- **JWT** ^9.0.0
- **Bcrypt** ^5.1.0
- **Helmet** ^7.0.0
- **Express-rate-limit**
- **CORS**

### Desenvolvimento
- **ESLint**
- **Prettier**
- **Jest**
- **Supertest**
- **Swagger**

## 📦 Estrutura de Pastas

```
src/
├── config/             # Configurações
│   ├── database.ts     # Config do banco
│   ├── auth.ts        # Config de autenticação
│   └── app.ts         # Config da aplicação
├── controllers/        # Controladores
├── middlewares/       # Middlewares
├── models/            # Modelos do Prisma
├── routes/            # Rotas da API
├── services/          # Lógica de negócio
├── utils/             # Utilitários
└── types/             # Tipagens
```

## 🗄️ Estrutura do Banco

### Tabelas Principais
```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Comments
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT,
  post_id INTEGER REFERENCES posts(id),
  user_id INTEGER REFERENCES users(id),
  parent_id INTEGER REFERENCES comments(id),
  created_at TIMESTAMP
);
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js >= 18
- PostgreSQL >= 14
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/ViniLSouza/tempero-compartilhado.git
cd tempero-compartilhado/Back-End

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env conforme necessário

# Execute as migrations
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

## 📡 API Endpoints

### Autenticação
```
POST   /api/auth/register     # Registro
POST   /api/auth/login        # Login
POST   /api/auth/refresh      # Refresh token
POST   /api/auth/logout       # Logout
```

### Usuários
```
GET    /api/users            # Lista usuários
GET    /api/users/:id        # Detalhes do usuário
PUT    /api/users/:id        # Atualiza usuário
DELETE /api/users/:id        # Remove usuário
```

### Posts
```
GET    /api/posts            # Lista posts
POST   /api/posts            # Cria post
GET    /api/posts/:id        # Detalhes do post
PUT    /api/posts/:id        # Atualiza post
DELETE /api/posts/:id        # Remove post
```

### Comentários
```
GET    /api/posts/:id/comments    # Lista comentários
POST   /api/posts/:id/comments    # Adiciona comentário
PUT    /api/comments/:id          # Edita comentário
DELETE /api/comments/:id          # Remove comentário
```

## ⚡ Performance

### Otimizações
- Connection pooling
- Query caching
- Índices otimizados
- Compressão gzip
- Rate limiting

### Métricas
- Resposta < 100ms
- Throughput > 1000 req/s
- Uptime > 99.9%
- CPU < 70%
- Memória < 1GB

## 🔒 Segurança

### Medidas Implementadas
- Rate limiting por IP
- Validação de dados
- Sanitização de inputs
- Headers seguros
- CORS configurado
- Logs de auditoria
- Backups automáticos

### Práticas
- Secrets seguros
- Updates regulares
- Monitoramento
- Testes de penetração
- Revisão de código

## 🧪 Testes

### Unitários
- Controllers
- Services
- Utils
- Models
- Cobertura > 80%

### Integração
- API endpoints
- Autenticação
- Database
- Cache
- Queue

### E2E
- Fluxos completos
- Performance
- Stress testing
- Load testing

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test
npm run test:coverage

# Migrations
npm run migrate:dev
npm run migrate:prod

# Lint
npm run lint
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

## Últimas Atualizações

### Funcionalidades
- Adicionado suporte para fotos de perfil nos comentários
- Melhorada a integração com o frontend para exibição de fotos

### Documentação
- Adicionados comentários explicativos nos arquivos principais
- Melhorada a documentação das rotas e controllers 