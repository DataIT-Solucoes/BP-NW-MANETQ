# Plano de implementação — Manutenção Embalagens

Data: 08/10/2026. Widget: `widget_nw_manutEtiq`.

## 1. Ponto de partida

| Item | Estado | Evidência |
|---|---|---|
| Dados de exemplo e pré-seleção | Removidos | JavaScript do widget inicia a tabela com `data: []`; seletor de itens sem carga fictícia. |
| Ampliação DT120 no Dataset | Concluída no fonte local | Três apoios novos, filtros De/Até e seleção de documentos. |
| Dataset atualizado no servidor | Publicação informada pelo usuário; consultas verificadas | 27 consultas reais executadas pelo console do Fluig em 08/10/2026, com os resultados esperados. Família sem código confirmada pelo usuário como dado da base, sem pendência. |
| Testes locais da ampliação | Aprovados | Dataset: 44 cenários; transporte: 11; tela de tipos: 28. Total: 83, sem falhas. |
| Compatibilidade das chamadas antigas | Aprovada no recorte local | 1.200 comparações com o fonte anterior, sem diferenças de requisição ou resultado. |
| Widget ligado ao Dataset | Implementado localmente na etapa 4; validação no Fluig pendente | `buscar()` consulta `consultarEtiquetas` e carrega todas as páginas antes de exibir a grade. |
| Operações sobre etiquetas | Indisponíveis por decisão do usuário nesta entrega | Efeitos simulados retirados; somente Detalhes e seleção manual de embalagens disponíveis. |

Os testes locais usam serviço simulado. As consultas reais da etapa 1 foram executadas pelo Dataset publicado, na sessão do Fluig; os resultados e limites da validação estão registrados abaixo. Isso não comprova identidade do fonte publicado com o arquivo local.

O Dataset local conferido tem SHA256 `0523403feb8b93715f460eb73235eb9acbac5cbd41ca7e8e9c2c0eb047d7bb47`. Esse hash identifica o fonte local, sem afirmar comparação com o servidor.

### Referências

- [Contrato DT120 e evidências registradas](MANUTENCAO_ETIQUETAS_DT120_20261007.md).
- [Dataset atual](../widget_nw_embalagens/datasets/dsNwEmbalagens.js): fonte da verdade para ações, campos e permissões.
- [JavaScript da manutenção](src/main/webapp/resources/js/widget_nw_manutEtiq.js).
- [Layout da manutenção](src/main/resources/view.ftl).
- [Recursos do widget](src/main/resources/application.info).
- [Referência de transporte e autocomplete](../widget_nw_embalagens/src/main/webapp/resources/js/widget_nw_embalagens.js).

As orientações antigas do mockup e o estado descrito em `AGENTS.md`/`CLAUDE.md` são históricos nos pontos já superados: dados mockados, filtros sem contrato DT120 e ausência da ampliação do Dataset. Ao implementar, reler o Dataset vigente e considerar as decisões posteriores do usuário.

## 2. Regras para conduzir a implementação

- Ampliar o que existe, preservando os contratos e comportamentos já funcionais das outras telas.
- Manter o padrão visual, a aba única e os filtros visíveis já aprovados.
- Seguir o protótipo das telas **Tipos de Embalagens** (`widget_nw_embalagens`) e **Itens Controlados** (`widget_nw_itensComCtrllDeEmb`) em toda a apresentação, inclusive no loading. Reutilizar os padrões existentes de cabeçalho, filtros, tabela, botões, cores, tipografia, espaçamentos e estados de carregamento, vazio e erro, respeitando os campos e funções próprios da manutenção. Diretriz confirmada pelo usuário após a etapa 1.
- Trabalhar em etapas verificáveis: consulta e apoios primeiro; operações depois.
- Manter usuário, empresa, grupos e estabelecimentos permitidos sob responsabilidade do Dataset.
- Preservar códigos, zeros à esquerda, IDs e identidades fiscais como texto.
- Registrar resultados observados neste roteiro; o que não foi executado permanece pendente.
- Commit e push somente quando solicitados pelo usuário.

