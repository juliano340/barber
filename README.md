# Barber Shop API

## Descrição

Esta é uma API para gerenciamento de barbearias, permitindo o cadastro de usuários, agendamentos de serviços, controle de cortes de cabelo e sistema de assinaturas.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- bcryptjs para criptografia de senhas

## Requisitos

- Node.js
- PostgreSQL
- NPM ou Yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/juliano340/barber.git
   cd barber
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/barber?schema=public"
   JWT_SECRET=sua_chave_secreta
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

## Estrutura do Projeto

```
├── prisma/               # Configurações do Prisma ORM
│   ├── migrations/       # Migrações do banco de dados
│   └── schema.prisma     # Schema do banco de dados
├── src/
│   ├── @types/           # Tipos personalizados
│   ├── controllers/      # Controladores da aplicação
│   │   ├── haircut/      # Controladores de cortes de cabelo
│   │   ├── schedule/     # Controladores de agendamentos
│   │   └── user/         # Controladores de usuários
│   ├── middlewares/      # Middlewares da aplicação
│   ├── prisma/           # Cliente Prisma
│   ├── services/         # Serviços da aplicação
│   ├── routes.ts         # Rotas da API
│   └── server.ts         # Configuração do servidor
└── package.json          # Dependências e scripts
```

## Modelos de Dados

### User
- Usuários do sistema (barbeiros/administradores)
- Gerenciam cortes de cabelo e serviços
- Podem ter assinaturas premium

### Subscription
- Assinaturas dos usuários
- Controle de status e pagamentos

### Haircut
- Modelos de cortes oferecidos
- Preços e disponibilidade

### Service
- Agendamentos de serviços
- Relaciona clientes, cortes e barbeiros

## Endpoints da API

### Usuários
- `POST /users` - Criar um novo usuário
- `POST /auth` - Autenticar usuário
- `GET /me` - Obter detalhes do usuário autenticado
- `PUT /users` - Atualizar dados do usuário

### Cortes de Cabelo
- `POST /haircuts` - Criar um novo corte
- `GET /haircuts` - Listar cortes disponíveis
- `PUT /haircuts` - Atualizar um corte
- `GET /haircuts/check` - Verificar assinatura
- `GET /haircuts/count` - Contar cortes cadastrados
- `GET /haircuts/detail` - Obter detalhes de um corte

### Agendamentos
- `POST /schedules` - Criar um novo agendamento
- `GET /schedules` - Listar agendamentos
- `DELETE /schedules` - Finalizar um agendamento

## Autenticação

A API utiliza autenticação JWT. Para acessar endpoints protegidos, é necessário incluir o token no header da requisição:

```
Authorization: Bearer seu_token_jwt
```

## Desenvolvimento

Para contribuir com o projeto:

1. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. Faça suas alterações e commit:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```

3. Envie para o repositório:
   ```bash
   git push origin feature/nova-funcionalidade
   ```

4. Abra um Pull Request

## Licença

ISC