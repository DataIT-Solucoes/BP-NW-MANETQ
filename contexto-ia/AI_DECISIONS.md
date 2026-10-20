# AI_DECISIONS — widget_nw_manutEtiq

Somente pedidos e decisões efetivas do usuário. Implementação observada em fonte não comprova aprovação funcional.

| Data | Decisão | Origem |
|---|---|---|
| 2026-10-20 | Botões da coluna Ações alinhados à esquerda. | Correção explícita do usuário após conferir a página de manutenção |
| 2026-10-20 | Imprimir precisa estar visível como PRIMEIRO botão em Não impressa; apenas reordenar o mapa não atende se a coluna cortar o botão. | Correção explícita do usuário |
| 2026-10-20 | Em NAO_IMPRESSA, Imprimir deve ser o primeiro botão: Imprimir, Detalhes, Histórico, Inutilizar e Perda. Substitui para esse status a posição anterior do Histórico antes da impressão; demais status preservados. | Pedido explícito do usuário |
| 2026-10-20 | Remover a mensagem inicial “Em lote, cada embalagem...” dos modais; manter campo para andamento/resultado. | Pedido explícito do usuário durante esta tarefa |
| 2026-10-20 | Aplicar aos botões de ações o padrão de hover da tela de Bags: fundo/borda coloridos e ícone contrastante por ação. | Pedido explícito do usuário, mesma página de referência |
| 2026-10-20 | Permitir fechar os modais clicando no fundo escuro externo. | Pedido explícito do usuário |
| 2026-10-20 | Mapear as ocorrências do Histórico da embalagem em badges iguais às de Bags, conferindo os códigos nos fontes .p e na página publicada. | Pedido explícito do usuário |
| 2026-10-20 | Exibir toast Fluig info “Carregando...” junto ao overlay da widget no Histórico e também no Buscar; retirar ao encerrar a carga. | Pedido explícito do usuário |
| 2026-10-20 | Correção: loading global segue widget_nw_bags e bloqueia somente a widget, com overlay próprio e spinner. Não usar o loading global do Fluig. Substitui a interpretação anterior implementada com FLUIGC.loading(window); Histórico continua abrindo somente após carregar. | Correção explícita do usuário e referência à pasta widget_nw_bags |
| 2026-10-20 | Botões de ações da grade devem ter a borda verde do padrão de Bags, inclusive em repouso. | Pedido explícito do usuário, referência à página manutencao_e_consulta_de_bags |
| 2026-10-20 | Ao clicar no Histórico, ativar loading global e abrir o modal somente depois de carregar os dados. | Pedido explícito do usuário |
| 2026-10-20 | Campo Data do modal Histórico da embalagem no formato DD/MM/AAAA - HH:MM. | Pedido explícito do usuário |
| 2026-10-20 | Coluna Fazenda deve exibir código e descrição juntos, no formato “10904 - JOAO BRANCO PERES”; descrição obtida do cadastro, sem nome fixo no código. | Pedido explícito do usuário |
| 2026-10-20 | Adicionar coluna “Tipo de Embalagem” imediatamente antes de Fazenda e “UN” imediatamente depois de Qtde Saldo na grade. | Pedido explícito do usuário |
| 2026-10-20 | Adotar PADRAO_CONTEXTO_IA_WIDGETS.md: AGENTS, README e quatro arquivos de contexto; remover CLAUDE local duplicado. Substitui o espelhamento AGENTS/CLAUDE e a atualização contínua do HISTORICO. | Pedido atual e padrão em Documentos |
| 2026-10-20 | **SEMPRE: commit, push e compilar após cada alteração**, incluindo documentação. Substitui a orientação anterior de pedir autorização individual para commit/push/build. Mostrar o conteúdo antes do commit; publicação no Fluig permanece separada. | Correção explícita do usuário: “SEMPRE: Commit, push e compilar” |
| 2026-10-15 | Ações da linha por status, como a aba Administrador da tela antiga (09/10); botão Histórico entre Detalhes e Imprimir (15/10). | HISTORICO.md, decisões do usuário |
| 2026-10-09 | Legenda fixa com 9 status, cada um com cor própria, igual na linha e na legenda; paleta aprovada (09/10). | HISTORICO.md, decisões do usuário |
| 2026-10-08 | Seguir o protótipo de Tipos de Embalagens (`nwe`) e Itens Controlados (`nwi`) em tudo, inclusive no loading (08/10). | HISTORICO.md, decisões do usuário |
| 2026-10-08 | Sem botão Gerar etiquetas: geração interna ao backend (08/10). | HISTORICO.md, decisões do usuário |
| 2026-10-08 | Botão de ação novo usa o visual do Buscar (`nwm-btn nwm-btn-destaque`); o usuário reprovou com veemência uma variante `contorno` (08/10). | HISTORICO.md, decisões do usuário |
| 2026-10-08 | Autocomplete próprio (não `FLUIGC.autocomplete`); selo "código - descrição" com × em todos, exceto Específicas (08/10). | HISTORICO.md, decisões do usuário |
| 2026-10-08 | DT124: Itens com `tipoControleEstoque=3`; Nota Fiscal (De/Até **e** Específicas) com `somenteComEmbalagens=true` (08/10). | HISTORICO.md, decisões do usuário |
| 2026-10-08 | Status = `situacaoApresentada`/`descricaoSituacao`; `situacao` continua estado técnico (08/10). | HISTORICO.md, decisões do usuário |
| 2026-10-08 | Família com código vazio é dado da base, não é pendência (08/10). | HISTORICO.md, decisões do usuário |
| 2026-10-02 | Aba única; a tela é a visão ADM; sem checagem de permissão no Widget; sem C. Barras de bipagem do não-ADM (02/10). | HISTORICO.md, decisões do usuário |
| 2026-10-02 | Todos os 8 filtros visíveis; ordenação por coluna, inicial Código → Etiqueta; status em chip na célula; legenda em modal (02/10). | HISTORICO.md, decisões do usuário |
| 2026-10-02 | Nome exibido "Manutenção Embalagens"; `application.code` continua `widget_nw_manutEtiq` (02/10). | HISTORICO.md, decisões do usuário |
