# widget_nw_manutEtiq

> Regras gerais (versões, SuperWidget, Style Guide): `CLAUDE.md` da raiz do repositório. Aqui fica só o que é deste widget.
> Preencher só com o que o usuário informou ou o que está nos fontes. O que não se sabe fica "a definir".
> Histórico de decisões, levantamento da tela antiga e evidências: `HISTORICO.md` desta pasta (registro contínuo; atualizar a cada interação).
> Padrões gerais do Fluig da Branco Peres (visual, Dataset, Style Guide): skill `fluig-branco-peres`.
> `AGENTS.md` (Codex) e `CLAUDE.md` (Claude Code) desta pasta têm o mesmo conteúdo, exceto a linha 3: ao alterar um, altere o outro.

## Objetivo
Tela **Manutenção Embalagens**: consulta, recebimento, impressão e movimentação de etiquetas de embalagem.
Refaz a tela legada **Manutenção Itens/Etiquetas** (`v2_widget_manutencao_etiquetas`, widget
`ver2_manutencaodeetiquetas` no servidor de teste; cópia só leitura em `pagina_antiga_manutencao_etiquetas/`) no padrão
visual do `widget_nw_embalagens` (`nwe`) e `widget_nw_itensComCtrllDeEmb` (`nwi`). Prefixo de classe aqui: **`nwm`**.

## Identificação
- `application.code`: `widget_nw_manutEtiq`
- Título (`application.title`): `widget_nw_manutEtiq` (valor gerado pela extensão); o título **exibido** é "Manutenção Embalagens"
- Versão: `0.1.0` · categoria `SYSTEM` · `application.uiwidget=true` · `application.mobileapp=false`
- Context-root: `/widget_nw_manutEtiq`
- Página de teste: `http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/ManutencaoDeEmbNew`
- Repositório: este widget é um git próprio; remoto atual redireciona para `https://github.com/DataIT-Solucoes/BP-NW-MANETQ.git`
  (trocar o `origin` só com autorização).

