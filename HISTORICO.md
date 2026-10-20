# Histórico — widget_nw_manutEtiq (Manutenção Embalagens)

> Registro anterior preservado. Em 20/10/2026 o usuário pediu a adoção de PADRAO_CONTEXTO_IA_WIDGETS.md. A continuidade passa a ser feita em AGENTS.md, README.md e contexto-ia/AI_*.md. As entradas abaixo são históricas, não autorizações atuais.
> A regra automática commit/push/WAR foi reafirmada pelo usuário em 20/10: SEMPRE fazer commit, push e compilar após cada alteração; ver AGENTS e AI_DECISIONS. O retrato funcional de 15/10 foi superado parcialmente pelo commit 9d1611d de 16/10; ver AI_REFERENCES.
> Consolidado originalmente em 15/10/2026 a partir de RETOMADA_SESSAO.md, PLANO_IMPLEMENTACAO_MANUTENCAO_ETIQUETAS.md, ORIENTACOES-MOCKUP.md, STATUS_SITUACAO_APRESENTADA.md e MANUTENCAO_ETIQUETAS_DT120_20261007.md (excluídos; estão no git).

## Decisões do usuário (não reabrir)
- Aba única; a tela é a visão ADM; sem checagem de permissão no Widget; sem C. Barras de bipagem do não-ADM (02/10).
- Todos os 8 filtros visíveis; ordenação por coluna, inicial Código → Etiqueta; status em chip na célula; legenda em modal (02/10).
- Nome exibido "Manutenção Embalagens"; `application.code` continua `widget_nw_manutEtiq` (02/10).
- Seguir o protótipo de Tipos de Embalagens (`nwe`) e Itens Controlados (`nwi`) em tudo, inclusive no loading (08/10).
- Sem botão Gerar etiquetas: geração interna ao backend (08/10).
- Botão de ação novo usa o visual do Buscar (`nwm-btn nwm-btn-destaque`); o usuário reprovou com veemência uma variante `contorno` (08/10).
- Autocomplete próprio (não `FLUIGC.autocomplete`); selo "código - descrição" com × em todos, exceto Específicas (08/10).
- DT124: Itens com `tipoControleEstoque=3`; Nota Fiscal (De/Até **e** Específicas) com `somenteComEmbalagens=true` (08/10).
- Status = `situacaoApresentada`/`descricaoSituacao`; `situacao` continua estado técnico (08/10).
- Legenda fixa com 9 status, cada um com cor própria, igual na linha e na legenda; paleta aprovada (09/10).
- Ações da linha por status, como a aba Administrador da tela antiga (09/10); botão Histórico entre Detalhes e Imprimir (15/10).
- Família com código vazio é dado da base, não é pendência (08/10).

## Linha do tempo
- **02/10** — Levantamento da tela antiga e orientações para o mockup (dados mockados). Esqueleto da extensão sem lógica.
- **07/10** — Backend entrega a DT120 (apoios Depósito, Lote, Documentos de entrada; filtros De/Até e notas no GET /etiquetas).
  SAVE OpenEdge 4/0, sonda ABL 24/0, cinco GETs REST comprovados no TESTE.
- **08/10 manhã** — Mock removido (`1cf4000`). Dataset ampliado para a DT120 (SHA256 `0523403f…`) e publicado. Etapa 1:
  27 consultas reais pelo console do Fluig, todas como esperado (ver "Evidências"). Etapas 2–4 implementadas localmente:
  transporte `chamarEmbalagens`, apoios dos filtros, Buscar com carga completa por cursor.
- **08/10 tarde** — Commits `21aa0d9` (docs) e `010d273` (integração + clean code, 88 → 255 métodos, seção "Padrão de código").
  Dataset liberou operações (`criar*` em `escritasHabilitadas`, `DefaultGroup-1`, estab. 10904/11301; SHA256 `e6d5f08c…`),
  o que resolveu a divergência com o plano (que dizia operações adiadas).
- **08/10 ~14h50** — Toast em "Escolher item" vazio (`data-caixa-item-qtde`; select desabilitado com `pointer-events: none`).
- **08/10 ~15h** — Botão Impressora + `<dialog>` "Configurar impressora" (aplicativo local 32478, `localStorage.impressora`,
  template doc 423). Verificado em navegador local com aplicativo falso.
- **08/10 ~15h20** — Nota Fiscal De/Até com o autocomplete de documentos, preenchendo `numero`.
- **08/10 ~16h** — Bug: sugestões de nota "fora do contrato". Causa: 3 de 16 documentos reais com `serie: ""` e
  `documentoValido` exigia série; um registro reprovava a página. Correção: série opcional, "sem série".
