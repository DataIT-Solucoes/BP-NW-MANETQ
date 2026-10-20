# AI_HANDOFF — widget_nw_manutEtiq

## Última atualização
2026-10-20 — branch: fechamento-controle-embalagens; base anterior à entrega: f7c988e.

## Tarefa atual / última entrega
- Pedido: conferir .p e badges publicadas de Bags e aplicar o mapeamento no Histórico da embalagem.
- JS: 22 códigos exatos de embalagem e oito regras de Bag copiados do mapa publicado; renderização de Ocorrência em badge com rótulo e cor. Prioridade do código exato; desconhecido neutro; ausente travessão. Sem código técnico em title e sem inserir HTML externo.
- CSS: sete cores de badge, formato e ponto iguais a Bags, sob .fluig-style-guide.nwm. Comparação no navegador entre Bags publicada e CSS local confirmou texto/fundo/borda/raio/ponto idênticos. Demais colunas, data, toast, loading e paginação preservados.
- Fontes .p oficiais consultados via gh api em DataIT-Solucoes/BP-NW-Embalagens, branch fechamento-controle-embalagens; leitura CP850, nenhuma alteração. Origem de ocorrencia e tipos de confirmação/movimento conferidos; referências/linhas/hashes em AI_REFERENCES. Dataset vigente lido, não alterado.
- 34 cenários específicos passaram. Antes/depois: apoios 32, funções 36 e transporte 60 com FALHAS=0. Consulta mantém falha preexistente HTTP 0/rejeição não tratada. node --check/git diff --check OK.
- WAR gerado pelo pack-widget.ps1 localizado na referência de Bags (caminho em AI_REFERENCES), 12 arquivos conferidos byte a byte e ZIP íntegro; SHA256 em AI_REFERENCES.
- Conteúdo para commit/push: JS, CSS e quatro arquivos de contexto. Publicação e validação na widget de manutenção no Fluig não realizadas; Bags conferida ao vivo, CSS de manutenção em página isolada.
- Git limpo no início; entrega anterior f7c988e enviada ao remoto.

## Para retomar
- Ler AGENTS e os quatro arquivos AI_*.md; conferir o Git antes de editar.
- Próxima tarefa depende de novo pedido; pendências não autorizam execução.
- Sempre commit, push e gerar WAR após alterações. Usar o pack-widget.ps1 agora localizado; publicação no Fluig exige autorização própria.
