---
name: codigo-nativo-minimo
description: Orienta conhecimento mínimo de código nativo Android/iOS em apps React Native/Expo. Use quando a tarefa envolver AndroidManifest.xml, Info.plist, Gradle, CocoaPods, Xcode, Podfile, permissões nativas, build errors, config plugins, módulos nativos, flavors/schemes ou diagnóstico de integração nativa.
---

# Código Nativo Mínimo

## Visão Geral

Use esta skill para lidar com os pontos inevitáveis de Android e iOS em projetos React Native/Expo. O objetivo é entender e ajustar o mínimo necessário com segurança, preservando o fluxo declarativo do projeto quando ele usa Expo/Prebuild.

## Fluxo de Trabalho

1. Identifique se `android/` e `ios/` são mantidos manualmente ou gerados por Expo Prebuild.
2. Leia logs de build procurando o primeiro erro causal, pacote afetado, versão de SDK e arquivo envolvido.
3. Antes de editar nativo, verifique se há solução via Expo config, config plugin ou documentação da biblioteca.
4. Se editar nativo, limitar a mudança ao arquivo necessário e explicar por que não é declarativa.
5. Conferir impacto em Android e iOS separadamente; muitas permissões e capabilities têm nomes e requisitos diferentes.
6. Rodar build, lint ou comando diagnóstico quando disponível e viável.

## Android

- Use `AndroidManifest.xml` para permissões, activities, intent filters, deep links e metadata.
- Verifique `build.gradle`, `settings.gradle` e versão do Android Gradle Plugin quando houver erro de dependência ou compilação.
- Entenda `minSdkVersion`, `targetSdkVersion`, namespace, applicationId e signing configs antes de alterar.
- Para permissões sensíveis, considerar também runtime permissions no JavaScript.
- Ao mexer em flavors/build types, garantir que package name, env vars e assets estejam coerentes.

## iOS

- Use `Info.plist` para permissões, URL schemes, ATS, background modes e chaves exigidas por SDKs.
- Verifique `Podfile`, pods e deployment target em erros de CocoaPods.
- Entenda bundle identifier, signing, capabilities e entitlements antes de alterar Xcode project.
- Após mudanças em pods, considerar instalação limpa quando erro indicar cache ou lock inconsistente.
- Para permissões de câmera, localização, fotos e notificações, garantir strings de uso claras.

## Expo e Config Plugins

- Em projetos Expo, preferir `app.config.*` e plugins para alterações reproduzíveis.
- Evitar depender de alteração manual em `android/` ou `ios/` se o próximo Prebuild puder sobrescrever.
- Quando uma biblioteca exige etapa nativa, verificar se já existe plugin oficial ou comunitário confiável.

## Checklist de Revisão

- A mudança nativa é realmente necessária?
- Ela sobrevive a Prebuild ou está documentada como manual?
- Android e iOS foram considerados separadamente?
- Permissões têm configuração nativa e fluxo runtime quando necessário?
- O erro de build foi resolvido na causa raiz, não só silenciado?
