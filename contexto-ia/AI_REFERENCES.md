# AI_REFERENCES — widget_nw_manutEtiq

## Fontes da verdade
Caminhos de fontes abaixo são relativos à raiz da widget, salvo indicação.

| Assunto | Local | Versão / consulta |
|---|---|---|
| Organização | C:/Users/DataIt/Documents/PADRAO_CONTEXTO_IA_WIDGETS.md | 2026-10-20 |
| Widget | src/main/resources/ e src/main/webapp/resources/ | HEAD 9d1611d, consulta em 2026-10-20 |
| Dataset | ../widget_nw_embalagens/datasets/dsNwEmbalagens.js | NW_CONFIG, NW_ACOES, NW_COLUNAS em 2026-10-20 |
| Regras comuns | Skill fluig-branco-peres, SKILL.md e references/ambiente-e-regras.md | Consulta em 2026-10-20; pedido atual prevalece |
| Histórico | HISTORICO.md | Registro até 15/10 preservado |
| Backend | ../widget_nw_embalagens/fluig-rest/docs/ | Referência histórica; não relida nesta tarefa |

SHA256 do Dataset consultado: `1fca73eaa71d05e20d18b3098c762058d0a2d7bef432ace9394c7d6eb1a2d7f3`. Relê-lo antes de alterar integrações; não armazenar credenciais.

## Descobertas confirmadas — 2026-10-20
- Botões de ações: nwm-acao agora usa border: 1px solid var(--nwm-verde), verde #006B35. Referência confirmada no CSS local ../widget_nw_bags/src/main/webapp/resources/css/widget_nw_bags.css:790–798, regra nwb-acao com 1px de borda institucional. Fonte Bags somente lido. Após login feito pelo usuário, referência conferida ao vivo em http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/manutencao_e_consulta_de_bags: dez botões inspecionados por getComputedStyle, borda 1px solid rgb(0,107,53), raio 10px, tamanho 34x34px, ícones rgb(94,93,87), fundo transparente; screenshot dos botões também conferido. Confirma o ajuste local; publicação da mudança na widget de manutenção permanece não confirmada. Diff CSS de uma linha, encoding/quebras preservados; git diff --check OK. Sem alteração JS, testes funcionais não executados nesta entrega visual.
- Histórico: correção explícita do usuário substituiu FLUIGC.loading(window) por definirCarregandoGlobal, overlay .nwm-carregando-global anexado a this.DOM com jQuery. Container .nwm position:relative; overlay absolute/inset:0/z-index:50, fundo rgba(247,245,238,0.72), cursor progress e spinner existente de 48px. Referência lida em widget_nw_bags.js ($carregandoGlobal e atualizarCarregandoGlobal) e CSS .nwb-carregando-global. Bloqueio restrito à widget; aria-busy só no container. Hidden no always; modal após sucesso/render, cancelamento silencioso e erro inicial sem modal. Nove cenários simulados passaram (3 overlay, 6 histórico); teste no navegador com CSS real confirmou área idêntica à widget, cliques internos bloqueados, botão externo e segunda widget livres; hidden restabelece cliques internos. Teste isolado, não publicação no Fluig.
- Histórico: renderizarHistoricoEtiqueta formata dataEvento (fallback dataRegistro) por formatarDataHoraHistorico em DD/MM/AAAA - HH:MM. Timestamp ISO com T ou espaço; preserva data/hora recebidas sem conversão de fuso; remove segundos/fração/offset apenas da exibição. Vazio usa travessão; texto não reconhecido preservado. Oito casos locais passaram; node --check/git diff --check OK. Antes/depois: apoios 32, funções 36 e transporte 60 com FALHAS=0; consulta mantém falha preexistente FALHA_TRANSPORTE/HTTP 0 no Node 24.
- Fazenda: coluna textual usa campo fazenda, largura 260px, valor codEstabel + " - " + descricao. Código original permanece em codEstabel. Após descrever itens, a carga resolve uma descrição por estabelecimento distinto; reaproveita seleção válida de estDe/estAte ou consulta apoiarEstabelecimentos, com paginação e correspondência exata de codigo. Não fixa o nome do exemplo do usuário.
- Respostas antigas ignoradas; cursor repetido e erro de apoio não viram carga concluída. Código sem correspondência é exibido com aviso de descrição ausente. Oito cenários específicos simulados passaram; node --check/git diff --check OK.
- Testes antes/depois: apoios 32, funções 36, transporte 60, FALHAS=0. Consulta mantém falha preexistente HTTP 0/rejeição não tratada; fixture local (fora do Git) atualizada com seleção do estabelecimento para acompanhar a descrição nova.
- Grade atual: Tipo de Embalagem → codTipo (150px) antes de Fazenda; UN → unidade (48px) depois de Qtde Saldo. codTipo preservado por mapearEtiqueta; unidade já mapeada. Ambos usam formatter plaintext e ordenação textual, sem novas consultas.
- Verificação local de ordem e mapeamento em 175 registros capturados de consultarEtiquetas: OK (exemplo PL/LT). node --check e git diff --check: OK. Suítes apoios 32, funções 36 e transporte 60 cenários, FALHAS=0 antes/depois. Consulta falha antes/depois por incompatibilidade preexistente do simulador (Node 24, rejeição não tratada; modo warn expõe $.map ausente).
- JS medido em 20/10: CRLF no disco (4676 antes, 4685 depois); preservado. O registro LF/0 CR de 15/10 é histórico; Git normaliza o conteúdo conforme .gitattributes.
- application.info: versão 0.1.0; recurso JS índice 1, CSS índice 2; próximo livre 3.
- view.ftl: sete diálogos, incluindo ação de etiqueta e histórico; CDN declarativo com SRI. O registro anterior de cinco diálogos está superado.
- JS, NWM_ACOES_POR_STATUS: matriz ampliada com inutilização/perda e status INUTILIZADA/ENCERRADA. A matriz de 15/10 abaixo é histórica.
- JS, NWM_COMANDOS_ETIQUETA: receber → confirmarEtiqueta/RECEBER_FISICO; estornar → estornarEtiqueta; inutilizar → inutilizarEtiqueta; perda → registrarPerdaExtravio.
- JS, consultarEstadoEtiqueta/despacharAcaoEtiqueta: consulta situação/versão antes do comando; execução individual por etiqueta para na recusa; resultado incerto persistido no sessionStorage bloqueia escritas.
- JS, carregarHistoricoEtiqueta: histórico implementado via consultarHistoricoEtiqueta, cursor aposRegistro/proximoRegistro.
- JS, obterDadosImpressaoEtiqueta: método chama obterDadosImpressao; isso não comprova fluxo completo de impressão real.
- Dataset: confirmarEtiqueta, estornarEtiqueta, inutilizarEtiqueta, registrarPerdaExtravio, consultarSituacaoEtiqueta e consultarHistoricoEtiqueta existem. Escritas correspondentes habilitadas para DefaultGroup-1 nos estabelecimentos 10904/11301. Substitui a ausência de contrato/rota registrada em 15/10; não comprova validação da tela no ambiente.
- HEAD 9d1611d3c4f1549c6da7f4ba3352c1802ad7acbe (16/10/2026): “Completa ações operacionais e histórico da Manutenção de Embalagens”. Git limpo no início da migração.
- AGENTS/CLAUDE anteriores diferiam só no nome do documento da raiz. AGENTS em brancoperes2026 não encontrado no caminho citado; usar regras atuais e skill sem presumir arquivo existente.

