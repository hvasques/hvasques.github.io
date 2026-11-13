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

## Identidade visual (decidida)

Tema: escalada + games. Referência: Mirror's Edge (limpo, arestas retas, uma cor marcando o caminho).

- **Paleta Alpenglow:** ground `#EEF1F3`, surface/rocha `#C9D0D6`, ink `#1B2433`, muted `#4C5763`, path `#C2461F`, textura da rocha `#A3AEB9`. A cor **path** é a única que indica "para onde ir" (botão principal, item ativo, via selecionada). Rooftop Runner (path `#D9121A`) fica como alternativa.
- **Tipografia** (Google Fonts):
  - Menu e logo: **Chakra Petch** (caixa-alta, espaçada).
  - Títulos: **Funnel Display** ExtraBold.
  - Nomes de projetos: **Funnel Sans** SemiBold.
  - Texto: **Geologica** Regular.
  - Rótulos: texto normal com um **marcador em forma de agarra** — nunca overline em monoespaçada caixa-alta.
  - Graus: Chakra Petch dentro de uma **forma de agarra** (badge); ativo = cor path.
- **Estrutura:** o menu fica dentro do teto de uma caverna, igual em todas as páginas. Home = negativo com uma via que começa numa chapeleta e sobe até o menu. Portfólio = croqui com vias numeradas, cada uma terminando numa chapeleta sob a caverna. Páginas separadas (não uma rolagem longa), para o menu estar sempre visível.
- Sem cantos arredondados; sem contorno na rocha.

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
- **Decisão:** a direção (caverna + páginas separadas + croqui) está aprovada. Antes de abrir um artifact de Design para iterar, definir a tipografia.

### Etapa 8 — Espécime de tipografia

