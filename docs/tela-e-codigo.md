# Tela e código — widget_nw_manutEtiq

> Descrição do JS e da tela em 21/10/2026. **O fonte manda**: se divergir, vale `src/` e este arquivo é atualizado.
> Decisões do usuário que explicam o comportamento: `decisoes.md`. Contrato e campos: `referencias-backend.md`.

## Tela (`view.ftl`)
- Cabeçalho "Manutenção Embalagens" / "Consulte, imprima e movimente as embalagens."; aba única (visão ADM).
- **Filtros** (todos visíveis, faixa De/Até): Estabelecimento (**obrigatório**) · Itens · Depósito · Cód Barras · Lote · Data Validade
  (`type=date`) · Família · Nota Fiscal (rádio **Intervalo** × **Específicas**, 1 a 20 documentos removíveis). Ação: **Buscar**.
  - Autocomplete próprio (2+ caracteres, debounce 350 ms, 20 por página com "Carregar mais resultados") em Estabelecimento, Itens,
    Depósito, Lote, Família e Nota Fiscal; escolher vira **selo** "código - descrição" com × (exceto Específicas). Nos campos de faixa
    preenche só o código. Nota Fiscal De/Até usa `apoiarDocumentosEntrada` (exige Estabelecimento De e Até) e grava o número da nota.
  - Item e Depósito só filtram por estabelecimento quando Estabelecimento De = Até; Lote recebe as faixas de estabelecimento, item e depósito.
  - Validação (`validarFiltros`): Estabelecimento De **e** Até; Itens **ou** Nota Fiscal; De ≤ Até (texto); até 100 caracteres, sem
    caractere de controle; data válida. Aviso em toast `warning` e campo marcado.
- **Barra de seleção**: tabela "Itens selecionados" (Código | Descrição | Qtde Sel.) · Escolher item + Quantidade + **Executar** (marca
  embalagens inteiras do item — ativas, no estabelecimento, sem Bag, saldo = quantidade inicial — até a quantidade pedida) ·
  **Ação em lote** (Imprimir, Receber, Estornar, Transferir, Devolução, Inutilizar, Registrar perda/extravio) + Aplicar ·
  **Código de barras** (`data-leitor-cod-barras`, sem comportamento). Selects com Select2 4.0.13 (pt-BR).
- **Tabela** (Tabulator): marcação | Código | Descrição | Tipo de Embalagem (`codTipo`) | Fazenda (`código - descrição`) | Etiqueta | Lote |
  Data Val. | Qtde Emb | Qtde Saldo | UN | Status | Ações. Larguras em `NWM_LARGURAS_COLUNAS` (Ações 320px, alinhada à esquerda).
  - A busca lê **todas** as páginas do Dataset (100 por chamada) e só então mostra; grade com 20 por página, altura 560, cabeçalho fixo;
    ordem inicial Código → Etiqueta. Marcar todos vale só para o visível; só `EMBALAGEM` de busca concluída pode ser marcada.
  - Status = chip colorido (`montarChipStatus`, classe `nwm-chip-<codigo>`), texto de `descricaoSituacao`; botão no título abre a Legenda.
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
  Imprimir exige `situacao` ATIVA; com Bag, só Imprimir; Receber/Transferir exigem `ESTAB`, impressão confirmada e saldo. Indisponível
  aparece desabilitado com o motivo no `title` (`textoMotivoIndisponivel`).
- **Modais** (sete `<dialog>`, fecham pelo fundo — `NWM_FECHAMENTO_MODAIS`/`cliqueForaModal`): Detalhes · Movimentar embalagens
  (operação) · Legenda dos status · Mais ações (no código, sem botão na linha) · Impressora · Ação de etiqueta · Histórico da embalagem.

## Arquitetura do JS
- Arquivo único: constantes `NWM_*` no topo e o SuperWidget `widget_nw_manutEtiq` (padrão de código no `AGENTS.md`).
- **Transporte** (`chamarEmbalagens`, `consultarDataset`): `$.ajax` ao Dataset; valida envelope (`extrairEnvelopeDataset`,
  `envelopeComandoValido`, `envelopePaginadoValido`…); consultas por canal (`consultasDataset`), resposta antiga é descartada;
  erros classificados em `NWM_TIPOS_ERRO` (técnico, funcional, autorização, cancelamento). Tempo limite 90 s.
- **Busca** (`buscar` → `carregarEtiquetas`): pagina por cursor, valida ordem dos ids e cada registro (`registroEtiquetaValido`), mapeia
  (`mapearEtiqueta`), descreve itens (`apoiarItens`) e estabelecimentos (Fazenda) e só então exibe (`concluirCargaEtiquetas`).
