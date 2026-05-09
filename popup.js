const keyInput = document.getElementById("key");
const genresInput = document.getElementById("genres");
const disallowedInput = document.getElementById("disallowed");
const saveBtn = document.getElementById("save");
const status = document.getElementById("status");

chrome.storage.local.get(["openaiKey", "allowedGenres", "disallowedGenres"], ({ openaiKey, allowedGenres, disallowedGenres }) => {
  if (openaiKey) keyInput.value = openaiKey;
  if (allowedGenres) genresInput.value = allowedGenres;
  if (disallowedGenres) disallowedInput.value = disallowedGenres;
});

saveBtn.addEventListener("click", () => {
  const key = keyInput.value.trim();
  if (!key) {
    status.textContent = "Please enter a key.";
    return;
  }
  chrome.storage.local.set({
    openaiKey: key,
    allowedGenres: genresInput.value.trim(),
    disallowedGenres: disallowedInput.value.trim(),
  }, () => {
    status.textContent = "Saved!";
    setTimeout(() => { status.textContent = ""; }, 2000);
  });
});
