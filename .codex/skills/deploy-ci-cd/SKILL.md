---
name: deploy-ci-cd
description: Orienta deploy e integração contínua em apps React Native/Expo. Use quando a tarefa envolver GitHub Actions, Bitrise, EAS Build, EAS Submit, CI/CD, execução automatizada de lint/testes/typecheck, builds internos, Internal Sharing, TestFlight, versionamento, secrets, releases ou pipelines por commit/branch/tag.
---

# Deploy e CI/CD

## Visão Geral

Use esta skill para automatizar validação, build e distribuição de apps React Native/Expo. A esteira deve ser previsível, segura com secrets e proporcional ao fluxo do time: pull requests validam qualidade, branches/tags geram builds e releases seguem perfis claros.

## Fluxo de Trabalho

1. Inspecione scripts do `package.json`, gerenciador de pacotes, `eas.json`, workflows existentes e requisitos de distribuição.
2. Defina gatilhos: pull request, push em branch principal, tag, release manual ou dispatch.
3. Separe jobs de qualidade: install/cache, lint, typecheck, testes e build quando aplicável.
4. Configure secrets e variáveis sem gravar credenciais no repositório.
5. Para Expo, alinhe perfis EAS, canais, versionamento e tipo de distribuição.
6. Valide YAML, comandos locais possíveis e documentação mínima de como disparar a pipeline.

## GitHub Actions

- Use cache do package manager e instalação determinística (`npm ci`, `pnpm install --frozen-lockfile` ou equivalente).
- Rode lint, typecheck e testes antes de builds caros.
- Separe jobs quando isso melhora paralelismo ou clareza.
- Use `workflow_dispatch` para builds manuais de QA quando útil.
- Restrinja secrets a jobs que realmente precisam deles.

## Bitrise

- Mantenha steps explícitos para install, tests, EAS/Expo ou builds nativos.
- Use env vars e secret groups para credenciais.
- Nomeie workflows por finalidade: PR validation, internal build, TestFlight, production.
- Evite lógica crítica escondida em scripts sem versionamento.

## Expo EAS

- Use `eas build --profile development|preview|production` conforme destino.
- Use Internal Distribution/Internal Sharing para builds de teste Android quando adequado.
- Use TestFlight via EAS Submit ou automação equivalente para iOS beta.
- Confira `EXPO_TOKEN`, Apple/Google credentials, bundle id/package name e versioning.
- Evite rodar submit automaticamente em todo commit sem gates claros.

## Checklist de Revisão

- PRs rodam lint, typecheck e testes?
- Builds internos são reproduzíveis por perfil?
- Secrets estão seguros e limitados?
- Versionamento e canais EAS estão coerentes?
- A pipeline evita custo desnecessário em commits comuns?
