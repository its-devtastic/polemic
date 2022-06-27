# Polemic React

React components for rendering Polemic documents. Used by Parchment
and Ink but can also be used to build your own solution.

## Installation

With npm
```shell
npm install --save @polemic/react
```

With yarn
```shell
yarn add @polemic/react
```

### Tailwind CSS

Polemic React uses the epic [Tailwind CSS](https://tailwindcss.com/) framework, 
so make sure that's installed when using this library. It doesn't currently
come with precompiled CSS, so you need to include @polemic/react to your 
`tailwind.config.js` config:

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@polemic/**/*.{js,ts,jsx,tsx}",
  ],
  // other config
}
```
