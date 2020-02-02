# Pigment 🌈 - A Colorful JS Framework
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Introduction

Pigment is a lightweight, yet powerful, color framework for the web, react-native (WIP) and any other JS-Based project. It is built on the idea that software applications should function effortlessly while simultaneously maintaining their beautiful interfaces.

With Pigment, you can easily stop tinkering with RGB values, wasting hours figuring out the right color combinations to use in your app, and worrying about whether your text will be readable on the various background colors of your app.

Does this sound familiar? That's because Pigment is heavily inspired by Vicc Alexander's [Chameleon Framework](https://github.com/viccalexander/Chameleon), which provides this functionality for native iOS (OBJC & Swift 3).

![Flat Colors](https://user-images.githubusercontent.com/6248571/73604634-6eb54200-4559-11ea-8b9e-f29c3ece0793.png)

## Features

![Features](https://user-images.githubusercontent.com/6248571/73604650-c2279000-4559-11ea-8dfd-76d8fa5e9497.png)

- Color conversions between:
  - HEX
  - RGB
  - HSL
  - LAB
  - XYZ
- 24 Hand-Picked Flat Colors in both shades (Light and Dark)
- Color shades generation
- Find most similar hand-picked Flat color from another color
- Get contrasting color text (Black / White) for another color
- Generate Color Schemes:
  - Analogous
  - Complementary
  - Triadic
- Compatible with Chameleon Framework's Sketch, PhotoShop and Storyboard [plugins](https://github.com/viccalexander/Chameleon/tree/master/Extras).

## Installing

```bash
npm i @pigment/core --save
```
or
```bash
yarn add @pigment/core
```

## Usage

- Wrap your color * Supported formats: HEX, RGB, HSL

```ts
const hex = '#E74C3C'
const color = new Color(hex)
```

- Get complementary color

```ts
color.complementaryColor
```

- Get most similar Hand-Picked Flat color

```ts
color.nearestFlatColor
```

- Get all color shades with a 25% separation

```ts
color.all(25)
color.nearestFlatColor.all(25) // Flat-color shades
```

- Get color tints/shades (Array or single item) with a 25% separation

```ts
color.tints(25)
color.shades(25)
color.tint(25) // Just one color
color.shade(25) // Just one color
```

- Get analogous color scheme (Regular & Flat)

```ts
color.analogousColorScheme
color.analogousFlatColorScheme
```

- Get complementary color scheme

```ts
color.complementaryColorScheme
color.complementaryFlatColorScheme
```

- Get triadic color scheme

```ts
color.triadicColorScheme
color.triadicFlatColorScheme
```

- Get contrasting text color (Black/White)

```ts
color.contrastingTextColor
color.contrastingFlatTextColor // Flat version
```

## Coming soon

- Global-theming examples with styled-components & emotion/native (CSS in JS)
- Get color scheme from image (Web)
- Get color scheme from image (React-Native)
- Machine-Learning JS models for color scheme generation
- CSS Global Theme Generation
- CSS Houdini Paint Worklets to support conversions and derived colors

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://kevinrodriguez.io/"><img src="https://avatars3.githubusercontent.com/u/6248571?v=4" width="100px;" alt=""/><br /><sub><b>Kevin Rodríguez</b></sub></a><br /><a href="https://github.com/kevinrodriguez-io/Pigment/commits?author=kevinrodriguez-io" title="Documentation">📖</a> <a href="https://github.com/kevinrodriguez-io/Pigment/commits?author=kevinrodriguez-io" title="Code">💻</a> <a href="#ideas-kevinrodriguez-io" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/kevinrodriguez-io/Pigment/commits?author=kevinrodriguez-io" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!