[![Test](https://github.com/janraasch/mittagstisch/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/janraasch/mittagstisch/actions?query=workflow%3ACI) [![Daily Run](https://github.com/janraasch/mittagstisch/workflows/DAILY/badge.svg?branch=master)](https://github.com/janraasch/mittagstisch/actions?query=workflow%3ADAILY) [![Pay me][paypal-svg]][paypal-dot-me] [![Sponsor me][github-sponsors-svg]][github-sponsors]

# mittagstisch 🍴

> What's for lunch today?

_Nota Bene:_ This repo represents an idea of mine, which is currently in a _prototype_ phase. Check out the [big picture](https://github.com/janraasch/mittagstisch#big-picture-vision-) description down below to get an understanding of what this is about.

## Screenshot

![screenshot][screenshot]

## Big Picture Vision 🌈

Currently this is just a `NodeJS`-script scraping a handful of websites for their lunch special.

In the future this repo could be full of individual `lunch special`-scripts for restaurants all over the world.

We may then use these scripts to provide a `»What's for lunch«`-website, where a user can select restaurants she's interested in to conveniently check the local lunch menus.

Another approach could be to run the scrape scripts locally as a `Electron`-app or something similar.

_Or_ we can go `100%`-nerd 🤓, and people will fork this repo and have a `GitHub-Action` set up which does the scraping and then renders the daily results to a Github Page.

You get the idea 😋. It's early days as always.

Let's go! 🚀

## Sponsor 💟

Support my work on this idea via [GitHub Sponsors][github-sponsors] (recurring) or [PayPal][paypal-dot-me] (one-time).

## Installation

First, `git clone` this repository. Then, run `npm install`.

## Usage

`npm start` will render _what's for lunch today_ to the console.

For nicer formatting use [Glow][glow] via

```
npm start | glow -
```

## Contribute

Please play around with this and simply add code for your favorite restaurants. Pull requests are very welcome 😍.

## License

[mittagstisch][github] by [Jan Raasch][author] is licensed under [CC BY-NC 4.0][license-url].

[![CC][license-cc-svg] ![BY][license-by-svg]][license-url]

[license-url]: https://creativecommons.org/licenses/by-nc/4.0/
[license-cc-svg]: https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1
[license-by-svg]: https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1
[author]: https://www.janraasch.com
[github]: https://github.com/janraasch/mittagstisch
[glow]: https://github.com/charmbracelet/glow
[screenshot]: https://github.com/janraasch/mittagstisch/raw/master/assets/screenshot.png
[paypal-dot-me]: https://www.paypal.me/janraasch/
[paypal-svg]: https://img.shields.io/badge/onetime-donation-11dde2.svg?logo=paypal
[github-sponsors-svg]: https://img.shields.io/badge/recurring-sponsorship-ee4aaa.svg?logo=github
[github-sponsors]: https://github.com/sponsors/janraasch
