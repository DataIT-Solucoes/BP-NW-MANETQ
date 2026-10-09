var NWM_STATUS = {
    ATIVA: { rotulo: 'Ativa' },
    ENCERRADA: { rotulo: 'Encerrada' },
    CANCELADA: { rotulo: 'Cancelada' },
    DESCARTADA: { rotulo: 'Descartada' }
};
var NWM_POSICOES = { ESTAB: 'Estabelecimento', CAMPO: 'Campo', TERCEIRO: 'Terceiro', TRANSITO: 'Trânsito' };

var NWM_ACOES = {
    detalhes: { rotulo: 'Detalhes', icone: 'bi-eye' },
    imprimir: { rotulo: 'Imprimir', icone: 'bi-printer', secundaria: true },
    receber: { rotulo: 'Receber', icone: 'bi-box-arrow-in-down', secundaria: true },
    estornar: { rotulo: 'Estornar', icone: 'bi-arrow-counterclockwise', secundaria: true },
    descartar: { rotulo: 'Descartar', icone: 'bi-trash3', destrutivo: true, secundaria: true },
    transferir: { rotulo: 'Transferir / Remessa', icone: 'bi-arrow-left-right' },
    devolver: { rotulo: 'Devolver', icone: 'bi-box-arrow-up' }
};

var NWM_APOIOS_FILTROS = { est: 'apoiarEstabelecimentos', item: 'apoiarItens', dep: 'apoiarDepositos', lote: 'apoiarLotes', familia: 'apoiarFamilias' };

var NWM_APOIO_DOCUMENTOS = 'apoiarDocumentosEntrada';

var NWM_RESTRICOES_APOIO = {
    apoiarItens: { tipoControleEstoque: '3' },
    apoiarDocumentosEntrada: { somenteComEmbalagens: 'true' }
};

var NWM_PARAMETROS_RECORTE_LOTE = { estDe: 'estabelDe', estAte: 'estabelAte', itemDe: 'itemDe', itemAte: 'itemAte', depDe: 'depositoDe', depAte: 'depositoAte' };

var NWM_PARAMETROS_ETIQUETAS = {
    estDe: 'estabelDe', estAte: 'estabelAte', itemDe: 'itemDe', itemAte: 'itemAte', depDe: 'depositoDe', depAte: 'depositoAte',
    barrasDe: 'etiquetaDe', barrasAte: 'etiquetaAte', loteDe: 'loteDe', loteAte: 'loteAte', validadeDe: 'validadeDe', validadeAte: 'validadeAte',
    familiaDe: 'familiaDe', familiaAte: 'familiaAte', nfDe: 'notaDe', nfAte: 'notaAte'
};

var NWM_PREFIXOS_FAIXAS = ['est', 'item', 'dep', 'barras', 'lote', 'validade', 'familia', 'nf'];
var NWM_CAMPOS_DOCUMENTO = ['codigo', 'numero', 'emitente', 'codEstabel', 'natureza'];
var NWM_CAMPOS_ORIGEM = ['emitenteOrigem', 'serieOrigem', 'numeroOrigem', 'naturezaOrigem'];
var NWM_CAMPOS_NUMERICOS_ETIQUETA = ['quantidadeInicial', 'quantidadeAtual', 'capacidade'];
var NWM_CAMPOS_TEXTO_OPCIONAL_ETIQUETA = ['lote', 'validadeLote', 'deposito', 'localizacao', 'unidade', 'idBag'];

var NWM_ROTULOS_FLUXO = { TRANSFERENCIA: 'Transferência', REMESSA_TERCEIROS: 'Remessa para terceiros', DEVOLUCAO_COMPRA: 'Devolução de compra', RETORNO_TERCEIROS: 'Retorno para terceiros' };
var NWM_RAMOS_DEVOLUCAO = { DEVOLUCAO_COMPRA: 'FT4011', RETORNO_TERCEIROS: 'FT4012' };

var NWM_LIMITE_SUGESTOES = 20;
var NWM_LIMITE_DOCUMENTOS = 20;
var NWM_LIMITE_PAGINA = 100;
var NWM_LIMITE_EMBALAGENS_OPERACAO = 100;
var NWM_LIMITE_TEXTO = 100;
var NWM_ATRASO_APOIO_MS = 350;
var NWM_TEMPO_MARCACAO_INVALIDO_MS = 2000;
var NWM_TEMPO_LIMITE_CONSULTA_MS = 90000;
var NWM_ESCALA_QUANTIDADE = 10000;
var NWM_ALTURA_MAXIMA_TABELA = 560;
var NWM_TAMANHO_PAGINA = 20;

var NWM_LEGENDA_STATUS = [
    { codigo: 'NAO_IMPRESSA', rotulo: 'Não impressa', descricao: 'Impressão ainda não confirmada.' },
    { codigo: 'IMPRESSA', rotulo: 'Impressa', descricao: 'Aguarda recebimento físico no almoxarifado.' },
    { codigo: 'EM_ESTOQUE', rotulo: 'Em estoque', descricao: 'Recebimento físico confirmado.' },
    { codigo: 'EM_CAMPO', rotulo: 'Em campo', descricao: 'Registrada na posição de campo.' },
    { codigo: 'AGUARDANDO_RECEBIMENTO', rotulo: 'Aguardando recebimento', descricao: 'Em trânsito para o destino.' },
    { codigo: 'EM_TERCEIRO', rotulo: 'Em terceiro', descricao: 'Embalagem sob custódia de terceiro para armazenagem.' },
    { codigo: 'ZERADA', rotulo: 'Zerada', descricao: 'Sem conteúdo, ainda fora de uma Bag.' },
    { codigo: 'EM_BAG', rotulo: 'Em Bag', descricao: 'Vinculada a uma Bag ainda não enviada.' },
    { codigo: 'DESCARTADA', rotulo: 'Descartada', descricao: 'Descarte registrado no envio da Bag.' }
];
var NWM_CRESCIMENTO_DESCRICAO = 3;

var NWM_LARGURAS_COLUNAS = {
    marcacao: 44, codigo: 88, descricaoMinima: 154, fazenda: 96, etiqueta: 110, lote: 90,
    validade: 100, quantidadeEmbalagem: 72, quantidadeSaldo: 76, status: 136, acoes: 160
};

var NWM_TIPOS_ERRO = { TECNICO: 'tecnico', FUNCIONAL: 'funcional', AUTORIZACAO: 'autorizacao', CANCELAMENTO: 'cancelamento' };

var NWM_ESTADOS_OPERACAO = {
    EDICAO: 'edicao', CLASSIFICANDO: 'classificando', CARREGANDO_ORIGEM: 'carregando-origem', CONFIRMACAO: 'confirmacao',
    ENVIANDO: 'enviando', INCERTA: 'incerta', CONSULTANDO: 'consultando', CONCLUIDA: 'concluida'
};

var NWM_CODIGO_POSITIVO = /^[1-9][0-9]*$/;
var NWM_SOMENTE_DIGITOS = /^[0-9]+$/;
var NWM_CARACTERE_CONTROLE = /[\x00-\x1f]/;
var NWM_DECIMAL_ATE_QUATRO_CASAS = /^[0-9]+(?:\.[0-9]{1,4})?$/;

var NWM_APLICATIVO_IMPRESSAO = 'http://localhost:32478';
var NWM_URL_TEMPLATE_ETIQUETA = '/webdesk/webdownload?documentId=423&version=1000&tenantId=1&replication=';
var NWM_CHAVE_IMPRESSORA = 'impressora';
var NWM_TEMPO_LIMITE_IMPRESSAO_MS = 15000;
var NWM_ETIQUETA_TESTE = { PRODUTO: 'PRODUTO TESTE', CODIGO: '1234', LOTE: '2020-9876', DATAVAL: '31/12/2020', CBARRA: '1234567', QTD: '10', UN: 'LT' };

