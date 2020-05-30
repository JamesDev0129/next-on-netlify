# README

[![NPM version](https://img.shields.io/npm/v/next-on-netlify)](https://www.npmjs.com/package/next-on-netlify)
[![MIT license](https://img.shields.io/npm/l/next-on-netlify)](https://github.com/FinnWoelm/next-on-netlify/blob/master/LICENSE)
[![NPM downloads](https://img.shields.io/npm/dt/next-on-netlify)](https://www.npmjs.com/package/next-on-netlify)
[![Tested with Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

next-on-netlify is a utility for hosting NextJS applications with Server-Side Rendering on Netlify. It wraps your NextJS application in a tiny compatibility layer, so that pages can be server-side rendered with Netlify functions.



- Demo: https://next-on.netlify.com/  
- Example repository: https://github.com/FinnWoelm/next-on-netlify-demo

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
  functions = "functions"
  publish   = "out"
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
  functions = "functions"
  publish   = "out"
  # We manually set the framework to static, otherwise Netlify automatically
  # detects NextJS and redirects do not work.
  # Read more: https://github.com/netlify/cli/blob/master/docs/netlify-dev.md#project-detection
  framework = "#static"
```

Lastly, add the following lines to your `.gitignore`:

```shell
# .gitignore

# Files generated by next-on-netlify command
functions/nextRouter
out/
404.html
```

Now you're all set.

From now on, whenever you want to preview your application locally, just run:
1. `npm run build`: This will run `next build` to build your NextJS app and `next-on-netlify` to prepare your NextJS app for compatibility with Netlify
1. `netlify dev`: This will emulate Netlify on your computer and let you preview your app on `http://localhost:8888`.

#### Add Custom Redirects

You can define custom redirects in a `_redirects` file in the `public/` folder. When you run `next-on-netlify`, your redirects will be merged with the redirects defined by `next-on-netlify`. Note that your redirects take priority.

Or you can define custom redirects in the `netlify.toml` file.

[Read more about Netlify redirects here](https://docs.netlify.com/routing/redirects/).  


## Limitations

next-on-netlify has only been tested on NextJS version 9 and above.

## Credits

📣 Shoutout to [@mottox2](https://github.com/mottox2) (a pioneer of hosting NextJS on Netlify) and [@danielcondemarin](https://github.com/danielcondemarin) (author of serverless-next.js for AWS). The two were big inspirations for this package.

🙌 Big "thank you" to the following people for their contributions:
- [@spencewood](https://github.com/spencewood)
- [@alxhghs](https://github.com/alxhghs)