- **Operação** (Transferir/Devolver, modal Movimentar): `classificarNatureza` define o fluxo (`NWM_ROTULOS_FLUXO`): Transferência e
  Remessa (destino, série, valor) → `criarTransferencia`/`criarRemessa`; Devolução de compra e Retorno para terceiros (documento de
  origem, `consultarEmbalagensOrigem`, sem passar do saldo) → `criarDevolucao`. 1 a 100 embalagens; chave idempotente por tentativa
  no `sessionStorage` (`guardarOperacaoPendente`/`restaurarOperacaoPendente`); resultado por `consultarResultadoOperacao`.
  Estados em `NWM_ESTADOS_OPERACAO`. A tela nunca muda status ou saldo localmente.
- **Ação de etiqueta** (imprimir, receber, estornar, inutilizar, perda; `NWM_COMANDOS_ETIQUETA`): uma etiqueta por vez; consulta
  situação/versão antes (`consultarEstadoEtiqueta`), para na primeira recusa; resultado incerto vai para o `sessionStorage` e bloqueia
  escritas (`escritaEtiquetaBloqueada`). Imprimir não abre modal: envia `CONFIRMAR_IMPRESSAO` com `NWM_JUSTIFICATIVA_IMPRESSAO_TESTE` e
  recarrega a grade mantendo página/recorte (`atualizarGradeMantendoRecorte`).
- **Loading global** (padrão Bags): `definirCarregandoGlobal`/`atualizarCarregandoGlobal` põem o overlay `.nwm-carregando-global`
  dentro de `this.DOM` (bloqueia só a widget, `aria-busy`) enquanto há busca (`carregandoTela`), abertura de Histórico
  (`preparandoHistorico`) ou confirmação de impressão (`confirmandoImpressao`). Junto, toast info "Carregando..." único por instância (`atualizarAvisoCarregando`, sai 100 ms após o fim).
- **Histórico**: `abrirHistorico` carrega com o loading global e só abre o modal após sucesso; paginação por `aposRegistro`;
  badge por código exato (`NWM_EVENTOS_HISTORICO`) ou raiz (`NWM_RAIZES_EVENTOS_HISTORICO`); sem correspondência, o código em badge
  neutra. Data por `formatarDataHoraHistorico` (sem conversão de fuso).
- **Impressora**: modal com lista do aplicativo local (`NWM_APLICATIVO_IMPRESSAO`), salvar no `localStorage`, imprimir teste
  (`NWM_ETIQUETA_TESTE`, template do GED). Não é usado pelo botão Imprimir da linha.
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
| Validação dos filtros (2649–2796) | `lerFiltros`, `validarFiltros`, `verificarFiltrosObrigatorios`, `verificarOrdemFaixas`, `verificarTextoFiltros`, `marcarInvalidos` |
| Ações da linha, lote e quantidade (2797–2950) | `acaoNaLinha`, `aplicarLote`, `executarQuantidade`, `escolherEmbalagensDoItem` |
| Modais, Detalhes e Mais ações (2951–3225) | `prepararModais`, `ligarFechamentoPeloFundo`, `cliqueForaModal`, `abrirDetalhes`, `abrirMaisAcoes`, `aplicarAcao` |
| Operação (3226–4306) | `abrirOperacao`, `classificarOperacao`, `carregarOrigemOperacao`, `montarComandoOperacao`, `montarDevolucao`, `montarSaidaDireta`, `gerarChaveIdempotente`, `enviarOperacao`, `consultarResultadoAtual`, `guardarOperacaoPendente`, `restaurarOperacaoPendente` |
| Ação de etiqueta (4302–4488) | `prepararAcaoEtiqueta`, `abrirAcaoEtiqueta`, `iniciarConfirmacaoImpressao`, `enviarAcaoEtiqueta`, `consultarEstadoEtiqueta`, `despacharAcaoEtiqueta`, `guardarEtiquetaIncerta`, `atualizarGradeMantendoRecorte` |
| Histórico e loading (4489–4614) | `abrirHistorico`, `definirCarregandoGlobal`, `atualizarCarregandoGlobal`, `atualizarAvisoCarregando`, `carregarHistoricoEtiqueta`, `montarBadgeEventoHistorico`, `renderizarHistoricoEtiqueta` |
| Impressão, Select2 e legenda (4615–4690) | `obterDadosImpressaoEtiqueta`, `validarRespostaIndividual`, `prepararSelect2`, `montarLegenda`, `abrirLegenda` |
| Impressora (4692–4882) | `abrirImpressora`, `carregarImpressoras`, `chamarAplicativoImpressao`, `salvarImpressora`, `testarImpressora`, `obterTemplateEtiqueta` |
| Utilidades (4883–fim) | `avisar`, `formatarDataHoraHistorico`, `formatarData`, `formatarQuantidade` |
