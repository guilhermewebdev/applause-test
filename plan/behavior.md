# Comportamentos esperados

- Dado que sou usuário,
  - acesso a plataforma pelo navegador.
  - Vejo uma lista de Times do Slack.
  - Seleciono um Time do Slack.
  - Vejo uma lista de Membros do Time do Slack,
    - cada uma com nome, foto e email.
    - Nos Membros do Time do Slack que não possuem foto,
      - vejo a imagem de uma silueta genérica.
  - Seleciono um Membro do Time do Slack.
  - Vejo um formulário para criar um Reconhecimento para o Membro do Time do Slack escolhido,
    - com um campo para inserir uma mensagem, e um botão para enviar.
  - Informo o campo de mensagem, e seleciono o botão de enviar.
  - O Reconhecimento é enviado para o Membro do Time do Slack,
    - e será recebido em uma conversa dentro do Slack,
    - exibindo a mensagem escrita.
  - O Reconhecimento também será salvo em um banco de dados ao ser enviado.

- Dado que sou visitante,
  - acesso a seção de administrador pelo navegador.
  - Sou redirecionado para a seção de login.
  - Vejo um formulário de autenticação,
    - com os campos email e senha,
    - e um botão para entrar.
  - Informo minhas credenciais,
    - e seleciono o botão para entrar.
  - Caso as credenciais sejam válidas
    - Sou redirecionado para a seção de administração.
  - Caso as credenciais sejam inválidas,
    - Vejo uma alerta no formulário,
      - dizendo que as credenciais são inválidas.

- Dado que sou administrador autenticado,
  - acesso a seção de administração pelo navegador.
  - Vejo uma lista de Times do Slack,
    - cada um exibindo um nome e um status de se está funcionando.
  - Posso excluir um Time do Slack.
  - Vejo um formulário para adicionar um Time do Slack,
    - com o campo de chave de integração, e botão para criar.
  - Informo os campos do formulário, e seleciono o botão de criar.
  - O Time do Slack criado é adicionado a lista de Times do Slack.