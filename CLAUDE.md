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
