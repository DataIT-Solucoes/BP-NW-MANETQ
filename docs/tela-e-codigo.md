# Tela e código — widget_nw_manutEtiq

> Descrição do JS e da tela em 21/10/2026. **O fonte manda**: se divergir, vale `src/` e este arquivo é atualizado.
> Decisões do usuário que explicam o comportamento: `decisoes.md`. Contrato e campos: `referencias-backend.md`.

> Níveis de acesso (22/10): o usuário **comum** não vê Transferir nem Devolver, na linha nem no lote; o admin vê tudo. Decisão em `decisoes.md`; código em `NWM_ACOES_SOMENTE_ADMIN`, `acaoPermitidaNoNivel`, `aplicarNivelAcessoNaTela` e `corresponderAcaoDoLote`.

## Tela (`view.ftl`)
- Cabeçalho "Manutenção Embalagens" / "Consulte, imprima e movimente as embalagens."; aba única (visão ADM).
- **Filtros** (todos visíveis, faixa De/Até): Estabelecimento (**obrigatório**) · Itens · Depósito · Cód Barras · Lote · Data Validade
  (`type=date`) · Família · Nota Fiscal (rádio **Intervalo** × **Específicas**, 1 a 20 documentos removíveis). Ação: **Buscar**.
  - Autocomplete próprio (2+ caracteres, debounce 350 ms, 20 por página com "Carregar mais resultados") em Estabelecimento, Itens,
    Depósito, Lote, Família e Nota Fiscal; escolher vira **selo** "código - descrição" com × (exceto Específicas). Nos campos de faixa
    preenche só o código. Texto digitado sem escolher na lista conta como campo vazio (`valorFiltroInformado`). Nota Fiscal De/Até usa `apoiarDocumentosEntrada` (exige Estabelecimento De e Até) e grava o número da nota.
  - Item e Depósito só filtram por estabelecimento quando Estabelecimento De = Até; Lote recebe as faixas de estabelecimento, item e depósito.
  - Cód Barras De/Até (23/10): autocomplete por `apoiarEmbalagens` (`codEstabel` = Estabelecimento De = Até, só dígitos, a partir de 1 dígito;
    o digitado é completado com zeros à esquerda até 10 dígitos, `completarCodigoBarras`: `139` → `0000000139`, busca exata no backend;
    sugestão "código - descrição do item"); grava o código em `etiquetaDe`/`etiquetaAte`. Sem estabelecimento único ou com letra, a lista
    explica e não consulta (`agendarApoioCodigoBarras`, `recusaPesquisaCodigoBarras`). Como nos outros apoios, texto sem escolher não filtra.
    Código só do Cód Barras: os outros autocompletes (inclusive Estabelecimento) não mudaram.
  - Validação (`validarFiltros`): Estabelecimento De **e** Até; Itens **ou** Nota Fiscal; De ≤ Até (texto); até 100 caracteres, sem
    caractere de controle; data válida. Aviso em toast `warning`; só os erros de conteúdo marcam o campo em vermelho (obrigatório vazio não marca).
- **Barra de seleção**: tabela "Itens selecionados" (Código | Descrição | Qtde Sel.) · Escolher item + Quantidade + **Executar** (marca
  embalagens inteiras do item — ativas, no estabelecimento, sem Bag, saldo = quantidade inicial — até a quantidade pedida) ·
  **Código de barras** (Enter: localiza o número entre as linhas carregadas, marca e vai à página; `lerCodigoBarras`) ·
  **Ação em lote** (Imprimir, Receber, Estornar, Transferir, Devolução, Inutilizar, Registrar perda/extravio) + Aplicar ·
  **Código de barras** (`data-leitor-cod-barras`, sem comportamento). Selects com Select2 4.0.13 (pt-BR).
