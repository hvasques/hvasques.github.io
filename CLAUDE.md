# Portfolio — guidelines

Portfólio pessoal publicado no GitHub Pages.

## Objetivo

Um site de portfólio simples, rápido e fácil de manter, publicado de graça pelo GitHub Pages.

## Como trabalhar

- **Ser direto.** Fazer a mudança e resumir em poucas linhas o que mudou e o que ficou pendente. Não explicar passo a passo nem registrar "etapas" (o registro antigo está em `docs/HISTORICO.md` e não é mais atualizado).
- Explicar uma escolha técnica só quando ela muda algo para o dono (ex.: introduzir uma dependência).
- Conferir o resultado no navegador antes de dizer que está pronto.

## Stack e convenções

- **HTML + CSS + JavaScript puros, sem build.** O JS usa módulos ES (`<script type="module">`), que o navegador carrega direto. Só introduzir framework/gerador com motivo claro.
- Caminhos absolutos a partir da raiz (`/assets/...`), então para ver localmente é preciso um servidor: `python3 -m http.server` na raiz do repo.
- Texto do site em inglês; notas do repo em português.
- Commits pequenos, com mensagem descrevendo o que mudou.
- Celular: um único breakpoint em 860px. Abaixo dele as paredes somem, o header fica só com o menu (sem logo/breadcrumb) e a página de projeto ganha o botão "Back to projects" no topo. Em telas de toque não há seleção por hover no Portfólio: um toque abre o projeto.

## Arquitetura (onde mexer)

| Para mudar… | Arquivo |
|---|---|
| Cores, fontes, escala da rocha, formas de botão/badge | `assets/css/tokens.css` (único lugar) |
| Menu e logo/breadcrumb | `assets/js/components/header.js` (`<site-header>`) |
| Formas das agarras | `assets/js/components/holds.js` (`hold()`), usado em todas as páginas |
| Desenho do teto e das paredes, e os segmentos extras | `assets/js/components/rock-shapes.js` |
| Como os segmentos são montados | `assets/js/components/rock.js` |
| Lista de projetos (lista + croqui + páginas) | `assets/js/data/projects.js` |
| Estilo compartilhado / por página | `assets/css/base.css` / `home.css`, `portfolio.css`, `project.css` |
| Comportamento por página | `assets/js/pages/` |

- **Rocha por segmentos:** o desenho usa um quadro de 1280×760 e a unidade `--u`. O quadro é escalado para *caber* na janela, nunca esticado. O que sobra (ultrawide, janela muito alta) é coberto por segmentos extras (`fillers`) repetidos em ordem; o desenho aprovado (`body`) fica preso ao teto, ao chão ou à direita, conforme a parede.
- **Página de projeto:** copiar `portfolio/_template/` (ver README). Não inventar conteúdo de projeto; os textos entre colchetes ficam até o dono escrever.

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
- **Estrutura:** o menu fica dentro do teto de uma caverna, igual em todas as páginas. Home = negativo com uma via que sobe até o menu. Portfólio = croqui com vias numeradas. Página de projeto = parede fina fixa, com a via que se completa conforme a leitura.
- Tudo plano (2D) e anguloso: sem sombra, sem gradiente, sem cantos arredondados, sem contorno na rocha.

## Publicação (GitHub Pages)

- Repo `hvasques/hvasques.github.io`, publicado da branch `main`, pasta `/ (root)`, em `https://hvasques.github.io/`.
- O arquivo `.nojekyll` desliga o Jekyll, para os arquivos (inclusive `_template/`) serem servidos como estão.
- Não publicar (push, criar repo remoto, mudar visibilidade) sem confirmação do dono.
