# Web component templates

## `<RecognizementCreation>`
- Recebe:
  - `onCreate(Recognizement)`
  - `slackTeamMembers`: `[SlackTeamMember]`
  - `loadMoreSlackTeamMembers()`
- Estados:
  - `formState`
- Funções:
  - `onSubmit(data)`
    - Valida se o input é válido
    - `onCreate(Recognizement)`
- Componentes:
  - `<Form>`
    - Recebe:
      - `onSubmit(data)`
  - `<SearchingList>`
    - Recebe:
      - `loadMore()`: `loadMoreSlackTeamMembers()`
      - `items`: `[SlackTeamMember]`
  - `<TextInput>`
  - `<Button>`
