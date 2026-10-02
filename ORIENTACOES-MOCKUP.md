# widget_nw_manutEtiq — orientações para construir o mockup

> Documento de passagem de bastão: foi escrito numa sessão que acabou antes de implementar.
> Quem pegar daqui tem tudo o que é preciso para montar o mockup sem voltar ao servidor.
> **Antes de escrever qualquer linha**, ler os dois `CLAUDE.md` já existentes (raiz do repositório e
> `wcm/widget/widget_nw_itensComCtrllDeEmb/CLAUDE.md`) e abrir os fontes da `widget_nw_itensComCtrllDeEmb`,
> que é a referência visual mais completa.

---

## 1. Objetivo

Refazer, **só como mockup** (dados mockados em JS, sem dataset e sem REST), a tela legada
**Manutenção Itens/Etiquetas** do Fluig, dentro da widget `wcm/widget/widget_nw_manutEtiq/`,
no mesmo padrão visual das widgets `widget_nw_embalagens` (prefixo `nwe`) e
`widget_nw_itensComCtrllDeEmb` (prefixo `nwi`). Prefixo desta: **`nwm`**.

A tela nova se chama **"Manutenção Embalagens"** (a legada se chama "Manutenção Itens/Etiquetas").

Tela legada (ambiente de teste, exige login):
`http://fluig-web-teste.brancoperes.com.br:8190/portal/p/1/v2_widget_manutencao_etiquetas`
Fonte JS da tela legada (7.883 linhas, só leitura, não está no repositório):
`/ver2_manutencaodeetiquetas/resources/js/ver2_manutencaodeetiquetas_pt_BR.js`

---

## 2. Decisões já tomadas pelo usuário (não reabrir)

| # | Decisão |
|---|---|
| 1 | **Aba única.** As duas abas da tela antiga ("Recebimento Etiquetas" e "Administrador") viram uma só. O que era exclusivo do administrador aparece conforme permissão. |
| 2 | **O mockup é a visão ADM.** Não desenhar a visão do não-ADM agora, nem a tela de configuração de grupos. |
| 3 | **Permissão = lista de grupos** (pertencer a qualquer um libera o modo ADM). Os grupos ainda não foram definidos; não implementar essa checagem no mockup. |
| 4 | **C. Barras (bipagem) é exclusivo do NÃO-ADM** — logo, **não entra no mockup**. |
| 5 | **Todos os 8 filtros visíveis na tela.** Nada de bloco "Filtros avançados" nem colapsável. |
| 6 | **Tabela inteira**, sem paginação (a tela antiga usa `paging: false`). |
| 7 | **Ordenação por coluna ligada** (a antiga tem `ordering: false`), com ordem inicial Código → Etiqueta. |
| 8 | **Status "Em campo"**: ignorar por enquanto (existe no código antigo, falta na legenda da tela). |
| 9 | Não mexer em dataset, serviço REST ou regra de negócio: **não inventar**. O que não se sabe fica "a definir". |
| 10 | **Nome da tela: "Manutenção Embalagens"** (a legada se chama "Manutenção Itens/Etiquetas"). O `application.code` da widget continua `widget_nw_manutEtiq`; muda só o título exibido no cabeçalho, no `edit.ftl` e no `CLAUDE.md`. |

---

## 3. O que a tela legada faz (levantamento feito em 02/10/2026)

### 3.1 Estrutura da tela antiga
Título → botão **Impressora** → dois alertas "AGUARDE!" (gerando código de barras / embalagem) →
**abas** → filtros → botão Pesquisar + tabela de seleção → barra de ação → tabela principal → **Legenda**.

Detalhe importante: filtros (`#filtros`), tabela de seleção (`#tabelaDadosEncontrados`),
tabela principal (`#tabelaDados`) e legenda **ficam fora dos tab-panes** — são compartilhados.
Cada tab-pane continha **apenas a barra de ação**. Por isso a unificação em aba única é natural.

### 3.2 Diferença entre as duas abas antigas

| | Recebimento Etiquetas (`#tabExecutarAcao`) | Administrador (`#tabPesquisar`) |
|---|---|---|
| Controle | `Acão:` select *Selecione \| Receber* | `Ação em lote:` select *Selecione \| Imprimir \| Receber \| Estornar \| Transferir* + botão **Aplicar** |
| Extras | `C. Barras:` (bipagem, foco/select automático, `keyup` do leitor) + `Quantidade` | `Escolher Item:` (select2) + `Quantidade:` + **Executar** |
| Botão | Executar | — |

