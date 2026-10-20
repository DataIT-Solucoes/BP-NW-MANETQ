# AI_HANDOFF — widget_nw_manutEtiq

## Última atualização
2026-10-20 — branch: fechamento-controle-embalagens; base anterior à entrega: 0e478ae.

## Tarefa atual / última entrega
- Pedido: clique no Histórico ativa loading global e modal só abre depois de carregar os dados.
- JS: abrirHistorico usa FLUIGC.loading(window). Loading encerrado no always da carga; concluirAberturaHistorico abre modal após renderização e sucesso, inclusive lista vazia. Erro inicial mostra toast sem modal; cancelamento não emite aviso. Cliques repetidos bloqueados durante carga; resposta antiga não abre modal. Paginação permanece no modal.
- Seis cenários específicos simulados passaram: sucesso, vazio, erro, cancelamento, resposta antiga e clique repetido. node --check e git diff --check OK.
- Antes/depois: apoios 32, funções 36, transporte 60 com FALHAS=0. Consulta mantém falha preexistente FALHA_TRANSPORTE/HTTP 0 no Node 24.
- WAR gerado em target/widget_nw_manutEtiq.war, 12 arquivos comparados byte a byte aos fontes, ZIP íntegro; SHA256 em AI_REFERENCES. JS UTF-8/CRLF preservado; Dataset não alterado.
- Conteúdo para commit/push: JS e quatro arquivos de contexto, conforme autorização permanente; conferir hash e sincronização no Git ao retomar.
- Publicação e validação visual no Fluig não realizadas. Git limpo no início; entrega anterior 0e478ae enviada ao remoto.

## Para retomar
- Ler AGENTS e os quatro arquivos AI_*.md; conferir o Git antes de editar.
- Próxima tarefa depende de novo pedido; pendências em AI_TODO não autorizam execução.
- Sempre commit, push e gerar WAR após alterações; publicação no Fluig exige autorização própria.
