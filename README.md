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

### Pré-requisitos
- Node.js 18+
- npm
- Docker (opcional)

### Clonando o repositório
git clone https://github.com/seu-usuario/horizonte-do-saber-frontend.git
cd horizonte-do-saber-frontend

### Instalação das dependências
npm install

### Variáveis de ambiente
VITE_API_URL=http://localhost:3001

### Executando em desenvolvimento
npm run dev
http://localhost:5173

---

## 🐳 Docker

docker build -t horizonte-do-saber-frontend .
docker run -p 3000:80 horizonte-do-saber-frontend

---

## 🏗️ Arquitetura

src/
pages/
services/
contexts/
components/
App.tsx
main.tsx

---

## 🔐 Autenticação
Gerenciada via Context API com persistência em localStorage.

---

## 🌐 Integração com Backend
Comunicação REST via Axios.

---

## 📖 Guia de Uso

Aluno:
- Visualiza postagens

Professor:
- Login
- Criar, editar e excluir postagens

---

## 🔁 CI/CD
GitHub Actions com build e Docker.

---

## 📱 Responsividade
Layout responsivo para mobile e desktop.

---

## 📄 Licença
Projeto educacional.

---

## ✅ Status
Concluído