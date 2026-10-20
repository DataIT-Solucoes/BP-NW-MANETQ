# Manutenção Embalagens

Widget WCM do TOTVS Fluig para consultar, selecionar e movimentar etiquetas de embalagem. Identificador widget_nw_manutEtiq, prefixo visual nwm e versão declarada 0.1.0. Substitui a tela legada Manutenção Itens/Etiquetas em uma visão ADM de aba única.

A tela tem oito filtros, grade paginada, seleção por item/quantidade, operações por natureza, ações por etiqueta, histórico e configuração de impressora. Publicação e validação das funções recentes no Fluig não estão confirmadas.

## Estrutura
| Caminho | Finalidade |
|---|---|
| src/main/resources/application.info | Metadados e recursos |
| src/main/resources/view.ftl | Tela e diálogos |
| src/main/resources/edit.ftl | Identificação, sem parâmetros |
| src/main/webapp/resources/js/widget_nw_manutEtiq.js | SuperWidget e integração |
| src/main/webapp/resources/css/widget_nw_manutEtiq.css | Estilos Branco Peres |
| src/main/webapp/WEB-INF/ | Configuração web |
| AGENTS.md | Regras e leitura inicial dos agentes |
| contexto-ia/ | Estado, decisões, pendências e referências |
| HISTORICO.md | Registro anterior preservado |

## Dependências e configuração
Ambiente registrado: jQuery 3.6.3, Bootstrap 3.4.1 e Style Guide 2.5.0 fornecidos pelo Fluig. O view.ftl declara Bootstrap Icons 1.11.3, Mulish, Tabulator 6.4.0 e Select2 4.0.13 com pt-BR.

Integração via dsNwEmbalagens, pelo endpoint Fluig /api/public/ecm/dataset/search. Contrato vigente em ../widget_nw_embalagens/datasets/dsNwEmbalagens.js; autenticação e autorização no servidor. Serviço Datasul: DATASUL_REST_HOMOLOG.

Impressora configurada pelo aplicativo local http://localhost:32478 e chave impressora no localStorage. Template de teste registrado: documento GED 423. Fluxo completo de impressão real não confirmado.

## Verificação e publicação
Testes Node locais em testes/, fora do Git. Comandos e dependências em [AI_REFERENCES](contexto-ia/AI_REFERENCES.md). A adoção documental confere o diff, sem testes funcionais, build ou publicação.

TESTE: http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/ManutencaoDeEmbNew

O procedimento histórico de WAR e seus limites de confirmação estão em AI_REFERENCES. Commit, push, build e publicação seguem as autorizações de [AGENTS.md](AGENTS.md).

## Continuidade
Ler [AGENTS.md](AGENTS.md), [estado](contexto-ia/AI_HANDOFF.md), [decisões](contexto-ia/AI_DECISIONS.md), [pendências](contexto-ia/AI_TODO.md) e [referências](contexto-ia/AI_REFERENCES.md). Ferramentas que não carreguem AGENTS automaticamente precisam receber essa orientação.
