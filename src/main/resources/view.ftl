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
    </div>

    <div class="nwm-filtros" role="search" aria-label="Filtros">
        <!-- campos que a regra exige: Estabelecimento sempre; Itens OU Nota Fiscal -->
        <div class="nwm-filtros-principais">
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-est-${instanceId}">Estabelecimento</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-est-${instanceId}">
                    <input type="text" id="nwm-est-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Estabelecimento de" autocomplete="off" data-filtro="estDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" id="nwm-est-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Estabelecimento até" autocomplete="off" data-filtro="estAte">
                </div>
            </div>

            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-item-${instanceId}">Itens</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-item-${instanceId}">
                    <input type="text" id="nwm-item-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Item de" autocomplete="off" data-filtro="itemDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" id="nwm-item-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Item até" autocomplete="off" data-filtro="itemAte">
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
                    <input type="text" id="nwm-nf-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Nota fiscal de" autocomplete="off" data-filtro="nfDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" id="nwm-nf-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Nota fiscal até" autocomplete="off" data-filtro="nfAte">
                </div>
                <div data-nf-especificas hidden>
                    <input type="text" id="nwm-nf-lista-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Ex.: 12345" aria-label="Notas fiscais específicas" autocomplete="off" data-filtro="nfEspecificas">
                </div>
            </div>
        </div>

        <div class="nwm-filtros-refino">
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-dep-${instanceId}">Depósito</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-dep-${instanceId}">
                    <input type="text" id="nwm-dep-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Depósito de" autocomplete="off" data-filtro="depDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" id="nwm-dep-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Depósito até" autocomplete="off" data-filtro="depAte">
                </div>
            </div>
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-barras-${instanceId}">Cód Barras</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-barras-${instanceId}">
                    <input type="text" id="nwm-barras-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Código de barras de" autocomplete="off" inputmode="numeric" data-filtro="barrasDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" id="nwm-barras-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Código de barras até" autocomplete="off" inputmode="numeric" data-filtro="barrasAte">
                </div>
            </div>
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-lote-${instanceId}">Lote</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-lote-${instanceId}">
                    <input type="text" id="nwm-lote-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Lote de" autocomplete="off" data-filtro="loteDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" id="nwm-lote-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Lote até" autocomplete="off" data-filtro="loteAte">
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
                    <input type="text" id="nwm-familia-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Família de" autocomplete="off" data-filtro="familiaDe">
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <input type="text" id="nwm-familia-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Família até" autocomplete="off" data-filtro="familiaAte">
                </div>
            </div>
        </div>

        <div class="nwm-filtros-acoes">
            <button type="button" class="nwm-btn nwm-btn-destaque" data-buscar><i class="bi bi-search" aria-hidden="true"></i>Buscar</button>
        </div>
    </div>

    <div class="nwm-selecao">
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
                    <label class="nwm-campo-rotulo" for="nwm-acao-lote-${instanceId}">Ação em lote</label>
                    <div class="nwm-acoplado">
                        <div class="nwm-campo-caixa nwm-campo-caixa-select">
                            <select id="nwm-acao-lote-${instanceId}" class="nwm-campo-input nwm-campo-select" data-acao-lote>
                                <option value="">Selecione</option>
                                <option value="imprimir">Imprimir</option>
                                <option value="receber">Receber</option>
                                <option value="estornar">Estornar</option>
                                <option value="transferir">Transferir</option>
                            </select>
                        </div>
                        <button type="button" class="nwm-btn nwm-btn-destaque" data-aplicar-lote><i class="bi bi-check2-all" aria-hidden="true"></i>Aplicar</button>
                    </div>
                </div>
            </div>
            <div class="nwm-acao-linha">
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-item-qtde-${instanceId}">Escolher item</label>
                    <div class="nwm-campo-caixa nwm-campo-caixa-select">
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

    <dialog class="nwm-modal nwm-modal-pequeno" role="alertdialog" aria-labelledby="nwm-confirmar-titulo-${instanceId}" aria-describedby="nwm-confirmar-texto-${instanceId}" data-modal-confirmar>
        <div class="nwm-modal-confirmacao">
            <span class="nwm-confirmacao-icone" aria-hidden="true" data-confirmar-icone><i class="bi bi-question-lg"></i></span>
            <h3 class="nwm-modal-titulo" id="nwm-confirmar-titulo-${instanceId}" data-confirmar-titulo>Confirmar ação?</h3>
            <p class="nwm-modal-subtitulo" id="nwm-confirmar-texto-${instanceId}" data-confirmar-texto></p>
        </div>
        <div class="nwm-modal-rodape">
            <button type="button" class="nwm-btn nwm-btn-contorno" autofocus data-fechar-confirmar>Cancelar</button>
            <button type="button" class="nwm-btn nwm-btn-destaque" data-confirmar-acao><i class="bi bi-check-lg" aria-hidden="true"></i><span data-confirmar-botao>Confirmar</span></button>
        </div>
    </dialog>

    <dialog class="nwm-modal nwm-modal-medio" aria-labelledby="nwm-legenda-titulo-${instanceId}" data-modal-legenda>
        <div class="nwm-modal-cabecalho">
            <div>
                <h3 class="nwm-modal-titulo" id="nwm-legenda-titulo-${instanceId}">Legenda dos status</h3>
                <p class="nwm-modal-subtitulo">O que cada situação significa na vida da embalagem.</p>
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
</div>
