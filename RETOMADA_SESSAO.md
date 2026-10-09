# Retomada da sessão — widget_nw_manutEtiq (Manutenção Embalagens)

> **Para a IA que continuar:** este arquivo é o registro contínuo da conversa com o usuário (Humberto).
> Atualize-o **a cada interação** com o que foi pedido, decidido, feito e o que ficou pendente. Ele vale mais que a
> memória da sessão; não apague histórico útil, apenas corrija o que ficou desatualizado (dizendo que corrigiu).
> Última atualização: **08/10/2026, ~14h** (Claude Code, Opus 5.5).

## 1. Antes de qualquer trabalho

1. Ler `AGENTS.md` (Codex) ou `CLAUDE.md` (Claude Code) desta pasta. Têm o mesmo conteúdo, exceto a linha 3; ao alterar
   um, altere o outro. Inclui a seção **"Padrão de código (JS) — seguir sempre"**.
2. Usar a skill `fluig-branco-peres`.
3. Reler o Dataset vigente: `../widget_nw_embalagens/datasets/dsNwEmbalagens.js` (`NW_CONFIG`, `NW_ACOES`, `NW_COLUNAS`).
   Ele é sempre igual ao Fluig e manda sobre qualquer documento. Não alterar sem autorização.
4. Conferir `git status`. Este widget é um repositório git próprio (a raiz `brancoperes2026` não é).

## 2. Regras confirmadas pelo usuário

- Português do Brasil, direto e objetivo. O usuário define o escopo: fazer só o que foi pedido.
- **Manter este arquivo atualizado com tudo o que for conversado** (pedido em 08/10/2026).
- Commit e push somente quando solicitados, mostrando antes os arquivos. Nunca incluir `pagina_antiga_manutencao_etiquetas/`,
  `evidencias/`, `debug.log` sem pedido explícito.
- Seguir o protótipo de **Tipos de Embalagens** (`widget_nw_embalagens`) e **Itens Controlados** (`widget_nw_itensComCtrllDeEmb`).
- Cópias do servidor/homologação são somente leitura; nunca ler arquivos `.r`.
- **Padrão de código do JS (08/10/2026):** sem comentários, nomes descritivos, funções curtas, constantes `NWM_*`,
  somente jQuery para DOM/eventos/AJAX, refatoração sem mudar comportamento, rodar os 4 testes antes e depois.
  Detalhes no `AGENTS.md`/`CLAUDE.md`.
- Família com `codigo: ""` (`LS ACESSORIOS CABINA`) é dado da base: não tratar como pendência.

## 3. Estado atual

Commits no `main` (push feito; `main` = `origin/main`):

| Commit | Conteúdo |
|---|---|
| `010d273` | Etapa 2+ integrada ao Dataset (consulta, apoios, notas específicas, modal de operação) + JS refatorado em clean code + docs com padrão de código |
| `21aa0d9` | Docs: fatos desatualizados corrigidos no `CLAUDE.md`/`AGENTS.md` |
| `1cf4000` | Remoção dos dados mockados e validação de filtros |

O que o código faz hoje (commit `010d273`, **não validado ao vivo no Fluig**):
- Buscar chama `consultarEtiquetas`, pede todas as páginas pelo cursor (100 por chamada) e só então mostra a grade.
- Autocomplete próprio em Estabelecimento, Itens, Depósito, Lote e Família; notas específicas por `apoiarDocumentosEntrada`
  (1 a 20 documentos).
- Status = situação do backend (Ativa/Encerrada/Cancelada/Descartada); posição e Bag nos detalhes.
- Modal "Movimentar embalagens": `classificarNatureza` → `criarTransferencia`/`criarRemessa` ou
  `consultarEmbalagensOrigem` → `criarDevolucao`; chave idempotente e `consultarResultadoOperacao`.
- Testes locais (`testes/*.cjs`, fora do git): apoios 29, consulta 35, funções 36, transporte 60 = **160 cenários, 0 falhas**.
  Usam jQuery/AJAX/Tabulator simulados; não comprovam funcionamento no Fluig.

## 4. O que foi feito na sessão de 08/10/2026 (tarde, Claude Code)

1. `/claude-api prompt-audit` no `CLAUDE.md`/`AGENTS.md` do widget: achados de fatos desatualizados. Correções aplicadas,
   commit `21aa0d9` e push.
2. Leitura das boas práticas da raiz (`CLAUDE.md` e `.claude/docs/fluig-style-guide/`).
3. Correção dos docs: `CLAUDE.md`/`AGENTS.md` do widget reescritos com o estado do código e o contrato do Dataset;
   `CLAUDE.md` da raiz ganhou a seção "Padrão visual `nw`" (Bootstrap Icons, Tabulator, Select2, `<dialog>` por CDN).
   **O `CLAUDE.md` da raiz não está em nenhum git** (alteração só local).
4. Refatoração clean code do `widget_nw_manutEtiq.js` (88 → 255 métodos, sem comentários). Mantidos nomes públicos,
   campos de estado, mensagens e seletores. Comparação de literais antes/depois: só mudou o aviso de erro da tabela
   (HTML em texto → `$('<p>', ...)`) e duas regex trocadas por `operacaoTravada(...)`. Cópia anterior no scratchpad da sessão
   (`widget_nw_manutEtiq.antes.js`, temporário).
5. Seção "Padrão de código (JS) — seguir sempre" criada nos docs do widget; commit `010d273` e push.

## 5. Divergências e decisões em aberto (confirmar com o usuário)

- **Plano × código:** `PLANO_IMPLEMENTACAO_MANUTENCAO_ETIQUETAS.md` (salvo às 11:44) diz que operações, notas específicas e
  "Escolher item + Quantidade" ficaram indisponíveis/adiadas por decisão do usuário. O código commitado (testes de 12:18–12:22)
  já habilita Transferência/Devolução para `EMBALAGEM`, seleção de documentos e Escolher item. O Dataset tem
  `criarTransferencia`, `criarRemessa`, `criarDevolucao` em `escritasHabilitadas`. Confirmar com o usuário qual vale e
  atualizar o plano.
