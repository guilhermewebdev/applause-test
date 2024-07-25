# Recognizement API

- ## Entities
  - ### `Recognizement` (interno)
    - `message`
      - string
      - obrigatório
    - `slack_team_member_id`
      - string
      - obrigatório
    - `slack_integration_key`
      - string
      - obrigatório
      - não persistido
      - somente input

 ## Recognizement Creation
  - ### Services
    - `RecognizementService.create`
      - recebe `recognizement`
      - submete a mensagem para o chat no Slack
      - salva a mensagem
      - retorna instancia `Recognizement`
  - ### Repositories
    - `RecognizementRepository.create`
      - recebe `Recognizement`
      - Salva a instância no banco de dados
    - `SlackApiChatMessageRepository.create`
      - recebe `Recognizement`
      - envia a mensagem utilizando o endpoint `/chat.postMessage` na api do Slack
        - envia o parâmetro `text` como `Recognizement.message`
        - envia o parâmetro `channel` como `Recognizement.slack_team_member_id`
      - retorna `Recognizement`
  - ### Entities
    - `Recognizement`