"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const openingScreen = document.getElementById("openingScreen");
    const loginScreen = document.getElementById("loginScreen");
    const lobbyScreen = document.getElementById("lobbyScreen");

    const loadingProgress = document.getElementById("loadingProgress");
    const loadingPercent = document.getElementById("loadingPercent");
    const loadingMessage = document.getElementById("loadingMessage");

    const loadingParticles = document.getElementById("loadingParticles");
    const openingStars = document.getElementById("openingStars");

    const enterButton = document.getElementById("enterButton");
    const soundButton = document.getElementById("soundButton");

    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("usernameInput");
    const usernameError = document.getElementById("usernameError");
    const loginBackButton = document.getElementById("loginBackButton");

    const memberName = document.getElementById("memberName");
    const logoutButton = document.getElementById("logoutButton");

    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");

    const loadingMessages = [
        "Menyiapkan dunia...",
        "Membuka portal...",
        "Memanggil para hero...",
        "Menyiapkan petualangan...",
        "Portal siap dibuka..."
    ];

    let soundEnabled = true;
    let notificationTimer;

    function showScreen(targetScreen) {
        document.querySelectorAll(".screen").forEach((screen) => {
            screen.classList.remove("active");
        });

        targetScreen.classList.add("active");
    }

    function showNotification(message) {
        notificationText.textContent = message;
        notification.classList.add("show");

        clearTimeout(notificationTimer);

        notificationTimer = setTimeout(() => {
            notification.classList.remove("show");
        }, 2200);
    }

    function createParticles() {
        for (let index = 0; index < 35; index += 1) {
            const particle = document.createElement("span");

            particle.className = "particle";

            const size = Math.random() * 4 + 2;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 5 + 4}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            loadingParticles.appendChild(particle);
        }
    }

    function createStars() {
        for (let index = 0; index < 45; index += 1) {
            const star = document.createElement("span");

            star.className = "star";

            const size = Math.random() * 3 + 1;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 2.5 + 1.5}s`;
            star.style.animationDelay = `${Math.random() * 3}s`;

            openingStars.appendChild(star);
        }
    }

    function startLoading() {
        let progress = 0;

        const loadingInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 7) + 2;

            if (progress >= 100) {
                progress = 100;
            }

            loadingProgress.style.width = `${progress}%`;
            loadingPercent.textContent = `${progress}%`;

            const messageIndex = Math.min(
                loadingMessages.length - 1,
                Math.floor(progress / 20)
            );

            loadingMessage.textContent = loadingMessages[messageIndex];

            if (progress === 100) {
                clearInterval(loadingInterval);

                setTimeout(() => {
                    showScreen(openingScreen);
                }, 600);
            }
        }, 75);
    }

    enterButton.addEventListener("click", () => {
        showScreen(loginScreen);

        setTimeout(() => {
            usernameInput.focus();
        }, 300);
    });

    soundButton.addEventListener("click", () => {
        soundEnabled = !soundEnabled;

        soundButton.textContent = soundEnabled
            ? "🔊 Suara Aktif"
            : "🔇 Suara Nonaktif";

        showNotification(
            soundEnabled
                ? "Suara diaktifkan."
                : "Suara dinonaktifkan."
        );
    });

    loginBackButton.addEventListener("click", () => {
        usernameInput.value = "";
        usernameError.textContent = "";

        showScreen(openingScreen);
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();

        if (username.length < 3) {
            usernameError.textContent =
                "Username minimal harus berisi 3 karakter.";

            usernameInput.focus();
            return;
        }

        usernameError.textContent = "";
        memberName.textContent = username;

        localStorage.setItem("fantasyPortalUsername", username);

        showScreen(lobbyScreen);
        showNotification(`Selamat datang, ${username}!`);
    });

    usernameInput.addEventListener("input", () => {
        usernameError.textContent = "";
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("fantasyPortalUsername");

        usernameInput.value = "";
        memberName.textContent = "Member";

        showScreen(openingScreen);
        showNotification("Berhasil keluar dari portal.");
    });
    
    const menuCards = document.querySelectorAll(".menu-card");

const dailyRewardScreen = document.getElementById("dailyRewardScreen");
const rewardBackButton = document.getElementById("rewardBackButton");
const claimRewardButton = document.getElementById("claimRewardButton");
const rewardStatus = document.getElementById("rewardStatus");

menuCards.forEach((menuCard) => {
    menuCard.addEventListener("click", () => {
        const menuName = menuCard.dataset.menu;

        if (menuName === "Daily Reward") {
            showScreen(dailyRewardScreen);
            return;
        }

        showNotification(`${menuName} akan segera dibuka.`);
    });
});

rewardBackButton.addEventListener("click", () => {
    showScreen(lobbyScreen);
});

claimRewardButton.addEventListener("click", () => {
    claimRewardButton.disabled = true;
    claimRewardButton.querySelector(".button-text").textContent =
        "✅ HADIAH BERHASIL DIKLAIM";

    rewardStatus.textContent =
        "Hadiah Hari 1 sudah masuk ke akun member.";

    showNotification("Daily Reward berhasil diklaim.");
});
    createParticles();
    createStars();
    startLoading();
});