- `testes/` e `evidencias/` fora do git: quem clonar não terá os testes. Os testes leem `evidencias/etapa1-20261008/resultado-dataset.json`
  (dados reais) e `testar-configuracao-operacoes-dataset.cjs` lê `dsNwEmbalagens.js.bak`. Decidir se entram no repositório.
- Repositório remoto mudou para `https://github.com/DataIT-Solucoes/BP-NW-MANETQ.git` (push ainda funciona pelo redirecionamento).
  Trocar o `origin` só com autorização.
- `AGENTS.md` linha 3 cita um `AGENTS.md` da raiz que não existe. A skill diz para não criá-lo sem pedido.
- Padrão de código registrado só neste widget; levar para o `CLAUDE.md` da raiz ou para a skill depende de pedido.
- "Qtde Sel." soma o saldo (`qtidadeAtu`); confirmar se é isso ou a quantidade inicial.
- Legenda definitiva dos status; ações sem contrato (Estornar, Descartar; Imprimir aguarda modelo; Receber é pelo Datasul).

## 6. DT124 recebida do backend (08/10/2026) — ainda NÃO implementada no widget

Resumo do documento colado pelo usuário. Correção no fonte Progress; **compilação OpenEdge e aceite REST pendentes** no backend.

**Itens Lote no autocomplete:**
- Na manutenção, enviar `tipoControleEstoque=3` ao GET `/apoios/itens` **nos dois campos de intervalo de itens** (De e Até).
  Na tela de parametrização, **não** enviar (continua achando itens não convertidos).
- Só o texto `3` é aceito; ausente = comportamento antigo. Vazio, duplicado, `0`, `1`, `4`, `true`, `03` → `FILTRO_INVALIDO`.
- Retorno: `codigo`, `descricao`, `un`, `tipoControleEstoque` (todos 3 nesse modo). Sem correspondência = sucesso com dados vazios.
- O backend filtra antes de limite/cursor: **não filtrar só no front**. `aposCodigo`, `temMais`, `proximoCodigo` iguais; limpar cursor ao mudar filtros.
- Controle 3 = cadastro Lote; não garante saldo, etiqueta nem parametrização ativa.

**Notas específicas:**
- Usar `GET /apoios/documentos-entrada?...&somenteComEmbalagens=true&limite=20`. Com `true`, só notas com etiquetas do
  recebimento vigente concluído e não compensado (`qtdEmbalagens>0`, `idEvento=ultimoCicloValido`, `compensado=false`).
- Aceita exatamente `true`/`false`; vazio, repetido ou outro valor → `FILTRO_INVALIDO`. Não exigir natureza no filtro da tela.
- Confirma vínculo com recebimento, não disponibilidade atual (posição e filtros da grade ainda podem eliminar etiquetas).

**Impacto no Fluig (conferido no Dataset local em 08/10/2026):** `NW_ACOES.apoiarItens` aceita só
`codEstabel filtro aposCodigo limite` e `apoiarDocumentosEntrada` aceita `codEstabel estabelDe estabelAte filtro aposCodigo limite`.
Os parâmetros novos seriam recusados (`ENTRADA_INVALIDA`). Integrar exige **alterar o Dataset (com autorização) e republicar**,
e depois o widget (`montarParametrosApoio`). Esperar o aceite REST do backend antes.

**Passos do backend (responsabilidade da equipe Progress, registrados para contexto):** copiar a pasta ET-01_TESTE;
`RUN ".../testes/rest/compilar-apoio-itens-save.p"` exigindo `FONTES=6 FALHAS=0`; rodar `testar-apoio-itens-lote.r ("10904","36")`
e `testes/t04/testar-manutencao-consulta.r ("10904","999980")` com `FALHAS=0`; publicar só `contr-emb.r`,
`contr-emb-recebimentos.r` e `controle-embalagens.r` em `esp/api/v1` de TESTE e renovar o PASOE TESTE. Bags (DT123) não entram.

## 6.1 Conferência do Dataset para publicação (08/10/2026, ~14h30)

Pergunta do usuário: "O Dataset já está correto? só subir?". Conferido em `../widget_nw_embalagens/datasets/dsNwEmbalagens.js`:
- **Para o widget atual (commit `010d273`), está coerente:** os 13 tipos de chamada do widget usam só parâmetros aceitos em
  `NW_ACOES` (0 recusas); `testes/testar-configuracao-operacoes-dataset.cjs` = 25 cenários, 0 falhas, backup conferido;
  sintaxe OK.
- **Não está publicado com certeza:** o arquivo foi alterado às 12:17, depois da validação da manhã. Diferença para o
  `dsNwEmbalagens.js.bak` (09:58, SHA256 `0523403f…`, versão validada no Fluig): só a liberação das operações
  (`criarTransferencia`, `criarRemessa`, `criarDevolucao` em `escritasHabilitadas` e regra do `DefaultGroup-1` para
  `classificarNatureza`, `consultarEmbalagensOrigem`, `consultarResultadoOperacao`, `obterDadosImpressao` e os três `criar*`,
  estabelecimentos 10904 e 11301). SHA256 atual começa por `e6d5f08c`.
- **Não commitado** no repositório `widget_nw_embalagens` (48 linhas a mais que o HEAD, incluindo a ampliação DT120).
- **DT124 não está no Dataset:** `tipoControleEstoque` e `somenteComEmbalagens` não são aceitos. Não impede publicar agora,
  porque o widget ainda não envia esses parâmetros.
- Publicar libera comandos reais em TESTE (documento de trabalho no Datasul) para o `DefaultGroup-1`.

## 6.2 Leitura completa da página antiga (08/10/2026, ~14h40)