## 3. Etapa 1 — validar o Dataset publicado no Fluig

**Concluída em 08/10/2026 no recorte testado.** Foram usadas a sessão real do usuário e a API de consulta de Dataset do Fluig, pelo console da página de manutenção. O usuário confirmou que a família sem código é um dado da base e não requer tratamento nesta tarefa. Ver registro da execução ao final deste documento.

### Consultas a verificar

| Ação | O que verificar |
|---|---|
| `apoiarEstabelecimentos` | Código/descrição e estabelecimentos autorizados. |
| `apoiarItens` | Código/descrição/unidade e contexto de estabelecimento. |
| `apoiarFamilias` | Código/descrição e permissão da manutenção. |
| `apoiarDepositos` | Código/descrição, busca por texto e próxima página. O catálogo é global; não comprova disponibilidade de um item. |
| `apoiarLotes` | Lotes distintos com os recortes de estabelecimento, item e depósito. |
| `apoiarDocumentosEntrada` | Identidade fiscal completa, código opaco, descrições e cursor. |
| `consultarEtiquetas` | Filtros exatos antigos, novos intervalos, notas específicas e paginação. |

Massa citada na DT120, sujeita à confirmação no ambiente atual: estabelecimento `10904`, item `357867`, busca de documentos `999980` e intervalo de notas `9999801` a `9999805`.

1. Conferir a linha externa do Dataset e seu `resultadoJson`: ação correspondente, HTTP, `sucesso`, `codigoErro` e mensagem.
2. Guardar exemplos de respostas reais para mapear a grade e os apoios. Registrar os parâmetros de negócio usados.
3. Consultar uma nota selecionada pelo `codigo` do apoio, sem reconstruir sua identidade.
4. Consultar duas notas na mesma requisição e conferir IDs únicos na resposta.
5. Consumir a segunda página de etiquetas com `aposId` e a de apoios com `aposCodigo`.
6. Verificar vazio válido, falta de permissão e recusa funcional; erro não pode ser apresentado como consulta vazia.
7. Confirmar que as telas de Tipos de Embalagens e Itens Controlados continuam consultando normalmente.

O fonte atual usa `DefaultGroup-1` e estabelecimentos `10904`/`11301` para as consultas da manutenção. Confirmar o funcionamento dessa configuração de TESTE na sessão real; grupos definitivos continuam a definir antes de produção.

**Aceite:** consultas pelo Dataset retornam os envelopes esperados; códigos de documento e cursores são preservados; exemplos reais disponíveis para o mapeamento. Os cinco GETs REST registrados na DT120 não substituem esta verificação pelo Fluig.

## 4. Decisões necessárias para exibir e selecionar dados reais

Estas decisões podem ser tratadas enquanto os apoios e o transporte são preparados. Cada uma condiciona a parte indicada, sem impedir o trabalho independente.

| Decisão | Situação atual | Definição necessária |
|---|---|---|
| Carregamento da tabela | Preservada a decisão de tabela inteira, sem paginação. | Consultas sequenciais por cursor, até 100 por chamada; grade liberada após todas as páginas, sem apresentação parcial como completa. |
| Status da grade e legenda | Definido pelo usuário nesta etapa: Ativa, Encerrada, Cancelada e Descartada na coluna Status. | Posição e Bag nos detalhes; nenhuma inferência de impressão ou de saldo a partir da situação. |
| Notas específicas | Campo atual aceita números separados por vírgula. Contrato exige identidades completas. | Interface adiada por decisão do usuário na retomada de 08/10/2026. Não integrar o texto livre como identidade de documento. |
| Escolher item + Quantidade | Visível e indisponível por decisão do usuário nesta etapa. | Definir elegibilidade no modelo real antes de habilitar. |
| Qtde Sel. | Implementação soma o saldo das etiquetas marcadas. | Confirmar se permanece a soma da quantidade atual ou se deve usar a quantidade inicial. |
| Ações visíveis | Definido pelo usuário: manter indisponíveis, com Detalhes e seleção manual. | Botões de operações desabilitados; nenhuma transição local nem sucesso simulado. PRE_SALDO apenas consultável, fora da seleção de embalagens. |