O bloco **Escolher Item + Quantidade + Executar** não cadastra nada: ele **marca automaticamente**
etiquetas daquele item com saldo igual à embalagem cheia (status *Em estoque* / *Impressa*) até
atingir a quantidade pedida. A tabela `Código | Descrição | Qtde. Sel.` é o **resumo do que está marcado**.

### 3.3 Permissões da tela antiga (para referência; não implementar agora)
Duas funções, ambas `GET /api/public/2.0/users/getCurrent` lendo `content.groups`, com `$.ajax` **síncrono**:
- `acessoAbasAdm()` → grupo **`adm_abas_etiquetas`**. Único efeito: exibir a aba "Administrador".
- `pertenceAoGrupo()` → grupo **`adm_etiquetas`**. Libera estabelecimento/depósito fora do vínculo do usuário e ações restritas.

**Comportamento do não-ADM** (guardado para quando for implementado): só a ação *Receber*; tem o campo
C. Barras; sem ação em lote e sem Escolher Item/Quantidade; nas linhas, só **Detalhes** sempre e
**Receber** quando o status for *Impressa*.

### 3.4 Filtros (todos faixa De/Até)
`Itens` · `Estabelecimento` · `Depósito` · `Cód Barras` · `Lote` · `Data Validade` (`input type=date`)
· `Família` · `Nota Fiscal` (com rádio **Intervalo × Específicas**).

**Validação herdada** (`validarFiltros()`):
- Estabelecimento **De e Até obrigatórios**;
- obrigatório preencher **Itens OU Nota Fiscal**;
- erro sai em `FLUIGC.toast({type:'warning'})`.

### 3.5 Colunas da tabela principal
checkbox (marcar/desmarcar todos no `<th>`) · **Código** (`it-codigo`) · **Descrição** (`desc-item`) ·
**Fazenda** (`cod-estabel`) · **Etiqueta** (`char-1`) · **Lote** (`lote`) · **Data Val.** (`dt-vali-lote`,
exibida com `substring(0,10)`) · **Qtde Emb** (`qtidade-ini`) · **Qtde Saldo** (`qtidade-atu`) ·
**Status** (`sit_etiqueta`) · **Ações**.

### 3.6 Status e cores
Classes da tela antiga: `status-nao-impresso`, `status-impresso`, `status-em-estoque`, `status-em-campo`,
`status-zerada`, `status-armazenado`, `status-descartado`. A legenda ao pé da tela antiga diz:

| Status | Significado | Cor na tela antiga |
|---|---|---|
| Não Impresso | Etiqueta gerada e não impressa | verde claro |
| Impressa | Etiqueta gerada e impressa | vermelho claro |
| Em estoque | Recebida pela fazenda e disponível no barracão | azul claro |
| Zerada | Etiqueta bipada e devolvida com quantidade zero para o barracão | cinza azulado |
| Armazenada em Bag | Embalagem vazia descartada pelo fluxo correto | verde |
| Descartado | Embalagem descartada por perda, roubo ou dano | laranja |

