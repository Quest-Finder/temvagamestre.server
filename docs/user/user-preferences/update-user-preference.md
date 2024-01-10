# Atualizar Preferências do Usuário

## Endpoint

`PUT /user/preference`

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter um token de acesso:

- **x-access-token** (string): Token de acesso gerado pelo **_Clerk_**

Exemplo:

```json
{
  "x-access-token": "clerk_jwt_token"
}
```

## Corpo da Requisição

O corpo da requisição deve conter um dos campos:

- **frequency** (string): daily | weekly | monthly
- **activeType** (string): player | gameMaster

Exemplo:

```json
{
  "frequency": "daily",
  "activeType": "weekly"
}
```

## Caso de sucesso

- Valida se o usuário já tem a relação **preferences**
- Caso tenha atualiza a relação
- Salva os dados no DB

### Resposta

- Código de status: **204 no-content**

## Casos de Exceção

### Respostas

- Código de status: **400 Bad Request**
  - Se o tipo do dado informado não for válido.
  - Se o client informar mais dados do que os requeridos.
  - Se a relação não existir.
- Código de status: **401 Unauthorized**
  - Se o cabeçalho de autorização estiver ausente ou inválido.
  - Se o token de autenticação for inválido ou expirado.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
