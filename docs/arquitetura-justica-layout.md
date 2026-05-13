# Arquitetura Atual da Biblioteca `justica-layout`

## Objetivo

Documentar a arquitetura vigente da biblioteca `justica-layout`, com foco em:

- padrao visual institucional unico;
- API publica enxuta;
- componentes standalone;
- estado local com Signals;
- baixo acoplamento com aplicacoes consumidoras.

## Estrutura Atual

```text
projects/
  justica-layout/
    src/
      public-api.ts
      justica-layout.component.ts
      justica-layout.component.html
      justica-layout.component.scss
      componentes/
        justica-cabecalho/
          justica-cabecalho.component.ts
          justica-cabecalho.component.html
          justica-cabecalho.component.scss
        justica-barra-lateral/
          justica-barra-lateral.component.ts
          justica-barra-lateral.component.html
          justica-barra-lateral.component.scss
        justica-menu/
          justica-menu.component.ts
          justica-menu.component.html
          justica-menu.component.scss
          justica-menu-item/
            justica-menu-item.component.ts
            justica-menu-item.component.html
            justica-menu-item.component.scss
          justica-submenu/
            justica-submenu.component.ts
            justica-submenu.component.html
            justica-submenu.component.scss
      core/
        modelos/
          menu-item.model.ts
          usuario.model.ts
      shared/
        constants/
          imagens-layout.ts
        diretivas/
          clique-fora.directive.ts
        servicos/
          estado-layout.service.ts
          estado-menu.service.ts
        estilos/
          index.scss
          _tokens.scss
          _mixins.scss
          _tipografia.scss
          _espacamento.scss
          _elevacao.scss
```

## Camadas

### `core`

Contem contratos e utilitarios puros reutilizaveis:

- `MenuItemJustica`
- `UsuarioJustica`

### `shared`

Contem blocos de infraestrutura interna da biblioteca:

- servicos de estado (`ServicoEstadoLayout`, `ServicoEstadoMenu`);
- diretiva `justicaCliqueFora`;
- constantes de assets;
- tokens visuais em SCSS.

### `componentes`

Contem a renderizacao do layout:

- `justica-cabecalho`
- `justica-barra-lateral`
- `justica-menu`
- `justica-menu-item`
- `justica-submenu`

### Componente raiz

`JusticaLayoutComponent` (arquivo `src/justica-layout.component.ts`) orquestra:

- cabecalho;
- menu;
- barra lateral;
- area de conteudo projetado (`ng-content`).

## API Publica Atual

`public-api.ts` expoe somente:

- `JusticaLayoutComponent`
- `MenuItemJustica`
- `UsuarioJustica`

Nao sao expostos:

- componentes internos;
- servicos internos;
- diretivas internas;
- utilitarios internos de navegacao/menu.

## Decisoes Arquiteturais Vigentes

1. Biblioteca orientada a composicao com componente raiz unico.
2. Estado de UI local com Signals e `computed`.
3. API publica minima para reduzir acoplamento e risco de quebra.
4. Convencao de nomenclatura alinhada ao prefixo `justica-*` em componentes, seletores e classes CSS.
5. Configuracao institucional fixa no componente raiz (sem token publico de configuracao global nesta versao).

## Execucao e Publicacao

Scripts relevantes no workspace:

- `npm run start:dev`: build inicial da lib + watch da lib + demo (`justica-demonstracao`)
- `npm run build:lib`: build da biblioteca
- `npm run deploy:snapshot`: publica em `npm-snapshot`
- `npm run deploy:release`: publica em `npm-release`

## Observacoes de Evolucao

- Se houver necessidade futura de personalizacao por produto, reavaliar a criacao de um contrato de configuracao publico.
- Se houver necessidade de reuso externo de partes internas, promover exports de forma incremental e versionada.
