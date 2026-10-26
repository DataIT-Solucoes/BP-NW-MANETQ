# Referências de dados e backend — widget_nw_manutEtiq

> Onde está a verdade e o que já foi levantado nos fontes, para não baixar e reler tudo de novo.
> Ao levantar algo novo nos `.p` ou no Dataset, registrar aqui com a data e o arquivo:linha.

## Fontes da verdade
| O quê | Onde |
|---|---|
| Widget | `origin` = `https://github.com/DataIT-Solucoes/BP-NW-MANETQ.git`, branch `fechamento-controle-embalagens` (trocar só com autorização) |
| Dataset publicado | `https://github.com/DataIT-Solucoes/BP-NW-DATASET` → `dsNwEmbalagens.js` (decisão do usuário registrada no `widget_nw_bags`, 19/10). Até 20/10 esta tela lia a cópia `../widget_nw_embalagens/datasets/dsNwEmbalagens.js` (SHA256 `1fca73eaa71d05e20d18b3098c762058d0a2d7bef432ace9394c7d6eb1a2d7f3` em 20/10) |
| APIs REST (Progress) | `https://github.com/DataIT-Solucoes/BP-NW-Embalagens`, branch `fechamento-controle-embalagens`, `APIs-Controle-Embalagens/fontes/progress/` (só leitura, CP850) |
| Documentação do projeto | `../widget_nw_embalagens/fluig-rest/docs/` (referência histórica) |
| Registro anterior | `HISTORICO.md` (até 15/10; última validação ao vivo 08/10: NF 9999801–9999805 → 40 etiquetas) |

Baixar para o scratchpad e só ler (fontes `.p`/`.i` são CP850: `iconv -f CP850 -t UTF-8`):
```
gh api "repos/DataIT-Solucoes/BP-NW-Embalagens/contents/APIs-Controle-Embalagens/fontes/progress/<arquivo>?ref=fechamento-controle-embalagens" -H "Accept: application/vnd.github.raw"
gh api "repos/DataIT-Solucoes/BP-NW-DATASET/contents/dsNwEmbalagens.js" -H "Accept: application/vnd.github.raw"
```

## Contrato usado pela tela (Dataset `dsNwEmbalagens`)
- Transporte: `chamarEmbalagens(acao, parametros)` → `$.ajax` em `/api/public/ecm/dataset/search`; o Dataset usa o serviço
  `DATASUL_REST_HOMOLOG` (credenciais só no serviço). Base REST: `/dts/datasul-rest/resources/prg/esp/v1/controle-embalagens`.
  Usuário, grupos e estabelecimentos permitidos vêm do Dataset (sessão Fluig), nunca do Widget.
- Regras (20/10): `DefaultGroup-1`, estabelecimentos 10904/11301 (configuração de TESTE); grupos definitivos pendentes (DT-054).
  Escritas de etiqueta habilitadas para esse grupo. Conferir sempre `regras` e `escritasHabilitadas`.
  Desde o commit `37d22b1` (22/10): `todosEstabelecimentosTeste: true` libera todos os estabelecimentos (o Dataset acrescenta `*` aos
  permitidos), só com o serviço `DATASUL_REST_HOMOLOG`; as listas 10904/11301 ficam guardadas para voltar ao modo restrito.

### Dataset `37d22b1` (lido em 23/10)
- Versão lida: commit `37d22b1` de 22/10. O SHA256 do arquivo convertido para CRLF (`932d5b2e…`) é o informado no `LEIA-ME.md`. Comparada com a de 19/10 (`e9083b2`), nenhuma
  ação, campo ou parâmetro foi removido: as 20 ações usadas pela tela continuam iguais.
