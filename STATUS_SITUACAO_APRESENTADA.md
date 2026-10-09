# Status das etiquetas: códigos de `situacaoApresentada` e cores dos selos

Anotado em 09/10/2026. Objetivo: dar uma cor a cada selo (badge) da legenda e da linha da tabela. Para isso é preciso saber o código que o backend devolve em `situacaoApresentada` para cada status.

## Decisão do usuário (09/10/2026)
- A legenda (`montarLegenda()`) não consulta mais a API: os 9 status ficam fixos no código (`NWM_LEGENDA_STATUS` em `widget_nw_manutEtiq.js`).
- Cada selo terá uma cor própria, de acordo com o que o status representa.
- O selo na linha da tabela deve ter a mesma cor do selo da legenda.
- Antes de aplicar as cores, descobrir o código de cada situação. **Não alterar o código até ter os códigos.**

## Os 9 status da legenda (texto dado pelo usuário)
| Rótulo | Descrição | Código em `situacaoApresentada` |
|---|---|---|
| Não impressa | Impressão ainda não confirmada. | `NAO_IMPRESSA` (confirmado) |
| Impressa | Aguarda recebimento físico no almoxarifado. | `IMPRESSA` (por padrão, aprovado pelo usuário em 09/10/2026; não visto nos dados) |
| Em estoque | Recebimento físico confirmado. | `EM_ESTOQUE` (confirmado) |
| Em campo | Registrada na posição de campo. | `EM_CAMPO` (por padrão, aprovado pelo usuário em 09/10/2026; não visto nos dados) |
| Aguardando recebimento | Em trânsito para o destino. | `AGUARDANDO_RECEBIMENTO` (por padrão, aprovado pelo usuário em 09/10/2026; não visto nos dados) |
| Em terceiro | Embalagem sob custódia de terceiro para armazenagem. | `EM_TERCEIRO` (por padrão, aprovado pelo usuário em 09/10/2026; não visto nos dados) |
| Zerada | Sem conteúdo, ainda fora de uma Bag. | `ZERADA` (por padrão, aprovado pelo usuário em 09/10/2026; não visto nos dados) |
| Em Bag | Vinculada a uma Bag ainda não enviada. | `EM_BAG` (por padrão, aprovado pelo usuário em 09/10/2026; não visto nos dados) |
| Descartada | Descarte registrado no envio da Bag. | `DESCARTADA` (por padrão, aprovado pelo usuário em 09/10/2026; não visto nos dados) |

Também existe `CANCELADA` ("Cancelada"), visto no TESTE, que **não está** na lista dos 9. Cor definida (bordô, na paleta abaixo). A definir: se entra na legenda.

## O que já se sabe (fonte: `RETOMADA_SESSAO.md` §6.14, conferido no TESTE em 08/10/2026, 50 etiquetas)
| `situacao` | `situacaoApresentada` | `descricaoSituacao` | impressaoConfirmada | recebimentoFisicoConfirmado | Qtde |
|---|---|---|---|---|---|
| `ATIVA` | `NAO_IMPRESSA` | "Nao impressa" (sem acento) | false | false | 39 |
| `ATIVA` | `EM_ESTOQUE` | "Em estoque" | true | true | 1 |
| `CANCELADA` | `CANCELADA` | "Cancelada" | false | false | 10 |

Os outros códigos não apareceram nessa amostra.

## Onde procurei e não achei os códigos (09/10/2026)
- `widget_nw_embalagens/` (inclui `datasets/dsNwEmbalagens.js`): nenhuma ocorrência de `situacaoApresentada`, `descricaoSituacao`, `NAO_IMPRESSA` ou `EM_ESTOQUE`. O Dataset só repassa o que o REST devolve; a lista de códigos não está no fonte do Dataset.
- `evidencias/`: nenhuma ocorrência.
- Só o `widget_nw_manutEtiq` (JS, CSS, `RETOMADA_SESSAO.md`, `AGENTS.md`/`CLAUDE.md`) cita `situacaoApresentada`.

Conclusão: a lista completa de códigos **vem do backend (REST Datasul)** e não está em nenhum fonte desta pasta. Não inventar os códigos.

## Como descobrir os códigos
1. Perguntar ao responsável pelo backend/REST a lista fechada de valores de `situacaoApresentada` (e o texto de `descricaoSituacao` de cada um).
2. Ou listar o que existe nos dados: consultar `consultarEtiquetas` (somente leitura, TESTE) em estabelecimentos/itens variados e agrupar por `situacaoApresentada`, `descricaoSituacao`, `impressaoConfirmada` e `recebimentoFisicoConfirmado`. Só vão aparecer os status que existirem nos dados consultados; um status sem etiqueta não aparece.
3. Registrar aqui a tabela completa e só então aplicar as cores.

## Paleta (aprovada em 09/10/2026, aplicada no CSS)
Ponto na cor cheia, fundo pastel, texto carvão `#20201E`. Já existentes: cinza, verde e vermelho da marca. Azul, laranja, roxo e turquesa seriam novos, só para os selos.

| Status | Cor | Ponto / borda | Fundo |
|---|---|---|---|
| Não impressa | Cinza | `#5E5D57` | `#F7F5EE` |
| Impressa | Amarelo | `#FFD200` (borda `#B39400`) | `#FFF8CC` |
| Em estoque | Verde | `#006B35` | `#E5EDE3` |
| Em campo | Azul | `#1F6FB2` | `#E3EEF7` |
| Aguardando recebimento | Laranja | `#D9701A` | `#FBEBDD` |
| Em terceiro | Roxo | `#6B4C9A` | `#EEE9F5` |
| Zerada | Cinza claro | `#9A988F` | `#EEEDE8` |
| Em Bag | Turquesa | `#16837F` | `#E0F0EF` |
| Descartada | Vermelho | `#ED1C24` | `#FCE6E7` |
| Cancelada | Bordô | `#A8245F` | `#F7E3EC` |

Alternativa só com as cores da marca: verde, amarelo, vermelho e três tons de cinza. Contraste numérico: não medido.

## Como a cor chega na linha e na legenda
- Legenda e tabela usam a mesma função, `montarChipStatus(codigo, descricao)`, que aplica a classe `nwm-chip-<codigo>`.
- Cada cor é uma regra CSS por código em `widget_nw_manutEtiq.css` (hoje só `ATIVA`, `ENCERRADA`, `CANCELADA`, `DESCARTADA`, `EM_ESTOQUE` e `NAO_IMPRESSA`).
- Em `NWM_LEGENDA_STATUS`, os status sem código confirmado estão com `codigo: ''` e usam o selo padrão. A tabela também usa o selo padrão para um código sem regra.
- Depois de ter os códigos: preencher `codigo` na constante e criar uma regra CSS por código. Assim legenda e linha ficam sempre na mesma cor.

## Pendências
- Os 7 códigos seguem o padrão `NOME_EM_MAIÚSCULAS`, mas não foram vistos no backend: se algum vier diferente, ajustar `NWM_LEGENDA_STATUS` e a regra CSS.
- Decidir se `CANCELADA` entra na legenda.
- Validar as cores ao vivo no Fluig; contraste numérico não medido.
- Limpeza opcional: `situacoesApresentadas()` e `textoQuantidadeEtiquetas()` ficaram sem uso na legenda; um teste ainda usa o primeiro.