Proposta para a primeira entrega funcional: consulta, apoios, seleção de notas e detalhes. As operações serão integradas em etapa própria, conforme seus contratos e permissões.

## 5. Etapa 2 — preparar o transporte no widget

**Implementada no fonte local em 08/10/2026; publicação e validação desta camada no Fluig pendentes.** O transporte está no próprio `widget_nw_manutEtiq.js`, em métodos da instância, sem recurso adicional no `application.info`. Ver registro da execução ao final deste documento.

- Adaptar o padrão de `chamarEmbalagens(acao, parametros)` já existente dentro de `widget_nw_embalagens.js`.
- Implementar no contexto da manutenção, sem carregar o JavaScript inteiro da outra tela ou depender de ela estar na mesma página.
- Usar jQuery/`$.ajax` e o endpoint `/api/public/ecm/dataset/search`.
- Enviar `datasetId: "dsNwEmbalagens"` e `filterFields` com `acao` e `parametros` serializado como JSON. O limite externo é uma linha de envelope; o limite de negócio vai em `parametros`.
- Validar o envelope e distinguir erro de transporte, recusa funcional e sucesso vazio.
- Cancelar consultas anteriores quando possível e ignorar respostas antigas após nova busca ou mudança de contexto.
- Manter estado por instância do widget e exibir carregamento/erro/vazio de forma explícita.
- Aplicar o mesmo loading das duas telas de referência, conferindo sua aparência, posição e comportamento durante a consulta. O carregamento deve acompanhar a requisição real e encerrar tanto no sucesso quanto no erro.

No widget de referência, o transporte está no próprio `widget_nw_embalagens.js`. Os arquivos separados `chamar-embalagens.js` e `autocomplete-limitado.js` citados em notas antigas não foram encontrados nos caminhos documentados.

Se a implementação optar por um recurso separado, registrar no `application.info`: os índices atuais são JS 1 e CSS 2; o próximo livre é 3. A localização do recurso será uma escolha da implementação, não uma dependência presumida.

**Aceite:** uma consulta real pode ser executada pelo widget, com estado de carregamento, validação do envelope e proteção contra resposta atrasada.

## 6. Etapa 3 — integrar os apoios dos filtros

**Apoios de Estabelecimento, Item, Depósito, Lote e Família implementados no fonte local em 08/10/2026; publicação e validação no Fluig pendentes.** A interface de notas específicas e a integração de `apoiarDocumentosEntrada` foram adiadas pelo usuário nesta retomada.

Implementação: dez campos De/Até, dois caracteres mínimos, debounce de 350 ms e 20 registros por chamada. As listas exibem código/descrição e oferecem “Carregar mais resultados” pelo cursor, com proteção contra repetição e ciclos. Os campos recebem somente o código, preservado como texto. Item e Depósito recebem estabelecimento exato somente quando De = Até; Lote recebe as faixas de estabelecimento, item e depósito. Mudanças nesses recortes invalidam o apoio e limpam os lotes; códigos de Item/Depósito permanecem, pois são catálogos globais. Respostas atrasadas, cancelamentos e estados de erro/vazio são tratados por campo e instância. Setas, Enter, Escape e Tab controlam as sugestões com ARIA de combobox. O CSS segue a lista de sugestões de Itens Controlados.

Validação local: `node testes/testar-apoios-filtros.cjs` — **29 cenários aprovados**, incluindo reprodução dos envelopes reais dos cinco apoios capturados na etapa 1. `node testes/testar-transporte-dataset.cjs` — **60 cenários aprovados**. São AJAX/DOM simulados; não houve novas consultas ao servidor nem validação visual ao vivo. Sintaxe e `git diff --check` sem erros; fontes, teste novo e plano em UTF-8 sem BOM + CRLF. Dataset, `view.ftl` e `application.info` preservados. Buscar permanece local; integração da grade e operações continuam nas etapas seguintes. Sem commit ou push nesta retomada.

