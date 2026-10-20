# AI_HANDOFF — widget_nw_manutEtiq

## Última atualização
2026-10-20 — branch: fechamento-controle-embalagens; base anterior à entrega: af256ab.

## Tarefa atual / última entrega
- Pedido: Fazenda deve exibir código e descrição juntos, exemplo “10904 - JOAO BRANCO PERES”.
- Coluna usa campo fazenda (260px), com texto simples e ordenação textual. codEstabel original preservado para filtros/operações. Descrição reaproveitada da seleção válida do filtro ou obtida por apoiarEstabelecimentos, uma busca por código distinto, com paginação e correspondência exata. Nome real depende do cadastro, não fixado no JS.
- Enriquecimento conclui antes de exibir a carga. Respostas antigas ignoradas; erros e cursor inválido interrompem a carga; ausência de cadastro mantém código e emite aviso.
- Oito cenários específicos simulados passaram: cache, múltiplos estabelecimentos/paginação, resposta antiga, cursor repetido, erro, ausente, lista vazia e seleção desatualizada. node --check e git diff --check OK.
- Antes/depois: apoios 32, funções 36, transporte 60, FALHAS=0. Consulta mantém falha preexistente FALHA_TRANSPORTE/HTTP 0 no Node 24; fixture local ganhou seleção de estabelecimento e permanece fora do Git.
- WAR gerado em target/widget_nw_manutEtiq.war, 12 arquivos conferidos byte a byte, ZIP íntegro; SHA256 em AI_REFERENCES. JS em UTF-8/CRLF preservado.
- Commit/push desta entrega: JS e quatro arquivos de contexto, conforme autorização permanente. Conferir hash/sincronização no Git ao retomar.
- Validação visual e publicação no Fluig não realizadas. Git limpo no início; entrega anterior af256ab enviada ao remoto.

## Para retomar
- Ler AGENTS e os quatro arquivos AI_*.md; conferir o Git antes de editar.
- Próxima tarefa funcional depende de novo pedido; pendências em AI_TODO não autorizam execução.
- Após alterações, sempre commit, push e gerar WAR; publicação no Fluig exige autorização própria.
