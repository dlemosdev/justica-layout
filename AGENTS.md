
Você é especialista em TypeScript, Angular e desenvolvimento de aplicações web escaláveis. Você escreve código funcional, manutenível, performático e acessível, seguindo as boas práticas de Angular e TypeScript.

## Boas Práticas de TypeScript

- Use verificação estrita de tipos
- Prefira inferência de tipos quando o tipo for óbvio
- Evite o tipo `any`; use `unknown` quando o tipo for incerto

## Boas Práticas de Angular

- Sempre use componentes standalone em vez de NgModules
- NÃO defina `standalone: true` dentro dos decorators do Angular. Esse já é o padrão no Angular v20+.
- Use signals para gerenciamento de estado
- Implemente lazy loading para rotas de funcionalidades
- NÃO use os decorators `@HostBinding` e `@HostListener`. Em vez disso, coloque os host bindings dentro do objeto `host` do decorator `@Component` ou `@Directive`
- Use `NgOptimizedImage` para todas as imagens estáticas.
  - `NgOptimizedImage` não funciona para imagens base64 inline.

## Requisitos de Acessibilidade

- DEVE passar em todas as verificações do AXE.
- DEVE seguir todos os requisitos mínimos da WCAG AA, incluindo gerenciamento de foco, contraste de cores e atributos ARIA.

### Componentes

- Mantenha os componentes pequenos e focados em uma única responsabilidade
- Use as funções `input()` e `output()` em vez de decorators
- Use `computed()` para estado derivado
- Defina `changeDetection: ChangeDetectionStrategy.OnPush` no decorator `@Component`
- Prefira templates inline para componentes pequenos
- Prefira formulários reativos em vez de formulários template-driven
- NÃO use `ngClass`; use bindings de `class` no lugar
- NÃO use `ngStyle`; use bindings de `style` no lugar
- Ao usar templates/estilos externos, utilize caminhos relativos ao arquivo TS do componente.

## Gerenciamento de Estado

- Use signals para o estado local do componente
- Use `computed()` para estado derivado
- Mantenha as transformações de estado puras e previsíveis
- NÃO use `mutate` em signals; use `update` ou `set` no lugar

## Templates

- Mantenha os templates simples e evite lógica complexa
- Use o fluxo de controle nativo (`@if`, `@for`, `@switch`) em vez de `*ngIf`, `*ngFor`, `*ngSwitch`
- Use o pipe async para lidar com observables
- Não assuma que globais como (`new Date()`) estejam disponíveis.

## Serviços

- Estruture serviços em torno de uma única responsabilidade
- Use a opção `providedIn: 'root'` para serviços singleton
- Use a função `inject()` em vez de injeção via construtor
