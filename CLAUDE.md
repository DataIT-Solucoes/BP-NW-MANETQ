# widget_nw_manutEtiq

> Regras gerais (versões, SuperWidget, Style Guide): `CLAUDE.md` da raiz do repositório. Aqui fica só o que é deste widget.
> Preencher só com o que o usuário informou ou o que está nos fontes. O que não se sabe fica "a definir".
> Levantamento da tela legada e decisões do usuário: `ORIENTACOES-MOCKUP.md` desta pasta.
> Padrões gerais do Fluig da Branco Peres (visual, Dataset, Style Guide): skill `fluig-branco-peres`.
> `AGENTS.md` (Codex) e `CLAUDE.md` (Claude Code) desta pasta têm o mesmo conteúdo: ao alterar um, altere o outro.

## Objetivo
Tela **Manutenção Embalagens**: consulta, recebimento, impressão e movimentação de etiquetas de embalagem.
Refaz a tela legada **Manutenção Itens/Etiquetas** (`v2_widget_manutencao_etiquetas`, widget
`ver2_manutencaodeetiquetas` no servidor de teste) no padrão visual do `widget_nw_embalagens` (`nwe`) e
`widget_nw_itensComCtrllDeEmb` (`nwi`). Prefixo de classe aqui: **`nwm`**.

## Identificação
- `application.code`: `widget_nw_manutEtiq`
- Título (`application.title`): `widget_nw_manutEtiq` (valor gerado pela extensão); o título **exibido** é "Manutenção Embalagens"
- Versão: `0.1.0` · categoria `SYSTEM` · `application.uiwidget=true` · `application.mobileapp=false`
- Context-root: `/widget_nw_manutEtiq`
- Onde é usado (página/comunidade do Fluig): a definir

