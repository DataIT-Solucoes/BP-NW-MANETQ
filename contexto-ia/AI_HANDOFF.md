# AI_HANDOFF — widget_nw_manutEtiq

## Última atualização
2026-10-20 — branch: fechamento-controle-embalagens; base anterior à entrega: 975d44c.

## Tarefa atual / última entrega
- Pedido: toast Fluig info Carregando... junto ao loading da widget no Histórico e também no Buscar.
- Buscar agora usa overlay da widget, sem spinner duplicado da tabela. atualizarCarregandoGlobal considera carregandoTela e preparandoHistorico, mantendo bloqueio enquanto qualquer carga estiver ativa.
- Toast único por instância, timeout 600000ms; ao encerrar, retirada após 100ms e fadeOut 200ms, no padrão de Bags. Carga reiniciada cancela retirada; instâncias removem só seus avisos. avisar ganhou duração opcional, preservando chamadas anteriores.
- Oito cenários específicos simulados passaram: criação info/duração, sem duplicação, cargas sobrepostas, fim, reinício rápido, remoção e isolamento de instâncias. node --check/git diff --check OK.
- Apoios 32, funções 36 e transporte 60 com FALHAS=0 antes/depois. Simulador local de transporte ajustado à troca para overlay e API append, mantido fora do Git. Consulta conserva falha preexistente HTTP 0/rejeição não tratada.
- AGENTS e DECISIONS registram a exigência de toast junto ao overlay. JS UTF-8/CRLF preservado; Dataset e CSS não alterados.
- WAR gerado e conferido byte a byte com 12 fontes, ZIP íntegro; SHA256 em AI_REFERENCES.
- Conteúdo para commit/push: JS, AGENTS e quatro arquivos de contexto. Publicação e validação no Fluig não realizadas.
- Git limpo no início; 975d44c já enviado ao remoto.

## Para retomar
- Ler AGENTS e os quatro arquivos AI_*.md; conferir o Git antes de editar.
- Próxima tarefa depende de novo pedido; pendências não autorizam execução.
- Sempre commit, push e gerar WAR após alterações; publicação no Fluig exige autorização própria.
