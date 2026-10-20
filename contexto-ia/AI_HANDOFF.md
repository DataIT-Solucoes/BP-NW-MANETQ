# AI_HANDOFF — widget_nw_manutEtiq

## Última atualização
2026-10-20 — branch: fechamento-controle-embalagens; base anterior à entrega: e18d5e9.

## Tarefa atual / última entrega
- Pedido: Data no modal Histórico da embalagem em DD/MM/AAAA - HH:MM.
- JS: formatarDataHoraHistorico aplicado a dataEvento ou dataRegistro ao renderizar o histórico. Preserva data/hora do timestamp recebido; exibição omite segundos, fração e offset. Vazio exibe travessão; formato desconhecido preservado. Nenhuma alteração do Dataset.
- Oito casos específicos passaram, incluindo ISO com fração/offset, UTC, espaço, meia-noite, valores ausentes e texto já formatado. node --check e git diff --check OK.
- Antes/depois: apoios 32, funções 36, transporte 60 com FALHAS=0; consulta mantém falha preexistente FALHA_TRANSPORTE/HTTP 0 no Node 24.
- WAR gerado em target/widget_nw_manutEtiq.war; 12 arquivos conferidos byte a byte aos fontes, ZIP íntegro; SHA256 em AI_REFERENCES. JS UTF-8/CRLF preservado.
- Conteúdo para commit/push autorizado: JS e quatro arquivos de contexto; conferir hash/sincronização no Git ao retomar.
- Publicação e validação no Fluig não realizadas. Git limpo no início; entrega anterior e18d5e9 enviada ao remoto.

## Para retomar
- Ler AGENTS e os quatro arquivos AI_*.md; conferir o Git antes de editar.
- Próxima tarefa depende de novo pedido; pendências em AI_TODO não autorizam execução.
- Após alterações, sempre commit, push e gerar WAR; publicação no Fluig exige autorização própria.