Pasta `pagina_antiga_manutencao_etiquetas/` (somente leitura): widget `ver2_manutencaodeetiquetas`, versão exibida
"v30.07.2026". Lidos por inteiro: JS (7.882 linhas), `view.ftl`, CSS, `application.info`, `edit.ftl`, `.properties`, XML.
Bibliotecas de terceiros (Select2 4.1.0-rc.0, Bootstrap Icons 1.11.3) e o `.war` (mesmos 19 arquivos) só identificados.
Pontos úteis para a tela nova:
- Todo acesso a dados por `dsGetExecBO` chamando BOs Progress: `_bp/api/etiquetas_v2.p` (`pi-relatorio-saldo-fisico`,
  `pi-registra-log`, `pi-busca-etiqueta`, `pi-gera-saldo-etiqueta`, `pi-transferir-etiqueta`, `pi-log-etiqueta` etc.),
  `pre-faturamento_v2.p` e `recebimento_fiscal_v2.p`. Várias chamadas síncronas.
- Situação numérica do log: 1 Criada, 2 Impressa, 3 Em estoque, 4 Em campo, 5 Armazenada em Bag, 6 Descartado, 7 Zerada.
- Permissão no navegador: grupos `adm_etiquetas` e `adm_abas_etiquetas` via `/api/public/2.0/users/getCurrent` síncrono;
  estabelecimento/depósito permitidos por `pi-permissao-estab-depos`.
- Aba Recebimento: leitor de código de barras; se digitado (intervalo entre teclas > 300 ms) exige justificativa de 20+ caracteres.
- Impressão por aplicativo local `http://localhost:32478` (impressoras, imprimir), template no documento Fluig 423.
- Transferência para estabelecimento diferente ou fornecedor gera pré-faturamento (natureza, série, itens) com verificação
  de consistência e reprocessamento; caminhos fixos `\\192.168.1.102\c$\temp\` e `C:\temp\`.
- NF específicas: CNPJ (validado) + nota de 7 dígitos + série até 3 dígitos. "Escolher item + Quantidade" exige múltiplo
  da quantidade da embalagem cheia.

## 6.3 Aviso no "Escolher item" vazio (08/10/2026, ~14h50) — sem commit

Pedido: ao clicar no select "Escolher item" vazio, mostrar `FLUIGC.toast` "É necessário ter ao menus um item selecionado"
(texto aplicado com a correção "ao menos"). Feito:
- `view.ftl`: atributo `data-caixa-item-qtde` na caixa do select.
- JS: binding `'caixa-item-qtde': ['click_avisarItemQuantidadeVazio']`; o método avisa (`warning`) quando
  `itensElegiveisQuantidade()` está vazio.
- CSS: select desabilitado com `pointer-events: none` (o clique chega à caixa mesmo sem Select2) e cursor `not-allowed` na caixa.
- Docs do widget atualizados (Barra de seleção). Testes: 160 cenários, 0 falhas; verificação avulsa do método: 3 cenários, 0 falhas.
- **Não confirmado no navegador** que o Select2 desabilitado deixa o clique subir até a caixa.

## 6.4 Fluxo de impressão da tela antiga (08/10/2026, ~15h) — só leitura

Pedido do usuário: "Veja o fluxo de impressão na tela antiga". Arquivo `pagina_antiga_manutencao_etiquetas/resources/js/ver2_manutencaodeetiquetas.js`:
- **Infra:** aplicativo local na máquina do usuário, `http://localhost:32478` (`GET /impressoras` lista e devolve
  `impressorapadrao`; `POST /imprimir` com `{impressora, template, dados}`). Template baixado do GED do Fluig
  (`/webdesk/webdownload?documentId=423&version=1000`) ao carregar o script (`buscarTemplate`, l. 1452/4185).
  Impressora escolhida fica no `localStorage` (`impressora`).
- **Botão "Impressora"** (`selecionarImpressora`, l. 3927): modal com select das impressoras; `onchange` salva no
  localStorage; ação "Testar" imprime etiqueta fictícia (`testarImpressao`).
- **Individual** (`getBotaoImprimir`, só aba Administrador e status "Não Impresso"; `imprimirEtiqueta`, l. 2505):
  monta `{PRODUTO, CODIGO, LOTE, DATAVAL, CBARRA, QTD=qtidade-ini, UN}`, chama `chamarImpressao` e, **sem esperar o
  resultado**, grava `pi-registra-log` situação 2 e pinta a linha como "Impressa".
- **Lote** (Ação em lote → Imprimir, `batchImprimir`, l. 434): só "Não Impresso"/"Impressa" imprimem; as demais vão para
  modal "não podem ser impressas". Grava o log de todas (`registraLogEmLote`, l. 7088), abre modal "Log registrado com
  Sucesso!" e só no **Ok** envia as impressões uma a uma (`imprimirEtiquetaEmLote`, l. 4080) com barra de progresso.
- **Fragilidades observadas:** log gravado antes/independente da impressão (falha de impressão não desfaz "Impressa");
  falha de conexão com o app (status 0) é silenciosa; handler do Ok do lote usa `$(document).on` sem `.off` (repetir o lote
  pode reimprimir lotes anteriores — inferido do código, não testado); dados da etiqueta vêm do `value` do checkbox
  separado por vírgula (descrição com vírgula desloca campos); `onclick` com aspas simples quebra com apóstrofo;
  `testarImpressora` e `imprimirEmLote` não são chamadas; correção de acento na resposta troca o 1º caractere não-palavra por "ã".
- **Botão "Impressora" (confirmado a pedido do usuário):** `view.ftl` l. 11-15 da tela antiga, `btn btn-xs btn-default`
  com `data-sel-impressora`, logo abaixo do título e fora das abas (visível nas duas). Binding `'sel-impressora': ['click_selecionarImpressora']`.
  A tela nova **não tem** esse botão nem nada de impressora (grep em `view.ftl` e JS: 0 ocorrências).
- **Tela nova:** contrato atual só tem `obterDadosImpressao` (uma etiqueta por chamada, recusa `PRE_SALDO`); layout/serviço
  de impressão, cópias e lote **não contratados**; reimpressão não muda saldo. Nada implementado.

## 6.5 Botão "Impressora" e modal "Configurar impressora" (08/10/2026, ~15h) — sem commit

