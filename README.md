# NopeTube

> A Chrome extension that uses AI to decide whether you deserve to watch a YouTube video.

You wanted to learn something. You opened YouTube. Somehow it's been 45 minutes and you're watching a man eat 100 hot dogs. **NopeTube fixes this.**

---

## How it works

1. You open a YouTube video.
2. NopeTube sends the title to GPT-4o-mini and asks: *is this a waste of time?*
3. GPT thinks about it for a fraction of a second.
4. If the answer is yes: you get a large red screen that says **NO!!**
5. If the answer is no: enjoy your video, you've earned it.

YouTube Shorts are blocked unconditionally. No trial. No appeal.

---

## Setup

This extension is not on the Chrome Web Store. Load it manually:

1. Clone or download this repo.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this folder.
5. Click the NopeTube icon in your toolbar and enter your **OpenAI API key**.

That's it. Your bad decisions are now someone else's problem (GPT-4o-mini's).

---

## Configuration

Open the popup to set your rules:

**Allowed genres** — things you're allowed to watch. One per line.
```
Tech
Computer Programming
Cooking
Documentary
```

**Disallowed genres** — things you are absolutely not allowed to watch. One per line.
```
Gaming
Vlogs
Reaction videos
```

If a video is educational but matches a disallowed genre, the disallowed list wins. You set these rules. You only have yourself to blame.

---

## The block page

When a video gets blocked, you'll see this:

```
██╗   ██╗ ██████╗ ██╗██╗
████╗ ██║██╔═══██╗██║██║
██╔██╗██║██║   ██║██║██║
██║╚████║██║   ██║╚═╝╚═╝
██║ ╚███║╚██████╔╝██╗██╗
╚═╝  ╚══╝ ╚═════╝ ╚═╝╚═╝
```

(In practice it's just a big red screen that says **NO!!** in 20vw font, which is arguably more effective.)

There is a "Back to YouTube" button. Whether you click it is between you and your conscience.

---

## Requirements

- Chrome (or any Chromium-based browser)
- An [OpenAI API key](https://platform.openai.com/api-keys)
- A genuine desire to stop wasting time (optional but recommended)

---

## Privacy

Your video titles are sent to OpenAI's API for classification. Your API key is stored locally in Chrome's extension storage and never leaves your machine. NopeTube has no backend, no analytics, and no idea what you've been watching. (GPT-4o-mini knows, but it won't tell anyone.)

---

## Cost

GPT-4o-mini is extremely cheap. Each classification costs a fraction of a cent. You will spend more money on coffee while procrastinating than you will ever spend on API calls.

---

*Built because willpower is finite and API calls are cheap.*