- **Reserva WT automática**: `consultarEtiquetas` e `consultarSituacaoEtiqueta`, quando a resposta traz linha com
  `estadoReservaFiscal = "WT_EXCLUIDO_SEM_FISCAL"` (exige `reservaFiscalAtiva`, `situacaoApresentada = "RESERVADA"`, `idOperacaoReserva`,
  `wtReserva`, `versaoOperacaoReserva`), fazem POST `reconciliarReservaWt` (`/operacoes/reservas/reconciliacao`, chave
  `AUTO-WT-<estab>-<idOperacao>-V<versao>`, até 100 operações) e repetem a consulta, sem retry. A tela recebe a página já reconsultada.
  Novos erros dessa consulta: `ATUALIZACAO_RESERVA_PENDENTE`, `FALHA_ATUALIZACAO_RESERVA` e `RESPOSTA_INVALIDA` (metadados de reserva
  incompletos). Cada chamada ao REST tem 60 s; a tela espera 90 s (`NWM_TEMPO_LIMITE_CONSULTA_MS`).
- **Apoios novos** (`apoiarEmbalagens`, `apoiarBags`, `apoiarSeries`, `apoiarNaturezas`, `apoiarEmitentes`): `codEstabel` e `filtro`
  obrigatórios, sem o mínimo de 2 caracteres (embalagens e Bags: só dígitos; emitentes: código numérico ou 2+ caracteres), `limite` 1–20,
  cursor `aposCodigo`/`proximoCodigo`. O cursor de naturezas pode trazer TAB e tem de ir de volta inteiro. Campos de resposta só no
  `LEIA-ME.md` para naturezas (código, nome, contexto `MESMO_ESTADO`/`OUTRO_ESTADO`, `descricaoExibicao`, `exibeRecebimento`). O LEIA-ME
  diz que o REST e a prova real pelo Dataset ainda estão pendentes. A tela usa o `apoiarEmbalagens` (Cód Barras, 23/10) e o `apoiarSeries`
  (série de saída do modal Movimentar, 26/10; resposta `codigo`/`descricao`, provada no TESTE pelo `wdgt_monitor_nw_novo`).
- `apoiarEmbalagens` (fonte `docs/contr-emb-autocompletes.i.txt`, cópia local fora do git, modo `EMBALAGEM`, passado pelo usuário em 23/10): lê
  `contr_emb_etiqueta` do `codEstabel` com `tipo-controle = "EMBALAGEM"`, em ordem de `id-etiqueta`, sem filtrar situação. Compara
  `cod-etiqueta` (`acCorresponde`): igual → acha; filtro começando com 0 → exato sem zeros à esquerda; sem zero → começo do código sem zeros.
  Registro: `codigo` (`cod-etiqueta`), `descricao` (descrição do item ou `it-codigo`), `item`, `idEtiqueta`, `codEstabel`, `situacao`
  (técnica), `tipoLocal`; cursor `proximoCodigo` = `idEtiqueta`. Erros: `SEM_PERMISSAO`, `FILTRO_INVALIDO`, `FALHA_CONSULTA_APOIO`.
- Ações usadas:

| Grupo | Ações |
|---|---|
| Consulta | `consultarEtiquetas`, `consultarSituacaoEtiqueta` (situação/versão antes de comando), `consultarHistoricoEtiqueta` (cursor `aposRegistro`/`proximoRegistro`) |
| Apoios | `apoiarEstabelecimentos`, `apoiarItens`, `apoiarDepositos`, `apoiarLotes`, `apoiarFamilias`, `apoiarDocumentosEntrada` |
| Operação (modal Movimentar) | `classificarNatureza`, `consultarEmbalagensOrigem`, `criarTransferencia`, `criarRemessa`, `criarDevolucao`, `consultarResultadoOperacao` |
| Ação de etiqueta (`NWM_COMANDOS_ETIQUETA`) | imprimir → `confirmarEtiqueta`/`CONFIRMAR_IMPRESSAO`; receber → `confirmarEtiqueta`/`RECEBER_FISICO`; estornar → `estornarEtiqueta`; inutilizar → `inutilizarEtiqueta`/`INUTILIZAR`; perda → `registrarPerdaExtravio` |
| Impressão | `obterDadosImpressao` (método `obterDadosImpressaoEtiqueta`; fluxo de impressão real não confirmado) |