| Campo | Ação | Parâmetros de contexto aceitos pelo Dataset atual |
|---|---|---|
| Estabelecimento | `apoiarEstabelecimentos` | `filtro`, `aposCodigo`, `limite`. |
| Item | `apoiarItens` | Os anteriores e `codEstabel` opcional. Sem ele, o Dataset usa um estabelecimento permitido. |
| Família | `apoiarFamilias` | `filtro`, `aposCodigo`, `limite`. |
| Depósito | `apoiarDepositos` | `codEstabel` opcional, `filtro`, `aposCodigo`, `limite`. |
| Lote | `apoiarLotes` | Os anteriores, `estabelDe/Ate`, `item` exato ou `itemDe/Ate` e `depositoDe/Ate`. |
| Documentos de entrada | `apoiarDocumentosEntrada` | `codEstabel` opcional, `estabelDe/Ate`, `filtro`, `aposCodigo`, `limite`. |

- Consultar a partir de dois caracteres, com debounce e limite de até 20 por chamada.
- Exibir código e descrição nos apoios; nos campos De/Até, preencher somente o código selecionado.
- Consumir `temMais`/`proximoCodigo` para continuar a pesquisa quando houver mais resultados; não tratar a primeira página como catálogo completo.
- Não escolher arbitrariamente um estabelecimento de uma faixa para restringir os apoios. Usar somente os parâmetros aceitos e o contexto autorizado do Dataset.
- Invalidar resultados e seleções dependentes quando o contexto mudar, conforme o campo.
- Código de barras e validade continuam filtros diretos; não precisam de autocomplete.

### Notas específicas

- Guardar o `codigo` devolvido pelo apoio exatamente como recebido.
- Manter uma lista de documentos selecionados, com inclusão/remoção e até 20 identidades.
- Enviar `modoNotas: "ESPECIFICAS"` e `documento` como lista de códigos opacos. O Dataset gera os parâmetros REST repetidos.
- Não enviar simultaneamente `notaDe`/`notaAte` preenchidos.
- Ao trocar para intervalo, a próxima consulta deve enviar somente os parâmetros desse modo; reiniciar o cursor.
- Documento listado no apoio pode não possuir embalagens elegíveis; interpretar o retorno da consulta sem presumir vínculo.

**Aceite:** apoios usam dados reais, respeitam contexto e paginação; documentos com o mesmo número continuam distinguíveis.

## 7. Etapa 4 — integrar Buscar e a tabela

**Implementada no fonte local em 08/10/2026; publicação e validação no Fluig pendentes.** Consulta por item e/ou intervalo de notas, filtros DT120, carga sequencial completa, descrição por apoio de itens e detalhes com situação/posição/Bag. Notas específicas permanecem adiadas conforme decisão anterior do usuário.

Foram usados os campos efetivamente observados nos envelopes da etapa 1. IDs e códigos permanecem textuais; versão numérica e registro original são preservados. A descrição é obtida por `apoiarItens`, reutilizando a seleção do autocomplete quando disponível e conferindo igualdade exata do código. Falha ou ausência de descrição é indicada no rodapé, sem substituir o resultado de etiquetas por vazio. Família e número de nota ausentes no retorno ficam como “—” nos detalhes.

O carregamento usa `limite: 100` e `aposId`, mantendo o loading até concluir páginas e descrições. A grade recebe os dados completos; erros intermediários não liberam seleção sobre lista parcial. Cursor inválido, repetição de IDs, mudança de filtros, nova busca e render tardio são tratados. Seleção manual soma o saldo atual, conforme comportamento anterior, e é limpa ao mudar filtros. `PRE_SALDO` não entra na seleção de embalagens. Operações e seleção por quantidade ficam indisponíveis, inclusive após encerrar o loading; os métodos não alteram dados nem exibem sucesso fictício.

Toda criação e atualização de DOM, seleção de elementos, eventos e classes no widget usam jQuery; removidas as chamadas nativas de DOM e os iteradores nativos dos trechos da interface. `view.ftl` recebeu apenas o texto atualizado da legenda. Dataset e registro de recursos preservados.

