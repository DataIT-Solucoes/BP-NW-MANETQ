# Decisões do usuário — widget_nw_manutEtiq

> Decisões e correções do usuário. Acrescentar no topo (mais recente primeiro), com data e origem.
> Só registrar o que o usuário decidiu ou pediu. Proposta não aprovada vai para `pendencias.md`.
> Decisões até 15/10 vêm do `HISTORICO.md` (registro anterior preservado).

## Dados e regras
| Data | Decisão | Origem |
|---|---|---|
| 19/10 | O `dsNwEmbalagens` publicado no Fluig é sempre o do GitHub `DataIT-Solucoes/BP-NW-DATASET` (decisão registrada no `widget_nw_bags`; substitui a cópia `../widget_nw_embalagens/datasets/dsNwEmbalagens.js` como fonte da verdade) | Usuário |
| 08/10 | DT124: Itens com `tipoControleEstoque=3`; Nota Fiscal (De/Até **e** Específicas) com `somenteComEmbalagens=true` | `HISTORICO.md` |
| 08/10 | Status = `situacaoApresentada`/`descricaoSituacao`; `situacao` continua estado técnico | `HISTORICO.md` |
| 08/10 | Família com código vazio é dado da base, não é pendência | `HISTORICO.md` |
| 08/10 | Sem botão Gerar etiquetas: geração interna ao backend | `HISTORICO.md` |
| 02/10 | Aba única; a tela é a visão ADM; sem checagem de permissão no Widget; sem C. Barras de bipagem do não-ADM | `HISTORICO.md` |

## Textos e mensagens
| Data | Decisão | Origem |
|---|---|---|
| 20/10 | Remover a mensagem inicial "Em lote, cada embalagem..." dos modais; manter campo para andamento/resultado | Pedido do usuário |
| 20/10 | Ocorrências do Histórico da embalagem em badges iguais às de Bags, com os códigos conferidos nos fontes `.p` e na página publicada | Pedido do usuário |
| 20/10 | Campo Data do Histórico da embalagem no formato `DD/MM/AAAA - HH:MM` | Pedido do usuário |
| 02/10 | Nome exibido "Manutenção Embalagens"; `application.code` continua `widget_nw_manutEtiq` | `HISTORICO.md` |

## Tela e comportamento
| Data | Decisão | Origem |
|---|---|---|
| 21/10 | Campo de filtro com autocomplete só conta como preenchido quando o valor é escolhido na lista (selo); texto digitado sem escolher vale como campo vazio | Pedido do usuário |
| 20/10 | Imprimir habilitado quando a situação permitir; ao clicar, registra a confirmação (`CONFIRMAR_IMPRESSAO`) para atualizar o status, mesmo sem impressão física, para teste do usuário. Substitui o Imprimir desabilitado por falta de modelo | Pedido do usuário |
| 20/10 | Botões da coluna Ações alinhados à esquerda | Correção do usuário |
| 20/10 | Imprimir visível como **primeiro** botão em Não impressa; só reordenar o mapa não atende se a coluna cortar o botão | Correção do usuário |
| 20/10 | Em `NAO_IMPRESSA`: Imprimir, Detalhes, Histórico, Inutilizar e Perda. Demais status preservados | Pedido do usuário |
| 20/10 | Hover dos botões de ações no padrão de Bags: fundo/borda coloridos e ícone contrastante por ação | Pedido do usuário |
| 20/10 | Botões de ações da grade com a borda verde de Bags, inclusive em repouso | Pedido do usuário |
| 20/10 | Fechar os modais clicando no fundo escuro externo | Pedido do usuário |
| 20/10 | Toast info "Carregando..." junto ao overlay da widget no Histórico e no Buscar; retirar ao encerrar a carga | Pedido do usuário |
| 20/10 | **Correção:** loading global segue `widget_nw_bags` e bloqueia só a widget (overlay próprio + spinner). Não usar `FLUIGC.loading(window)` | Correção do usuário |
| 20/10 | Histórico: loading global e modal só abre depois de carregar os dados | Pedido do usuário |
| 20/10 | Coluna Fazenda com código e descrição ("10904 - JOAO BRANCO PERES"); descrição do cadastro, sem nome fixo no código | Pedido do usuário |
| 20/10 | Coluna "Tipo de Embalagem" logo antes de Fazenda e "UN" logo depois de Qtde Saldo | Pedido do usuário |
| 15/10 | Ações da linha por status, como a aba Administrador da tela antiga (09/10); Histórico entre Detalhes e Imprimir (15/10; em `NAO_IMPRESSA` superado em 20/10) | `HISTORICO.md` |
| 09/10 | Legenda fixa com 9 status, cada um com cor própria, igual na linha e na legenda; paleta aprovada | `HISTORICO.md` |
| 08/10 | Seguir o protótipo de Tipos de Embalagens (`nwe`) e Itens Controlados (`nwi`) em tudo (o loading foi corrigido em 20/10 para o de Bags) | `HISTORICO.md` |
| 08/10 | Botão de ação novo usa o visual do Buscar (`nwm-btn nwm-btn-destaque`); o usuário reprovou com veemência uma variante `contorno` | `HISTORICO.md` |
| 08/10 | Autocomplete próprio (não `FLUIGC.autocomplete`); selo "código - descrição" com × em todos, exceto Específicas | `HISTORICO.md` |
| 02/10 | Todos os 8 filtros visíveis; ordenação por coluna, inicial Código → Etiqueta; status em chip na célula; legenda em modal | `HISTORICO.md` |

## Forma de trabalho
| Data | Decisão | Origem |
|---|---|---|
| 21/10 | Mesma organização do `widget_nw_bags`: regras no `AGENTS.md` (o `CLAUDE.md` só importa `@AGENTS.md`); `contexto-ia/` vira `docs/` (decisoes, pendencias, referencias-backend, tela-e-codigo); `AI_HANDOFF` removido (histórico = `git log`); atualizar só o arquivo afetado | Usuário |
| 21/10 | Skill `fluig-branco-peres` local em `.claude/skills/` (cópia igual nos 4 widgets, sem cópia global); `.claude/` inteira no git | Usuário |
| 21/10 | Entrega por `scripts/entregar.ps1`; **mensagem de commit sempre com prefixo** `DOCS: Texto`, `FIX: Texto`, `CHORE: Texto`; commit sem coautor | Usuário (padrão do `widget_nw_bags`) |
| 20/10 | **SEMPRE commit + push + compilar (.war) após cada alteração**, inclusive documentação. Publicação no Fluig é separada (feita pelo usuário) | Correção do usuário: "SEMPRE: Commit, push e compilar" |
| 20/10 | `HISTORICO.md` deixa de ser atualizado; fica como registro anterior | Usuário |
