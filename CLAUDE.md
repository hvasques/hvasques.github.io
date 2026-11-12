# Portfolio — guidelines

Portfólio pessoal publicado no GitHub Pages.

## Objetivo

Um site de portfólio simples, rápido e fácil de manter, publicado de graça pelo GitHub Pages.

## Regra principal: explicar o passo a passo

O dono deste repo quer **entender como o site foi montado**, não só recebê-lo pronto. Por isso, sempre que o Claude criar ou mudar algo no site:

1. **Explique no chat, em passos numerados**, o que foi feito e *por quê* — em linguagem simples, sem pressupor experiência com front-end.
2. **Registre os passos** na seção [Passo a passo de como o site foi montado](#passo-a-passo-de-como-o-site-foi-montado) abaixo, acrescentando uma nova etapa ao final (nunca reescreva etapas antigas, só corrija se estiverem erradas).
3. Para cada etapa registre: o que mudou, quais arquivos foram tocados, e como conferir o resultado (ex.: abrir `index.html` no navegador, ver a URL publicada).
4. Quando houver uma escolha técnica (ex.: usar ou não um framework), diga quais eram as opções e por que escolheu uma delas.

## Stack e convenções

- **Padrão: HTML + CSS + JavaScript puros, sem build.** O GitHub Pages serve os arquivos como estão; menos peças = mais fácil de entender e manter. Só introduzir framework/gerador (Astro, Jekyll, Next etc.) se houver um motivo claro — e explicar o motivo.
- Página inicial em `index.html` na raiz do repo.
- Estilos em `assets/css/`, scripts em `assets/js/`, imagens em `assets/img/`.
- Site responsivo (funciona no celular) e acessível (textos alternativos em imagens, contraste legível, HTML semântico).
- Conteúdo em português, salvo pedido em contrário.
- Commits pequenos, com mensagem descrevendo o que mudou.

## Publicação (GitHub Pages)

- Para o site ficar em `https://hvasques.github.io/`, o repo no GitHub deve se chamar **`hvasques.github.io`**. Com outro nome (ex.: `portfolio`), a URL vira `https://hvasques.github.io/portfolio/`.
- Ativar em: repo no GitHub → *Settings* → *Pages* → *Source: Deploy from a branch* → branch `main`, pasta `/ (root)`.
- O arquivo `.nojekyll` na raiz desliga o processamento Jekyll do GitHub Pages, para os arquivos serem servidos exatamente como estão.
- Não publicar (push, criar repo remoto, mudar visibilidade) sem confirmação do dono.

## Passo a passo de como o site foi montado

### Etapa 1 — Criação do repositório base

- **O que foi feito:** criada a pasta do projeto com `git init`, branch `main`, e os arquivos iniciais: `CLAUDE.md` (estas guidelines), `README.md` (descrição do projeto), `.gitignore` (ignora arquivos de sistema e de editor) e `.nojekyll` (ver seção Publicação).
- **Por quê:** começar com o repositório versionado permite acompanhar cada mudança pelo histórico do git e desfazer qualquer passo.
- **Ainda não feito:** nenhuma página do site existe ainda; o repo ainda não foi enviado ao GitHub.
- **Como conferir:** `git log` mostra o commit inicial; `ls -a` lista os arquivos.

### Etapa 2 — Repositório no GitHub e GitHub Pages

- **O que foi feito:** o repo local foi enviado para o GitHub como `hvasques/hvasques.github.io` (público) com `gh repo create hvasques.github.io --public --source=. --remote=origin --push`. Esse comando cria o repo remoto, registra-o como `origin` e envia a branch `main`.
- **Por quê o nome:** repos chamados `<usuário>.github.io` são o "site do usuário" no GitHub Pages e ficam na raiz `https://hvasques.github.io/`. O Pages já vem ativado automaticamente, publicando a branch `main`, pasta `/`.
- **Ainda não feito:** como ainda não existe `index.html`, a URL não mostra nenhuma página.
- **Como conferir:** `git remote -v` mostra o `origin`; no GitHub, *Settings → Pages* mostra a fonte `main` / `/ (root)`; ou `gh api repos/hvasques/hvasques.github.io/pages`.

### Etapa 3 — Página provisória "WIP"

- **O que foi feito:** criados `index.html` (a página inicial) e `assets/css/style.css` (o visual). A página só mostra "WIP" grande, centralizado na tela.
- **Como funciona:**
  1. `index.html` é o arquivo que o GitHub Pages abre por padrão na raiz do site. O `<meta name="viewport">` faz a página se ajustar ao celular; `lang="pt-BR"` indica o idioma para navegadores e leitores de tela.
  2. O HTML só tem um `<main>` com um `<h1>WIP</h1>` e um `<link>` para o CSS.
  3. No CSS, o `<main>` ocupa a altura toda da tela (`min-height: 100vh`, e `100dvh` para celulares, que descontam a barra do navegador) e usa `display: grid` + `place-items: center`, que centraliza o conteúdo na horizontal e na vertical ao mesmo tempo.
  4. O tamanho do texto usa `clamp(3rem, 15vw, 10rem)`: cresce com a largura da tela, mas nunca fica menor que 3rem nem maior que 10rem.
  5. As cores ficam em variáveis (`--bg`, `--fg`) e mudam sozinhas quando o sistema está em modo escuro (`prefers-color-scheme: dark`).
- **Escolha técnica:** grid com `place-items: center` em vez de flexbox ou posicionamento absoluto — é a forma mais curta de centralizar nos dois eixos.
- **Como conferir:** abrir `index.html` no navegador (duplo clique) ou acessar https://hvasques.github.io/ — a publicação leva cerca de 1 minuto após o push.

### Etapa 4 — Protótipo de paletas de cores (tema escalada + games)

- **Conceito:** o portfólio mistura escalada e games. Referência inicial: Mirror's Edge (parkour, estética limpa, arestas retas, vermelho marcando o caminho). Daí a ideia central de toda paleta ter uma cor **path**: a única cor que indica "para onde ir" (botão principal, link ativo, a linha da via), como a fita de uma via no ginásio.
- **O que foi feito:** criado `prototypes/palettes.html` e publicado como Artifact (https://claude.ai/artifact/YJwSvVbPpiiXgkdYcLWrHy). Não faz parte do site publicado.
- **As 4 paletas** (6 papéis cada: ground = fundo, surface = superfícies, ink = texto, muted = texto secundário, path = caminho, second = sinal secundário):
  1. **Rooftop Runner** (inspirada em Mirror's Edge): branco azulado, céu claro, tinta quase preta, vermelho `#D9121A`, laranja nas tags.
  2. **Alpenglow** (escalada outdoor): granito, neve fria, azul-noite, laranja do sol nascendo na parede `#C2461F`, verde-líquen.
  3. **Plywood Gym** (boulder indoor): branco-magnésio, compensado, parede grafite, agarra roxa `#6A3FD4`, fita amarelo-neon.
  4. **Headlamp Session** (escalada noturna / HUD de game): escura, âmbar da lanterna `#FFB547`, coral da corda.
- **Como foi montado:**
  1. Cada paleta virou um conjunto de variáveis CSS (`--p-ground`, `--p-path`…). A prévia do hero só usa essas variáveis, então trocar a paleta é só trocar os valores — o mesmo mecanismo que o site final vai usar.
  2. O contraste de cada par importante (texto no fundo, path no fundo, texto do botão) é calculado na página pela fórmula do WCAG 2 e mostrado como AA/AAA. Antes de publicar, os vermelhos e laranjas foram escurecidos até passar de 4.5:1.
  3. Cores que não têm contraste para texto (ex.: amarelo-neon) são marcadas como **decor**: só preenchimento, nunca texto sobre o fundo.
  4. Arestas retas e um botão com o canto cortado na diagonal, para puxar a estética de "arestas afiadas".
- **Como conferir:** abrir o link do Artifact, ou `prototypes/palettes.html` no navegador; clicar nas abas para trocar a paleta da prévia.
- **Decisão:** seguem para iteração apenas **Rooftop Runner** e **Alpenglow**.

### Etapa 5 — Protótipo de layouts da tela inicial

- **O que foi feito:** criado `prototypes/hero-layouts.html`, publicado como Artifact (https://claude.ai/artifact/VHehKix2NAu7FemDcqpRjn), com 4 conceitos de tela inicial e um botão para alternar entre as duas paletas mantidas:
  - **A · Via à direita** — o texto à esquerda e um painel inclinado com a via à direita (base do protótipo anterior, refinada).
  - **B · Teto de caverna e negativo** — o menu fica dentro do teto de uma caverna, que desce pela direita como um negativo (parede inclinada para fora); a via sobe pela parte de baixo até chegar ao menu.
  - **C · As agarras são o menu** — sem barra no topo; o menu é uma parede estreita à direita, cada página é uma agarra, a agarra preenchida é a página atual e a linha tracejada mostra o que falta subir.
  - **D · Croqui como seleção de fase** (sugestão do Claude) — o croqui de guia de escalada (linhas numeradas + legenda com grau) usado como menu de fases de um game: cada projeto é uma via, e o grau diz o quão difícil/grande ele foi.
- **Como foi montado:**
  1. Cada conceito é uma "tela" fixa de 1200×700 px, reduzida com `transform: scale()` para caber na largura da coluna. Assim a composição fica igual em qualquer tela, inclusive no celular (menor, mas fiel). Isso só vale para o protótipo; o site real vai precisar de um layout responsivo de verdade.
  2. Formas (parede, caverna, agarras, vias) são SVG. As agarras são um `<symbol>` reaproveitado com `<use>`, para desenhar uma vez e repetir.
  3. Textos (logo, título, menu, botões) são HTML posicionado por cima do SVG, para continuarem sendo texto real.
  4. As cores vêm das mesmas variáveis `--p-*` da etapa 4; trocar a paleta é trocar o atributo `data-pal`.
  5. A linha da via tem um tracejado animado (desligado para quem pede menos movimento no sistema). No conceito D, passar o mouse numa linha da legenda acende a via correspondente.
- **Como conferir:** abrir o link do Artifact ou `prototypes/hero-layouts.html`; alternar a paleta no topo.
- **Decisão:** combinar **B** (caverna, menu para todas as seções futuras: portfólio, blog etc.) com **D** (croqui do portfólio).

### Etapa 6 — Protótipo "uma parede só" (B + D)

- **O que foi feito:** criado `prototypes/home-wall.html`, publicado como Artifact (https://claude.ai/artifact/ErjrMEDb3CkTPjMzGkgNM1). É uma página alta (1200×1480): a home dentro da caverna em cima, o croqui do portfólio embaixo.
- **Feedback aplicado:** a rocha da caverna estava pesada demais (cor `ink`, quase preta). Agora usa a cor `surface` (clara) com um contorno fino (`--p-rock-line`); o texto do menu passou de claro para `ink`.
- **Como B e D se conectam:**
  1. A página inteira é uma parede: rolar para baixo é descer.
  2. Uma linha de "platô" (ledge) separa a home do portfólio.
  3. A via da home começa numa **chapeleta** (bolt hanger) logo acima do platô e sobe até o menu.
  4. Cada via do croqui termina na própria chapeleta, presa no mesmo platô — ou seja, as vias do portfólio levam de volta à home.
- **Como foi montado:** a chapeleta é um `<symbol>` SVG (placa com o furo do parafuso e o olhal para o mosquetão, feitos com `fill-rule="evenodd"`), reaproveitado nas 5 posições. Passar o mouse numa linha da legenda acende a via, o número e a chapeleta dela.
- **Como conferir:** abrir o link do Artifact ou `prototypes/home-wall.html`; alternar a paleta; passar o mouse na legenda.

### Etapa 7 — Páginas separadas sob a mesma caverna

- **Feedback aplicado:**
  1. Removido o contorno da borda da caverna; a rocha agora é definida só pelo preenchimento (`surface`). As linhas de textura dentro da rocha continuam.
  2. Em vez de uma página longa com rolagem, **Home** e **Portfólio** viraram páginas separadas — rolando para baixo, o menu sumiria da tela.
- **Como ficou:**
  - As duas páginas têm o mesmo teto de caverna com o menu (Home, Portfolio, Blog, About), então o menu está sempre visível.
  - **Home:** a via começa numa chapeleta embaixo do negativo e sobe até o menu.
  - **Portfólio:** o croqui fica pendurado na borda da caverna; cada via termina numa chapeleta logo abaixo do menu. Assim toda via do site leva de volta ao menu.
- **Como foi montado:** as duas "páginas" são duas telas dentro do mesmo quadro; só uma aparece por vez (atributo `hidden`). O menu e o botão "Portfolio" dentro do mock trocam de página, simulando a navegação real. Mesmo link de Artifact da etapa 6 (nova versão).
- **Como conferir:** abrir https://claude.ai/artifact/ErjrMEDb3CkTPjMzGkgNM1; clicar em Home/Portfolio (fora ou dentro do mock).