- **08/10 ~16h15** — Barra de seleção em duas linhas (desenho do usuário) + campo Código de barras só visual.
  Centralização: `padding-bottom: 25px` em ≥1200px (medido: centro 247px × campos 246px).
- **08/10 ~16h40** — DT124 integrada no Dataset (com autorização) e no widget (`NWM_RESTRICOES_APOIO`). Cópia anterior do Dataset
  ficou no scratchpad (`dsNwEmbalagens.antes-dt124.js`).
- **08/10 ~17h10** — `maxlength="100"` nos 15 campos de texto; tratamento de `CONSULTA_AMPLA` testado (erro na 1ª e 2ª página).
- **08/10 ~17h40** — Usuário publicou Dataset e widget. Conferido ao vivo: DT124 ativa no backend (`tipoControleEstoque=1` →
  `FILTRO_INVALIDO`; "3578" → só 357867 REGLONE; notas "9999" com `somenteComEmbalagens` → 4 de 16). Busca NF 9999801–9999805 → 40
  etiquetas. Problemas: coluna Ações não cabia (7 botões em 210px); 1ª tentativa do autocomplete de NF não disparou (não
  reproduzido; hipótese cache `?v=0.1.0`).
- **08/10 ~18h** — Coluna Ações: 3 botões + "…" com modal "Mais ações"; larguras para caber em 1127px.
- **08/10 ~18h30** — Contrato novo: `situacaoApresentada`, `descricaoSituacao`, `impressaoConfirmada`, `recebimentoFisicoConfirmado`.
  No TESTE (50 etiquetas): `ATIVA|NAO_IMPRESSA|"Nao impressa"|false|false` 39; `ATIVA|EM_ESTOQUE|"Em estoque"|true|true` 1;
  `CANCELADA|CANCELADA|"Cancelada"|false|false` 10.
- **08/10 ~18h50–19h10** — Selo do autocomplete com código + descrição. Lição: código com `flex-shrink` > 0 gera corte subpixel
  ("99998…"); usar espaço não separável antes do hífen. Lote "01102025-2" corta na meia caixa (completo no `title`).
- **08/10 ~19h20** — Clean code aplicado: código morto do fluxo de confirmação removido (inclusive `<dialog data-modal-confirmar>`),
  `$.trim` → `String().trim()`, `NWM_LARGURAS_COLUNAS`, `NWM_TIPOS_ERRO`, `NWM_ESTADOS_OPERACAO`, métodos ≤ 20 linhas. 193/0.
- **09/10** — Commits `2363d13` (clean code), `2045a94` (grade paginada em 20 por página; a busca continua trazendo todas as
  páginas do Dataset), `f9b4c03` (docs + `.gitignore`), `1826740` (legenda fixa e cores por status), `fe0b422`, `07a93e0`
  (seta cinza na coluna Ações), `bc6f561` (opções da ação em lote), `41d4d69` (ajuste do usuário no JS).
- **09/10 ~16h30** — `1684edb`: ações por status. Causa da coluna vazia: `htmlBotaoColAcoes` tinha `if (configuracaoAcao) return;`
  invertido. Removido `htmlBotaoColAcoes`; botões por `montarBotaoAcao`; Devolver e "…" saíram da linha. JS está em LF (0 CR).
- **15/10** — `8961773`: botão Histórico (`bi-clock-history`), sem ação. Docs consolidados de 7 para 3 arquivos (este, `CLAUDE.md`, `AGENTS.md`).
- **15/10** — `d110c0d`: consolidação dos docs. Regra nova do usuário: após **toda** alteração, commit, push e gerar o .war
  (Ctrl+F7 = tarefa "Fluig: gerar .war", `pack-widget.ps1 -Path`, saída `target/widget_nw_manutEtiq.war`).
- **15/10** — Lidos os docs do Cheli (dev Progress) em `cheli/` (referência, fora do git): matriz de situações/ações de 13/10
  (DT132/133), DT121 (confirmações/situação/histórico, REST aprovado no TESTE em 08/10), DT126 (estorno, ABL aceito em 14/10, REST
  pendente), Código de barras De/Até mantido + busca local na grade. O Dataset ainda não tem as ações DT121/DT126. Nada alterado no widget.

## Tela antiga (`pagina_antiga_manutencao_etiquetas/`, só leitura, versão "v30.07.2026")
- Dados por `dsGetExecBO` chamando BOs Progress: `_bp/api/etiquetas_v2.p` (`pi-relatorio-saldo-fisico`, `pi-registra-log`,
  `pi-busca-etiqueta`, `pi-gera-saldo-etiqueta`, `pi-transferir-etiqueta`, `pi-log-etiqueta`…), `pre-faturamento_v2.p`,
  `recebimento_fiscal_v2.p`. Várias chamadas síncronas.
