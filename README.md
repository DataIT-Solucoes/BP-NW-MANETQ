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
| docs/ | Decisões, pendências, referências do backend e mapa da tela/código |
| HISTORICO.md | Registro anterior preservado |

## Dependências e configuração
Ambiente registrado: jQuery 3.6.3, Bootstrap 3.4.1 e Style Guide 2.5.0 fornecidos pelo Fluig. O view.ftl declara Bootstrap Icons 1.11.3, Mulish, Tabulator 6.4.0 e Select2 4.0.13 com pt-BR.

Integração via dsNwEmbalagens, pelo endpoint Fluig /api/public/ecm/dataset/search. Contrato vigente no dsNwEmbalagens.js do GitHub DataIT-Solucoes/BP-NW-DATASET; autenticação e autorização no servidor. Serviço Datasul: DATASUL_REST_HOMOLOG.

Impressora configurada pelo aplicativo local http://localhost:32478 e chave impressora no localStorage. Template de teste registrado: documento GED 423. No teste atual, o botão Imprimir registra CONFIRMAR_IMPRESSAO no backend e recarrega o status da grade, sem enviar etiqueta à impressora. O fluxo completo de impressão física ainda não está integrado.

## Verificação e publicação
Testes Node locais em testes/, fora do Git. Comandos e dependências em [referencias-backend](docs/referencias-backend.md). A adoção documental confere o diff, sem testes funcionais, build ou publicação.

TESTE: http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/ManutencaoDeEmbNew

O .war é gerado por `scripts/entregar.ps1`; detalhes em docs/referencias-backend.md. Commit, push, build e publicação seguem as autorizações de [AGENTS.md](AGENTS.md).

## Continuidade
Ler [AGENTS.md](AGENTS.md) e, conforme o assunto, [decisões](docs/decisoes.md), [pendências](docs/pendencias.md), [referências](docs/referencias-backend.md) e [tela e código](docs/tela-e-codigo.md). Histórico: `git log`.
