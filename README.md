<div align="center">
<img height="120" src="./docs/_media/logo-192x192.png" alt=""/>
</div>

<h1 align="center">
Polemic
</h1>

<h4 align="center">
✍️🎓 Publishing tool for academic papers, tutorials, books and blogs.
</h4>

<div align="center">

![npm](https://img.shields.io/npm/v/polemic)
![npm](https://img.shields.io/npm/dm/polemic)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/devtastic-org/polemic/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/devtastic-org/polemic/tree/main)
</div>


# Polemic

Polemic is a tool for publishing academic content, such as blogs, articles and tutorials.
Polemic is built on top of [Unified](https://unifiedjs.com/) and [Next.js](https://nextjs.org/) and is shipped as a simple-to-use CLI.
It's inspired by [Jupyter Book](https://jupyterbook.org), [PubPub](https://www.pubpub.org/) and [Bookdown](https://bookdown.org/).

Polemic documents are written in [Markdown](https://www.markdownguide.org) which is a plain-text markup language.
It offers support for math (through KaTeX), citations (BibTex, BibJSON, CSL-JSON compatible), footnotes, images, videos and more.

Polemic documents can be exported to PDF or turned into a static website that can be deployed anywhere.


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

Exports your Polemic project to a PDF.

```shell
polemic export
```
