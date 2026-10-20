# AI_HANDOFF — widget_nw_manutEtiq

## Última atualização
2026-10-20 — branch: fechamento-controle-embalagens; base anterior à entrega: b53f9df.

## Tarefa atual / última entrega
- Pedido: adicionar Tipo de Embalagem antes de Fazenda e UN depois de Qtde Saldo.
- JS: duas colunas textuais, larguras em NWM_LARGURAS_COLUNAS; codTipo incorporado ao mapearEtiqueta; unidade já disponível. Sem alteração do Dataset, filtros ou comandos.
- Evidência de campos: retorno real capturado de consultarEtiquetas contém codTipo/unidade, exemplo PL/LT. Ordem e mapeamento conferidos em 175 registros capturados; node --check e git diff --check OK.
- Testes antes/depois: apoios 32, funções 36, transporte 60 cenários com FALHAS=0. Suíte consulta já falhava antes e continua com a mesma rejeição FALHA_TRANSPORTE/HTTP 0 no Node 24; modo warn revela $.map ausente no simulador. Não ajustada fora do escopo.
- JS em UTF-8, CRLF preservado conforme medição atual; registro anterior de LF era histórico.
- WAR gerado em target/widget_nw_manutEtiq.war; 12 arquivos conferidos byte a byte aos fontes, integridade ZIP OK; SHA256 em AI_REFERENCES.
- Commit/push fazem parte do encerramento autorizado permanente; conteúdo: JS e quatro arquivos de contexto. Conferir o hash e sincronização no Git ao retomar.
- Validação visual/publicação no Fluig: não realizadas. Novas colunas aumentam a largura total da tabela; conferir rolagem no ambiente.
- Git limpo no início desta tarefa. Entrega anterior de contexto concluída em b53f9df e enviada ao remoto.

## Para retomar
- Ler AGENTS e os quatro arquivos AI_*.md; conferir o Git antes de editar.
- Próximo passo funcional depende de novo pedido; pendências em AI_TODO não autorizam execução.
- Manter regra permanente: commit, push e gerar WAR após alterações; publicação no Fluig exige autorização própria.
