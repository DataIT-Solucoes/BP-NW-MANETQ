# Decisões do usuário — widget_nw_manutEtiq

> Decisões e correções do usuário. Acrescentar no topo (mais recente primeiro), com data e origem.
> Só registrar o que o usuário decidiu ou pediu. Proposta não aprovada vai para `pendencias.md`.
> Decisões até 15/10 vêm do `HISTORICO.md` (registro anterior preservado).

## Dados e regras
| Data | Decisão | Origem |
|---|---|---|
| 21/10 | Dois níveis de acesso na tela: `admin` (usuário em algum grupo de `NWM_GRUPOS_ADMINISTRADORES`, hoje só `DefaultGroup-1`; pode haver mais de um) e `comum` (demais). Por enquanto só identifica e mostra no `console.log`; nada muda na tela. Substitui "sem checagem de permissão no Widget" (02/10) | Pedido do usuário |
| 19/10 | O `dsNwEmbalagens` publicado no Fluig é sempre o do GitHub `DataIT-Solucoes/BP-NW-DATASET` (decisão registrada no `widget_nw_bags`; substitui a cópia `../widget_nw_embalagens/datasets/dsNwEmbalagens.js` como fonte da verdade) | Usuário |
| 08/10 | DT124: Itens com `tipoControleEstoque=3`; Nota Fiscal (De/Até **e** Específicas) com `somenteComEmbalagens=true` | `HISTORICO.md` |
| 08/10 | Status = `situacaoApresentada`/`descricaoSituacao`; `situacao` continua estado técnico | `HISTORICO.md` |
| 08/10 | Família com código vazio é dado da base, não é pendência | `HISTORICO.md` |
| 08/10 | Sem botão Gerar etiquetas: geração interna ao backend | `HISTORICO.md` |
| 02/10 | Aba única; a tela é a visão ADM; sem checagem de permissão no Widget; sem C. Barras de bipagem do não-ADM | `HISTORICO.md` |

## Textos e mensagens
| Data | Decisão | Origem |
|---|---|---|
| 27/10 | Histórico da embalagem no contrato novo do backend (`versaoHistorico: 2`): coluna Ocorrência só com `tituloOcorrencia` e, embaixo, `descricaoOcorrencia`, como texto e **sem badge** (opção 2; substitui as badges de 20/10 e 23/10, inclusive "Vinculada/Desvinculada - Doc. FT4003"). Anterior/Atual de `conteudoHistorico.anterior`/`.atual` com `unidade` (ex.: "10 LT"); `null` → "—", zero aparece; sem completar com o saldo atual. Detalhes extras (origem, destino, documentos, posição) fora da tela | Pedido do usuário |
| 20/10 | Remover a mensagem inicial "Em lote, cada embalagem..." dos modais; manter campo para andamento/resultado | Pedido do usuário |
| 20/10 | ~~Ocorrências do Histórico da embalagem em badges iguais às de Bags, com os códigos conferidos nos fontes `.p` e na página publicada~~ (superado em 27/10) | Pedido do usuário |
| 23/10 | ~~Novas ocorrências no Histórico: `VINCULACAO_RESERVA_WT` = "Vinculada - Doc. FT4003", `LIBERACAO_RESERVA_WT` = "Desvinculada - Doc. FT4003"~~ (superado em 27/10) | Pedido do usuário |
| 23/10 | ~~As duas badges FT4003 terminam com ": <wt>" (ex.: "Vinculada - Doc. FT4003: 999999"); o número é o campo `wt` do próprio registro do histórico (corrigido no mesmo dia: antes usava o `wtReserva` da etiqueta); sem ele, só o rótulo~~ (superado em 27/10) | Pedido do usuário |
| 23/10 | Detalhes da etiqueta: campo "WT Docto - FT4003" logo abaixo de "Nota fiscal", com o mesmo `wtReserva` (vazio → "—") | Pedido do usuário |
| 20/10 | Campo Data do Histórico da embalagem no formato `DD/MM/AAAA - HH:MM` | Pedido do usuário |
| 02/10 | Nome exibido "Manutenção Embalagens"; `application.code` continua `widget_nw_manutEtiq` | `HISTORICO.md` |

