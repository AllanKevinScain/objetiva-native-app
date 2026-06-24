---
name: arquitetura-clean-code
description: Orienta arquitetura e Clean Code em apps React Native/Expo. Use quando a tarefa envolver organização de pastas, feature-first architecture, Atomic Design, separação de responsabilidades, modularização, componentes compartilhados, boundaries, naming, refatoração, redução de acoplamento ou colaboração entre múltiplos devs.
---

# Arquitetura e Clean Code

## Visão Geral

Use esta skill para manter o projeto compreensível, modular e agradável para vários desenvolvedores trabalharem ao mesmo tempo. Prefira a arquitetura já adotada pelo repositório e faça mudanças incrementais, evitando reorganizações grandes sem necessidade.

## Fluxo de Trabalho

1. Leia a estrutura atual de pastas, aliases, convenções de import e exemplos próximos.
2. Identifique o eixo principal do projeto: feature-first, camadas, Atomic Design, módulos ou mistura controlada.
3. Posicione novos arquivos no menor escopo coerente: feature, screen, component shared, hook, service, type ou util.
4. Separe responsabilidades: UI, estado, dados remotos, navegação, validação, side effects e tipos.
5. Evite mover arquivos não relacionados; refatore perto da mudança pedida.
6. Atualize imports, testes e barrels apenas quando isso melhora clareza ou segue padrão local.

## Organização de Pastas

- Use feature-first quando telas e regras de negócio vivem melhor agrupadas por domínio.
- Use Atomic Design para componentes de UI reutilizáveis quando o projeto já organiza atoms, molecules e organisms.
- Coloque componentes compartilhados em `components`/`ui` apenas quando há reutilização real.
- Mantenha serviços de API e adapters longe de componentes visuais.
- Evite pastas genéricas como `helpers` crescendo sem critério; nomes devem revelar domínio.

## Clean Code

- Nomeie funções e componentes pelo papel de negócio ou UI, não por detalhes acidentais.
- Prefira funções pequenas com dependências explícitas a módulos que conhecem tudo.
- Evite abstrações prematuras; duplicação pequena pode ser mais clara que uma camada genérica frágil.
- Mantenha exports públicos intencionais e imports consistentes com aliases do projeto.
- Tipos, hooks e componentes devem ter contratos claros para reduzir conflitos entre devs.

## Boundaries

- Features não devem depender de detalhes internos de outras features sem contrato compartilhado.
- UI compartilhada não deve importar regras específicas de domínio.
- Estado global, cache e storage devem ter APIs estreitas e previsíveis.
- Código de plataforma/nativo deve ficar isolado quando possível.

## Checklist de Revisão

- A mudança respeita a arquitetura já existente?
- O arquivo está no menor escopo que faz sentido?
- A separação entre UI, domínio e infraestrutura está clara?
- A estrutura reduz conflitos para múltiplos devs?
- A refatoração ficou proporcional ao problema?
