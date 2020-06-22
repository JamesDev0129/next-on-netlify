# README

[![NPM version](https://img.shields.io/npm/v/next-on-netlify)](https://www.npmjs.com/package/next-on-netlify)
[![MIT license](https://img.shields.io/npm/l/next-on-netlify)](https://github.com/FinnWoelm/next-on-netlify/blob/master/LICENSE)
[![NPM downloads](https://img.shields.io/npm/dt/next-on-netlify)](https://www.npmjs.com/package/next-on-netlify)
[![Tested with Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

next-on-netlify is a utility for hosting NextJS applications with Server-Side Rendering on Netlify. It wraps your NextJS application in a tiny compatibility layer, so that pages can be server-side rendered with Netlify functions.

- Demo: https://next-on.netlify.com/  
- Example repository: https://github.com/FinnWoelm/next-on-netlify-demo

## Table of Contents
* [Installation](#installation)
* [Setup](#setup)
  - [1. Set NextJS  target to serverless](#1-set-nextjs--target-to-serverless)
  - [2. Add postbuild hook](#2-add-postbuild-hook)
  - [3. Configure Netlify](#3-configure-netlify)
* [Optional Extras](#optional-extras)
  - [Preview Locally](#preview-locally)
  - [Custom Netlify Redirects](#custom-netlify-redirects)
  - [Custom Netlify Functions](#custom-netlify-functions)
* [Caveats](#caveats)
  + [Preview Mode](#preview-mode)
  + [Fallbacks for Pages with `getStaticPaths`](#fallbacks-for-pages-with--getstaticpaths-)
* [Showcase](#showcase)
* [Credits](#credits)

## Installation

```
npm install --save next-on-netlify
```

## Setup

#### 1. Set NextJS  target to serverless

We must build our NextJS app as a serverless app. You can read more about serverless NextJS here.

It's super simple. Just create a `next.config.js` file and write the following:

```js
// next.config.js

module.exports = {
  // Target must be serverless
  target: 'serverless'
};
```

#### 2. Add postbuild hook

The next-on-netlify package adds the `next-on-netlify`  command. When we run this command, some magic happens to prepare our NextJS app for hosting on Netlify*.

We want the next-on-netlify command to run after we build our NextJS application. So let's add a postbuild hook to our package.json file:

```json
{
  "name": "my-nextjs-app",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "postbuild": "next-on-netlify"
  },
  ....
}
```

\*If you're curious about the "magic", check out the well-documented [`next-on-netlify.js` file](https://github.com/FinnWoelm/next-on-netlify/blob/master/next-on-netlify.js).

#### 3. Configure Netlify

We're almost done! We just have to tell Netlify how to build our NextJS app, where the functions folder is located, and which folder to upload to its CDN. We do that with a `netlify.toml` file and the following instructions:

```toml
[build]
  command   = "npm run build"
  functions = "out_functions"
  publish   = "out_publish"
```

We're done. Let's deploy 🚀🚀🚀

## Optional Extras

#### Preview Locally

I recommend you still use `next dev` to build and preview your application locally.

But if you want to emulate the Netlify deployment on your computer, you can also run `next-on-netlify` locally and then use `netlify-cli` to preview the result.

First, install `netlify-cli` v2.51.0 or later:

```bash
npm install -g netlify-cli
```

Then, add the following `[dev]` block to your `netlify.toml`:

```toml
# netlify.toml

# [build]
#   ...

[dev]
  functions = "out_functions"
  publish   = "out_publish"
  # We manually set the framework to static, otherwise Netlify automatically
  # detects NextJS and redirects do not work.
  # Read more: https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#project-detection
  framework = "#static"
```

Lastly, add the following lines to your `.gitignore`:

```shell
# .gitignore

# Files generated by next-on-netlify command
/out_publish/
/out_functions/
/404.html
```

Now you're all set.

From now on, whenever you want to preview your application locally, just run:
1. `npm run build`: This will run `next build` to build your NextJS app and `next-on-netlify` to prepare your NextJS app for compatibility with Netlify
1. `netlify dev`: This will emulate Netlify on your computer and let you preview your app on `http://localhost:8888`.

#### Custom Netlify Redirects

You can define custom redirects in a `_redirects` and/or in your `netlify.toml` file.
The precedence of these rules are:

- `_redirects`
- `next-on-netlify` redirects
- `netlify.toml`

[Read more about Netlify redirects here](https://docs.netlify.com/routing/redirects/).  

#### Custom Netlify Functions

`next-on-netlify` creates one Netlify Function for each of your
SSR pages and API endpoints. It is currently not possible to create custom Netlify Functions. Let me know if you have a need for this feature and we can add it.

## Caveats

### Preview Mode

[NextJS Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) is currently not supported. When you call `res.setPreviewData({})`, NextJS tries to set and send two cookies to the user. But Netlify Functions only support setting one cookie per function call at the moment. This is [a long-standing bug on Netlify's side](https://community.netlify.com/t/multiple-set-cookie-headers-cause-netlify-lambda-to-throw-an-error/975). We're discussing work-arounds. See: [Issue #10](https://github.com/FinnWoelm/next-on-netlify/issues/10)


### Fallbacks for Pages with `getStaticPaths`

[Fallback pages](https://nextjs.org/docs/basic-features/data-fetching#fallback-true) behave differently with `next-on-netlify` than they do with NextJS. On NextJS, when navigating to a path that is not defined in `getStaticPaths`, it first displays the fallback page. NextJS then generates the HTML in the background and caches it for future requests.

With `next-on-netlify`, when navigating to a path that is not defined in `getStaticPaths`, it server-side renders the page and sends it directly to the user. The user never sees the fallback page. The page is not cached for future requests.

For more on this, see: [Issue #7](https://github.com/FinnWoelm/next-on-netlify/issues/7#issuecomment-636883539)

## Showcase

The following sites are built with `next-on-netlify`:

![missionbit.org](https://raw.githubusercontent.com/FinnWoelm/next-on-netlify/master/assets/showcase-missionbit.png)  
[missionbit.org](https://www.missionbit.org/) ([#18](https://github.com/FinnWoelm/next-on-netlify/pull/18#issuecomment-643828966))

Are building something awesome with `next-on-netlify`? 🔥 Let me know and we will feature it here :)

## Credits

📣 Shoutout to [@mottox2](https://github.com/mottox2) (a pioneer of hosting NextJS on Netlify) and [@danielcondemarin](https://github.com/danielcondemarin) (author of serverless-next.js for AWS). The two were big inspirations for this package.

🙌 Big "thank you" to the following people for their contributions, support, and beta testing:
- [@spencewood](https://github.com/spencewood)
- [@alxhghs](https://github.com/alxhghs)
- [@gamliela](https://github.com/gamliela)
- [@wei](https://github.com/wei)
- [@laugharn](https://github.com/laugharn)
- [@rajington](https://github.com/rajington)
- [@etrepum](https://github.com/etrepum)