Pedido: no lugar do "+ Novo" do padrão (removido desta tela), botão com engrenagem escrito "Impressora" para configurar
impressora; modal com orientações semelhante ao da tela antiga, **no nosso padrão de modal (`<dialog>`), não `FLUIGC.modal`**.
- **Correção exigida pelo usuário:** o botão segue **o mesmo visual do botão Buscar** (`nwm-btn nwm-btn-destaque`). Eu tinha
  usado `nwm-btn-contorno` por conta própria e o usuário reprovou com veemência. Regra: botão de ação no cabeçalho = visual do Buscar.
- `view.ftl`: `.nwm-cabecalho-acoes` com o botão `data-abrir-impressora` (`bi-gear`); `<dialog data-modal-impressora>` com 3
  orientações, select `data-impressora-lista`, mensagem `data-impressora-mensagem`, botões Atualizar/Testar/Salvar e X.
- JS: constantes `NWM_APLICATIVO_IMPRESSAO`, `NWM_URL_TEMPLATE_ETIQUETA` (doc 423), `NWM_CHAVE_IMPRESSORA` (`impressora`, mesma
  chave da tela antiga), `NWM_ETIQUETA_TESTE`; bindings `abrir-impressora`, `fechar-impressora`, `atualizar-impressoras`,
  `impressora-lista` (change), `testar-impressora`, `salvar-impressora`; métodos curtos (`carregarImpressoras`, `preencherImpressoras`,
  `limparImpressoras`, `testarImpressora`, `obterTemplateEtiqueta`, `salvarImpressora` etc.). localStorage com try/catch.
- CSS: `.nwm-cabecalho-acoes` (no celular, largura total), `.nwm-impressora-orientacoes`, mensagem reaproveitando o estilo de
  `.nwm-operacao-mensagem` (oculta quando vazia).
- **Verificado em navegador local** (página montada com view/JS/CSS reais + aplicativo de impressão falso na porta 32478):
  botão com o mesmo computado do Buscar (verde `rgb(0,107,53)`, 44px, raio 10px, peso 700); lista carregada com a padrão marcada;
  Testar enviou `POST /imprimir` com impressora, template e dados de teste; Salvar gravou `localStorage.impressora`, fechou o modal e
  mostrou toast; aplicativo fechado → lista limpa, Testar/Salvar desabilitados, mensagem de orientação. Testes do widget: 160/0.
- **Não validado no Fluig real** nem com o aplicativo de impressão verdadeiro.

## 6.6 Nota Fiscal De/Até com autocomplete (08/10/2026, ~15h20) — sem commit

Pedido: "No campo Nota fiscal tem o De/Até que também devem ser autocomplete fluig, usando a mesma busca que hoje existe em
'especificas', mas para 'de' e 'até'".
- Interpretação aplicada: o **mesmo autocomplete próprio** da tela (o de Específicas), não `FLUIGC.autocomplete` — o padrão `nw`
  usa autocomplete próprio. Se o usuário quiser literalmente o componente FLUIGC, confirmar.
- Contrato conferido no `MANUTENCAO_ETIQUETAS_DT120_20261007.md`: `notaDe`/`notaAte` recebem o **número da nota**
  (ex.: `notaDe=9999801`); o `codigo` opaco só serve para `documento` (Específicas).
- JS: `prepararApoiosFiltros` liga `nfDe`, `nfAte` e `nfEspecificas` a `apoiarDocumentosEntrada`; novo `valorSelecionadoApoio`
  (documento → `numero`, demais → `codigo`); `selecionarApoioFiltro` só adiciona à lista quando o campo é `nfEspecificas`;
  `campoTemRegistroSelecionado` recebe o apoio; mudar Estabelecimento invalida as sugestões de todos os campos `nf*`
  (o número digitado em De/Até é mantido).
- Teste `testes/testar-apoios-filtros.cjs` (fora do git): contagem de campos com apoio 11 → 13 e cenário novo (sem
  estabelecimento não busca; com estabelecimento chama `apoiarDocumentosEntrada` com `estabelDe/estabelAte`; seleção preenche
  o número). Total: 161 cenários, 0 falhas. Docs do widget atualizados.
- Não validado no Fluig.

## 6.7 Diagnóstico em andamento: busca da nota no intervalo não funciona no Fluig (08/10/2026, ~15h30)

Usuário: "Acesse minha tela e veja, não está indo a busca da nota no intervalo" (página
`http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/ManutencaoDeEmbNew`).
- Aberto no Chrome do usuário (Claude in Chrome, aba criada pela sessão). Conferido por JS: o widget publicado **já tem o código novo**
  (`valorSelecionadoApoio` existe, botão Impressora existe, `nfDe` com `role=combobox`). Ou seja, o usuário publicou e o problema é real.
- **Ainda não investigado** (limite de uso atingido). Próximos passos: preencher Estabelecimento De/Até, digitar 2+ caracteres em
  Nota Fiscal De, ler `read_network_requests` (`/api/public/ecm/dataset/search`, ação `apoiarDocumentosEntrada`) e o console;
  conferir se o rádio Intervalo esconde/mostra os campos certos, se a lista de sugestões aparece e se a resposta vem com `numero`.
  Hipóteses: CSS/posição da lista dentro do bloco de intervalo; regra do Dataset/permissão; campo sem estabelecimento.

### 6.7 (continuação) — causa encontrada e corrigida localmente (08/10/2026, ~16h) — sem commit, falta publicar

- Reproduzido no Chrome do usuário: Estabelecimento De/Até 10904, Nota Fiscal De "9999" → lista mostrava
  "As sugestões estão fora do contrato esperado" (`RESPOSTA_INVALIDA` de `validarPaginaApoio`).
- Causa (conferida chamando `chamarEmbalagens('apoiarDocumentosEntrada', ...)` na página): 3 de 16 documentos reais vêm com
  **`serie: ""`** (ex.: notas `9999921`, `0099996`, `699998367143`). `documentoValido` exigia série preenchida, e um registro reprova a
  página inteira. Afetava também as Específicas.