- **Tabela** (Tabulator): marcação | Código | Descrição | Tipo de Embalagem (`codTipo`) | Fazenda (`código - descrição`) | Etiqueta | Lote |
  Data Val. | Qtde Emb | Qtde Saldo | UN | Status | Ações. Larguras em `NWM_LARGURAS_COLUNAS` (Ações 320px, alinhada à esquerda).
  - A busca lê **todas** as páginas do Dataset (100 por chamada) e só então mostra; grade com 20 por página, sem altura própria (cresce com a página);
    cabeçalho fixo ao descer a página (`prepararCabecalhoFixo`, `NWM_TOPO_CABECALHO_FIXO`, como no `widget_nw_bags`): cópia do
    `.tabulator-header` em `.nwm-cabecalho-fixo`; clicar numa coluna da cópia ordena a tabela; "marcar todos" e a legenda do Status funcionam na cópia;
    ordem inicial Código → Etiqueta. Marcar todos vale para todas as páginas da busca (todas as linhas ativas, não só as 20 visíveis); só `EMBALAGEM` de busca concluída pode ser marcada.
  - Status = chip colorido (`montarChipStatus`, classe `nwm-chip-<codigo>`); texto = `situacaoFacilitada(situacaoApresentada)` (rótulo de
    `NWM_LEGENDA_STATUS`; código fora da legenda vira texto legível) e `descricaoSituacao` do backend no `title`; botão no título abre a Legenda.
- **Ações por linha** (`NWM_ACOES_POR_STATUS`, botões só-ícone com `title`/`aria-label`, borda verde e hover colorido por ação):

| `situacaoApresentada` | Botões (na ordem) |
|---|---|
| `NAO_IMPRESSA` | imprimir, detalhes, historico, inutilizar, perda |
| `IMPRESSA` | detalhes, historico, imprimir, receber, transferir, devolver, inutilizar, perda |
| `EM_ESTOQUE` | detalhes, historico, imprimir, estornar, transferir, devolver, inutilizar, perda |
| `EM_CAMPO`, `AGUARDANDO_RECEBIMENTO`, `EM_BAG` | detalhes, historico, imprimir, perda |
| `EM_TERCEIRO` | detalhes, historico, imprimir, devolver, perda |
| `ZERADA` | detalhes, historico, imprimir, estornar, inutilizar, perda |
| `INUTILIZADA` | detalhes, historico, imprimir, estornar, perda |
| `DESCARTADA` | detalhes, historico, imprimir |
| `ENCERRADA` | detalhes, historico, imprimir, estornar |
| `CANCELADA`, desconhecido | detalhes, historico (`NWM_ACOES_PADRAO`) |

  Disponibilidade (`acaoDisponivel`): Detalhes/Histórico sempre; demais só para `tipoControle = EMBALAGEM` e sem escrita bloqueada;
  Imprimir exige `situacao` ATIVA; com Bag, só Imprimir; Receber/Transferir exigem `ESTAB`, impressão confirmada e saldo. Ação não permitida
  pela regra da embalagem (`acaoPermitidaNaEtiqueta`: status, Bag, local, saldo) **não aparece**; bloqueio temporário (escrita em
  andamento/incerta, linha carregando) deixa o botão desabilitado com o motivo no `title` (`textoMotivoIndisponivel`).
- **Modais** (sete `<dialog>`, fecham pelo fundo — `NWM_FECHAMENTO_MODAIS`/`cliqueForaModal`): Detalhes · Movimentar embalagens
  (operação) · Legenda dos status · Impressora · Ação de etiqueta · Histórico da embalagem.

## Arquitetura do JS
- **Nível de acesso** (`identificarNivelAcesso`, no `init`): `WCMAPI.getUserCode()` + dataset `colleagueGroup` (`consultarGruposUsuario`);
  grupo em `NWM_GRUPOS_ADMINISTRADORES` (hoje só `DefaultGroup-1`; outro grupo admin = acrescentar na lista) → `nivelAcesso = admin`, senão `comum` (também em falha ou sem usuário). Só `console.log`.
