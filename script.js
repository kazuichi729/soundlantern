
const tracks = {
  epic3: {
    title: "Epic3",
    genre: "Epic / Cinematic Orchestral",
    description: "壮大なオーケストラによるシネマティック楽曲。冒険や戦闘、物語のクライマックスを想定。",
    image: "images/epic3.png",
    audio: "audio/epic3.mp3"
  },
  central_square: {
    title: "Central Square",
    genre: "Fantasy / Town",
    description: "幻想的な街の中央広場をイメージしたBGM。穏やかな日常と、少し不思議な世界観を表現。",
    image: "images/central_square.png",
    audio: "audio/central_square.mp3"
  },
  walking_day: {
    title: "Walking Day",
    genre: "Daily / Heartwarming",
    description: "明るく温かい日常をイメージした楽曲。散歩や街歩き、穏やかな会話シーンなどに。",
    image: "images/walking_day.png",
    audio: "audio/walking_day.mp3"
  },
  church: {
    title: "Church",
    genre: "Sacred / Classical",
    description: "バッハのコラールに着想を得た、教会をイメージした楽曲。荘厳で落ち着いた雰囲気。",
    image: "images/church.png",
    audio: "audio/church.mp3"
  },
  creeping_shadows: {
    title: "Creeping Shadows",
    genre: "Suspense / Stealth / Electronic",
    description: "軽快な電子音と不穏な雰囲気を組み合わせたサスペンスBGM。潜入や尾行、怪しい出来事が進行するシーンをイメージしています。",
    image: "images/creeping_shadows.png",
    audio: "audio/creeping_shadows.mp3"
  }
};

const modal = document.getElementById("music-modal");
const modalAudio = document.getElementById("modal-audio");
const closeButton = document.querySelector(".modal-close");

document.querySelectorAll(".work-card").forEach(card => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-haspopup", "dialog");

  const openTrack = () => {
    const track = tracks[card.dataset.track];
    if (!track) return;

    document.getElementById("modal-title").textContent = track.title;
    document.getElementById("modal-genre").textContent = track.genre;
    document.getElementById("modal-description").textContent = track.description;

    document.querySelector(".modal-artwork").style.backgroundImage =
      `url("${track.image}")`;

    document.querySelectorAll(".work-card audio").forEach(audio => {
      audio.pause();
    });

    
    modalAudio.pause();
    modalAudio.src = track.audio;

    modal.showModal();

    // カードをクリックしたら音楽を再生
    modalAudio.play().catch(error => {
    console.log("自動再生できませんでした:", error);
    });

  };

  card.addEventListener("click", event => {
    if (event.target.closest("audio")) return;
    openTrack();
  });

  card.addEventListener("keydown", event => {
    if (event.target !== card) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openTrack();
    }
  });
});

function closeModal() {
  modalAudio.pause();
  modal.close();
}

closeButton.addEventListener("click", closeModal);

modal.addEventListener("cancel", () => {
  modalAudio.pause();
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    const rect = modal.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (outside) closeModal();
  }
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
