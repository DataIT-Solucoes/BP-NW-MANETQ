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
subtítulo, Detalhes com Fazenda `código - descrição`, Histórico, `nivelAcesso` admin. Estornar acima da capacidade e hover do vermelho: aprovados em 26/10 (abaixo).


Teste ao vivo em 23/10 (JS `?v=0.1.14`, igual ao fonte; usuário totvsrp/admin; lote 20102026-2 do Cheli intocado, que agora tem 3.000 etiquetas):
- Aprovado: validação sem filtros (toast, sem vermelho); autocomplete de Estabelecimento e Itens; overlay só na widget + toast "Carregando...";
  Detalhes da 135 com "WT Docto - FT4003" = 493080; Histórico da 135 (carregamento na linha, sem overlay global, abre em ~7 s, 1537 px numa janela
  de 1600, badge "Vinculada - Doc. FT4003: 493080", rodapé "Mostrando 1–4 eventos"); Cód Barras De/Até (`139` → `0000000139`, letra → "Digite só
  números...", faixa 139–141 trouxe 139 e 141); cabeçalho fixo (aparece no topo 100 px, ordenar pela cópia funciona, "?" da cópia abre a Legenda
  sem ordenar); Imprimir da linha na 143 (NÃO_IMPRESSA → IMPRESSA, linha atualizada, ficou na página 2).
- **Defeito**: o cabeçalho fixo não acompanha a rolagem horizontal. `ajustarCabecalhoFixo` faz `scrollLeft` no `.tabulator-header` da cópia, mas
  no Tabulator 6 quem rola é o `.tabulator-header-contents` (medido: original 272, cópia 0). Corrigido em 26/10 (`scrollLeft` no `.tabulator-header-contents` da cópia) e aprovado ao vivo na v0.1.15 (janela de
  1350 px, rolagem 0/300/522: cópia igual à original, colunas alinhadas).
- Observações: em janela de 1600 px a tabela já rola na horizontal (colunas 1648 px, espaço 1376 px) e a coluna Ações fica cortada; selos do
  Cód Barras De/Até aparecem truncados "00000001…" (não dá para distinguir); busca 10904/REGLONE sem faixa de etiqueta levou ~3 min (31 chamadas
  de 100, por causa das 3.000 do Cheli); etiquetas 241, 243, 264 e 265 vêm do backend sem zeros à esquerda; o `print()` do navegador trava a
  página até a janela de impressão fechar (o registro só sai depois; esperado do navegador).
- Retomado em 26/10 (v0.1.15, mesma faixa 139–199, 31 etiquetas): **Receber** da 0000000143 aprovado (Impressa → Em estoque, ~5 s,
  só a linha atualizada, botão Receber trocado por Estornar, mensagem "1 embalagem(ns) confirmada(s). Consulta atualizada.").
  Justificativa vazia mostrava o aviso em texto escuro, sem destaque: destacado em 26/10 (ver `decisoes.md`) e aprovado ao vivo na v0.1.16
  (mensagem vermelha com fundo claro, campo com borda vermelha e foco; some ao digitar; no Estornar 143 com 11, só o saldo fica marcado).