(*Em campo* existe no código, não na legenda — decisão #8: ignorar.)

### 3.7 Ações por linha, por status (visão ADM — é a que vale para o mockup)
Sempre **Detalhes**, mais:

| Status | Botões adicionais |
|---|---|
| Não Impresso | Imprimir |
| Impressa | Receber, Descartar, Imprimir |
| Em estoque | Estornar, Descartar, Transferir |
| Zerada | Estornar, Descartar |
| Descartado | Estornar |
| Armazenada em Bag | nenhum (só Detalhes) |

---

## 4. Padrão visual a seguir (resumo; a fonte da verdade são os fontes do `nwi`)

Ler `wcm/widget/widget_nw_itensComCtrllDeEmb/src/main/webapp/resources/css/widget_nw_itensComCtrllDeEmb.css`
inteiro antes de escrever o CSS — o do `nwm` é esse mesmo CSS com o prefixo trocado e os blocos novos.

### 4.1 Carregamento (topo do `view.ftl`, fora da div)
Três `<link>` de CDN: **Bootstrap Icons 1.11.3**, fonte **Mulish** (400/600/700/800),
**Tabulator 6.4.0 CSS** (tema `tabulator_simple`). O JS do Tabulator é injetado pelo script
(promessa única no escopo do arquivo, com fallback `<p class="nwm-tabela-erro">` se o CDN falhar).

### 4.2 Container
```
<div id="widget_nw_manutEtiq_${instanceId}"
     class="super-widget wcm-widget-class fluig-style-guide nwm"
     data-params="widget_nw_manutEtiq.instance()">
```
Todo `id` interno termina em `-${instanceId}`. Ligação com o JS só por `data-*`, nunca por id fixo.
**Todo seletor CSS começa com `.fluig-style-guide.nwm`** — sem isso o Style Guide vence por especificidade.

### 4.3 Paleta (variáveis no container)
| Token | Valor | Uso |
|---|---|---|
| `--nwm-verde` / `--nwm-verde-escuro` | `#006B35` / `#00552A` | ação principal, foco, seleção |
| `--nwm-amarelo` | `#FFD200` | flash da linha nova/alterada |
| `--nwm-vermelho` / `--nwm-vermelho-escuro` | `#ED1C24` / `#C4161C` | excluir/descartar; texto de erro |
| `--nwm-tinta` / `--nwm-tinta-suave` | `#20201E` / `#5E5D57` | texto / texto secundário |
| `--nwm-marfim` | `#F7F5EE` | filtros, header e footer da tabela, readonly |
| `--nwm-nevoa` | `#E5EDE3` | hover de linha, hover de sugestão |
| `--nwm-linha` / `--nwm-borda-campo` | `#E3E1D8` / `#D3D1C7` | bordas |

### 4.4 Medidas repetidas
padding do widget 28px (16px no celular) · altura 44px em input e botão · raio 10px (campo/botão),
12px (sugestões), 14px (filtros/tabela), 16px (modal) · foco `box-shadow 0 0 0 3px rgba(0,107,53,.18~.28)`
· transições 0.2s · corpo 15px, rótulo/botão 13–14px · título do cabeçalho 26px/800.

### 4.5 Blocos prontos para reaproveitar do `nwi`
cabeçalho com selo redondo 56px · card de filtros marfim · autocomplete (`[data-auto]` + `.nwm-sugestoes`,
delegação a partir da div do widget, `mousedown` na sugestão, setas/Enter/Esc) · switch · botões
`nwm-btn` / `-destaque` / `-contorno` / `-perigo` · botões de ação só-ícone 34px · `<dialog>` nativo
(cadastro 720px e confirmação 420px, backdrop com blur, fecha por Esc/backdrop) · sobrescrita completa
do tema `simple` do Tabulator · `@media` 1199px e 767px · `@media (prefers-reduced-motion: reduce)`.

### 4.6 JS
`var widget_nw_manutEtiq = SuperWidget.extend({...})`, `bindings.local` só com `data-*` e `global: {}` vazio,
tudo escopado por `$(sel, this.DOM)`, eventos com namespace `.nwm` + `instanceId`, dados mockados em
constantes `NWM_DADOS_MOCK` / `NWM_FONTES` com comentário "trocar pelo dataset/REST quando existir".
Comentários em português, curtos, explicando o **porquê**.

### 4.7 Acessibilidade (faz parte do padrão, não é opcional)
`role`/`aria-*` em combobox, listbox e alertdialog; navegação por setas/Home/End; `:focus-visible` em tudo;
`aria-label` nos botões só-ícone.

---

## 5. Layout proposto para esta tela (aprovado pelo usuário)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ (◎)  Manutenção Embalagens                                [ + Gerar etiquetas ] │
│      Consulte, receba, imprima e movimente as etiquetas.                        │
├────────────────────────────────────────────────────────────────────────────────┤
│ ┌── filtros (card marfim, grid 4 colunas) ───────────────────────────────────┐ │
│ │ Estabelecimento *      Itens                 Depósito          Cód Barras   │ │
│ │ [ De ] [ Até ]         [ De ] [ Até ]        [ De ] [ Até ]    [ De ][ Até ]│ │
│ │ Lote                   Data Validade         Família                        │ │
│ │ [ De ] [ Até ]         [ dd/mm ][ dd/mm ]    [ De ] [ Até ]                 │ │
│ │ Nota Fiscal  ( ) Intervalo  (•) Específicas                    [ Buscar ]   │ │
│ │ [ De ] [ Até ]                                                              │ │
│ └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│ 3 etiquetas selecionadas · 2 itens          Ação em lote [ Selecione  ▾] [Aplicar]│
│ ┌ Itens selecionados ────────────┐          Escolher item [ Selecione ▾]          │
│ │ Código  Descrição    Qtde Sel. │          Quantidade [      ] [ Executar ]      │
│ └────────────────────────────────┘                                               │
│                                                                                 │
│ ┌──────────────────────────────────────────────────────────────────────────────┐│
│ │ ☐ │Código│Descrição│Fazenda│Etiqueta│Lote│Data Val.│Qtde Emb│Saldo│Status│Ações││
│ │ ☐ │365131│DIMEXION │ 10901 │ 000123 │ L1 │10/12/26 │   20   │  20 │●Impressa│⋯ ││
│ └──────────────────────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────────────────┘
```

Mudanças em relação à tela antiga, todas dentro do padrão `nwe`/`nwi`:

1. **Status vira chip colorido na célula**, em vez de pintar a linha inteira. A legenda do rodapé deixa de
   ser necessária na página e vira ajuda (ícone/tooltip) no cabeçalho da coluna Status. Os textos da
   legenda estão na seção 3.6 — manter as explicações.
2. **Ações por linha viram botões só-ícone** com `title` + `aria-label`:
   Detalhes `bi-eye` · Imprimir `bi-printer` · Receber `bi-box-arrow-in-down` ·
   Estornar `bi-arrow-counterclockwise` · Descartar `bi-trash3` · Transferir `bi-arrow-left-right`.
   Hoje são até 4 botões de texto que estouram a coluna.
3. **Barra de seleção acima da tabela** reúne o contador do que está marcado, a tabela
   "Itens selecionados", a ação em lote e o bloco escolher item/quantidade — hoje espalhados em dois
   blocos distantes.
4. **Cabeçalho da tabela fixo** ao rolar e rolagem própria da tabela (consequência de "tabela inteira",
   decisão #6). O Tabulator renderiza em DOM virtual, então a lista inteira não pesa.

---

## 6. Escopo do trabalho

### Fazer
- `src/main/resources/view.ftl` — a tela inteira descrita na seção 5.
- `src/main/webapp/resources/css/widget_nw_manutEtiq.css` — paleta e blocos da seção 4, prefixo `nwm`.
- `src/main/webapp/resources/js/widget_nw_manutEtiq.js` — SuperWidget com Tabulator, filtros, seleção,
  ação em lote, ações por linha e modais, **tudo sobre dados mockados**.
- `src/main/resources/edit.ftl` — card de identificação, igual ao das outras widgets
  (título, subtítulo, versão/data).
- `CLAUDE.md` do widget — copiar de `<raiz>/.claude/docs/widget-CLAUDE.template.md` e preencher com o que
  está aqui; o que não se sabe fica "a definir".

### Não fazer
- Nenhum dataset, nenhum serviço REST, nenhuma chamada ao Fluig além do que o SuperWidget já faz.
- Nenhuma checagem de permissão/grupo (decisões #2 e #3).
- Nenhum campo C. Barras (decisão #4).
- Não incluir jQuery, Bootstrap ou Style Guide: o Fluig já carrega (jQuery 3.6.3, Bootstrap **3**.4.1,
  Style Guide 2.5.0). Nada de classes Bootstrap 4/5 (`d-flex`, `ms-*`, `gap-*`, `data-bs-*`) nem `glyphicon`.

### `application.info`
Já tem `application.resource.js.1` e `application.resource.css.2`. **Próximo índice livre: 3**, caso
precise declarar algum componente misc (`fluigfilter`, etc.) — provavelmente não precisa.

### Encoding (crítico)
Todos os fontes deste repositório estão em **UTF-8 sem BOM + CRLF**, inclusive os `.md`.
Depois de editar, conferir: `grep -c $'\r' arquivo` deve bater com o número de linhas do arquivo.

---

## 7. Pendências / a definir

- Datasets e serviços REST que vão alimentar a tela (hoje: mock).
- Grupos do Fluig que dão permissão de ADM, e como configurá-los (fixo no JS × parâmetro no `edit.ftl`).
- Visão do não-ADM (seção 3.3 descreve o comportamento da tela antiga).
- O que faz o botão **Impressora** do topo da tela antiga: clicado no ambiente de teste, não produziu
  efeito visível — provavelmente depende de dados ou de configuração de impressora. **Perguntar ao usuário.**
- Nota Fiscal "Específicas": na tela antiga usa um array próprio (`arrayDadosNfEspecificas`),
  provavelmente alimentado por um modal de lista. Não foi possível ver funcionando (base de teste vazia).
- Status "Em campo" (decisão #8: ignorado por ora).
- Confirmar se o repositório git deve ficar nesta pasta ou na raiz `brancoperes2026`
  (hoje foi criado **nesta pasta**, `wcm/widget/widget_nw_manutEtiq/`).

---

## 8. Estado do widget quando este documento foi escrito

Esqueleto gerado pela fluig-vscode-extension, sem nenhuma lógica: `view.ftl` e `edit.ftl` com 3 linhas,
`widget_nw_manutEtiq.js` com 21 linhas (`init()` e `executeAction()` vazios), CSS com 1 linha,
os 4 `.properties` vazios. `application.info` com `application.code=widget_nw_manutEtiq`,
versão `0.1.0`, categoria `SYSTEM`, context-root `/widget_nw_manutEtiq`.