- **Problema:** Chakra Petch + IBM Plex Sans + IBM Plex Mono parecem "site gerado por IA". O pior é o *overline* — rótulo pequeno em monoespaçada, caixa-alta e letras espaçadas ("SAMPLE · CASE STUDY").
- **O que foi feito:** criado `prototypes/type.html`, publicado como Artifact (https://claude.ai/artifact/9CQSVPpNQbbpLRBS2r43dG). Mostra a tela de Portfólio com 5 combinações (a atual só para comparar) e uma fileira lado a lado.
- **As 4 propostas** (todas do Google Fonts, nenhuma usa monoespaçada):
  1. **Guidebook** — Sofia Sans Extra Condensed (títulos, notas, menu) + Newsreader (texto); rótulos em itálico serifado, como um guia de escalada.
  2. **Route tape** — Big Shoulders Stencil (títulos, notas, menu; estilo letra de stencil em crashpad/caixote) + Hanken Grotesk; rótulos em texto simples.
  3. **Wide HUD** — só Anybody, mudando a largura por função: bem larga nos títulos (HUD de game), normal no texto, estreita nos rótulos.
  4. **Wayfinding** — Red Hat Display + Red Hat Text, sem caixa-alta; sinalização limpa, a mais próxima de Mirror's Edge.
- **Como foi montado:**
  1. Cada combinação é uma classe CSS (`.f-guidebook` etc.) que só define variáveis: fonte, peso, caixa, espaçamento e largura de cada função (título, texto, rótulo, nota, menu).
  2. Os elementos usam classes de função (`.t-title`, `.t-label`, `.t-num`…) que leem essas variáveis. Trocar a combinação é trocar uma classe — o mesmo mecanismo das paletas.
  3. Fontes de largura variável (Anybody) usam `font-variation-settings: "wdth"`.
  4. A interface da página do espécime usa a fonte do sistema de propósito, para não competir com as candidatas.
  5. Antes de publicar, conferi com `curl` que todas as famílias existem no Google Fonts.
- **Como conferir:** abrir o link do Artifact; trocar a combinação nos botões ou clicando nos cartões lado a lado.
- **Decisão:** as 4 propostas foram rejeitadas por serem óbvias demais. O que ficou: **Chakra Petch no menu** (e no logo).

### Etapa 9 — Tipografia por peças (menu fixo em Chakra Petch)

- **O que foi feito:** o mesmo Artifact (https://claude.ai/artifact/9CQSVPpNQbbpLRBS2r43dG, versão 2) virou um "monte você mesmo": o menu e o logo ficam fixos em Chakra Petch e cada outra peça tem opções próprias.
  - **Título:** Geologica com nitidez máxima (cantos cortados), Chakra Petch Light em minúsculas, Darker Grotesque, Funnel Display, Handjet.
  - **Nomes dos projetos:** Geologica, Chakra Petch, Darker Grotesque, Funnel Sans, SUSE.
  - **Rótulos** (substitutos do overline): barra do logo na fonte do menu (`/ case study`), marcador em forma de agarra, na mesma linha do nome, texto simples, ou sem rótulo.
  - **Graus:** Doto (matriz de pontos, como placar/cronômetro), Handjet (segmentos de display digital), "agarra" (o grau dentro de uma forma de agarra), Chakra Petch.
  - **Texto:** Geologica, Atkinson Hyperlegible Next, Funnel Sans, SUSE.
  - 4 combinações prontas para começar: *Sharp edges*, *Scoreboard*, *Tall and tight*, *Grades as holds*.
- **Como foi montado:**
  1. A tela guarda cada escolha num atributo (`data-t`, `data-i`, `data-l`, `data-g`, `data-b`); o CSS tem uma regra para cada valor. Trocar uma opção é trocar um atributo.
  2. Os tratamentos de rótulo que não são só fonte (barra, marcador, mesma linha) usam `::before` e mudança de layout no CSS, sem mudar o HTML.
  3. Geologica usa o eixo variável `SHRP` (nitidez) em 100 para combinar com os cantos cortados da Chakra Petch; Handjet usa o eixo `ELSH` (forma dos elementos).
  4. A combinação escolhida fica salva no navegador (localStorage), para reabrir onde parou.
- **Como conferir:** abrir o link; clicar num preset e trocar peça por peça.
- **Decisão final:** títulos Funnel Display, nomes Funnel Sans, rótulos com marcador de agarra, graus em badge de agarra, texto Geologica, paleta Alpenglow (registrado em "Identidade visual").

### Etapa 10 — Home e Portfólio num canvas de Design

- **O que foi feito:** as duas páginas foram montadas num Artifact de Design (canvas com pranchetas editáveis): https://claude.ai/artifact/HekNeSAtctbyZUTuXCMq1q. Duas pranchetas: **Home** e **Portfolio**, já com a identidade final.
- **Como foi montado:**
  1. Cada prancheta é um arquivo `.dc.html` (formato do canvas) e o `canvas.json` diz onde cada uma fica.
  2. Desta vez as páginas são **fluidas** (como o site real vai ser), não telas fixas reduzidas: o teto da caverna é um SVG que estica na largura (`preserveAspectRatio="none"`); a parede da direita é outro SVG preso à borda direita e dimensionado pela altura da página.
  3. Em telas menores: na Home a parede some abaixo de 860px; no Portfólio o croqui desce para baixo da lista abaixo de 1100px.
  4. Links reais entre as pranchetas: o menu e o botão "See the portfolio" levam de uma página à outra no modo Play.
  5. No Portfólio, passar o mouse ou clicar num projeto acende a via, a chapeleta, o número e o grau dele (estado guardado na prancheta).
  6. A cor path virou um ajuste (Tweaks) com opções: o laranja Alpenglow, o vermelho Rooftop e tinta.
- **Onde estão os arquivos:** só no canvas (não estão no repo). Para editar, abrir o link e usar o editor; mudanças feitas lá são lidas de volta antes de qualquer alteração minha.
- **Como conferir:** abrir o link; usar Play para navegar entre Home e Portfolio.

### Etapa 11 — Ajustes por comentários e croqui de boulder

- **Ajustes pedidos nos comentários do canvas:**
  1. Menu alinhado à direita (logo à esquerda) nas duas páginas.
  2. Chapeletas removidas — não fazem mais sentido com páginas separadas.
  3. Via da Home: de linhas retas para **uma curva orgânica** (curva Catmull-Rom convertida em Bézier cúbica, passando pelo centro de cada agarra).
  4. Via da Home mais interessante: 14 agarras de formas e ângulos variados, com uma travessia; 16 agarras cinza "de outras vias" na parede para dar realismo.
  5. Espaçamento das agarras variado: pares próximos (~30px) alternando com lances longos (90–125px), como numa via real.
- **Portfólio redesenhado a partir de um croqui real de boulder** (referência enviada pelo dono):
  - A parede virou um **bloco** apoiado no chão da caverna, com um lado sombreado, fissuras e uma pedra menor na frente.
  - Cada via tem o **número no início e no topo**, como nos guias; os números ficam numa forma de agarra.
  - As vias seguem a forma do bloco (uma sobe pela aresta da direita depois de uma travessia, outras pelo meio e pela esquerda) e algumas terminam perto umas das outras no topo.
  - Todas as vias aparecem em cinza; a do projeto selecionado é redesenhada **por cima** na cor path, com os dois números também na cor path. (SVG não tem z-index, então a selecionada é uma cópia desenhada por último.)
- **Como conferir:** https://claude.ai/artifact/HekNeSAtctbyZUTuXCMq1q — passar o mouse na lista do Portfólio.
- **Ajustes seguintes:** o menu do Portfólio estava escondido sob o desenho do croqui (camada por cima) — o conteúdo ganhou `z-index` acima do desenho e o desenho `pointer-events: none`. Na Home, os pares de agarras lado a lado foram trocados por 11 agarras isoladas com espaçamento irregular (≈50–115px). O bloco do Portfólio ficou **só 2D**: sem lado sombreado e sem pedra na frente (misturavam profundidade com o resto plano); as fissuras viraram as mesmas linhas de estrato quase horizontais da parede da Home.
- **Regra de estilo:** tudo é desenho plano (2D) — silhuetas chapadas, linhas de estrato, sem sombra, perspectiva ou profundidade. E **anguloso**: formas com poucas arestas longas e cantos vivos (como a caverna), nunca contornos arredondados. O bloco do Portfólio foi refeito com 10 vértices em vez de 18.

### Etapa 12 — Ajustes finais no canvas e página de projeto

- **Ajustes por comentários (Home e Portfólio):**
  1. A parede e o teto da caverna agora formam uma linha contínua: a parede fica *atrás* do teto e o teto cresce junto com a altura da janela, então os dois se encontram sempre no mesmo ponto.
  2. A página ocupa sempre a altura toda da janela (`min-height: max(760px, 100vh)`), para a parede tocar o chão em qualquer zoom.
  3. O texto nunca invade o teto nem a parede: o início do conteúdo é calculado a partir da altura do teto, e a parede do Portfólio nunca chega a menos de 560px da borda esquerda.
  4. O menu fica sempre a 64px da borda direita da janela (antes parava em 1280px de largura).
  5. O Blog saiu do menu e da Home; o menu agora é Home, Portfolio, About.
- **Portfólio clicável:** cada projeto virou um link; ao passar o mouse, o cursor vira uma etiqueta "KMON! →" na cor path e aparece uma seta depois do grau.
- **Página de projeto (Project one):** estudo de caso com 5 seções, breadcrumb no logo (`HVASQUES / PORTFOLIO / PROJECT ONE`) e uma parede fina fixa na janela. A via 1 começa embaixo, cada seção é uma agarra posicionada conforme o lugar dela na página, e a via vai de tracejada a contínua, de baixo para cima, conforme a leitura avança.
- **Como foi montado:** a página de projeto mede, com JavaScript, onde cada título de seção está e quanto da página já foi rolado; com isso calcula a posição das agarras e até onde a linha fica contínua (um `clipPath` recorta a cópia sólida da via).
- **Como conferir:** https://claude.ai/artifact/HekNeSAtctbyZUTuXCMq1q — usar Play, passar o mouse na lista do Portfólio, clicar num projeto e rolar a página.

### Etapa 13 — Handoff para o agente de código

- **O que foi feito:** criado `HANDOFF.md` na raiz, com tudo que um agente de código precisa para construir o site de verdade a partir do canvas: páginas e arquivos a criar, regras (HTML/CSS/JS puros, sem build, não publicar sem confirmação), cores e fontes, peças compartilhadas, comportamento de cada página, acessibilidade, perguntas em aberto e uma lista de "pronto quando".
- **Arquivos do canvas copiados** para `prototypes/design-canvas/` (`Main`, `Portfolio` e `WIP.dc.html`), para o agente ter o código-fonte do design no próprio repo. O `HANDOFF.md` explica como traduzir esse formato (`{{ }}`, `sc-for`, `renderVals`) para HTML e JS comuns.
- **Como conferir:** abrir `HANDOFF.md`; para começar a construção, entregar esse arquivo ao agente de código.

### Etapa 14 — Página de projeto vira template

- **O que mudou:** no `HANDOFF.md`, a página de projeto deixou de ser uma página única e virou um **template** que todas as páginas de projeto vão seguir.
- **Como vai funcionar (sem build):**
  1. Uma lista única de projetos em `assets/js/projects.js` (número, slug, nome, rótulo, grau e a via no croqui). A página de Portfólio é montada a partir dela.
  2. Cada projeto é uma cópia da pasta `portfolio/_template/` com outro nome (ex.: `portfolio/project-one/`); só o conteúdo muda.
  3. A página diz qual projeto é com um atributo (`data-project`), e o script preenche o breadcrumb, o rótulo e o grau a partir da lista.
  4. As seções são livres: qualquer `h2` marcado vira uma agarra, então um projeto pode ter 3 ou 8 seções.
- **Escolha técnica:** copiar o template por projeto, em vez de usar layouts do Jekyll. Com poucos projetos, copiar é mais simples de entender e não exige ligar o Jekyll (que hoje está desligado pelo `.nojekyll`). O agente deve confirmar essa escolha com o dono antes de começar.
- **Como conferir:** ler a seção "Project page template" do `HANDOFF.md`.
