# Dominios da aplicação

### Time do Slack
- tipo: Suporte
- nome: SlackTeam

### Membro do Time do Slack
- tipo: Suporte
- nome: SlackTeamMember
- consome:
  - Recognizement
  - SlackTeam

### Reconhecimento
- tipo: Principal
- nome: Recognizement

### Usuário
- tipo: Genérico
- nome: User
- consome:
  - SlackTeam
  - SlackTeamMember
  - Recognizement

### Administrador
- tipo: Genérico
- nome: Administrator
- consome:
  - SlackTeam
