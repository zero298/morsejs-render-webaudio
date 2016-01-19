# morsejs-render-webaudio

[![npm version](https://img.shields.io/npm/v/morsejs-render-webaudio.svg)](https://www.npmjs.com/package/morsejs-render-webaudio)
[![Build Status](https://travis-ci.org/zero298/morsejs-render-webaudio.svg?branch=master)](https://travis-ci.org/zero298/morsejs-render-webaudio)
[![Inline docs](http://inch-ci.org/github/zero298/morsejs-render-webaudio.svg?branch=master)](http://inch-ci.org/github/zero298/morsejs-render-webaudio)

A plugin for morsejs to play translated messages as with [WebAudio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

## Installation

### Dependency

```bash
npm install --save morsejs-render-webaudio
```

## Testing

It is moderately difficult to write automated unit tests for a node.js project that utilizes WebAudio.  Normally, I test automatically with [PhantomJS](http://phantomjs.org/).  However, as of right now [PhantomJS does not support video or audio APIs](http://phantomjs.org/supported-web-standards.html) which is understandable since it is supposed to be a headless browser.

## Usage

```javascript
var mrwa = require("morsejs/render/WebAudio");
mrwa.playMorse(mAudio, translatedMessage);
```