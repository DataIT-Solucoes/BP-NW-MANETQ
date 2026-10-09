<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&display=swap">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tabulator/6.4.0/css/tabulator_simple.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/tabulator/6.4.0/js/tabulator.min.js" integrity="sha384-pYxmWRni6PTDEhE3EUFDBSQ4KQcsBHtS3N+syMWwrtxs9QRtJkxkphTVQMXEdVjT" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js" integrity="sha384-JnbsSLBmv2/R0fUmF2XYIcAEMPHEAO51Gitn9IjL4l89uFTIgtLF1+jqIqqd9FSk" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/i18n/pt-BR.js" integrity="sha384-ukGBtXgWlWvAnvqBKFZnHi6C8eJqbLdnBc5ry6vVybVVjK4ExBTxUwn9tjJO8boy" crossorigin="anonymous"></script>

<div id="widget_nw_manutEtiq_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide nwm" data-params="widget_nw_manutEtiq.instance()">
    <div class="nwm-cabecalho">
        <span class="nwm-selo" aria-hidden="true"><span class="nwm-selo-miolo"><i class="bi bi-tags"></i></span></span>
        <div class="nwm-cabecalho-texto">
            <h2 class="nwm-cabecalho-titulo">Manutenção Embalagens</h2>
            <p class="nwm-cabecalho-subtitulo">Consulte, imprima e movimente as embalagens.</p>
        </div>
        <div class="nwm-cabecalho-acoes">
            <button type="button" class="nwm-btn nwm-btn-destaque" data-abrir-impressora><i class="bi bi-gear" aria-hidden="true"></i>Impressora</button>
        </div>
    </div>

    <div class="nwm-filtros" role="search" aria-label="Filtros">
        <div class="nwm-filtros-principais">
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-est-${instanceId}">Estabelecimento</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-est-${instanceId}">
                    <input type="text" maxlength="100" id="nwm-est-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Estabelecimento de" autocomplete="off" data-filtro="estDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" maxlength="100" id="nwm-est-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Estabelecimento até" autocomplete="off" data-filtro="estAte">
                </div>
            </div>

            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-item-${instanceId}">Itens</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-item-${instanceId}">
                    <input type="text" maxlength="100" id="nwm-item-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Item de" autocomplete="off" data-filtro="itemDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" maxlength="100" id="nwm-item-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Item até" autocomplete="off" data-filtro="itemAte">
                </div>
            </div>

            <div class="nwm-campo nwm-faixa nwm-faixa-nf">
                <div class="nwm-nf-rotulo">
                    <span class="nwm-campo-rotulo" id="nwm-rot-nf-${instanceId}">Nota Fiscal</span>
                    <div class="nwm-radios" role="radiogroup" aria-label="Tipo de busca da nota fiscal">
                        <label class="nwm-radio">
                            <input type="radio" name="nwm-nf-${instanceId}" value="intervalo" checked data-nf-modo>
                            <span>Intervalo</span>
                        </label>
                        <label class="nwm-radio">
                            <input type="radio" name="nwm-nf-${instanceId}" value="especificas" data-nf-modo>
                            <span>Específicas</span>
                        </label>
                    </div>
                </div>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-nf-${instanceId}" data-nf-intervalo>
                    <input type="text" maxlength="100" id="nwm-nf-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Nota fiscal de" autocomplete="off" data-filtro="nfDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" maxlength="100" id="nwm-nf-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Nota fiscal até" autocomplete="off" data-filtro="nfAte">
                </div>
                <div class="nwm-documentos-caixa" data-nf-especificas hidden>
                    <input type="text" maxlength="100" id="nwm-nf-lista-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Buscar documento (2+ caracteres)" aria-label="Buscar notas fiscais específicas" autocomplete="off" data-filtro="nfEspecificas">
                    <ul class="nwm-documentos" aria-label="Documentos selecionados" data-documentos-selecionados></ul>
                    <span class="nwm-documentos-contador" role="status" data-documentos-contador>0 de 20 documentos selecionados</span>
                </div>
            </div>
        </div>

        <div class="nwm-filtros-refino">
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-dep-${instanceId}">Depósito</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-dep-${instanceId}">
                    <input type="text" maxlength="100" id="nwm-dep-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Depósito de" autocomplete="off" data-filtro="depDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" maxlength="100" id="nwm-dep-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Depósito até" autocomplete="off" data-filtro="depAte">
                </div>
            </div>
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-barras-${instanceId}">Cód Barras</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-barras-${instanceId}">
                    <input type="text" maxlength="100" id="nwm-barras-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Código de barras de" autocomplete="off" inputmode="numeric" data-filtro="barrasDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" maxlength="100" id="nwm-barras-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Código de barras até" autocomplete="off" inputmode="numeric" data-filtro="barrasAte">
                </div>
            </div>
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-lote-${instanceId}">Lote</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-lote-${instanceId}">
                    <input type="text" maxlength="100" id="nwm-lote-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Lote de" autocomplete="off" data-filtro="loteDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" maxlength="100" id="nwm-lote-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Lote até" autocomplete="off" data-filtro="loteAte">
                </div>
            </div>
            <div class="nwm-campo nwm-faixa nwm-faixa-data">
                <span class="nwm-campo-rotulo" id="nwm-rot-validade-${instanceId}">Data Validade</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-validade-${instanceId}">
                    <input type="date" id="nwm-validade-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" aria-label="Data de validade de" data-filtro="validadeDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="date" id="nwm-validade-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" aria-label="Data de validade até" data-filtro="validadeAte">
                </div>
            </div>
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-familia-${instanceId}">Família</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-familia-${instanceId}">
                    <input type="text" maxlength="100" id="nwm-familia-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Família de" autocomplete="off" data-filtro="familiaDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" maxlength="100" id="nwm-familia-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Família até" autocomplete="off" data-filtro="familiaAte">
                </div>
            </div>
        </div>

        <div class="nwm-filtros-acoes">
            <button type="button" class="nwm-btn nwm-btn-destaque" data-buscar><i class="bi bi-search" aria-hidden="true"></i>Buscar</button>
        </div>
    </div>

    <div class="nwm-selecao">
        <div class="nwm-selecao-linha">
            <div class="nwm-selecao-resumo">
                <div class="nwm-selecao-itens" data-itens-selecionados>
                    <p class="nwm-selecao-itens-titulo">Itens selecionados</p>
                    <div class="nwm-tabelinha-rolagem">
                        <table class="nwm-tabelinha">
                            <thead>
                                <tr>
                                    <th scope="col">Código</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col" class="nwm-num">Qtde Sel.</th>
                                </tr>
                            </thead>
                            <tbody data-itens-selecionados-corpo>
                                <tr><td colspan="3" class="nwm-tabelinha-vazio">Nenhum item selecionado</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="nwm-selecao-acoes">
                <div class="nwm-acao-linha">
                    <div class="nwm-campo">
                        <label class="nwm-campo-rotulo" for="nwm-item-qtde-${instanceId}">Escolher item</label>
                        <div class="nwm-campo-caixa nwm-campo-caixa-select" data-caixa-item-qtde>
                            <select id="nwm-item-qtde-${instanceId}" class="nwm-campo-input nwm-campo-select" data-item-qtde>
                                <option value="">Selecione</option>
                            </select>
                        </div>
                    </div>
                    <div class="nwm-campo nwm-campo-qtde">
                        <label class="nwm-campo-rotulo" for="nwm-qtde-${instanceId}">Quantidade</label>
                        <div class="nwm-acoplado">
                            <input type="number" id="nwm-qtde-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" min="0" step="0.0001" placeholder="0" autocomplete="off" data-qtde>
                            <button type="button" class="nwm-btn nwm-btn-destaque" data-executar-qtde><i class="bi bi-ui-checks" aria-hidden="true"></i>Executar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nwm-selecao-linha">
            <div class="nwm-selecao-coluna">
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-acao-lote-${instanceId}">Ação em lote</label>
                    <div class="nwm-acoplado">
                        <div class="nwm-campo-caixa nwm-campo-caixa-select">
                            <select id="nwm-acao-lote-${instanceId}" class="nwm-campo-input nwm-campo-select" data-acao-lote>
                                <option value="">Selecione</option>
                                <option value="imprimir">Imprimir</option>
                                <option value="receber">Receber</option>
                                <option value="estornar">Estornar</option>
                                <option value="transferir">Transferir</option>
                                <!-- <option value="devolver">Devolução</option> -->
                            </select>
                        </div>
                        <button type="button" class="nwm-btn nwm-btn-destaque" data-aplicar-lote><i class="bi bi-check2-all" aria-hidden="true"></i>Aplicar</button>
                    </div>
                </div>
            </div>
            <div class="nwm-selecao-coluna">
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-cod-barras-${instanceId}">Código de barras</label>
                    <input type="text" id="nwm-cod-barras-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Leia ou digite o código de barras" autocomplete="off" data-leitor-cod-barras>
                </div>
            </div>
        </div>
    </div>

    <div class="nwm-tabela" data-tabela></div>

    <dialog class="nwm-modal" aria-labelledby="nwm-detalhes-titulo-${instanceId}" data-modal-detalhes>
        <div class="nwm-modal-cabecalho">
            <div>
                <h3 class="nwm-modal-titulo" id="nwm-detalhes-titulo-${instanceId}">Detalhes da etiqueta</h3>
                <p class="nwm-modal-subtitulo" data-detalhes-subtitulo></p>
            </div>
            <button type="button" class="nwm-modal-fechar" aria-label="Fechar" data-fechar-detalhes><i class="bi bi-x-lg" aria-hidden="true"></i></button>
        </div>
        <div class="nwm-modal-corpo">
            <dl class="nwm-detalhes-grid" data-detalhes-grid></dl>
        </div>
        <div class="nwm-modal-rodape">
            <button type="button" class="nwm-btn nwm-btn-contorno" autofocus data-fechar-detalhes>Fechar</button>
        </div>
    </dialog>

    <dialog class="nwm-modal nwm-modal-operacao" aria-labelledby="nwm-operacao-titulo-${instanceId}" data-modal-operacao>
        <div class="nwm-modal-cabecalho">
            <div>
                <h3 class="nwm-modal-titulo" id="nwm-operacao-titulo-${instanceId}">Movimentar embalagens</h3>
                <p class="nwm-modal-subtitulo">Estabelecimento <strong data-operacao-estabelecimento></strong> · <span data-operacao-classificacao></span></p>
            </div>
            <button type="button" class="nwm-modal-fechar" aria-label="Fechar" data-fechar-operacao><i class="bi bi-x-lg" aria-hidden="true"></i></button>
        </div>
        <div class="nwm-modal-corpo">
            <p class="nwm-modal-subtitulo" data-operacao-selecao></p>
            <div class="nwm-operacao-campos">
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-natureza-${instanceId}">Natureza de saída</label>
                    <div class="nwm-acoplado">
                        <input id="nwm-natureza-${instanceId}" type="text" maxlength="100" class="nwm-campo-input nwm-campo-input-simples" autocomplete="off" data-operacao-campo="natureza">
                        <button type="button" class="nwm-btn nwm-btn-contorno" data-classificar-natureza>Validar natureza</button>
                    </div>
                </div>
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-serie-${instanceId}">Série de saída</label>
                    <input id="nwm-serie-${instanceId}" type="text" maxlength="100" class="nwm-campo-input nwm-campo-input-simples" autocomplete="off" data-operacao-campo="serie">
                </div>
            </div>
            <div class="nwm-operacao-campos" data-operacao-direta hidden>
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-destino-${instanceId}">Estabelecimento de destino</label>
                    <input id="nwm-destino-${instanceId}" type="text" maxlength="100" class="nwm-campo-input nwm-campo-input-simples" autocomplete="off" data-operacao-campo="codEstabelDestino">
                </div>
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-emitente-destino-${instanceId}">Emitente de destino (se externo)</label>
                    <input id="nwm-emitente-destino-${instanceId}" type="text" maxlength="100" inputmode="numeric" class="nwm-campo-input nwm-campo-input-simples" autocomplete="off" data-operacao-campo="emitenteDestino">
                </div>
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-valor-item-${instanceId}">Valor aplicado a cada item do documento</label>
                    <input id="nwm-valor-item-${instanceId}" type="number" min="0" step="0.0001" class="nwm-campo-input nwm-campo-input-simples" autocomplete="off" data-operacao-campo="valorItem">
                </div>
            </div>
            <div data-operacao-origem hidden>
                <p class="nwm-campo-rotulo">Documento de entrada de origem</p>
                <div class="nwm-operacao-campos">
                    <div class="nwm-campo">
                        <label class="nwm-campo-rotulo" for="nwm-emitente-origem-${instanceId}">Emitente</label>
                        <input id="nwm-emitente-origem-${instanceId}" type="text" maxlength="100" inputmode="numeric" class="nwm-campo-input nwm-campo-input-simples" data-operacao-campo="emitenteOrigem">
                    </div>
                    <div class="nwm-campo">
                        <label class="nwm-campo-rotulo" for="nwm-serie-origem-${instanceId}">Série</label>
                        <input id="nwm-serie-origem-${instanceId}" type="text" maxlength="100" class="nwm-campo-input nwm-campo-input-simples" data-operacao-campo="serieOrigem">
                    </div>
                    <div class="nwm-campo">
                        <label class="nwm-campo-rotulo" for="nwm-numero-origem-${instanceId}">Número</label>
                        <input id="nwm-numero-origem-${instanceId}" type="text" maxlength="100" class="nwm-campo-input nwm-campo-input-simples" data-operacao-campo="numeroOrigem">
                    </div>
                    <div class="nwm-campo">
                        <label class="nwm-campo-rotulo" for="nwm-natureza-origem-${instanceId}">Natureza de entrada</label>
                        <input id="nwm-natureza-origem-${instanceId}" type="text" maxlength="100" class="nwm-campo-input nwm-campo-input-simples" data-operacao-campo="naturezaOrigem">
                    </div>
                </div>
                <button type="button" class="nwm-btn nwm-btn-contorno" data-carregar-origem>Carregar embalagens da origem</button>
                <div class="nwm-origem-rolagem">
                    <table class="nwm-tabelinha">
                        <thead><tr><th scope="col">Selecionar</th><th scope="col">Etiqueta</th><th scope="col">Item</th><th scope="col">Lote</th><th scope="col">Saldo</th><th scope="col">Disponível na linha</th><th scope="col">Situação</th></tr></thead>
                        <tbody data-origem-corpo></tbody>
                    </table>
                </div>
            </div>
            <p class="nwm-operacao-mensagem" role="status" aria-live="polite" data-operacao-mensagem></p>
            <p class="nwm-operacao-chave" data-operacao-chave></p>
        </div>
        <div class="nwm-modal-rodape">
            <button type="button" class="nwm-btn nwm-btn-contorno" data-fechar-operacao>Fechar</button>
            <button type="button" class="nwm-btn nwm-btn-contorno" data-resultado-operacao hidden>Consultar resultado</button>
            <button type="button" class="nwm-btn nwm-btn-contorno" data-reenviar-operacao hidden>Reenviar mesma solicitação</button>
            <button type="button" class="nwm-btn nwm-btn-destaque" data-preparar-operacao>Revisar preparação</button>
            <button type="button" class="nwm-btn nwm-btn-destaque" data-enviar-operacao hidden>Confirmar preparação</button>
        </div>
    </dialog>

    <dialog class="nwm-modal nwm-modal-medio" aria-labelledby="nwm-legenda-titulo-${instanceId}" data-modal-legenda>
        <div class="nwm-modal-cabecalho">
            <div>
                <h3 class="nwm-modal-titulo" id="nwm-legenda-titulo-${instanceId}">Legenda dos status</h3>
                <p class="nwm-modal-subtitulo">Status operacional das etiquetas desta consulta, como o backend informa. A situação técnica, a posição e o Bag aparecem nos detalhes.</p>
            </div>
            <button type="button" class="nwm-modal-fechar" aria-label="Fechar" data-fechar-legenda><i class="bi bi-x-lg" aria-hidden="true"></i></button>
        </div>
        <div class="nwm-modal-corpo">
            <ul class="nwm-legenda" data-legenda-lista></ul>
        </div>
        <div class="nwm-modal-rodape">
            <button type="button" class="nwm-btn nwm-btn-contorno" autofocus data-fechar-legenda>Fechar</button>
        </div>
    </dialog>

    <dialog class="nwm-modal nwm-modal-pequeno" aria-labelledby="nwm-mais-acoes-titulo-${instanceId}" data-modal-mais-acoes>
        <div class="nwm-modal-cabecalho">
            <div>
                <h3 class="nwm-modal-titulo" id="nwm-mais-acoes-titulo-${instanceId}">Mais ações</h3>
                <p class="nwm-modal-subtitulo" data-mais-acoes-subtitulo></p>
            </div>
            <button type="button" class="nwm-modal-fechar" aria-label="Fechar" data-fechar-mais-acoes><i class="bi bi-x-lg" aria-hidden="true"></i></button>
        </div>
        <div class="nwm-modal-corpo">
            <ul class="nwm-mais-acoes" data-mais-acoes-lista></ul>
        </div>
        <div class="nwm-modal-rodape">
            <button type="button" class="nwm-btn nwm-btn-contorno" autofocus data-fechar-mais-acoes>Fechar</button>
        </div>
    </dialog>

    <dialog class="nwm-modal nwm-modal-medio" aria-labelledby="nwm-impressora-titulo-${instanceId}" data-modal-impressora>
        <div class="nwm-modal-cabecalho">
            <div>
                <h3 class="nwm-modal-titulo" id="nwm-impressora-titulo-${instanceId}">Configurar impressora</h3>
                <p class="nwm-modal-subtitulo">As etiquetas são impressas pelo aplicativo de impressão instalado neste computador.</p>
            </div>
            <button type="button" class="nwm-modal-fechar" aria-label="Fechar" data-fechar-impressora><i class="bi bi-x-lg" aria-hidden="true"></i></button>
        </div>
        <div class="nwm-modal-corpo">
            <ol class="nwm-impressora-orientacoes">
                <li>Mantenha o aplicativo de impressão de etiquetas aberto neste computador.</li>
                <li>Escolha a impressora e clique em <strong>Salvar</strong>. A escolha fica guardada neste navegador.</li>
                <li>Use <strong>Testar</strong> para imprimir uma etiqueta de exemplo.</li>
            </ol>
            <div class="nwm-campo">
                <label class="nwm-campo-rotulo" for="nwm-impressora-${instanceId}">Impressora</label>
                <div class="nwm-campo-caixa nwm-campo-caixa-select">
                    <select id="nwm-impressora-${instanceId}" class="nwm-campo-input nwm-campo-select" data-impressora-lista disabled>
                        <option value="">Selecione</option>
                    </select>
                </div>
            </div>
            <p class="nwm-impressora-mensagem" role="status" aria-live="polite" data-impressora-mensagem></p>
        </div>
        <div class="nwm-modal-rodape">
            <button type="button" class="nwm-btn nwm-btn-contorno" data-atualizar-impressoras><i class="bi bi-arrow-clockwise" aria-hidden="true"></i>Atualizar</button>
            <button type="button" class="nwm-btn nwm-btn-contorno" data-testar-impressora disabled><i class="bi bi-printer" aria-hidden="true"></i>Testar</button>
            <button type="button" class="nwm-btn nwm-btn-destaque" data-salvar-impressora disabled><i class="bi bi-check-lg" aria-hidden="true"></i>Salvar</button>
        </div>
    </dialog>
</div>
