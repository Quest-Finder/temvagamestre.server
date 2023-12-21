# Middleware para Autenticação de Usuário

## Descrição

Este Middleware intercepta uma requisição para autenticar o usuário.

## Endpoints

Todos os endpoints que necessitam de autenticação.

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter:

- **accessToken** (string): Token de acesso gerado pelo **_Clerk_**

Exemplo:

```json
{
  "accessToken": "clerk_jwt_token"
}
```

## Caso de sucesso

- Valida se o **accessToken** é um token válido utilizando o **_Clerk_**
- Descriptografa o token
- Busca o usuário pelo id de usuário gerado pelo **_Clerk_**
- Adicionar no **headers** o **userId** referente ao id do usuário na tabela **_user_**

### Resposta

- Código de status: **200 Ok**
- Corpo da resposta: Um objeto com o ID do usuário.

Exemplo:

```json
{
  "userId": "any_user_id"
}
```

## Middleware Processado

Após o middleware ser executado, o cabeçalho de requisição será modificado da seguinte forma:

`GET /rota-protegida`

### Headers:

- **accessToken** (string): Token de autenticação do usuário.
- **userId** (string): Id do usuário.

## Casos de Exceção

- Código de status: **401 Unauthorized**
  - Se o cabeçalho de autorização estiver ausente ou inválido.
  - Se o token de autenticação for inválido ou expirado.
- Código de status: **403 Forbidden**
  - Se o usuário não tiver permissão de acessar a rota protegida.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