## Tela e comportamento
| Data | Decisão | Origem |
|---|---|---|
| 26/10 | Na **Remessa para terceiros** o Estabelecimento de destino fica desabilitado (fundo cinza, como o Emitente de destino fora da Remessa) e limpo; a Remessa usa só o Emitente de destino ("Informe o emitente de destino."). Volta a habilitar nos outros fluxos | Pedido do usuário |
| 26/10 | **Emitentes por autocomplete** (`apoiarEmitentes`): Emitente de destino (Remessa) e Emitente do documento de origem. Pesquisa por código (1 dígito) ou nome (2 caracteres), só vale o escolhido, selo código - nome. O Emitente de destino continua desabilitado e limpo (inclusive o selo) fora da Remessa. Antes os dois eram texto livre e não chamavam a API | Pedido do usuário |
| 26/10 | **Naturezas por autocomplete** (`apoiarNaturezas`, tabela `natur-oper-amigavel`) nos dois campos de natureza do modal: Natureza de saída e Natureza de entrada da origem. Sai o botão **Validar natureza**: escolher a natureza de saída na lista já chama o `classificarNatureza`; remover o selo limpa a classificação. Escolher na lista **não é obrigatório** (26/10): o valor digitado vale nas duas naturezas; na de saída ele é validado ao apertar Enter ou sair do campo, sem repetir a validação da mesma natureza. As naturezas de saída ainda serão cadastradas na `natur-oper-amigavel` (hoje ela só tem 1xxx/2xxx); não cobrar isso do usuário | Pedido do usuário |
| 26/10 | Tabela das embalagens da origem com **checkbox no cabeçalho "Selecionar"** para marcar/desmarcar todas: vale só para as disponíveis, fica intermediário com parte marcada e desabilitado sem disponíveis ou com a operação travada | Pedido do usuário |
| 26/10 | Documento de entrada de origem: "Número" vira **Nota Fiscal de entrada**, com o autocomplete de Nota Fiscal dos filtros (`apoiarDocumentosEntrada`, a partir de 2 caracteres, no estabelecimento da operação, `somenteComEmbalagens`, só vale a escolhida). Ordem dos campos: Emitente, Nota Fiscal de entrada, Série, Natureza de entrada. Escolher a NF não preenche os outros campos | Pedido do usuário |
| 26/10 | **Todas as séries do modal com autocomplete**: a Série do documento de entrada de origem (Devolução de compra e Retorno para terceiros) usa o mesmo autocomplete da série de saída (`apoiarSeries` no estabelecimento da operação, só vale a escolhida, selo só com o código). O usuário aceitou o risco de a série da NF do emitente externo não estar na lista do estabelecimento | Pedido do usuário |
| 26/10 | Série de saída do modal é **input** (não select; o usuário corrigiu a informação de 21/10) com o autocomplete próprio da tela, igual ao Estabelecimento de destino: digita, aparecem as séries do `apoiarSeries` (estabelecimento da operação, a partir de 1 caractere), só vale a escolhida na lista e ela vira selo com ×. Sugestão e selo só com o código. Continua escondida/desabilitada até validar a natureza. Substitui o Select2 da série (21/10 e 26/10) | Correção do usuário |
| 26/10 | Sugestões da série de saída mostram **só o código** (o `apoiarSeries` devolve `descricao` igual ao `codigo`, e aparecia "1 - 1"). Substitui o "código - descrição" da linha da série abaixo | Pedido do usuário |
| 26/10 | Impressão pelo aplicativo local **concluída**: aprovada ao vivo na v0.1.19 pelo caminho "aplicativo fechado" (linha e lote); a impressão física não será testada por falta do aplicativo no computador de teste | Usuário |
| 26/10 | Imprimir volta a ser **como na tela antiga**: pelo aplicativo local `localhost:32478` (impressora do botão Impressora/`localStorage` ou a padrão do aplicativo; modelo 423 do GED pelo `webdownload`, mantido; `POST /imprimir` com `PRODUTO CODIGO LOTE DATAVAL CBARRA QTD UN`). Sem iframe/`print()` nem JsBarcode. Backend sem mudança e nada da rota antiga (`dsGetExecBO`): dados por `obterDadosImpressao` e registro por `confirmarEtiqueta`. Continua registrando sem perguntar e mesmo com erro no aplicativo (decisão de 22/10); diferenças em relação à antiga, propostas minhas: aviso quando o aplicativo falha, lote enviado uma etiqueta por vez (para na primeira falha), QTD sem separador de milhar. Justificativa gravada: "Impressão de etiqueta pelo aplicativo de impressão". Substitui a impressão pelo navegador de 22/10 | Pedido do usuário |
| 26/10 | Série de saída do modal Movimentar ligada ao `apoiarSeries` (Select2 com pesquisa no estabelecimento da operação, a partir de 1 caractere; mostra "código - descrição"). Sai a opção fixa `1` de 21/10. Continua escondida/desabilitada até validar a natureza | Pedido do usuário |
| 26/10 | Receber, Estornar, Inutilizar e Perda **clicados na linha** seguem a regra do `AGENTS.md`: o Confirmar valida no modal; se ok, o modal fecha e só aquela linha carrega (`linhaCarregando`, botões dela desabilitados, sem loading global e sem travar a widget). Resultado por toast: sucesso, recusa (`danger`, mesmo texto que o modal mostrava) ou incerto (`warning` com a chave; escritas bloqueadas). Como o Imprimir da linha | Pedido do usuário ("corrige o código") |
| 26/10 | Modal de ação de etiqueta (Receber, Estornar, Inutilizar, Perda): erro de preenchimento **em destaque**: mensagem em vermelho com fundo claro (`.nwm-operacao-mensagem.is-erro`) e o campo culpado com borda vermelha, `aria-invalid` e foco (justificativa vazia/inválida, quantidade inválida ou acima da capacidade). Some ao digitar | Pedido do usuário (após teste ao vivo) |
| 26/10 | Ação de etiqueta **em lote** (Aplicar) usa o **loading global** da widget + toast "Carregando..." do Confirmar até a consulta atualizar (`enviandoAcaoEmLote`), como já dizia o `AGENTS.md`. Da linha, continua sem loading global | Pedido do usuário ("corrige o código") |
| 23/10 | **Cabeçalho fixo** na tabela principal ao descer a página, no modelo do `widget_nw_bags` (skill, `references/cabecalho-fixo-tabela.md`): tabela sem `maxHeight` (cresce com a página) e cópia do cabeçalho presa no topo. Rollback: reverter o commit | Pedido do usuário |
| 21/10 | Modal fecha sozinho quando a ação termina sem nada pendente: ação de etiqueta com todas confirmadas e operação concluída/localizada; o resultado vai para toast (operação: 8 s, com WT e operação). Erro, recusa e resultado incerto mantêm o modal aberto | Pedido do usuário |
| 21/10 | Série de saída só **aparece** depois de validar a natureza (some de novo se a natureza mudar ou na reabertura de operação pendente) | Pedido do usuário |
| 21/10 | Série de saída vira Select2 com uma opção fixa `1` (provisório; depois virá de API). Continua desabilitada até validar a natureza | Pedido do usuário |
| 21/10 | Estabelecimento de destino do modal de operação é autocomplete de estabelecimento (`apoiarEstabelecimentos`), com selo "código - descrição"; só vale o escolhido na lista | Pedido do usuário |
| 21/10 | Modal de operação sem "Valor aplicado a cada item do documento" (o backend vai obter o valor; a tela não envia `valorItem`). Série de saída fica no lugar dele, na linha de destino, visível também na Devolução | Pedido do usuário |
| 21/10 | Ação em lote: Transferir confere antes de abrir o modal (1 a 100 marcadas, mesma regra da linha, inclusive impressão confirmada); Devolução continua abrindo sem marcadas (usa a origem); Aplicar sem ação avisa só "Selecione uma ação disponível." | Pedido do usuário |
| 21/10 | Botão de ação não permitido pela regra da embalagem (ex.: Perda em Bag, Imprimir em Encerrada/Descartada) é **removido** da linha, não desabilitado. Bloqueio temporário (operação em andamento/incerta, linha carregando) continua desabilitando | Pedido do usuário |
| 21/10 | Caixa de mensagem dos modais (ação de etiqueta, operação, impressora) escondida enquanto vazia (`:empty`) | Pedido do usuário |
| 21/10 | Modal Estornar: quantidade aceita só números, `,` e `.` (filtro ao digitar/colar); Justificativa (textarea) com altura própria, sem os 44px fixos dos inputs | Pedido do usuário |
| 21/10 | Série de saída volta ao modal (a API exige `serie`), **desabilitada até a natureza ser validada**; volta a desabilitar se a natureza mudar. Substitui a remoção "por enquanto" do mesmo dia | Pedido do usuário |
| 21/10 | Modal de operação sem a linha "N embalagem(ns) da grade. Para devolução, selecione as embalagens da origem abaixo." (nem a versão "na solicitação preservada" da reabertura) | Pedido do usuário |
| 21/10 | Modal de operação aberto por **Transferir** (linha ou lote) tem o título "Transferir embalagens"; Devolver e reabertura continuam "Movimentar embalagens" | Pedido do usuário |
| 21/10 | Depois de ação de etiqueta (Imprimir, Receber, Estornar, Inutilizar, Perda), não recriar a tabela: reconsultar no backend só as embalagens envolvidas e atualizar a linha, mantendo rolagem, página e ordenação (antes voltava ao topo). Transferir/Remessa/Devolução e lote com mais de 10 continuam com recarga completa | Pedido do usuário |
| 22/10 | `application.version` sobe o patch a cada entrega com arquivo em `src/` (feito por `scripts/entregar.ps1`, que inclui o `application.info` no commit); serve para evitar cache do JS. Efeito no Fluig não confirmado | Pedido do usuário |
| 22/10 | Campo Código de barras: ao dar Enter, procura o número só entre as linhas já carregadas na tabela (zeros à esquerda ignorados), marca a etiqueta, vai à página dela e limpa o campo; se não achar ou não puder marcar, avisa por toast. Não consulta o backend. "Buscar" interpretado como localizar e marcar (a confirmar) | Pedido do usuário |
| 22/10 | Qtde Sel. (soma do saldo `qtidadeAtu`, como já está) está correta; nada a mudar | Pedido do usuário |
| 22/10 | `testes/` e `evidencias/` ficam fora do git (já cobertos pelo `.gitignore`) | Pedido do usuário |
| 22/10 | Removidos o código sem uso `situacoesApresentadas()`, `textoQuantidadeEtiquetas()` e o modal Mais ações (JS, `view.ftl`, CSS e a marca `secundaria` de `NWM_ACOES`) | Pedido do usuário |
| 22/10 | Prefixos de commit aceitos: FIX, FEAT, REFACTOR, PERF, STYLE, DOCS, TEST, CHORE, CI, BUILD, REVERT, SECURITY (antes só DOCS, FIX, CHORE) | Pedido do usuário |
| 22/10 | `origin` trocado para `DataIT-Solucoes/BP-NW-MANETQ` (antes `HumbertoAlcantaraArruda/BP-NW-MANETQ`) | Pedido do usuário |
| 22/10 | Commit e push só quando o usuário pedir (`/entregar`); a origem da aprovação funcional do commit de 16/10 deixa de ser pendência | Pedido do usuário |
| 22/10 | Grupo de autorização por enquanto: só `DefaultGroup-1` (o já usado); grupos definitivos (DT-054) ficam para depois | Pedido do usuário |
| 22/10 | Marcar todos marca todas as páginas da busca (não só a página visível): comportamento correto, mantido | Pedido do usuário |
| 22/10 | Legenda dos status sem subtítulo (o texto citava "desta consulta", mas a lista é fixa) | Pedido do usuário |
| 22/10 | Etiquetas com código sem zeros (241, 243, 264, 265) ficarem fora de ordem na ordenação por Etiqueta é aceito; sem ajuste | Pedido do usuário |
| 22/10 | `versao` da linha não mudar após confirmar impressão é comportamento do backend; sem ação no widget | Pedido do usuário |
| 22/10 | Sugestões de Lote repetirem o código como descrição, e a opção do autocomplete sem separador no nome acessível, ficam como estão (fácil de entender) | Pedido do usuário |
| 22/10 | Modal de ação de etiqueta mostrar só "N embalagem(ns)", sem identificar a etiqueta, está correto | Pedido do usuário |
| 22/10 | Detalhes mostra Fazenda como `código - descrição`, igual à grade (só o código enquanto a descrição não carrega) | Pedido do usuário |
| 22/10 | Modal do Histórico estreito, com as colunas Atual e Justificativa só por rolagem horizontal, está correto | Pedido do usuário |
| 22/10 | Colunas Ações e Status fora da tela em 1366/1600px e Fazenda truncada: sem ajuste, a rolagem horizontal da tabela resolve | Pedido do usuário |
| 22/10 | Busca ampla (sem filtro de lote) demorar, em chamadas de 100 etiquetas com a tela bloqueada, é intencional: evita timeout do Fluig | Pedido do usuário |
| 22/10 | Estornar com saldo final acima da capacidade é barrado na tela, antes de enviar, com mensagem clara (etiqueta, capacidade e o que fazer); a recusa genérica do backend deixa de aparecer nesse caso | Pedido do usuário |
| 22/10 | Transferir/Remessa/Devolução e lote > 10 continuam recarregando a grade inteira (volta à mesma página); recarga com `replaceData` não será feita | Pedido do usuário |
| 22/10 | Transferência, Remessa e Devolução ficam de fora por ora: o usuário já testou e o Cheli está mudando a API | Pedido do usuário |
| 22/10 | Desempenho em produção não foi medido e não será medido por ora | Pedido do usuário |
| 22/10 | Conferência visual feita pelo código (contraste calculado): chips dos status todos acima de 13:1; hover das ações com texto branco acima de 5:1, exceto o vermelho puro (4,4:1), trocado por `--nwm-vermelho-escuro` no hover de Inutilizar/Perda/Descartar; caixas de mensagem vazias somem (`:empty`, sem espaço no HTML) | Pedido do usuário |
| 22/10 | Provisório até a nova API do Cheli: Transferência e Remessa enviam `valorItem` fixo em 10 (`NWM_VALOR_ITEM_PROVISORIO`), sem campo na tela; Devolução não envia. Trocar quando a API definir o preço unitário | Pedido do usuário |
| 22/10 | Teste ao vivo da Remessa (etiqueta 135, natureza 5949im, destino 11301, emitente 112267, `valorItem` 10): backend aceitou (documento de trabalho 493080, operação 211) e a etiqueta virou `RESERVADA` (só Detalhes e Histórico) até a nota ser efetivada no Datasul. Usuário confirmou no Datasul que o documento foi gerado certo. Natureza 5557 para destino 10913 recusada por autorização do estabelecimento | Teste do usuário |
| 22/10 | Segunda Remessa com a mesma etiqueta 135 (já `RESERVADA`), chave nova, chamada direto ao Dataset (a tela já não oferece Transferir/Remessa nela): backend recusou com `PREPARACAO_WT_RECUSADA` ("Nao foi possivel preparar o WT; confira origem, disponibilidade, versoes e parametros."), sem duplicar documento | Teste do usuário |
| 22/10 | Imprimir **não pergunta** se a etiqueta saiu: clicar em Imprimir já garante a impressão. Logo depois do `print()` registra `CONFIRMAR_IMPRESSAO` (justificativa "Impressão de etiqueta pelo navegador."); erro de hardware ou da janela de impressão **não** impede o registro (só avisa). Modal "Confirmar impressão" removido. Falha ao buscar os dados ou montar a etiqueta continua cancelando tudo (nada impresso, nada registrado). Substitui a pergunta da linha abaixo | Correção do usuário |
| 22/10 | Imprimir pelo navegador, **sem** as APIs da tela antiga (aplicativo `localhost:32478`): para cada etiqueta busca `obterDadosImpressao` (uma por vez; qualquer falha cancela tudo, nada é impresso), monta a etiqueta em HTML num iframe (104 × 50 mm, campos do modelo 423: código de barras Code 128 de `codEtiqueta`, C. Barras, Dat.Val, Lote, Prod = descrição da grade, Cod, `(quantidade inicial UN)`) e chama `print()`. Depois pergunta "saiu certa?": **Sim** registra `CONFIRMAR_IMPRESSAO` (fluxo de antes, justificativa "Impressão de etiqueta pelo navegador confirmada pelo usuário."); **Não**, Esc ou clique fora não gravam nada. Lote sai num único trabalho de impressão. Tamanho, QTD = quantidade inicial e a pergunta são propostas minhas, ajustáveis | Pedido do usuário |
| 22/10 | Níveis de acesso: o usuário **comum** não pode Transferir nem Devolver e faz todo o resto como o admin; para ele somem as opções Transferir e Devolução da ação em lote e os botões Transferir e Devolver da linha. **Implementado em 22/10** (`NWM_ACOES_SOMENTE_ADMIN`, `acaoPermitidaNoNivel`): vale na linha, na lista do lote (Select2 `matcher` + option oculta/desabilitada) e como trava em `aplicarAcao`; nível ainda não resolvido ou falha na leitura dos grupos conta como comum | Pedido do usuário |
| 22/10 | `RESERVADA` entra na legenda (agora 13 status), com chip cinza-azulado e o texto "Reservada para operação fiscal; aguarda a efetivação da nota no Datasul. Só permite consultar Detalhes e Histórico." (texto proposto por mim, ajustável) | Pedido do usuário |
| 22/10 | Recusa `PREPARACAO_WT_RECUSADA` (backend: "Nao foi possivel preparar o WT; confira origem, disponibilidade, versoes e parametros.") mostra no modal da operação texto claro: "Não foi possível preparar a operação. Confira se as embalagens ainda estão disponíveis (não reservadas em outra operação nem alteradas), a natureza, a série e o destino. Clique em Buscar para atualizar a lista e tente de novo." (mapa `NWM_MENSAGENS_RECUSA`, só para esse código; texto proposto por mim, ajustável) | Pedido do usuário |
| 22/10 | `CANCELADA` entra na legenda (agora 12 status), com o texto "Etiqueta cancelada; só permite consultar Detalhes e Histórico." (texto proposto por mim, ajustável) | Pedido do usuário |
| 21/10 | Texto do badge de Status vem do código `situacaoApresentada` traduzido por `situacaoFacilitada` (rótulo da legenda, ex.: "Impressa"), não do `descricaoSituacao` do backend (que fica no `title`) | Pedido do usuário |
| 21/10 | Ação clicada na linha da tabela (Imprimir, Histórico) **não** mostra o loading global nem o toast "Carregando...": desabilita os botões daquela linha e mostra carregamento na linha (fundo névoa, barra de progresso na base, spinner no botão clicado). A recarga da grade após o Imprimir da linha é silenciosa. Ação em lote e Buscar continuam com o loading global. Substitui, para a linha, as decisões de 20/10 sobre loading/toast do Histórico | Pedido do usuário |
| 21/10 | Select2 desabilitado (ex.: "Escolher item" sem itens) não reage ao clique nem fica com borda verde de foco | Correção do usuário |
| 21/10 | Ícone de código de barras (`bi-upc-scan`) antes do rótulo "Código de barras" da área de seleção | Pedido do usuário |
| 21/10 | "Escolher item" (Select2) sem itens: não mostrar toast ao clicar; o campo só fica desabilitado | Pedido do usuário |
| 21/10 | Ao buscar, campo obrigatório vazio não fica em vermelho; só o toast de aviso | Pedido do usuário |
| 21/10 | Campo de filtro com autocomplete só conta como preenchido quando o valor é escolhido na lista (selo); texto digitado sem escolher vale como campo vazio | Pedido do usuário |
| 20/10 | Imprimir habilitado quando a situação permitir; ao clicar, registra a confirmação (`CONFIRMAR_IMPRESSAO`) para atualizar o status, mesmo sem impressão física, para teste do usuário. Substitui o Imprimir desabilitado por falta de modelo | Pedido do usuário |
| 20/10 | Botões da coluna Ações alinhados à esquerda | Correção do usuário |
| 20/10 | Imprimir visível como **primeiro** botão em Não impressa; só reordenar o mapa não atende se a coluna cortar o botão | Correção do usuário |
| 27/10 | Coluna "Tipo de Embalagem" em `código - descrição` (ex.: "PL - PLASTICO"), descrição pelo `apoiarTipos` na busca | Pedido do usuário |
| 27/10 | Detalhes: "Nota fiscal" = NF (`documentoPrincipal` tipo `NOTA_FISCAL`, "numero/serie") do evento mais recente do histórico; "WT Docto - FT4003" = reserva atual (`wtReserva`) ou, sem ela, o WT do evento mais recente (`wt` ou `documentoPrincipal` tipo `WT`). Sem nenhum: "—" (ex.: 137 → 0019563/1 e 493078) | Pedido do usuário |
| 27/10 | Sem botão Histórico na linha: o Detalhes vira modal largo como era o do Histórico (até 1600px), com os dados atuais em cima e o Histórico da embalagem embaixo (mesma tabela e paginação). O Detalhes carrega o histórico com o carregamento na linha e abre depois da consulta | Pedido do usuário |
| 27/10 | Em `EM_TERCEIRO` (Em terceiro): só Detalhes, ~~Histórico~~ e Imprimir (saem Devolver e Perda), na linha e no lote | Pedido do usuário |
| 20/10 | Em `NAO_IMPRESSA`: Imprimir, Detalhes, Histórico, Inutilizar e Perda. Demais status preservados | Pedido do usuário |
| 20/10 | Hover dos botões de ações no padrão de Bags: fundo/borda coloridos e ícone contrastante por ação | Pedido do usuário |
| 20/10 | Botões de ações da grade com a borda verde de Bags, inclusive em repouso | Pedido do usuário |
| 20/10 | Fechar os modais clicando no fundo escuro externo | Pedido do usuário |
| 20/10 | Toast info "Carregando..." junto ao overlay da widget no Histórico (superado em 21/10: carregamento na linha) e no Buscar; retirar ao encerrar a carga | Pedido do usuário |
| 20/10 | **Correção:** loading global segue `widget_nw_bags` e bloqueia só a widget (overlay próprio + spinner). Não usar `FLUIGC.loading(window)` | Correção do usuário |
| 20/10 | Histórico: ~~loading global~~ (carregamento na linha desde 21/10) e modal só abre depois de carregar os dados | Pedido do usuário |
| 20/10 | Coluna Fazenda com código e descrição ("10904 - JOAO BRANCO PERES"); descrição do cadastro, sem nome fixo no código | Pedido do usuário |
| 20/10 | Coluna "Tipo de Embalagem" logo antes de Fazenda e "UN" logo depois de Qtde Saldo | Pedido do usuário |
| 15/10 | Ações da linha por status, como a aba Administrador da tela antiga (09/10); Histórico entre Detalhes e Imprimir (15/10; em `NAO_IMPRESSA` superado em 20/10) | `HISTORICO.md` |
| 09/10 | Legenda fixa com 9 status, cada um com cor própria, igual na linha e na legenda; paleta aprovada | `HISTORICO.md` |
| 08/10 | Seguir o protótipo de Tipos de Embalagens (`nwe`) e Itens Controlados (`nwi`) em tudo (o loading foi corrigido em 20/10 para o de Bags) | `HISTORICO.md` |
| 08/10 | Botão de ação novo usa o visual do Buscar (`nwm-btn nwm-btn-destaque`); o usuário reprovou com veemência uma variante `contorno` | `HISTORICO.md` |
| 08/10 | Autocomplete próprio (não `FLUIGC.autocomplete`); selo "código - descrição" com × em todos, exceto Específicas | `HISTORICO.md` |
| 02/10 | Todos os 8 filtros visíveis; ordenação por coluna, inicial Código → Etiqueta; status em chip na célula; legenda em modal | `HISTORICO.md` |

