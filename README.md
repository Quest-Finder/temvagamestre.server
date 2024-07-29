<h1 align="center" style="font-weight: bold;">Tem Vaga Mestre - Server</h1>

<div align="center">
<img src="https://images2.imgbox.com/6a/7e/j0CcR3uU_o.png">

</br>
</br>
</div>

<p align="center">
  <a href="#introducao">Introdução 📄</a><br>
  <a href="#pastas">Estrutura de Pastas 📁</a><br>
  <a href="#descricao">Descrição dos Módulos 🖥️</a><br>
  <a href="#diagrama">Diagrama Entidade-Relacionamento (ER) 📚</a><br>
  <a href="#rodar">Instalar e rodar o projeto 🛠️</a><br>
</p>

---

<h2 id="pastas"> Estrutura de Pastas 📁</h2>

```plaintext
src
├── adapters
├── configs
├── contracts
├── controllers
├── decorators
├── entities
├── errors
├── factories
├── helpers
├── infra
├── middlewares
├── models
├── routes
├── seeds
├── shared
├── types
├── usecases
├── validators
├── webhook
├── app.module.ts
└── main.ts
```

---

<h2 id="descricao">Descrição dos Módulos</h2>

**Adapters 🔌**

Módulos que adaptam a interface de um componente para outro. Eles são responsáveis por traduzir dados e chamadas entre diferentes partes do sistema ou diferentes sistemas externos.

**Configs ⚙️**

Arquivos de configuração da aplicação, que podem incluir configurações de ambiente, variáveis de ambiente, e outros parâmetros globais necessários para a aplicação.

**Contracts 📜**

Interfaces e tipos que definem contratos entre diferentes partes do sistema. Esses contratos ajudam a manter a coerência e a tipagem estrita entre os módulos.

**Controllers 🕹️**

Gerenciam as requisições HTTP e encaminham para os serviços apropriados. Eles são responsáveis por lidar com as rotas da API e chamar os use cases (casos de uso) ou serviços necessários.

**Decorators 🎨**

Funções que adicionam comportamento a métodos ou classes. Eles são usados para aplicar metadados ou modificar o comportamento de funções ou classes de maneira declarativa.

**Entities 🏢**

Classes que representam as entidades do domínio da aplicação. Elas geralmente correspondem a tabelas no banco de dados e contêm a lógica de negócios relacionada a essas entidades.

**Errors ❗**

Definições de erros e exceções. Este módulo centraliza a gestão de erros customizados e suas mensagens.

**Factories 🏭**

Funções ou classes para criação de objetos complexos. As factories encapsulam a lógica de criação de objetos que podem ter múltiplos parâmetros ou dependências.

**Helpers 🛠️**

Funções utilitárias usadas em várias partes da aplicação. Helpers são funções genéricas que podem ser reutilizadas em diferentes módulos.

**Infra 🏗️**

Implementações de infraestrutura, como conexões de banco de dados, serviços externos, e outros detalhes técnicos que não fazem parte da lógica de negócios.

**Middlewares 🚧**

Funções que interceptam requisições antes de chegarem aos controllers. Eles são usados para autenticação, logging, validação de requisições, etc.

**Models 📊**

Definições de modelos de dados, que podem incluir esquemas de banco de dados, ORM (Object-Relational Mapping), e mapeamentos de entidades.

**Routes 🗺️**

Definições das rotas da aplicação. Este módulo pode organizar as rotas e associá-las aos controllers apropriados.

**Seeds 🌱**

Scripts para popular o banco de dados com dados iniciais ou de teste. São usados para criar dados padrões necessários para a aplicação iniciar corretamente.

**Shared 🔗**

Módulos e recursos compartilhados entre diferentes partes da aplicação. Este diretório pode conter funções, serviços, ou outros componentes reutilizáveis.

**Types 📝**

Definições de tipos TypeScript que são usados em toda a aplicação para garantir tipagem estática e consistência.

**Usecases 💼**

Lógica de negócios da aplicação. Este módulo contém a implementação dos casos de uso que encapsulam a lógica de negócio.

**Validators ✅**

Funções de validação de dados. Elas garantem que os dados estejam no formato correto antes de serem processados pela lógica de negócio.

**Webhook 🌐**

Endpoints para comunicação de webhook, que são usados para receber notificações ou dados de sistemas externos.

**app.module.ts 🗂️**

O módulo principal da aplicação que importa e configura os módulos necessários para a aplicação funcionar.

**main.ts 🚀**

O ponto de entrada da aplicação, onde o servidor é inicializado e a aplicação começa a escutar por requisições.

---

<h2 id="descricao">Diagrama Entidade-Relacionamento (ER) 📚</h2>

<img src="https://images2.imgbox.com/bc/4a/UhhOaGuJ_o.png">

---

<h2 id="rodar">Instalar e rodar o projeto 🛠️</h2>

Rodar o Tem Vaga Mestre em sua máquina local é uma tarefa extremamente simples.

### Dependências globais 🌍

Você precisa ter duas principais dependências instaladas:

- Node.js LTS v18 (ou qualquer versão superior)
- Docker Engine v17.12.0 com Docker Compose v1.29.2 (ou qualquer versão superior)

### Dependências locais 📦

Com o repositório clonado e as dependências globais instaladas, você pode instalar as dependências locais do projeto:

```bash
npm install
```

### Rodar o projeto ▶️

Para rodar o projeto localmente.

```bash
npm run dev
```

Isto irá automaticamente rodar serviços como Banco de dados (incluindo as Migrations), Mongo DB e irá expor um Serviço de API (Swagger e API) no seguinte endereço:

```bash
http://localhost:3000/api
```

Observações:

- Para derrubar todos os serviços, basta utilizar as teclas `CTRL+C`, que é o padrão dos terminais para matar processos.
- Você pode conferir o endereço dos outros serviços dentro do arquivo `docker-compose.yaml` na past `docker` projeto, como por exemplo o endereço e credenciais do Banco de Dados local.

---