- Situação numérica do log: 1 Criada, 2 Impressa, 3 Em estoque, 4 Em campo, 5 Armazenada em Bag, 6 Descartado, 7 Zerada.
- Abas: Recebimento (não-ADM: ação Receber, C. Barras com leitor; digitado com intervalo > 300 ms entre teclas exige justificativa
  de 20+ caracteres) e Administrador (Ação em lote Imprimir/Receber/Estornar/Transferir, Escolher Item + Quantidade, que exige
  múltiplo da embalagem cheia). Filtros, tabelas e legenda ficavam fora das abas.
- Permissão: grupos `adm_abas_etiquetas` (mostra a aba ADM) e `adm_etiquetas` (libera estab./depósito e ações) via
  `/api/public/2.0/users/getCurrent` síncrono; estab./depósito por `pi-permissao-estab-depos`.
- Ações por linha (ADM, `exibirAcoesAbaAdministrador`): Detalhes sempre; Não Impresso → Imprimir; Impressa → Receber, Descartar,
  Transferir; Em estoque → Estornar, Descartar, Transferir; Em campo/Zerada → Estornar, Descartar; Descartado → Estornar;
  Armazenada em Bag → só Detalhes. Não-ADM: Detalhes + Receber só em Impressa. "Estornar" chama `botaoDevolver(...)`.
- Legenda antiga: Não Impresso, Impressa, Em estoque, Zerada, Armazenada em Bag, Descartado (Em campo só no código).
- Impressão: aplicativo local `http://localhost:32478` (`GET /impressoras`, `POST /imprimir {impressora, template, dados}`),
  template `/webdesk/webdownload?documentId=423&version=1000`. Individual monta `{PRODUTO, CODIGO, LOTE, DATAVAL, CBARRA, QTD, UN}`
  e grava log "Impressa" sem esperar o resultado; lote grava log de todas e imprime uma a uma após o Ok.
  Fragilidades: log independente da impressão; falha de conexão silenciosa; `$(document).on` sem `.off` no Ok do lote (pode
  reimprimir lotes anteriores, inferido); dados pelo `value` do checkbox separado por vírgula; `onclick` quebra com apóstrofo.
- Transferência para outro estab./fornecedor gera pré-faturamento; caminhos fixos `\\192.168.1.102\c$\temp\` e `C:\temp\`.
  NF específicas antigas: CNPJ + nota de 7 dígitos + série até 3.

## Evidências (fora do git, em `evidencias/`)
- Etapa 1 (08/10): `evidencias/etapa1-20261008/resultado-dataset.json` (SHA256 `71db146b…`) e `regressao-telas.txt`.
  27/27 consultas: estab. 10904, item 357867 REGLONE; famílias 40 códigos em 2 páginas; depósitos cursores 228/503; 4 lotes;
  4 documentos para "999980"; NF 9999801–9999805 = 40 IDs únicos em 2 páginas; nota 9999801 = 15 e 9999802 = 25 etiquetas,
  as duas juntas = 40 sem duplicar; vazio válido; `SEM_PERMISSAO` para `ZZDT120`; `FILTRO_INVALIDO` para específicas sem
  documento, validade invertida e `2032-02-31`; regressão de Tipos e Itens Controlados OK.
- Identidades fiscais: 9999801 = `5:109044:25081:17:99998016:1101IS`; 9999802 = `5:109044:25081:17:99998026:1101IS`.
- DT120 backend: `docs/entregas/evidencias/dt120-r2-20261007-182052` e `dt120-rest-20261007` (no projeto do backend).

## Verificação DT124 no console da página
```js
const w = window[document.querySelector('[id^="widget_nw_manutEtiq_"]').id];
w.chamarEmbalagens('apoiarItens', { filtro: '0011', limite: 20, codEstabel: '10904', tipoControleEstoque: '3' }).then(r => console.log(r.sucesso, r.codigoErro, r.dados && [...new Set(r.dados.map(d => d.tipoControleEstoque))]));
w.chamarEmbalagens('apoiarDocumentosEntrada', { filtro: '001955', limite: 20, estabelDe: '10904', estabelAte: '10904', somenteComEmbalagens: 'true' }).then(r => console.log(r.sucesso, r.codigoErro, r.dados && r.dados.map(d => d.qtdEmbalagens + '/' + d.compensado)));
```

## Ambiente
- Prévia local: `python -m http.server 8765` servindo `scratchpad/harness/site` (montada por `montar_pagina.py` com o CSS do
  Style Guide do TESTE e `?v=<hora>` no CSS/JS para evitar cache). Scratchpad é temporário.
- Codex (sessão antiga): shell sem elevação falhava com `helper_unknown_error`; era do ambiente.
- Docs do backend: `../widget_nw_embalagens/fluig-rest/docs/`.