Validação local: **35 cenários de consulta + 29 de apoios + 60 de transporte, todos aprovados**. Inclui as duas páginas reais de 20 etiquetas, com 40 IDs únicos, mapeamento das amostras, filtros, vazio, erros, cursores, respostas e renderizações atrasadas, seleção manual, detalhes como texto, operações bloqueadas e renderização com jQuery sem `document`. AJAX, DOM e Tabulator simulados; não houve novas consultas ao servidor nesta etapa. Sintaxe e diff conferidos; UTF-8 sem BOM e CRLF preservados. Sem commit ou push.

O usuário confirmou que o ajuste visual da lista de autocomplete para ocupar a caixa inteira De/Até funcionou. Essa confirmação não substitui a validação da nova integração de Buscar no Fluig.

### Mapeamento dos filtros

| Campo interno atual do widget | Parâmetro de `consultarEtiquetas` |
|---|---|
| `estDe` / `estAte` | `estabelDe` / `estabelAte` |
| `itemDe` / `itemAte` | `itemDe` / `itemAte` |
| `depDe` / `depAte` | `depositoDe` / `depositoAte` |
| `barrasDe` / `barrasAte` | `etiquetaDe` / `etiquetaAte`, conforme o contrato DT120 |
| `loteDe` / `loteAte` | `loteDe` / `loteAte` |
| `validadeDe` / `validadeAte` | `validadeDe` / `validadeAte`, em `YYYY-MM-DD` |
| `familiaDe` / `familiaAte` | `familiaDe` / `familiaAte` |
| `nfDe` / `nfAte` | `modoNotas: "INTERVALO"`, `notaDe` / `notaAte` |
| Documentos selecionados | `modoNotas: "ESPECIFICAS"`, `documento: [codigosOpacos]` |

1. Preservar a validação aprovada: estabelecimento De e Até obrigatórios; Itens ou Nota Fiscal obrigatórios. No modo específico, validar a seleção de documentos, em vez do texto livre antigo.
2. Montar os parâmetros com códigos textuais e datas ISO. Filtros exatos e intervalos podem coexistir por AND; notas específicas são combinadas por OR no backend.
3. Substituir a busca exclusivamente local por `consultarEtiquetas`. O filtro local não pode substituir a busca no servidor sobre o conjunto completo.
4. Mapear os dados a partir do retorno real da etapa 1. A DT120 documenta `idEtiqueta`, `quantidadeInicial`, `quantidadeAtual` e `capacidade`; conferir os demais nomes antes de escrever o adaptador da grade.
5. Preservar a identidade textual, a versão e os dados originais necessários ao detalhe e às futuras operações. Não usar a posição da linha como identidade da etiqueta.
6. Aplicar a apresentação de situação/posição definida com o usuário; adaptar legenda e botões à decisão.
7. Antes de permitir interação com registros reais, retirar o efeito de `aplicarAcao()` que altera status apenas na tela. Ações sem integração não podem apresentar sucesso simulado.

### Paginação e seleção

- Usar `aposId`/`proximoId`, com limite entre 1 e 100. O padrão atual do Dataset é 20.
- Reiniciar cursor e seleção em uma nova busca, mudança de filtros ou de notas.
- Evitar IDs duplicados ao acrescentar páginas; interromper e apresentar erro se o cursor não avançar.
- `total` é o tamanho da página, não a contagem global. O rodapé deve informar a quantidade efetivamente carregada e indicar quando há mais resultados.
- Se houver carregamento sequencial de todas as páginas, apresentar progresso e não indicar resultado completo enquanto houver páginas ou falha intermediária.
- Se for escolhido “Carregar mais”, deixar explícito que ordenação, marcação de todos e seleção por quantidade operam sobre os registros carregados. Não afirmar ordenação global dos registros ainda não consultados.
- Atualizar “Itens selecionados” a partir das etiquetas realmente marcadas, conforme a regra de quantidade confirmada.

