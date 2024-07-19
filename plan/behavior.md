# Comportamentos esperados

- Dado que sou usuário,
  - acesso a plataforma pelo navegador.
  - Vejo uma lista de Times do Slack.
  - Seleciono um Time do Slack.
  - Vejo uma lista de Membros do Time do Slack,
    - cada uma com nome, foto e email.
      - nos Membros do Time do Slack que não possuem foto,
        - vejo a imagem de uma silueta genérica.
  - Seleciono um Membro do Time do Slack.
  - Vejo um formulário para criar um Reconhecimento para o Membro do Time do Slack escolhido,
    - com um campo para inserir uma mensagem, e um botão para enviar.
  - Informo o campo de mensagem, e seleciono o botão de enviar.
  - O Reconhecimento é enviado para o Membro do Time do Slack,
    - e será recebido em uma conversa dentro do Slack,
    - exibindo a mensagem escrita.
  - O Reconhecimento também será salvo em um banco de dados ao ser enviado.

- Dado que sou administrador,
  - acesso a seção de administração pelo navegador.
  - Vejo uma lista de Times do Slack,
    - cada um exibindo um nome e um status de se está funcionando.
  - Posso excluir um Time do Slack.
  - Vejo um formulário para adicionar um Time do Slack,
    - com o campo de chave de integração, e botão para criar.
  - Informo os campos do formulário, e seleciono o botão de criar.
  - O Time do Slack criado é adicionado a lista de Times do Slack.