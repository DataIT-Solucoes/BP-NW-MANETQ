<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&display=swap">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tabulator/6.4.0/css/tabulator_simple.min.css">

<div id="widget_nw_manutEtiq_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide nwm" data-params="widget_nw_manutEtiq.instance()">
    <div class="nwm-cabecalho">
        <span class="nwm-selo" aria-hidden="true"><span class="nwm-selo-miolo"><i class="bi bi-tags"></i></span></span>
        <div class="nwm-cabecalho-texto">
            <h2 class="nwm-cabecalho-titulo">Manutenção Embalagens</h2>
            <p class="nwm-cabecalho-subtitulo">Consulte, receba, imprima e movimente as embalagens.</p>
        </div>
        <div class="nwm-cabecalho-acoes">
            <button type="button" class="nwm-btn nwm-btn-destaque" data-gerar><i class="bi bi-plus-lg" aria-hidden="true"></i>Gerar etiquetas</button>
        </div>
    </div>

    <div class="nwm-filtros" role="search" aria-label="Filtros">
        <!-- campos que a regra exige: Estabelecimento sempre; Itens OU Nota Fiscal -->
        <div class="nwm-filtros-principais">
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-est-${instanceId}">Estabelecimento <abbr class="nwm-obrigatorio" title="Obrigatório">*</abbr></span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-est-${instanceId}">
                    <div class="nwm-campo-caixa" data-auto="estabelecimentos">
                        <input type="text" id="nwm-est-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Estabelecimento de" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-est-de-lista-${instanceId}" data-filtro="estDe">
                        <ul class="nwm-sugestoes" id="nwm-est-de-lista-${instanceId}" role="listbox" aria-label="Estabelecimentos encontrados" hidden></ul>
                    </div>
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <div class="nwm-campo-caixa" data-auto="estabelecimentos">
                        <input type="text" id="nwm-est-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Estabelecimento até" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-est-ate-lista-${instanceId}" data-filtro="estAte">
                        <ul class="nwm-sugestoes" id="nwm-est-ate-lista-${instanceId}" role="listbox" aria-label="Estabelecimentos encontrados" hidden></ul>
                    </div>
                </div>
            </div>

            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-item-${instanceId}">Itens</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-item-${instanceId}">
                    <div class="nwm-campo-caixa" data-auto="itens">
                        <input type="text" id="nwm-item-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Item de" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-item-de-lista-${instanceId}" data-filtro="itemDe">
                        <ul class="nwm-sugestoes" id="nwm-item-de-lista-${instanceId}" role="listbox" aria-label="Itens encontrados" hidden></ul>
                    </div>
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <div class="nwm-campo-caixa" data-auto="itens">
                        <input type="text" id="nwm-item-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Item até" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-item-ate-lista-${instanceId}" data-filtro="itemAte">
                        <ul class="nwm-sugestoes" id="nwm-item-ate-lista-${instanceId}" role="listbox" aria-label="Itens encontrados" hidden></ul>
                    </div>
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
                    <input type="text" id="nwm-nf-lista-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Ex.: 12345, 12346" aria-label="Notas fiscais específicas" autocomplete="off" data-filtro="nfEspecificas">
                </div>
            </div>
        </div>

        <div class="nwm-filtros-refino">
            <div class="nwm-campo nwm-faixa">
                <span class="nwm-campo-rotulo" id="nwm-rot-dep-${instanceId}">Depósito</span>
                <div class="nwm-faixa-caixa" role="group" aria-labelledby="nwm-rot-dep-${instanceId}">
                    <div class="nwm-campo-caixa" data-auto="depositos">
                        <input type="text" id="nwm-dep-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Depósito de" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-dep-de-lista-${instanceId}" data-filtro="depDe">
                        <ul class="nwm-sugestoes" id="nwm-dep-de-lista-${instanceId}" role="listbox" aria-label="Depósitos encontrados" hidden></ul>
                    </div>
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <div class="nwm-campo-caixa" data-auto="depositos">
                        <input type="text" id="nwm-dep-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Depósito até" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-dep-ate-lista-${instanceId}" data-filtro="depAte">
                        <ul class="nwm-sugestoes" id="nwm-dep-ate-lista-${instanceId}" role="listbox" aria-label="Depósitos encontrados" hidden></ul>
                    </div>
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
                    <div class="nwm-campo-caixa" data-auto="familias">
                        <input type="text" id="nwm-familia-de-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="De" aria-label="Família de" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-familia-de-lista-${instanceId}" data-filtro="familiaDe">
                        <ul class="nwm-sugestoes" id="nwm-familia-de-lista-${instanceId}" role="listbox" aria-label="Famílias encontradas" hidden></ul>
                    </div>
                    <span class="nwm-faixa-tracinho" aria-hidden="true">&ndash;</span>
                    <div class="nwm-campo-caixa" data-auto="familias">
                        <input type="text" id="nwm-familia-ate-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Até" aria-label="Família até" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-familia-ate-lista-${instanceId}" data-filtro="familiaAte">
                        <ul class="nwm-sugestoes" id="nwm-familia-ate-lista-${instanceId}" role="listbox" aria-label="Famílias encontradas" hidden></ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="nwm-filtros-acoes">
            <button type="button" class="nwm-btn nwm-btn-destaque" data-buscar><i class="bi bi-search" aria-hidden="true"></i>Buscar</button>
        </div>
    </div>

    <div class="nwm-selecao">
        <div class="nwm-selecao-resumo">
            <p class="nwm-selecao-contador" data-contador-selecao aria-live="polite">Nenhuma etiqueta selecionada</p>
            <div class="nwm-selecao-itens" data-itens-selecionados>
                <p class="nwm-selecao-itens-titulo">Itens selecionados</p>
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
        <div class="nwm-selecao-acoes">
            <div class="nwm-acao-linha">
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-acao-lote-${instanceId}">Ação em lote</label>
                    <div class="nwm-campo-caixa nwm-campo-caixa-select">
                        <select id="nwm-acao-lote-${instanceId}" class="nwm-campo-input nwm-campo-select" data-acao-lote>
                            <option value="">Selecione</option>
                            <option value="imprimir">Imprimir</option>
                            <option value="receber">Receber</option>
                            <option value="estornar">Estornar</option>
                            <option value="transferir">Transferir</option>
                        </select>
                    </div>
                </div>
                <button type="button" class="nwm-btn nwm-btn-contorno" data-aplicar-lote><i class="bi bi-check2-all" aria-hidden="true"></i>Aplicar</button>
            </div>
            <div class="nwm-acao-linha">
                <div class="nwm-campo">
                    <label class="nwm-campo-rotulo" for="nwm-item-qtde-${instanceId}">Escolher item</label>
                    <div class="nwm-campo-caixa" data-auto="itens">
                        <input type="text" id="nwm-item-qtde-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" placeholder="Digite código ou descrição" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="nwm-item-qtde-lista-${instanceId}" data-item-qtde>
                        <ul class="nwm-sugestoes" id="nwm-item-qtde-lista-${instanceId}" role="listbox" aria-label="Itens encontrados" hidden></ul>
                    </div>
                </div>
                <div class="nwm-campo nwm-campo-estreito">
                    <label class="nwm-campo-rotulo" for="nwm-qtde-${instanceId}">Quantidade</label>
                    <input type="number" id="nwm-qtde-${instanceId}" class="nwm-campo-input nwm-campo-input-simples" min="0" step="0.0001" placeholder="0" autocomplete="off" data-qtde>
                </div>
                <button type="button" class="nwm-btn nwm-btn-contorno" data-executar-qtde><i class="bi bi-ui-checks" aria-hidden="true"></i>Executar</button>
            </div>
            <p class="nwm-selecao-ajuda">Marca automaticamente as etiquetas cheias desse item (Em estoque ou Impressa) até atingir a quantidade pedida.</p>
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