## Forma de trabalho
| Data | Decisão | Origem |
|---|---|---|
| 21/10 | **Sem entrega automática**: commit, push e `.war` só quando o usuário pedir, pelo comando `/entregar "texto"`. Substitui a regra de 20/10 "SEMPRE commit + push + compilar" | Usuário |
| 21/10 | Mesma organização do `widget_nw_bags`: regras no `AGENTS.md` (o `CLAUDE.md` só importa `@AGENTS.md`); `contexto-ia/` vira `docs/` (decisoes, pendencias, referencias-backend, tela-e-codigo); `AI_HANDOFF` removido (histórico = `git log`); atualizar só o arquivo afetado | Usuário |
| 21/10 | Skill `fluig-branco-peres` local em `.claude/skills/` (cópia igual nos 4 widgets, sem cópia global); `.claude/` inteira no git | Usuário |
| 21/10 | Entrega por `scripts/entregar.ps1`; **mensagem de commit sempre com prefixo** `DOCS: Texto`, `FIX: Texto`, `CHORE: Texto`; commit sem coautor | Usuário (padrão do `widget_nw_bags`) |
| 20/10 | ~~SEMPRE commit + push + compilar (.war) após cada alteração~~ (superada em 21/10: só com `/entregar`), inclusive documentação. Publicação no Fluig é separada (feita pelo usuário) | Correção do usuário: "SEMPRE: Commit, push e compilar" |
| 20/10 | `HISTORICO.md` deixa de ser atualizado; fica como registro anterior | Usuário |
