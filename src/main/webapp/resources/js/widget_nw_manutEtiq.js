// Tabulator (tabela) vem do CDN. Carregado uma vez só, mesmo com várias instâncias do widget na página.
var NWM_TABULATOR_JS = 'https://cdnjs.cloudflare.com/ajax/libs/tabulator/6.4.0/js/tabulator.min.js';
var nwmTabulatorPromise = null;

// Select2 (selects da barra de ações) + tradução pt-BR, do CDN. Mesmo esquema: carregado uma vez só.
var NWM_SELECT2_JS = 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js';
var NWM_SELECT2_PT_BR = 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/i18n/pt-BR.js';
var nwmSelect2Promise = null;

// DADOS MOCKADOS, só para visualizar a tela. Trocar pelos datasets/REST quando forem definidos.
// Listas de apoio usadas pelos autocompletes dos filtros.
var NWM_FONTES = {
    estabelecimentos: [
        { codigo: '10901', descricao: 'Fazenda 10901' },
        { codigo: '10902', descricao: 'Fazenda 10902' },
        { codigo: '10904', descricao: 'Fazenda 10904' }
    ],
    itens: [
        { codigo: '357867', descricao: 'REGLONE', unidade: 'LT' },
        { codigo: '361378', descricao: 'OMITE 720 CE BR - ONU 3082', unidade: 'LT' },
        { codigo: '365131', descricao: 'DIMEXION - ONU 3018', unidade: 'LT' }
    ],
    depositos: [
        { codigo: 'ALM01', descricao: 'Almoxarifado central' },
        { codigo: 'BAR02', descricao: 'Barracão de defensivos' },
        { codigo: 'BAG03', descricao: 'Bag de embalagens vazias' }
    ],
    familias: [
        { codigo: 'DEF', descricao: 'Defensivos' },
        { codigo: 'FER', descricao: 'Fertilizantes' }
    ]
};

// Status da etiqueta: rótulo, texto da legenda (o rodapé da tela antiga) e ações liberadas na visão ADM.
// A matriz de ações é a da tela legada; "Em campo" ficou de fora por decisão do usuário.
var NWM_STATUS = {
    'nao-impresso': {
        rotulo: 'Não Impresso',
        legenda: 'Etiqueta gerada e não impressa.',
        acoes: ['detalhes', 'imprimir']
    },
    'impressa': {
        rotulo: 'Impressa',
        legenda: 'Etiqueta gerada e impressa.',
        acoes: ['detalhes', 'receber', 'descartar', 'imprimir']
    },
    'em-estoque': {
        rotulo: 'Em estoque',
        legenda: 'Recebida pela fazenda e disponível no barracão.',
        acoes: ['detalhes', 'estornar', 'descartar', 'transferir']
    },
    'zerada': {
        rotulo: 'Zerada',
        legenda: 'Etiqueta bipada e devolvida com quantidade zero para o barracão.',
        acoes: ['detalhes', 'estornar', 'descartar']
    },
    'armazenada-bag': {
        rotulo: 'Armazenada em Bag',
        legenda: 'Embalagem vazia descartada pelo fluxo correto.',
        acoes: ['detalhes']
    },
    'descartado': {
        rotulo: 'Descartado',
        legenda: 'Embalagem descartada por perda, roubo ou dano.',
        acoes: ['detalhes', 'estornar']
    }
};

// ordem da legenda (a mesma do rodapé da tela antiga)
var NWM_STATUS_ORDEM = ['nao-impresso', 'impressa', 'em-estoque', 'zerada', 'armazenada-bag', 'descartado'];

// Ações da linha e do lote. "statusNovo" só está preenchido onde a legenda da tela antiga deixa a
// transição sem dúvida (imprimir/receber/descartar). Estornar e transferir dependem de regra que
// ainda não foi levantada: no mockup avisam e não alteram nada.
var NWM_ACOES = {
    detalhes: { rotulo: 'Detalhes', icone: 'bi-eye', statusNovo: null },
    imprimir: { rotulo: 'Imprimir', icone: 'bi-printer', statusNovo: 'impressa' },
    receber: { rotulo: 'Receber', icone: 'bi-box-arrow-in-down', statusNovo: 'em-estoque' },
    estornar: { rotulo: 'Estornar', icone: 'bi-arrow-counterclockwise', statusNovo: null },
    descartar: { rotulo: 'Descartar', icone: 'bi-trash3', statusNovo: 'descartado', destrutivo: true },
    transferir: { rotulo: 'Transferir', icone: 'bi-arrow-left-right', statusNovo: null }
};

