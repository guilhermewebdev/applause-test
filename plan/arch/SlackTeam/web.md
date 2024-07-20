# SlackTeam Web Pages

## SlackTeam Creation
- ### Route
  - `/slack_team/create`
  - Estados:
    - `slackTeams`: `[SlackTeam]`
  - Funções:
    - `onCreate(SlackTeam)`:
      - `POST /api/slack_teams`
        - payload: `SlackTeam`
    - `loadSlackTeams()`:
      - `GET /api/slack_teams`
        - atualiza `slackTeams`
  - Componentes:
    - `<SlackTeamCreation>`
      - recebe:
        - `onCreate(SlackTeam)`
        - `slackTeams`: `[SlackTeam]`
