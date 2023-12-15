# Atualizar Configurações do Usuário

## Endpoint

`POST /user/config`

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter um token de acesso:

- **accessToken** (string): Token de acesso gerado pelo **_Clerk_**

## Corpo da Requisição

O corpo da requisição deve conter os seguintes campos:

- **allowMessage** (boolean).

Exemplo:

```json
{
  "allowMessage": true
}
```

## Caso de sucesso

- Validar se o usuário tem um **_phone_** registrado
- Se ele não tiver um **_phone_** retorna um erro
- Caso ele tenha um **_phone_** cadastrado cria ou atualiza **_allow_message_** na tabela **user_config**
- Salva os dados no DB

### Resposta

- Código de status: **204 no-content**

## Casos de Exceção

### Respostas

- Código de status: **400 Bad Request**
  - Se o usuário não tiver um **_phone_** registrado.
  - Se o tipo do dado informado não for válido.
  - Se o client informar mais dados do que os requeridos.
- Código de status: **401 Unauthorized**
  - Se o cabeçalho de autorização estiver ausente ou inválido.
  - Se o token de autenticação for inválido ou expirado.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