- Arquivo único: constantes `NWM_*` no topo e o SuperWidget `widget_nw_manutEtiq` (padrão de código no `AGENTS.md`).
- **Transporte** (`chamarEmbalagens`, `consultarDataset`): `$.ajax` ao Dataset; valida envelope (`extrairEnvelopeDataset`,
  `envelopeComandoValido`, `envelopePaginadoValido`…); consultas por canal (`consultasDataset`), resposta antiga é descartada;
  erros classificados em `NWM_TIPOS_ERRO` (técnico, funcional, autorização, cancelamento). Tempo limite 90 s.
- **Busca** (`buscar` → `carregarEtiquetas`): pagina por cursor, valida ordem dos ids e cada registro (`registroEtiquetaValido`), mapeia
  (`mapearEtiqueta`), descreve itens (`apoiarItens`) e estabelecimentos (Fazenda) e só então exibe (`concluirCargaEtiquetas`).
- **Operação** (Transferir/Devolver, modal Movimentar; título por ação em `NWM_TITULOS_OPERACAO`, ex.: "Transferir embalagens"): `classificarNatureza` define o fluxo (`NWM_ROTULOS_FLUXO`): Transferência e
  Remessa (natureza de saída por autocomplete `apoiarNaturezas` — `NWM_CAMPOS_NATUREZA`; escolher na lista chama o `classificarNatureza`
  pelo `selecionarApoioFiltro`, sem botão; digitado também vale, validado no Enter ou ao sair do campo — `classificarNaturezaDigitada`,
  `naturezaJaClassificada` —; destino por autocomplete `apoiarEstabelecimentos` reaproveitando `prepararApoioFiltro` — `NWM_CAMPO_DESTINO_OPERACAO`, só vale
  escolhido —, série num input com o mesmo autocomplete — `NWM_CAMPO_SERIE_OPERACAO`, `apoiarSeries` a partir de 1 caractere com o
  `codEstabel` da operação (`agendarApoioSerie`), sugestão e selo só com o código, só vale a escolhida (`serieOperacaoInformada`);
  campo "Emitente de destino" desabilitado (fundo cinza) e limpo fora da Remessa (`travarEmitenteDestinoOperacao`, 26/10);
  na Remessa é o Estabelecimento de destino que fica desabilitado e limpo (`travarDestinoOperacao`, `remessaParaTerceiros`); emitentes
  (destino e origem) por autocomplete `apoiarEmitentes` — `NWM_CAMPOS_EMITENTE`, `termoEmitentePesquisavel`, só vale o escolhido;
  sem valor por item desde 21/10) → `criarTransferencia`/`criarRemessa`; Devolução de compra e Retorno para terceiros (documento de
  origem: Emitente, Nota Fiscal de entrada — `NWM_CAMPO_NOTA_ORIGEM`, `apoiarDocumentosEntrada` no estabelecimento da operação
  (`filtrosDoApoio`) —, Série — mesmo autocomplete da série de saída, `NWM_CAMPOS_SERIE` — e Natureza de entrada; `campoOperacao` só devolve a escolhida;
  `consultarEmbalagensOrigem`, sem passar do saldo; checkbox do cabeçalho marca/desmarca as disponíveis — `alterarSelecaoTodaOrigem`,
  `atualizarCheckTodosOrigem`) → `criarDevolucao`. 1 a 100 embalagens; chave idempotente por tentativa
  no `sessionStorage` (`guardarOperacaoPendente`/`restaurarOperacaoPendente`); resultado por `consultarResultadoOperacao`.
  Estados em `NWM_ESTADOS_OPERACAO`. A tela nunca muda status ou saldo localmente.