**Aceite:** filtros executados pelo servidor, grade fiel à resposta, detalhe com dados reais, paginação conforme a decisão e ausência de resultados ou ações fictícias.

## 8. Etapa 5 — validar a primeira entrega no Fluig

- Consultar por item, por intervalo de notas e por notas específicas.
- Conferir os demais intervalos com massa conhecida e validar o tratamento de intervalos invertidos/datas inválidas.
- Verificar segunda página, mudança de filtro, repetição de clique e respostas fora de ordem.
- Conferir IDs únicos, zeros à esquerda, acentos, datas e quantidades.
- Testar seleção de linhas, resumo por item e limpeza da seleção entre buscas.
- Validar vazio, erro funcional, falha de rede e falta de permissão.
- Confirmar a consulta de Tipos de Embalagens e Itens Controlados após a publicação.
- Comparar a manutenção com o protótipo das duas telas de referência: loading, cabeçalho, filtros, tabela, botões, cores, tipografia, espaçamentos e estados de vazio/erro devem seguir o mesmo padrão.
- Registrar os parâmetros, resultados observados e pendências. Volume e desempenho exigem medição real; aprovação local não comprova esses pontos.

**Entrega desta etapa:** consulta de manutenção funcionando com dados reais no Fluig e evidências do recorte validado.

## 9. Etapa posterior — impressão e movimentações

Tratar depois da consulta, com as decisões e permissões de cada operação.

| Função | Contrato disponível / pendência |
|---|---|
| Detalhes | Usar os dados carregados. Histórico de movimentos depende de contrato próprio. |
| Impressão | `obterDadosImpressao` consulta uma etiqueta. Layout, serviço de impressão, cópias e comportamento em lote continuam a definir. |
| Transferência / Devolução | Planejar o modal único por natureza: `classificarNatureza`, `consultarEmbalagensOrigem` quando necessário, e o comando correspondente. |
| Receber | O recebimento pertence ao ANFE/Datasul. Definir o destino da ação legada na interface. |
| Estornar / Descartar | Sem contrato de operação confirmado para a tela; dependem de definição com o usuário/backend. |

`obterDadosImpressao`, as consultas operacionais e os comandos de movimentação não estão liberados pelas novas regras de consulta da manutenção. As escritas habilitadas atuais continuam limitadas aos cadastros de tipos e parâmetros. Qualquer liberação posterior deve ser específica para a operação e seu contexto.

Para comandos futuros: preservar versão e chave idempotente, bloquear envio duplicado e consultar o resultado de operação incerta antes de repetir. O backend define natureza fiscal e elegibilidade; não fixar códigos de natureza no widget.

## 10. Acompanhamento

- [x] Remover dados mockados e pré-seleção.
- [x] Ampliar o Dataset preservando os contratos anteriores.
- [x] Executar testes locais da ampliação e compatibilidade.
- [x] Atualizar Dataset no servidor — informado pelo usuário.
- [x] Validar consultas pelo Dataset publicado e obter amostras reais — 27 consultas com resultados esperados.
- [x] Esclarecer o registro de família com código vazio — usuário confirmou que é da base e não requer ação.
- [x] Preservar tabela inteira e definir apresentação dos status — situação real na grade; posição/Bag nos detalhes. Seleção de notas permanece adiada.
- [x] Preparar transporte no widget — fonte local e 60 cenários aprovados.
- [ ] Publicar o widget e validar o transporte e o loading novos no Fluig.
- [x] Integrar os apoios de Estabelecimento, Item, Depósito, Lote e Família — fonte local e 29 cenários aprovados.
- [ ] Integrar seleção de documentos de entrada — interface adiada pelo usuário em 08/10/2026.
- [x] Integrar Buscar por item/intervalo de notas, mapeamento da grade e detalhes — fonte local; 35 cenários aprovados.
- [x] Adequar seleção manual e retirar efeitos simulados das ações — operações e seleção por quantidade indisponíveis por decisão do usuário.
- [ ] Validar a primeira entrega no Fluig.
- [ ] Definir e implementar impressão e movimentações em etapas próprias.

