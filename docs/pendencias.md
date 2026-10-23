# Pendências — widget_nw_manutEtiq

> Pendências, perguntas ao usuário e propostas não aprovadas. Ao resolver: tirar daqui e, se for decisão, registrar em `decisoes.md`.
> Pendência registrada não autoriza execução. Conferir o contrato vigente antes de planejar integração.

## Esperando decisão do usuário
- Níveis de acesso: regra implementada em 22/10 (ver `decisoes.md`). Falta só testar ao vivo com um usuário comum (leitura do `colleagueGroup` pela API REST e telas sem Transferir/Devolver); o teste local cobre admin e comum.
- Visão não-ADM: a decisão vigente mantém a tela ADM de aba única.

## Achados no Fluig de TESTE (21/10, estab 10904, item REGLONE; lote 20102026-2 intocado)
Aprovado ao vivo (JS publicado = fonte): validação sem campo vermelho; autocomplete (teclado e clique); overlay só na widget + toast
"Carregando..."; ações por status/regra da embalagem nas 73 etiquetas fora do lote protegido; legenda; Detalhes; Histórico (carregamento
na linha, abre após sucesso, data e badges); Imprimir da linha (linha atualizada, página/rolagem mantidas); Receber; Estornar (filtro
`a9,5x-` → `9,5`, decimal gravado); Inutilizar e estorno da inutilização; Perda e estorno da Encerrada; recusa do backend mantém o modal;
Imprimir em lote; Executar quantidade; Aplicar sem ação / Transferir e Imprimir sem marcadas; modal Transferir (título, série escondida até
validar, natureza vazia/inexistente); fechamento pelo fundo e Esc; nível `admin` para totvsrp.
Aprovado ao vivo em 22/10 (JS `?v=0.1.2`, lotes GER-01 e 20102026-1; lote 20102026-2 do Cheli intocado): código de barras (marca, vai à página 2, avisa se não achar), legenda com 12 status e sem
subtítulo, Detalhes com Fazenda `código - descrição`, Histórico, `nivelAcesso` admin. Não testado ao vivo: Estornar acima da capacidade (nenhuma etiqueta EM_ESTOQUE fora do lote protegido) e hover do vermelho.


## Fora do widget
- Transferência, Remessa e Devolução: o Cheli (dev Progress) está mudando a API. Fora do escopo até a nova API; só o `valorItem` vai fixo em 10 (provisório) em Transferência e Remessa. Remessa testada ao vivo em 22/10 (natureza 5949im, destino 11301, emitente 112267, etiqueta 135): aceita, documento de trabalho 493080, operação 211; usuário confirmou no Datasul que deu certo. Destino 10913 recusado ("Estabelecimento nao autorizado para esta acao"): o Dataset só autoriza 10904 e 11301; ajuste do Dataset fica com o usuário/Cheli. Devolução não testada.
- Série de saída: hoje Select2 com opção fixa `1` (21/10). O Dataset `37d22b1` (22/10) já tem `apoiarSeries`, mas os campos de resposta não estão documentados e o REST ainda não foi provado (LEIA-ME); não ligar a tela sem pedido.
- Autocompletes novos do Dataset (`apoiarNaturezas`, `apoiarEmitentes`, `apoiarEmbalagens`, `apoiarBags`): podem substituir os campos de texto livre do modal Movimentar (natureza, emitente). É só uma proposta, ainda não aprovada.
- Grupos definitivos de autorização (DT-054): por enquanto vale só `DefaultGroup-1` (decisão de 22/10); grupos definitivos e responsável a definir. Desde o Dataset `37d22b1`, o TESTE libera todos os estabelecimentos (`todosEstabelecimentosTeste`), o que deve resolver a recusa do destino 10913. Falta conferir ao vivo.
- Impressão pelo navegador implementada em 22/10 (ver `decisoes.md`). Sem pergunta ao usuário (registro logo após o `print()`). Falta: confirmar o tamanho físico da etiqueta (104 × 50 mm deduzido do modelo EPL 423) e testar numa impressora térmica real; decidir se o botão **Impressora** (modal do aplicativo local `localhost:32478`, usado só no "Testar") sai da tela, já que o Imprimir não usa mais esse aplicativo.
