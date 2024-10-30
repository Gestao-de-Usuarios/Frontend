
# 🚀 Frontend - Sistema de Login e Gestão de Usuários

Este projeto é o frontend de um sistema de login e gestão de usuários, desenvolvido em React com Tailwind CSS. Para o funcionamento completo, o backend deve estar rodando conforme as instruções da documentação já disponível.

## 📋 Requisitos

- **Node.js** (v14.x ou superior)
- **npm** (geralmente instalado junto com o Node.js)
- **Backend em Flask** (instruções para rodar o backend já estão no README do backend)

## ⚙️ Passos para Rodar o Frontend

### 1. 🛠️ Clonar o Repositório

Clone o repositório para sua máquina local usando o seguinte comando:

```bash
git clone https://github.com/Gestao-de-Usuarios/Frontend.git
```

### 2. 📦 Instalar Dependências

Acesse a pasta do frontend e instale as dependências necessárias:

```bash
cd frontend
npm install
npm run build
```

### 3. 🎨 Configurar o Tailwind CSS

Certifique-se de que o Tailwind CSS está corretamente configurado no projeto. As dependências relacionadas já devem estar instaladas no comando anterior, mas o arquivo de configuração `tailwind.config.js` deve existir e estar corretamente configurado. Um exemplo básico seria:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  ],
  plugins: [],
}
```

### 4. ▶️ Rodar o Projeto

Para rodar o projeto em modo de desenvolvimento, execute:

Tenha certeza ter rodado o comando 'npm run build', comando feito para agora buildar o projetos e transformar o que antes eram dois projetos diferentes em um só, as rotas vão ser as mesmas.

Obs: os comando de npm devem estar apenas na pasta Frontend, apos ter finalizado os ajustes tanto no back quanto no front abra a pasta que contem ambos os arquivos para poder rodar como uma aplicação inteira.


### 5. 📂 Estrutura do Projeto

A estrutura do frontend é organizada da seguinte forma:

- `public/`: Arquivos públicos do React.
- `src/`: Diretório principal do código fonte.
  - `components/`: Contém os componentes reutilizáveis.
    - `login.jsx`: Componente da página de login.
    - `home.jsx`: Componente da página de home, onde são gerenciados os usuários cadastrados.
    - `forgot_password`: Componente de consulta de senhas perdidas.
    - `modais/`: Componentes de modal para alertas de sucesso, confirmação, e erro.

### 6. 🔀 Rotas

O projeto utiliza o **React Router** para gerenciar as rotas. As principais rotas são:

- `/login`: Página de login e cadastro.
- `/home`: Página de gerenciamento de usuários (disponível após login).


