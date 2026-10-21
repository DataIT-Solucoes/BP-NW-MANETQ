---
description: Entrega as alterações pendentes do widget (testes, .war, commit e push) com a mensagem informada
argument-hint: "texto da mensagem de commit"
---

Entregar as alterações pendentes deste widget com a mensagem: $ARGUMENTS

1. Rodar `git status --short` e montar a lista de arquivos alterados, novos ou apagados. Tirar da lista o que nunca entra no
   commit: `target/`, `evidencias/`, `debug.log`, `testes/*.cjs`, `pagina_antiga_manutencao_etiquetas/`, `.playwright-mcp/`,
   `srv/`, `em_homologacao/`. Se não sobrar arquivo, avisar e parar.
2. Prefixo da mensagem: se `$ARGUMENTS` já começar com `DOCS: `, `FIX: ` ou `CHORE: `, usar como está. Senão, escolher pelo tipo
   dos arquivos: algum em `src/` → `FIX: `; só `.md`/`docs/`/`AGENTS.md` → `DOCS: `; outros (script, build, `.claude/`) → `CHORE: `.
   Se `$ARGUMENTS` vier vazio, perguntar o texto e parar.
3. Se `src/main/webapp/resources/js/widget_nw_manutEtiq.js` estiver na lista, rodar os quatro testes do `AGENTS.md`
   (`node testes/<nome>.cjs`). Se algum falhar além da falha preexistente de `testar-consulta-etiquetas.cjs`, mostrar a saída e parar.
4. Rodar uma vez, a partir da pasta do widget:
   `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/entregar.ps1 -Mensagem "<PREFIXO: texto>" <arquivos...>`
5. Responder com a mensagem usada, os arquivos, o resultado dos testes, o hash do commit e o resultado do push/.war, como o
   script informar. Se o script falhar, mostrar o erro e não tentar contornar.