// Etiquetas mockadas. Nomes dos campos do Progress ao lado: it-codigo, desc-item, cod-estabel,
// char-1 (etiqueta), lote, dt-vali-lote, qtidade-ini, qtidade-atu, sit_etiqueta.
// Depósito, família, código de barras e nota fiscal existem nos filtros da tela antiga;
// o nome do campo no banco ainda não foi confirmado.
var NWM_DADOS_MOCK = [
    { id: 1, itCodigo: '365131', descItem: 'DIMEXION - ONU 3018', codEstabel: '10901', deposito: 'BAR02', etiqueta: '000123', lote: 'L2601', dtValiLote: '2026-12-10', qtidadeIni: 20, qtidadeAtu: 20, unidade: 'LT', familia: 'DEF', codBarras: '7891000000123', notaFiscal: '12345', situacao: 'impressa' },
    { id: 2, itCodigo: '365131', descItem: 'DIMEXION - ONU 3018', codEstabel: '10901', deposito: 'BAR02', etiqueta: '000124', lote: 'L2601', dtValiLote: '2026-12-10', qtidadeIni: 20, qtidadeAtu: 20, unidade: 'LT', familia: 'DEF', codBarras: '7891000000124', notaFiscal: '12345', situacao: 'impressa' },
    { id: 3, itCodigo: '365131', descItem: 'DIMEXION - ONU 3018', codEstabel: '10901', deposito: 'BAR02', etiqueta: '000125', lote: 'L2601', dtValiLote: '2026-12-10', qtidadeIni: 20, qtidadeAtu: 8, unidade: 'LT', familia: 'DEF', codBarras: '7891000000125', notaFiscal: '12345', situacao: 'em-estoque' },
    { id: 4, itCodigo: '365131', descItem: 'DIMEXION - ONU 3018', codEstabel: '10902', deposito: 'ALM01', etiqueta: '000126', lote: 'L2602', dtValiLote: '2027-03-22', qtidadeIni: 20, qtidadeAtu: 20, unidade: 'LT', familia: 'DEF', codBarras: '7891000000126', notaFiscal: '12346', situacao: 'nao-impresso' },
    { id: 5, itCodigo: '361378', descItem: 'OMITE 720 CE BR - ONU 3082', codEstabel: '10901', deposito: 'BAR02', etiqueta: '000210', lote: 'L2588', dtValiLote: '2026-11-05', qtidadeIni: 10, qtidadeAtu: 10, unidade: 'LT', familia: 'DEF', codBarras: '7891000000210', notaFiscal: '12340', situacao: 'em-estoque' },
    { id: 6, itCodigo: '361378', descItem: 'OMITE 720 CE BR - ONU 3082', codEstabel: '10901', deposito: 'BAR02', etiqueta: '000211', lote: 'L2588', dtValiLote: '2026-11-05', qtidadeIni: 10, qtidadeAtu: 10, unidade: 'LT', familia: 'DEF', codBarras: '7891000000211', notaFiscal: '12340', situacao: 'em-estoque' },
    { id: 7, itCodigo: '361378', descItem: 'OMITE 720 CE BR - ONU 3082', codEstabel: '10901', deposito: 'BAR02', etiqueta: '000212', lote: 'L2588', dtValiLote: '2026-11-05', qtidadeIni: 10, qtidadeAtu: 0, unidade: 'LT', familia: 'DEF', codBarras: '7891000000212', notaFiscal: '12340', situacao: 'zerada' },
    { id: 8, itCodigo: '361378', descItem: 'OMITE 720 CE BR - ONU 3082', codEstabel: '10902', deposito: 'BAG03', etiqueta: '000213', lote: 'L2588', dtValiLote: '2026-11-05', qtidadeIni: 10, qtidadeAtu: 0, unidade: 'LT', familia: 'DEF', codBarras: '7891000000213', notaFiscal: '12340', situacao: 'armazenada-bag' },
    { id: 9, itCodigo: '357867', descItem: 'REGLONE', codEstabel: '10902', deposito: 'ALM01', etiqueta: '000301', lote: 'L2611', dtValiLote: '2027-01-30', qtidadeIni: 5, qtidadeAtu: 5, unidade: 'LT', familia: 'DEF', codBarras: '7891000000301', notaFiscal: '12352', situacao: 'nao-impresso' },
    { id: 10, itCodigo: '357867', descItem: 'REGLONE', codEstabel: '10902', deposito: 'ALM01', etiqueta: '000302', lote: 'L2611', dtValiLote: '2027-01-30', qtidadeIni: 5, qtidadeAtu: 5, unidade: 'LT', familia: 'DEF', codBarras: '7891000000302', notaFiscal: '12352', situacao: 'impressa' },
    { id: 11, itCodigo: '357867', descItem: 'REGLONE', codEstabel: '10904', deposito: 'BAR02', etiqueta: '000303', lote: 'L2611', dtValiLote: '2027-01-30', qtidadeIni: 5, qtidadeAtu: 5, unidade: 'LT', familia: 'DEF', codBarras: '7891000000303', notaFiscal: '12352', situacao: 'em-estoque' },
    { id: 12, itCodigo: '357867', descItem: 'REGLONE', codEstabel: '10904', deposito: 'BAR02', etiqueta: '000304', lote: 'L2611', dtValiLote: '2027-01-30', qtidadeIni: 5, qtidadeAtu: 2, unidade: 'LT', familia: 'DEF', codBarras: '7891000000304', notaFiscal: '12352', situacao: 'descartado' },
    { id: 13, itCodigo: '365131', descItem: 'DIMEXION - ONU 3018', codEstabel: '10904', deposito: 'BAR02', etiqueta: '000127', lote: 'L2602', dtValiLote: '2027-03-22', qtidadeIni: 20, qtidadeAtu: 20, unidade: 'LT', familia: 'DEF', codBarras: '7891000000127', notaFiscal: '12346', situacao: 'em-estoque' },
    { id: 14, itCodigo: '365131', descItem: 'DIMEXION - ONU 3018', codEstabel: '10904', deposito: 'BAR02', etiqueta: '000128', lote: 'L2602', dtValiLote: '2027-03-22', qtidadeIni: 20, qtidadeAtu: 20, unidade: 'LT', familia: 'DEF', codBarras: '7891000000128', notaFiscal: '12346', situacao: 'em-estoque' }
];

//mockup: etiquetas que já abrem marcadas, para a tabela "Itens selecionados" aparecer preenchida
var NWM_SELECAO_MOCK = [1, 2, 5, 6, 10];

