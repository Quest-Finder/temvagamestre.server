# Listar redes sociais

## Endpoint

`GET /social-media`

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter um token de acesso:

- **accessToken** (string): Token de acesso gerado pelo **_Clerk_**

## Caso de sucesso

- Retornar lista de redes sociais

### Resposta

- Código de status: **200**

Corpo da resposta:

```json
[
  {
  "id": "1234",
  "name": "any-social-media"
}
]
```

## Casos de Exceção

### Respostas

- Código de status: **401 Unauthorized**
  - Se o cabeçalho de autorização estiver ausente ou inválido.
  - Se o token de autenticação for inválido ou expirado.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
