# pigment@core 🌈 - Pigment's engine

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
