# Pendências — widget_nw_manutEtiq

> Pendências, perguntas ao usuário e propostas não aprovadas. Ao resolver: tirar daqui e, se for decisão, registrar em `decisoes.md`.
> Pendência registrada não autoriza execução. Conferir o contrato vigente antes de planejar integração.

## Esperando decisão do usuário
- Níveis de acesso (`admin`/`comum`, `nivelAcesso`): o que muda na tela para o `comum` (hoje só aparece no console).
- Comportamento do campo Código de barras (`data-leitor-cod-barras`): hoje só visual.
- Qtde Sel.: soma do saldo (`qtidadeAtu`) ou da quantidade inicial.
- Visão não-ADM: a decisão vigente mantém a tela ADM de aba única.
- `testes/` e `evidencias/` no git: manter fora dos commits até decisão.
- Limpeza opcional de `situacoesApresentadas()`, `textoQuantidadeEtiquetas()` e do modal Mais ações (sem uso na linha).
- Subir `application.version` a cada publicação para evitar cache do JS (`?v=0.1.0`): sugestão, não autorizada.
- Status `CANCELADA` na legenda: reavaliar a legenda atual antes de decidir.

## Confirmar no Fluig de TESTE (nada visto ainda)
- Sem `valorItem` na tela (21/10): hoje o Dataset tem `valorItem` em `obrigatorios` de `criarTransferencia`/`criarRemessa`
  e a API recusa sem ele (`VALOR_INVALIDO`). Transferência/Remessa só passam depois do ajuste no backend/Dataset (a cargo do backend).
- Atualização só da linha após ação de etiqueta: rolagem/página mantidas; backend devolve a embalagem ao filtrar por
  `codEstabel` + `codEtiqueta` junto com os filtros da busca (lido em `contr-emb-manutencao-consulta.i:194`, não visto ao vivo).
- Transferir/Remessa/Devolução e lote > 10 ainda recarregam a grade inteira (podem voltar ao topo): proposta de recarga com `replaceData`
  não aprovada.
- Carregamento na linha (Imprimir e Histórico clicados na tabela): sem overlay/toast, botões da linha desabilitados, barra na base
  da linha e spinner no botão; após o Imprimir, a grade recarrega sem piscar e a linha volta ao normal.
- Nível de acesso no console: usuário do `DefaultGroup-1` → `admin`, outro → `comum`. Confirmar que usuário comum consegue ler o
  dataset `colleagueGroup` pela API REST (se não conseguir, cai em `comum` por falha da consulta).
- Confirmação de impressão pelo botão e pela ação em lote: Não impressa recebe o status real do backend após `CONFIRMAR_IMPRESSAO`
  (não imprime papel). Nenhum comando real executado na implementação.
- Coluna Ações: alinhamento à esquerda, largura 320px e Imprimir inteiro como primeiro botão de `NAO_IMPRESSA`.
- Fechamento pelo fundo nos sete modais, hover por ação, borda verde permanente dos botões e ausência da mensagem "Em lote...".
- Badges de Ocorrência no Histórico da embalagem com o mapa/cores de Bags; Data em `DD/MM/AAAA - HH:MM`.
- Overlay da widget + toast "Carregando..." no Buscar e no Histórico, retirados ao terminar/falhar/cancelar; Histórico abre só após sucesso.
- Fazenda `código - descrição` (nome do cadastro, 260px); colunas Tipo de Embalagem (`codTipo`) e UN (`unidade`), largura/rolagem.
- Alterações de 09 e 15/10 e ações operacionais/histórico do commit `9d1611d` (16/10).
- Transferência, Remessa e Devolução: não testadas (geram documentos reais no Datasul).
- Receber, Estornar, Inutilizar, Perda/Extravio e Histórico: presentes nos fontes, sem validação ao vivo.
- Status e cores: só `NAO_IMPRESSA`, `EM_ESTOQUE` e `CANCELADA` vistos no backend; demais códigos e contraste não confirmados.
- Desempenho em produção não medido (TESTE anterior: ~50 etiquetas, 2,3–2,8 s por chamada).

## Testes locais
- `testar-consulta-etiquetas.cjs` falha antes e depois das entregas de 20/10 no Node 24 (rejeição não tratada `FALHA_TRANSPORTE`/HTTP 0;
  em modo warn, o simulador não tem `$.map`). Adequar a suíte: fora do escopo até pedido.

## Fora do widget
- Grupos definitivos de autorização (DT-054), responsável a definir. Dataset mantém `DefaultGroup-1` e estabelecimentos 10904/11301.
- Modelo/serviço e fluxo completo de impressão real: a definir com o usuário.
- Origem da aprovação funcional do commit de 16/10 não comprovada; perguntar ao usuário se uma decisão nova depender dela.
- Remoto: `origin` = `HumbertoAlcantaraArruda/BP-NW-MANETQ`; destino registrado `DataIT-Solucoes/BP-NW-MANETQ`. Trocar só com autorização.
