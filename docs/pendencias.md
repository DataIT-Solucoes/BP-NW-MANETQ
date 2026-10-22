# Pendências — widget_nw_manutEtiq

> Pendências, perguntas ao usuário e propostas não aprovadas. Ao resolver: tirar daqui e, se for decisão, registrar em `decisoes.md`.
> Pendência registrada não autoriza execução. Conferir o contrato vigente antes de planejar integração.

## Esperando decisão do usuário
- Níveis de acesso (`admin`/`comum`, `nivelAcesso`): o usuário ainda não definiu o que cada nível pode fazer (22/10). Hoje só aparece no console; até a definição, a tela não muda por nível.
- Visão não-ADM: a decisão vigente mantém a tela ADM de aba única.

## Achados no Fluig de TESTE (21/10, estab 10904, item REGLONE; lote 20102026-2 intocado)
Aprovado ao vivo (JS publicado = fonte): validação sem campo vermelho; autocomplete (teclado e clique); overlay só na widget + toast
"Carregando..."; ações por status/regra da embalagem nas 73 etiquetas fora do lote protegido; legenda; Detalhes; Histórico (carregamento
na linha, abre após sucesso, data e badges); Imprimir da linha (linha atualizada, página/rolagem mantidas); Receber; Estornar (filtro
`a9,5x-` → `9,5`, decimal gravado); Inutilizar e estorno da inutilização; Perda e estorno da Encerrada; recusa do backend mantém o modal;
Imprimir em lote; Executar quantidade; Aplicar sem ação / Transferir e Imprimir sem marcadas; modal Transferir (título, série escondida até
validar, natureza vazia/inexistente); fechamento pelo fundo e Esc; nível `admin` para totvsrp.
- **Busca ampla lenta**: sem filtro de lote, 3.083 etiquetas em ~2 min (31 chamadas de 100), tela bloqueada o tempo todo.
- **Coluna Ações fora da tela em 1366px** (Status também); em 1600px aparece cortada; só cabe em 1920px. Fazenda truncada.
- **Marcar todos marca todas as páginas** (73 com 20 visíveis), inclusive Cancelada/Descartada; a doc diz "só o visível". Confirmar a regra.
- Histórico: modal estreito, colunas Atual e Justificativa só com rolagem horizontal.
- Recusa do backend com mensagem técnica genérica (`ETIQUETA_INDISPONIVEL: Confira contexto, versao...`) ao estornar acima da capacidade;
  a tela não valida saldo final > capacidade antes de enviar.
- Detalhes mostra Fazenda só com o código (`10904`); a grade mostra `código - descrição`.
- Modal de ação de etiqueta não mostra qual etiqueta (só "1 embalagem(ns)").
- Texto `widget_nw_manutEtiq.js:3728` ainda cita "valor por item" (campo removido em 21/10).
- Legenda: subtítulo fala em "desta consulta" mas a lista é fixa.
- Sugestões de Lote repetem o código como descrição (`01102025-2 01102025-2`); opção do autocomplete sem separador no nome acessível.
- `versao` da linha não muda após confirmar impressão (a tela reconsulta a versão antes de cada ação, sem efeito prático).
- Dados: etiquetas 241, 243, 264, 265 com código sem zeros (ordenação por Etiqueta fica fora de ordem); lote 20102026-1 com 1009 por embalagem.

## Confirmar no Fluig de TESTE (pendente)
- Transferência, Remessa e Devolução: falta uma natureza de saída válida no 10904 (e documento de origem para Devolução). Hoje o Dataset
  tem `valorItem` em `obrigatorios` de `criarTransferencia`/`criarRemessa` e a API recusa sem ele (`VALOR_INVALIDO`); ajuste a cargo do backend.
- Transferir/Remessa/Devolução e lote > 10 recarregam a grade inteira (podem voltar ao topo): proposta de recarga com `replaceData` não aprovada.
- Nível de acesso de usuário comum (leitura do `colleagueGroup` pela API REST).
- Impressora: teste real depende do aplicativo local (`localhost:32478`), ausente na máquina do teste.
- Hover por ação, contraste das cores dos status e caixa de mensagem vazia escondida (`:empty`): conferência visual.
- Desempenho em produção não medido.

## Fora do widget
- Série de saída: hoje Select2 com opção fixa `1` (21/10). Aguardando o Cheli (dev Progress) criar a API que lista as séries válidas (22/10); sem contrato ainda, não ligar a tela.
- Grupos definitivos de autorização (DT-054), responsável a definir. Dataset mantém `DefaultGroup-1` e estabelecimentos 10904/11301.
- Modelo/serviço e fluxo completo de impressão real: a definir com o usuário.
- Origem da aprovação funcional do commit de 16/10 não comprovada; perguntar ao usuário se uma decisão nova depender dela.
- Remoto: `origin` = `HumbertoAlcantaraArruda/BP-NW-MANETQ`; destino registrado `DataIT-Solucoes/BP-NW-MANETQ`. Trocar só com autorização.
