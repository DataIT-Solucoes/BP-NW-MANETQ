# widget_nw_manutEtiq

> Regras gerais (versões, SuperWidget, Style Guide, padrão `nw`): `CLAUDE.md` da raiz do repositório. Aqui fica só o que é deste widget.
> Preencher só com o que o usuário informou ou o que está nos fontes. O que não se sabe fica "a definir".
> O `CLAUDE.md` desta pasta só importa este arquivo (`@AGENTS.md`). Skill local: `.claude/skills/fluig-branco-peres/`
> (cópia igual nos 4 widgets).

## Onde está cada coisa (ler só o do assunto)
| Arquivo | Conteúdo |
|---|---|
| `docs/decisoes.md` | Decisões e correções do usuário (dados, textos, tela, forma de trabalho). **Ler antes de mudar comportamento ou texto.** |
| `docs/pendencias.md` | Perguntas em aberto, propostas não aprovadas e o que falta confirmar no Fluig de TESTE |
| `docs/referencias-backend.md` | Contrato do Dataset (ações, parâmetros, campos), fontes da verdade, `.p` lidos, erros, build e testes |
| `docs/tela-e-codigo.md` | Tela (filtros, tabela, ações por status, modais), arquitetura do JS e **mapa das funções do JS** (~4.900 linhas: não ler inteiro, achar pelo mapa + Grep). O fonte manda |
| `HISTORICO.md` | Registro anterior (até 15/10), não é mais atualizado |
| `README.md` | Visão geral para pessoas (GitHub). **Não precisa ler para trabalhar** |

Histórico e estado do trabalho: `git log`.

## Objetivo
Tela **Manutenção Embalagens**, substituindo a tela legada Manutenção Itens/Etiquetas: consultar, selecionar e movimentar etiquetas de
embalagem (visão ADM, aba única).

## Identificação
- `application.code` e `application.title`: `widget_nw_manutEtiq`; título exibido: Manutenção Embalagens
- Prefixo de classe CSS: `nwm` (container `.fluig-style-guide.nwm`)
- Padrão visual: o de `widget_nw_embalagens` e `widget_nw_itensComCtrllDeEmb`; loading global e badges/hover/borda das ações: os de `widget_nw_bags`
- Onde é usado: `http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/ManutencaoDeEmbNew`
- Repositório: `origin` = `https://github.com/DataIT-Solucoes/BP-NW-MANETQ.git` (trocado em 22/10 a pedido do usuário;
  alterar `origin` só com autorização). Trabalho no branch **`fechamento-controle-embalagens`**.

## Recursos declarados no `application.info`
| Índice | Tipo | Valor |
|---|---|---|
| 1 | js | `/resources/js/widget_nw_manutEtiq.js` |
| 2 | css | `/resources/css/widget_nw_manutEtiq.css` |

Próximo índice livre: 3. CDN no `view.ftl` (com SRI): Bootstrap Icons 1.11.3, Mulish, Tabulator 6.4.0, Select2 4.0.13 (pt-BR).

## Parâmetros de configuração (`edit.ftl`)
Nenhum (só identificação).

## Dados (essencial; detalhes em `docs/referencias-backend.md`)
- Dataset `dsNwEmbalagens`, chamado por `chamarEmbalagens` (`$.ajax` em `/api/public/ecm/dataset/search`). O publicado no Fluig é sempre
  o `dsNwEmbalagens.js` do GitHub **`DataIT-Solucoes/BP-NW-DATASET`**: ler esse arquivo (`NW_CONFIG`, `NW_ACOES`, `NW_COLUNAS`, `regras`,
  `escritasHabilitadas`) antes de usar ação, parâmetro ou campo. Só existe o que está lá; se faltar, perguntar. Não editar o Dataset sem pedido.
  (Até 20/10 este widget usava a cópia `../widget_nw_embalagens/datasets/dsNwEmbalagens.js`.)
- APIs REST (Progress, só leitura, CP850): `DataIT-Solucoes/BP-NW-Embalagens`, branch `fechamento-controle-embalagens`,
  `APIs-Controle-Embalagens/fontes/progress/`.
- Identidade, autorização e credenciais são resolvidas no servidor.

