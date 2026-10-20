# widget_nw_manutEtiq

## Leitura inicial
- Ler este arquivo e os quatro arquivos `contexto-ia/AI_*.md` no início da sessão.
- Visão geral para desenvolvedores: `README.md`.
- Ao concluir uma tarefa, atualizar o contexto afetado e manter o README coerente.
- `HISTORICO.md` preserva o registro anterior; a continuidade passa a ser feita em `contexto-ia/`.
- Não há CLAUDE.md local duplicado. Ferramentas que não carreguem AGENTS automaticamente devem ser orientadas a ler este arquivo e os quatro arquivos de contexto.

## Objetivo e identificação
Tela **Manutenção Embalagens**, substituindo a tela legada Manutenção Itens/Etiquetas. Padrão visual de `widget_nw_embalagens` e `widget_nw_itensComCtrllDeEmb`; prefixo **nwm**.
- `application.code` e `application.title`: `widget_nw_manutEtiq`; título exibido: Manutenção Embalagens.
- Versão `0.1.0`, categoria SYSTEM, uiwidget=true, mobileapp=false; context-root `/widget_nw_manutEtiq`.
- TESTE: http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/ManutencaoDeEmbNew
- Git próprio; destino registrado do remoto: https://github.com/DataIT-Solucoes/BP-NW-MANETQ.git. Alterar origin só com autorização.

## Arquitetura e integrações
- `src/main/resources/view.ftl`: tela e diálogos; `edit.ftl`: identificação, sem parâmetros.
- `src/main/webapp/resources/js/widget_nw_manutEtiq.js`: SuperWidget, filtros, Tabulator, seleção, operações, histórico e impressora.
- CSS em `src/main/webapp/resources/css/widget_nw_manutEtiq.css`, sob `.fluig-style-guide.nwm`; DOM escopado por instância.
- Usar a skill `fluig-branco-peres`. Ambiente registrado: jQuery 3.6.3, Bootstrap 3.4.1 e Style Guide 2.5.0 fornecidos pelo Fluig; não duplicar essas bibliotecas.
- **Ler sempre `../widget_nw_embalagens/datasets/dsNwEmbalagens.js`**: NW_CONFIG, NW_ACOES, NW_COLUNAS, regras e escritasHabilitadas. Por definição do usuário é igual ao publicado no Fluig e manda sobre os documentos. Só existe o contrato presente no fonte; se faltar, perguntar ao usuário. Não editar o Dataset sem pedido.
- `chamarEmbalagens(acao, parametros)` usa $.ajax para `/api/public/ecm/dataset/search`; identidade, autorização e credenciais são resolvidas no servidor.
- Referências técnicas detalhadas e retratos datados estão em AI_REFERENCES; conferir fontes antes de alterar integrações.

## Regras de trabalho
- Português do Brasil, direto e objetivo. O usuário define o escopo; pendência registrada não autoriza execução.
- Documentar somente informação do usuário ou sustentada pelos fontes; desconhecido é “a definir”, resultado não validado é “não confirmado”.
- **SEMPRE: após cada alteração, fazer commit, push e compilar (gerar o WAR).** Autorização permanente do usuário em 20/10/2026; substitui a exigência de pedido individual. Antes do commit, mostrar o que vai entrar.
- Gerar o WAR faz parte do encerramento de cada alteração. Publicação no Fluig exige autorização própria; push e geração do WAR não equivalem à publicação.
- Nunca incluir pastas de referência/servidor/homologação nos commits: srv/, em_homologacao/, pagina_antiga_manutencao_etiquetas/. Manter também evidencias/, debug.log e testes/ fora dos commits até decisão do usuário.
- Cópias de servidor/homologação são somente leitura; nunca ler compilados .r.
- Não fazer varreduras amplas fora do projeto; se faltar arquivo, pedir ao usuário que copie do servidor.
- Preferir evidência (hash, contagem, diff) e distinguir verificação local de validação no Fluig.
- Progress (.w/.p/.i/.cls): usar skill progress-datasul e ler references/manutencao-e-contexto.md antes de editar; CP850 + CRLF; nunca Write/Edit nesses fontes.
- Medir e preservar encoding e quebras de linha dos fontes. JS registrado em LF, 0 CR em 15/10; não converter sem pedido. Conferir bytes por Python/PowerShell, não por awk ou contagem de CR no Git Bash.
- Regras duradouras da tela aprovadas pelo usuário estão em AI_DECISIONS.

## Padrão de código (JS) — seguir sempre
Vale para todo código novo ou alterado em `widget_nw_manutEtiq.js`. Modelo: o próprio arquivo atual.
- **Sem comentários.** O nome da função e das variáveis explica o que o código faz.
- **Nomes descritivos em português**: `filtros`, `parametros`, `etiqueta`, `registro`, `operacao`, `resultado`; nada de
  `f`, `p`, `d`, `r`, `op`. Objeto jQuery começa com `$` (`$lista`, `$input`).
- **Funções curtas** (até ~20 linhas), com uma responsabilidade. Passo com nome próprio vira método da instância
  (ex.: `validarFiltros` → `verificarFiltrosObrigatorios`, `verificarOrdemFaixas`, `recusarFiltros`).
- **Constantes `NWM_*` no topo** para limites, tempos, mapas campo → parâmetro do Dataset e regex reutilizadas
  (`NWM_LIMITE_PAGINA`, `NWM_PARAMETROS_ETIQUETAS`, `NWM_CODIGO_POSITIVO`, `NWM_TIPOS_ERRO`, `NWM_ESTADOS_OPERACAO`…).
  Nada de número mágico no meio do código.
- **jQuery para DOM, eventos e AJAX**: `$('<tag>', {...})`, `.attr/.prop/.text/.append/.appendTo`, `.on/.off`, `$.each`,
  `$.grep`, `$.extend`, `$.ajax`, `$.Deferred`. Proibido: `document`, `querySelector`, `addEventListener`, `createElement`,
  `innerHTML`, `fetch`, `async/await`, `$.trim` (obsoleto; usar `String(valor || '').trim()`). Texto vindo do servidor entra
  por `text:`, nunca como HTML.
- Estilo do arquivo: `var`, métodos no formato `nome() {}`, `var self = this` nos callbacks.
- **Refatorar não muda comportamento**: mensagens, seletores, classes CSS e parâmetros do Dataset ficam idênticos.
  Mantenha os nomes dos métodos e dos campos de estado já existentes (`operacaoAtual`, `consultaEtiquetas`,
  `apoiosFiltros`, `consultasDataset`…): os bindings e os testes dependem deles.
- **Testes**: rodar `node testes/testar-apoios-filtros.cjs`, `testar-consulta-etiquetas.cjs`, `testar-funcoes-manutencao.cjs`
  e `testar-transporte-dataset.cjs` antes e depois; todos com `FALHAS=0`. Os testes usam um jQuery simulado
  (`testes/testar-apoios-filtros.cjs`) que casa o **texto exato dos seletores** e só tem parte da API: método jQuery
  novo (ex.: `.add`, `$.proxy`) em trecho que os testes executam precisa existir no simulador, senão o teste quebra.
  Alguns testes leem `evidencias/etapa1-20261008/resultado-dataset.json` (fora do git).


## Continuidade
- Estado e retomada: `contexto-ia/AI_HANDOFF.md`.
- Decisões aprovadas: `contexto-ia/AI_DECISIONS.md`.
- Pendências: `contexto-ia/AI_TODO.md`.
- Referências: `contexto-ia/AI_REFERENCES.md`.
