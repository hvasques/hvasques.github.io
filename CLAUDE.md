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