- Correção no JS: `NWM_CAMPOS_DOCUMENTO` sem `serie`; `serieDocumentoValida` (texto, pode ser vazio, sem caractere de controle);
  `textoNotaSerie` mostra "sem série" na sugestão e na lista de documentos. Teste novo em `testar-apoios-filtros.cjs`
  (série vazia aceita; controle e `undefined` recusados). Total 162 cenários, 0 falhas.
- Confirmado com dados reais aplicando as funções novas **temporariamente** na página (sem publicar): as sugestões apareceram,
  inclusive "NF 9999921 · sem série". Aba fechada em seguida.
- **Pendente:** usuário publicar o widget no Fluig e testar.

## 6.8 Novo arranjo da barra de seleção (08/10/2026, ~16h15) — sem commit

Pedido (desenho do usuário):
```
[ Tab Itens Selecionados ]   Escolher Item   Quantidade
-------------------------------------------------------
Ação em Lote                 Código de barra
[ ]Aplicar                   [  ]
```
- `view.ftl`: `.nwm-selecao` agora tem duas `.nwm-selecao-linha`. Linha 1: tabela Itens selecionados | Escolher item + Quantidade/Executar.
  Linha 2 (com linha separadora): Ação em lote + Aplicar | **Código de barras** (campo novo `data-leitor-cod-barras`,
  `id nwm-cod-barras-${instanceId}`, placeholder "Leia ou digite o código de barras"). Atributos `data-*` antigos preservados (JS intacto).
- **Código de barras sem comportamento** (só visual): aguardando o usuário definir o que acontece ao ler/digitar (na tela antiga, o leitor
  da aba Recebimento chamava "Receber"; não implementar sem confirmação).
- CSS: `.nwm-selecao` em coluna; `.nwm-selecao-linha` (flex, 2 colunas de 50%); segunda linha com `border-top` e `align-items: flex-end`;
  `.nwm-selecao-coluna` com a mesma largura de `.nwm-selecao-resumo`; abaixo de 1200px tudo em largura total.
- Ajuste pedido pelo usuário ("Escolher item e Quantidade não ficaram centralizados com a tabela"): o bloco rótulo+campo estava
  centralizado, mas os campos ficavam 12px abaixo do centro da tabela. CSS no fim do arquivo: `@media (min-width: 1200px)` com
  `padding-bottom: 25px` (altura do rótulo 19px + margem 6px) em `.nwm-selecao-linha:first-child .nwm-selecao-acoes`.
  Medido no Chrome: centro da tabela 247px; Escolher item, Quantidade e Executar 246px.
- Testes: 162 cenários, 0 falhas. Visualização local: servidor `python -m http.server 8765` servindo `scratchpad/harness/site`
  (página montada pelo `montar_pagina.py`, agora com o CSS do Style Guide do servidor TESTE), aberta no Chrome do usuário.

## 6.9 DT124 integrada: `tipoControleEstoque` e `somenteComEmbalagens` (08/10/2026, ~16h40) — sem commit, falta publicar

Pedido: "No autocomplete de itens e nota fiscal, você deve mandar 'true' e não 'todos'". Conferido na tela publicada que nada enviava
"todos"; perguntado ao usuário, ele escolheu seguir a DT124 (Itens: `tipoControleEstoque=3`; Notas: `somenteComEmbalagens=true`).
- **Dataset** (`../widget_nw_embalagens/datasets/dsNwEmbalagens.js`, autorizado ao escolher a opção): `apoiarItens` aceita
  `tipoControleEstoque`; `apoiarDocumentosEntrada` aceita `somenteComEmbalagens`. Valores validados pelo backend (`FILTRO_INVALIDO`).
  GET exige texto, então o widget manda `"3"` e `"true"`. Cópia anterior no scratchpad (`dsNwEmbalagens.antes-dt124.js`).
- **Widget**: constante `NWM_RESTRICOES_APOIO` aplicada em `montarParametrosApoio` (Itens De/Até; Nota Fiscal De/Até e Específicas).
  Busca interna de descrição do item (`parametrosDescricaoItem`) sem filtro.
- **Testes** (fora do git) atualizados: apoios, funções e configuração do Dataset (o último agora aceita só as duas linhas da DT124 fora
  do `NW_CONFIG` e verifica `tipoControleEstoque=3`/`somenteComEmbalagens=true` no endpoint). Total: 189 cenários, 0 falhas.
- **Risco:** a DT124 dizia "compilação OpenEdge e aceite REST pendentes". Se o backend TESTE ainda não tiver os `.r` novos, o REST pode
  recusar/ignorar os parâmetros. Publicar **Dataset primeiro, depois o widget**, e testar Itens e Nota Fiscal.

## 6.10 Conferência com a DT mais atual (08/10/2026, ~16h55) — só análise, nada alterado

Pedido: "Analise o DT mais atual e veja se tudo nosso está de acordo". DTs mais recentes encontradas: DT124 (colada pelo usuário, seção 6)
e `MANUTENCAO_ETIQUETAS_DT120_20261007.md` (lida inteira). A cópia local de `fluig-rest/docs/02_DECISOES_TECNICAS.md` vai só até DT-109.
- **De acordo:** parâmetros do GET /etiquetas (faixas, `modoNotas`, `notaDe/notaAte`, `documento` opaco repetido, datas ISO, `limite`
  100, cursor `aposId` reiniciado ao mudar filtro); apoios (filtro mínimo 2, `limite` 20, `aposCodigo`, `codEstabel` só com
  estabelecimento único, recorte `estabelDe/Ate`, `itemDe/Ate`, `depositoDe/Ate` em lotes/documentos); `codigo` do documento guardado
  sem alteração e exibição de número/série/emitente/estabelecimento/natureza; específicas 1 a 20 sem duplicata, sem misturar com
  intervalo; Cód Barras e Validade sem autocomplete; envelope `total` = tamanho da página; DT124 `tipoControleEstoque=3` só nos
  campos Itens De/Até (parametrização não envia) e `somenteComEmbalagens=true` nas notas; série vazia aceita.
