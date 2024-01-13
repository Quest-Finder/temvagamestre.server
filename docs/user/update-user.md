# Atualizar Usuário

## Descrição

Este Caso de Uso irá atualizar as informações do usuário.

## Endpoint

`PATCH /user`

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

O corpo da requisição **PODE** conter os seguintes campos:

- **firstName** (string): Nome atualizado do usuário.
- **lastName** (string): Sobrenome atualizado do usuário.
- **nickname** (string): Nickname atualizado do usuário.
- **phone** (string): Telefone atualizado do usuário.
- **dateOfBirth** (string): Data de nascimento do usuário no formato **_"MM-DD-YYYY"_**.

Exemplo:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "nickname": "john_dooe123",
  "phone": "11 9 9899 8899",
  "dateOfBirth": "12-31-2000"
}
```

## Caso de sucesso

- Valida se pelos um dos capos requeridos foi informado.
- Atualiza os dados do Usuário no DB.

### Resposta

- Código de status: **204 no-content**

## Casos de Exceção

### Respostas

- Código de status: **400 Bad Request**
  - Se nenhum campo requerido for informado.
  - Se o tipo do dado informado não for válido.
  - Se o client informar mais dados do que os requeridos.
- Código de status: **401 Unauthorized**
  - Se o cabeçalho de autorização estiver ausente ou inválido.
  - Se o token de autenticação for inválido ou expirado.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