## Estado atual (2026-10-15)
Integrada ao Dataset `dsNwEmbalagens` (sem dados mockados), publicada no TESTE em 08/10/2026 e conferida ao vivo
(busca por NF 9999801–9999805 → 40 etiquetas). Alterações de 09 e 15/10 (cores por status, paginação, ações por status,
Histórico) estão commitadas; publicação delas no Fluig não confirmada.
- `view.ftl`: cabeçalho + 8 filtros + barra de seleção + tabela + 5 `<dialog>` (detalhes, operação "Movimentar
  embalagens", legenda, "Configurar impressora", "Mais ações"). Bibliotecas externas declaradas no próprio `view.ftl` com SRI.
- `widget_nw_manutEtiq.js`: SuperWidget com Tabulator 6.4.0, autocompletes próprios ligados aos apoios do Dataset,
  validação dos filtros, seleção, ação em lote e modal de operação. Transporte: método da instância
  `chamarEmbalagens(acao, parametros)` (`$.ajax` para `/api/public/ecm/dataset/search`, uma linha, sem credencial no navegador).
- `widget_nw_manutEtiq.css`: paleta Branco Peres sob `.fluig-style-guide.nwm`.
- `edit.ftl`: card de identificação.
- Testes locais (Node): `testes/*.cjs` (pasta no `.gitignore`).

**Aba única** (decisão do usuário): as duas abas da tela antiga foram unificadas. A tela é a **visão ADM**;
o Widget não checa permissão (quem autoriza é o Dataset) e não há a visão do não-ADM.
Cabeçalho sem botão **Gerar etiquetas** (decisão do usuário): a geração é interna ao backend (gatilho do RE1001).
Cabeçalho com botão **Impressora** (`bi-gear`, mesma classe do **Buscar**: `nwm-btn nwm-btn-destaque`; botão de ação novo
**sempre** com esse visual). Abre o `<dialog>` "Configurar impressora": lista as impressoras do aplicativo local
`http://localhost:32478` (`GET /impressoras`, `POST /imprimir`, o mesmo da tela antiga); **Salvar** guarda no `localStorage`
(chave `impressora`, compartilhada com a tela antiga); **Testar** imprime etiqueta de exemplo com o template do GED
(documento 423); **Atualizar** refaz a busca. Sem o aplicativo, o modal limpa a lista e mostra a orientação.
A impressão real das etiquetas ainda não está integrada.

## Tela
### Filtros (todos visíveis, sem bloco colapsável; todos faixa De/Até)
Estabelecimento (**obrigatório**) · Itens · Depósito · Cód Barras · Lote · Data Validade (`input type=date`)
· Família · Nota Fiscal (rádio **Intervalo** × **Específicas**). Ação: **Buscar**.
Campos de texto dos filtros com `maxlength="100"` (limite do `filtro` dos apoios na DT120).
Ao escolher uma sugestão (todos os autocompletes, **exceto Notas Específicas**), o campo vira um **selo** "código - descrição"
(Nota Fiscal: "número - nome do emitente" de `descricaoEmitente`, ou a série; Lote com descrição igual ao código mostra só o código),
texto completo no `title` e um **×** para remover. O código nunca encolhe; a descrição corta com "…".
Seleção única: com o selo o campo fica `readOnly` e escondido (`is-selecionado`); remover limpa o valor e devolve o foco ao campo.
Autocomplete (2+ caracteres, debounce 350 ms, busca por código ou descrição, 20 por página com "Carregar mais resultados") em
Estabelecimento, Itens, Depósito, Lote e Família; nos campos de faixa o autocomplete preenche **só o código**.
Nota Fiscal **De/Até** usa a mesma busca de documentos de entrada das **Específicas** (`apoiarDocumentosEntrada`, exige
Estabelecimento De e Até) e preenche o **número da nota** (`numero`), que vai em `notaDe`/`notaAte`.
DT124: o autocomplete de **Itens** envia `tipoControleEstoque: "3"` (só itens com controle Lote) e o de **Nota Fiscal**
(De/Até e Específicas) envia `somenteComEmbalagens: "true"` (constante `NWM_RESTRICOES_APOIO`). A busca interna da descrição
do item na grade não usa o filtro. Série de documento pode vir vazia (mostra "sem série").
Item e Depósito só filtram por estabelecimento quando Estabelecimento De = Até; Lote recebe as faixas de
estabelecimento, item e depósito. Cód Barras é a faixa do código da etiqueta (`etiquetaDe`/`etiquetaAte`).
Nota Fiscal **Específicas**: lista de **1 a 20** documentos, cada um removível; guarda o `codigo` opaco do apoio sem alterar.

Validação (`validarFiltros()`): Estabelecimento De **e** Até obrigatórios; obrigatório preencher **Itens ou Nota
Fiscal**; em cada faixa, De ≤ Até (comparação de texto, preserva zeros à esquerda); no máximo 100 caracteres e sem
caractere de controle; data de validade válida. O aviso sai em `FLUIGC.toast({type:'warning'})` e o campo fica marcado.

### Barra de seleção (acima da tabela, duas linhas)
- Linha 1: tabela **Itens selecionados** (Código | Descrição | Qtde Sel.; vazia mostra "Nenhum item selecionado") ·
  **Escolher item** (select) + **Quantidade** + **Executar** (marca embalagens inteiras do item — ativas, no estabelecimento,
  sem Bag e com saldo igual à quantidade inicial — até atingir a quantidade pedida; o total pode passar do pedido).
  Clicar em Escolher item sem item elegível mostra o toast "É necessário ter ao menos um item selecionado.".
- Linha 2: **Ação em lote** (Selecione | Imprimir | Receber | Estornar | Transferir; Devolução comentada no `view.ftl`)
  + **Aplicar** · **Código de barras** (`data-leitor-cod-barras`): só visual, **sem comportamento** até o usuário definir.
- Selects com **Select2 4.0.13** (pt-BR). Sem contador de etiquetas selecionadas (decisão do usuário).

### Tabela
marcação | Código | Descrição | Fazenda | Etiqueta | Lote | Data Val. | Qtde Emb | Qtde Saldo | Status | Ações
- A busca pede **todas** as páginas do Dataset (cursor, 100 por chamada) e só então mostra. A grade exibe **20 por página**
  (`NWM_TAMANHO_PAGINA`, paginação do Tabulator com primeira/anterior/próxima/última e "Mostrando N-M de T etiquetas");
  nova busca volta à página 1. Altura `NWM_ALTURA_MAXIMA_TABELA` (560), cabeçalho fixo. Larguras em `NWM_LARGURAS_COLUNAS`
  (cabe em 1127px sem rolagem). A descrição do item vem de `apoiarItens`.
- Ordenação por coluna ligada (Ações não ordena, mas mostra a seta cinza); ordem inicial Código → Etiqueta.
- Marcar/desmarcar todos vale só para o que está visível depois do filtro; trocar o filtro limpa a seleção.
  Só etiquetas `EMBALAGEM` de uma busca concluída podem ser marcadas.
- **Status é chip colorido na célula**: texto de `descricaoSituacao`, cor pelo código `situacaoApresentada`
  (`montarChipStatus`, classe `nwm-chip-<codigo>`, mesma função na legenda). Código desconhecido usa o selo padrão.
  O botão de ajuda ao lado do título da coluna abre o modal "Legenda dos status".

### Status (legenda fixa em `NWM_LEGENDA_STATUS`, sem consulta à API)
| Código | Rótulo | Descrição | Cor (ponto / fundo) |
|---|---|---|---|
| `NAO_IMPRESSA` ✔ | Não impressa | Impressão ainda não confirmada. | cinza `#5E5D57` / `#F7F5EE` |
| `IMPRESSA` | Impressa | Aguarda recebimento físico no almoxarifado. | amarelo `#FFD200` (borda `#B39400`) / `#FFF8CC` |
| `EM_ESTOQUE` ✔ | Em estoque | Recebimento físico confirmado. | verde `#006B35` / `#E5EDE3` |
| `EM_CAMPO` | Em campo | Registrada na posição de campo. | azul `#1F6FB2` / `#E3EEF7` |
| `AGUARDANDO_RECEBIMENTO` | Aguardando recebimento | Em trânsito para o destino. | laranja `#D9701A` / `#FBEBDD` |
| `EM_TERCEIRO` | Em terceiro | Embalagem sob custódia de terceiro para armazenagem. | roxo `#6B4C9A` / `#EEE9F5` |
| `ZERADA` | Zerada | Sem conteúdo, ainda fora de uma Bag. | cinza claro `#9A988F` / `#EEEDE8` |
| `EM_BAG` | Em Bag | Vinculada a uma Bag ainda não enviada. | turquesa `#16837F` / `#E0F0EF` |
| `DESCARTADA` | Descartada | Descarte registrado no envio da Bag. | vermelho `#ED1C24` / `#FCE6E7` |
| `CANCELADA` ✔ | Cancelada | (fora da legenda) | bordô `#A8245F` / `#F7E3EC` |

✔ = visto no TESTE (o backend manda "Nao impressa" sem acento). Os demais códigos seguem o padrão aprovado pelo usuário,
**não vistos no backend**: se vierem diferentes, ajustar `NWM_LEGENDA_STATUS` e a regra CSS. Texto em carvão `#20201E`.
- **`situacao`** (`NWM_STATUS`: `ATIVA`, `ENCERRADA`, `CANCELADA`, `DESCARTADA`) é o estado técnico: usado nas regras
  (elegibilidade, operação) e exibido em Detalhes como "Situação técnica"; não substitui o status operacional.
- **`impressaoConfirmada`** e **`recebimentoFisicoConfirmado`** (booleanos) aparecem em Detalhes (Sim/Não). Sem os campos
  (backend antigo), a tela usa a situação técnica e mostra "—"; tipo errado é recusado como fora do contrato.
- **Posição** (`tipoLocal`, `NWM_POSICOES`): `ESTAB` Estabelecimento · `CAMPO` Campo · `TERCEIRO` Terceiro · `TRANSITO` Trânsito.

### Ações por linha (`NWM_ACOES_POR_STATUS`, como a aba Administrador da tela antiga)
Botões só-ícone com `title` + `aria-label`. Detalhes `bi-eye` e Histórico `bi-clock-history` sempre; Histórico ainda **não faz
nada** (sem rota de histórico no backend).
| `situacaoApresentada` | Botões além de Detalhes e Histórico |
|---|---|
| `NAO_IMPRESSA` | Imprimir |
| `IMPRESSA` | Receber, Descartar, Transferir |
| `EM_ESTOQUE` | Estornar, Descartar, Transferir |
| `EM_CAMPO`, `ZERADA` | Estornar, Descartar |
| `DESCARTADA` | Estornar |
| `EM_BAG`, `AGUARDANDO_RECEBIMENTO`, `EM_TERCEIRO`, `CANCELADA`, desconhecido | nenhum (`NWM_ACOES_PADRAO`) |
- `tipoControle` ≠ `EMBALAGEM` (ex.: `PRE_SALDO`) = só Detalhes e Histórico.
- Imprimir ("Aguardando modelo de impressão"), Receber, Estornar e Descartar aparecem **desabilitados** com o motivo; só
  Transferir executa (modal de operação).
- O modal "Mais ações" (`data-modal-mais-acoes`, botão "…") continua no código, mas **não aparece na linha**. Devolver também saiu da linha.

### Modal de operação ("Movimentar embalagens")
O usuário informa a **natureza de saída**; `classificarNatureza` devolve o fluxo (sem código fixo no Widget):
- **Transferência** e **Remessa para terceiros** (sem documento de origem): estabelecimento ou emitente de destino,
  série e valor por item; embalagens ativas, no estabelecimento de origem, sem Bag e com saldo →
  `criarTransferencia` / `criarRemessa`.
- **Devolução de compra** e **Retorno para terceiros** (exigem documento de origem: emitente, série, número e
  natureza de entrada): `consultarEmbalagensOrigem` lista as elegíveis, o usuário escolhe o subconjunto, sem passar
  do saldo de cada linha da origem → `criarDevolucao`.

De 1 a 100 embalagens por operação; chave idempotente por tentativa (guardada no `sessionStorage` para reenviar a
mesma); resultado por `consultarResultadoOperacao`. A tela não altera status nem saldo localmente.
**Operações não testadas no TESTE** (criam documento real no Datasul).

## Recursos declarados no `application.info`
| Índice | Tipo | Valor |
|---|---|---|
| 1 | js | `/resources/js/widget_nw_manutEtiq.js` |
| 2 | css | `/resources/css/widget_nw_manutEtiq.css` |

Próximo índice livre: 3. A versão continua `0.1.0` (URL `?v=0.1.0`): sugerido subir `application.version` a cada publicação
para evitar cache do JS antigo.

Recursos externos carregados pelo `view.ftl` (CDN): Bootstrap Icons 1.11.3, fonte Mulish (Google Fonts),
Tabulator 6.4.0 (CSS + JS) e Select2 4.0.13 (CSS + JS + `i18n/pt-BR.js`). Os `<script>` são **declarativos no `view.ftl`**,
com `integrity` (SRI sha384) e `crossorigin="anonymous"`; o JS mantém o aviso `nwm-tabela-erro` se a tabela não carregar.

**Encoding:** `widget_nw_manutEtiq.js` está em **LF** no disco e no git (0 CR, medido em 15/10/2026), diferente do CRLF da regra
geral; não converter sem pedido. No Git Bash, `$'\r'`/`awk` não contam CR de forma confiável: conferir com Python
(`b.count(b'\r\n')`) ou PowerShell lendo bytes.

## Padrão de código (JS) — seguir sempre
Vale para todo código novo ou alterado em `widget_nw_manutEtiq.js`. Modelo: o próprio arquivo atual.
- **Sem comentários.** O nome da função e das variáveis explica o que o código faz.
- **Nomes descritivos em português**: `filtros`, `parametros`, `etiqueta`, `registro`, `operacao`, `resultado`; nada de
  `f`, `p`, `d`, `r`, `op`. Objeto jQuery começa com `$` (`$lista`, `$input`).
- **Funções curtas** (até ~20 linhas), com uma responsabilidade. Passo com nome próprio vira método da instância
  (ex.: `validarFiltros` → `verificarFiltrosObrigatorios`, `verificarOrdemFaixas`, `recusarFiltros`).
- **Constantes `NWM_*` no topo** para limites, tempos, mapas campo → parâmetro do Dataset e regex reutilizadas
  (`NWM_LIMITE_PAGINA`, `NWM_PARAMETROS_ETIQUETAS`, `NWM_CODIGO_POSITIVO`, `NWM_TIPOS_ERRO`, `NWM_ESTADOS_OPERACAO`…).
  Nada de número mágico no meio do código.
- **jQuery para DOM, eventos e AJAX**: `$('<tag>', {...})`, `.attr/.prop/.text/.append/.appendTo`, `.on/.off`, `$.each`,
  `$.grep`, `$.extend`, `$.ajax`, `$.Deferred`. Proibido: `document`, `querySelector`, `addEventListener`, `createElement`,
  `innerHTML`, `fetch`, `async/await`, `$.trim` (obsoleto; usar `String(valor || '').trim()`). Texto vindo do servidor entra
  por `text:`, nunca como HTML.
- Estilo do arquivo: `var`, métodos no formato `nome() {}`, `var self = this` nos callbacks.
- **Refatorar não muda comportamento**: mensagens, seletores, classes CSS e parâmetros do Dataset ficam idênticos.
  Mantenha os nomes dos métodos e dos campos de estado já existentes (`operacaoAtual`, `consultaEtiquetas`,
  `apoiosFiltros`, `consultasDataset`…): os bindings e os testes dependem deles.
- **Testes**: rodar `node testes/testar-apoios-filtros.cjs`, `testar-consulta-etiquetas.cjs`, `testar-funcoes-manutencao.cjs`
  e `testar-transporte-dataset.cjs` antes e depois; todos com `FALHAS=0`. Os testes usam um jQuery simulado
  (`testes/testar-apoios-filtros.cjs`) que casa o **texto exato dos seletores** e só tem parte da API: método jQuery
  novo (ex.: `.add`, `$.proxy`) em trecho que os testes executam precisa existir no simulador, senão o teste quebra.
  Alguns testes leem `evidencias/etapa1-20261008/resultado-dataset.json` (fora do git).

## Dados
- **Dataset: ler sempre `../widget_nw_embalagens/datasets/dsNwEmbalagens.js`** (`NW_CONFIG`, `NW_ACOES`, `NW_COLUNAS`). Por
  definição do usuário esse arquivo é **sempre igual ao que está no Fluig**: ele manda sobre este documento. Só existe a
  ação, o parâmetro e a coluna que estiverem lá; o que faltar, perguntar ao usuário (não inventar). Conferir também
  `regras` (grupo × ação) e `escritasHabilitadas`. Hoje: `DefaultGroup-1` e estabelecimentos `10904`/`11301` (configuração de
  TESTE); grupos definitivos pendentes (DT-054).
- Ações do Dataset usadas pela tela: `consultarEtiquetas`; apoios `apoiarEstabelecimentos`, `apoiarItens`, `apoiarDepositos`,
  `apoiarLotes`, `apoiarFamilias`, `apoiarDocumentosEntrada`; operação `classificarNatureza`, `consultarEmbalagensOrigem`,
  `criarTransferencia`, `criarRemessa`, `criarDevolucao`, `consultarResultadoOperacao`. `obterDadosImpressao` ainda não é usada.
- Serviços REST: nenhum chamado direto pelo navegador (o Dataset usa o serviço `DATASUL_REST_HOMOLOG`; credenciais só no serviço).
  Base REST: `/dts/datasul-rest/resources/prg/esp/v1/controle-embalagens`.
- Campos do registro no JS (coluna do Dataset entre parênteses): `id`/`idEtiqueta` (`idEtiqueta`), `versao` (numérica),
  `itCodigo` (`item`), `codEstabel`, `etiqueta`/`codBarras` (`codEtiqueta`), `lote`, `dtValiLote` (`validadeLote`),
  `qtidadeIni` (`quantidadeInicial`), `qtidadeAtu` (`quantidadeAtual`), `capacidade`, `unidade`, `deposito`,
  `localizacao`, `situacao`, `situacaoApresentada`, `descricaoSituacao`, `impressaoConfirmada`, `recebimentoFisicoConfirmado`,
  `tipoLocal`, `tipoControle`, `idBag`; `descItem` vem de `apoiarItens`. O retorno não traz família nem número da nota.
- Família com `codigo: ""` (`LS ACESSORIOS CABINA`) é dado da base: não tratar como pendência.

## Contrato do backend (DT120 e DT124, aceitos no REST TESTE)
- **`consultarEtiquetas`** aceita igualdade (`codEstabel`, `codEtiqueta`, `item`, `lote`, `codTipo`, `tipoControle`,
  `tipoLocal`, `situacao`, `idBag`), faixas De/Até (`estabelDe/Ate`, `itemDe/Ate`, `depositoDe/Ate`, `etiquetaDe/Ate`,
  `loteDe/Ate`, `validadeDe/Ate` em `YYYY-MM-DD`, `familiaDe/Ate`) e Nota Fiscal por `modoNotas` exatamente `INTERVALO`
  (`notaDe/notaAte` = número da nota) ou `ESPECIFICAS` (`documento` repetido, 1 a 20 códigos opacos; OR entre notas, sem
  duplicar etiqueta). Demais filtros por AND; códigos comparados como texto. Cursor `aposId`/`proximoId` exclusivo, 1 a 100
  por chamada (padrão 20); `total` = tamanho da página, não contagem global. Mudar filtro reinicia o cursor.
- **Apoios**: `filtro` 2–100 caracteres, `limite` 1–20, cursor `aposCodigo`/`proximoCodigo`, `temMais`; envelope `sucesso`,
  `codigoErro`, `mensagem`, `dados`. Documento traz identidade fiscal completa e `codigo` opaco (guardar como veio; não montar
  pelo número nem usar `idEvento`). Localização e Grupo não têm apoio.
- **DT124**: `apoiarItens` com `tipoControleEstoque` só aceita `"3"` (outro valor → `FILTRO_INVALIDO`); `apoiarDocumentosEntrada`
  com `somenteComEmbalagens` aceita `"true"`/`"false"` (com `true`, só notas com etiquetas do recebimento vigente, não
  compensado). Ambos filtram antes de limite/cursor: não filtrar só no front. Na tela de parametrização **não** enviar `tipoControleEstoque`.
- **Erros funcionais**: `SEM_PERMISSAO`, `FILTRO_INVALIDO`, `FILTRO_CURTO`, `LIMITE_INVALIDO`, `DOCUMENTO_INDISPONIVEL`,
  `BANCO_NAO_CONECTADO`, `CONSULTA_AMPLA` (acima de 5.000 documentos ou 50.000 embalagens candidatas, sem página parcial),
  `HISTORICO_INCONSISTENTE`. O transporte Fluig responde HTTP 200 mesmo com erro: conferir HTTP **e** `sucesso`/`codigoErro`.
  Erro nunca vira lista vazia.
- **Impressão:** `obterDadosImpressao` devolve **uma** etiqueta por chamada (recusa `PRE_SALDO`); lote, cópias e layout
  **não estão contratados**. Reimpressão não cria identidade nem movimenta saldo.
- **Histórico** de movimentos: sem rota (proposta E22).
- **Ações aprovadas (DT-093/094):** Transferência e Devolução (compra e empréstimo) em **um modal único** pela natureza.
  **Receber** é pelo ANFE/Datasul (o Fluig não recria a entrada); **Estornar/Descartar** sem contrato.
- **Autorização:** usuário, grupos e estabelecimentos permitidos vêm do Dataset (sessão Fluig), nunca do Widget.

## Parâmetros de configuração (`edit.ftl`)
Nenhum.

## Regras de negócio
- Estabelecimento De/Até obrigatório; Itens **ou** Nota Fiscal obrigatório.
- As ações por linha dependem de `situacaoApresentada` e `tipoControle` (ver "Ações por linha").
- "Escolher item + Quantidade" não cadastra nada: só marca embalagens inteiras (ativas, no estabelecimento, sem Bag,
  saldo = quantidade inicial) até atingir a quantidade pedida.

## Pendências / decisões em aberto
- Publicar e validar no Fluig as alterações de 09 e 15/10 (cores, paginação, ações por status, Histórico).
- Ação do botão **Histórico** (sem rota no backend) e do campo **Código de barras**.
- "Estornar": na tela antiga o botão chamava `botaoDevolver(...)`; confirmar se deve ser a Devolução. Definir ações de
  `AGUARDANDO_RECEBIMENTO`, `EM_TERCEIRO` e `CANCELADA`.
- Confirmar os 7 códigos de status ainda não vistos no backend; decidir se `CANCELADA` entra na legenda; validar as cores
  ao vivo (contraste não medido).
- Impressão real das etiquetas (modelo/serviço); Receber pelo Datasul; Estornar e Descartar sem contrato.
- Operações (Transferência/Remessa/Devolução) não testadas no TESTE.
- Permissão de ADM: grupos definitivos (DT-054). Na tela antiga: `adm_abas_etiquetas` e `adm_etiquetas`.
- Visão do não-ADM (só Receber, campo C. Barras, sem ação em lote e sem Escolher Item/Quantidade).
- "Qtde Sel.": hoje é a soma do **saldo** (`qtidadeAtu`) das etiquetas marcadas do item — confirmar se é isso ou a quantidade inicial.
- Desempenho em volume de produção não medido (TESTE tem ~50 etiquetas, 2,3–2,8 s por chamada).
- Limpeza opcional: `situacoesApresentadas()` e `textoQuantidadeEtiquetas()` sem uso na legenda (um teste usa o primeiro);
  modal "Mais ações" sem uso na linha.
- `testes/` e `evidencias/` fora do git; decidir se entram.
