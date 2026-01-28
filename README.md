# FinTechX Intelligent Analytics API

## Visão Geral

A **FinTechX Intelligent Analytics API** é uma aplicação backend que permite realizar **consultas analíticas em linguagem natural** sobre um banco de dados relacional (MySQL – Northwind), utilizando **Modelos de Linguagem (LLMs)** para transformar perguntas humanas em **SQL seguro, validado e executável**.

O projeto foi desenvolvido como **desafio técnico**, com foco em arquitetura, segurança, clareza de código e capacidade de decisão técnica.

---

## Problema Resolvido

A FinTechX enfrenta dificuldades em:

* Extrair insights rapidamente a partir de dados
* Personalizar análises para clientes e times internos
* Reduzir complexidade técnica no acesso a informações

Esta API resolve esses pontos ao permitir que qualquer usuário faça perguntas como:

> "Quais são os produtos mais caros?"

E receba respostas diretas, confiáveis e auditáveis.

---

## Arquitetura da Solução

Fluxo principal:

1. Usuário envia uma pergunta em linguagem natural
2. A API constrói um **prompt com schema grounding** (schema real do banco)
3. Um **LLM (via OpenRouter)** gera a query SQL
4. A query passa por um **validador de segurança (SQL Validator)**
5. O SQL é executado no MySQL (read-only)
6. O resultado é retornado ao usuário

```
[ Client ]
    ↓
[ Fastify API ]
    ↓
[ Prompt + Schema ]
    ↓
[ LLM (OpenRouter) ]
    ↓
[ SQL Validator ]
    ↓
[ MySQL Northwind ]
```

---
### Diagrama de Arquitetura

```mermaid
flowchart TD
    Client[Client / Swagger / Postman]
    Controller[analytics.controller.ts]
    Service[analytics.service.ts]

    Prompt[prompt.ts]
    LLM[LLM via OpenRouter]
    SQLGen[sql.generator.ts]
    SQLValidator[sql.validator.ts]

    Executor[query.executor.ts]
    DB[(MySQL - Northwind)]

    Client -->|POST /analytics/query| Controller
    Controller --> Service

    Service --> Prompt
    Prompt --> LLM
    LLM --> SQLGen

    SQLGen --> SQLValidator
    SQLValidator -->|SQL válida| Executor
    SQLValidator -->|SQL inválida| Service

    Executor --> DB
    DB --> Executor
    Executor --> Service
    Service --> Controller
    Controller --> Client

---

## Tecnologias Utilizadas

* **Node.js + TypeScript**
* **Fastify** (API e performance)
* **MySQL** (Northwind Database)
* **OpenRouter** (LLM gratuito / open-source)
* **Swagger / OpenAPI** (documentação)
* **dotenv** (configuração segura)

---

## Segurança e Boas Práticas

### SQL Validator

Antes de qualquer execução no banco:

* Apenas `SELECT` é permitido
* `INSERT`, `UPDATE`, `DELETE`, `DROP`, etc são bloqueados
* `SELECT *` é proibido
* Múltiplas queries são bloqueadas
* Acesso a `INFORMATION_SCHEMA` é negado

### Schema Grounding (Anti‑Alucinação)

O schema real do banco é explicitamente informado ao LLM no prompt, evitando:

* Colunas inexistentes (ex: `UnitPrice`)
* Tabelas erradas
* SQL inválido

---

## LLM (OpenRouter)

O projeto utiliza o **OpenRouter**, que permite acesso a modelos open‑source gratuitos.

Modelo padrão:

```
meta-llama/llama-3.1-8b-instruct:free
```

A camada de LLM é **plugável**, podendo ser facilmente substituída por:

* OpenAI
* Azure OpenAI
* Anthropic

---

## Estrutura de Pastas

```
src/
 ├─ server.ts
 ├─ app.ts
 ├─ database/
 │   └─ query.executor.ts
 ├─ validators/
 │   └─ sql.validator.ts
 └─ modules/
     └─ analytics/
         ├─ analytics.routes.ts
         ├─ analytics.controller.ts
         ├─ analytics.service.ts
         ├─ prompt.ts
         └─ sql.generator.ts
```

---

## Como Executar o Projeto

### Pré‑requisitos

* Node.js 18+
* MySQL (acesso read‑only já fornecido)

### Variáveis de Ambiente

Crie um arquivo `.env`:

```
OPENROUTER_API_KEY=or-xxxxxxxxxxxxxxxx
```

---

### Instalação

```bash
npm install
npm run dev
```

---

## Documentação (Swagger)

Após subir a API:

**[http://localhost:3000/docs](http://localhost:3000/docs)**

Endpoint principal:

```
POST /analytics/query
```

### Exemplo de Request

```json
{
  "question": "Quais são os produtos mais caros?"
}
```

### Exemplo de Response

```json
{
  "question": "Quais são os produtos mais caros?",
  "sql": "SELECT product_name, list_price FROM products ORDER BY list_price DESC LIMIT 10",
  "result": [
    { "product_name": "Northwind Traders Chai", "list_price": "18.0000" }
  ]
}
```

##  Autor

**Anderson Willians Guedes Oliveira**
Desenvolvedor Back‑end | Node.js | APIs | Cloud | IA aplicada

---
