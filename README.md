# 📚 Horizonte do Saber — Frontend

Este repositório contém o **frontend da aplicação Horizonte do Saber**, desenvolvido em **React com TypeScript**, responsável pela interface gráfica do sistema de postagens educacionais.

A aplicação permite que:
- **Alunos** visualizem e leiam postagens.
- **Professores** realizem login e tenham acesso à criação, edição e exclusão de postagens.

O frontend consome uma **API REST** desenvolvida separadamente (backend em outro repositório).

---

## 🛠️ Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- React Router DOM
- Context API
- Axios
- Docker
- Nginx
- GitHub Actions (CI/CD)

---

## ⚙️ Setup Inicial

### 🔹Pré-requisitos
- Node.js 18+
- npm
- Docker

### 1. Acessar o repositório com o backend e rodar o servidor
```bash
https://github.com/giupolub/horizonte-do-saber
```

### 2. Clonar o repositório
```bash
git clone https://github.com/giupolub/horizonte-do-saber-frontend.git
ou
git clone git@github.com:giupolub/horizonte-do-saber-frontend.git

cd horizonte-do-saber-frontend
```

### 3. Instalação das dependências
```bash
npm install
```

### 4. Criar um arquivo .env na raiz do projeto e colar o seguinte código:
```bash
VITE_API_URL=http://localhost:3000
```

### 5. Executar em desenvolvimento
```bash
npm run dev
http://localhost:5173
```

---

## 🐳 Execução com Docker

O projeto possui um Dockerfile com multi-stage build, utilizando Nginx para servir a aplicação em produção.

### 🔹Build da imagem
```bash
docker build -t horizonte-do-saber-frontend .
```

### 🔹Build da imagem
```bash
docker run -p 3001:80 horizonte-do-saber-frontend
```

---

## 🏗️ Arquitetura da Aplicação

A aplicação foi estruturada de forma modular, visando escalabilidade e organização.

```
src/
├── pages/            # Páginas da aplicação (Home, Post, Login, CreatePost)
├── services/         # Comunicação com a API (Axios)
├── contexts/         # Context API (Autenticação)
├── components/       # Componentes reutilizáveis (ex: PrivateRoute)
├── App.tsx           # Definição das rotas
└── main.tsx          # Ponto de entrada da aplicação
```

---

## 🔐 Autenticação e Autorização

- A autenticação é gerenciada via Context API.
- Usuários autenticados (professores):
  - Podem criar, editar e excluir postagens.
- Usuários não autenticados (alunos):
  - Têm acesso apenas à leitura das postagens.
O estado de autenticação é persistido no localStorage.

---

## 🌐 Integração com Backend

A comunicação com o backend é feita através de Axios, consumindo endpoints REST para:
- Listar postagens
- Buscar postagem por ID
- Criar postagem
- Editar postagem
- Excluir postagem

O endpoint base é configurado via variável de ambiente.

---

## 📖 Guia de Uso

👨‍🎓 Aluno:
- Acessa a página inicial
- Visualiza a lista de postagens
- Clica em um título para ler o conteúdo completo

👨‍🏫 Professor:
- Realiza login
- Acessa funcionalidades administrativas:
  - Criar nova postagem
  - Editar postagens existentes
  - Excluir postagens

---

## 🔁 CI/CD

O projeto utiliza GitHub Actions para integração contínua (CI).

📌 Pipeline executa automaticamente:
- Instalação das dependências
- Build da aplicação React
- Build da imagem Docker
O workflow está localizado em:
```
.github/workflows/ci.yml
```
Esse processo garante que o código esteja sempre funcional e pronto para produção.

---

## 📱 Responsividade
A aplicação foi desenvolvida com layout fluido e responsivo, garantindo boa experiência tanto em dispositivos móveis quanto em desktops.

---

## 📌 Relato de Experiência

Durante o desenvolvimento do projeto, os principais desafios enfrentados foram:
- Integração entre frontend e backend
- Gerenciamento de autenticação e controle de acesso
- Configuração de Docker para aplicações React com React Router
Esses desafios contribuíram para um aprendizado prático sobre arquitetura frontend, consumo de APIs REST e automação com CI/CD.

---

## ✅ Status
Concluído