- **Atenção (não corrigido, só apontado):** (1) campos de filtro sem `maxlength`; a DT120 limita o `filtro` dos apoios a 100 caracteres
  e o Dataset recusa acima disso com mensagem genérica — sugerido `maxlength="100"`. (2) `somenteComEmbalagens` foi aplicado também
  ao De/Até da Nota Fiscal (a DT124 cita a busca de específicas; o usuário pediu a mesma busca no De/Até). (3) DT124 com compilação/
  aceite REST pendentes no backend; Dataset e widget ainda não publicados. (4) Desempenho em volume e `CONSULTA_AMPLA` não testados.

## 6.11 Os 4 pontos de atenção resolvidos (08/10/2026, ~17h10) — sem commit

Pedido: "Faça os 4 pontos de atenção" (da seção 6.10).
1. `maxlength="100"` nos 15 campos de texto dos filtros (`view.ftl`; datas não). Docs atualizados.
2. `somenteComEmbalagens` no De/Até **mantido**: decisão do usuário ("no autocomplete de ... nota fiscal, você deve mandar true");
   nota sem etiqueta não traria embalagem no intervalo. Registrado nos docs.
3. Conferido no Fluig TESTE (consulta só de leitura via `chamarEmbalagens`): o **Dataset publicado é o antigo** — `apoiarItens` com
   `tipoControleEstoque` e `apoiarDocumentosEntrada` com `somenteComEmbalagens` retornam `CAMPO_NAO_PERMITIDO`. O estado do backend
   DT124 só pode ser visto depois de publicar o Dataset novo. Verificação para rodar no console da página após publicar:
   `const w = window[document.querySelector('[id^="widget_nw_manutEtiq_"]').id]; w.chamarEmbalagens('apoiarItens', { filtro: '0011', limite: 20, codEstabel: '10904', tipoControleEstoque: '3' }).then(r => console.log(r.sucesso, r.codigoErro, r.dados && [...new Set(r.dados.map(d => d.tipoControleEstoque))])); w.chamarEmbalagens('apoiarDocumentosEntrada', { filtro: '001955', limite: 20, estabelDe: '10904', estabelAte: '10904', somenteComEmbalagens: 'true' }).then(r => console.log(r.sucesso, r.codigoErro, r.dados && r.dados.map(d => d.qtdEmbalagens + '/' + d.compensado)));`
   Esperado: `true ''` com controles `[3]`; notas com `qtdEmbalagens > 0` e `compensado false`. `FILTRO_INVALIDO` = backend sem DT124.
4. Volume: no TESTE a consulta ampla (estabelecimento 10904 ou 0..ZZZZZ, itens 0..Z…) trouxe só **50 etiquetas** em 1 página,
   ~2,3–2,8 s por chamada; `CONSULTA_AMPLA` (5.000 documentos/50.000 embalagens) não é alcançável com essa massa. Garantido o
   tratamento na tela: 2 cenários novos em `testes/testar-consulta-etiquetas.cjs` (erro na 1ª página e na 2ª página: mensagem do
   backend no alerta, nenhuma linha exibida). Total: 191 cenários, 0 falhas. **Desempenho em produção continua não medido.**

## 6.12 Conferência após o usuário publicar Dataset e widget (08/10/2026, ~17h40)

Pedido: "Atualizei o dataset e a widget, veja se está tudo ok ... Marque pra mim o que falta". Conferido no Chrome do usuário (só leitura):
- **OK:** widget publicado com tudo (botão Impressora `nwm-btn-destaque`, modal, 2 faixas, Código de barras, `maxlength` 15 campos,
  NF De/Até/Específicas com autocomplete, `NWM_RESTRICOES_APOIO`, série opcional, aviso Escolher item, centralização 25px).
  Dataset novo aceita os parâmetros DT124 e o **backend TESTE já aplica a DT124**: `tipoControleEstoque=1` → `FILTRO_INVALIDO`
  ("Informe tipoControleEstoque=3 ou omita o filtro"); itens "0011" com filtro 3 → 0 (todos controle 1); "3578" → só
  357867 REGLONE (controle 3, único item com etiquetas no TESTE); notas "9999" com `somenteComEmbalagens=true` → 4 de 16
  (`qtdEmbalagens` 2/15/25/2, `compensado=false`). Fluxo pela tela: Estab 10904 + NF De 9999801 / Até 9999805 (escolhidas no
  autocomplete) + Buscar → **40 etiquetas**, REGLONE, todas ATIVA, "Mostrando 40 etiquetas".
- **Problemas encontrados:** (1) coluna **Ações** não cabe: 7 botões em 210px; a grade fica com rolagem horizontal (1246px em 1127px
  visíveis em janela 1366) e **Transferir/Devolver ficam fora da área visível**. (2) Na 1ª tentativa o autocomplete da NF não disparou a
  consulta (sem erro no console); nas 2 seguintes, com rastreamento, funcionou — **não reproduzido**. Hipótese: cache do JS antigo
  (versão continua `0.1.0`, URL `?v=0.1.0`); sugerir subir `application.version` a cada publicação.
- **Pendentes conhecidos:** Código de barras sem ação definida; impressão real das etiquetas não integrada (só configuração/teste da
  impressora); operações (Transferência/Remessa/Devolução) não testadas no TESTE (criam documento real); visão não-ADM; legenda definitiva;
  ações sem contrato (Estornar/Descartar/Imprimir/Receber); volume de produção; commit de tudo (widget + Dataset).

## 6.13 Coluna Ações: 3 botões + "…" com modal "Mais ações" (08/10/2026, ~18h) — sem commit, falta publicar

