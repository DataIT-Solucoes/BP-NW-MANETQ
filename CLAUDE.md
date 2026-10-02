# widget_nw_manutEtiq

> Regras gerais (versões, SuperWidget, Style Guide): `CLAUDE.md` da raiz do repositório. Aqui fica só o que é deste widget.
> Preencher só com o que o usuário informou ou o que está nos fontes. O que não se sabe fica "a definir".
> Levantamento da tela legada e decisões do usuário: `ORIENTACOES-MOCKUP.md` desta pasta.

## Objetivo
Tela **Manutenção Embalagens**: consulta, recebimento, impressão e movimentação de etiquetas de embalagem.
Refaz a tela legada **Manutenção Itens/Etiquetas** (`v2_widget_manutencao_etiquetas`, widget
`ver2_manutencaodeetiquetas` no servidor de teste) no padrão visual do `widget_nw_embalagens` (`nwe`) e
`widget_nw_itensComCtrllDeEmb` (`nwi`). Prefixo de classe aqui: **`nwm`**.

## Identificação
- `application.code`: `widget_nw_manutEtiq`
- Título (`application.title`): `widget_nw_manutEtiq` (valor gerado pela extensão); o título **exibido** é "Manutenção Embalagens"
- Versão: `0.1.0` · categoria `SYSTEM` · `application.uiwidget=true` · `application.mobileapp=false`
- Context-root: `/widget_nw_manutEtiq`
- Onde é usado (página/comunidade do Fluig): a definir

## Estado atual (2026-10-02)
Mockup completo com **dados mockados**; nenhuma chamada a dataset, REST ou API do Fluig.
- `view.ftl`: cabeçalho + 8 filtros + barra de seleção + tabela + 3 `<dialog>` (detalhes, confirmação, legenda).
- `widget_nw_manutEtiq.js`: SuperWidget com Tabulator 6.4.0 (CDN), autocompletes próprios, filtros com a
  validação da tela antiga, seleção por caixa de marcação, ação em lote, ações por linha por status —
  tudo sobre `NWM_DADOS_MOCK` / `NWM_FONTES` / `NWM_STATUS` / `NWM_ACOES`.
- `widget_nw_manutEtiq.css`: paleta Branco Peres sob `.fluig-style-guide.nwm`.
- `edit.ftl`: card de identificação.

**Aba única** (decisão do usuário): as duas abas da tela antiga foram unificadas. O mockup é a **visão ADM**;
não há checagem de permissão, não há a visão do não-ADM e **não há o campo C. Barras** (é exclusivo do não-ADM).

## Tela
### Filtros (todos visíveis, sem bloco colapsável; todos faixa De/Até)
Estabelecimento (**obrigatório**) · Itens · Depósito · Cód Barras · Lote · Data Validade (`input type=date`)
· Família · Nota Fiscal (rádio **Intervalo** × **Específicas**). Ação: **Buscar**.
Autocomplete (2+ caracteres, busca por código ou descrição) em Estabelecimento, Itens, Depósito e Família;
nos campos de faixa o autocomplete preenche **só o código**.

Validação herdada da tela antiga (`validarFiltros()`): Estabelecimento De **e** Até obrigatórios; e é
obrigatório preencher **Itens ou Nota Fiscal**. O aviso sai em `FLUIGC.toast({type:'warning'})` e o campo
que falta fica marcado.

### Barra de seleção (acima da tabela)
Contador ("N etiquetas selecionadas · N itens") · tabela **Itens selecionados** (Código | Descrição | Qtde Sel.,
resumo do que está marcado) · **Ação em lote** (Selecione | Imprimir | Receber | Estornar | Transferir) + **Aplicar** ·
**Escolher item** + **Quantidade** + **Executar** (marca automaticamente as etiquetas cheias do item,
com status Em estoque ou Impressa, até atingir a quantidade pedida).

### Tabela
marcação | Código | Descrição | Fazenda | Etiqueta | Lote | Data Val. | Qtde Emb | Qtde Saldo | Status | Ações
- **Tabela inteira, sem paginação** (decisão do usuário): altura própria (`maxHeight: 560`) com cabeçalho fixo
  na rolagem e DOM virtual do Tabulator. O rodapé mostra "Mostrando N etiquetas".
- **Ordenação por coluna ligada**; ordem inicial Código → Etiqueta.
- Marcar/desmarcar todos no cabeçalho vale só para o que está visível depois do filtro; trocar o filtro limpa a seleção.
- **Status é chip colorido na célula** (a tela antiga pintava a linha inteira). A legenda do rodapé virou o
  botão de ajuda ao lado do título da coluna Status, que abre o modal "Legenda dos status".
- **Ações são botões só-ícone** com `title` + `aria-label`: Detalhes `bi-eye` · Imprimir `bi-printer` ·
  Receber `bi-box-arrow-in-down` · Estornar `bi-arrow-counterclockwise` · Descartar `bi-trash3` ·
  Transferir `bi-arrow-left-right`.

