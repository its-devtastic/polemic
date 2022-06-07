<div align="center">
<img height="120" src="./docs/_media/logo.png" alt=""/>
</div>

<h1 align="center">
Polemic
</h1>

<h4 align="center">
✍️🎓 Publishing tool for academic papers, tutorials, books and blogs.
</h4>

<div align="center">
  <a href="https://www.npmjs.org/package/polemic">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/devtastic-org/polemic?label=npm&logo=npm">
  </a>
  <a href="https://www.npmjs.org/package/polemic">
    <img src="https://img.shields.io/npm/dm/polemic.svg" alt="Monthly download on NPM" />
  </a>
</div>

# Polemic

Polemic is a tool for publishing online academic content, such as blogs, articles and tutorials.
Polemic is built on top of [Unified](https://unifiedjs.com/) and [Next.js](https://nextjs.org/) and is shipped as a simple to use CLI.
It's inspired by [Jupyter Book](https://jupyterbook.org) and [LaTeX](https://www.latex-project.org/).

Polemic documents are written in [Markdown](https://www.markdownguide.org) which is a plain-text markup language.
It offers support for math (through KaTeX), footnotes, images, videos and more.

Polemic documents are transformed into beautiful, responsive websites that can be deployed anywhere.


## Installation
```shell
npm install -g polemic
```

## Usage

### Create

Creates a new Polemic project based on a template

```shell
polemic create principia --template=book
```

### Preview

Starts a live preview of your project.

```shell
polemic preview
```

### Export

Exports your Polemic project to a static HTML website.

```shell
polemic export
```