## Verificação e build
- Migração documental: conferir diff e referências; fontes e configuração permanecem sem alteração no Git.
- Testes funcionais não executados nesta migração; exigência de antes/depois para alterações JS permanece em AGENTS.
- Testes registrados: `node testes/testar-apoios-filtros.cjs`, `node testes/testar-consulta-etiquetas.cjs`, `node testes/testar-funcoes-manutencao.cjs`, `node testes/testar-transporte-dataset.cjs`. Alguns leem evidencias/etapa1-20261008/resultado-dataset.json (fora do Git).
- WAR atualizado em 20/10/2026 com overlay restrito à widget no padrão de Bags: target/widget_nw_manutEtiq.war; SHA256 `1a160f4d0d17ca6b13ab865ab398442753e04f02aab8aa593613bcbb87e9b7b1`. Python zipfile Deflate: webapp na raiz e resources em WEB-INF/classes; 12 arquivos comparados byte a byte, ZIP íntegro. Publicação no Fluig não executada.
- Última validação ao vivo registrada: 08/10/2026, NF 9999801–9999805 → 40 etiquetas. Evidências e hashes parciais em HISTORICO.md; não repetida em 20/10.

## Retrato técnico anterior — 15/10/2026
Preservado do AGENTS anterior para não perder detalhes. **Não é contrato vigente.** Afirmações abaixo sobre cinco diálogos, ações desabilitadas, Histórico sem ação/rota, ausência de contrato de estorno/confirmação e obterDadosImpressao não usada foram superadas pelas descobertas acima. Conferir o JS e o Dataset atuais. Outros detalhes não foram todos revalidados nesta migração.

### Tela registrada
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


### Dados e contrato registrados
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