- Também aprovado em 26/10 (todas no lote 0112026-1; lote do Cheli fora da busca): Estornar acima da capacidade na 143 (11 > 10: mensagem
  "A quantidade 11 é maior que a capacidade...", sem chamada ao backend); estorno válido 143 10 → 8 (~13 s); Inutilizar 145 (Não impressa →
  Inutilizada, saldo 0) e estorno com saldo 10 (volta a Não impressa); Perda 147 (Impressa → Encerrada, saldo 0, só Detalhes/Histórico/Estornar)
  e estorno com saldo 10 (volta a Impressa); Receber em lote 139 + 141 (Em estoque, ~16 s, "2 embalagem(ns) confirmada(s)"); Executar
  quantidade 25 (marca 139, 141, 145 = 30, pula a 143 por não estar inteira); leitor (149 marcada, campo limpo, foco mantido; reler não
  desmarca; 0000009999 → aviso "não está na lista carregada", valor fica no campo); hover vermelho de Inutilizar e Perda (#C4161C, ícone branco).
- Ação de etiqueta em lote não mostrava o loading global: corrigido em 26/10 (`enviandoAcaoEmLote`, ver `decisoes.md`) e aprovado
  ao vivo na v0.1.16: Receber em lote 147 + 149 (Impressa → Em estoque) com overlay e toast "Carregando..." de 0,3 s a 14,6 s, Buscar
  desabilitado no período, overlay e modal saindo juntos.
- Receber/Estornar/Inutilizar/Perda **clicados na linha** travavam a widget inteira em vez de só a linha: corrigido em 26/10 na v0.1.17
  (ver `decisoes.md`) e aprovado ao vivo: Estornar 143 (8 → 10, 9,6 s), Inutilizar 145 e estorno (volta a Não impressa) pela linha; o modal
  fecha no Confirmar, só a linha carrega (spinner no botão, botões dela desabilitados), sem overlay, filtros/Buscar/outras linhas liberados,
  Buscar durante a ação não dispara a busca, toast "Estornar/Inutilizar: 1 embalagem(ns) confirmada(s)." no fim.
- **Usuário comum** (26/10, v0.1.17, **simulado**: sem login de comum, a página foi recarregada com um script do DevTools que troca o
  usuário só na consulta do `colleagueGroup` por um inexistente; a API real devolveu grupos vazios): `nivelAcesso = comum`; Ação em lote
  sem Transferir e Devolução (option escondida/desabilitada e fora do Select2); nenhuma linha com botão Transferir/Devolver (Em estoque,
  Impressa e Não impressa com as demais ações normais); `aplicarAcao('transferir'|'devolver')` forçado → aviso "Seu nível de acesso não
  permite esta ação.", nenhum modal. Não coberto: login real de um usuário comum (grupos dele no `colleagueGroup`) e a autorização no
  backend (as escritas continuam saindo como o usuário logado).

## Fora do widget
- Transferência, Remessa e Devolução: o Cheli (dev Progress) está mudando a API. Fora do escopo até a nova API; só o `valorItem` vai fixo em 10 (provisório) em Transferência e Remessa. Remessa testada ao vivo em 22/10 (natureza 5949im, destino 11301, emitente 112267, etiqueta 135): aceita, documento de trabalho 493080, operação 211; usuário confirmou no Datasul que deu certo. Destino 10913 recusado ("Estabelecimento nao autorizado para esta acao"): o Dataset só autoriza 10904 e 11301; ajuste do Dataset fica com o usuário/Cheli. Devolução não testada.
- Série de saída: hoje Select2 com opção fixa `1` (21/10). O Dataset `37d22b1` (22/10) já tem `apoiarSeries`, mas os campos de resposta não estão documentados e o REST ainda não foi provado (LEIA-ME); não ligar a tela sem pedido.
- Autocompletes novos do Dataset (`apoiarNaturezas`, `apoiarEmitentes`, `apoiarEmbalagens`, `apoiarBags`): podem substituir os campos de texto livre do modal Movimentar (natureza, emitente). É só uma proposta, ainda não aprovada.
- Grupos definitivos de autorização (DT-054): por enquanto vale só `DefaultGroup-1` (decisão de 22/10); grupos definitivos e responsável a definir. Desde o Dataset `37d22b1`, o TESTE libera todos os estabelecimentos (`todosEstabelecimentosTeste`), o que deve resolver a recusa do destino 10913. Falta conferir ao vivo.
- Impressão pelo navegador implementada em 22/10 (ver `decisoes.md`). Sem pergunta ao usuário (registro logo após o `print()`). Falta: confirmar o tamanho físico da etiqueta (104 × 50 mm deduzido do modelo EPL 423) e testar numa impressora térmica real; decidir se o botão **Impressora** (modal do aplicativo local `localhost:32478`, usado só no "Testar") sai da tela, já que o Imprimir não usa mais esse aplicativo.