Problema (seção 6.12): 7 botões (262px) na coluna de 210px → grade com rolagem e Transferir/Devolver escondidos. Pedido do usuário:
"Mostra os 3 botões que funcionam e coloca um '...' para clicar lá e abrir um modalzinho".
- JS: `NWM_ACOES` com `secundaria: true` em imprimir/receber/estornar/descartar; `montarBotoesAcoes` mostra Detalhes, Transferir,
  Devolver e o "…" (`montarBotaoMaisAcoes`, `data-acao="mais"`, só para `EMBALAGEM`); `acaoNaLinha('mais')` → `abrirMaisAcoes`;
  `montarItemMaisAcoes` (botão com ícone, rótulo e motivo via `textoMotivoIndisponivel`); clique em ação habilitada →
  `executarAcaoSecundaria` → `acaoNaLinha`. Binding `fechar-mais-acoes`; fecha pelo fundo.
- `view.ftl`: `<dialog class="nwm-modal nwm-modal-pequeno" data-modal-mais-acoes>`. CSS: `.nwm-mais-acoes*`.
- Larguras: Ações 210 → 160; Status 180 → 120; Descrição mínimo 180 → 170. Medido na prévia local com 8 etiquetas reais e grade
  ajustada a 1127px (largura visível do Fluig em 1366): largura total 1127 = visível, sem rolagem; 4 botões visíveis; nenhum título
  truncado; nenhum selo cortado. Modal conferido em tela.
- Teste de botões atualizado (linha = detalhes/transferir/devolver/mais; itens do modal desabilitados com motivo; PRE_SALDO só detalhes).
  Total 191 cenários, 0 falhas. Docs do widget atualizados.

## 6.14 Status operacional do backend: `situacaoApresentada` / `descricaoSituacao` (08/10/2026, ~18h30) — sem commit, falta publicar

Contrato novo colado pelo usuário: GET `/etiquetas` acrescenta `situacaoApresentada` (código), `descricaoSituacao` (texto de exibição),
`impressaoConfirmada` e `recebimentoFisicoConfirmado` (booleanos). Pedido: "Coluna Status e legenda: usar situacaoApresentada e
descricaoSituacao. situacao continua sendo o estado técnico... Os booleanos informam as confirmações".
- Conferido no TESTE (só leitura): campos já chegam. 50 etiquetas: `ATIVA|NAO_IMPRESSA|"Nao impressa"|false|false` 39;
  `ATIVA|EM_ESTOQUE|"Em estoque"|true|true` 1; `CANCELADA|CANCELADA|"Cancelada"|false|false` 10. O backend manda "Nao impressa" sem acento.
- JS: mapeamento dos 4 campos (fallback para a situação técnica e `null` se ausentes; tipo errado → fora do contrato); coluna Status
  (`field: descricaoSituacao`) com `montarChipStatus(codigo, descricao)`; legenda dinâmica (`situacoesApresentadas`, quantidade por
  status; sem busca → orientação); Detalhes com Status operacional, Situação técnica, Impressão confirmada, Recebimento físico
  confirmado. `NWM_STATUS` só com `rotulo` (removidos `legenda` e `NWM_STATUS_ORDEM`). Regras continuam por `situacao`.
- CSS: selos `EM_ESTOQUE` (verde) e `NAO_IMPRESSA` (neutro); selo da grade com `max-width` e "…". Larguras: Status 136,
  Descrição mínimo 154 ("Nao impressa" tem 114px). Prévia local a 1127px: sem rolagem, nenhum selo/título cortado, 4 botões ok.
- `view.ftl`: subtítulo da legenda. Testes: chip atualizado + cenário do contrato novo. Total 192 cenários, 0 falhas.
- **A confirmar com o usuário:** lista completa de códigos de `situacaoApresentada` e cor de cada um.

## 6.15 Selo do item selecionado nos autocompletes (08/10/2026, ~18h50) — sem commit, falta publicar

Pedido: "Quando eu selecionar o item no autocomplete ... deve ter uma badgezinha, inclusive com um botão para remover, só pode
selecionar um. Em todos os campos que são AUTOCOMPLETE, exceto notas especificas".
- JS: `criarSelecionado` (selo `.nwm-selecionado` > `.nwm-selecionado-chip` com texto + botão × `bi-x`, inserido após o input),
  `mostrarSelecionado` (chamado em `selecionarApoioFiltro`; texto = código ou número da nota; `title` = principal — complemento;
  input `is-selecionado` + `readOnly`; foco no ×), `esconderSelecionado`, `removerSelecionado` (limpa, dispara `input`, foca o campo).
  `apoio.selecionado` bloqueia a busca no foco. Lote/Notas limpos por mudança de recorte também escondem o selo. Específicas sem selo.
- CSS: selo verde-névoa de altura 38px dentro da metade De/Até, texto com "…", × redondo.
- Teste novo em `testar-apoios-filtros.cjs`. Total 193 cenários, 0 falhas. Visual conferido na prévia local (Estab, Itens, NF De).

### 6.15 (continuação) — selo "código - descrição" (08/10/2026, ~19h10)

Pedido: "faltou as descrições, em todos os campos, tipo 10904 - JOAO BRANCO PERES...".
- Selo com duas partes: `.nwm-selecionado-codigo` (nunca encolhe; `max-width: 100%`) e `.nwm-selecionado-descricao` (encolhe com "…").
  Lição: deixar o código com `flex-shrink` > 0, mesmo mínimo, gera corte subpixel e "…" indevido ("99998…").
- Textos (dados reais da etapa 1): Estab "10904 - JOÃO PAULO BRANCO PERES E OUTROS"; Item "357867 - REGLONE"; Depósito "100 - COMBUSTIVEL
  INTERNO"; Família "0605 - …"; Lote só o código (descrição = código); Nota "9999800 - SIPCAM NICHINO BRASIL S.A." (`descricaoEmitente`;
  sem ele, "série X" ou "sem série"). Espaço antes do traço é ` ` (espaço inicial some em flex).
- Limite conhecido: Lote "01102025-2" (70px) não cabe na meia caixa do Lote (55px livres) → "011020…", completo no `title`.
- Prévia: `montar_pagina.py` agora põe `?v=<hora>` em `widget.css`/`widget.js` (cache enganou uma medição). Testes 193/0.

## 6.16 Análise de clean code do JS (08/10/2026, ~19h20) — só análise, nada alterado

