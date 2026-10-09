# DT120 — apoios e filtros da manutenção de etiquetas

Preparado em fonte em07/10/2026, a partir das três imagens fornecidas pelo responsável. **Ainda exige compilação e aceite no OpenEdge12.2/REST TESTE.** Nenhuma ação fiscal ou alteração de frontend neste lote. Dataset/Widget reais são mantidos por Humberto; este documento orienta chamadas, sem indicar substituição por snapshot local.

Base: `/dts/datasul-rest/resources/prg/esp/v1/controle-embalagens`.

## 1. Apoios

| Campo | GET | Fonte e significado |
|---|---|---|
| Estabelecimento | `/apoios/estabelecimentos` | Existente: código ou descrição, contexto autorizado. |
| Item | `/apoios/itens` | Existente: código ou descrição, unidade. |
| Família | `/apoios/familias` | Existente: código ou descrição. |
| Depósito | `/apoios/depositos` | Novo: cadastro global `mgcad.deposito.cod-depos/nome`, comprovado em `referencias/cd-ressuprimento.p:474`. Não afirma disponibilidade ou elegibilidade de item/depósito. |
| Lote | `/apoios/lotes` | Novo: lotes distintos das embalagens nas posições atualmente autorizadas; filtra estabelecimento/item/depósito. Não é catálogo de todo saldo do ERP. |
| Notas específicas | `/apoios/documentos-entrada` | Novo: documentos `mgmov.docum-est`, número contendo texto literal; devolve identidade fiscal completa, emitente/estabelecimento descritos, datas e situação/contagem de rastreio. Inclui documentos sem embalagens. |

Novos apoios: `usuario`, `estabelecimentoPermitido` repetido, `filtro`2–100 caracteres, `limite`1–20 (ausente/0=20), `aposCodigo` exclusivo. `codEstabel` opcional, quando informado deve estar autorizado; intervalos `estabelDe/estabelAte` recortam lotes/documentos. Para lotes: `item` exato ou `itemDe/itemAte`, `depositoDe/depositoAte`. Depósito é catálogo global condicionado à autorização de consulta. Comparações textuais de busca aplicam `CAPS`; curingas digitados são literais. Código de barras e datas continuam filtros diretos, sem exigir consulta de autocomplete.

Envelope: `sucesso`, `codigoErro`, `mensagem`, `dados`, `total` da página, `temMais`, `proximoCodigo` (vazio no fim). Lote/depósito retornam `codigo` e `descricao`. Documento acrescenta campos do cabeçalho DT119 e `codigo` opaco, formado pela identidade completa. **Guardar o `codigo` exatamente como retornado**; exibir número/série/emitente/estabelecimento/natureza para distinguir notas iguais. Não construir a identidade apenas a partir do número nem usar `idEvento` como identidade fiscal.

Exemplos de consulta em TESTE (usuário/contexto de demonstração; na integração vêm da sessão/grupos):

```text
/apoios/depositos?usuario=super&estabelecimentoPermitido=10904&codEstabel=10904&filtro=in&limite=20
/apoios/lotes?usuario=super&estabelecimentoPermitido=10904&codEstabel=10904&item=357867&filtro=011&limite=20
/apoios/documentos-entrada?usuario=super&estabelecimentoPermitido=10904&estabelDe=10904&estabelAte=10904&filtro=999980&limite=20
```

## 2. GET /etiquetas ampliado

Preserva a rota e o JSON atual, inclusive IDs textuais, `quantidadeInicial`, `quantidadeAtual`, `capacidade`, lote/validade, posição, situação e versão. Chamadas antigas com filtros exatos continuam na procedure original; filtros novos acionam `consultarEtiquetasManutencao` no módulo de recebimentos, reutilizando a correlação DT119. Nenhuma assinatura antiga alterada.

| Campo da tela | Parâmetros inclusivos |
|---|---|
| Estabelecimento | `estabelDe`, `estabelAte` |
| Item | `itemDe`, `itemAte` |
| Depósito | `depositoDe`, `depositoAte` |
| Código de barras/etiqueta | `etiquetaDe`, `etiquetaAte` |
| Lote | `loteDe`, `loteAte` |
| Validade | `validadeDe`, `validadeAte`, datas `YYYY-MM-DD` |
| Família | `familiaDe`, `familiaAte`, campo nativo comprovado `mgcad.item.fm-codigo` |
| Nota por intervalo | `modoNotas=INTERVALO`, `notaDe`, `notaAte` |
| Notas específicas | `modoNotas=ESPECIFICAS` e `documento` repetido, uma identidade opaca por seleção |

