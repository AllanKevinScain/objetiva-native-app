---
name: ecossistema-expo
description: Orienta domínio do ecossistema Expo em apps React Native/Expo. Use quando a tarefa envolver Expo config, app.json/app.config, Prebuild, config plugins, EAS Build, EAS Submit, eas.json, credenciais, perfis de build, OTA updates, Expo modules, permissões ou diagnóstico de builds Expo.
---

# Ecossistema Expo

## Visão Geral

Use esta skill para trabalhar com Expo como caminho padrão de configuração, build e submissão de apps React Native. Priorize soluções compatíveis com o managed workflow e use Prebuild apenas quando houver necessidade real de código/configuração nativa gerada.

## Fluxo de Trabalho

1. Identifique SDK Expo, versão do React Native, `app.json`/`app.config.*`, `eas.json` e scripts do projeto.
2. Verifique se a necessidade é resolvida por Expo config, plugin, módulo Expo ou dependência compatível antes de editar nativo gerado.
3. Para mudanças nativas, preferir config plugins e propriedades declarativas em vez de editar `android/` e `ios/` manualmente quando o projeto usa Prebuild.
4. Validar perfis de build em `eas.json`: development, preview, production, env vars, distribuição e canais.
5. Conferir credenciais, bundle identifiers, package names, versioning e permissões antes de build/submissão.
6. Rodar comandos Expo/EAS relevantes conforme o escopo e registrar limitações se rede/credenciais impedirem execução.

## Expo Config e Prebuild

- Centralize nome, slug, scheme, ícones, splash, permissões e identifiers na configuração Expo.
- Use `app.config.ts` quando valores dependem de ambiente, CI ou perfis EAS.
- Trate `android/` e `ios/` gerados como saída do Prebuild quando o projeto segue esse fluxo.
- Use config plugins para permissões, manifests, plist e ajustes nativos repetíveis.
- Evite editar arquivos gerados sem entender se a mudança será perdida no próximo Prebuild.

## EAS Build e Submit

- Separe perfis de development, preview e production com objetivos claros.
- Mantenha variáveis sensíveis fora do repositório; usar EAS secrets ou mecanismo já adotado.
- Garanta versioning coerente: `version`, `buildNumber`, `versionCode` e runtime version quando houver updates.
- Antes de submit, conferir metadados de loja, credenciais, package/bundle id e assinatura.
- Para falhas de build, ler primeiro o erro raiz do log, não apenas a última linha.

## OTA Updates

- Use updates para JavaScript/assets compatíveis com o runtime nativo instalado.
- Não assumir que mudanças em permissões, módulos nativos ou config nativa chegam via OTA.
- Defina canais/branches com cuidado para evitar enviar update a usuários errados.

## Checklist de Revisão

- A solução preserva o fluxo Expo/Prebuild do projeto?
- `app.config` e `eas.json` representam corretamente ambientes e builds?
- Credenciais e segredos não foram expostos?
- Mudanças nativas são reproduzíveis por config/plugin?
- Build, submit e updates respeitam versioning e runtime?
