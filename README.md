# morsejs-render-webaudio

A plugin for morsejs to play translated messages as with [WebAudio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

## Installation

### Dependency

```bash
npm install --save morsejs-render-webaudio
```

## Usage

```javascript
var mrwa = require("morsejs/render/WebAudio");
mrwa.playMorse(mAudio, translatedMessage);
```