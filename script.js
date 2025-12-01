document.addEventListener("DOMContentLoaded", () => {
  const snowContainer = document.querySelector(".snow");
  if (!snowContainer) return; // sicurezza: se manca il contenitore, esci

  function createSnowflake() {
    // wrapper che cade
    const wrapper = document.createElement("div");
    wrapper.className = "snowflake-wrapper";
    wrapper.style.left = Math.random() * window.innerWidth + "px";

    const fallDuration = 6 + Math.random() * 6; // 6–12s
    wrapper.style.animationDuration = `${fallDuration}s`;

    // fiocco interno che dondola
    const flake = document.createElement("div");
    flake.className = "snowflake";

    const swayDuration = 2 + Math.random() * 3; // 2–5s
    flake.style.animationDuration = `${swayDuration}s`;

    // dimensione piccola
    const size = 4 + Math.random() * 5; // 2–5px
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;

    wrapper.appendChild(flake);
    snowContainer.appendChild(wrapper);

    // pulizia al termine della caduta
    setTimeout(() => wrapper.remove(), fallDuration * 1000);
  }

  // densità neve (puoi aumentare o diminuire)
  const intervalMs = 160; // ~6 fiocchi al secondo
  setInterval(createSnowflake, intervalMs);
});





document.addEventListener("DOMContentLoaded", () => {
  const days = document.querySelectorAll(".day");
  const popup = document.getElementById("popup");
  const popupCard = document.querySelector(".popup-card");
  const closeBtn = document.getElementById("close");
  const dateEl = document.querySelector(".popup-date");
  const bodyEl = document.querySelector(".popup-body");

  // Popup per caselle bloccate
  const lockedPopup = document.createElement("div");
  lockedPopup.className = "popup";
  lockedPopup.style.display = "none";
  lockedPopup.innerHTML = `
    <div class="popup-card" role="dialog" aria-modal="true">
      <button class="close-btn" aria-label="Chiudi">&times;</button>
      <div class="locked-body"></div>
    </div>
  `;
  document.body.appendChild(lockedPopup);
  const lockedBody = lockedPopup.querySelector(".locked-body");
  const lockedClose = lockedPopup.querySelector(".close-btn");

  // Tutti i contenuti delle caselle
  const contents = {
    1: { text: "Ehi! Fila ad aprire la casella del tuo compleanno!", img: "img/star.png" },
    2: { text: "Buon compleanno patatoooo!", img: "img/foto1.png" },
    3: { text: "Una canzone che mi fa pensare a te...", img: "img/spcode-1.png" },
    4: { text: "Una candelina per ricordarci di farci luce a vicenda quando ne abbiamo più bisogno...", img: "img/candle.png" },
    5: { text: "Ti ricordi quando abbiamo visto Stranger Things a Milano?", img: "img/foto2.png" },
    6: { text: "Miaooo", img: "img/foto6.png" },
    7: { text: "Scrivimi qual è il tuo ricordo preferito di noi...ma nel frattempo lo sai che sei il mio zuccherino?", img: "img/sugar.png" },
    8: { text: "La faccia di una che stava già partorendo l'idea di prendere un aereo dopo 1 giorno che mi mancavi...", img: "img/foto7.png" },
    9: { text: "Una canzone che mi fa pensare a te...", img: "img/spcode-2.png" },
    10: { text: "Due pollicini infreddolitiii", img: "img/foto8.png" },
    11: { text: "Quella volta in cui per poco rischiavamo l'insolazione...", img: "img/foto3.png" },
    12: { text: "Lo sai che sei la mia ciliegina?", img: "img/cherries.png" },
    13: { text: "Qual è il tuo ricordo più divertente e random dell'Islanda? Inizio io:", img: "img/foto9.png" },
    14: { text: "Vera icona di moda dal 1999", img: "img/foto4.png" },
    15: { text: "Una canzone che mi fa pensare a te...", img: "img/spcode-3.png" },
    16: { text: "Tu per me sei tutti i colori... Ti amo tanto tanto", img: "img/sugar.png" },
    17: { text: "Buon inizio giornata... così", img: "img/foto5.png" },
    18: { text: "Hai vinto un coupon cioccolata calda fatta da me! (La ciobar ovviamente...non scherziamo)", img: "img/hot-chocolate.png" },
    19: { text: "Amori belliiiii", img: "img/foto11.png" },
    20: { text: "Che ne dici di un risottino al gorgonzola accompagnato da del vino rosso? Cucino io...davvero", img: "img/red-wine.png" },
    21: { text: "Quali sono i tuoi desideri per l'estate '26?", img: "img/foto12.png" },
    22: { text: "Una canzone che mi fa pensare a te...", img: "img/spcode-4.png" },
    23: { text: "Non vedo l'ora di condividere insieme altre tantissime emozioni bellissime", img: "img/foto10.png" },
    24: { text: "È la vigilia di Nataleee! Sei pronto per il tuo regalo?", img: "img/tree.png" }
  };

  // Controllo sblocco
  function isUnlocked(dayNumber) {
    const now = new Date();
    const isDecember = now.getMonth() === 11; // dicembre
    if (!isDecember) return false;
    const today = now.getDate();
    return dayNumber >= 1 && dayNumber <= 24 && dayNumber <= today;
  }

  // Calcolo tempo mancante
  function timeUntilUnlock(dayNumber) {
    const now = new Date();
    const unlockDate = new Date(now.getFullYear(), 11, dayNumber, 0, 0, 0, 0);
    const diffMs = unlockDate.getTime() - now.getTime();
    if (diffMs <= 0) return "0 ore";
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays >= 1) {
      return `${diffDays} ${diffDays === 1 ? "giorno" : "giorni"}`;
    } else {
      return `${diffHours} ore`;
    }
  }

  // Badge lucchetto
  function renderLockBadge(dayEl) {
    const existing = dayEl.querySelector(".js-lock-badge");
    if (existing) existing.remove();
    const badge = document.createElement("div");
    badge.className = "js-lock-badge";
    badge.setAttribute("aria-hidden", "true");
    Object.assign(badge.style, {
      position: "absolute",
      top: "8px",
      right: "8px",
      zIndex: "10",
      background: "#fff",
      borderRadius: "50%",
      width: "22px",
      height: "22px",
      border: "1px solid #000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    });
    badge.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    `;
    dayEl.appendChild(badge);
  }

  function clearLockBadge(dayEl) {
    const existing = dayEl.querySelector(".js-lock-badge");
    if (existing) existing.remove();
  }

  function applyLocks() {
    days.forEach(day => {
      const dayNumber = Number(day.getAttribute("data-day"));
      if (isUnlocked(dayNumber)) {
        day.style.opacity = "";
        day.setAttribute("aria-disabled", "false");
        clearLockBadge(day);
      } else {
        day.style.opacity = "0.5";
        day.setAttribute("aria-disabled", "true");
        renderLockBadge(day);
      }
    });
  }

  applyLocks();

  // Aggiornamento a mezzanotte
  function scheduleMidnightUpdate() {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0, 0
    );
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();
    setTimeout(() => {
      applyLocks();
      scheduleMidnightUpdate();
    }, msUntilMidnight);
  }
  scheduleMidnightUpdate();

  // Click sulle caselle
  days.forEach(day => {
    day.addEventListener("click", () => {
      const dayNumber = Number(day.getAttribute("data-day"));
      if (!isUnlocked(dayNumber)) {
        const untilText = timeUntilUnlock(dayNumber);
        lockedBody.innerHTML = `
          <img src="img/locked-key-gift.png" alt="Lucchetto" style="width:120px;height:120px;margin-bottom:12px;">
          <p>Apri in ${untilText}</p>
          <p>Potrai aprire questa casella solo alla mezzanotte del ${dayNumber} dicembre.</p>
        `;
        lockedPopup.style.display = "flex";
        return;
      }

      // Casella sbloccata → mostra contenuto
      dateEl.textContent = `${dayNumber} dicembre`;
      const entry = contents[dayNumber] || {};
      const safeText = entry.text || "Scrivi qui il tuo messaggio speciale.";
      const imgHtml = entry.img ? `<img src="${entry.img}" alt="Immagine del ${dayNumber} dicembre">` : "";

      bodyEl.innerHTML = `
        <p>${safeText}</p>
        ${imgHtml}
      `;

      // Mostra overlay
      popup.style.display = "flex";
      popup.setAttribute("aria-hidden", "false");
    });
  });

  // Chiudi con la X
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popup.setAttribute("aria-hidden", "true");
  });
  lockedClose.addEventListener("click", () => {
    lockedPopup.style.display = "none";
  });

  // Chiudi cliccando fuori dalla card
  popup.addEventListener("click", (e) => {
    if (!popupCard.contains(e.target)) {
      popup.style.display = "none";
      popup.setAttribute("aria-hidden", "true");
    }
  });
  lockedPopup.addEventListener("click", (e) => {
    if (!lockedPopup.querySelector(".popup-card").contains(e.target)) {
      lockedPopup.style.display = "none";
    }
  });

  // Esc per chiudere
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (popup.style.display === "flex") {
        popup.style.display = "none";
        popup.setAttribute("aria-hidden", "true");
      }
      if (lockedPopup.style.display === "flex") {
        lockedPopup.style.display = "none";
      }
    }
  });
});