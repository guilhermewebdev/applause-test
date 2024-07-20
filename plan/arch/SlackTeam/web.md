# SlackTeam Web Pages

## SlackTeam Creation
- ### Route
  - `/slack_team/create`
  - Rota autenticada
  - Estados:
    - `slackTeams`: `[SlackTeam]`
  - Funções:
    - `onCreate(SlackTeam)`:
      - `POST /api/slack_teams`
        - payload: `SlackTeam`
      - `loadStackTeams()`
    - `loadSlackTeams()`:
      - `GET /api/slack_teams`
        - atualiza `slackTeams`
  - Componentes:
    - `<SlackTeamCreation>`
      - recebe:
        - `onCreate(SlackTeam)`
        - `slackTeams`: `[SlackTeam]`

## SlackTeam List
- ### Route
  - `/slack_team`
  - Estados:
    - `slackTeams`: `[SlackTeam]`
  - Funções:
    - `loadSlackTeams()`:
      - `GET /api/slack_teams`
        - atualiza `slackTeams`
  - Componentes:
    - `<SlackTeamList>`
      - recebe:
        - `slackTeams`: `[SlackTeam]`