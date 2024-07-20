# Recognizement Web Pages

## Recognizement Creation
- ### Route
  - `/recognizement`
  - Dados:
    - `getStaticProps()`:
      - `[SlackTeamMember]`
      - `next_page_cursor`
  - Estados:
    - `slackTeamMembers`: `[SlackTeamMember]`
    - `nextPageCursor`: `string`
  - Funções:
    - `onCreate(Recognizement)`:
      - `POST /api/recognizement`
        - payload: `Reconizement`
    - `loadMoreSlackTeamMembers()`:
      - `GET /api/slack_teams/:slack_id/members`
        - param: `nextPageCursor`
        - atualiza `nextPageCursor`
        - atualiza `slackTeamMembers`
  - Componentes:
    - `<RecognizementCreation>`
      - recebe:
        - `onCreate(Recognizement)`
        - `slackTeamMembers`: `[SlackTeamMember]`
        - `loadMoreSlackTeamMembers()`