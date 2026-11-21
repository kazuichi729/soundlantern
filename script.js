const players = document.querySelectorAll(".work-card audio");

players.forEach(player => {
  player.addEventListener("play", () => {
    players.forEach(otherPlayer => {
      if (otherPlayer !== player) otherPlayer.pause();
    });
  });

  player.addEventListener("error", () => {
    player.nextElementSibling.hidden = false;
  });
});

/* ===== Copy Email Address ===== */

const copyEmailButton = document.getElementById("copy-email");
const copyMessage = document.getElementById("copy-message");

copyEmailButton.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    copyMessage.textContent = "メールアドレスをコピーしました";
  } catch (error) {
    copyMessage.textContent =
      "コピーできませんでした。アドレスを選択してコピーしてください。";
  }
});

/* Copy inquiry template; retain selectable text if clipboard is unavailable. */
const templateButton = document.getElementById("copy-template");
const templateMessage = document.getElementById("template-message");
templateButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(document.getElementById("inquiry-template").textContent);
    templateMessage.textContent = "相談テンプレートをコピーしました";
  } catch (error) {
    templateMessage.textContent = "コピーできませんでした。上のテンプレートを選択してコピーしてください。";
  }
});
