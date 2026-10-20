# AI_DECISIONS — widget_nw_manutEtiq

Somente pedidos e decisões efetivas do usuário. Implementação observada em fonte não comprova aprovação funcional.

| Data | Decisão | Origem |
|---|---|---|
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