### Registro das próximas execuções

Preencher ao concluir cada etapa: data, arquivos alterados, consultas/testes executados, resultado observado e pendências. Marcar as caixas somente com evidência ou informação explícita do usuário.

### Execução da etapa 1 — 08/10/2026

Página: `http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/ManutencaoDeEmbNew`. Sessão exibida: `totvsRP consultoria`. Consultas executadas no DevTools com `console.log`, via POST de pesquisa em `/api/public/ecm/dataset/search`, Dataset `dsNwEmbalagens`. Somente ações de leitura foram chamadas.

**Resultado: 27/27 consultas com envelope e resultado esperados.** Quatro cenários esperavam recusa funcional; não são consultas de sucesso. Todos os HTTPs do transporte Fluig foram 200, reforçando a necessidade de conferir também `sucesso` e `codigoErro`.

| Verificação | Evidência observada |
|---|---|
| Estabelecimentos e itens | `10904` / JOÃO PAULO BRANCO PERES E OUTROS; `357867` / REGLONE / LT. |
| Famílias | Duas páginas, 40 códigos distintos; um código vazio na primeira página, descrito abaixo. |
| Depósitos | Duas páginas de 20, sem repetição; cursores `228` e `503`. |
| Lotes | Quatro lotes; paginação forçada em duas páginas de dois, sem repetição. Contexto: estabelecimento `10904`, item `357867`, pesquisa `011`. |
| Documentos de entrada | Quatro documentos para pesquisa `999980`; paginação em duas páginas de dois, sem repetição, preservando cursor opaco. |
| Etiquetas por filtros exatos e intervalo de item | Ambas responderam com 20 registros e próxima página, estabelecimento `10904`, item `357867`. |
| Intervalo de notas `9999801` a `9999805` | Duas páginas de 20; 40 IDs únicos, última página com `temMais: false`. |
| Nota específica `9999801` | 15 etiquetas, consulta completa. Repetir a identidade no parâmetro não duplicou etiquetas nem alterou o conjunto de IDs. |
| Nota específica `9999802` | 25 etiquetas, consulta completa. |
| Duas notas específicas na mesma chamada | 40 etiquetas, sem duplicação; IDs exatamente iguais à união das duas consultas individuais. |
| Vazio válido | Etiqueta inexistente: `sucesso: true`, `total: 0`. |
| Estabelecimento não autorizado | `SEM_PERMISSAO` para `ZZDT120`. |
| Notas específicas sem documento | `FILTRO_INVALIDO`. |
| Validade invertida e data impossível | Dois retornos `FILTRO_INVALIDO`, inclusive `2032-02-31`; HTTP do serviço 200 com erro funcional. |
| Regressão das consultas antigas | `consultarTipos` e `consultarParametros` responderam com sucesso. |
| Regressão pelas telas | Após clicar Buscar em cada tela, Tipos de Embalagens e Itens Controlados concluíram o carregamento com três registros cada. Em Tipos: PL, Z9P e Z9R. Em Itens: 10904/357867, 10904/365131 e 11301/357867. |

Identidades fiscais recebidas do apoio e utilizadas sem reconstrução:

- Nota `9999801`: `5:109044:25081:17:99998016:1101IS`.
- Nota `9999802`: `5:109044:25081:17:99998026:1101IS`.

**Observação encerrada por orientação do usuário em 08/10/2026:** `apoiarFamilias`, pesquisa `in`, devolveu `{ "codigo": "", "descricao": "LS ACESSORIOS CABINA" }`. O usuário confirmou que esse registro é da base e orientou desconsiderá-lo como pendência. Não requer correção nesta tarefa nem impede a conclusão da etapa 1. A evidência original foi preservada.

#### Campos reais para o futuro adaptador da grade