## Regras de negócio e de tela (ativas)
- Status = `situacaoApresentada`/`descricaoSituacao`; `situacao` é o estado técnico. Ações por status em `NWM_ACOES_POR_STATUS`.
- Imprimir hoje registra `CONFIRMAR_IMPRESSAO` (teste do usuário, sem impressão física). Depois de ação de etiqueta, só as linhas envolvidas são reconsultadas no backend e
  atualizadas (`row.update`), sem recriar a tabela; a tela nunca muda status ou saldo localmente.
- Resultado incerto (operação ou ação de etiqueta) bloqueia novas escritas; não reenviar automaticamente nem gerar chave nova para a mesma intenção.
- **Loading global é o padrão de Bags: overlay absoluto dentro da widget, bloqueando só a widget. Não usar `FLUIGC.loading(window)` nem
  bloquear a página.** Referência: `widget_nw_bags`, `$carregandoGlobal` e `.nwb-carregando-global`. Buscar mostra também
  o toast info "Carregando...", único por instância e removido ao concluir/falhar/cancelar.
- **Ação clicada na linha da tabela não usa o loading global**: desabilita os botões daquela linha e mostra o carregamento na própria
  linha (`linhaCarregando`, `.nwm-linha-carregando`). Ação em lote continua com o loading global.

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
  e `testar-transporte-dataset.cjs` antes e depois; todos com `FALHAS=0`. Os testes usam um jQuery simulado (`testes/testar-apoios-filtros.cjs`) que casa o **texto exato dos
  seletores** e só tem parte da API: método jQuery novo (ex.: `.add`, `$.proxy`) em trecho que os testes executam precisa existir no
  simulador, senão o teste quebra. Alguns testes leem `evidencias/etapa1-20261008/resultado-dataset.json` (fora do git).
- Encoding: JS em CRLF (`.gitattributes` com `eol=crlf`); medir antes e manter.

## Forma de trabalho (pedidos do usuário)
**Não** fazer commit, push nem gerar o `.war` automaticamente depois de um ajuste. Entrega só quando o usuário pedir, pelo
comando **`/entregar "texto"`** (`.claude/commands/entregar.md`), que escolhe o prefixo, roda os testes se o JS mudou e chama
o script numa chamada só:
```
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/entregar.ps1 -Mensagem "FIX: Texto" <arquivos...>
```
- Confere BOM e quebra de linha misturada nos fontes de `src/`; se algum arquivo estiver em `src/`, sobe o patch de `application.version` (`application.info` entra no commit), roda `node --check` e gera
  `target/widget_nw_manutEtiq.war` (`pack-widget.ps1`; Ctrl+F7 no VSCode faz o mesmo). Só `.md`: pula os dois.
- Commit **só dos arquivos informados** (nunca `target/`; apagado/renomeado: passar o caminho antigo também), em português,
  **sem coautor** e **sempre com prefixo** (`FIX`, `FEAT`, `REFACTOR`, `PERF`, `STYLE`, `DOCS`, `TEST`, `CHORE`, `CI`, `BUILD`,
  `REVERT`, `SECURITY`): `DOCS: Texto` (`.md`, `AGENTS.md`, `docs/`), `FIX: Texto` (correção em `src/`), `FEAT: Texto` (funcionalidade nova),
  `CHORE: Texto` (manutenção, renomear sem mudar conteúdo).
- Nunca no commit: `evidencias/`, `debug.log`, `testes/*.cjs`, `pagina_antiga_manutencao_etiquetas/`, `.playwright-mcp/`, `srv/`, `em_homologacao/`.
- Push no branch atual e conferência do remoto (`git ls-remote`). `-Simular` faz tudo menos commit e push.
- Importar no Fluig (Painel de Controle → Desenvolvimento → Widgets): feito pelo usuário.

Ao fim da tarefa, atualizar **só** o arquivo de `docs/` afetado: decisão nova → `decisoes.md`; pergunta ou proposta → `pendencias.md`
(resolvida: tirar de lá); levantamento no backend → `referencias-backend.md`; mudança de comportamento da tela → `tela-e-codigo.md`.
O `README.md` só muda quando a visão geral mudar.