Medido no `widget_nw_manutEtiq.js` (scripts `analisar_clean_code.cjs`/`analisar_uso.cjs` no scratchpad): 301 métodos, 0 comentários,
0 DOM nativo, 0 nomes de uma letra; só `montarTabela` e `camposDetalhes` com 23 linhas.
Achados propostos ao usuário (ordem de prioridade):
1. Código morto: `textoSelecionado` (só os testes usam), `normalizar` (nunca chamado); fluxo de confirmação inteiro sem uso —
   `pendente` nunca recebe valor, `pedirConfirmacao` só repassa para `aplicarAcao` (parâmetro `ignoradas` sem uso), `confirmarAcao`,
   `fecharConfirmar`, `ligarDescarteConfirmacao`, `$modalConfirmar`, bindings `fechar-confirmar`/`confirmar-acao` e o `<dialog
   data-modal-confirmar>` do `view.ftl` (o modal nunca é aberto).
2. `$.trim` (11x) obsoleto desde jQuery 3.5 (Fluig 3.6.3) → `String(valor).trim()`.
3. Números de largura das colunas soltos em `montarTabela`/`colunas*` (ajustados para caber em 1127px) → constante `NWM_LARGURAS_COLUNAS`.
4. Literal `'apoiarDocumentosEntrada'` 8x → método `apoioDeDocumentos(apoio)`; estados da operação (`'incerta'` 10x, `'edicao'` 8x) e
   tipo de erro `'tecnico'` 14x → constantes. Repetição `$('[data-operacao-direta], [data-operacao-origem]').prop('hidden', true)` 3x.
5. `montarTabela` e `camposDetalhes` 23 linhas (leve); comentário HTML no `view.ftl` (l. 22) — o padrão vale para o JS.
Não recomendado mexer: 14 métodos com parâmetro booleano (uso claro, custo alto de mudança).

## 6.17 Clean code aplicado no JS (08/10/2026, ~17h10) — sem commit, falta publicar

Os 5 achados da seção 6.16 foram aplicados (script Python sobre bytes, UTF-8 + CRLF mantidos). Sem mudança de comportamento.
1. Código morto removido: `textoSelecionado`, `normalizar`, `pendente`, `pedirConfirmacao` (a linha chama `aplicarAcao` direto),
   `fecharConfirmar`, `confirmarAcao`, `ligarDescarteConfirmacao`, `$modalConfirmar`, bindings `fechar-confirmar`/`confirmar-acao`,
   o `<dialog data-modal-confirmar>` do `view.ftl` e o CSS que só ele usava (`.nwm-modal-confirmacao`, `.nwm-confirmacao-icone`).
2. `$.trim` (10 usos restantes) → `String(valor || '').trim()`; nenhum `$.trim` no arquivo.
3. Larguras → `NWM_LARGURAS_COLUNAS`, `NWM_ALTURA_MAXIMA_TABELA` (560), `NWM_CRESCIMENTO_DESCRICAO` (3); mesmos valores.
4. `NWM_APOIO_DOCUMENTOS` + método `apoioDeDocumentos(apoio)`; `NWM_TIPOS_ERRO` (tecnico/funcional/autorizacao/cancelamento);
   `NWM_ESTADOS_OPERACAO` (todos os 8 estados da operação) + `estadoOperacaoEntre(operacao, estados)` no lugar das regex;
   `esconderRamosOperacao()`. Estados da consulta/carga (`carregando`, `sucesso`, `vazio`, `erro`, `cancelada`) seguem literais (fora da análise).
5. `montarTabela` → `opcoesTabela()`; `camposDetalhes` → `camposSituacaoDetalhes` + `camposEmbalagemDetalhes`; removido o comentário
   HTML do `view.ftl`. Maior método agora: 20 linhas (`consultarDataset`). 301 métodos.
Teste ajustado: `testar-apoios-filtros.cjs` deixou de usar `textoSelecionado` (confere `partesSelecionado` e o texto do selo, que usa
espaço não separável antes do hífen). Testes: 193 cenários, 0 falhas (antes e depois). `CLAUDE.md`/`AGENTS.md`: lista de `<dialog>` corrigida.
Não confirmado: comportamento ao vivo no Fluig (falta publicar).

## 7. Próximos passos sugeridos (só com pedido do usuário)

1. Publicar o widget e validar no Fluig (etapa 5 do plano): busca, apoios, notas específicas, seleção, detalhes, modal de operação.
2. Resolver a divergência plano × código (seção 5).
3. Após aceite REST da DT124: propor a mudança no Dataset (`apoiarItens`, `apoiarDocumentosEntrada`), republicar e integrar no widget.
4. Decidir sobre `testes/` e `evidencias/` no git.

## 8. Referências

- Plano: [PLANO_IMPLEMENTACAO_MANUTENCAO_ETIQUETAS.md](PLANO_IMPLEMENTACAO_MANUTENCAO_ETIQUETAS.md) (status da seção 1 desatualizado; ver seção 5 acima).
- DT120: [MANUTENCAO_ETIQUETAS_DT120_20261007.md](MANUTENCAO_ETIQUETAS_DT120_20261007.md).
- Retornos reais da etapa 1: `evidencias/etapa1-20261008/resultado-dataset.json`; regressão: `evidencias/etapa1-20261008/regressao-telas.txt`.
- Página de teste: `http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/ManutencaoDeEmbNew`.
- Docs do backend: `../widget_nw_embalagens/fluig-rest/docs/`.

## 9. Observações do ambiente

- Codex (sessão anterior): comandos de shell sem elevação falhavam com `helper_unknown_error: setup refresh had errors`;
  era do ambiente, não do widget.
- Claude Code (Windows, Git Bash): `$'\r'` e `awk` não contam CR de forma confiável nesse shell. Para conferir CRLF, use
  Python (`b.count(b'\r\n')`) ou PowerShell lendo bytes.
- Fontes do widget (`.js`, `.ftl`, `.css`, `AGENTS.md`, `CLAUDE.md`): UTF-8 sem BOM + CRLF. Este arquivo e o `CLAUDE.md` da raiz: LF.