- `confirmarEtiqueta` (20/10): aceita `CONFIRMAR_IMPRESSAO`; exige `idEtiqueta`, `codEstabel`, `versao`, `chaveIdempotente`; justificativa
  opcional na impressão. `contr-emb-manutencao.p:129` distingue `CONFIRMACAO_IMPRESSAO`/`RECEBIMENTO_FISICO`; `:149–157` valida
  versão/ATIVA/geração/contexto; justificativa obrigatória só em `RECEBER_FISICO` (`:158–165`). Vínculo com Bag não impede a confirmação.

### `consultarEtiquetas` (DT120 e DT124, aceitos no REST TESTE)
- Igualdade: `codEstabel`, `codEtiqueta`, `item`, `lote`, `codTipo`, `tipoControle`, `tipoLocal`, `situacao`, `idBag`.
- Faixas De/Até: `estabelDe/Ate`, `itemDe/Ate`, `depositoDe/Ate`, `etiquetaDe/Ate`, `loteDe/Ate`, `validadeDe/Ate` (`YYYY-MM-DD`), `familiaDe/Ate`.
- Nota Fiscal: `modoNotas` = `INTERVALO` (`notaDe/notaAte` = número da nota) ou `ESPECIFICAS` (`documento` repetido, 1 a 20 códigos opacos;
  OR entre notas, sem duplicar etiqueta). Demais filtros em AND; códigos comparados como texto.
- Cursor `aposId`/`proximoId` exclusivo, 1 a 100 por chamada (padrão 20); `total` = tamanho da página, não contagem global. Mudar filtro
  reinicia o cursor. O retorno não traz família nem número da nota.

### Apoios
- `filtro` 2–100 caracteres, `limite` 1–20, cursor `aposCodigo`/`proximoCodigo`, `temMais`; envelope `sucesso`, `codigoErro`, `mensagem`, `dados`.
- Documento traz identidade fiscal completa e `codigo` opaco (guardar como veio; não montar pelo número nem usar `idEvento`). Série pode vir vazia.
- Localização e Grupo não têm apoio.
- DT124: `apoiarItens` com `tipoControleEstoque` só aceita `"3"` (outro → `FILTRO_INVALIDO`); `apoiarDocumentosEntrada` com
  `somenteComEmbalagens` `"true"`/`"false"` (com `true`, só notas com etiquetas do recebimento vigente, não compensado). Os dois filtram antes
  de limite/cursor: não filtrar só no front. Na tela de parametrização **não** enviar `tipoControleEstoque`.

### Campos do registro (JS ← coluna do Dataset)
`id`/`idEtiqueta` (`idEtiqueta`), `versao` (numérica), `itCodigo` (`item`), `codEstabel`, `etiqueta`/`codBarras` (`codEtiqueta`), `lote`,
`dtValiLote` (`validadeLote`), `qtidadeIni` (`quantidadeInicial`), `qtidadeAtu` (`quantidadeAtual`), `capacidade`, `unidade`, `deposito`,
`localizacao`, `codTipo`, `situacao`, `situacaoApresentada`, `descricaoSituacao`, `impressaoConfirmada`, `recebimentoFisicoConfirmado`,
`tipoLocal`, `tipoControle`, `idBag`. `descItem` vem de `apoiarItens`; `fazenda` = `codEstabel + " - " + descrição` de `apoiarEstabelecimentos`.
- `situacao` (`NWM_STATUS`: ATIVA, ENCERRADA, CANCELADA, DESCARTADA) = estado técnico; `situacaoApresentada`/`descricaoSituacao` = status.
- Status por embalagem (lido em 21/10, commit `b26b5f5`): `esp/api/v1/controle-embalagens.p:1295-1296` grava `situacaoApresentada` =
  `fEmResumo(id-etiqueta)` e `descricaoSituacao` = `fEmDescricao(...)`, ambas em `includes/contr-emb-confirmacao-comum.i:114/141`.
  Ordem de `fEmResumo` (tabela `contr_emb_etiqueta`): `PRE_SALDO`→`SEM_CONTROLE_INDIVIDUAL`; `CANCELADA`; `DESCARTADA`; `id-bag`→`EM_BAG`;
  ATIVA+ESTAB com inutilização vigente→`INUTILIZADA`; ATIVA+CAMPO→`EM_CAMPO`; `ENCERRADA`; `qtidade-atu = 0`→`ZERADA`; por `tipo-local`:
  CAMPO→`EM_CAMPO`, TRANSITO→`AGUARDANDO_RECEBIMENTO`, TERCEIRO→`EM_TERCEIRO`, ESTAB→`NAO_IMPRESSA` (sem confirmação de impressão),
  `IMPRESSA` (sem recebimento físico no contexto atual) ou `EM_ESTOQUE`; senão `DESCONHECIDA`. Confirmações (`fEmConfirmada`) vêm da
  auditoria `contr_emb_audit` + evento `MANUT_ETIQUETA` CONCLUIDO; o texto de `IMPRESSA` no backend é "Impressa - aguardando recebimento fisico".
