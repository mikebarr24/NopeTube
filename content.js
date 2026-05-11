if (window.location.pathname.startsWith("/shorts/")) {
  window.location.href = chrome.runtime.getURL("no.html");
}

let lastVideoId = null;

function getVideoId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("v");
}

function getTitle() {
  const el = document.querySelector("h1.ytd-watch-metadata yt-formatted-string");
  return el ? el.textContent.trim() : null;
}

function getChannel() {
  const el = document.querySelector("ytd-channel-name yt-formatted-string a");
  return el ? el.textContent.trim() : null;
}

function getTags() {
  const meta = document.querySelector('meta[name="keywords"]');
  return meta ? meta.content.trim() : null;
}

async function classify(title, channel, tags) {
  const { openaiKey, allowedGenres, disallowedGenres } = await chrome.storage.local.get(["openaiKey", "allowedGenres", "disallowedGenres"]);
  if (!openaiKey) return;

  const allowList = allowedGenres
    ? allowedGenres.split("\n").map(g => g.trim()).filter(Boolean)
    : [];
  const blockList = disallowedGenres
    ? disallowedGenres.split("\n").map(g => g.trim()).filter(Boolean)
    : [];

  let systemPrompt = "You classify YouTube video titles. Reply with exactly one word: ALLOW or BLOCK. No punctuation, no explanation.";
  const rules = [];
  if (blockList.length > 0) rules.push(`Always reply BLOCK if the video falls under any of these genres: ${blockList.join(", ")}.`);
  if (allowList.length > 0) rules.push(`Reply ALLOW if the video is educational or falls under any of these genres: ${allowList.join(", ")}.`);
  else rules.push("Reply ALLOW if the video is educational.");
  rules.push("Otherwise reply BLOCK.");
  systemPrompt = `You classify YouTube video titles. Reply with exactly one word: ALLOW or BLOCK. No punctuation, no explanation. ${rules.join(" ")}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 5,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: [
              `Title: ${title}`,
              channel ? `Channel: ${channel}` : null,
              tags    ? `Tags: ${tags}`       : null,
            ].filter(Boolean).join("\n") },
        ],
      }),
    });

    if (!res.ok) return;
    const data = await res.json();
    const answer = data.choices[0].message.content.trim().toUpperCase();
    if (answer.startsWith("BLOCK")) {
      window.location.href = chrome.runtime.getURL("no.html");
    }
  } catch (err) {
    console.error("[NopeTube]", err);
  }
}

function tryClassify() {
  const id = getVideoId();
  if (!id || id === lastVideoId) return;

  let attempts = 0;
  const poll = setInterval(() => {
    const title = getTitle();
    if (title) {
      clearInterval(poll);
      lastVideoId = id;
      classify(title, getChannel(), getTags());
    } else if (++attempts > 20) {
      clearInterval(poll);
    }
  }, 250);
}

window.addEventListener("yt-navigate-finish", tryClassify);
tryClassify();
