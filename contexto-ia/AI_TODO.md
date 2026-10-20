# AI_TODO — widget_nw_manutEtiq

Pendências não autorizam execução. Conferir o contrato vigente antes de planejar integração.

## Esperando decisão do usuário
- Comportamento do campo Código de barras (`data-leitor-cod-barras`).
- Qtde Sel.: confirmar soma de saldo (qtidadeAtu) ou quantidade inicial.
- Eventual visão não-ADM: decisão vigente mantém tela ADM de aba única.
- Inclusão de testes/ e evidencias/ no Git; manter fora dos commits até decisão.
- Limpeza opcional de situacoesApresentadas(), textoQuantidadeEtiquetas() e modal Mais ações.
- Eventual aumento de application.version em próxima publicação para evitar cache; sugestão anterior não autoriza alteração.

## Confirmar no Fluig
- Publicar e conferir alinhamento à esquerda na coluna Ações.
- Publicar largura corrigida de Ações (320px) e conferir Imprimir inteiro como primeiro botão de NAO_IMPRESSA. Ordem já confirmada no JS publicado; corte do botão reproduzido na largura antiga.
- Publicar e validar fechamento pelo fundo nos sete modais, hover por ação e ausência da mensagem inicial Em lote...
- Publicar e validar badges de Ocorrência no Histórico da embalagem, com o mapa/cores de Bags. Mapa publicado de Bags e CSS comparados em 20/10; a manutenção ainda não publicada nesta tarefa.
- Publicar e validar toast info Carregando... e overlay da widget no Buscar e no Histórico, com retirada ao terminar/falhar/cancelar.
- Publicar e conferir borda verde permanente dos botões de ações da grade, comparando com Bags. Bags conferida ao vivo após login em 20/10: borda #006B35 de 1px, raio 10px.
- Publicar e conferir o loading de Bags na abertura do Histórico: overlay limitado à widget, restante da página livre, modal após sucesso e aviso sem modal em caso de erro.
- Publicar e conferir Data do Histórico da embalagem em DD/MM/AAAA - HH:MM.
- Publicar e validar Fazenda no formato código - descrição, nome retornado pelo cadastro e largura de 260px.
- Publicar e conferir as novas colunas Tipo de Embalagem (codTipo) e UN (unidade), incluindo largura/rolagem em tela.
- Suíte local testar-consulta-etiquetas.cjs falha antes e depois desta alteração no Node 24: rejeição não tratada FALHA_TRANSPORTE/HTTP 0; com modo warn, simulador sem $.map. Adequação da suíte fora do escopo desta entrega.
- Publicação/validação das alterações de 09 e 15/10 e das ações operacionais/histórico do commit 9d1611d, de 16/10.
- Transferência, Remessa e Devolução: não testadas no TESTE segundo registro anterior; geram documentos reais no Datasul.
- Receber, Estornar, Inutilizar, Perda/Extravio e Histórico: presentes nos fontes, sem validação ao vivo nesta tarefa.
- Impressão real: existe método para obterDadosImpressao, mas o fluxo completo não está confirmado.
- Status e cores: registro anterior confirma NAO_IMPRESSA, EM_ESTOQUE e CANCELADA no backend; demais códigos e contraste ao vivo não confirmados. Reavaliar legenda atual antes de decidir inclusão de CANCELADA.
- Desempenho em produção não medido; registro de TESTE anterior: cerca de 50 etiquetas, 2,3–2,8 s por chamada.

## Dependências externas
- Grupos definitivos de autorização (DT-054), responsável a definir. Dataset consultado mantém DefaultGroup-1 e estabelecimentos 10904/11301.
- Modelo/serviço e fluxo completo de impressão real: a definir com o usuário.
- Origem da aprovação funcional do commit de 16/10 não comprovada nesta migração; consultar o usuário se uma nova decisão depender dela. Não reabrir decisões aprovadas registradas em AI_DECISIONS.
