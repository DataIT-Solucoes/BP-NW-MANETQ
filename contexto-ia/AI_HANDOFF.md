# AI_HANDOFF — widget_nw_manutEtiq

## Última atualização
2026-10-20 — branch: fechamento-controle-embalagens; base anterior à entrega: aeba8eb.

## Tarefa atual / última entrega
- Usuário corrigiu o significado de loading global: padrão próprio de widget_nw_bags, bloqueando só a widget. FLUIGC.loading(window) era implementação indevida e foi removido.
- JS: definirCarregandoGlobal cria/reutiliza overlay sob this.DOM, controla hidden e aria-busy local; Histórico ativa antes da consulta e desativa no always, abrindo modal após sucesso. Erro/cancelamento/clique repetido/resposta antiga continuam tratados.
- CSS: container position:relative; overlay absoluto inset:0/z-index:50, fundo marfim translúcido, cursor progress e spinner existente de 48px. Propriedades copiadas do padrão de Bags; fonte de referência somente lido.
- Nove cenários específicos passaram: três de overlay/instâncias e seis de Histórico. Navegador em página isolada com CSS atual confirmou área restrita à widget, bloqueio interno, botão externo e segunda widget livres e liberação ao ocultar.
- Suítes antes/depois: apoios 32, funções 36 e transporte 60 com FALHAS=0. Consulta mantém falha preexistente HTTP 0/rejeição não tratada. node --check/git diff --check OK; encoding e quebras dos fontes preservados.
- AGENTS e DECISIONS passam a registrar expressamente o padrão: loading global é interno à widget e não é FLUIGC.loading(window).
- WAR gerado e conferido byte a byte com 12 fontes, ZIP íntegro; SHA256 em AI_REFERENCES.
- Conteúdo para commit/push: JS, CSS, AGENTS e quatro arquivos de contexto; conferir hash/sincronização ao retomar. Publicação/validação no Fluig não realizadas; teste visual executado em página isolada.
- Git limpo no início; entrega anterior aeba8eb enviada ao remoto.

## Para retomar
- Ler AGENTS e os quatro arquivos AI_*.md; conferir o Git antes de editar.
- Próxima tarefa depende de novo pedido; pendências não autorizam execução.
- Sempre commit, push e gerar WAR após alterações; publicação no Fluig exige autorização própria.