var widget_nw_manutEtiq = SuperWidget.extend({

    //instância do Tabulator
    tabela: null,

    //ids das etiquetas marcadas (seleção própria, feita pela coluna de caixas de marcação)
    selecionados: null,

    //ação aguardando confirmação no modal: { acao: 'receber', linhas: [...], ignoradas: 0 }
    pendente: null,

    //método iniciado quando a widget é carregada
    init() {
        var self = this;
        this.selecionados = {};
        NWM_SELECAO_MOCK.forEach(function (id) { self.selecionados[id] = true; });

        this.carregarTabulator().then(function () {
            self.montarTabela();
        }, function () {
            $('[data-tabela]', self.DOM).html('<p class="nwm-tabela-erro">Não foi possível carregar a tabela. Verifique a conexão com a internet e recarregue a página.</p>');
        });

        this.prepararAutocompletes();
        this.montarSelectItens();

        //sem o CDN os selects nativos continuam funcionando
        this.carregarSelect2().then(function () {
            self.prepararSelect2();
        }, function () {});

        this.prepararModais();
        this.montarLegenda();
        this.atualizarSelecao();
    },

    //BIND de eventos
    bindings: {
        local: {
            'buscar': ['click_buscar'],
            'gerar': ['click_gerarEtiquetas'],
            'nf-modo': ['change_trocarModoNf'],
            'aplicar-lote': ['click_aplicarLote'],
            'executar-qtde': ['click_executarQuantidade'],
            'fechar-detalhes': ['click_fecharDetalhes'],
            'fechar-confirmar': ['click_fecharConfirmar'],
            'confirmar-acao': ['click_confirmarAcao'],
            'fechar-legenda': ['click_fecharLegenda']
        },
        global: {}
    },

    // ---------- Autocomplete (estabelecimento, item, depósito e família) ----------

    //um só conjunto de handlers, delegado a partir da div do widget: vale para os filtros e para o bloco de quantidade
    prepararAutocompletes() {
        var self = this;
        var $raiz = $(this.DOM);

        $raiz.on('input.nwm', '[data-auto] .nwm-campo-input', function () {
            $(this).removeData('codigo');
            self.abrirSugestoes($(this));
        });

        $raiz.on('focus.nwm', '[data-auto] .nwm-campo-input', function () {
            self.abrirSugestoes($(this));
        });

        $raiz.on('keydown.nwm', '[data-auto] .nwm-campo-input', function (event) {
            self.teclaNoAutocomplete($(this), event);
        });

        //clique na sugestão: mousedown, porque o blur do input fecha a lista antes do click
        $raiz.on('mousedown.nwm', '[data-auto] .nwm-sugestao', function (event) {
            event.preventDefault();
            var $caixa = $(this).closest('[data-auto]');
            self.escolherSugestao($caixa.find('.nwm-campo-input'), $(this).data('indice'));
        });

        $raiz.on('blur.nwm', '[data-auto] .nwm-campo-input', function () {
            var $input = $(this);
            setTimeout(function () { self.fecharSugestoes($input); }, 150);
        });

        //o aviso de filtro obrigatório sai assim que a pessoa volta a digitar no campo
        $raiz.on('input.nwm', '.nwm-filtros .nwm-campo-input', function () {
            $(this).removeClass('is-invalido').removeAttr('aria-invalid');
        });
    },

    //lista filtrada pelo que foi digitado (a partir de 2 caracteres, como nas outras telas)
    sugestoesPara($input) {
        var $caixa = $input.closest('[data-auto]');
        var fonte = NWM_FONTES[$caixa.data('auto')] || [];
        var termo = this.normalizar($input.val());
        if (termo.length < 2) return null;

        var self = this;
        return fonte.filter(function (x) {
            return self.normalizar(x.codigo + ' ' + x.descricao).indexOf(termo) !== -1;
        }).slice(0, 20);
    },

    abrirSugestoes($input) {
        var $lista = $input.closest('[data-auto]').find('.nwm-sugestoes');
        var achados = this.sugestoesPara($input);

        if (achados === null) {
            this.fecharSugestoes($input);
            return;
        }

        $lista.empty();
        if (!achados.length) {
            $lista.append($('<li>').addClass('nwm-sugestao-vazia').text('Nenhuma opção encontrada.'));
        } else {
            achados.forEach(function (x, i) {
                $('<li>')
                    .addClass('nwm-sugestao')
                    .attr({ role: 'option', 'aria-selected': 'false' })
                    .data('indice', i)
                    .append($('<span>').addClass('nwm-sugestao-codigo').text(x.codigo))
                    .append($('<span>').addClass('nwm-sugestao-descricao').text(x.descricao))
                    .appendTo($lista);
            });
        }
        $lista.prop('hidden', false);
        $input.attr('aria-expanded', 'true');
    },

    fecharSugestoes($input) {
        $input.closest('[data-auto]').find('.nwm-sugestoes').prop('hidden', true).empty();
        $input.attr('aria-expanded', 'false');
    },

    //setas navegam, Enter escolhe, Esc fecha
    teclaNoAutocomplete($input, event) {
        var $opcoes = $input.closest('[data-auto]').find('.nwm-sugestao');

        if (event.key === 'Escape') {
            this.fecharSugestoes($input);
            return;
        }
        if (!$opcoes.length) return;

        var atual = $opcoes.index($opcoes.filter('.is-ativa'));

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            var destino = event.key === 'ArrowDown'
                ? (atual + 1) % $opcoes.length
                : (atual <= 0 ? $opcoes.length - 1 : atual - 1);
            $opcoes.removeClass('is-ativa').attr('aria-selected', 'false');
            $opcoes.eq(destino).addClass('is-ativa').attr('aria-selected', 'true');
            $opcoes.eq(destino)[0].scrollIntoView({ block: 'nearest' });
            return;
        }
        if (event.key === 'Enter' && atual !== -1) {
            event.preventDefault();
            this.escolherSugestao($input, $opcoes.eq(atual).data('indice'));
        }
    },

    escolherSugestao($input, indice) {
        var achados = this.sugestoesPara($input);
        if (!achados || !achados[indice]) return;
        var escolhido = achados[indice];

        //nos filtros De/Até vale só o código (é faixa); no "Escolher item" cabe código e descrição
        var soCodigo = $input.closest('.nwm-faixa').length > 0;
        $input.val(soCodigo ? escolhido.codigo : escolhido.codigo + ' — ' + escolhido.descricao);
        $input.data('codigo', escolhido.codigo);
        $input.removeClass('is-invalido').removeAttr('aria-invalid');
        this.fecharSugestoes($input);
    },

    // ---------- Tabela ----------

    carregarTabulator() {
        if (window.Tabulator) return Promise.resolve();
        if (!nwmTabulatorPromise) {
            nwmTabulatorPromise = new Promise(function (resolve, reject) {
                var script = document.createElement('script');
                script.src = NWM_TABULATOR_JS;
                script.onload = resolve;
                script.onerror = function () {
                    nwmTabulatorPromise = null;
                    reject();
                };
                document.head.appendChild(script);
            });
        }
        return nwmTabulatorPromise;
    },

    montarTabela() {
        var self = this;
        this.tabela = new Tabulator($('[data-tabela]', this.DOM)[0], {
            data: NWM_DADOS_MOCK.slice(),
            index: 'id',
            layout: 'fitColumns',
            responsiveLayout: false,
            //tabela inteira, sem paginação (decisão do usuário): altura própria + cabeçalho fixo na rolagem
            maxHeight: 560,
            pagination: false,
            initialSort: [
                { column: 'itCodigo', dir: 'asc' },
                { column: 'etiqueta', dir: 'asc' }
            ],
            placeholder: 'Nenhuma etiqueta encontrada.',
            footerElement: '<span class="nwm-tabela-contador" data-contador-tabela></span>',
            columns: [
                {
                    //seleção própria: o Tabulator não controla a marcação, quem manda é this.selecionados
                    title: '', headerSort: false, width: 44, hozAlign: 'center', vertAlign: 'middle',
                    titleFormatter: function () { return self.montarCheckTodos(); },
                    formatter: function (cell) { return self.montarCheckLinha(cell.getRow()); }
                },
                {
                    title: 'Código', field: 'itCodigo', sorter: 'string', width: 105, vertAlign: 'middle',
                    formatter: function (cell) {
                        var span = document.createElement('span');
                        span.className = 'nwm-codigo';
                        span.textContent = cell.getValue();
                        return span;
                    }
                },
                { title: 'Descrição', field: 'descItem', sorter: 'string', widthGrow: 3, minWidth: 180, vertAlign: 'middle' },
                { title: 'Fazenda', field: 'codEstabel', sorter: 'string', width: 105, vertAlign: 'middle' },
                { title: 'Etiqueta', field: 'etiqueta', sorter: 'string', width: 105, vertAlign: 'middle' },
                { title: 'Lote', field: 'lote', sorter: 'string', width: 95, vertAlign: 'middle' },
                {
                    title: 'Data Val.', field: 'dtValiLote', sorter: 'string', width: 115, vertAlign: 'middle',
                    formatter: function (cell) { return self.formatarData(cell.getValue()); }
                },
                {
                    title: 'Qtde Emb', field: 'qtidadeIni', sorter: 'number', width: 120, hozAlign: 'right', vertAlign: 'middle',
                    formatter: function (cell) { return self.celulaNumero(cell.getValue()); }
                },
                {
                    title: 'Qtde Saldo', field: 'qtidadeAtu', sorter: 'number', width: 125, hozAlign: 'right', vertAlign: 'middle',
                    formatter: function (cell) { return self.celulaNumero(cell.getValue(), !cell.getValue()); }
                },
                {
                    title: 'Status', field: 'situacao', sorter: 'string', width: 175, vertAlign: 'middle',
                    //a legenda do rodapé da tela antiga virou o botão de ajuda ao lado do título
                    titleFormatter: function () { return self.montarTituloStatus(); },
                    formatter: function (cell) { return self.montarChipStatus(cell.getValue()); }
                },
                {
                    title: 'Ações', headerSort: false, width: 178, hozAlign: 'right', vertAlign: 'middle',
                    formatter: function (cell) { return self.montarBotoesAcoes(cell.getRow().getData()); },
                    cellClick: function (event, cell) {
                        var botao = event.target.closest('[data-acao]');
                        if (!botao) return;
                        self.acaoNaLinha(botao.getAttribute('data-acao'), cell.getRow());
                    }
                }
            ]
        });

        //o DOM virtual recria as linhas ao rolar: marcação e contador são refeitos a cada render,
        //que também é o momento em que o filtro já foi aplicado de verdade
        this.tabela.on('renderComplete', function () {
            self.pintarMarcadas();
            self.atualizarContadorTabela();
        });

        //com a tabela pronta, o resumo e o contador já refletem a seleção inicial do mockup
        this.tabela.on('tableBuilt', function () {
            self.atualizarSelecao();
        });
    },

    celulaNumero(valor, esmaecido) {
        var span = document.createElement('span');
        span.className = 'nwm-num-celula' + (esmaecido ? ' nwm-saldo-zero' : '');
        span.textContent = this.formatarQuantidade(valor);
        return span;
    },

    montarChipStatus(situacao) {
        var info = NWM_STATUS[situacao];
        var span = document.createElement('span');
        span.className = 'nwm-chip nwm-chip-' + situacao;
        var ponto = document.createElement('span');
        ponto.className = 'nwm-chip-ponto';
        span.appendChild(ponto);
        span.appendChild(document.createTextNode(info ? info.rotulo : situacao));
        return span;
    },

    montarTituloStatus() {
        var self = this;
        var span = document.createElement('span');
        span.appendChild(document.createTextNode('Status'));

        var ajuda = document.createElement('button');
        ajuda.type = 'button';
        ajuda.className = 'nwm-ajuda-status';
        ajuda.title = 'Ver legenda dos status';
        ajuda.setAttribute('aria-label', 'Ver legenda dos status');
        ajuda.innerHTML = '<i class="bi bi-question-lg" aria-hidden="true"></i>';
        //clicar na ajuda não deve ordenar a coluna
        ajuda.addEventListener('click', function (event) {
            event.stopPropagation();
            self.abrirLegenda();
        });

        span.appendChild(ajuda);
        return span;
    },

    montarBotoesAcoes(dados) {
        var info = NWM_STATUS[dados.situacao];
        var grupo = document.createElement('div');
        grupo.className = 'nwm-acoes';

        (info ? info.acoes : ['detalhes']).forEach(function (acao) {
            var b = NWM_ACOES[acao];
            var botao = document.createElement('button');
            botao.type = 'button';
            botao.className = 'nwm-acao nwm-acao-' + acao;
            botao.setAttribute('data-acao', acao);
            botao.title = b.rotulo;
            botao.setAttribute('aria-label', b.rotulo + ' etiqueta ' + dados.etiqueta + ' do item ' + dados.itCodigo);
            botao.innerHTML = '<i class="bi ' + b.icone + '" aria-hidden="true"></i>';
            grupo.appendChild(botao);
        });
        return grupo;
    },

    atualizarContadorTabela() {
        if (!this.tabela) return;
        var total = this.tabela.getRows('active').length;
        var texto = total === 1 ? '1 etiqueta' : total + ' etiquetas';
        $('[data-contador-tabela]', this.DOM).text(total ? 'Mostrando ' + texto : '');
    },

    // ---------- Seleção (coluna de caixas de marcação) ----------

    montarCheckTodos() {
        var self = this;
        var label = document.createElement('label');
        label.className = 'nwm-check';

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('aria-label', 'Marcar ou desmarcar todas as etiquetas da lista');
        input.setAttribute('data-check-todos', '');
        input.addEventListener('click', function (event) { event.stopPropagation(); });
        input.addEventListener('change', function () { self.marcarTodos(input.checked); });

        label.appendChild(input);
        return label;
    },

    montarCheckLinha(linha) {
        var self = this;
        var dados = linha.getData();
        var label = document.createElement('label');
        label.className = 'nwm-check';

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = !!this.selecionados[dados.id];
        input.setAttribute('aria-label', 'Marcar etiqueta ' + dados.etiqueta + ' do item ' + dados.itCodigo);
        input.addEventListener('change', function () {
            self.marcarLinha(dados.id, input.checked);
        });

        label.addEventListener('click', function (event) { event.stopPropagation(); });
        label.appendChild(input);
        return label;
    },

    marcarLinha(id, marcado) {
        if (marcado) this.selecionados[id] = true;
        else delete this.selecionados[id];
        this.atualizarSelecao();
    },

    //marcar/desmarcar todos vale só para o que está visível depois do filtro
    marcarTodos(marcado) {
        var self = this;
        if (!this.tabela) return;
        this.tabela.getRows('active').forEach(function (linha) {
            var id = linha.getData().id;
            if (marcado) self.selecionados[id] = true;
            else delete self.selecionados[id];
        });
        this.redesenharChecks();
        this.atualizarSelecao();
    },

    limparSelecao() {
        this.selecionados = {};
        this.redesenharChecks();
        this.atualizarSelecao();
    },

    //repinta as caixas de marcação das linhas visíveis sem reconstruir a tabela
    redesenharChecks() {
        var self = this;
        if (!this.tabela) return;
        this.tabela.getRows('active').forEach(function (linha) {
            var el = linha.getElement();
            var check = el ? el.querySelector('.nwm-check input') : null;
            if (check) check.checked = !!self.selecionados[linha.getData().id];
        });
    },

    pintarMarcadas() {
        var self = this;
        if (!this.tabela) return;
        this.tabela.getRows().forEach(function (linha) {
            var el = linha.getElement();
            if (!el) return;
            var marcada = !!self.selecionados[linha.getData().id];
            el.classList.toggle('nwm-linha-marcada', marcada);
            var check = el.querySelector('.nwm-check input');
            if (check) check.checked = marcada;
        });
    },

    //contador, resumo por item e estado da caixa do cabeçalho
    atualizarSelecao() {
        var linhas = this.linhasSelecionadas();
        var $contador = $('[data-contador-selecao]', this.DOM);
        var porItem = {};

        linhas.forEach(function (linha) {
            var d = linha.getData();
            if (!porItem[d.itCodigo]) porItem[d.itCodigo] = { descricao: d.descItem, quantidade: 0, etiquetas: 0 };
            porItem[d.itCodigo].quantidade += Number(d.qtidadeAtu) || 0;
            porItem[d.itCodigo].etiquetas += 1;
        });

        var codigos = Object.keys(porItem);
        if (!linhas.length) {
            $contador.addClass('is-vazio').text('Nenhuma etiqueta selecionada');
        } else {
            $contador.removeClass('is-vazio').text(
                (linhas.length === 1 ? '1 etiqueta selecionada' : linhas.length + ' etiquetas selecionadas') +
                ' · ' + (codigos.length === 1 ? '1 item' : codigos.length + ' itens')
            );
        }

        var $corpo = $('[data-itens-selecionados-corpo]', this.DOM).empty();
        var self = this;
        codigos.sort().forEach(function (codigo) {
            var item = porItem[codigo];
            $('<tr>')
                .append($('<td>').addClass('nwm-codigo').text(codigo))
                .append($('<td>').addClass('nwm-descricao').text(item.descricao))
                .append($('<td>').addClass('nwm-num').text(self.formatarQuantidade(item.quantidade)))
                .appendTo($corpo);
        });
        //a tabela fica sempre na tela (como na aba Administrador da tela antiga); vazia, avisa numa linha
        if (!codigos.length) {
            $('<tr>')
                .append($('<td>').attr('colspan', 3).addClass('nwm-tabelinha-vazio').text('Nenhum item selecionado'))
                .appendTo($corpo);
        }

        this.atualizarCheckTodos(linhas.length);
        this.pintarMarcadas();
    },

    atualizarCheckTodos(marcadas) {
        var check = $('[data-check-todos]', this.DOM)[0];
        if (!check || !this.tabela) return;
        var visiveis = this.tabela.getRows('active').length;
        check.checked = visiveis > 0 && marcadas >= visiveis;
        check.indeterminate = marcadas > 0 && marcadas < visiveis;
    },

    //linhas marcadas que continuam visíveis depois do filtro
    linhasSelecionadas() {
        var self = this;
        if (!this.tabela) return [];
        return this.tabela.getRows('active').filter(function (linha) {
            return !!self.selecionados[linha.getData().id];
        });
    },

    // ---------- Filtros ----------

    //Nota Fiscal: intervalo De/Até ou lista de notas específicas
    trocarModoNf(htmlElement, event) {
        var especificas = $(htmlElement).val() === 'especificas';
        $('[data-nf-intervalo]', this.DOM).prop('hidden', especificas);
        $('[data-nf-especificas]', this.DOM).prop('hidden', !especificas);
    },

    buscar(htmlElement, event) {
        if (!this.tabela) return;
        var self = this;
        var f = this.lerFiltros();
        if (!this.validarFiltros(f)) return;

        //a seleção não sobrevive à troca de filtro: ficaria contando etiqueta que saiu da tela
        this.limparSelecao();

        this.tabela.setFilter(function (linha) {
            return self.naFaixa(linha.codEstabel, f.estDe, f.estAte)
                && self.naFaixa(linha.itCodigo, f.itemDe, f.itemAte)
                && self.naFaixa(linha.deposito, f.depDe, f.depAte)
                && self.naFaixa(linha.codBarras, f.barrasDe, f.barrasAte)
                && self.naFaixa(linha.lote, f.loteDe, f.loteAte)
                && self.naFaixa(linha.dtValiLote, f.validadeDe, f.validadeAte)
                && self.naFaixa(linha.familia, f.familiaDe, f.familiaAte)
                && self.notaFiscalCombina(linha, f);
        });
        this.atualizarSelecao();
    },

    lerFiltros() {
        var filtros = {};
        $('[data-filtro]', this.DOM).each(function () {
            filtros[$(this).data('filtro')] = $.trim($(this).val() || '');
        });
        filtros.modoNf = $('[data-nf-modo]:checked', this.DOM).val() || 'intervalo';
        return filtros;
    },

    //validação herdada da tela antiga: estabelecimento De/Até obrigatório e Itens OU Nota Fiscal
    validarFiltros(f) {
        var temNf = f.modoNf === 'especificas' ? !!f.nfEspecificas : !!(f.nfDe || f.nfAte);
        var temItem = !!(f.itemDe || f.itemAte);

        $('.nwm-filtros .nwm-campo-input', this.DOM).removeClass('is-invalido').removeAttr('aria-invalid');

        if (!f.estDe || !f.estAte) {
            this.marcarInvalidos(['estDe', 'estAte']);
            this.avisar('warning', 'Informe o estabelecimento De e Até.');
            return false;
        }
        if (!temItem && !temNf) {
            this.marcarInvalidos(['itemDe', 'itemAte']);
            this.avisar('warning', 'Informe os itens ou a nota fiscal.');
            return false;
        }
        return true;
    },

    marcarInvalidos(campos) {
        var self = this;
        campos.forEach(function (campo) {
            var $input = $('[data-filtro="' + campo + '"]', self.DOM);
            if (!$input.val()) $input.addClass('is-invalido').attr('aria-invalid', 'true');
        });
        $('[data-filtro="' + campos[0] + '"]', this.DOM).trigger('focus');
    },

    //faixa De/Até: compara como número quando os dois lados são numéricos, senão como texto
    naFaixa(valor, de, ate) {
        if (!de && !ate) return true;
        var v = String(valor == null ? '' : valor);

        if (de && this.menor(v, de)) return false;
        if (ate && this.menor(ate, v)) return false;
        return true;
    },

    menor(a, b) {
        if (a === '') return true;
        if (this.ehNumero(a) && this.ehNumero(b)) return Number(a) < Number(b);
        return a.toUpperCase() < b.toUpperCase();
    },

    ehNumero(valor) {
        return valor !== '' && !isNaN(Number(valor));
    },

    notaFiscalCombina(linha, f) {
        if (f.modoNf === 'especificas') {
            if (!f.nfEspecificas) return true;
            var lista = f.nfEspecificas.split(',').map(function (x) { return $.trim(x); }).filter(function (x) { return x !== ''; });
            return lista.indexOf(String(linha.notaFiscal)) !== -1;
        }
        return this.naFaixa(linha.notaFiscal, f.nfDe, f.nfAte);
    },

    // ---------- Ações ----------

    acaoNaLinha(acao, linha) {
        if (acao === 'detalhes') {
            this.abrirDetalhes(linha);
            return;
        }
        this.pedirConfirmacao(acao, [linha], 0);
    },

    aplicarLote(htmlElement, event) {
        var acao = $('[data-acao-lote]', this.DOM).val();
        if (!acao) {
            this.avisar('warning', 'Selecione a ação em lote.');
            return;
        }

        var linhas = this.linhasSelecionadas();
        if (!linhas.length) {
            this.avisar('warning', 'Marque ao menos uma etiqueta.');
            return;
        }

        //cada status permite um conjunto de ações: o que não permite fica de fora e é informado
        var permitidas = linhas.filter(function (linha) {
            var info = NWM_STATUS[linha.getData().situacao];
            return info && info.acoes.indexOf(acao) !== -1;
        });

        if (!permitidas.length) {
            this.avisar('warning', 'Nenhuma etiqueta marcada aceita a ação ' + NWM_ACOES[acao].rotulo.toLowerCase() + '.');
            return;
        }
        this.pedirConfirmacao(acao, permitidas, linhas.length - permitidas.length);
    },

    //marca automaticamente as etiquetas cheias do item escolhido até somar a quantidade pedida
    executarQuantidade(htmlElement, event) {
        var self = this;
        var $item = $('[data-item-qtde]', this.DOM);
        var codigo = $item.val();
        var quantidade = parseFloat(String($('[data-qtde]', this.DOM).val() || '').replace(',', '.'));

        if (!codigo) {
            this.avisar('warning', 'Escolha um item da lista.');
            //com o Select2 o select original fica escondido: abre a lista em vez de dar foco
            if ($item.data('select2')) $item.select2('open');
            else $item.trigger('focus');
            return;
        }
        if (isNaN(quantidade) || quantidade <= 0) {
            this.avisar('warning', 'Informe a quantidade.');
            $('[data-qtde]', this.DOM).trigger('focus');
            return;
        }
        if (!this.tabela) return;

        var somado = 0;
        var marcadas = 0;
        this.tabela.getRows('active').forEach(function (linha) {
            if (somado >= quantidade) return;
            var d = linha.getData();
            //embalagem cheia (saldo igual ao da embalagem) e status que aceita separação
            var cheia = Number(d.qtidadeAtu) > 0 && Number(d.qtidadeAtu) === Number(d.qtidadeIni);
            var statusOk = d.situacao === 'em-estoque' || d.situacao === 'impressa';
            if (d.itCodigo !== codigo || !cheia || !statusOk || self.selecionados[d.id]) return;

            self.selecionados[d.id] = true;
            somado += Number(d.qtidadeAtu);
            marcadas += 1;
        });

        this.redesenharChecks();
        this.atualizarSelecao();

        if (!marcadas) {
            this.avisar('warning', 'Nenhuma etiqueta cheia desse item está disponível na lista atual.');
            return;
        }
        if (somado < quantidade) {
            this.avisar('warning', 'Marcadas ' + marcadas + ' etiqueta(s), somando ' + this.formatarQuantidade(somado) + ' de ' + this.formatarQuantidade(quantidade) + '.');
            return;
        }
        this.avisar('success', 'Marcadas ' + marcadas + ' etiqueta(s), somando ' + this.formatarQuantidade(somado) + '.');
    },

    //MOCK: a tela antiga gera etiquetas/código de barras por aqui; a regra ainda não foi levantada
    gerarEtiquetas(htmlElement, event) {
        this.avisar('info', 'Geração de etiquetas: fluxo a definir com o usuário.');
    },

    // ---------- Modais (<dialog> nativo, não o FLUIGC.modal) ----------

    prepararModais() {
        var self = this;
        this.$modalDetalhes = $('[data-modal-detalhes]', this.DOM);
        this.$modalConfirmar = $('[data-modal-confirmar]', this.DOM);
        this.$modalLegenda = $('[data-modal-legenda]', this.DOM);

        //clique no fundo escurecido fecha: o alvo é o próprio <dialog>
        [this.$modalDetalhes, this.$modalConfirmar, this.$modalLegenda].forEach(function ($modal) {
            $modal.on('click', function (event) {
                if (event.target === $modal[0]) $modal[0].close();
            });
        });

        //Esc fecha sem passar pelos handlers: o "close" limpa a ação pendente
        this.$modalConfirmar.on('close', function () { self.pendente = null; });
    },

    abrir($modal) {
        var modal = $modal[0];
        if (!modal || typeof modal.showModal !== 'function' || modal.open) return;
        modal.showModal();
    },

    fechar($modal) {
        var modal = $modal[0];
        if (modal && modal.open) modal.close();
    },

    abrirDetalhes(linha) {
        var d = linha.getData();
        var info = NWM_STATUS[d.situacao];

        $('[data-detalhes-subtitulo]', this.DOM).text('Etiqueta ' + d.etiqueta + ' · item ' + d.itCodigo + ' — ' + d.descItem);

        var $grid = $('[data-detalhes-grid]', this.DOM).empty();
        [
            { rotulo: 'Status', valor: info ? info.rotulo : d.situacao },
            { rotulo: 'Etiqueta', valor: d.etiqueta },
            { rotulo: 'Item', valor: d.itCodigo + ' — ' + d.descItem, largo: true },
            { rotulo: 'Fazenda', valor: d.codEstabel },
            { rotulo: 'Depósito', valor: d.deposito },
            { rotulo: 'Lote', valor: d.lote },
            { rotulo: 'Data de validade', valor: this.formatarData(d.dtValiLote) },
            { rotulo: 'Qtde da embalagem', valor: this.formatarQuantidade(d.qtidadeIni) + ' ' + d.unidade },
            { rotulo: 'Qtde em saldo', valor: this.formatarQuantidade(d.qtidadeAtu) + ' ' + d.unidade },
            { rotulo: 'Família', valor: d.familia },
            { rotulo: 'Código de barras', valor: d.codBarras },
            { rotulo: 'Nota fiscal', valor: d.notaFiscal }
        ].forEach(function (campo) {
            var $dt = $('<dt>').text(campo.rotulo);
            var $dd = $('<dd>').text(campo.valor);
            var $bloco = $('<div>').addClass(campo.largo ? 'nwm-detalhes-item-largo' : '').append($dt).append($dd);
            $grid.append($bloco);
        });

        this.abrir(this.$modalDetalhes);
    },

    fecharDetalhes(htmlElement, event) {
        this.fechar(this.$modalDetalhes);
    },

    pedirConfirmacao(acao, linhas, ignoradas) {
        var b = NWM_ACOES[acao];
        this.pendente = { acao: acao, linhas: linhas, ignoradas: ignoradas || 0 };

        var quantas = linhas.length === 1
            ? 'a etiqueta ' + linhas[0].getData().etiqueta
            : linhas.length + ' etiquetas marcadas';
        var texto = b.rotulo + ' ' + quantas + '.';
        if (ignoradas) texto += ' ' + ignoradas + ' etiqueta(s) marcada(s) não aceitam esta ação e ficam de fora.';
        if (!b.statusNovo) texto += ' A regra desta ação ainda não foi definida: no mockup nada é alterado.';

        $('[data-confirmar-titulo]', this.DOM).text(b.rotulo + (linhas.length === 1 ? ' etiqueta?' : ' etiquetas?'));
        $('[data-confirmar-texto]', this.DOM).text(texto);
        $('[data-confirmar-botao]', this.DOM).text(b.rotulo);
        $('[data-confirmar-icone]', this.DOM)
            .toggleClass('is-perigo', !!b.destrutivo)
            .html('<i class="bi ' + b.icone + '"></i>');
        $('[data-confirmar-acao]', this.DOM)
            .toggleClass('nwm-btn-perigo', !!b.destrutivo)
            .toggleClass('nwm-btn-destaque', !b.destrutivo);

        this.abrir(this.$modalConfirmar);
    },

    fecharConfirmar(htmlElement, event) {
        this.fechar(this.$modalConfirmar);
        this.pendente = null;
    },

    confirmarAcao(htmlElement, event) {
        var pendente = this.pendente;
        this.fechar(this.$modalConfirmar);
        this.pendente = null;
        if (!pendente) return;
        this.aplicarAcao(pendente.acao, pendente.linhas);
    },

    //MOCK: só muda o status na tela. Trocar pela gravação no dataset/REST quando existir.
    //Estornar e transferir não têm status de destino definido: avisam e não alteram nada.
    aplicarAcao(acao, linhas) {
        var self = this;
        var b = NWM_ACOES[acao];

        if (!b.statusNovo) {
            this.avisar('info', b.rotulo + ': regra a definir. Nenhuma etiqueta foi alterada.');
            return;
        }

        var alteradas = 0;
        linhas.forEach(function (linha) {
            if (linha.getData().situacao === b.statusNovo) return;
            alteradas += 1;
            //o update redesenha só a célula do status: o reformat refaz os botões da coluna Ações,
            //que dependem do status novo
            linha.update({ situacao: b.statusNovo }).then(function () {
                linha.reformat();
                self.destacarLinha(linha);
            });
        });

        this.limparSelecao();
        this.avisar('success', alteradas === 1
            ? '1 etiqueta agora está como ' + NWM_STATUS[b.statusNovo].rotulo + '.'
            : alteradas + ' etiquetas agora estão como ' + NWM_STATUS[b.statusNovo].rotulo + '.');
    },

    // ---------- Select2 ----------

    carregarScript(src) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    //Select2 primeiro, tradução depois (o pt-BR se registra dentro do Select2)
    carregarSelect2() {
        var self = this;
        if (!nwmSelect2Promise) {
            var base = $.fn.select2 ? Promise.resolve() : this.carregarScript(NWM_SELECT2_JS);
            nwmSelect2Promise = base.then(function () {
                return self.carregarScript(NWM_SELECT2_PT_BR);
            });
            nwmSelect2Promise.catch(function () {
                nwmSelect2Promise = null;
            });
        }
        return nwmSelect2Promise;
    },

    prepararSelect2() {
        var base = {
            language: 'pt-BR',
            width: '100%',
            //a option vazia vira placeholder: aparece no campo, mas não na lista
            placeholder: 'Selecione',
            //a lista abre dentro do widget, para pegar o estilo de .fluig-style-guide.nwm
            dropdownParent: $(this.DOM)
        };

        $('[data-acao-lote]', this.DOM).select2(base);
        $('[data-item-qtde]', this.DOM).select2(base);

        //o Select2 desenha a própria seta: some a do select nativo
        $('[data-acao-lote], [data-item-qtde]', this.DOM).closest('.nwm-campo-caixa-select').addClass('is-select2');
    },

    //"Escolher item" é um select; no mockup as opções vêm de NWM_FONTES.itens
    montarSelectItens() {
        var $select = $('[data-item-qtde]', this.DOM);
        NWM_FONTES.itens.forEach(function (item) {
            $('<option>').val(item.codigo).text(item.codigo + ' — ' + item.descricao).appendTo($select);
        });
    },

    montarLegenda() {
        var self = this;
        var $lista = $('[data-legenda-lista]', this.DOM).empty();
        NWM_STATUS_ORDEM.forEach(function (chave) {
            $('<li>')
                .append($(self.montarChipStatus(chave)))
                .append($('<span>').addClass('nwm-legenda-texto').text(NWM_STATUS[chave].legenda))
                .appendTo($lista);
        });
    },

    abrirLegenda() {
        this.abrir(this.$modalLegenda);
    },

    fecharLegenda(htmlElement, event) {
        this.fechar(this.$modalLegenda);
    },

    // ---------- Apoio ----------

    //pisca a linha alterada em amarelo, como nas outras telas
    destacarLinha(linha) {
        var el = linha.getElement();
        if (!el) return;
        el.classList.remove('nwm-linha-nova');
        void el.offsetWidth;
        el.classList.add('nwm-linha-nova');
        setTimeout(function () { el.classList.remove('nwm-linha-nova'); }, 2200);
    },

    //FLUIGC existe na página do Fluig; fora dela (preview) o aviso vai para o console
    avisar(tipo, mensagem) {
        if (window.FLUIGC && FLUIGC.toast) {
            FLUIGC.toast({ title: '', message: mensagem, type: tipo });
            return;
        }
        console.log('[widget_nw_manutEtiq] ' + tipo + ': ' + mensagem);
    },

    //dt-vali-lote vem como aaaa-mm-dd; a tela antiga mostrava os 10 primeiros caracteres
    formatarData(valor) {
        var texto = String(valor || '').substring(0, 10);
        var partes = texto.split('-');
        return partes.length === 3 ? partes[2] + '/' + partes[1] + '/' + partes[0] : texto;
    },

    formatarQuantidade(valor) {
        return Number(valor || 0).toLocaleString('pt-BR', { maximumFractionDigits: 4 });
    },

    //minúsculas e sem acento, para a busca não depender disso
    normalizar(texto) {
        return String(texto || '').trim().toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '');
    }
});