var widget_nw_manutEtiq = SuperWidget.extend({

    tabela: null,

    selecionados: null,

    temporizadorFiltros: null,

    consultasDataset: null,

    apoiosFiltros: null,

    consultaEtiquetas: null,

    documentosSelecionados: null,

    operacaoAtual: null,

    templateEtiqueta: null,

    impressoraOcupada: false,

    linhaMaisAcoes: null,

    init() {
        this.selecionados = {};
        this.consultasDataset = Object.create(null);
        this.apoiosFiltros = Object.create(null);
        this.documentosSelecionados = [];
        this.prepararTabela();
        this.prepararFiltros();
        this.prepararApoiosFiltros();
        $('[data-acao-lote], [data-aplicar-lote]', this.DOM).prop('disabled', false);
        this.atualizarItensQuantidade();
        if ($.fn.select2) this.prepararSelect2();
        this.prepararModais();
        this.restaurarOperacaoPendente();
        this.montarLegenda();
        this.atualizarSelecao();
    },

    bindings: {
        local: {
            'buscar': ['click_buscar'],
            'nf-modo': ['change_trocarModoNf'],
            'aplicar-lote': ['click_aplicarLote'],
            'executar-qtde': ['click_executarQuantidade'],
            'caixa-item-qtde': ['click_avisarItemQuantidadeVazio'],
            'fechar-detalhes': ['click_fecharDetalhes'],
            'fechar-legenda': ['click_fecharLegenda'],
            'abrir-impressora': ['click_abrirImpressora'],
            'fechar-impressora': ['click_fecharImpressora'],
            'atualizar-impressoras': ['click_carregarImpressoras'],
            'impressora-lista': ['change_atualizarBotoesImpressora'],
            'testar-impressora': ['click_testarImpressora'],
            'salvar-impressora': ['click_salvarImpressora'],
            'fechar-mais-acoes': ['click_fecharMaisAcoes']
        },
        global: {}
    },

    prepararTabela() {
        if (window.Tabulator) {
            this.montarTabela();
            return;
        }
        $('[data-tabela]', this.DOM).empty().append($('<p>', {
            'class': 'nwm-tabela-erro',
            text: 'Não foi possível carregar a tabela. Verifique a conexão com a internet e recarregue a página.'
        }));
    },

    prepararFiltros() {
        var self = this;
        $(this.DOM).on('input.nwm', '.nwm-filtros .nwm-campo-input', function () {
            self.reagirAlteracaoFiltro($(this));
        });
    },

    reagirAlteracaoFiltro($campo) {
        this.cancelarConsultaEtiquetas();
        this.cancelarConsultaDataset('tabela');
        if (this.tabela) this.limparSelecao();
        this.invalidarApoiosDependentes($campo.data('filtro'));
        $campo.removeClass('is-invalido').removeAttr('aria-invalid');
    },

    prepararApoiosFiltros() {
        var self = this;
        $.each(NWM_APOIOS_FILTROS, function (prefixo, acao) {
            $.each(['De', 'Ate'], function (indice, sufixo) {
                self.prepararApoioFiltro(prefixo + sufixo, acao);
            });
        });
        $.each(['nfDe', 'nfAte', 'nfEspecificas'], function (indice, campo) {
            self.prepararApoioFiltro(campo, NWM_APOIO_DOCUMENTOS);
        });
        $('[data-documentos-selecionados]', this.DOM).on('click.nwm', '[data-remover-documento]', function () {
            self.removerDocumento($(this).attr('data-remover-documento'));
        });
        this.renderizarDocumentosSelecionados();
    },

    prepararApoioFiltro(campo, acao) {
        var $input = $('[data-filtro="' + campo + '"]', this.DOM);
        var idLista = 'nwm-apoio-' + campo + '-' + this.instanceId;
        var $lista = this.criarListaSugestoes($input, idLista);
        var apoio = this.criarEstadoApoio(campo, acao, $input, $lista);
        this.apoiosFiltros[campo] = apoio;
        if (campo !== 'nfEspecificas') this.criarSelecionado(apoio);
        this.ligarEventosCampoApoio(apoio);
        this.ligarEventosListaApoio(apoio);
    },

    criarListaSugestoes($input, idLista) {
        $input.wrap($('<div>', { 'class': 'nwm-campo-caixa' }));
        var $lista = $('<ul>', { id: idLista, 'class': 'nwm-sugestoes', role: 'listbox', 'aria-label': $input.attr('aria-label'), hidden: true }).insertAfter($input);
        $input.attr({ role: 'combobox', 'aria-autocomplete': 'list', 'aria-expanded': 'false', 'aria-controls': idLista });
        return $lista;
    },

    criarEstadoApoio(campo, acao, $input, $lista) {
        return {
            campo: campo, acao: acao, $input: $input, $lista: $lista, sequencia: 0,
            temporizador: null, termo: '', parametros: null, dados: [], cursores: Object.create(null),
            cursor: '', temMais: false, carregando: false, erro: null, ativo: -1, selecionado: false
        };
    },

    criarSelecionado(apoio) {
        var self = this;
        apoio.$selecionadoCodigo = $('<span>', { 'class': 'nwm-selecionado-codigo' });
        apoio.$selecionadoDescricao = $('<span>', { 'class': 'nwm-selecionado-descricao' });
        apoio.$selecionadoTexto = $('<span>', { 'class': 'nwm-selecionado-texto' }).append(apoio.$selecionadoCodigo).append(apoio.$selecionadoDescricao);
        apoio.$selecionadoRemover = $('<button>', { type: 'button', 'class': 'nwm-selecionado-remover', 'aria-label': 'Remover ' + apoio.$input.attr('aria-label'), title: 'Remover' })
            .append($('<i>', { 'class': 'bi bi-x', 'aria-hidden': 'true' }))
            .on('click.nwmApoio', function () { self.removerSelecionado(apoio); });
        apoio.$selecionadoChip = $('<span>', { 'class': 'nwm-selecionado-chip' }).append(apoio.$selecionadoTexto).append(apoio.$selecionadoRemover);
        apoio.$selecionado = $('<span>', { 'class': 'nwm-selecionado', hidden: true }).append(apoio.$selecionadoChip).insertAfter(apoio.$input);
    },

    mostrarSelecionado(apoio, registro) {
        if (!apoio.$selecionado) return;
        apoio.selecionado = true;
        var partes = this.partesSelecionado(apoio, registro);
        apoio.$selecionadoCodigo.text(partes.codigo);
        apoio.$selecionadoDescricao.text(partes.descricao ? ' - ' + partes.descricao : '');
        apoio.$selecionadoChip.attr('title', this.textoTituloSelecionado(apoio, registro));
        apoio.$input.addClass('is-selecionado').prop('readOnly', true);
        apoio.$selecionado.prop('hidden', false);
        apoio.$selecionadoRemover.trigger('focus');
    },

    partesSelecionado(apoio, registro) {
        var codigo = this.valorSelecionadoApoio(apoio, registro);
        var descricao = this.descricaoSelecionada(apoio, registro);
        return { codigo: codigo, descricao: descricao !== codigo ? descricao : '' };
    },

    descricaoSelecionada(apoio, registro) {
        if (!this.apoioDeDocumentos(apoio)) return String(registro.descricao || '').trim();
        var emitente = String(registro.descricaoEmitente || '').trim();
        if (emitente) return emitente;
        return String(registro.serie || '').trim() ? 'série ' + registro.serie : 'sem série';
    },

    textoTituloSelecionado(apoio, registro) {
        var textos = this.textosOpcaoApoio(apoio, registro);
        return textos.principal + ' — ' + textos.complemento;
    },

    esconderSelecionado(apoio) {
        if (!apoio.$selecionado) return;
        apoio.selecionado = false;
        apoio.$input.removeClass('is-selecionado').prop('readOnly', false);
        apoio.$selecionado.prop('hidden', true);
    },

    removerSelecionado(apoio) {
        this.esconderSelecionado(apoio);
        apoio.$input.val('').trigger('input').trigger('focus');
    },

    ligarEventosCampoApoio(apoio) {
        var self = this;
        var $input = apoio.$input;
        $input.on('input.nwmApoio', function () {
            $input.removeData('registro');
            self.agendarApoioFiltro(apoio);
        }).on('focus.nwmApoio', function () {
            if (!apoio.selecionado && !self.campoTemRegistroSelecionado(apoio)) self.agendarApoioFiltro(apoio);
        }).on('blur.nwmApoio', function () {
            self.cancelarApoioFiltro(apoio);
        }).on('keydown.nwmApoio', function (evento) {
            self.teclaApoioFiltro(apoio, evento);
        });
    },

    campoTemRegistroSelecionado(apoio) {
        var registro = apoio.$input.data('registro');
        return !!registro && apoio.$input.val() === this.valorSelecionadoApoio(apoio, registro);
    },

    apoioDeDocumentos(apoio) {
        return apoio.acao === NWM_APOIO_DOCUMENTOS;
    },

    valorSelecionadoApoio(apoio, registro) {
        return this.apoioDeDocumentos(apoio) ? registro.numero : registro.codigo;
    },

    ligarEventosListaApoio(apoio) {
        var self = this;
        apoio.$lista.on('mousedown.nwmApoio', function (evento) { evento.preventDefault(); });
        apoio.$lista.on('click.nwmApoio', '[data-opcao]', function () {
            self.selecionarApoioFiltro(apoio, Number($(this).attr('data-opcao')));
        }).on('click.nwmApoio', '[data-proxima]', function () {
            self.consultarPaginaApoio(apoio, true);
        });
    },

    montarParametrosApoio(acao, termo, filtros) {
        var parametros = { filtro: termo, limite: NWM_LIMITE_SUGESTOES };
        if (this.apoioAceitaEstabelecimentoExato(acao) && filtros.estDe && filtros.estDe === filtros.estAte) {
            parametros.codEstabel = filtros.estDe;
        }
        if (acao === 'apoiarLotes' || acao === NWM_APOIO_DOCUMENTOS) {
            this.copiarRecorteApoio(acao, filtros, parametros);
        }
        return $.extend(parametros, NWM_RESTRICOES_APOIO[acao]);
    },

    apoioAceitaEstabelecimentoExato(acao) {
        return acao === 'apoiarItens' || acao === 'apoiarDepositos';
    },

    copiarRecorteApoio(acao, filtros, parametros) {
        $.each(NWM_PARAMETROS_RECORTE_LOTE, function (campo, parametro) {
            var somenteEstabelecimento = acao === NWM_APOIO_DOCUMENTOS;
            if (somenteEstabelecimento && campo !== 'estDe' && campo !== 'estAte') return;
            if (filtros[campo]) parametros[parametro] = filtros[campo];
        });
    },

    invalidarApoiosDependentes(campo) {
        var self = this;
        var mudouEstabelecimento = campo === 'estDe' || campo === 'estAte';
        var mudouRecorteLote = mudouEstabelecimento || /^(item|dep)(De|Ate)$/.test(campo || '');
        if (mudouEstabelecimento) {
            this.documentosSelecionados = [];
            this.renderizarDocumentosSelecionados();
        }
        $.each(this.apoiosFiltros || {}, function (nome, apoio) {
            var dependeEstabelecimento = mudouEstabelecimento && /^(item|dep|nf)/.test(nome);
            var dependeRecorteLote = mudouRecorteLote && /^lote/.test(nome);
            if (dependeEstabelecimento || dependeRecorteLote) self.limparApoioDependente(nome, apoio);
        });
    },

    limparApoioDependente(nome, apoio) {
        this.cancelarApoioFiltro(apoio);
        apoio.dados = [];
        apoio.$input.removeData('registro');
        if (!/^(lote|nfEspecificas)/.test(nome)) return;
        apoio.$input.val('');
        this.esconderSelecionado(apoio);
    },

    cancelarApoioFiltro(apoio) {
        apoio.sequencia++;
        clearTimeout(apoio.temporizador);
        apoio.temporizador = null;
        this.cancelarConsultaDataset('apoio:' + apoio.campo);
        apoio.carregando = false;
        apoio.$input.attr({ 'aria-expanded': 'false', 'aria-busy': 'false' }).removeAttr('aria-activedescendant');
        apoio.$lista.prop('hidden', true);
        apoio.ativo = -1;
    },

    agendarApoioFiltro(apoio) {
        var self = this;
        this.cancelarApoioFiltro(apoio);
        this.reiniciarPesquisaApoio(apoio);
        if (apoio.termo.length < 2) return;
        if (this.faltaEstabelecimentoParaDocumentos(apoio)) {
            apoio.erro = this.erroDataset('CONTEXTO_OBRIGATORIO', 'Informe o estabelecimento De e Até para buscar documentos.', NWM_TIPOS_ERRO.FUNCIONAL);
            this.renderizarApoioFiltro(apoio);
            return;
        }
        apoio.parametros = this.montarParametrosApoio(apoio.acao, apoio.termo, this.lerFiltros());
        var sequencia = apoio.sequencia;
        apoio.temporizador = setTimeout(function () {
            apoio.temporizador = null;
            if (apoio.sequencia === sequencia) self.consultarPaginaApoio(apoio, false);
        }, NWM_ATRASO_APOIO_MS);
    },

    reiniciarPesquisaApoio(apoio) {
        apoio.termo = String(apoio.$input.val() || '').trim();
        apoio.dados = [];
        apoio.cursor = '';
        apoio.cursores = Object.create(null);
        apoio.temMais = false;
        apoio.erro = null;
    },

    faltaEstabelecimentoParaDocumentos(apoio) {
        if (!this.apoioDeDocumentos(apoio)) return false;
        var filtros = this.lerFiltros();
        return !filtros.estDe || !filtros.estAte;
    },

    consultarPaginaApoio(apoio, continuar) {
        if (apoio.carregando || !apoio.parametros || (continuar && !apoio.temMais)) return;
        var self = this;
        var sequencia = apoio.sequencia;
        var parametros = $.extend({}, apoio.parametros);
        if (continuar) parametros.aposCodigo = apoio.cursor;
        apoio.carregando = true;
        apoio.erro = null;
        this.renderizarApoioFiltro(apoio);
        this.consultarDataset(apoio.acao, parametros, 'apoio:' + apoio.campo).then(function (resultado) {
            if (apoio.sequencia !== sequencia) return;
            self.receberPaginaApoio(apoio, resultado, parametros.aposCodigo);
        }, function (erro) {
            self.falharPaginaApoio(apoio, sequencia, erro);
        });
    },

    falharPaginaApoio(apoio, sequencia, erro) {
        if (apoio.sequencia !== sequencia || erro.tipo === NWM_TIPOS_ERRO.CANCELAMENTO) return;
        apoio.carregando = false;
        apoio.erro = erro;
        this.renderizarApoioFiltro(apoio);
    },

    receberPaginaApoio(apoio, resultado, cursorEnviado) {
        var erro = this.validarPaginaApoio(apoio, resultado, cursorEnviado);
        if (erro) {
            apoio.temMais = false;
            this.falharPaginaApoio(apoio, apoio.sequencia, erro);
            return;
        }
        this.acrescentarSugestoesNovas(apoio, resultado.dados);
        apoio.cursor = resultado.proximoCodigo;
        if (apoio.cursor) apoio.cursores[apoio.cursor] = true;
        apoio.temMais = resultado.temMais;
        apoio.carregando = false;
        this.renderizarApoioFiltro(apoio);
    },

    validarPaginaApoio(apoio, resultado, cursorEnviado) {
        if (this.cursorApoioRepetido(apoio, resultado, cursorEnviado)) {
            return this.erroDataset('CURSOR_INVALIDO', 'Não foi possível continuar as sugestões: o cursor não avançou. Digite novamente para pesquisar.', NWM_TIPOS_ERRO.TECNICO);
        }
        if (!this.sugestoesValidas(apoio, resultado) || resultado.dados.length > NWM_LIMITE_SUGESTOES) {
            return this.erroDataset('RESPOSTA_INVALIDA', 'As sugestões estão fora do contrato esperado. Digite novamente para pesquisar.', NWM_TIPOS_ERRO.TECNICO);
        }
        return null;
    },

    cursorApoioRepetido(apoio, resultado, cursorEnviado) {
        var proximo = resultado.proximoCodigo;
        return resultado.temMais && (!proximo || proximo === cursorEnviado || !!apoio.cursores[proximo]);
    },

    sugestoesValidas(apoio, resultado) {
        var self = this;
        var validas = typeof resultado.proximoCodigo === 'string';
        $.each(resultado.dados, function (indice, registro) {
            if (!self.sugestaoValida(registro)) validas = false;
            if (self.apoioDeDocumentos(apoio) && !self.documentoValido(registro)) validas = false;
        });
        return validas;
    },

    sugestaoValida(registro) {
        return !!registro && typeof registro.codigo === 'string' && typeof registro.descricao === 'string';
    },

    acrescentarSugestoesNovas(apoio, registros) {
        var codigosExistentes = Object.create(null);
        $.each(apoio.dados, function (indice, registro) { codigosExistentes[registro.codigo] = true; });
        $.each(registros, function (indice, registro) {
            if (codigosExistentes[registro.codigo]) return;
            apoio.dados.push(registro);
            codigosExistentes[registro.codigo] = true;
        });
    },

    renderizarApoioFiltro(apoio) {
        var self = this;
        apoio.$lista.empty().prop('hidden', false);
        apoio.$input.attr({ 'aria-expanded': 'true', 'aria-busy': String(apoio.carregando) }).removeAttr('aria-activedescendant');
        apoio.ativo = -1;
        $.each(apoio.dados, function (indice, registro) {
            self.montarOpcaoApoio(apoio, registro, indice).appendTo(apoio.$lista);
        });
        if (apoio.carregando || apoio.erro || !apoio.dados.length) this.montarAvisoApoio(apoio).appendTo(apoio.$lista);
        if (apoio.temMais && !apoio.carregando) this.montarOpcaoCarregarMais(apoio).appendTo(apoio.$lista);
        if (apoio.dados.length && apoio.carregando) apoio.$lista.scrollTop(apoio.$lista.prop('scrollHeight'));
    },

    montarOpcaoApoio(apoio, registro, indice) {
        var $opcao = $('<li>', { id: apoio.$lista.attr('id') + '-' + indice, 'class': 'nwm-sugestao', role: 'option', 'aria-selected': 'false', 'data-opcao': indice });
        var textos = this.textosOpcaoApoio(apoio, registro);
        $('<span>', { 'class': 'nwm-sugestao-codigo', text: textos.principal }).appendTo($opcao);
        $('<span>', { text: textos.complemento }).appendTo($opcao);
        return $opcao;
    },

    textosOpcaoApoio(apoio, registro) {
        if (!this.apoioDeDocumentos(apoio)) return { principal: registro.codigo, complemento: registro.descricao };
        return {
            principal: this.textoNotaSerie(registro),
            complemento: 'Emitente ' + registro.emitente + ' · estabelecimento ' + registro.codEstabel + ' · natureza ' + registro.natureza
        };
    },

    montarAvisoApoio(apoio) {
        var mensagem = apoio.carregando ? 'Carregando sugestões…' : apoio.erro ? apoio.erro.message : 'Nenhum resultado encontrado.';
        return $('<li>', { 'class': 'nwm-sugestoes-aviso', role: 'presentation' })
            .append($('<span>', { role: apoio.erro ? 'alert' : 'status', text: mensagem }));
    },

    montarOpcaoCarregarMais(apoio) {
        return $('<li>', {
            id: apoio.$lista.attr('id') + '-mais', 'class': 'nwm-sugestao nwm-sugestao-mais', role: 'option', 'aria-selected': 'false', 'data-proxima': '',
            text: apoio.erro ? 'Tentar carregar mais novamente' : 'Carregar mais resultados'
        });
    },

    selecionarApoioFiltro(apoio, indice) {
        var registro = apoio.dados[indice];
        if (!registro) return;
        if (apoio.campo === 'nfEspecificas') {
            this.adicionarDocumento(registro);
            return;
        }
        this.cancelarApoioFiltro(apoio);
        apoio.$input.val(this.valorSelecionadoApoio(apoio, registro)).trigger('input').data('registro', registro);
        this.cancelarApoioFiltro(apoio);
        this.mostrarSelecionado(apoio, registro);
    },

    teclaApoioFiltro(apoio, evento) {
        if (evento.key === 'Escape' || evento.key === 'Tab') {
            this.fecharSugestoesPorTecla(apoio, evento);
            return;
        }
        if (apoio.$lista.prop('hidden')) {
            this.abrirSugestoesPorTecla(apoio, evento);
            return;
        }
        var $opcoes = apoio.$lista.children('.nwm-sugestao');
        if (!$opcoes.length) return;
        if (evento.key === 'Enter') this.confirmarOpcaoAtiva(apoio, $opcoes, evento);
        else if (evento.key === 'ArrowDown' || evento.key === 'ArrowUp') this.moverOpcaoAtiva(apoio, $opcoes, evento);
    },

    fecharSugestoesPorTecla(apoio, evento) {
        if (evento.key === 'Escape' && !apoio.$lista.prop('hidden')) evento.preventDefault();
        this.cancelarApoioFiltro(apoio);
    },

    abrirSugestoesPorTecla(apoio, evento) {
        if (evento.key !== 'ArrowDown') return;
        evento.preventDefault();
        this.agendarApoioFiltro(apoio);
    },

    confirmarOpcaoAtiva(apoio, $opcoes, evento) {
        evento.preventDefault();
        if (apoio.ativo < 0) return;
        var $ativa = $opcoes.eq(apoio.ativo);
        if ($ativa.is('[data-proxima]')) this.consultarPaginaApoio(apoio, true);
        else this.selecionarApoioFiltro(apoio, Number($ativa.attr('data-opcao')));
    },

    moverOpcaoAtiva(apoio, $opcoes, evento) {
        evento.preventDefault();
        apoio.ativo = this.proximoIndiceAtivo(apoio.ativo, $opcoes.length, evento.key === 'ArrowDown');
        $opcoes.removeClass('is-ativa').attr('aria-selected', 'false');
        var $opcao = $opcoes.eq(apoio.ativo).addClass('is-ativa').attr('aria-selected', 'true');
        apoio.$input.attr('aria-activedescendant', $opcao.attr('id'));
        this.rolarAteOpcao(apoio.$lista, $opcao);
    },

    proximoIndiceAtivo(indiceAtual, quantidade, paraBaixo) {
        if (indiceAtual < 0) return paraBaixo ? 0 : quantidade - 1;
        return (indiceAtual + (paraBaixo ? 1 : -1) + quantidade) % quantidade;
    },

    rolarAteOpcao($lista, $opcao) {
        var topo = $opcao.position().top;
        var excesso = topo + $opcao.outerHeight() - $lista.innerHeight();
        if (topo < 0) $lista.scrollTop($lista.scrollTop() + topo);
        else if (excesso > 0) $lista.scrollTop($lista.scrollTop() + excesso);
    },

    documentoValido(registro) {
        var valido = $.isPlainObject(registro);
        $.each(NWM_CAMPOS_DOCUMENTO, function (indice, campo) {
            if (!registro || typeof registro[campo] !== 'string' || !registro[campo].trim() || NWM_CARACTERE_CONTROLE.test(registro[campo])) valido = false;
        });
        return valido && this.serieDocumentoValida(registro.serie);
    },

    serieDocumentoValida(serie) {
        return typeof serie === 'string' && !NWM_CARACTERE_CONTROLE.test(serie);
    },

    textoNotaSerie(documento) {
        return 'NF ' + documento.numero + (String(documento.serie || '').trim() ? ' · série ' + documento.serie : ' · sem série');
    },

    adicionarDocumento(registro) {
        if (!this.documentoValido(registro)) return;
        var documentos = this.documentosSelecionados || [];
        if (this.documentoJaSelecionado(documentos, registro.codigo)) {
            this.avisar('info', 'Este documento já está selecionado.');
            return;
        }
        if (documentos.length >= NWM_LIMITE_DOCUMENTOS) {
            this.avisar('warning', 'Selecione no máximo 20 documentos.');
            return;
        }
        this.documentosSelecionados = documentos.concat([$.extend({}, registro)]);
        var apoio = this.apoiosFiltros.nfEspecificas;
        apoio.$input.val('').trigger('input');
        this.cancelarApoioFiltro(apoio);
        this.renderizarDocumentosSelecionados();
    },

    documentoJaSelecionado(documentos, codigo) {
        return $.grep(documentos, function (documento) { return documento.codigo === codigo; }).length > 0;
    },

    removerDocumento(codigo) {
        this.documentosSelecionados = $.grep(this.documentosSelecionados || [], function (documento) { return documento.codigo !== codigo; });
        this.cancelarConsultaEtiquetas();
        if (this.tabela) this.limparSelecao();
        this.renderizarDocumentosSelecionados();
    },

    renderizarDocumentosSelecionados() {
        var self = this;
        var $lista = $('[data-documentos-selecionados]', this.DOM).empty();
        var documentos = this.documentosSelecionados || [];
        $.each(documentos, function (indice, documento) {
            self.montarItemDocumento(documento).appendTo($lista);
        });
        $('[data-documentos-contador]', this.DOM).text(documentos.length + ' de 20 documentos selecionados');
    },

    montarItemDocumento(documento) {
        var texto = this.textoNotaSerie(documento) + ' · emitente ' + documento.emitente +
            ' · estabelecimento ' + documento.codEstabel + ' · natureza ' + documento.natureza;
        var $remover = $('<button>', { type: 'button', 'class': 'nwm-modal-fechar', 'data-remover-documento': documento.codigo, 'aria-label': 'Remover ' + texto, title: 'Remover documento' })
            .append($('<i>', { 'class': 'bi bi-x-lg', 'aria-hidden': 'true' }));
        return $('<li>', { 'class': 'nwm-documento' }).append($('<span>', { text: texto })).append($remover);
    },

    erroDataset(codigo, mensagem, tipo) {
        var erro = new Error(mensagem);
        erro.codigoErro = codigo;
        erro.tipo = tipo;
        return erro;
    },

    chamarEmbalagens(acao, parametros) {
        var corpo;
        try {
            corpo = this.montarCorpoDataset(acao, parametros);
        } catch (erro) {
            return $.Deferred().reject(this.erroDataset('ENTRADA_INVALIDA', 'Não foi possível preparar os parâmetros da consulta.', NWM_TIPOS_ERRO.TECNICO)).promise();
        }
        var requisicao = $.ajax({
            url: '/api/public/ecm/dataset/search',
            type: 'POST', contentType: 'application/json', dataType: 'json',
            timeout: NWM_TEMPO_LIMITE_CONSULTA_MS, data: corpo
        });
        var resultado = this.tratarRespostaDataset(requisicao, acao);
        resultado.abort = function () { requisicao.abort(); };
        return resultado;
    },

    montarCorpoDataset(acao, parametros) {
        if (typeof acao !== 'string' || !acao || !$.isPlainObject(parametros)) {
            throw this.erroDataset('ENTRADA_INVALIDA', 'Informe a ação e os parâmetros de negócio.', NWM_TIPOS_ERRO.TECNICO);
        }
        return JSON.stringify({
            datasetId: 'dsNwEmbalagens',
            filterFields: ['acao', acao, 'parametros', JSON.stringify(parametros)],
            resultFields: [], limit: '1', orderBy: ''
        });
    },

    tratarRespostaDataset(requisicao, acao) {
        var self = this;
        return requisicao.then(function (transporte) {
            return self.extrairEnvelopeDataset(transporte, acao);
        }, function (xhr, status) {
            throw self.erroTransporte(xhr, status);
        });
    },

    erroTransporte(xhr, status) {
        if (status === 'abort') return this.erroDataset('CANCELADA', 'Consulta cancelada.', NWM_TIPOS_ERRO.CANCELAMENTO);
        if (status === 'parsererror') return this.erroDataset('RESPOSTA_INVALIDA', 'O Fluig não retornou JSON válido.', NWM_TIPOS_ERRO.TECNICO);
        if (status === 'timeout') return this.erroDataset('TEMPO_ESGOTADO', 'A consulta excedeu o tempo de espera. Tente buscar novamente.', NWM_TIPOS_ERRO.TECNICO);
        return this.erroDataset('FALHA_TRANSPORTE', 'Não foi possível consultar o Fluig (HTTP ' + xhr.status + '). Tente buscar novamente.', NWM_TIPOS_ERRO.TECNICO);
    },

    extrairEnvelopeDataset(transporte, acao) {
        var invalido = this.erroDataset('RESPOSTA_INVALIDA', 'A resposta da consulta está fora do contrato esperado.', NWM_TIPOS_ERRO.TECNICO);
        var linha = this.linhaUnicaDataset(transporte, acao, invalido);
        var resultado = this.lerResultadoJson(linha, invalido);
        if (!resultado.sucesso) {
            if (!resultado.codigoErro) throw invalido;
            return resultado;
        }
        this.validarEnvelopeSucesso(linha, resultado, invalido);
        if (/^criar(Transferencia|Remessa|Devolucao)$/.test(acao)) {
            if (!this.envelopeComandoValido(linha, resultado)) throw invalido;
            return resultado;
        }
        if (typeof resultado.temMais !== 'boolean' || String(resultado.temMais) !== String(linha.temMais)) throw invalido;
        if (acao === 'classificarNatureza') {
            if (!this.envelopeClassificacaoValido(linha, resultado)) throw invalido;
            return resultado;
        }
        if (!this.envelopePaginadoValido(linha, resultado)) throw invalido;
        return resultado;
    },

    linhaUnicaDataset(transporte, acao, invalido) {
        if (!transporte || !Array.isArray(transporte.content) || transporte.content.length !== 1) throw invalido;
        var linha = transporte.content[0];
        if (!linha || linha.acao !== acao || typeof linha.resultadoJson !== 'string') throw invalido;
        return linha;
    },

    lerResultadoJson(linha, invalido) {
        var resultado;
        try { resultado = JSON.parse(linha.resultadoJson); } catch (erro) { throw invalido; }
        if (!$.isPlainObject(resultado) || typeof resultado.sucesso !== 'boolean' ||
            String(resultado.sucesso) !== String(linha.sucesso) ||
            typeof resultado.codigoErro !== 'string' || resultado.codigoErro !== linha.codigoErro ||
            typeof resultado.mensagem !== 'string') throw invalido;
        return resultado;
    },

    validarEnvelopeSucesso(linha, resultado, invalido) {
        if (!/^2[0-9]{2}$/.test(String(linha.httpStatus)) || resultado.codigoErro ||
            !Array.isArray(resultado.dados) || resultado.total !== resultado.dados.length ||
            String(resultado.total) !== String(linha.total)) throw invalido;
    },

    envelopeComandoValido(linha, resultado) {
        return typeof resultado.repeticao === 'boolean' && String(resultado.repeticao) === String(linha.repeticao) &&
            typeof resultado.wt === 'string' && NWM_CODIGO_POSITIVO.test(resultado.wt) &&
            typeof resultado.idOperacao === 'string' && NWM_CODIGO_POSITIVO.test(resultado.idOperacao);
    },

    envelopeClassificacaoValido(linha, resultado) {
        return linha.campoCursor === '' && !resultado.temMais && resultado.total === 1 && resultado.proximoCodigo === '';
    },

    envelopePaginadoValido(linha, resultado) {
        var campoCursor = linha.campoCursor;
        if (campoCursor !== 'proximoId' && campoCursor !== 'proximoCodigo') return false;
        var cursor = resultado[campoCursor];
        if (typeof cursor !== 'string' || linha.proximoCursor !== cursor) return false;
        return !(resultado.temMais && (!cursor || !resultado.dados.length));
    },

    consultarDataset(acao, parametros, canal) {
        var self = this;
        canal = canal || 'tabela';
        if (!this.consultasDataset) this.consultasDataset = Object.create(null);
        this.cancelarConsultaDataset(canal);
        var consulta = { estado: 'carregando', resultado: null, erro: null, conclusao: $.Deferred(), requisicao: null };
        this.consultasDataset[canal] = consulta;
        if (canal === 'tabela') this.definirCarregamentoConsulta(true);
        try {
            consulta.requisicao = this.chamarEmbalagens(acao, parametros);
            consulta.requisicao.then(function (resultado) {
                self.receberConsultaDataset(canal, consulta, resultado);
            }, function (erro) {
                self.falharConsultaDataset(canal, consulta, erro);
            });
        } catch (erro) { this.falharConsultaDataset(canal, consulta, erro); }
        var promessa = consulta.conclusao.promise();
        promessa.abort = function () {
            if (self.consultasDataset[canal] === consulta) self.cancelarConsultaDataset(canal);
        };
        return promessa;
    },

    consultaDatasetAtual(canal, consulta) {
        return this.consultasDataset[canal] === consulta && consulta.estado === 'carregando';
    },

    receberConsultaDataset(canal, consulta, resultado) {
        if (!this.consultaDatasetAtual(canal, consulta)) return;
        consulta.resultado = resultado;
        if (!resultado.sucesso) {
            this.falharConsultaDataset(canal, consulta, this.erroRecusaDataset(resultado));
            return;
        }
        consulta.requisicao = null;
        consulta.estado = resultado.dados.length ? 'sucesso' : 'vazio';
        if (canal === 'tabela') this.definirCarregamentoConsulta(false);
        consulta.conclusao.resolve(resultado);
    },

    erroRecusaDataset(resultado) {
        var erro = this.erroDataset(resultado.codigoErro, resultado.mensagem || 'Não foi possível concluir a consulta.', this.tipoErroRecusa(resultado.codigoErro));
        erro.resultado = resultado;
        return erro;
    },

    tipoErroRecusa(codigoErro) {
        if (/^(HTTP_|FALHA_CHAMADA$|RESPOSTA_INVALIDA$)/.test(codigoErro)) return NWM_TIPOS_ERRO.TECNICO;
        if (codigoErro === 'SEM_PERMISSAO' || codigoErro === 'AUTORIZACAO_NAO_CONFIGURADA') return NWM_TIPOS_ERRO.AUTORIZACAO;
        return NWM_TIPOS_ERRO.FUNCIONAL;
    },

    falharConsultaDataset(canal, consulta, erro) {
        if (!this.consultaDatasetAtual(canal, consulta)) return;
        consulta.requisicao = null;
        consulta.estado = 'erro';
        consulta.erro = erro;
        if (canal === 'tabela') {
            this.definirCarregamentoConsulta(false);
            this.mostrarErroConsulta(erro);
        }
        consulta.conclusao.reject(erro);
    },

    cancelarConsultaDataset(canal) {
        var consulta = this.consultasDataset && this.consultasDataset[canal];
        if (!consulta || consulta.estado !== 'carregando') return;
        consulta.estado = 'cancelada';
        if (consulta.requisicao && consulta.requisicao.abort) consulta.requisicao.abort();
        consulta.requisicao = null;
        if (canal === 'tabela') this.definirCarregamentoConsulta(false);
        consulta.conclusao.reject(this.erroDataset('CANCELADA', 'Consulta cancelada.', NWM_TIPOS_ERRO.CANCELAMENTO));
    },

    invalidarConsultasDataset() {
        var self = this;
        this.cancelarConsultaEtiquetas();
        $.each(this.apoiosFiltros || {}, function (campo, apoio) { self.cancelarApoioFiltro(apoio); });
        $.each(this.consultasDataset || {}, function (canal) { self.cancelarConsultaDataset(canal); });
    },

    definirCarregamentoConsulta(carregando) {
        this.atualizarItensQuantidade();
        $('[data-buscar]', this.DOM).prop('disabled', carregando);
        $('[data-tabela]', this.DOM).attr('aria-busy', String(carregando));
        if (!this.tabela) return;
        if (carregando) this.tabela.alert('<div class="nwm-carregando" role="status" aria-label="Carregando etiquetas"><span class="nwm-loader" aria-hidden="true"></span></div>');
        else this.tabela.clearAlert();
    },

    mostrarErroConsulta(erro) {
        var mensagem = erro && erro.message || 'Não foi possível consultar as etiquetas.';
        if (this.tabela) this.tabela.alert($('<span>', { role: 'alert', text: mensagem + ' Clique em Buscar para tentar novamente.' })[0], 'error');
        else this.avisar('danger', mensagem);
    },

    montarTabela() {
        var self = this;
        this.tabela = new Tabulator($('[data-tabela]', this.DOM)[0], this.opcoesTabela());
        this.tabela.on('renderComplete', function () {
            self.pintarMarcadas();
            self.atualizarContadorTabela();
        });
        this.tabela.on('tableBuilt', function () {
            self.atualizarSelecao();
        });
    },

    opcoesTabela() {
        var self = this;
        return {
            data: [],
            index: 'id',
            layout: 'fitColumns',
            responsiveLayout: false,
            maxHeight: NWM_ALTURA_MAXIMA_TABELA,
            pagination: true,
            paginationSize: NWM_TAMANHO_PAGINA,
            paginationCounter: function (tamanhoPagina, primeiraLinha, pagina, total) {
                return self.textoPaginacao(tamanhoPagina, primeiraLinha, total);
            },
            locale: 'pt-br',
            langs: this.textosPaginacao(),
            initialSort: [
                { column: 'itCodigo', dir: 'asc' },
                { column: 'etiqueta', dir: 'asc' }
            ],
            placeholder: 'Nenhuma etiqueta encontrada.',
            footerElement: '<span class="nwm-tabela-contador" data-contador-tabela></span>',
            columns: this.montarColunasTabela()
        };
    },

    textoPaginacao(tamanhoPagina, primeiraLinha, total) {
        if (!total) return '';
        var ultimaLinha = Math.min(primeiraLinha + tamanhoPagina - 1, total);
        return 'Mostrando ' + primeiraLinha + '–' + ultimaLinha + ' de ' + total + (total === 1 ? ' etiqueta' : ' etiquetas');
    },

    textosPaginacao() {
        return {
            'pt-br': {
                pagination: {
                    first: this.iconePaginacao('bi-chevron-double-left'), first_title: 'Primeira página',
                    prev: this.iconePaginacao('bi-chevron-left'), prev_title: 'Página anterior',
                    next: this.iconePaginacao('bi-chevron-right'), next_title: 'Próxima página',
                    last: this.iconePaginacao('bi-chevron-double-right'), last_title: 'Última página'
                }
            }
        };
    },

    iconePaginacao(classeIcone) {
        return '<i class="bi ' + classeIcone + '" aria-hidden="true"></i>';
    },

    exibirDadosNaTabela(dados) {
        var tabela = this.tabela;
        return tabela.setData(dados).then(function () { return tabela.setPage(1); });
    },

    montarColunasTabela() {
        return [
            this.colunaMarcacao(),
            this.colunaCodigo(),
            this.colunaTexto('Descrição', 'descItem', { widthGrow: NWM_CRESCIMENTO_DESCRICAO, minWidth: NWM_LARGURAS_COLUNAS.descricaoMinima }),
            this.colunaTexto('Fazenda', 'codEstabel', { width: NWM_LARGURAS_COLUNAS.fazenda }),
            this.colunaTexto('Etiqueta', 'etiqueta', { width: NWM_LARGURAS_COLUNAS.etiqueta }),
            this.colunaTexto('Lote', 'lote', { width: NWM_LARGURAS_COLUNAS.lote }),
            this.colunaDataValidade(),
            this.colunaQuantidade('Qtde Emb', 'qtidadeIni', NWM_LARGURAS_COLUNAS.quantidadeEmbalagem, false),
            this.colunaQuantidade('Qtde Saldo', 'qtidadeAtu', NWM_LARGURAS_COLUNAS.quantidadeSaldo, true),
            this.colunaStatus(),
            this.colunaAcoes()
        ];
    },

    colunaMarcacao() {
        var self = this;
        return {
            title: '', headerSort: false, width: NWM_LARGURAS_COLUNAS.marcacao, hozAlign: 'center', vertAlign: 'middle',
            titleFormatter: function () { return self.montarCheckTodos(); },
            formatter: function (cell) { return self.montarCheckLinha(cell.getRow()); }
        };
    },

    colunaCodigo() {
        return {
            title: 'Código', field: 'itCodigo', sorter: 'string', width: NWM_LARGURAS_COLUNAS.codigo, vertAlign: 'middle',
            formatter: function (cell) { return $('<span>', { 'class': 'nwm-codigo', text: cell.getValue() })[0]; }
        };
    },

    colunaTexto(titulo, campo, dimensoes) {
        return $.extend({ title: titulo, field: campo, formatter: 'plaintext', sorter: 'string' }, dimensoes, { vertAlign: 'middle' });
    },

    colunaDataValidade() {
        var self = this;
        return {
            title: 'Data Val.', field: 'dtValiLote', sorter: 'string', width: NWM_LARGURAS_COLUNAS.validade, vertAlign: 'middle',
            formatter: function (cell) { return self.formatarData(cell.getValue()); }
        };
    },

    colunaQuantidade(titulo, campo, largura, esmaecerZerado) {
        var self = this;
        return {
            title: titulo, field: campo, sorter: 'number', width: largura, headerWordWrap: true, hozAlign: 'right', vertAlign: 'middle',
            formatter: function (cell) { return self.celulaNumero(cell.getValue(), esmaecerZerado && !cell.getValue()); }
        };
    },

    colunaStatus() {
        var self = this;
        return {
            title: 'Status', field: 'descricaoSituacao', sorter: 'string', width: NWM_LARGURAS_COLUNAS.status, vertAlign: 'middle',
            titleFormatter: function () { return self.montarTituloStatus(); },
            formatter: function (cell) {
                var etiqueta = cell.getRow().getData();
                return self.montarChipStatus(etiqueta.situacaoApresentada, etiqueta.descricaoSituacao);
            }
        };
    },

    colunaAcoes() {
        var self = this;
        return {
            title: 'Ações', headerSort: false, cssClass: 'nwm-coluna-acoes', width: NWM_LARGURAS_COLUNAS.acoes, hozAlign: 'right', vertAlign: 'middle',
            formatter: function (cell) { return self.montarBotoesAcoes(cell.getRow().getData()); },
            cellClick: function (event, cell) {
                var $botao = $(event.target).closest('[data-acao]');
                if (!$botao.length || $botao.prop('disabled')) return;
                self.acaoNaLinha($botao.attr('data-acao'), cell.getRow());
            }
        };
    },

    celulaNumero(valor, esmaecido) {
        return $('<span>', {
            'class': 'nwm-num-celula' + (esmaecido ? ' nwm-saldo-zero' : ''),
            text: this.formatarQuantidade(valor)
        })[0];
    },

    montarChipStatus(codigo, descricao) {
        return $('<span>', { 'class': 'nwm-chip nwm-chip-' + codigo, title: descricao })
            .append($('<span>', { 'class': 'nwm-chip-ponto', 'aria-hidden': 'true' }))
            .append($('<span>', { text: descricao }))[0];
    },

    montarTituloStatus() {
        var self = this;
        var $ajuda = $('<button>', {
            type: 'button', 'class': 'nwm-ajuda-status',
            title: 'Ver legenda dos status', 'aria-label': 'Ver legenda dos status'
        }).append($('<i>', { 'class': 'bi bi-question-lg', 'aria-hidden': 'true' }));
        $ajuda.on('click', function (evento) {
            evento.stopPropagation();
            self.abrirLegenda();
        });
        return $('<span>', { text: 'Status' }).append($ajuda)[0];
    },

    montarBotoesAcoes(etiqueta) {
        var self = this;
        var $grupo = $('<div>', { 'class': 'nwm-acoes' });
        $.each(NWM_ACOES, function (acao, configuracao) {
            if (configuracao.secundaria || (etiqueta.tipoControle === 'PRE_SALDO' && acao !== 'detalhes')) return;
            self.montarBotaoAcao(acao, configuracao, etiqueta).appendTo($grupo);
        });
        if (etiqueta.tipoControle !== 'PRE_SALDO') this.montarBotaoMaisAcoes(etiqueta).appendTo($grupo);
        return $grupo[0];
    },

    montarBotaoMaisAcoes(etiqueta) {
        return $('<button>', {
            type: 'button', 'class': 'nwm-acao nwm-acao-mais', 'data-acao': 'mais', 'aria-haspopup': 'dialog',
            title: 'Mais ações', 'aria-label': 'Mais ações da etiqueta ' + etiqueta.etiqueta + ' do item ' + etiqueta.itCodigo
        }).append($('<i>', { 'class': 'bi bi-three-dots', 'aria-hidden': 'true' }));
    },

    montarBotaoAcao(acao, configuracao, etiqueta) {
        var disponivel = this.acaoDisponivel(acao, etiqueta);
        return $('<button>', {
            type: 'button', 'class': 'nwm-acao nwm-acao-' + acao, 'data-acao': acao,
            title: configuracao.rotulo + this.motivoAcaoIndisponivel(acao, disponivel),
            'aria-label': configuracao.rotulo + ' etiqueta ' + etiqueta.etiqueta + ' do item ' + etiqueta.itCodigo,
            disabled: !disponivel
        }).append($('<i>', { 'class': 'bi ' + configuracao.icone, 'aria-hidden': 'true' }));
    },

    acaoDisponivel(acao, etiqueta) {
        if (acao === 'detalhes') return true;
        return (acao === 'transferir' || acao === 'devolver') && etiqueta.tipoControle === 'EMBALAGEM';
    },

    motivoAcaoIndisponivel(acao, disponivel) {
        if (disponivel) return '';
        return ' — ' + this.textoMotivoIndisponivel(acao).toLowerCase();
    },

    textoMotivoIndisponivel(acao) {
        return acao === 'imprimir' ? 'Aguardando modelo de impressão' : 'Sem operação disponível';
    },

    atualizarContadorTabela() {
        if (!this.tabela) return;
        $('[data-contador-tabela]', this.DOM).text(this.textoContadorTabela(this.consultaEtiquetas));
    },

    textoContadorTabela(carga) {
        if (carga && carga.estado === 'carregando') return 'Carregando: ' + carga.dados.length + ' etiquetas consultadas…';
        if (carga && carga.estado === 'erro') return 'Consulta não concluída. Clique em Buscar para tentar novamente.';
        if (carga && carga.estado === 'cancelada') return 'Consulta cancelada. Clique em Buscar.';
        if (!carga) return '';
        return carga.descricoesAusentes ? 'Descrição indisponível para ' + carga.descricoesAusentes + ' item(ns).' : '';
    },

    montarCheckTodos() {
        var self = this;
        var $input = $('<input>', { type: 'checkbox', 'aria-label': 'Marcar ou desmarcar todas as embalagens da lista', 'data-check-todos': '', disabled: true })
            .on('click', function (evento) { evento.stopPropagation(); })
            .on('change', function () { self.marcarTodos($(this).prop('checked')); });
        return $('<label>', { 'class': 'nwm-check' }).append($input)[0];
    },

    montarCheckLinha(linha) {
        var self = this;
        var etiqueta = linha.getData();
        var $input = $('<input>', { type: 'checkbox', 'aria-label': 'Marcar etiqueta ' + etiqueta.etiqueta + ' do item ' + etiqueta.itCodigo })
            .prop('checked', !!this.selecionados[etiqueta.id]).prop('disabled', !this.podeSelecionarEtiqueta(etiqueta))
            .on('change', function () { self.marcarLinha(etiqueta.id, $(this).prop('checked')); });
        return $('<label>', { 'class': 'nwm-check' }).append($input)
            .on('click', function (evento) { evento.stopPropagation(); })[0];
    },

    podeSelecionarEtiqueta(etiqueta) {
        return !!(etiqueta.tipoControle === 'EMBALAGEM' && this.consultaEtiquetas && this.consultaEtiquetas.estado === 'sucesso');
    },

    definirMarcacao(id, marcado) {
        if (marcado) this.selecionados[id] = true;
        else delete this.selecionados[id];
    },

    marcarLinha(id, marcado) {
        var linha = this.tabela && this.tabela.getRow(id);
        if (!linha || !this.podeSelecionarEtiqueta(linha.getData())) return;
        this.definirMarcacao(id, marcado);
        this.atualizarSelecao();
    },

    marcarTodos(marcado) {
        var self = this;
        if (!this.tabela) return;
        $.each(this.tabela.getRows('active'), function (indice, linha) {
            var etiqueta = linha.getData();
            if (self.podeSelecionarEtiqueta(etiqueta)) self.definirMarcacao(etiqueta.id, marcado);
        });
        this.redesenharChecks();
        this.atualizarSelecao();
    },

    limparSelecao() {
        this.selecionados = {};
        this.redesenharChecks();
        this.atualizarSelecao();
    },

    redesenharChecks() {
        var self = this;
        if (!this.tabela) return;
        $.each(this.tabela.getRows('active'), function (indice, linha) {
            self.atualizarCheckLinha($(linha.getElement()), linha.getData(), !!self.selecionados[linha.getData().id]);
        });
    },

    pintarMarcadas() {
        var self = this;
        if (!this.tabela) return;
        $.each(this.tabela.getRows(), function (indice, linha) {
            var etiqueta = linha.getData();
            var $linha = $(linha.getElement());
            var marcada = !!self.selecionados[etiqueta.id];
            $linha.toggleClass('nwm-linha-marcada', marcada);
            self.atualizarCheckLinha($linha, etiqueta, marcada);
        });
    },

    atualizarCheckLinha($linha, etiqueta, marcada) {
        $('.nwm-check input', $linha).prop('checked', marcada).prop('disabled', !this.podeSelecionarEtiqueta(etiqueta));
    },

    atualizarSelecao() {
        var linhas = this.linhasSelecionadas();
        this.renderizarItensSelecionados(this.resumirSelecaoPorItem(linhas));
        this.atualizarCheckTodos(linhas.length);
        this.pintarMarcadas();
    },

    resumirSelecaoPorItem(linhas) {
        var resumo = Object.create(null);
        $.each(linhas, function (indice, linha) {
            var etiqueta = linha.getData();
            if (!resumo[etiqueta.itCodigo]) resumo[etiqueta.itCodigo] = { descricao: etiqueta.descItem, quantidade: 0, etiquetas: 0 };
            resumo[etiqueta.itCodigo].quantidade += Number(etiqueta.qtidadeAtu) || 0;
            resumo[etiqueta.itCodigo].etiquetas += 1;
        });
        return resumo;
    },

    renderizarItensSelecionados(resumo) {
        var self = this;
        var codigos = Object.keys(resumo);
        var $corpo = $('[data-itens-selecionados-corpo]', this.DOM).empty();
        $.each(codigos.sort(), function (indice, codigo) {
            self.montarLinhaItemSelecionado(codigo, resumo[codigo]).appendTo($corpo);
        });
        if (codigos.length) return;
        $('<tr>')
            .append($('<td>').attr('colspan', 3).addClass('nwm-tabelinha-vazio').text('Nenhum item selecionado'))
            .appendTo($corpo);
    },

    montarLinhaItemSelecionado(codigo, item) {
        return $('<tr>')
            .append($('<td>').addClass('nwm-codigo').text(codigo))
            .append($('<td>').addClass('nwm-descricao').text(item.descricao))
            .append($('<td>').addClass('nwm-num').text(this.formatarQuantidade(item.quantidade)));
    },

    atualizarCheckTodos(marcadas) {
        if (!this.tabela) return;
        var selecionaveis = this.contarSelecionaveisVisiveis();
        $('[data-check-todos]', this.DOM)
            .prop('disabled', !selecionaveis)
            .prop('checked', selecionaveis > 0 && marcadas >= selecionaveis)
            .prop('indeterminate', marcadas > 0 && marcadas < selecionaveis);
    },

    contarSelecionaveisVisiveis() {
        var self = this;
        var quantidade = 0;
        $.each(this.tabela.getRows('active'), function (indice, linha) {
            if (self.podeSelecionarEtiqueta(linha.getData())) quantidade++;
        });
        return quantidade;
    },

    linhasSelecionadas() {
        var self = this;
        if (!this.tabela) return [];
        return $.grep(this.tabela.getRows('active'), function (linha) {
            return !!self.selecionados[linha.getData().id];
        });
    },

    trocarModoNf(htmlElement, event) {
        this.invalidarConsultasDataset();
        this.limparSelecao();
        var especificas = $(htmlElement).val() === 'especificas';
        $('[data-nf-intervalo]', this.DOM).prop('hidden', especificas);
        $('[data-nf-especificas]', this.DOM).prop('hidden', !especificas);
    },

    buscar(htmlElement, event) {
        this.invalidarConsultasDataset();
        var filtros = this.lerFiltros();
        if (!this.validarFiltros(filtros)) return;
        if (!this.tabela) return;
        this.limparSelecao();
        this.fechar(this.$modalDetalhes);
        return this.carregarEtiquetas(this.montarParametrosEtiquetas(filtros));
    },

    montarParametrosEtiquetas(filtros) {
        var especificas = filtros.modoNf === 'especificas';
        var parametros = { limite: NWM_LIMITE_PAGINA, modoNotas: especificas ? 'ESPECIFICAS' : 'INTERVALO' };
        $.each(NWM_PARAMETROS_ETIQUETAS, function (campo, parametro) {
            if (especificas && (campo === 'nfDe' || campo === 'nfAte')) return;
            if (filtros[campo]) parametros[parametro] = filtros[campo];
        });
        if (especificas) parametros.documento = this.codigosDocumentosSelecionados();
        return parametros;
    },

    codigosDocumentosSelecionados() {
        var codigos = [];
        $.each(this.documentosSelecionados || [], function (indice, documento) { codigos.push(documento.codigo); });
        return codigos;
    },

    carregarEtiquetas(parametros) {
        var carga = {
            estado: 'carregando', parametros: $.extend({}, parametros), dados: [], ids: Object.create(null), cursor: '',
            descricoes: Object.create(null), descricoesAusentes: 0
        };
        this.consultaEtiquetas = carga;
        this.tabela.clearData();
        this.definirCarregamentoConsulta(true);
        this.atualizarContadorTabela();
        this.consultarPaginaEtiquetas(carga);
    },

    cargaEtiquetasAtual(carga) {
        return this.consultaEtiquetas === carga && carga.estado === 'carregando';
    },

    falharCargaEtiquetas(carga, erro) {
        if (!this.cargaEtiquetasAtual(carga)) return;
        carga.estado = 'erro';
        carga.erro = erro;
        this.definirCarregamentoConsulta(false);
        this.mostrarErroConsulta(erro);
        this.atualizarContadorTabela();
    },

    consultarPaginaEtiquetas(carga) {
        var self = this;
        if (!this.cargaEtiquetasAtual(carga)) return;
        var parametros = $.extend({}, carga.parametros);
        if (carga.cursor) parametros.aposId = carga.cursor;
        this.consultarDataset('consultarEtiquetas', parametros, 'etiquetas').then(function (resultado) {
            if (!self.cargaEtiquetasAtual(carga)) return;
            try {
                self.receberPaginaEtiquetas(carga, resultado, parametros.limite);
            } catch (erro) { self.falharCargaEtiquetas(carga, erro); }
        }, function (erro) {
            self.falharCargaEtiquetas(carga, erro);
        });
    },

    receberPaginaEtiquetas(carga, resultado, limite) {
        if (typeof resultado.proximoId !== 'string' || resultado.dados.length > limite) {
            throw this.erroDataset('RESPOSTA_INVALIDA', 'A página de etiquetas está fora do contrato esperado.', NWM_TIPOS_ERRO.TECNICO);
        }
        var maiorId = this.acrescentarPaginaEtiquetas(carga, resultado.dados);
        if (resultado.temMais) {
            this.avancarCursorEtiquetas(carga, resultado.proximoId, maiorId);
            this.atualizarContadorTabela();
            this.consultarPaginaEtiquetas(carga);
            return;
        }
        this.atualizarContadorTabela();
        this.descreverItensCarga(carga);
    },

    acrescentarPaginaEtiquetas(carga, registros) {
        var self = this;
        var maiorId = carga.cursor;
        $.each(registros, function (indice, registro) {
            var etiqueta = self.mapearEtiqueta(registro);
            self.validarOrdemEtiqueta(carga, etiqueta.id);
            carga.ids[etiqueta.id] = true;
            carga.dados.push(etiqueta);
            if (!maiorId || self.compararIds(etiqueta.id, maiorId) > 0) maiorId = etiqueta.id;
        });
        return maiorId;
    },

    validarOrdemEtiqueta(carga, id) {
        if (carga.ids[id]) throw this.erroDataset('RESPOSTA_INVALIDA', 'A consulta devolveu uma etiqueta repetida entre páginas. Busque novamente.', NWM_TIPOS_ERRO.TECNICO);
        if (carga.cursor && this.compararIds(id, carga.cursor) <= 0) throw this.erroDataset('CURSOR_INVALIDO', 'A página contém uma etiqueta anterior ao cursor. Busque novamente.', NWM_TIPOS_ERRO.TECNICO);
    },

    avancarCursorEtiquetas(carga, proximoId, maiorId) {
        var cursorValido = NWM_SOMENTE_DIGITOS.test(proximoId) && this.compararIds(proximoId, carga.cursor || '0') > 0 && this.compararIds(proximoId, maiorId) === 0;
        if (!cursorValido) throw this.erroDataset('CURSOR_INVALIDO', 'O cursor de etiquetas não avançou corretamente. Busque novamente.', NWM_TIPOS_ERRO.TECNICO);
        carga.cursor = proximoId;
    },

    descreverItensCarga(carga) {
        if (!this.cargaEtiquetasAtual(carga)) return;
        this.reaproveitarDescricoesFiltro(carga);
        var descricao = { carga: carga, codigos: this.codigosItensCarga(carga), indice: 0 };
        this.descreverProximoItem(descricao);
    },

    reaproveitarDescricoesFiltro(carga) {
        var self = this;
        $.each(['itemDe', 'itemAte'], function (indice, campo) {
            var registro = $('[data-filtro="' + campo + '"]', self.DOM).data('registro');
            if (registro && registro.codigo && typeof registro.descricao === 'string') carga.descricoes[registro.codigo] = registro.descricao;
        });
    },

    codigosItensCarga(carga) {
        var codigos = [];
        var vistos = Object.create(null);
        $.each(carga.dados, function (indice, etiqueta) {
            if (vistos[etiqueta.itCodigo]) return;
            vistos[etiqueta.itCodigo] = true;
            codigos.push(etiqueta.itCodigo);
        });
        return codigos;
    },

    descreverProximoItem(descricao) {
        var carga = descricao.carga;
        if (!this.cargaEtiquetasAtual(carga)) return;
        if (descricao.indice === descricao.codigos.length) {
            this.aplicarDescricoesCarga(carga);
            this.concluirCargaEtiquetas(carga);
            return;
        }
        var codigo = descricao.codigos[descricao.indice++];
        if (Object.prototype.hasOwnProperty.call(carga.descricoes, codigo)) {
            this.descreverProximoItem(descricao);
            return;
        }
        if (codigo.length < 2) {
            this.registrarDescricaoAusente(descricao);
            return;
        }
        descricao.codigo = codigo;
        descricao.cursores = Object.create(null);
        this.consultarDescricaoItem(descricao, '');
    },

    registrarDescricaoAusente(descricao) {
        descricao.carga.descricoesAusentes++;
        this.descreverProximoItem(descricao);
    },

    consultarDescricaoItem(descricao, cursor) {
        var self = this;
        var carga = descricao.carga;
        if (!this.cargaEtiquetasAtual(carga)) return;
        this.consultarDataset('apoiarItens', this.parametrosDescricaoItem(carga, descricao.codigo, cursor), 'descricao:itens').then(function (resultado) {
            if (!self.cargaEtiquetasAtual(carga)) return;
            self.receberDescricaoItem(descricao, cursor, resultado);
        }, function (erro) {
            if (!self.cargaEtiquetasAtual(carga) || erro.tipo === NWM_TIPOS_ERRO.CANCELAMENTO) return;
            self.registrarDescricaoAusente(descricao);
        });
    },

    parametrosDescricaoItem(carga, codigo, cursor) {
        var parametros = { filtro: codigo, limite: NWM_LIMITE_SUGESTOES };
        if (carga.parametros.estabelDe === carga.parametros.estabelAte) parametros.codEstabel = carga.parametros.estabelDe;
        if (cursor) parametros.aposCodigo = cursor;
        return parametros;
    },

    receberDescricaoItem(descricao, cursor, resultado) {
        var encontrado = this.registroDoItem(resultado.dados, descricao.codigo);
        if (encontrado) {
            descricao.carga.descricoes[descricao.codigo] = encontrado.descricao;
            this.descreverProximoItem(descricao);
            return;
        }
        var proximo = resultado.proximoCodigo;
        if (resultado.temMais && typeof proximo === 'string' && proximo && proximo !== cursor && !descricao.cursores[proximo]) {
            descricao.cursores[proximo] = true;
            this.consultarDescricaoItem(descricao, proximo);
            return;
        }
        this.registrarDescricaoAusente(descricao);
    },

    registroDoItem(registros, codigo) {
        var encontrado = null;
        $.each(registros, function (indice, registro) {
            if (registro && registro.codigo === codigo && typeof registro.descricao === 'string') encontrado = registro;
        });
        return encontrado;
    },

    aplicarDescricoesCarga(carga) {
        $.each(carga.dados, function (indice, etiqueta) { etiqueta.descItem = carga.descricoes[etiqueta.itCodigo] || '—'; });
    },

    concluirCargaEtiquetas(carga) {
        var self = this;
        if (!this.cargaEtiquetasAtual(carga)) return;
        carga.prontaParaExibir = true;
        this.exibirDadosNaTabela(carga.dados).then(function () {
            if (self.cargaEtiquetasAtual(carga)) self.exibirCargaConcluida(carga);
            else self.reexibirCargaVigente();
        }, function (erro) {
            self.falharCargaEtiquetas(carga, erro);
        });
    },

    exibirCargaConcluida(carga) {
        carga.estado = carga.dados.length ? 'sucesso' : 'vazio';
        this.definirCarregamentoConsulta(false);
        this.atualizarSelecao();
        this.atualizarContadorTabela();
    },

    reexibirCargaVigente() {
        var self = this;
        var vigente = this.consultaEtiquetas;
        if (!vigente || !vigente.prontaParaExibir || vigente.estado === 'cancelada' || vigente.estado === 'erro') {
            this.tabela.clearData();
            return;
        }
        this.exibirDadosNaTabela(vigente.dados).then(function () {
            self.atualizarSelecao();
            self.atualizarContadorTabela();
        }, function (erro) { self.mostrarErroConsulta(erro); });
    },

    compararIds(primeiro, segundo) {
        primeiro = primeiro.replace(/^0+/, '') || '0';
        segundo = segundo.replace(/^0+/, '') || '0';
        if (primeiro.length !== segundo.length) return primeiro.length < segundo.length ? -1 : 1;
        if (primeiro === segundo) return 0;
        return primeiro < segundo ? -1 : 1;
    },

    mapearEtiqueta(registro) {
        if (!this.registroEtiquetaValido(registro)) {
            throw this.erroDataset('RESPOSTA_INVALIDA', 'Um registro de etiqueta está fora do contrato esperado.', NWM_TIPOS_ERRO.TECNICO);
        }
        return {
            id: registro.idEtiqueta, idEtiqueta: registro.idEtiqueta, versao: registro.versao,
            itCodigo: registro.item, descItem: '—', codEstabel: registro.codEstabel,
            etiqueta: registro.codEtiqueta, codBarras: registro.codEtiqueta, lote: registro.lote || '',
            dtValiLote: registro.validadeLote || '', qtidadeIni: registro.quantidadeInicial,
            qtidadeAtu: registro.quantidadeAtual, capacidade: registro.capacidade, unidade: registro.unidade || '',
            deposito: registro.deposito || '', localizacao: registro.localizacao || '',
            situacao: registro.situacao, tipoLocal: registro.tipoLocal, tipoControle: registro.tipoControle,
            situacaoApresentada: this.situacaoApresentadaDe(registro), descricaoSituacao: this.descricaoSituacaoDe(registro),
            impressaoConfirmada: this.confirmacaoDe(registro.impressaoConfirmada),
            recebimentoFisicoConfirmado: this.confirmacaoDe(registro.recebimentoFisicoConfirmado),
            idBag: registro.idBag, dadosOriginais: $.extend({}, registro)
        };
    },

    situacaoApresentadaDe(registro) {
        return typeof registro.situacaoApresentada === 'string' ? registro.situacaoApresentada : registro.situacao;
    },

    descricaoSituacaoDe(registro) {
        return typeof registro.descricaoSituacao === 'string' ? registro.descricaoSituacao : NWM_STATUS[registro.situacao].rotulo;
    },

    confirmacaoDe(valor) {
        return typeof valor === 'boolean' ? valor : null;
    },

    registroEtiquetaValido(registro) {
        return $.isPlainObject(registro) &&
            this.identificacaoEtiquetaValida(registro) &&
            this.classificacaoEtiquetaValida(registro) &&
            this.numerosEtiquetaValidos(registro) &&
            this.textosOpcionaisEtiquetaValidos(registro) &&
            this.apresentacaoEtiquetaValida(registro) &&
            (!registro.validadeLote || this.dataIsoValida(registro.validadeLote));
    },

    apresentacaoEtiquetaValida(registro) {
        return this.textoOpcionalValido(registro.situacaoApresentada) && this.textoOpcionalValido(registro.descricaoSituacao) &&
            this.booleanoOpcional(registro.impressaoConfirmada) && this.booleanoOpcional(registro.recebimentoFisicoConfirmado);
    },

    textoOpcionalValido(valor) {
        return typeof valor === 'undefined' || (this.textoPreenchido(valor) && !NWM_CARACTERE_CONTROLE.test(valor));
    },

    booleanoOpcional(valor) {
        return typeof valor === 'undefined' || typeof valor === 'boolean';
    },

    identificacaoEtiquetaValida(registro) {
        return typeof registro.idEtiqueta === 'string' && NWM_SOMENTE_DIGITOS.test(registro.idEtiqueta) && this.compararIds(registro.idEtiqueta, '0') > 0 &&
            this.textoPreenchido(registro.codEtiqueta) && this.textoPreenchido(registro.item) && this.textoPreenchido(registro.codEstabel);
    },

    classificacaoEtiquetaValida(registro) {
        return Object.prototype.hasOwnProperty.call(NWM_STATUS, registro.situacao) &&
            Object.prototype.hasOwnProperty.call(NWM_POSICOES, registro.tipoLocal) &&
            (registro.tipoControle === 'EMBALAGEM' || registro.tipoControle === 'PRE_SALDO') &&
            this.inteiroPositivo(registro.versao);
    },

    numerosEtiquetaValidos(registro) {
        var validos = true;
        $.each(NWM_CAMPOS_NUMERICOS_ETIQUETA, function (indice, campo) {
            if (typeof registro[campo] !== 'number' || !isFinite(registro[campo]) || registro[campo] < 0) validos = false;
        });
        return validos;
    },

    textosOpcionaisEtiquetaValidos(registro) {
        var validos = true;
        $.each(NWM_CAMPOS_TEXTO_OPCIONAL_ETIQUETA, function (indice, campo) {
            var valor = registro[campo];
            if (valor !== null && typeof valor !== 'undefined' && typeof valor !== 'string') validos = false;
        });
        return validos;
    },

    textoPreenchido(valor) {
        return typeof valor === 'string' && !!valor;
    },

    inteiroPositivo(valor) {
        return typeof valor === 'number' && isFinite(valor) && valor >= 1 && valor % 1 === 0;
    },

    numeroFinito(valor) {
        return typeof valor === 'number' && isFinite(valor);
    },

    cancelarConsultaEtiquetas() {
        var carga = this.consultaEtiquetas;
        if (!carga || carga.estado === 'cancelada') return;
        carga.estado = 'cancelada';
        this.cancelarConsultaDataset('etiquetas');
        this.cancelarConsultaDataset('descricao:itens');
        this.definirCarregamentoConsulta(false);
        this.atualizarContadorTabela();
    },

    lerFiltros() {
        var filtros = {};
        $('[data-filtro]', this.DOM).each(function () {
            filtros[$(this).data('filtro')] = String($(this).val() || '').trim();
        });
        filtros.modoNf = $('[data-nf-modo]:checked', this.DOM).val() || 'intervalo';
        return filtros;
    },

    validarFiltros(filtros) {
        if (filtros.modoNf === 'especificas' && !this.quantidadeDocumentosValida()) {
            this.avisar('warning', 'Selecione de 1 a 20 documentos nas sugestões de notas específicas.');
            return false;
        }
        this.limparMarcacaoInvalidos();
        var obrigatorios = this.verificarFiltrosObrigatorios(filtros);
        if (obrigatorios.mensagens.length) return this.recusarFiltros(obrigatorios, false);
        var conteudo = this.verificarConteudoFiltros(filtros);
        if (conteudo.mensagens.length) return this.recusarFiltros(conteudo, true);
        return true;
    },

    quantidadeDocumentosValida() {
        var quantidade = (this.documentosSelecionados || []).length;
        return quantidade > 0 && quantidade <= NWM_LIMITE_DOCUMENTOS;
    },

    limparMarcacaoInvalidos() {
        clearTimeout(this.temporizadorFiltros);
        this.temporizadorFiltros = null;
        $('.nwm-filtros .nwm-campo-input', this.DOM).removeClass('is-invalido').removeAttr('aria-invalid');
    },

    recusarFiltros(verificacao, preenchidos) {
        this.marcarInvalidos(verificacao.campos, preenchidos);
        this.avisar('warning', verificacao.mensagens.join(' '));
        return false;
    },

    verificarFiltrosObrigatorios(filtros) {
        var verificacao = { campos: [], mensagens: [] };
        var especificas = filtros.modoNf === 'especificas';
        var temNotaFiscal = especificas ? this.documentosSelecionados.length > 0 : !!(filtros.nfDe || filtros.nfAte);
        var temItem = !!(filtros.itemDe || filtros.itemAte);
        if (!filtros.estDe || !filtros.estAte) {
            verificacao.campos = verificacao.campos.concat(['estDe', 'estAte']);
            verificacao.mensagens.push('Informe o estabelecimento De e Até.');
        }
        if (!temItem && !temNotaFiscal) {
            verificacao.campos = verificacao.campos.concat(['itemDe', 'itemAte'], especificas ? ['nfEspecificas'] : ['nfDe', 'nfAte']);
            verificacao.mensagens.push('Informe os itens ou a nota fiscal.');
        }
        return verificacao;
    },

    verificarConteudoFiltros(filtros) {
        var verificacao = { campos: [], mensagens: [] };
        this.verificarOrdemFaixas(filtros, verificacao);
        this.verificarTextoFiltros(filtros, verificacao);
        this.verificarDatasValidade(filtros, verificacao);
        return verificacao;
    },

    verificarOrdemFaixas(filtros, verificacao) {
        $.each(NWM_PREFIXOS_FAIXAS, function (indice, prefixo) {
            if (prefixo === 'nf' && filtros.modoNf === 'especificas') return;
            var inicio = filtros[prefixo + 'De'] || '';
            var fim = filtros[prefixo + 'Ate'] || '';
            if (!inicio || !fim || inicio.toUpperCase() <= fim.toUpperCase()) return;
            verificacao.campos.push(prefixo + 'De', prefixo + 'Ate');
            verificacao.mensagens.push('Há um intervalo em que De é maior que Até.');
        });
    },

    verificarTextoFiltros(filtros, verificacao) {
        var self = this;
        $.each(filtros, function (campo, valor) {
            if (!self.campoTextoVerificavel(campo, filtros.modoNf)) return;
            if (valor.length <= NWM_LIMITE_TEXTO && !NWM_CARACTERE_CONTROLE.test(valor)) return;
            verificacao.campos.push(campo);
            verificacao.mensagens.push('Um filtro contém texto inválido ou mais de 100 caracteres.');
        });
    },

    campoTextoVerificavel(campo, modoNf) {
        if (campo === 'modoNf' || campo === 'nfEspecificas') return false;
        return !(modoNf === 'especificas' && /^(nfDe|nfAte)$/.test(campo));
    },

    verificarDatasValidade(filtros, verificacao) {
        var self = this;
        $.each(['validadeDe', 'validadeAte'], function (indice, campo) {
            if (!filtros[campo] || self.dataIsoValida(filtros[campo])) return;
            verificacao.campos.push(campo);
            verificacao.mensagens.push('Informe uma data de validade válida.');
        });
    },

    dataIsoValida(valor) {
        if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(valor)) return false;
        var partes = valor.split('-');
        var data = new Date(valor + 'T00:00:00Z');
        return !isNaN(data.getTime()) && data.getUTCFullYear() === Number(partes[0]) &&
            data.getUTCMonth() + 1 === Number(partes[1]) && data.getUTCDate() === Number(partes[2]);
    },

    marcarInvalidos(campos, preenchidos) {
        var self = this;
        var $primeiro = $();
        $.each(campos, function (indice, campo) {
            var $input = $('[data-filtro="' + campo + '"]', self.DOM);
            if (!preenchidos && String($input.val() || '').trim()) return;
            $input.addClass('is-invalido').attr('aria-invalid', 'true');
            if (!$primeiro.length) $primeiro = $input;
        });
        $primeiro.trigger('focus');
        this.temporizadorFiltros = setTimeout(function () {
            $('.nwm-filtros .nwm-campo-input', self.DOM).removeClass('is-invalido').removeAttr('aria-invalid');
            self.temporizadorFiltros = null;
        }, NWM_TEMPO_MARCACAO_INVALIDO_MS);
    },

    acaoNaLinha(acao, linha) {
        if (acao === 'detalhes') {
            this.abrirDetalhes(linha);
            return;
        }
        if (acao === 'mais') {
            this.abrirMaisAcoes(linha);
            return;
        }
        if (!this.podeSelecionarEtiqueta(linha.getData())) {
            this.avisar('warning', 'Clique em Buscar para atualizar as etiquetas antes de iniciar uma operação.');
            return;
        }
        this.aplicarAcao(acao, [linha]);
    },

    aplicarLote(htmlElement, event) {
        var acao = $('[data-acao-lote]', this.DOM).val();
        if (this.acaoAbreOperacao(acao)) this.abrirOperacao(this.linhasSelecionadas());
        else this.avisar('info', 'Escolha Transferência / Remessa ou Devolução.');
    },

    acaoAbreOperacao(acao) {
        return acao === 'transferir' || acao === 'devolver';
    },

    elegivelQuantidade(etiqueta) {
        return this.podeSelecionarEtiqueta(etiqueta) && this.embalagemInteiraDisponivel(etiqueta) && etiqueta.qtidadeAtu === etiqueta.qtidadeIni;
    },

    embalagemInteiraDisponivel(etiqueta) {
        return etiqueta.situacao === 'ATIVA' && etiqueta.tipoLocal === 'ESTAB' && !this.possuiBag(etiqueta) && etiqueta.qtidadeAtu > 0;
    },

    possuiBag(etiqueta) {
        return etiqueta.idBag != null && etiqueta.idBag !== '';
    },

    atualizarItensQuantidade() {
        var $select = $('[data-item-qtde]', this.DOM);
        if (!$select.length) return;
        var anterior = $select.val();
        var itens = this.itensElegiveisQuantidade();
        $select.empty().append($('<option>', { value: '', text: 'Selecione' }));
        $.each(Object.keys(itens).sort(), function (indice, codigo) {
            $select.append($('<option>', { value: codigo, text: codigo + ' — ' + itens[codigo] }));
        });
        $select.val(Object.prototype.hasOwnProperty.call(itens, anterior) ? anterior : '').trigger('change.select2');
        $('[data-item-qtde], [data-qtde], [data-executar-qtde]', this.DOM).prop('disabled', !Object.keys(itens).length)
            .attr('title', 'Acrescenta embalagens inteiras: ativas, no estabelecimento e sem Bag. A quantidade selecionada pode superar a solicitada.');
    },

    itensElegiveisQuantidade() {
        var self = this;
        var itens = Object.create(null);
        if (!this.tabela) return itens;
        $.each(this.tabela.getRows('active'), function (indice, linha) {
            var etiqueta = linha.getData();
            if (self.elegivelQuantidade(etiqueta)) itens[etiqueta.itCodigo] = etiqueta.descItem;
        });
        return itens;
    },

    executarQuantidade(htmlElement, event) {
        var item = $('[data-item-qtde]', this.DOM).val();
        var texto = String($('[data-qtde]', this.DOM).val() || '').trim();
        if (!item || !this.quantidadePedidaValida(texto)) {
            this.avisar('warning', 'Escolha um item e informe uma quantidade positiva, com até quatro casas decimais.');
            return;
        }
        if (!this.consultaEtiquetas || this.consultaEtiquetas.estado !== 'sucesso') return;
        var pedido = Math.round(Number(texto) * NWM_ESCALA_QUANTIDADE);
        var escolha = this.escolherEmbalagensDoItem(item, pedido);
        this.selecionados = escolha.selecionados;
        this.redesenharChecks();
        this.atualizarSelecao();
        this.avisarResultadoQuantidade(escolha, pedido);
    },

    avisarItemQuantidadeVazio(htmlElement, event) {
        if (Object.keys(this.itensElegiveisQuantidade()).length) return;
        this.avisar('warning', 'É necessário ter ao menos um item selecionado.');
    },

    quantidadePedidaValida(texto) {
        return NWM_DECIMAL_ATE_QUATRO_CASAS.test(texto) && isFinite(Number(texto)) && Number(texto) > 0;
    },

    escolherEmbalagensDoItem(item, pedido) {
        var self = this;
        var escolha = { selecionados: $.extend({}, this.selecionados), total: 0, etiquetas: 0 };
        $.each(this.tabela.getRows('active'), function (indice, linha) {
            var etiqueta = linha.getData();
            if (escolha.total >= pedido || escolha.selecionados[etiqueta.id] || etiqueta.itCodigo !== item || !self.elegivelQuantidade(etiqueta)) return;
            escolha.selecionados[etiqueta.id] = true;
            escolha.total += Math.round(etiqueta.qtidadeAtu * NWM_ESCALA_QUANTIDADE);
            escolha.etiquetas++;
        });
        return escolha;
    },

    avisarResultadoQuantidade(escolha, pedido) {
        var faltou = escolha.total < pedido;
        this.avisar(faltou ? 'warning' : 'info', escolha.etiquetas + ' etiqueta(s) selecionada(s), total ' + this.formatarQuantidade(escolha.total / NWM_ESCALA_QUANTIDADE) +
            (faltou ? '. A quantidade disponível é menor que a solicitada.' : '. Embalagens selecionadas inteiras.'));
    },

    prepararModais() {
        this.$modalDetalhes = $('[data-modal-detalhes]', this.DOM);
        this.$modalLegenda = $('[data-modal-legenda]', this.DOM);
        this.$modalOperacao = $('[data-modal-operacao]', this.DOM);
        this.$modalImpressora = $('[data-modal-impressora]', this.DOM);
        this.$modalMaisAcoes = $('[data-modal-mais-acoes]', this.DOM);
        this.ligarAcoesSecundarias();
        this.ligarEventosModalOperacao();
        this.ligarFechamentoPeloFundo();
    },

    ligarEventosModalOperacao() {
        var self = this;
        this.$modalOperacao.on('cancel.nwm', function (evento) {
            if (self.operacaoEmComunicacao(self.operacaoAtual)) evento.preventDefault();
        });
        this.ligarBotaoOperacao('[data-fechar-operacao]', function () { self.fecharOperacao(); });
        this.ligarBotaoOperacao('[data-classificar-natureza]', function () { self.classificarOperacao(); });
        this.ligarBotaoOperacao('[data-carregar-origem]', function () { self.carregarOrigemOperacao(); });
        this.ligarBotaoOperacao('[data-preparar-operacao]', function () { self.prepararEnvioOperacao(); });
        this.ligarBotaoOperacao('[data-enviar-operacao]', function () { self.enviarOperacao(false); });
        this.ligarBotaoOperacao('[data-reenviar-operacao]', function () { self.enviarOperacao(true); });
        this.ligarBotaoOperacao('[data-resultado-operacao]', function () { self.consultarResultadoAtual(); });
        this.$modalOperacao.on('input.nwm', '[data-operacao-campo]', function () {
            self.reagirAlteracaoCampoOperacao($(this).attr('data-operacao-campo'));
        });
    },

    ligarBotaoOperacao(seletor, acao) {
        $(seletor, this.DOM).on('click.nwm', acao);
    },

    reagirAlteracaoCampoOperacao(campo) {
        var operacao = this.operacaoAtual;
        if (!operacao || this.operacaoTravada(operacao)) return;
        this.cancelarConsultaDataset('operacao:natureza');
        this.cancelarConsultaDataset('operacao:origem');
        operacao.estado = NWM_ESTADOS_OPERACAO.EDICAO;
        operacao.comando = null;
        if (campo === 'natureza') operacao.classificacao = null;
        if (/^(natureza|emitenteOrigem|serieOrigem|numeroOrigem|naturezaOrigem)$/.test(campo)) this.descartarOrigemOperacao(operacao);
        this.mostrarEstadoOperacao('Revise os dados antes de confirmar.');
    },

    descartarOrigemOperacao(operacao) {
        operacao.origem = null;
        operacao.selecaoOrigem = Object.create(null);
        $('[data-origem-corpo]', this.DOM).empty();
    },

    ligarFechamentoPeloFundo() {
        var self = this;
        $.each([this.$modalDetalhes, this.$modalLegenda, this.$modalImpressora, this.$modalMaisAcoes], function (indice, $modal) {
            $modal.on('click', function (event) {
                if ($(event.target).is($modal)) self.fechar($modal);
            });
        });
    },

    abrir($modal) {
        if (!$modal || !$modal.length || $modal.prop('open')) return;
        $modal.trigger('showModal');
    },

    fechar($modal) {
        if ($modal && $modal.length && $modal.prop('open')) $modal.trigger('close');
    },

    abrirDetalhes(linha) {
        var etiqueta = linha.getData();
        $('[data-detalhes-subtitulo]', this.DOM).text('Etiqueta ' + etiqueta.etiqueta + ' · item ' + etiqueta.itCodigo + ' — ' + etiqueta.descItem);
        var $grade = $('[data-detalhes-grid]', this.DOM).empty();
        $.each(this.camposDetalhes(etiqueta), function (indice, campo) {
            $('<div>').addClass(campo.largo ? 'nwm-detalhes-item-largo' : '')
                .append($('<dt>').text(campo.rotulo))
                .append($('<dd>').text(campo.valor))
                .appendTo($grade);
        });
        this.abrir(this.$modalDetalhes);
    },

    camposDetalhes(etiqueta) {
        return this.camposSituacaoDetalhes(etiqueta).concat(this.camposEmbalagemDetalhes(etiqueta));
    },

    camposSituacaoDetalhes(etiqueta) {
        var status = NWM_STATUS[etiqueta.situacao];
        return [
            { rotulo: 'Status', valor: etiqueta.descricaoSituacao },
            { rotulo: 'Situação técnica', valor: status ? status.rotulo : etiqueta.situacao },
            { rotulo: 'Impressão confirmada', valor: this.textoConfirmacao(etiqueta.impressaoConfirmada) },
            { rotulo: 'Recebimento físico confirmado', valor: this.textoConfirmacao(etiqueta.recebimentoFisicoConfirmado) }
        ];
    },

    camposEmbalagemDetalhes(etiqueta) {
        return [
            { rotulo: 'Etiqueta', valor: etiqueta.etiqueta },
            { rotulo: 'Item', valor: etiqueta.itCodigo + ' — ' + etiqueta.descItem, largo: true },
            { rotulo: 'Fazenda', valor: etiqueta.codEstabel },
            { rotulo: 'Posição', valor: NWM_POSICOES[etiqueta.tipoLocal] || etiqueta.tipoLocal },
            { rotulo: 'Bag', valor: etiqueta.idBag == null ? '—' : etiqueta.idBag },
            { rotulo: 'Tipo de controle', valor: etiqueta.tipoControle === 'PRE_SALDO' ? 'Saldo anterior ao controle' : 'Embalagem' },
            { rotulo: 'Depósito', valor: etiqueta.deposito },
            { rotulo: 'Localização', valor: etiqueta.localizacao || '—' },
            { rotulo: 'Lote', valor: etiqueta.lote },
            { rotulo: 'Data de validade', valor: this.formatarData(etiqueta.dtValiLote) },
            { rotulo: 'Quantidade inicial', valor: this.quantidadeComUnidade(etiqueta.qtidadeIni, etiqueta.unidade) },
            { rotulo: 'Capacidade', valor: this.quantidadeComUnidade(etiqueta.capacidade, etiqueta.unidade) },
            { rotulo: 'Qtde em saldo', valor: this.quantidadeComUnidade(etiqueta.qtidadeAtu, etiqueta.unidade) },
            { rotulo: 'Família', valor: '—' },
            { rotulo: 'Código de barras', valor: etiqueta.codBarras },
            { rotulo: 'Nota fiscal', valor: '—' }
        ];
    },

    textoConfirmacao(valor) {
        if (valor === true) return 'Sim';
        if (valor === false) return 'Não';
        return '—';
    },

    quantidadeComUnidade(quantidade, unidade) {
        return this.formatarQuantidade(quantidade) + ' ' + unidade;
    },

    fecharDetalhes(htmlElement, event) {
        this.fechar(this.$modalDetalhes);
    },

    abrirMaisAcoes(linha) {
        var self = this;
        var etiqueta = linha.getData();
        this.linhaMaisAcoes = linha;
        $('[data-mais-acoes-subtitulo]', this.DOM).text('Etiqueta ' + etiqueta.etiqueta + ' · item ' + etiqueta.itCodigo + ' — ' + etiqueta.descItem);
        var $lista = $('[data-mais-acoes-lista]', this.DOM).empty();
        $.each(NWM_ACOES, function (acao, configuracao) {
            if (configuracao.secundaria) self.montarItemMaisAcoes(acao, configuracao, etiqueta).appendTo($lista);
        });
        this.abrir(this.$modalMaisAcoes);
    },

    montarItemMaisAcoes(acao, configuracao, etiqueta) {
        var disponivel = this.acaoDisponivel(acao, etiqueta);
        var $botao = $('<button>', { type: 'button', 'class': 'nwm-mais-acoes-botao nwm-mais-acoes-' + acao, 'data-acao-secundaria': acao, disabled: !disponivel })
            .append($('<i>', { 'class': 'bi ' + configuracao.icone, 'aria-hidden': 'true' }))
            .append($('<span>', { 'class': 'nwm-mais-acoes-rotulo', text: configuracao.rotulo }))
            .append($('<span>', { 'class': 'nwm-mais-acoes-motivo', text: disponivel ? '' : this.textoMotivoIndisponivel(acao) }));
        return $('<li>').append($botao);
    },

    ligarAcoesSecundarias() {
        var self = this;
        this.$modalMaisAcoes.on('click.nwm', '[data-acao-secundaria]', function () {
            self.executarAcaoSecundaria($(this).attr('data-acao-secundaria'));
        });
    },

    executarAcaoSecundaria(acao) {
        var linha = this.linhaMaisAcoes;
        this.fecharMaisAcoes();
        if (linha) this.acaoNaLinha(acao, linha);
    },

    fecharMaisAcoes(htmlElement, event) {
        this.fechar(this.$modalMaisAcoes);
        this.linhaMaisAcoes = null;
    },

    aplicarAcao(acao, linhas) {
        if (this.acaoAbreOperacao(acao)) {
            this.abrirOperacao(linhas);
            return;
        }
        var configuracao = NWM_ACOES[acao];
        this.avisar('info', (configuracao ? configuracao.rotulo : 'Operação') + ': indisponível nesta etapa de consulta.');
    },

    operacaoTravada(operacao) {
        return this.estadoOperacaoEntre(operacao, [NWM_ESTADOS_OPERACAO.ENVIANDO, NWM_ESTADOS_OPERACAO.INCERTA, NWM_ESTADOS_OPERACAO.CONSULTANDO, NWM_ESTADOS_OPERACAO.CONCLUIDA]);
    },

    operacaoEmComunicacao(operacao) {
        return !!operacao && this.estadoOperacaoEntre(operacao, [NWM_ESTADOS_OPERACAO.ENVIANDO, NWM_ESTADOS_OPERACAO.CONSULTANDO]);
    },

    operacaoAguardandoResultado(operacao) {
        return !!operacao && this.estadoOperacaoEntre(operacao, [NWM_ESTADOS_OPERACAO.ENVIANDO, NWM_ESTADOS_OPERACAO.INCERTA, NWM_ESTADOS_OPERACAO.CONSULTANDO]);
    },

    estadoOperacaoEntre(operacao, estados) {
        return estados.indexOf(operacao.estado) >= 0;
    },

    campoOperacao(campo) {
        return String($('[data-operacao-campo="' + campo + '"]', this.DOM).val() || '').trim();
    },

    textoOperacaoValido(valor) {
        return typeof valor === 'string' && valor.length > 0 && valor.length <= NWM_LIMITE_TEXTO && !NWM_CARACTERE_CONTROLE.test(valor);
    },

    abrirOperacao(linhas) {
        if (this.operacaoAguardandoResultado(this.operacaoAtual)) {
            this.abrir(this.$modalOperacao);
            return;
        }
        var selecao = this.embalagensSelecionaveis(linhas);
        var estabelecimento = this.estabelecimentoDaOperacao(selecao.estabelecimentos);
        if (!estabelecimento || selecao.dados.length > NWM_LIMITE_EMBALAGENS_OPERACAO) {
            this.avisar('warning', 'Use um único estabelecimento e no máximo 100 embalagens por operação.');
            return;
        }
        this.operacaoAtual = { estado: NWM_ESTADOS_OPERACAO.EDICAO, codEstabel: estabelecimento, dados: selecao.dados, classificacao: null, origem: null, selecaoOrigem: Object.create(null), comando: null };
        this.prepararFormularioOperacao(estabelecimento, selecao.dados.length);
        this.mostrarEstadoOperacao('A preparação cria o documento de trabalho. A efetivação da nota ocorre no Datasul.');
        this.abrir(this.$modalOperacao);
    },

    embalagensSelecionaveis(linhas) {
        var self = this;
        var selecao = { dados: [], estabelecimentos: Object.create(null) };
        $.each(linhas, function (indice, linha) {
            var etiqueta = linha.getData();
            if (!self.podeSelecionarEtiqueta(etiqueta)) return;
            selecao.dados.push($.extend({}, etiqueta));
            selecao.estabelecimentos[etiqueta.codEstabel] = true;
        });
        return selecao;
    },

    estabelecimentoDaOperacao(estabelecimentos) {
        var codigos = Object.keys(estabelecimentos);
        if (codigos.length === 1) return codigos[0];
        if (codigos.length) return '';
        var filtros = this.lerFiltros();
        return filtros.estDe === filtros.estAte ? filtros.estDe : '';
    },

    prepararFormularioOperacao(estabelecimento, quantidade) {
        $('[data-operacao-campo]', this.DOM).val('').prop('disabled', false);
        $('[data-operacao-estabelecimento]', this.DOM).text(estabelecimento);
        $('[data-operacao-selecao]', this.DOM).text(quantidade + ' embalagem(ns) da grade. Para devolução, selecione as embalagens da origem abaixo.');
        $('[data-origem-corpo]', this.DOM).empty();
        this.esconderRamosOperacao();
        $('[data-operacao-classificacao]', this.DOM).text('Informe a natureza e clique em Validar natureza.');
    },

    esconderRamosOperacao() {
        $('[data-operacao-direta], [data-operacao-origem]', this.DOM).prop('hidden', true);
    },

    fecharOperacao() {
        var operacao = this.operacaoAtual;
        if (this.operacaoEmComunicacao(operacao)) return;
        this.cancelarConsultaDataset('operacao:natureza');
        this.cancelarConsultaDataset('operacao:origem');
        this.fechar(this.$modalOperacao);
        if (!operacao || operacao.estado !== NWM_ESTADOS_OPERACAO.INCERTA) this.operacaoAtual = null;
    },

    mostrarEstadoOperacao(mensagem) {
        var operacao = this.operacaoAtual;
        if (!operacao) return;
        $('[data-operacao-mensagem]', this.DOM).text(mensagem);
        this.atualizarControlesEdicaoOperacao(operacao);
        this.atualizarControlesEnvioOperacao(operacao);
        $('[data-operacao-chave]', this.DOM).text(this.textoChaveOperacao(operacao));
        if (operacao.origem) this.renderizarOrigemOperacao();
    },

    atualizarControlesEdicaoOperacao(operacao) {
        var travada = this.operacaoTravada(operacao);
        var semClassificacao = !operacao.classificacao;
        $('[data-operacao-campo]', this.DOM).prop('disabled', travada);
        $('[data-classificar-natureza]', this.DOM).prop('disabled', travada || operacao.estado === NWM_ESTADOS_OPERACAO.CLASSIFICANDO);
        $('[data-carregar-origem]', this.DOM).prop('disabled', travada || semClassificacao || operacao.estado === NWM_ESTADOS_OPERACAO.CARREGANDO_ORIGEM);
        $('[data-preparar-operacao]', this.DOM).prop('disabled', travada || semClassificacao || this.estadoOperacaoEntre(operacao, [NWM_ESTADOS_OPERACAO.CLASSIFICANDO, NWM_ESTADOS_OPERACAO.CARREGANDO_ORIGEM]));
        $('[data-fechar-operacao]', this.DOM).prop('disabled', this.operacaoEmComunicacao(operacao));
    },

    atualizarControlesEnvioOperacao(operacao) {
        var aguardandoConfirmacao = operacao.estado === NWM_ESTADOS_OPERACAO.CONFIRMACAO;
        var incerta = operacao.estado === NWM_ESTADOS_OPERACAO.INCERTA;
        var podeReenviar = incerta && !!operacao.resultadoConsultado && !operacao.conflitoIdempotente;
        $('[data-enviar-operacao]', this.DOM).prop('hidden', !aguardandoConfirmacao).prop('disabled', !aguardandoConfirmacao);
        $('[data-resultado-operacao]', this.DOM).prop('hidden', !incerta).prop('disabled', !incerta);
        $('[data-reenviar-operacao]', this.DOM).prop('hidden', !podeReenviar).prop('disabled', !podeReenviar);
    },

    textoChaveOperacao(operacao) {
        if (!operacao.comando) return '';
        var aviso = operacao.semPersistencia ? ' · Anote este identificador: a recuperação após recarregar está indisponível neste navegador.' : '';
        return 'Identificador da solicitação: ' + operacao.comando.parametros.chaveIdempotente + aviso;
    },

    classificarOperacao() {
        var self = this;
        var operacao = this.operacaoAtual;
        if (!operacao || this.operacaoTravada(operacao) || operacao.estado === NWM_ESTADOS_OPERACAO.CLASSIFICANDO) return;
        var natureza = this.campoOperacao('natureza');
        if (!this.textoOperacaoValido(natureza)) {
            this.mostrarEstadoOperacao('Informe o código exato da natureza, com até 100 caracteres.');
            return;
        }
        this.iniciarClassificacao(operacao);
        this.consultarDataset('classificarNatureza', { codEstabel: operacao.codEstabel, natureza: natureza }, 'operacao:natureza').then(function (resultado) {
            if (self.operacaoAtual !== operacao || self.campoOperacao('natureza') !== natureza) return;
            self.receberClassificacao(operacao, natureza, resultado.dados[0]);
        }, function (erro) {
            if (self.operacaoAtual !== operacao || erro.tipo === NWM_TIPOS_ERRO.CANCELAMENTO) return;
            operacao.estado = NWM_ESTADOS_OPERACAO.EDICAO;
            self.mostrarEstadoOperacao(erro.message);
        });
    },

    iniciarClassificacao(operacao) {
        this.cancelarConsultaDataset('operacao:origem');
        operacao.classificacao = null;
        operacao.origem = null;
        operacao.comando = null;
        operacao.estado = NWM_ESTADOS_OPERACAO.CLASSIFICANDO;
        this.esconderRamosOperacao();
        $('[data-origem-corpo]', this.DOM).empty();
        this.mostrarEstadoOperacao('Validando natureza…');
    },

    receberClassificacao(operacao, natureza, classificacao) {
        operacao.estado = NWM_ESTADOS_OPERACAO.EDICAO;
        if (!this.classificacaoValida(classificacao, natureza, operacao.codEstabel)) {
            this.mostrarEstadoOperacao('Esta natureza não pertence aos fluxos disponíveis de transferência, remessa ou devolução.');
            return;
        }
        operacao.classificacao = $.extend({}, classificacao);
        $('[data-operacao-classificacao]', this.DOM).text(NWM_ROTULOS_FLUXO[classificacao.fluxo]);
        $('[data-operacao-direta]', this.DOM).prop('hidden', classificacao.exigeOrigem);
        $('[data-operacao-origem]', this.DOM).prop('hidden', !classificacao.exigeOrigem);
        this.mostrarEstadoOperacao(classificacao.exigeOrigem ?
            'Informe o documento de entrada e carregue suas embalagens elegíveis.' :
            'Confira destino, série e valor por item. As embalagens serão movimentadas inteiras.');
    },

    classificacaoValida(classificacao, natureza, codEstabel) {
        if (!classificacao || classificacao.natureza !== natureza || classificacao.codEstabel !== codEstabel) return false;
        if (typeof classificacao.exigeOrigem !== 'boolean' || typeof classificacao.editaQuantidade !== 'boolean' || typeof classificacao.editaPreco !== 'boolean') return false;
        return this.fluxoDiretoValido(classificacao) || this.fluxoDevolucaoValido(classificacao);
    },

    fluxoDiretoValido(classificacao) {
        var fluxoDireto = classificacao.fluxo === 'TRANSFERENCIA' || classificacao.fluxo === 'REMESSA_TERCEIROS';
        return fluxoDireto && classificacao.ramoPadrao === 'DIRETO' && !classificacao.exigeOrigem;
    },

    fluxoDevolucaoValido(classificacao) {
        return Object.prototype.hasOwnProperty.call(NWM_RAMOS_DEVOLUCAO, classificacao.fluxo) &&
            classificacao.ramoPadrao === NWM_RAMOS_DEVOLUCAO[classificacao.fluxo] && classificacao.exigeOrigem;
    },

    parametrosOrigemOperacao() {
        var self = this;
        var operacao = this.operacaoAtual;
        var parametros = { codEstabel: operacao.codEstabel, natureza: operacao.classificacao.natureza };
        $.each(NWM_CAMPOS_ORIGEM, function (indice, campo) {
            parametros[campo] = self.campoOperacao(campo);
            if (!self.textoOperacaoValido(parametros[campo])) throw new Error('Informe emitente, série, número e natureza do documento de entrada.');
        });
        if (!NWM_CODIGO_POSITIVO.test(parametros.emitenteOrigem)) throw new Error('O emitente de origem deve ser um código inteiro positivo.');
        return parametros;
    },

    carregarOrigemOperacao() {
        var operacao = this.operacaoAtual;
        var parametros;
        if (!this.podeCarregarOrigem(operacao)) return;
        try { parametros = this.parametrosOrigemOperacao(); } catch (erro) {
            this.mostrarEstadoOperacao(erro.message);
            return;
        }
        var carga = { parametros: parametros, dados: [], ids: Object.create(null), cursor: '' };
        operacao.origem = carga;
        operacao.selecaoOrigem = Object.create(null);
        operacao.estado = NWM_ESTADOS_OPERACAO.CARREGANDO_ORIGEM;
        operacao.comando = null;
        $('[data-origem-corpo]', this.DOM).empty();
        this.mostrarEstadoOperacao('Carregando embalagens da origem…');
        this.consultarPaginaOrigem(operacao, carga);
    },

    podeCarregarOrigem(operacao) {
        if (!operacao || !operacao.classificacao || !operacao.classificacao.exigeOrigem) return false;
        return !this.operacaoTravada(operacao) && operacao.estado !== NWM_ESTADOS_OPERACAO.CARREGANDO_ORIGEM;
    },

    cargaOrigemAtual(operacao, carga) {
        return this.operacaoAtual === operacao && operacao.origem === carga && operacao.estado === NWM_ESTADOS_OPERACAO.CARREGANDO_ORIGEM;
    },

    falharCargaOrigem(operacao, carga, erro) {
        if (!this.cargaOrigemAtual(operacao, carga) || erro.tipo === NWM_TIPOS_ERRO.CANCELAMENTO) return;
        operacao.origem = null;
        operacao.estado = NWM_ESTADOS_OPERACAO.EDICAO;
        this.mostrarEstadoOperacao(erro.message);
    },

    consultarPaginaOrigem(operacao, carga) {
        var self = this;
        var parametros = $.extend({}, carga.parametros, { limite: NWM_LIMITE_PAGINA });
        if (carga.cursor) parametros.aposIdEtiqueta = carga.cursor;
        this.consultarDataset('consultarEmbalagensOrigem', parametros, 'operacao:origem').then(function (resultado) {
            if (!self.cargaOrigemAtual(operacao, carga)) return;
            try {
                self.receberPaginaOrigem(operacao, carga, resultado);
            } catch (erro) { self.falharCargaOrigem(operacao, carga, erro); }
        }, function (erro) {
            self.falharCargaOrigem(operacao, carga, erro);
        });
    },

    receberPaginaOrigem(operacao, carga, resultado) {
        if (resultado.dados.length > NWM_LIMITE_PAGINA) throw new Error('Página da origem acima do limite.');
        var maiorId = this.acrescentarPaginaOrigem(carga, resultado.dados);
        if (resultado.temMais) {
            this.avancarCursorOrigem(carga, resultado.proximoId, maiorId);
            this.consultarPaginaOrigem(operacao, carga);
            return;
        }
        carga.completa = true;
        operacao.estado = NWM_ESTADOS_OPERACAO.EDICAO;
        this.renderizarOrigemOperacao();
        this.mostrarEstadoOperacao(carga.dados.length + ' embalagem(ns) da origem. Marque somente as que deseja devolver.');
    },

    acrescentarPaginaOrigem(carga, registros) {
        var self = this;
        var maiorId = carga.cursor || '0';
        $.each(registros, function (indice, registro) {
            if (!self.registroOrigemValido(carga, registro)) throw new Error('Um registro da origem está fora do contrato esperado.');
            carga.ids[registro.idEtiqueta] = true;
            carga.dados.push(registro);
            if (self.compararIds(registro.idEtiqueta, maiorId) > 0) maiorId = registro.idEtiqueta;
        });
        return maiorId;
    },

    avancarCursorOrigem(carga, proximoId, maiorId) {
        var cursorValido = typeof proximoId === 'string' && NWM_CODIGO_POSITIVO.test(proximoId) &&
            this.compararIds(proximoId, maiorId) === 0 && this.compararIds(proximoId, carga.cursor || '0') > 0;
        if (!cursorValido) throw new Error('O cursor da origem não avançou corretamente.');
        carga.cursor = proximoId;
    },

    registroOrigemValido(carga, registro) {
        if (!registro || typeof registro.idEtiqueta !== 'string' || !NWM_CODIGO_POSITIVO.test(registro.idEtiqueta)) return false;
        if (carga.ids[registro.idEtiqueta] || this.compararIds(registro.idEtiqueta, carga.cursor || '0') <= 0) return false;
        if (typeof registro.codEtiqueta !== 'string' || typeof registro.item !== 'string' || typeof registro.podeSelecionar !== 'boolean' || typeof registro.motivo !== 'string') return false;
        if (!this.numeroOpcionalValido(registro.quantidadeAtual) || !this.numeroOpcionalValido(registro.disponivelLinha)) return false;
        if (!this.numeroFinito(registro.sequenciaOrigem) || registro.sequenciaOrigem % 1) return false;
        return !registro.podeSelecionar || this.registroOrigemSelecionavelValido(registro);
    },

    numeroOpcionalValido(valor) {
        return valor === null || this.numeroFinito(valor);
    },

    registroOrigemSelecionavelValido(registro) {
        return this.inteiroPositivo(registro.versaoEtiqueta) &&
            registro.quantidadeAtual != null && registro.quantidadeAtual > 0 &&
            registro.disponivelLinha != null && registro.disponivelLinha >= registro.quantidadeAtual &&
            registro.sequenciaOrigem >= 1;
    },

    renderizarOrigemOperacao() {
        var self = this;
        var operacao = this.operacaoAtual;
        var $corpo = $('[data-origem-corpo]', this.DOM).empty();
        if (!operacao || !operacao.origem || !operacao.origem.completa) return;
        $.each(operacao.origem.dados, function (indice, registro) {
            self.montarLinhaOrigem(operacao, registro).appendTo($corpo);
        });
    },

    montarLinhaOrigem(operacao, registro) {
        var $linha = $('<tr>').append($('<td>').append(this.montarCheckOrigem(operacao, registro)));
        $.each(this.valoresLinhaOrigem(registro), function (indice, valor) {
            $linha.append($('<td>', { text: valor }));
        });
        return $linha;
    },

    montarCheckOrigem(operacao, registro) {
        var self = this;
        return $('<input>', { type: 'checkbox', 'aria-label': 'Selecionar etiqueta ' + registro.codEtiqueta })
            .prop('checked', !!operacao.selecaoOrigem[registro.idEtiqueta])
            .prop('disabled', !registro.podeSelecionar || this.operacaoTravada(operacao))
            .on('change.nwm', function () {
                self.alterarSelecaoOrigem(operacao, registro, $(this).prop('checked'));
            });
    },

    alterarSelecaoOrigem(operacao, registro, marcado) {
        if (!registro.podeSelecionar || this.operacaoTravada(operacao)) return;
        if (marcado) operacao.selecaoOrigem[registro.idEtiqueta] = true;
        else delete operacao.selecaoOrigem[registro.idEtiqueta];
        operacao.comando = null;
        operacao.estado = NWM_ESTADOS_OPERACAO.EDICAO;
        this.mostrarEstadoOperacao('Seleção alterada. Revise e confirme a preparação.');
    },

    valoresLinhaOrigem(registro) {
        return [
            registro.codEtiqueta,
            registro.item,
            registro.lote || '—',
            registro.quantidadeAtual == null ? '—' : this.formatarQuantidade(registro.quantidadeAtual),
            registro.disponivelLinha == null ? '—' : this.formatarQuantidade(registro.disponivelLinha),
            registro.podeSelecionar ? 'Disponível' : registro.motivo
        ];
    },

    montarComandoOperacao() {
        var operacao = this.operacaoAtual;
        if (!operacao || !operacao.classificacao) throw new Error('Valide a natureza antes de continuar.');
        var classificacao = operacao.classificacao;
        var parametros = { codEstabel: operacao.codEstabel, natureza: classificacao.natureza, serie: this.campoOperacao('serie'), selecao: [] };
        if (this.campoOperacao('natureza') !== classificacao.natureza || !this.textoOperacaoValido(parametros.serie)) throw new Error('Valide a natureza e informe a série de saída.');
        var acao = classificacao.exigeOrigem ?
            this.montarDevolucao(operacao, parametros) :
            this.montarSaidaDireta(operacao, classificacao, parametros);
        this.validarSelecaoComando(parametros.selecao);
        parametros.chaveIdempotente = this.gerarChaveIdempotente();
        return { acao: acao, parametros: parametros };
    },

    montarDevolucao(operacao, parametros) {
        var self = this;
        if (!this.origemCarregadaConfere(operacao)) throw new Error('Carregue novamente as embalagens do documento de origem.');
        $.extend(parametros, operacao.origem.parametros);
        var saldos = { totais: Object.create(null), limites: Object.create(null) };
        $.each(operacao.origem.dados, function (indice, registro) {
            if (!operacao.selecaoOrigem[registro.idEtiqueta]) return;
            if (!registro.podeSelecionar) throw new Error('Uma embalagem selecionada não está disponível na origem.');
            parametros.selecao.push({ idEtiqueta: registro.idEtiqueta, versao: String(registro.versaoEtiqueta), quantidade: registro.quantidadeAtual });
            self.acumularSaldoOrigem(saldos, registro);
        });
        this.validarSaldosOrigem(saldos);
        return 'criarDevolucao';
    },

    origemCarregadaConfere(operacao) {
        if (!operacao.origem || !operacao.origem.completa) return false;
        return JSON.stringify(this.parametrosOrigemOperacao()) === JSON.stringify(operacao.origem.parametros);
    },

    acumularSaldoOrigem(saldos, registro) {
        var linha = String(registro.sequenciaOrigem);
        var disponivel = Math.round(registro.disponivelLinha * NWM_ESCALA_QUANTIDADE);
        saldos.totais[linha] = (saldos.totais[linha] || 0) + Math.round(registro.quantidadeAtual * NWM_ESCALA_QUANTIDADE);
        saldos.limites[linha] = Object.prototype.hasOwnProperty.call(saldos.limites, linha) ? Math.min(saldos.limites[linha], disponivel) : disponivel;
    },

    validarSaldosOrigem(saldos) {
        $.each(saldos.totais, function (linha, quantidade) {
            if (quantidade > saldos.limites[linha]) throw new Error('A soma selecionada excede o saldo documental de uma linha da origem.');
        });
    },

    montarSaidaDireta(operacao, classificacao, parametros) {
        var self = this;
        this.definirDestinoSaida(classificacao, parametros);
        parametros.valorItem = this.valorItemOperacao();
        $.each(operacao.dados, function (indice, etiqueta) {
            if (!self.embalagemPodeSair(etiqueta, parametros.codEstabel)) throw new Error('Selecione embalagens ativas, no estabelecimento de origem, sem Bag e com saldo.');
            parametros.selecao.push({ idEtiqueta: etiqueta.idEtiqueta, versao: String(etiqueta.versao), quantidade: etiqueta.qtidadeAtu });
        });
        return classificacao.fluxo === 'TRANSFERENCIA' ? 'criarTransferencia' : 'criarRemessa';
    },

    definirDestinoSaida(classificacao, parametros) {
        parametros.codEstabelDestino = this.campoOperacao('codEstabelDestino');
        var emitente = this.campoOperacao('emitenteDestino');
        if (emitente) {
            if (!NWM_CODIGO_POSITIVO.test(emitente) || emitente.length > NWM_LIMITE_TEXTO) throw new Error('O emitente de destino deve ser um código inteiro positivo.');
            parametros.emitenteDestino = emitente;
        }
        if (classificacao.fluxo === 'TRANSFERENCIA' && !parametros.codEstabelDestino) throw new Error('Informe o estabelecimento de destino.');
        if (classificacao.fluxo === 'REMESSA_TERCEIROS' && !parametros.codEstabelDestino && !emitente) throw new Error('Informe o estabelecimento ou o emitente de destino.');
        if (parametros.codEstabelDestino && !this.destinoDiferenteValido(parametros)) throw new Error('Confira o estabelecimento de destino.');
    },

    destinoDiferenteValido(parametros) {
        return this.textoOperacaoValido(parametros.codEstabelDestino) && parametros.codEstabelDestino !== parametros.codEstabel;
    },

    valorItemOperacao() {
        var valor = this.campoOperacao('valorItem');
        if (!NWM_DECIMAL_ATE_QUATRO_CASAS.test(valor) || !isFinite(Number(valor))) throw new Error('Informe o valor por item, não negativo, com até quatro casas decimais.');
        return Number(valor);
    },

    embalagemPodeSair(etiqueta, codEstabel) {
        return etiqueta.codEstabel === codEstabel && etiqueta.tipoControle === 'EMBALAGEM' && etiqueta.situacao === 'ATIVA' &&
            etiqueta.tipoLocal === 'ESTAB' && !this.possuiBag(etiqueta) && !(etiqueta.qtidadeAtu <= 0);
    },

    validarSelecaoComando(selecao) {
        var self = this;
        if (!selecao.length || selecao.length > NWM_LIMITE_EMBALAGENS_OPERACAO) throw new Error('Selecione de 1 a 100 embalagens.');
        $.each(selecao, function (indice, item) {
            if (!self.itemSelecaoValido(item)) throw new Error('Confira os IDs, versões e quantidades selecionados.');
        });
    },

    itemSelecaoValido(item) {
        var escalada = item.quantidade * NWM_ESCALA_QUANTIDADE;
        return NWM_CODIGO_POSITIVO.test(item.idEtiqueta) && NWM_CODIGO_POSITIVO.test(item.versao) &&
            isFinite(item.quantidade) && Math.abs(escalada - Math.round(escalada)) <= 0.00001;
    },

    gerarChaveIdempotente() {
        return 'NWM_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 14) + '_' + this.instanceId;
    },

    prepararEnvioOperacao() {
        var operacao = this.operacaoAtual;
        if (!operacao || this.operacaoTravada(operacao)) return;
        try {
            operacao.comando = this.montarComandoOperacao();
            operacao.estado = NWM_ESTADOS_OPERACAO.CONFIRMACAO;
        } catch (erro) {
            this.mostrarEstadoOperacao(erro.message);
            return;
        }
        var parametros = operacao.comando.parametros;
        this.mostrarEstadoOperacao('Confirme a preparação de ' + parametros.selecao.length + ' embalagem(ns), no estabelecimento ' + parametros.codEstabel +
            ', natureza ' + parametros.natureza + ', série ' + parametros.serie + '. A nota será efetivada no Datasul.');
    },

    enviarOperacao(reenviar) {
        var self = this;
        var operacao = this.operacaoAtual;
        if (!this.podeEnviarOperacao(operacao, reenviar)) return;
        operacao.estado = NWM_ESTADOS_OPERACAO.ENVIANDO;
        operacao.resultadoConsultado = false;
        this.guardarOperacaoPendente(operacao);
        this.mostrarEstadoOperacao('Preparando documento de trabalho… Aguarde o resultado.');
        this.chamarEmbalagens(operacao.comando.acao, operacao.comando.parametros).then(function (resultado) {
            self.receberEnvioOperacao(operacao, resultado);
        }, function (erro) {
            self.marcarOperacaoIncerta(operacao, erro);
        });
    },

    podeEnviarOperacao(operacao, reenviar) {
        if (!operacao || !operacao.comando || operacao.conflitoIdempotente) return false;
        if (reenviar) return operacao.estado === NWM_ESTADOS_OPERACAO.INCERTA && !!operacao.resultadoConsultado;
        return operacao.estado === NWM_ESTADOS_OPERACAO.CONFIRMACAO;
    },

    receberEnvioOperacao(operacao, resultado) {
        if (resultado.sucesso) {
            this.concluirEnvioOperacao(operacao, resultado);
            return;
        }
        if (/^CHAVE_IDEMPOTENTE_/.test(resultado.codigoErro)) {
            operacao.conflitoIdempotente = true;
            this.guardarOperacaoPendente(operacao);
        }
        if (/^(HTTP_|FALHA_|RESPOSTA_INVALIDA|HTTP_STATUS_|CHAVE_IDEMPOTENTE_)/.test(resultado.codigoErro)) {
            this.marcarOperacaoIncerta(operacao, this.erroDataset(resultado.codigoErro, resultado.mensagem, NWM_TIPOS_ERRO.FUNCIONAL));
            return;
        }
        operacao.estado = NWM_ESTADOS_OPERACAO.EDICAO;
        operacao.comando = null;
        this.guardarOperacaoPendente(null);
        this.mostrarEstadoOperacao(resultado.mensagem);
    },

    concluirEnvioOperacao(operacao, resultado) {
        operacao.estado = NWM_ESTADOS_OPERACAO.CONCLUIDA;
        this.guardarOperacaoPendente(null);
        this.mostrarEstadoOperacao('Documento de trabalho ' + resultado.wt + ' · operação ' + resultado.idOperacao +
            (resultado.repeticao ? ' já registrada.' : ' preparada.') + ' A efetivação da nota ocorre no Datasul.');
        this.cancelarConsultaEtiquetas();
        this.limparSelecao();
    },

    marcarOperacaoIncerta(operacao, erro) {
        operacao.estado = NWM_ESTADOS_OPERACAO.INCERTA;
        this.mostrarEstadoOperacao(erro.message + (operacao.conflitoIdempotente ?
            ' O identificador foi preservado. Consulte o resultado e confira o conflito com o responsável antes de continuar.' :
            ' Consulte o resultado antes de reenviar esta mesma solicitação.'));
    },

    consultarResultadoAtual() {
        var self = this;
        var operacao = this.operacaoAtual;
        if (!operacao || operacao.estado !== NWM_ESTADOS_OPERACAO.INCERTA || !operacao.comando) return;
        var consulta = this.parametrosConsultaResultado(operacao.comando);
        operacao.estado = NWM_ESTADOS_OPERACAO.CONSULTANDO;
        operacao.resultadoConsultado = false;
        this.mostrarEstadoOperacao('Consultando o resultado da mesma solicitação…');
        this.consultarDataset('consultarResultadoOperacao', consulta, 'operacao:resultado').then(function (resultado) {
            self.receberResultadoOperacao(operacao, resultado);
        }, function (erro) {
            operacao.estado = NWM_ESTADOS_OPERACAO.INCERTA;
            self.mostrarEstadoOperacao(erro.message + ' O identificador foi preservado. Consulte novamente.');
        });
    },

    parametrosConsultaResultado(comando) {
        var parametros = comando.parametros;
        var consulta = { codEstabel: parametros.codEstabel, chaveIdempotente: parametros.chaveIdempotente, ramo: comando.acao === 'criarDevolucao' ? 'DEVOLUCAO' : 'DIRETO' };
        if (consulta.ramo !== 'DEVOLUCAO') return consulta;
        $.each(NWM_CAMPOS_ORIGEM, function (indice, campo) { consulta[campo] = parametros[campo]; });
        return consulta;
    },

    receberResultadoOperacao(operacao, resultado) {
        if (operacao.conflitoIdempotente) {
            this.informarResultadoComConflito(operacao, resultado);
            return;
        }
        if (resultado.temMais || resultado.dados.length > 1) {
            operacao.estado = NWM_ESTADOS_OPERACAO.INCERTA;
            operacao.resultadoConsultado = false;
            this.mostrarEstadoOperacao('A consulta não confirmou um resultado único. O identificador foi preservado para conferência.');
            return;
        }
        operacao.resultadoConsultado = true;
        if (resultado.dados.length) this.concluirOperacaoLocalizada(operacao);
        else {
            operacao.estado = NWM_ESTADOS_OPERACAO.INCERTA;
            this.mostrarEstadoOperacao('Nenhum resultado persistido localizado até agora. Você pode consultar novamente ou reenviar a mesma solicitação, preservando o identificador.');
        }
    },

    informarResultadoComConflito(operacao, resultado) {
        operacao.estado = NWM_ESTADOS_OPERACAO.INCERTA;
        this.mostrarEstadoOperacao((resultado.dados.length ? 'Há resultado registrado para este identificador.' : 'Nenhum resultado persistido localizado até agora.') +
            ' A solicitação permanece com conflito. Confira o identificador e o conteúdo com o responsável; o reenvio está bloqueado.');
    },

    concluirOperacaoLocalizada(operacao) {
        operacao.estado = NWM_ESTADOS_OPERACAO.CONCLUIDA;
        this.mostrarEstadoOperacao('Operação localizada para esta solicitação. Confira o documento de trabalho no Datasul.');
        this.guardarOperacaoPendente(null);
        this.cancelarConsultaEtiquetas();
        this.limparSelecao();
    },

    chaveOperacaoPendente() {
        return 'nwm-operacao-' + this.instanceId + '-' + window.location.pathname;
    },

    guardarOperacaoPendente(operacao) {
        try {
            var armazenamento = window.sessionStorage;
            if (!armazenamento) {
                if (operacao) operacao.semPersistencia = true;
                return;
            }
            if (!operacao) {
                armazenamento.removeItem(this.chaveOperacaoPendente());
                return;
            }
            armazenamento.setItem(this.chaveOperacaoPendente(), JSON.stringify({ codEstabel: operacao.codEstabel, comando: operacao.comando, conflitoIdempotente: !!operacao.conflitoIdempotente }));
            operacao.semPersistencia = false;
        } catch (erro) {
            if (operacao) operacao.semPersistencia = true;
        }
    },

    restaurarOperacaoPendente() {
        try {
            if (!window.sessionStorage) return;
            var texto = window.sessionStorage.getItem(this.chaveOperacaoPendente());
            if (!texto) return;
            var salvo = JSON.parse(texto);
            if (!this.operacaoSalvaValida(salvo)) return;
            this.reabrirOperacaoSalva(salvo);
        } catch (erro) {
            this.avisar('warning', 'Não foi possível recuperar a solicitação anterior. Confira seu identificador antes de iniciar outra operação.');
        }
    },

    operacaoSalvaValida(salvo) {
        var comando = salvo.comando;
        var parametros = comando && comando.parametros;
        if (!comando || !/^criar(Transferencia|Remessa|Devolucao)$/.test(comando.acao) || !parametros) return false;
        if (parametros.codEstabel !== salvo.codEstabel || typeof parametros.chaveIdempotente !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(parametros.chaveIdempotente)) return false;
        return Array.isArray(parametros.selecao) && parametros.selecao.length >= 1 && parametros.selecao.length <= NWM_LIMITE_EMBALAGENS_OPERACAO;
    },

    reabrirOperacaoSalva(salvo) {
        var parametros = salvo.comando.parametros;
        this.operacaoAtual = {
            estado: NWM_ESTADOS_OPERACAO.INCERTA, codEstabel: salvo.codEstabel, comando: salvo.comando, dados: [], origem: null, classificacao: null,
            resultadoConsultado: false, conflitoIdempotente: salvo.conflitoIdempotente === true
        };
        $('[data-operacao-estabelecimento]', this.DOM).text(salvo.codEstabel);
        $('[data-operacao-selecao]', this.DOM).text(parametros.selecao.length + ' embalagem(ns) na solicitação preservada.');
        $('[data-operacao-classificacao]', this.DOM).text('Natureza ' + parametros.natureza + ' · série ' + parametros.serie);
        this.esconderRamosOperacao();
        this.mostrarEstadoOperacao(this.operacaoAtual.conflitoIdempotente ?
            'Há uma solicitação anterior com conflito de identificação. Consulte o resultado e confira o conflito com o responsável; o reenvio está bloqueado.' :
            'Há uma solicitação anterior sem resultado confirmado. Consulte o resultado antes de reenviar.');
        this.abrir(this.$modalOperacao);
    },

    prepararSelect2() {
        var configuracao = {
            language: 'pt-BR',
            width: '100%',
            placeholder: 'Selecione',
            dropdownParent: $(this.DOM)
        };
        $('[data-acao-lote]', this.DOM).select2(configuracao);
        $('[data-item-qtde]', this.DOM).select2(configuracao);
        $('[data-acao-lote], [data-item-qtde]', this.DOM).closest('.nwm-campo-caixa-select').addClass('is-select2');
    },

    montarLegenda() {
        var self = this;
        var $lista = $('[data-legenda-lista]', this.DOM).empty();
        $.each(NWM_LEGENDA_STATUS, function (indice, status) {
            $('<li>')
                .append($(self.montarChipStatus(status.codigo, status.rotulo)))
                .append($('<span>').addClass('nwm-legenda-texto').text(status.descricao))
                .appendTo($lista);
        });
    },

    situacoesApresentadas() {
        var porCodigo = Object.create(null);
        var lista = [];
        if (!this.tabela) return lista;
        $.each(this.tabela.getRows(), function (indice, linha) {
            var etiqueta = linha.getData();
            if (!porCodigo[etiqueta.situacaoApresentada]) {
                porCodigo[etiqueta.situacaoApresentada] = { codigo: etiqueta.situacaoApresentada, descricao: etiqueta.descricaoSituacao, quantidade: 0 };
                lista.push(porCodigo[etiqueta.situacaoApresentada]);
            }
            porCodigo[etiqueta.situacaoApresentada].quantidade++;
        });
        return lista;
    },

    textoQuantidadeEtiquetas(quantidade) {
        return quantidade === 1 ? '1 etiqueta nesta consulta' : quantidade + ' etiquetas nesta consulta';
    },

    abrirLegenda() {
        this.montarLegenda();
        this.abrir(this.$modalLegenda);
    },

    fecharLegenda(htmlElement, event) {
        this.fechar(this.$modalLegenda);
    },

    abrirImpressora(htmlElement, event) {
        this.abrir(this.$modalImpressora);
        this.carregarImpressoras();
    },

    fecharImpressora(htmlElement, event) {
        this.fechar(this.$modalImpressora);
    },

    carregarImpressoras(htmlElement, event) {
        var self = this;
        this.definirEstadoImpressora(true, 'Procurando o aplicativo de impressão neste computador…');
        this.chamarAplicativoImpressao('GET', '/impressoras').then(function (resposta) {
            self.preencherImpressoras(resposta);
        }, function (xhr) {
            self.limparImpressoras();
            self.definirEstadoImpressora(false, self.mensagemFalhaImpressao(xhr));
        });
    },

    chamarAplicativoImpressao(metodo, caminho, corpo) {
        var opcoes = { url: NWM_APLICATIVO_IMPRESSAO + caminho, method: metodo, timeout: NWM_TEMPO_LIMITE_IMPRESSAO_MS };
        if (corpo) $.extend(opcoes, { contentType: 'application/json', processData: false, data: JSON.stringify(corpo) });
        return $.ajax(opcoes);
    },

    preencherImpressoras(resposta) {
        var impressoras = this.listaImpressoras(resposta);
        var $lista = this.limparImpressoras();
        $.each(impressoras, function (indice, nome) {
            $lista.append($('<option>', { value: nome, text: nome }));
        });
        $lista.val(this.impressoraInicial(impressoras, resposta));
        this.definirEstadoImpressora(false, impressoras.length ? '' : 'O aplicativo de impressão não encontrou nenhuma impressora neste computador.');
    },

    limparImpressoras() {
        return $('[data-impressora-lista]', this.DOM).empty().append($('<option>', { value: '', text: 'Selecione' }));
    },

    listaImpressoras(resposta) {
        var impressoras = [];
        if (!resposta || !resposta.impressoras) return impressoras;
        $.each(resposta.impressoras, function (chave, nome) {
            if (typeof nome === 'string' && nome) impressoras.push(nome);
        });
        return impressoras;
    },

    impressoraInicial(impressoras, resposta) {
        var salva = this.lerImpressoraSalva();
        if (impressoras.indexOf(salva) >= 0) return salva;
        return impressoras.indexOf(resposta.impressorapadrao) >= 0 ? resposta.impressorapadrao : '';
    },

    definirEstadoImpressora(ocupado, mensagem) {
        this.impressoraOcupada = ocupado;
        $('[data-impressora-mensagem]', this.DOM).text(mensagem);
        this.atualizarBotoesImpressora();
    },

    atualizarBotoesImpressora(htmlElement, event) {
        var ocupado = this.impressoraOcupada;
        var $lista = $('[data-impressora-lista]', this.DOM);
        $lista.prop('disabled', ocupado || $lista.children('option').length < 2);
        $('[data-atualizar-impressoras]', this.DOM).prop('disabled', ocupado);
        $('[data-testar-impressora], [data-salvar-impressora]', this.DOM).prop('disabled', ocupado || !$lista.val());
    },

    mensagemFalhaImpressao(xhr) {
        var detalhe = xhr && xhr.responseJSON && xhr.responseJSON.message;
        if (detalhe) return detalhe;
        return 'Não foi possível falar com o aplicativo de impressão (' + NWM_APLICATIVO_IMPRESSAO + '). Verifique se ele está instalado e aberto neste computador e clique em Atualizar.';
    },

    salvarImpressora(htmlElement, event) {
        var impressora = $('[data-impressora-lista]', this.DOM).val();
        if (!impressora) return;
        if (!this.gravarImpressoraSalva(impressora)) {
            this.definirEstadoImpressora(false, 'Este navegador não permitiu guardar a impressora escolhida.');
            return;
        }
        this.fechar(this.$modalImpressora);
        this.avisar('success', 'Impressora ' + impressora + ' salva com sucesso.');
    },

    lerImpressoraSalva() {
        try {
            return window.localStorage.getItem(NWM_CHAVE_IMPRESSORA) || '';
        } catch (erro) {
            return '';
        }
    },

    gravarImpressoraSalva(impressora) {
        try {
            window.localStorage.setItem(NWM_CHAVE_IMPRESSORA, impressora);
            return true;
        } catch (erro) {
            return false;
        }
    },

    testarImpressora(htmlElement, event) {
        var self = this;
        var impressora = $('[data-impressora-lista]', this.DOM).val();
        if (!impressora) return;
        this.definirEstadoImpressora(true, 'Enviando etiqueta de teste para ' + impressora + '…');
        this.obterTemplateEtiqueta().then(function (template) {
            return self.chamarAplicativoImpressao('POST', '/imprimir', { impressora: impressora, template: template, dados: NWM_ETIQUETA_TESTE });
        }).then(function () {
            self.definirEstadoImpressora(false, 'Etiqueta de teste enviada para ' + impressora + '.');
        }, function (falha) {
            self.definirEstadoImpressora(false, self.mensagemFalhaTeste(falha));
        });
    },

    obterTemplateEtiqueta() {
        var self = this;
        if (this.templateEtiqueta !== null) return $.Deferred().resolve(this.templateEtiqueta).promise();
        return $.ajax({ url: NWM_URL_TEMPLATE_ETIQUETA, method: 'GET', timeout: NWM_TEMPO_LIMITE_IMPRESSAO_MS }).then(function (template) {
            self.templateEtiqueta = template;
            return template;
        }, function () {
            return $.Deferred().reject({ templateAusente: true }).promise();
        });
    },

    mensagemFalhaTeste(falha) {
        if (falha && falha.templateAusente) return 'Template de etiqueta não foi encontrado, entre em contato com a TI para resolver.';
        return this.mensagemFalhaImpressao(falha);
    },

    avisar(tipo, mensagem) {
        if (window.FLUIGC && FLUIGC.toast) {
            FLUIGC.toast({ title: '', message: mensagem, type: tipo });
            return;
        }
        console.log('[widget_nw_manutEtiq] ' + tipo + ': ' + mensagem);
    },

    formatarData(valor) {
        var texto = String(valor || '').substring(0, 10);
        var partes = texto.split('-');
        return partes.length === 3 ? partes[2] + '/' + partes[1] + '/' + partes[0] : texto;
    },

    formatarQuantidade(valor) {
        return Number(valor || 0).toLocaleString('pt-BR', { maximumFractionDigits: 4 });
    }
});