## Estado atual (2026-10-08)
Etapa 2 **commitada, ainda não validada ao vivo no Fluig**: a tela consulta o Dataset
`dsNwEmbalagens`; não há dados mockados.
- `view.ftl`: cabeçalho + 8 filtros + barra de seleção + tabela + 5 `<dialog>` (detalhes, operação "Movimentar
  embalagens", legenda, "Configurar impressora", "Mais ações"). Bibliotecas externas declaradas no próprio `view.ftl` com SRI (ver "Recursos externos").
- `widget_nw_manutEtiq.js`: SuperWidget com Tabulator 6.4.0 (CDN), autocompletes próprios ligados aos apoios do
  Dataset, validação dos filtros, seleção por caixa de marcação, ação em lote e modal de operação — configurados em
  `NWM_STATUS` / `NWM_POSICOES` / `NWM_ACOES`. Transporte: método da instância `chamarEmbalagens(acao, parametros)`
  (`$.ajax` para `/api/public/ecm/dataset/search`, uma linha, sem credencial no navegador).
- `widget_nw_manutEtiq.css`: paleta Branco Peres sob `.fluig-style-guide.nwm`.
- `edit.ftl`: card de identificação.
- Testes locais (Node): `testes/*.cjs`.

**Aba única** (decisão do usuário): as duas abas da tela antiga foram unificadas. A tela é a **visão ADM**;
o Widget não checa permissão (quem autoriza é o Dataset), não há a visão do não-ADM e **não há o campo C. Barras** (é exclusivo do não-ADM).
Cabeçalho sem botão **Gerar etiquetas** (decisão do usuário): a geração é interna ao backend (gatilho do RE1001);
o Fluig só consulta o resultado (`consultarGeracao`).
Cabeçalho com botão **Impressora** (`bi-gear`, mesma classe do **Buscar**: `nwm-btn nwm-btn-destaque`) no lugar do "+ Novo" do
padrão. Abre o `<dialog>` "Configurar impressora" (padrão `nwm`, não `FLUIGC.modal`): lista as impressoras do aplicativo local
`http://localhost:32478` (o mesmo da tela antiga); **Salvar** guarda no `localStorage` (chave `impressora`, compartilhada com a tela
antiga); **Testar** imprime etiqueta de exemplo com o template do GED (documento 423); **Atualizar** refaz a busca. Sem o aplicativo,
o modal limpa a lista e mostra a orientação. A impressão real das etiquetas ainda não está integrada.

## Tela
### Filtros (todos visíveis, sem bloco colapsável; todos faixa De/Até)
Estabelecimento (**obrigatório**) · Itens · Depósito · Cód Barras · Lote · Data Validade (`input type=date`)
· Família · Nota Fiscal (rádio **Intervalo** × **Específicas**). Ação: **Buscar**.
Campos de texto dos filtros com `maxlength="100"` (limite do `filtro` dos apoios na DT120).
Ao escolher uma sugestão (todos os autocompletes, **exceto Notas Específicas**), o campo vira um **selo** "código - descrição"
(Nota Fiscal: "número - nome do emitente" de `descricaoEmitente`, ou a série; Lote com descrição igual ao código mostra só o código),
texto completo no `title` e um **×** para remover (pedido do usuário, 08/10/2026). O código nunca encolhe; a descrição corta com "…".
Seleção única: com o selo o campo fica
`readOnly` e escondido (`is-selecionado`); remover limpa o valor e devolve o foco ao campo. O valor continua no input para busca/validação.
Autocomplete (2+ caracteres, busca por código ou descrição, 20 por página com "Carregar mais resultados") em
Estabelecimento, Itens, Depósito, Lote e Família; nos campos de faixa o autocomplete preenche **só o código**.
Nota Fiscal **De/Até** usa a mesma busca de documentos de entrada das **Específicas** (`apoiarDocumentosEntrada`, exige
Estabelecimento De e Até) e preenche o **número da nota** (`numero`), que vai em `notaDe`/`notaAte` (pedido do usuário, 08/10/2026).
DT124 (pedido do usuário, 08/10/2026): o autocomplete de **Itens** envia `tipoControleEstoque: "3"` (só itens com controle Lote) e o de
**Nota Fiscal** (De/Até e Específicas) envia `somenteComEmbalagens: "true"` (só notas com etiquetas do recebimento vigente; no De/Até
por decisão do usuário, já que a DT124 cita só as Específicas). Ambos como
texto, aceitos no `NW_ACOES` do Dataset. A busca interna da descrição do item na grade não usa o filtro.
Item e Depósito só filtram por estabelecimento quando Estabelecimento De = Até; Lote recebe as faixas de
estabelecimento, item e depósito. Cód Barras é a faixa do código da etiqueta (`etiquetaDe`/`etiquetaAte`).
Nota Fiscal **Específicas**: busca documentos de entrada (pela faixa de estabelecimento) e monta uma lista de
**1 a 20** documentos, cada um removível.

Validação (`validarFiltros()`): Estabelecimento De **e** Até obrigatórios; obrigatório preencher **Itens ou Nota
Fiscal**; em cada faixa, De ≤ Até (comparação de texto, preserva zeros à esquerda); no máximo 100 caracteres e sem
caractere de controle; data de validade válida. O aviso sai em `FLUIGC.toast({type:'warning'})` e o campo fica marcado.

### Barra de seleção (acima da tabela)
Tabela **Itens selecionados** (Código | Descrição | Qtde Sel., resumo do que está marcado; sempre visível, vazia mostra
"Nenhum item selecionado") · **Ação em lote** (select Selecione | Imprimir (aguardando modelo) | Receber (via Datasul) |
Estornar (indisponível) | Transferência / Remessa | Devolução; só as duas últimas estão habilitadas e abrem o modal
de operação) + **Aplicar** acoplado à direita · **Escolher item** (select) + **Quantidade** + **Executar** acoplado à
direita (marca embalagens inteiras do item — ativas, no estabelecimento, sem Bag e com saldo igual à quantidade
inicial — até atingir a quantidade pedida; o total pode passar do pedido).
Os dois selects usam **Select2 4.0.13** (pt-BR, com busca). Não há contador de etiquetas selecionadas (decisão do usuário).
Clicar em **Escolher item** sem item elegível na grade mostra `FLUIGC.toast` de aviso "É necessário ter ao menos um item selecionado." (pedido do usuário, 08/10/2026).

### Tabela
marcação | Código | Descrição | Fazenda | Etiqueta | Lote | Data Val. | Qtde Emb | Qtde Saldo | Status | Ações
- **Tabela inteira, sem paginação** (decisão do usuário): a busca pede todas as páginas do Dataset (cursor, 100 por
  chamada) e só então mostra. Altura própria (`maxHeight: 560`) com cabeçalho fixo na rolagem e DOM virtual do
  Tabulator. O rodapé mostra "Mostrando N etiquetas". A descrição do item vem de `apoiarItens`.
- **Ordenação por coluna ligada**; ordem inicial Código → Etiqueta.
- Marcar/desmarcar todos no cabeçalho vale só para o que está visível depois do filtro; trocar o filtro limpa a seleção.
  Só etiquetas `EMBALAGEM` de uma busca concluída podem ser marcadas.
- **Status é chip colorido na célula** (a tela antiga pintava a linha inteira). A legenda do rodapé virou o
  botão de ajuda ao lado do título da coluna Status, que abre o modal "Legenda dos status".
- **Ações são botões só-ícone** com `title` + `aria-label`. Na linha ficam só os que funcionam: Detalhes `bi-eye` ·
  Transferir / Remessa `bi-arrow-left-right` · Devolver `bi-box-arrow-up` · **"…"** `bi-three-dots` (pedido do usuário, 08/10/2026).
  O "…" abre o `<dialog>` **"Mais ações"** (`data-modal-mais-acoes`) com Imprimir `bi-printer` · Receber `bi-box-arrow-in-down` ·
  Estornar `bi-arrow-counterclockwise` · Descartar `bi-trash3` (marcadas `secundaria` em `NWM_ACOES`), desabilitadas com o motivo
  escrito; quando habilitadas, executam pela mesma `acaoNaLinha`. Larguras para caber em 1127px sem rolagem: Ações 160,
  Status 136, Descrição mínimo 154.

### Status, posição e ações
- **Coluna Status e legenda** = status operacional do backend (pedido do usuário, 08/10/2026): selo com o texto de
  `descricaoSituacao` e a cor pelo código `situacaoApresentada` (vistos no TESTE: `NAO_IMPRESSA` "Nao impressa", `EM_ESTOQUE`
  "Em estoque", `CANCELADA` "Cancelada"; código desconhecido usa o selo padrão; texto longo corta com "…" e mostra inteiro no
  `title`). A legenda lista os status presentes na consulta atual, com a quantidade de etiquetas (o contrato não traz a lista completa).
- **`situacao`** (`NWM_STATUS`: `ATIVA`, `ENCERRADA`, `CANCELADA`, `DESCARTADA`) continua sendo o estado técnico da identidade: usado nas
  regras (elegibilidade, Transferir/Devolver) e exibido em Detalhes como "Situação técnica"; não substitui o status operacional.
- **`impressaoConfirmada`** e **`recebimentoFisicoConfirmado`** (booleanos) aparecem em Detalhes (Sim/Não). Sem os campos novos
  (backend antigo), a tela usa a situação técnica e mostra "—"; tipo errado é recusado como fora do contrato.
- **Posição** (`tipoLocal`, `NWM_POSICOES`): `ESTAB` Estabelecimento · `CAMPO` Campo · `TERCEIRO` Terceiro ·
  `TRANSITO` Trânsito; aparece no modal de detalhes.
- **Ações por linha** dependem de `tipoControle`, não do status: Detalhes sempre; Transferir / Remessa, Devolver e "…"
  só em `EMBALAGEM`; no "Mais ações", Imprimir, Receber, Estornar e Descartar aparecem desabilitados com o motivo.
  `PRE_SALDO` só tem Detalhes.

### Modal de operação ("Movimentar embalagens")
O usuário informa a **natureza de saída**; `classificarNatureza` devolve o fluxo:
- **Transferência** e **Remessa para terceiros** (sem documento de origem): estabelecimento ou emitente de destino,
  série e valor por item; embalagens ativas, no estabelecimento de origem, sem Bag e com saldo →
  `criarTransferencia` / `criarRemessa`.
- **Devolução de compra** e **Retorno para terceiros** (exigem documento de origem: emitente, série, número e
  natureza de entrada): `consultarEmbalagensOrigem` lista as elegíveis, o usuário escolhe o subconjunto, sem passar
  do saldo de cada linha da origem → `criarDevolucao`.

De 1 a 100 embalagens por operação; chave idempotente por tentativa (guardada no `sessionStorage` para reenviar a
mesma); resultado por `consultarResultadoOperacao`. A tela não altera status nem saldo localmente.

## Recursos declarados no `application.info`
| Índice | Tipo | Valor |
|---|---|---|
| 1 | js | `/resources/js/widget_nw_manutEtiq.js` |
| 2 | css | `/resources/css/widget_nw_manutEtiq.css` |

Próximo índice livre: 3

Recursos externos carregados pelo `view.ftl` (CDN): Bootstrap Icons 1.11.3, fonte Mulish (Google Fonts),
Tabulator 6.4.0 (CSS + JS) e Select2 4.0.13 (CSS + JS + `i18n/pt-BR.js`). Os `<script>` são **declarativos no `view.ftl`**,
com `integrity` (SRI sha384) e `crossorigin="anonymous"`; o JS mantém o aviso `nwm-tabela-erro` se a tabela não carregar.

## Padrão de código (JS) — seguir sempre
Vale para todo código novo ou alterado em `widget_nw_manutEtiq.js`. Modelo: o próprio arquivo atual.
- **Sem comentários.** O nome da função e das variáveis explica o que o código faz.
- **Nomes descritivos em português**: `filtros`, `parametros`, `etiqueta`, `registro`, `operacao`, `resultado`; nada de
  `f`, `p`, `d`, `r`, `op`. Objeto jQuery começa com `$` (`$lista`, `$input`).
- **Funções curtas** (até ~20 linhas), com uma responsabilidade. Passo com nome próprio vira método da instância
  (ex.: `validarFiltros` → `verificarFiltrosObrigatorios`, `verificarOrdemFaixas`, `recusarFiltros`).
- **Constantes `NWM_*` no topo** para limites, tempos, mapas campo → parâmetro do Dataset e regex reutilizadas
  (`NWM_LIMITE_PAGINA`, `NWM_PARAMETROS_ETIQUETAS`, `NWM_CODIGO_POSITIVO`…). Nada de número mágico no meio do código.
- **jQuery para DOM, eventos e AJAX**: `$('<tag>', {...})`, `.attr/.prop/.text/.append/.appendTo`, `.on/.off`, `$.each`,
  `$.grep`, `$.extend`, `$.ajax`, `$.Deferred`. Proibido: `document`, `querySelector`, `addEventListener`, `createElement`,
  `innerHTML`, `fetch`, `async/await`. Texto vindo do servidor entra por `text:`, nunca como HTML.
- Estilo do arquivo: `var`, métodos no formato `nome() {}`, `var self = this` nos callbacks.
- **Refatorar não muda comportamento**: mensagens, seletores, classes CSS e parâmetros do Dataset ficam idênticos.
  Mantenha os nomes dos métodos e dos campos de estado já existentes (`operacaoAtual`, `consultaEtiquetas`,
  `apoiosFiltros`, `consultasDataset`…): os bindings e os testes dependem deles.
- **Testes**: rodar `node testes/testar-apoios-filtros.cjs`, `testar-consulta-etiquetas.cjs`, `testar-funcoes-manutencao.cjs`
  e `testar-transporte-dataset.cjs` antes e depois; todos com `FALHAS=0`. Os testes usam um jQuery simulado
  (`testes/testar-apoios-filtros.cjs`) que casa o **texto exato dos seletores** e só tem parte da API: método jQuery
  novo (ex.: `.add`, `$.proxy`) em trecho que os testes executam precisa existir no simulador, senão o teste quebra.

## Dados
- **Dataset: ler sempre `../widget_nw_embalagens/datasets/dsNwEmbalagens.js`** (`NW_CONFIG`, `NW_ACOES`, `NW_COLUNAS`). Por
  definição do usuário esse arquivo é **sempre igual ao que está no Fluig**: ele manda sobre este documento. Só existe a
  ação, o parâmetro e a coluna que estiverem lá; o que faltar, perguntar ao usuário (não inventar). Conferir também
  `regras` (grupo × ação) e `escritasHabilitadas`. Grupos definitivos por ação ainda pendentes (DT-054).
- Ações do Dataset `dsNwEmbalagens` usadas pela tela: `consultarEtiquetas`; apoios `apoiarEstabelecimentos`,
  `apoiarItens`, `apoiarDepositos`, `apoiarLotes`, `apoiarFamilias`, `apoiarDocumentosEntrada`; operação
  `classificarNatureza`, `consultarEmbalagensOrigem`, `criarTransferencia`, `criarRemessa`, `criarDevolucao`,
  `consultarResultadoOperacao`. `obterDadosImpressao` ainda não é usada (impressão aguardando modelo).
- Serviços REST: nenhum chamado direto pelo navegador (o Dataset usa o serviço `DATASUL_REST_HOMOLOG`; credenciais só no serviço).
- Campos do registro no JS (coluna do Dataset entre parênteses): `id`/`idEtiqueta` (`idEtiqueta`), `versao`,
  `itCodigo` (`item`), `codEstabel`, `etiqueta`/`codBarras` (`codEtiqueta`), `lote`, `dtValiLote` (`validadeLote`),
  `qtidadeIni` (`quantidadeInicial`), `qtidadeAtu` (`quantidadeAtual`), `capacidade`, `unidade`, `deposito`,
  `localizacao`, `situacao`, `tipoLocal`, `tipoControle`, `idBag`; `descItem` vem de `apoiarItens`.

## Alinhamento com o backend (conferido em 08/10/2026 no `dsNwEmbalagens.js`)
- **`consultarEtiquetas`** aceita igualdade (`codEstabel`, `codEtiqueta`, `item`, `lote`, `codTipo`, `tipoControle`,
  `tipoLocal`, `situacao`, `idBag`), faixas De/Até (`estabelDe/Ate`, `itemDe/Ate`, `depositoDe/Ate`, `etiquetaDe/Ate`,
  `loteDe/Ate`, `validadeDe/Ate`, `familiaDe/Ate`) e Nota Fiscal por `modoNotas` com `notaDe/notaAte` ou `documento`.
  Cursor `aposId`/`proximoId`, máx. 100 por chamada. Apoios existem para Estabelecimento, Item, Tipo, Família,
  Depósito, Lote e Documentos de entrada; Localização e Grupo não têm apoio.
- **Status:** o backend separa **situação** (`ATIVA`/`ENCERRADA`/`CANCELADA`/`DESCARTADA`), **posição** (`tipoLocal`),
  **Bag** (`idBag`) e **quantidade** (`qtidadeAtu`/`qtidadeIni`). "Impressa/Não impresso" não aparece como campo
  persistido. O mapeamento legenda antiga → modelo novo é **decisão do usuário** (não inventar). `PRE_SALDO` (saldo
  anterior ao controle) não recebe ações individuais.
- **Ações aprovadas no projeto (DT-093/094):** **Transferência** e **Devolução** (compra e empréstimo) em **um modal único**
  conduzido pela **natureza da operação** (classificada pelo backend; sem código fixo no Widget). **Receber** corresponde
  ao recebimento pelo ANFE/Datasul (o Fluig não recria a entrada); **Estornar/Descartar** não têm contrato — confirmar
  com o usuário o que permanece na tela.
- **Impressão:** `obterDadosImpressao` devolve os dados de **uma** etiqueta por chamada (recusa `PRE_SALDO`); lote de IDs,
  cópias e layout/serviço de impressão **não estão contratados**. Reimpressão não cria identidade nem movimenta saldo.
- **Histórico** de movimentos: sem rota (proposta E22). Detalhe usa os dados da própria listagem.
- **Autorização:** usuário, grupos e estabelecimentos permitidos vêm do Dataset (sessão Fluig), nunca do Widget. A
  regra por grupo/ação é do Dataset (DT-054); grupos definitivos ainda não definidos.
- Resposta: conferir HTTP **e** `sucesso`/`codigoErro`; IDs vêm como texto; o nome das colunas do `resultadoJson` ainda
  precisa ser conferido no retorno real (etapa 2 não validada ao vivo).

## Parâmetros de configuração (`edit.ftl`)
Nenhum.

## Regras de negócio
- Estabelecimento De/Até obrigatório; Itens **ou** Nota Fiscal obrigatório.
- As ações disponíveis por linha dependem de `tipoControle` (ver "Status, posição e ações").
- "Escolher item + Quantidade" não cadastra nada: só marca embalagens inteiras (ativas, no estabelecimento, sem Bag,
  saldo = quantidade inicial) até atingir a quantidade pedida.

## Pendências / decisões em aberto
- Validar a etapa 2 ao vivo no Fluig.
- Permissão de ADM: a regra grupo × ação fica no Dataset (ver "Autorização"); faltam os grupos definitivos (DT-054).
  Na tela antiga eram `adm_abas_etiquetas` (exibia a aba Administrador) e `adm_etiquetas` (liberava estabelecimento/depósito e ações).
- Visão do não-ADM (só Receber, campo C. Barras, sem ação em lote e sem Escolher Item/Quantidade).
- Legenda dos status: texto definitivo e mapeamento da legenda antiga para situação/posição/Bag/quantidade.
- Ações sem contrato: Estornar e Descartar; Imprimir aguarda modelo/serviço de impressão; Receber é pelo Datasul (ANFE).
- "Qtde Sel." da tabela Itens selecionados: hoje é a soma do **saldo** (`qtidadeAtu`) das etiquetas
  marcadas daquele item — confirmar se é isso ou a quantidade da embalagem.
- Status "Em campo" da tela antiga (ignorado por ora). Obs.: `CAMPO` existe no backend como `tipoLocal`.
- Confirmar se o repositório git deve ficar nesta pasta ou na raiz `brancoperes2026` (hoje está nesta pasta).
