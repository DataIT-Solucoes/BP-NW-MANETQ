# AI_HANDOFF — widget_nw_manutEtiq

## Última atualização
2026-10-20 — branch: fechamento-controle-embalagens; base anterior à entrega: f4eaf3a.

## Tarefa atual / última entrega
- Usuário cobrou o botão Imprimir visível e primeiro em Não impressa.
- Causa confirmada na página publicada: mapa já reordenado, mas coluna Ações de 160px alinhada à direita cortava o botão inteiro. Reprodução no Tabulator: Imprimir de 34px entre -36 e -2px relativos à célula.
- Correção: NWM_LARGURAS_COLUNAS.acoes de 160 para 320px, comportando até oito botões; ordem de Não impressa permanece Imprimir, Detalhes, Histórico, Inutilizar, Perda.
- Teste em Tabulator temporário com JS/CSS da página, 12 status: todos os botões visíveis; Imprimir primeiro em Não impressa. Tabela de teste removida; nenhum comando de backend chamado.
- Mudança só de largura; disponibilidade da impressão preservada, ainda depende do modelo/fluxo vigente. node --check/git diff --check OK; apoios 32, funções 36 e transporte 60 com FALHAS=0 antes/depois; consulta mantém falha preexistente HTTP 0/rejeição não tratada.
- WAR gerado por pack-widget.ps1, 12 arquivos conferidos byte a byte, ZIP íntegro; SHA256 em AI_REFERENCES. JS UTF-8/CRLF preservado.
- Conteúdo para commit/push: JS e quatro arquivos de contexto. Publicação da largura corrigida no Fluig não realizada.
- Git limpo no início; f4eaf3a já enviado ao remoto; ordem correspondente confirmada na página publicada.

## Para retomar
- Ler AGENTS e os quatro arquivos AI_*.md; conferir o Git antes de editar.
- Próxima tarefa depende de novo pedido; pendências não autorizam execução.
- Sempre commit, push e gerar WAR pelo pack-widget.ps1; publicação no Fluig exige autorização própria.
