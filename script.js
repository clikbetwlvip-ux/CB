"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen =
        document.getElementById("loadingScreen");

    const openingScreen =
        document.getElementById("openingScreen");

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const loadingProgress =
        document.getElementById("loadingProgress");

    const loadingPercent =
        document.getElementById("loadingPercent");

    const loadingMessage =
        document.getElementById("loadingMessage");

    const particleContainer =
        document.getElementById("loadingParticles");

    const starContainer =
        document.getElementById("openingStars");

    const enterButton =
        document.getElementById("enterButton");

    const soundButton =
        document.getElementById("soundButton");

    const backButton =
        document.getElementById("backButton");

    const notification =
        document.getElementById("notification");

    const notificationText =
        document.getElementById("notificationText");

    const loadingMessages = [
        "Menyiapkan dunia...",
        "Memanggil para hero...",
        "Membuka portal anime...",
        "Menyiapkan efek visual...",
        "Portal siap dibuka..."
    ];

    let soundEnabled = true;
    let notificationTimer = null;


    function showScreen(targetScreen) {
        const screens =
            document.querySelectorAll(".screen");

        screens.forEach((screen) => {
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
        for (let index = 0; index < 38; index += 1) {
            const particle =
                document.createElement("span");

            particle.className = "particle";

            const size =
                Math.random() * 4 + 2;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.animationDuration =
                `${Math.random() * 5 + 4}s`;

            particle.style.animationDelay =
                `${Math.random() * 5}s`;

            particle.style.opacity =
                `${Math.random() * 0.8 + 0.2}`;

            particleContainer.appendChild(particle);
        }
    }


    function createStars() {
        for (let index = 0; index < 48; index += 1) {
            const star =
                document.createElement("span");

            star.className = "star";

            const size =
                Math.random() * 3 + 1;

            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.animationDuration =
                `${Math.random() * 2.5 + 1.5}s`;

            star.style.animationDelay =
                `${Math.random() * 3}s`;

            starContainer.appendChild(star);
        }
    }


    function updateLoadingMessage(progress) {
        const messageIndex =
            Math.min(
                loadingMessages.length - 1,
                Math.floor(
                    progress /
                    (100 / loadingMessages.length)
                )
            );

        loadingMessage.textContent =
            loadingMessages[messageIndex];
    }


    function startLoading() {
        let progress = 0;

        const loadingInterval =
            setInterval(() => {
                progress +=
                    Math.floor(Math.random() * 7) + 2;

                if (progress >= 100) {
                    progress = 100;
                }

                loadingProgress.style.width =
                    `${progress}%`;

                loadingPercent.textContent =
                    `${progress}%`;

                updateLoadingMessage(progress);

                if (progress === 100) {
                    clearInterval(loadingInterval);

                    setTimeout(() => {
                        showScreen(openingScreen);
                    }, 650);
                }
            }, 75);
    }


    function updateSoundButton() {
        soundButton.textContent =
            soundEnabled
                ? "🔊 Suara Aktif"
                : "🔇 Suara Nonaktif";
    }


    enterButton.addEventListener("click", () => {
        showScreen(welcomeScreen);

        showNotification(
            "Portal berhasil dibuka!"
        );
    });


    soundButton.addEventListener("click", () => {
        soundEnabled = !soundEnabled;

        updateSoundButton();

        showNotification(
            soundEnabled
                ? "Suara diaktifkan."
                : "Suara dinonaktifkan."
        );
    });


    backButton.addEventListener("click", () => {
        showScreen(openingScreen);

        showNotification(
            "Kembali ke halaman pembuka."
        );
    });


    createParticles();
    createStars();
    updateSoundButton();
    startLoading();
});
