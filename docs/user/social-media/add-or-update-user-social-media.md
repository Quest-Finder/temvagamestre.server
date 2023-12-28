# Adicionar ou Atualizar Redes Sociais do Usuário

## Endpoint

`POST /user/social-media`

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter um token de acesso:

- **accessToken** (string): Token de acesso gerado pelo **_Clerk_**

## Corpo da Requisição

O corpo da requisição deve conter os seguintes campos:

- **socialMediaId** (string): O ID da rede social.
- **link** (string): O @ do usuário ou uma url de seu perfil na rede social.

Exemplo:

```json
{
  "socialMediaId": "1234",
  "link": "any-user"
}
```

## Caso de sucesso

- Validar se o **_socialMediaId_** existe
- Valida se o usuário já tem relação com esta **social-media**
- Caso tenha atualiza esta relação, caso não tenha cria uma nova relação
- Salva os dados no DB

### Resposta

- Código de status: **204 no-content**

## Casos de Exceção

### Respostas

- Código de status: **400 Bad Request**
  - Se **_socialMediaId_** não existir.
  - Se o tipo do dado informado não for válido.
  - Se o client informar mais dados do que os requeridos.
  - Se **_socialMediaId_** não for um UUID
- Código de status: **401 Unauthorized**
  - Se o cabeçalho de autorização estiver ausente ou inválido.
  - Se o token de autenticação for inválido ou expirado.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