- `impressaoConfirmada`/`recebimentoFisicoConfirmado` booleanos; sem os campos (backend antigo) a tela mostra "—"; tipo errado é recusado.
- Posição (`tipoLocal`, `NWM_POSICOES`): `ESTAB`, `CAMPO`, `TERCEIRO`, `TRANSITO`.
- Família com `codigo: ""` (`LS ACESSORIOS CABINA`) é dado da base.

### Histórico da embalagem
- `contr-emb-manutencao.p:302/368` monta `ocorrencia` a partir de `tipo-movto` ou `tipo-evento`; `contr-emb-estorno.p:127/202` confirma
  ajuste, inutilização, perda e correções; `contr-emb-bags.p:377` confirma `DESCARTE_ENVIO_BAG` e movimentos de Bag (lidos em 20/10, CP850).
- `NWM_EVENTOS_HISTORICO` = os 22 códigos de `EVENTOS_EMBALAGEM_BAGS` do Bags (inclui os de teste `NASCIMENTO_TESTE`/`ESVAZIAMENTO_TESTE`,
  que não estão nos `.p`); `NWM_RAIZES_EVENTOS_HISTORICO` = as 8 raízes de evento de Bag. Conferido contra a página publicada de Bags em 20/10.
  Em 23/10, a pedido do usuário: `VINCULACAO_RESERVA_WT` ("Vinculada - Doc. FT4003") e `LIBERACAO_RESERVA_WT` ("Desvinculada - Doc. FT4003").
- Data: `dataEvento` (fallback `dataRegistro`).

### Operações: campos exigidos (lido em 21/10, commit `b26b5f5`)
`includes/contr-emb-api-operacoes.i:88-170` e `includes/contr-emb-operacao-rest.i:153-170`. `usuario`/`estabelecimentosPermitidos` o Dataset
acrescenta; `chaveIdempotente` a tela gera. Todos: `codEstabel`, `natureza`, **`serie` (vazio → `PARAMETRO_INVALIDO`)**,
`chaveIdempotente`, `selecao` (1–100 `{idEtiqueta, versao, quantidade}`, sem repetir, quantidade > 0 com até 4 casas).
- Transferência/Remessa: `valorItem` (número ≥ 0, obrigatório; a tela envia 10 fixo, provisório, `NWM_VALOR_ITEM_PROVISORIO`, desde 22/10). Transferência exige `codEstabelDestino` (≠ origem, mesma empresa);
  Remessa aceita destino **ou** `emitenteDestino`; com destino, o emitente vem dele (informar outro → `EMITENTE_DESTINO_DIVERGENTE`).
- Devolução: `emitenteOrigem`, `serieOrigem`, `numeroOrigem`, `naturezaOrigem` (sem eles → `ORIGEM_INVALIDA`).

### Erros
- Funcionais: `SEM_PERMISSAO`, `FILTRO_INVALIDO`, `FILTRO_CURTO`, `LIMITE_INVALIDO`, `DOCUMENTO_INDISPONIVEL`, `BANCO_NAO_CONECTADO`,
  `CONSULTA_AMPLA` (acima de 5.000 documentos ou 50.000 embalagens candidatas, sem página parcial), `HISTORICO_INCONSISTENTE`.
