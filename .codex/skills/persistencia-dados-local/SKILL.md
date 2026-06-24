---
name: persistencia-dados-local
description: Orienta persistência de dados local em apps React Native/Expo. Use quando a tarefa envolver armazenamento offline, MMKV, AsyncStorage, cache local, sessão, tokens, preferências, hidratação de estado, migração de storage, segurança de dados no dispositivo ou sincronização local/remota.
---

# Persistência de Dados Local

## Visão Geral

Use esta skill para salvar dados no dispositivo com segurança, desempenho e clareza de ciclo de vida. Diferencie preferências locais, cache remoto, sessão, fila offline e dados sensíveis antes de escolher MMKV, AsyncStorage ou outro armazenamento.

## Escolha da Tecnologia

- Use MMKV para leitura/escrita rápida, flags, preferências, pequenas estruturas e hidratação síncrona quando o projeto já suporta a dependência nativa.
- Use AsyncStorage para persistência simples e assíncrona quando performance extrema não é necessária ou quando o projeto já padronizou essa API.
- Use SecureStore/Keychain/Keystore ou solução segura existente para tokens e segredos sensíveis; não guardar segredo puro em storage comum.
- Use TanStack Query persist ou cache dedicado quando o dado é essencialmente resposta remota cacheável.
- Use SQLite/Watermelon/Realm apenas quando houver volume, consultas ou relacionamentos que justifiquem banco local.

## Fluxo de Trabalho

1. Classifique o dado: sensível, derivado, cache remoto, preferência, rascunho, fila offline ou estado de sessão.
2. Verifique storage helpers existentes, padrões de serialização e estratégia de logout/reset.
3. Defina chave, versão do schema, formato serializado e comportamento quando o dado está ausente/corrompido.
4. Planeje hidratação inicial para não piscar UI ou liberar tela protegida antes de carregar sessão.
5. Adicione migração ou fallback quando alterar formato de dados já persistidos.
6. Teste logout, reinstalação, atualização, modo offline e troca de usuário quando aplicável.

## Segurança e Integridade

- Não persistir senha, token ou documento sensível em texto claro sem necessidade e proteção adequada.
- Separar dados por usuário/tenant quando o app permite troca de conta.
- Limpar dados no logout conforme o risco: sessão, cache privado, preferências compartilhadas e filas.
- Validar JSON parse e tratar storage corrompido com recuperação segura.
- Evitar persistir estado derivado que pode ficar obsoleto ou divergir da fonte de verdade.

## Offline e Sincronização

- Para rascunhos, guardar timestamps, versão e estado de envio.
- Para filas offline, definir idempotência, retry, ordem de envio e resolução de conflito.
- Para cache, explicitar expiração, invalidação e o que pode ser mostrado sem rede.
- Não misturar cache local com estado global sem definir fonte de verdade.

## Checklist de Revisão

- A escolha entre MMKV, AsyncStorage e storage seguro está justificada?
- Dados sensíveis estão protegidos ou não são persistidos?
- Há estratégia para hidratação, logout e troca de usuário?
- O formato persistido tem versão ou fallback?
- Offline, cache e sincronização têm fonte de verdade clara?
