# Comportamentos esperados

- Dado que sou usuário,
  - acesso a plataforma pelo navegador.
  - Vejo uma lista de integrações.
  - Seleciono uma integração.
  - Vejo uma lista de pessoas,
    - cada uma com nome, foto e email.
      - Em pessoas que não possuem foto, vejo a imagem de uma silueta genérica.
  - Seleciono uma pessoa.
  - Vejo um campo para inserir uma mensagem, e um botão para enviar.
  - Informo uma mensagem, e seleciono o botão de enviar.

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
  - Vejo uma lista de integrações,
    - cada uma exibindo um nome e um status de se está funcionando.
  - Posso excluir uma integração.
  - Vejo um formulário para adicionar uma integração,
    - com os campos nome e chave de integração.
  - Informo os campos do formulário, e seleciono o botão de criar.
  - A integração criada é adicionada a lista de integrações.