- **Ação de etiqueta** (imprimir, receber, estornar, inutilizar, perda; `NWM_COMANDOS_ETIQUETA`): uma etiqueta por vez; consulta
  situação/versão antes (`consultarEstadoEtiqueta`), para na primeira recusa; resultado incerto vai para o `sessionStorage` e bloqueia
  escritas (`escritaEtiquetaBloqueada`). Modal (receber, estornar, inutilizar, perda): `camposAcaoEtiqueta` valida e lança
  `erroCampoAcaoEtiqueta` com o campo; `recusarCamposAcaoEtiqueta` mostra a mensagem com `.is-erro` e marca o campo (`is-invalido`,
  `aria-invalid`, foco); `limparErroAcaoEtiqueta` ao digitar, ao abrir e ao confirmar. Ao confirmar: **da linha** (`daLinha`),
  `iniciarAcaoDaLinha` fecha o modal e marca `linhaCarregando`; `finalizarAcaoDaLinha` desmarca e avisa por toast (recusa com
  `mensagemRecusaAcaoEtiqueta`, incerto com a chave; sucesso em `encerrarAcaoEtiquetaConcluida`). **Do Aplicar**, o modal fica aberto,
  `bloquearTelaEtiqueta` desabilita os controles da widget e `mostrarCarregamentoAcaoEmLote` liga o loading global (`enviandoAcaoEmLote`)
  até a consulta atualizar. **Imprimir** (`iniciarImpressao`): `carregarDadosImpressao` busca `obterDadosImpressao` uma
  etiqueta por vez (`obterEtiquetaParaImpressao`; `montarDadosEtiquetaImpressao` monta `PRODUTO CODIGO LOTE DATAVAL CBARRA QTD UN`,
  QTD sem separador de milhar). Desde 26/10 (v0.1.19), como na tela antiga, `enviarEtiquetasAoAplicativo` manda ao aplicativo local
  (`NWM_APLICATIVO_IMPRESSAO`): impressora do `localStorage` ou, sem escolha, a `impressorapadrao` de `GET /impressoras` (e grava);
  modelo 423 do GED (`obterTemplateEtiqueta`, baixado uma vez); um `POST /imprimir` por etiqueta, em sequência, parando na primeira
  falha. Falha do aplicativo (fechado, modelo ausente, recusa) só avisa (`mensagemFalhaAplicativo` + "A impressão será registrada
  mesmo assim."). Em seguida, sem perguntar, `registrarImpressao` envia `CONFIRMAR_IMPRESSAO` com `NWM_JUSTIFICATIVA_IMPRESSAO`.
  Falha ao buscar dados → `falharPreparacaoImpressao` (aviso, nada impresso, nada registrado). Depois da confirmação, atualiza as linhas. **Após ação de etiqueta** (`terminarAtualizacaoEtiqueta` → `atualizarAposAcaoEtiqueta`): limpa a seleção e
  reconsulta cada embalagem envolvida (`etiquetasEnvolvidas`: até a que falhou) com os filtros da busca + `codEstabel`/`codEtiqueta`
  (`atualizarLinhaEtiqueta`); `aplicarEtiquetaAtualizada` faz `row.update` (mantém `descItem`/`fazenda`) e atualiza `carga.dados`, ou
  remove a linha se ela saiu do recorte (sem `temMais`). Acima de `NWM_LIMITE_ATUALIZACAO_LINHAS` (10), recarrega a grade
  (`atualizarGradeMantendoRecorte`). No fim, `reformatarLinhasExibidas` (sem `redraw`), para não perder rolagem nem página.
- **Loading global** (padrão Bags): `atualizarCarregandoGlobal` põe o overlay `.nwm-carregando-global`
  dentro de `this.DOM` (bloqueia só a widget, `aria-busy`) enquanto há busca (`carregandoTela`) ou Imprimir em lote buscando dados ou
  confirmando (`confirmandoImpressao`) ou ação de etiqueta do Aplicar enviando (`enviandoAcaoEmLote`). Junto, toast info "Carregando..." único por instância (`atualizarAvisoCarregando`, sai 100 ms após o fim).
- **Carregamento na linha** (ação clicada na tabela): `marcarLinhaCarregando`/`desmarcarLinhaCarregando` guardam `linhaCarregando`
  (`{ id, acao }`); `rowFormatter` → `pintarLinhaCarregando` põe `.nwm-linha-carregando` + `aria-busy`, os botões da linha ficam
  desabilitados e o clicado mostra spinner (`iconeBotaoAcao`). Enquanto houver, `aguardarAcaoDaLinha` recusa nova ação na tabela e Buscar.
  Imprimir da linha não bloqueia a tela; a linha sai do carregamento só depois de atualizada. Se cair na recarga completa (lote
  grande), ela é silenciosa (`atualizarGradeMantendoRecorte(true)` → `carregarEtiquetas(parametros, true)`).
- **Histórico**: `abrirHistorico(linha)` carrega com o carregamento na linha e só abre o modal após sucesso; paginação por `aposRegistro`;
  badge por código exato (`NWM_EVENTOS_HISTORICO`) ou raiz (`NWM_RAIZES_EVENTOS_HISTORICO`); sem correspondência, o código em badge
  neutra. Data por `formatarDataHoraHistorico` (sem conversão de fuso). Modal `.nwm-modal-historico` (23/10): até 1600px de largura (Justificativa quebra linha, mínimo 240px)
  e a tabela rola a partir da altura da tela menos 320px (mínimo 280px). Tabela e paginação num quadro com borda; rodapé da paginação
  no padrão da tabela principal (`.nwm-historico-paginacao`): "Mostrando X–Y eventos" à esquerda e ‹ página › à direita (cursor, sem
  total nem primeira/última). O rodapé do modal tem só Fechar.
- **Impressora**: modal com lista do aplicativo local (`NWM_APLICATIVO_IMPRESSAO`), salvar no `localStorage`, imprimir teste
  (`NWM_ETIQUETA_TESTE`, template do GED). A impressora salva aqui é a usada pelo botão Imprimir (linha e lote).
- **Avisos**: `avisar(tipo, mensagem, duracao)` via `FLUIGC.toast`.

## Mapa do fonte (`widget_nw_manutEtiq.js`)
O arquivo tem ~4.900 linhas: **não ler inteiro**. Achar com Grep e ler só o trecho (`offset`/`limit`). Padrões de busca:
`^var NWM_<NOME>` (constantes) e `^  <nome>\(` (métodos do SuperWidget). Linhas aproximadas (21/10/2026); o Grep manda.

| Bloco (linhas) | Nomes |
|---|---|
| Constantes (1–396) | `NWM_FECHAMENTO_MODAIS`, `NWM_EVENTOS_HISTORICO`, `NWM_RAIZES_EVENTOS_HISTORICO`, `NWM_STATUS`, `NWM_POSICOES`, `NWM_ACOES`, `NWM_APOIOS_FILTROS`, `NWM_RESTRICOES_APOIO`, `NWM_PARAMETROS_ETIQUETAS`, limites/tempos (`NWM_LIMITE_*`, `NWM_*_MS`, `NWM_TAMANHO_PAGINA`), `NWM_LEGENDA_STATUS`, `NWM_LARGURAS_COLUNAS`, `NWM_TIPOS_ERRO`, `NWM_ESTADOS_OPERACAO`, regex, impressora, `NWM_ACOES_POR_STATUS`, `NWM_COMANDOS_ETIQUETA` |
| SuperWidget (398–fim) | ver abaixo |

| Assunto (linhas) | Métodos |
|---|---|
| Início (421–475) | `init`, `bindings`, `prepararTabela` |
| Filtros e autocomplete (477–1160) | `prepararFiltros`, `prepararApoiosFiltros`, `criarSelecionado`, `montarParametrosApoio`, `agendarApoioFiltro`, `consultarPaginaApoio`, `renderizarApoioFiltro`, `selecionarApoioFiltro`, `teclaApoioFiltro`, `adicionarDocumento`, `renderizarDocumentosSelecionados` |
| Transporte Dataset (1163–1512) | `erroDataset`, `chamarEmbalagens`, `tratarRespostaDataset`, `extrairEnvelopeDataset`, `consultarDataset`, `cancelarConsultaDataset`, `mostrarErroConsulta` |
| Tabela (1515–1870) | `montarTabela`, `opcoesTabela`, `montarColunasTabela`, `coluna*`, `montarChipStatus`, `montarBotoesAcoes`, `acoesDaEtiqueta`, `acaoDisponivel`, `textoMotivoIndisponivel` |
| Seleção (1871–2069) | `montarCheckTodos`, `marcarLinha`, `marcarTodos`, `limparSelecao`, `atualizarSelecao`, `renderizarItensSelecionados`, `linhasSelecionadas` |
| Busca e carga (2070–2650) | `buscar`, `montarParametrosEtiquetas`, `carregarEtiquetas`, `consultarPaginaEtiquetas`, `descreverItensCarga`, `descreverEstabelecimentosCarga`, `concluirCargaEtiquetas`, `mapearEtiqueta`, `registroEtiquetaValido` |
| Validação dos filtros (2649–2796) | `lerFiltros`, `valorFiltroInformado`, `validarFiltros`, `verificarFiltrosObrigatorios`, `verificarOrdemFaixas`, `verificarTextoFiltros`, `marcarInvalidos` |
| Ações da linha, lote e quantidade (2797–2950) | `acaoNaLinha`, `aplicarLote`, `executarQuantidade`, `escolherEmbalagensDoItem` |
| Modais e Detalhes (2951–3225) | `prepararModais`, `ligarFechamentoPeloFundo`, `cliqueForaModal`, `abrirDetalhes`, `aplicarAcao` |
| Operação (3226–4306) | `abrirOperacao`, `classificarOperacao`, `carregarOrigemOperacao`, `montarComandoOperacao`, `montarDevolucao`, `montarSaidaDireta`, `gerarChaveIdempotente`, `enviarOperacao`, `consultarResultadoAtual`, `guardarOperacaoPendente`, `restaurarOperacaoPendente` |
| Ação de etiqueta (4302–4488) | `prepararAcaoEtiqueta`, `abrirAcaoEtiqueta`, `iniciarImpressao`, `carregarDadosImpressao`, `montarPaginaEtiqueta`, `marcacaoCodigoBarras`, `abrirQuadroImpressao`, `enviarParaImpressora`, `registrarImpressao`, `camposAcaoEtiqueta`, `recusarCamposAcaoEtiqueta`, `limparErroAcaoEtiqueta`, `enviarAcaoEtiqueta`, `iniciarAcaoDaLinha`, `finalizarAcaoDaLinha`, `mostrarCarregamentoAcaoEmLote`, `mensagemRecusaAcaoEtiqueta`, `consultarEstadoEtiqueta`, `despacharAcaoEtiqueta`, `guardarEtiquetaIncerta`, `atualizarAposAcaoEtiqueta`, `atualizarLinhaEtiqueta`, `aplicarEtiquetaAtualizada`, `atualizarGradeMantendoRecorte` |
| Histórico e loading (4489–4614) | `abrirHistorico`, `atualizarCarregandoGlobal`, `atualizarAvisoCarregando`, `carregarHistoricoEtiqueta`, `montarBadgeEventoHistorico`, `renderizarHistoricoEtiqueta` |
| Impressão, Select2 e legenda (4615–4690) | `obterDadosImpressaoEtiqueta`, `validarRespostaIndividual`, `prepararSelect2`, `montarLegenda`, `abrirLegenda` |
| Impressora (4692–4882) | `abrirImpressora`, `carregarImpressoras`, `chamarAplicativoImpressao`, `salvarImpressora`, `testarImpressora`, `obterTemplateEtiqueta` |
| Utilidades (4883–fim) | `avisar`, `formatarDataHoraHistorico`, `formatarData`, `formatarQuantidade` |