Também preservados: `codEstabel`, `item`, `codEtiqueta`, `lote`, `codTipo`, `tipoControle`, `tipoLocal`, `situacao`, `idBag`, `aposId`, `limite` (1–100; ausente/0=20). Exatos e intervalos são combinados por AND. Códigos/números são comparados como texto do cadastro, preservando zeros; usar os valores retornados, sem completar/truncar por inferência.

**Notas:** as específicas formam OR; demais filtros são AND. A embalagem entra uma vez mesmo vinculada a duas notas selecionadas. Um ou até20 códigos; seleções repetidas são deduplicadas. Modo específico sem nota, chave malformada, mistura de específico/intervalo e intervalos invertidos são recusados. O número no intervalo pode abranger diferentes séries/emitentes; o backend resolve cada identidade completa.

Participação fiscal é a do ciclo confirmado não compensado do recebimento. Documento sem rastreio ou com somente ciclos desfeitos não fornece embalagens a essa manutenção; o monitor continua sendo a consulta histórica dos ciclos compensados. Histórico inconsistente/pending não vira lista vazia. Posição/saldo da embalagem são os **atuais**, sujeitos também à autorização dessa posição, e podem diferir do recebimento. Isso não afirma que a nota selecionada seja o último recebimento global da etiqueta. Autorização é conferida no documento e na embalagem; seleção de documento proibido/inexistente retorna a mesma recusa genérica.

Paginação por `idEtiqueta`, cursor `aposId` exclusivo **depois** de todos os filtros. `total` é tamanho da página, sem contagem global. Mudança de filtro, notas ou permissão reinicia cursor. A consulta não grava seleção/evento nem altera quantidade.

Exemplos:

```text
/etiquetas?usuario=super&estabelecimentoPermitido=10904&estabelDe=10904&estabelAte=10904&itemDe=357867&itemAte=357867&depositoDe=INS&depositoAte=INS&validadeDe=2032-01-01&validadeAte=2033-12-31&limite=20
/etiquetas?usuario=super&estabelecimentoPermitido=10904&estabelDe=10904&estabelAte=10904&modoNotas=INTERVALO&notaDe=9999801&notaAte=9999805&limite=20
```

Montagem de seleção específica (somente contrato de chamada; não substitui Dataset publicado):

```javascript
const query = new URLSearchParams({ modoNotas: "ESPECIFICAS", limite: "20" });
notasSelecionadas.forEach(nota => query.append("documento", nota.codigo));
// GET /etiquetas? + query; contexto autorizado acrescentado pelo Dataset real.
```

Datas usam ISO; valores de `modoNotas` exatamente `INTERVALO`/`ESPECIFICAS`. `tipoControle`: `EMBALAGEM`/`PRE_SALDO`; `tipoLocal`: `ESTAB`/`CAMPO`/`TERCEIRO`/`TRANSITO`; `situacao`: `ATIVA`/`ENCERRADA`/`CANCELADA`/`DESCARTADA`. Rótulos visuais de impressão/saldo não são automaticamente situações ABL. Quantidade, situação e posição continuam dimensões distintas. Nenhuma modificação nos comandos individuais/em lote.

## 3. Fontes, dependências e execução

Arquivos entregues:

- `fontes/progress/contr-emb-recebimentos.p` e novo include `fontes/progress/includes/contr-emb-manutencao-consulta.i`.
- `fontes/progress/esp/api/v1/controle-embalagens.p`.
- `testes/t04/testar-manutencao-consulta.p` e `testes/t04/compilar-manutencao-save.p`.

Runtime lógico `esp/api/v1/contr-emb-recebimentos.r`; fallback lógico existente do pacote para a sessão TESTE. Nenhum caminho absoluto novo em fonte definitivo. Include não possui `.r` próprio. SAVE compila quatro `.p`, incluindo o compilador; include compilado com núcleo. Sem alterações nos contratos/ensaios DT119 já aceitos, schema, hooks ou fatos fiscais. Nova revisão do módulo requer seu próprio SAVE e regressão dirigida.

**O pacote contém `.r` históricos preservados a pedido do responsável. Para esta revisão copiar somente os cinco fontes acima**, ou sobrepor apenas `.p/.i` preservando `.r` do servidor; não copiar binários históricos sobre os ativos. Não é necessário copiar repasses/implementação de Fluig. Em TESTE:

```abl
RUN "_bp/api/ET-01_TESTE/testes/t04/compilar-manutencao-save.p".
```

Exigir `FONTES=4 FALHAS=0`, relatório `compilacao-manutencao-dt120-save.txt` em `SESSION:TEMP-DIRECTORY`. Somente depois:

```abl
RUN "_bp/api/ET-01_TESTE/testes/t04/testar-manutencao-consulta.r"
    (INPUT "10904", INPUT "999980").
```

Sonda readonly: contexto, intervalo, data inválida, seleção vazia/malformada/proibida, filtro curto/limite/vazio, nota específica, união de duas notas/duplicata, repetição, cursor e apoios. Compara etiquetas com oracle independente por campos fiscais/eventos/movimentos e posição atual, sem reutilizar o hash do núcleo. Massa insuficiente é `PENDENCIAS`, não aceite positivo inventado. Relatório `resultado-manutencao-dt120.txt`; exigir falhas0 e analisar pendências antes de publicar.

Após aceite, publicar **somente dois `.r` novos do servidor** (núcleo recebimentos e adaptador) nos respectivos `esp/api/v1` de TESTE e renovar somente PASOE TESTE pela rotina vigente. Validar três GETs de apoio e GET etiquetas pelos novos filtros. Não repetir recebimento/estoque/cancelamento.

## 4. Limites e estado

Leitura defensiva: até5000 documentos candidatos e50000 embalagens candidatas por chamada; exceder retorna `CONSULTA_AMPLA`, sem página parcial. Desempenho em volume e plano de índices ainda precisam de medição no ambiente; guardas de aplicação não comprovam custo do otimizador. Documentos de entrada usam a mesma fonte/correlação comprovada de DT119; não implementam fila XML ANFE nem elegibilidade de devolução.

Erros funcionais: `SEM_PERMISSAO`, `FILTRO_INVALIDO`, `FILTRO_CURTO`, `LIMITE_INVALIDO`, `DOCUMENTO_INDISPONIVEL`, `BANCO_NAO_CONECTADO`, `CONSULTA_AMPLA`, `HISTORICO_INCONSISTENTE`; falha técnica sanitizada. Autorização da sessão/grupos é reconstruída no Dataset real, nunca concedida por parâmetro do Widget.

Fonte preparado e checagem local não substituem compilação/aceite nativos, REST ou integração Fluig. Os dois cadastros já aceitos não são reabertos por esta entrega. Localização/grupo e apoios de telas operacionais que não aparecem nestes prints continuam no levantamento próprio; sem mudança de escopo por inferência.

## 07/10/2026 18:20 — DT120-R2 aprovado em ABL
SAVE OpenEdge12.2 FONTES4/FALHAS0 e sondaR2 TOTAL24/FALHAS0/PENDENCIAS0/PERSISTIDOno comprovados nos TXT. Autorizacao, intervalos, identidade fiscal, nota especifica, vinculo independente, repeticao, limite/cursor, uniao sem duplicacao e apoios deposito/lote CAPS aprovados no recorte executado. Evidencia docs/entregas/evidencias/dt120-r2-20261007-182052. Proximo publicar somente os dois .r novos gerados no servidor TESTE (contr-emb-recebimentos e controle-embalagens) no runtime esp/api/v1, renovar PASOE TESTE pela rotina vigente e validar tres apoios/GET etiquetas novos pelo proxy. Nao recompilar nem repetir fatos fiscais. REST/Fluig e volume continuam pendentes; Dataset real mantido por Humberto, sem substituicao por snapshot local.

## 07/10/2026 — DT120 REST TESTE: cinco consultas comprovadas
Retornos fornecidos pelo responsavel via proxy8190: deposito filtroin20linhas/temMaistrue/cursor228; lotes10904/item357867/filtro011 quatro distintos/fim; documentos filtro999980 quatro identidades completas/acentos corretos; etiquetas intervalo9999801..9999805 primeira pagina20/cursor159/temMaistrue; especifica9999801 total15/15IDsunicos121..149/eventogeracao199/estab10904/temMaisfalse. Todos sucesso=true/codigoErro vazio. Evidencia docs/entregas/evidencias/dt120-rest-20261007 (JSONs04/05 integrais; demais resumo dos retornos da conversa). SAVE4/0 e ABL24/0/PENDENCIAS0 preservados. Cinco chamadas REST aceitas neste recorte; multiplas notas pelo proxy, segunda pagina REST, demais intervalos/recusas REST e desempenho em volume nao comprovados por estes retornos. Proximo repassar contrato DT120 ao Humberto para consumir apoios e filtros no Dataset/Widget reais, sem substituir snapshot local; apoiar lacunas backend conforme integracao. Nao recompilar/publicar/repetir fatos fiscais. GATEC/anulacao permanecem pendentes separados.