### Status, legenda e ações por status (visão ADM)
| Status (chave no JS) | Rótulo | Legenda | Ações além de Detalhes |
|---|---|---|---|
| `nao-impresso` | Não Impresso | Etiqueta gerada e não impressa | Imprimir |
| `impressa` | Impressa | Etiqueta gerada e impressa | Receber, Descartar, Imprimir |
| `em-estoque` | Em estoque | Recebida pela fazenda e disponível no barracão | Estornar, Descartar, Transferir |
| `zerada` | Zerada | Etiqueta bipada e devolvida com quantidade zero para o barracão | Estornar, Descartar |
| `armazenada-bag` | Armazenada em Bag | Embalagem vazia descartada pelo fluxo correto | — |
| `descartado` | Descartado | Embalagem descartada por perda, roubo ou dano | Estornar |

Status **"Em campo"**: existe no código da tela antiga, não está na legenda — ignorado por decisão do usuário.

### Efeito das ações no mockup
Toda ação pede confirmação em `<dialog>`. Só são aplicadas as transições que a legenda da tela antiga torna
inequívocas: **Imprimir → Impressa**, **Receber → Em estoque**, **Descartar → Descartado** (muda o status na
tela e pisca a linha em amarelo). **Estornar** e **Transferir** não têm destino definido: avisam
"regra a definir" e não alteram nada.

## Recursos declarados no `application.info`
| Índice | Tipo | Valor |
|---|---|---|
| 1 | js | `/resources/js/widget_nw_manutEtiq.js` |
| 2 | css | `/resources/css/widget_nw_manutEtiq.css` |

Próximo índice livre: 3

Recursos externos carregados pelo `view.ftl` (CDN): Bootstrap Icons 1.11.3, fonte Mulish (Google Fonts),
Tabulator 6.4.0 (CSS no `view.ftl`, JS injetado pelo script com fallback `nwm-tabela-erro`).

## Dados
- Datasets: a definir
- Serviços REST: a definir
- Campos do registro no JS (nome do campo Progress da tela antiga entre parênteses):
  `itCodigo` (`it-codigo`), `descItem` (`desc-item`), `codEstabel` (`cod-estabel`), `etiqueta` (`char-1`),
  `lote` (`lote`), `dtValiLote` (`dt-vali-lote`), `qtidadeIni` (`qtidade-ini`), `qtidadeAtu` (`qtidade-atu`),
  `situacao` (`sit_etiqueta`), mais `deposito`, `familia`, `codBarras`, `notaFiscal` e `unidade` —
  usados pelos filtros e pelo modal de detalhes, **nome do campo no banco a confirmar**.

## Parâmetros de configuração (`edit.ftl`)
Nenhum.

## Regras de negócio
- Estabelecimento De/Até obrigatório; Itens **ou** Nota Fiscal obrigatório.
- As ações disponíveis por linha dependem do status (tabela acima).
- "Escolher item + Quantidade" não cadastra nada: só marca etiquetas cheias (saldo = quantidade da embalagem)
  com status Em estoque ou Impressa, até atingir a quantidade pedida.

## Pendências / decisões em aberto
- Trocar os mocks (`NWM_DADOS_MOCK`, `NWM_FONTES`) pelos datasets/serviços REST quando existirem.
- Permissão de ADM: lista de grupos do Fluig (pertencer a qualquer um libera) — grupos ainda não definidos,
  e falta decidir se ficam fixos no JS ou vêm como parâmetro do `edit.ftl`. Na tela antiga eram
  `adm_abas_etiquetas` (exibia a aba Administrador) e `adm_etiquetas` (liberava estabelecimento/depósito e ações).
- Visão do não-ADM (só Receber, campo C. Barras, sem ação em lote e sem Escolher Item/Quantidade).
- Botão **Gerar etiquetas** do cabeçalho: no mockup só avisa. Corresponde ao botão Impressora do topo da tela
  antiga, que não produziu efeito visível no ambiente de teste — **perguntar ao usuário o que ele faz**.
- Nota Fiscal "Específicas": a tela antiga usa um array próprio (`arrayDadosNfEspecificas`), provavelmente
  alimentado por um modal de lista. No mockup é um campo com as notas separadas por vírgula — regra a definir.
- Regra de **Estornar** (status de destino) e de **Transferir** (destino: estabelecimento? depósito?).
- "Qtde Sel." da tabela Itens selecionados: no mockup é a soma do **saldo** (`qtidadeAtu`) das etiquetas
  marcadas daquele item — confirmar se é isso ou a quantidade da embalagem.
- Status "Em campo" (ignorado por ora).
- Confirmar se o repositório git deve ficar nesta pasta ou na raiz `brancoperes2026` (hoje está nesta pasta).
