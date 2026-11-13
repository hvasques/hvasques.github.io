# Portfolio

Portfólio pessoal publicado com GitHub Pages em https://hvasques.github.io/. HTML, CSS e JavaScript puros, sem build.

## Ver localmente

Os caminhos são absolutos (`/assets/...`) e o JS usa módulos, então abra por um servidor, não com duplo clique:

```sh
python3 -m http.server 8000   # na raiz do repo
# http://localhost:8000/
```

## Estrutura

```
index.html                     Home
portfolio/index.html           Portfólio (lista + croqui)
portfolio/_template/           Modelo de página de projeto (não é linkado)
portfolio/project-one/         Primeiro projeto, feito a partir do modelo
assets/css/tokens.css          Cores, fontes, escala e formas: o único arquivo para mudar o visual
assets/css/base.css            Estilos compartilhados (rocha, menu, título, rótulo, grau, botão)
assets/css/{home,portfolio,project}.css
assets/js/components/          Peças reutilizadas: header, holds (agarras), rock (motor), rock-shapes (desenhos), roof
assets/js/data/projects.js     Lista de projetos
assets/js/pages/               Um script por tipo de página
docs/HISTORICO.md              Como o design foi decidido (etapas 1–14)
prototypes/                    Protótipos e cópia do canvas de design
```

## Mudar cores ou fontes

Tudo em `assets/css/tokens.css`. Para trocar uma fonte, mude a URL do `@import` no topo e a variável `--font-*` correspondente.

## Adicionar uma página

Exemplo: uma página "About" em `/about/`.

1. Crie `about/index.html` com este esqueleto. O teto e o menu vêm prontos de `<rock-roof>` e `<site-header>`:

   ```html
   <!doctype html>
   <html lang="en">
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>About — hvasques</title>
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="stylesheet" href="/assets/css/tokens.css">
     <link rel="stylesheet" href="/assets/css/base.css">
     <script type="module" src="/assets/js/site.js"></script>
   </head>
   <body>
     <rock-roof></rock-roof>
     <site-header current="about"></site-header>

     <main class="content">
       <h1 class="title">About</h1>
       <p class="lede">…</p>
     </main>
   </body>
   </html>
   ```

2. Em `assets/js/components/header.js`, na lista `NAV`, ponha a página no menu: `{ id: 'about', label: 'About', href: '/about/' }`. O `id` é o mesmo valor de `current="..."` no passo 1; é ele que sublinha o item no menu e escreve o breadcrumb (`HVASQUES / ABOUT`).
3. Se a página precisar de estilo próprio, crie `assets/css/about.css` e adicione o `<link>` depois do `base.css`. As peças prontas do `base.css` são `.title`, `.lede`, `.label`, `.grade` e `.btn`.
4. Parede é opcional. Para ter uma: desenhe-a em `assets/js/components/rock-shapes.js` (copie o formato de `HOME_WALL`), ponha `<div class="rock wall wall--about"></div>` logo depois do `<rock-roof>`, dê a largura no CSS (`.wall--about { width: calc(520 * var(--u)); }`) e troque o `<script>` por um `assets/js/pages/about.js` que importa `../site.js` e chama `mountRock(...)`, como em `pages/home.js`.

## Adicionar um projeto

1. Copie `portfolio/_template/` para `portfolio/<slug>/`.
2. No `index.html` copiado: ponha `data-project="<slug>"` no `<body>`, apague a linha `<meta name="robots" ...>` e o comentário `TEMPLATE`, e ajuste o `<title>`.
3. Em `assets/js/data/projects.js`, crie (ou edite) a entrada com o mesmo `slug` e marque `published: true`. Um projeto novo também precisa do `topo` (a linha da via e a posição dos dois números no croqui).
4. Escreva o conteúdo. Cada `<h2 data-sec>` vira uma agarra na parede; pode ter quantas seções quiser.

O nome no breadcrumb, o rótulo "… · Route N" e o grau vêm de `projects.js`.

## Rocha em telas de outros formatos

O teto e as paredes são desenhados num quadro de 1280×760, escalado para caber na janela (limites em `--u-min` / `--u-max`). O espaço que sobra em telas ultrawide ou muito altas é coberto por segmentos extras, definidos em `fillers` em `assets/js/components/rock-shapes.js`.