- O transporte Fluig responde HTTP 200 mesmo com erro: conferir HTTP **e** `sucesso`/`codigoErro`. Erro nunca vira lista vazia.

### Impressão
- `obterDadosImpressao` devolve **uma** etiqueta por chamada (recusa `PRE_SALDO`); lote, cópias e layout **não contratados**.
  Reimpressão não cria identidade nem movimenta saldo.
- Impressora: aplicativo local `http://localhost:32478`, chave `impressora` no `localStorage`, template de teste no GED (documento 423).
  O botão Imprimir hoje só registra `CONFIRMAR_IMPRESSAO` (sem enviar à impressora).
- Lido em 22/10 (`esp/api/v1/controle-embalagens.p:519` `pi-dados-impressao`, `contr-emb-rastreio.p:1809` `obterDadosImpressao`,
  GER-05/DT-072): `GET /dados-impressao?idEtiqueta=` só lê, não imprime nem grava. Recusa `ETIQUETA_NAO_IMPRIMIVEL` (não é `EMBALAGEM`),
  `GERACAO_NAO_CONFIRMADA` (evento de geração não `CONCLUIDO`), `ETIQUETA_NAO_DISPONIVEL` (fora dos estabelecimentos permitidos).
  Devolve os campos da etiqueta (`codEtiqueta`, `item`, `lote`, `validadeLote`, `unidade`, `capacidade`, `quantidadeInicial`, `quantidadeAtual`, `versao`…),
  **sem descrição do item** (vem de `apoiarItens`, já na grade como `descItem`).
- Template 423 (`etiqueta.txt`, EPL2, 370 bytes, cópia em `evidencias/impressao/`): marcadores `##PRODUTO## ##CODIGO## ##LOTE## ##DATAVAL##
  ##CBARRA## ##QTD## ##UN##`. Aplicativo local: `GET /` (status), `GET /impressoras` (`impressoras`, `impressorapadrao`),
  `POST /imprimir` (`impressora`, `template`, `dados`) → `message`. A tela antiga (`pagina_antiga_manutencao_etiquetas/`) usa esse fluxo.
  Conclusão: impressão real não exige API nova. Implementado em 22/10 pelo `print()` do navegador; desde 26/10 volta ao aplicativo local,
  como a tela antiga: `obterDadosImpressao` → `POST /imprimir` com o modelo 423 → `CONFIRMAR_IMPRESSAO` (sem pergunta). Backend sem
  mudança; o registro continua pelo `confirmarEtiqueta` REST (nada do `dsGetExecBO`/`pi-registra-log` da tela antiga). Envelope real de `obterDadosImpressao`
  conferido no TESTE em 22/10 (etiqueta 139: `sucesso`, `total` 1, `temMais` false, `campoCursor` `proximoId`).

### Decisões de projeto (DT)
- DT-093/094: Transferência e Devolução (compra e empréstimo) em **um modal único** pela natureza. Receber é pelo ANFE/Datasul
  (o Fluig não recria a entrada).

## Build e testes
- `.war`: `scripts/entregar.ps1` (usa `pack-widget.ps1`). Último registrado antes da reorganização (20/10): SHA256
  `0e9345bfb61718b4fe4be0ac323ccf533cb7b84bf6da96f83e3a73bfb8f70ffd`, 12 arquivos comparados byte a byte.
- Testes (fora do git): `node testes/rodar-testes.cjs` roda as 5 suítes; em 22/10: `testar-apoios-filtros.cjs` (33), `testar-confirmacao-impressao.cjs` (27),
  `testar-consulta-etiquetas.cjs` (52), `testar-funcoes-manutencao.cjs` (50), `testar-transporte-dataset.cjs` (60), todas sem falha. Alguns leem
  `evidencias/etapa1-20261008/resultado-dataset.json` (fora do git).
- Encoding: JS em CRLF no disco (medido em 20/10; o "LF" de 15/10 é histórico); `.gitattributes` com `eol=crlf`.
