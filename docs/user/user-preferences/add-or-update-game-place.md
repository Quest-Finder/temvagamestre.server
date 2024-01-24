# Adicionar ou Atualizar Local de Jogo

## Endpoint

`POST /user/preference/game-place`

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

O corpo da requisição deve conter os seguintes campos:

- **online** (boolean)
- **inPerson** (boolean)
Exemplo:

```json
{
  "online": true,
  "inPerson": false
}
```

## Caso de sucesso

- Validar se o usuário tem a relação **preferences**
- Caso tenha, cria ou atualiza o campo **gamePlace** na relação
- Salva os dados no DB

### Resposta

- Código de status: **204 no-content**

## Casos de Exceção

### Respostas

- Código de status: **400 Bad Request**
  - Se a relação não existir.
  - Se o tipo do dado informado não for válido.
  - Se o client informar mais dados do que os requeridos.
- Código de status: **401 Unauthorized**
  - Se o cabeçalho de autorização estiver ausente ou inválido.
  - Se o token de autenticação for inválido ou expirado.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