Na amostra de `consultarEtiquetas`, foram observados `idEtiqueta` e `codEtiqueta` como texto, `item`, `codEstabel`, `deposito`, `lote`, `validadeLote`, `unidade`, `quantidadeInicial`, `quantidadeAtual`, `capacidade`, `situacao`, `tipoLocal`, `tipoControle`, `idBag` e `versao`. `versao` veio numérica. Exemplo: ID `67`, etiqueta `0000000067`, situação `CANCELADA`, posição `ESTAB`, quantidade inicial 10, atual 0 e versão 3.

Essa amostra não contém descrição do item, família ou número da nota. O preenchimento dessas informações na grade/detalhe ainda precisa ser definido; não presumir os nomes legados do mockup no retorno real. Os registros completos estão na evidência JSON.

#### Evidência e alcance

- [Parâmetros, envelopes, respostas e conferências dos 27 testes](evidencias/etapa1-20261008/resultado-dataset.json).
- [Registro das consultas pelas telas existentes](evidencias/etapa1-20261008/regressao-telas.txt).
- SHA256 do JSON: `71db146b929a310da18a894ae581e9bf3e2fe8e284ce730b6a35626efad0775e`.
- No navegador, os dados completos ficaram em `window.nwmEtapa1`; os logs usam os identificadores `DT120_TESTE` e `DT120_LOTE2_FIM`.
- Os intervalos positivos de item/estabelecimento e de notas foram exercitados. A correção de todos os demais intervalos, sob todas as combinações, não foi comprovada por estes 27 cenários.
- Permissões foram verificadas apenas nesta sessão e no recorte informado; não é um aceite da configuração de produção ou de todos os perfis.
- Não foram executadas impressão, movimentações, inclusões, alterações ou exclusões. Código do widget e Dataset preservados durante esta validação.

### Implementação local da etapa 2 — 08/10/2026

Arquivos: `src/main/webapp/resources/js/widget_nw_manutEtiq.js`, `src/main/webapp/resources/css/widget_nw_manutEtiq.css` e `testes/testar-transporte-dataset.cjs`.

- `chamarEmbalagens(acao, parametros)` é método da instância da manutenção. Usa `$.ajax`, POST de pesquisa no Dataset e uma linha externa de envelope; não interfere na função de outras telas.
- Valida ação, JSON, resultado funcional, HTTP Datasul, lista, total, indicação de próxima página e cursor. Preserva códigos, identidades fiscais, IDs e o envelope original.
- `consultarDataset(acao, parametros, canal)` gerencia o estado da consulta. O canal padrão `tabela` controla o loading; os apoios poderão usar um canal próprio por campo, como `itemDe` ou `familiaAte`.
- Distingue sucesso, vazio válido, erro técnico, recusa funcional, falta de autorização e cancelamento. Uma recusa não se transforma em lista vazia.
- Nova consulta cancela a anterior do mesmo canal. Mudança de filtros ou de modo da nota invalida consultas em andamento. Resposta antiga é ignorada mesmo se o abort não interromper a requisição.
- Loading com o mesmo anel, medidas, cores e fundo das telas de referência; `role="status"`, `aria-busy` e botões de consulta/execução desabilitados durante a chamada da tabela. Sucesso, erro e cancelamento encerram o loading. Mensagens externas são renderizadas como texto.
- A conexão do botão Buscar aos parâmetros reais, a carga das páginas e o adaptador da grade permanecem na etapa 4. Esta etapa fornece o método de consulta e não carrega etiquetas automaticamente nem altera os registros da tabela.

**Validação local:** `node testes/testar-transporte-dataset.cjs` — 60 cenários aprovados, incluindo reprodução dos 27 envelopes capturados na etapa 1, contratos inválidos, falhas HTTP/rede/JSON/timeout, cancelamento, resposta atrasada, independência entre campos e instâncias, preservação de códigos e mensagem tratada como texto. AJAX e DOM são simulados nesses testes; não são 60 chamadas novas ao servidor.

**Pendente no ambiente:** publicar o widget e conferir a chamada pelo método da instância, o loading e os estados usando o jQuery e o Tabulator reais do Fluig. O Dataset não foi alterado nesta etapa. Próxima implementação: etapa 3, apoios dos filtros.
