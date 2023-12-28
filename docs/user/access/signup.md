# Registro de Usuário

## Descrição

Este Caso de Uso irá receber um evento de Webhook enviado pelo Clerk quando um usuário se cadastrar.

## Endpoint

`POST /signup/webhook`

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter:

- **svix-id** (string): Id do Webhook.
- **svix-timestamp** (number): Data da geração do Webhook em segundos.
- **svix-signature** (string): Assinatura criptografada

## Corpo da Requisição

O corpo da requisição deve conter os seguintes campos:

- **data** (objeto): Irá conter todos os dados de registro do usário gerados pelo Clerk

### Dados Obrigatórios Dentro do Objeto **data**

- **_id_** (string): Id gerado pelo Clerk para o usuário.
- **_email_address_** (string): Email do usuário.
- **_first_name_** (string): Nome do usuário.
- **_last_name_** (string): Sobrenome do usuário.

Exemplo:

```json
{
  "data": {
    "birthday": "",
    "created_at": 1654012591514,
    "email_addresses": [
      {
        "email_address": "example@example.org",
        "id": "idn_29w83yL7CwVlJXylYLxcslromF1",
        "linked_to": [],
        "object": "email_address",
        "verification": {
          "status": "verified",
          "strategy": "ticket"
        }
      }
    ],
    "external_accounts": [],
    "external_id": "567772",
    "first_name": "Example",
    "gender": "",
    "id": "user_29w83sxmDNGwOuEthce5gg56FcC",
    "last_name": "Example",
    "locked": false,
    "last_sign_in_at": 1654012591514,
    "object": "user",
    "password_enabled": true,
    "phone_numbers": [],
    "primary_email_address_id": "idn_29w83yL7CwVlJXylYLxcslromF1",
    "primary_phone_number_id": null,
    "primary_web3_wallet_id": null,
    "private_metadata": {},
    "profile_image_url": "https://www.gravatar.com/avatar?d=mp",
    "public_metadata": {},
    "two_factor_enabled": false,
    "unsafe_metadata": {},
    "updated_at": 1654012591835,
    "username": null,
    "web3_wallets": []
  },
  "object": "event",
  "type": "user.created"
}
```

## Caso de sucesso

- Validar se o evento de webhook foi enviado pelo Clerk
- Validar os campos um **_email_address_**, **_id_**, **_first_name_**, **_last_name_**
- Gerar um ID pra o usuário
- Criar registro na tabela **external_auth_mapping** com **external_auth_user_id** e **user_id**

### Resposta

- Código de status: **204 no-content**

## Casos de Exceção

### Respostas

- Código de status: **400 Bad Request**
  - Se a requisição não for feita pelo Clerk.
  - Se os campos requeridos não forem informados.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
