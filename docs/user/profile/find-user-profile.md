# Buscar Todas as Informações do Próprio Perfil do Usuário

## Descrição

Este endpoint busca as informações do próprio usuário logado.

## Endpoint

`GET /user/profile`

## Cabeçalhos da Requisição

O cabeçalho da requisição deve conter um token de acesso:

- **x-access-token** (string): Token de acesso gerado pelo **_Clerk_**

Exemplo:

```json
{
  "x-access-token": "clerk_jwt_token"
}
```

## Caso de sucesso

- Busca as informações do perfil do usuário no DB

### Resposta

- Código de status: **200 ok**

Exemplo:

```json
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "11912345678",
    "dateOfBirth": "DD/MM/YYYY"
  },
  "address": {
    "country": "Brasil",
    "state": "São Paulo",
    "city": "Santos"
  },
  "badges": [
    {
      "id": "4d32515f-3654-4cf5-8d2d-c817f83f243b",
      "name": "Achiever",
      "type": "Bronze",
      "description": "Awarded for achieving a milestone",
      "criteria": "Complete 100 quests",
      "icon": "https://host.com/achiever_icon.png"
    }
  ],
  "preferences": {
    "frequency": "weekly",
    "activeType": "player",
    "dayPeriod": {
      "night": true,
      "morning": false,
      "afternoon": true
    },
    "playersRange": {
      "minPlayers": 5,
      "maxPlayers": 10
    },
    "rpgStyles": [
      {
        "id": "71d91c56-fd2e-4adf-8521-f2252fa0dc2e",
        "name": "Fantasy"
      },
      {
        "id": "f58c7a9d-28b4-4443-bd1b-2d25e1ac59dc",
        "name": "Sci-Fi"
      }
    ]
  },
  "socialMedias": [
    {
      "id": "eb81464e-3b23-475f-9db0-e0579853186c",
      "name": "Twitter",
      "link": "https://twitter.com/johndoe"
    },
    {
      "id": "ee93cdf2-2dc0-4f0b-9585-e6b8c112ad6f",
      "name": "Instagram",
      "link": "https://www.instagram.com/johndoe/"
    }
  ],
  "config": {
    "allowMessage": true
  }
}
```

### Dados Opcionais (podem ou não estar na resposta)

Caso o objeto exista, alguns de seus campos podem ser opcionais:

- (**_user_**): o objeto sempre existirá.

  - **phone**: o campo pode ter como valor **null**.
  - **dateOfBirth**: o campo pode ter como valor **null**.

- (**_address_**): o objeto **address** pode ter como valor **null**.

  - **city**: o campo pode ter como valor **null**.

- (**_badges_**): o array pode ser enviado vazio.

- (**_preferences_**): o objeto pode ter como valor **null**.

  - (**_dayPeriod_**): o objeto pode ter como valor **null**.
  - (**_playersRange_**): o objeto pode ter como valor **null**.
  - (**_rpgStyles_**): o array pode ser enviado vazio.

- (**_socialMedias_**): o array pode ser enviado vazio.
- (**_config_**): o objeto pode ter como valor **null**.

## Casos de Exceção

### Respostas

- Código de status: **401 Unauthorized**
  - Se o cabeçalho de autorização estiver ausente ou inválido.
  - Se o token de autenticação for inválido ou expirado.
- Código de status: **500 Internal Server Error**
  - Em caso de erro interno no servidor.
