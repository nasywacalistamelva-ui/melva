
// =====================================
// NETSPACE - TKJ LEARNING HUB
// =====================================

// LOADING
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 800);
});

// NAVBAR
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    document.getElementById("backToTop")
        .classList.toggle("show", window.scrollY > 300);
});

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    navMenu.classList.toggle("collapse");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        navMenu.classList.add("collapse");
    });
});

// BACK TO TOP
document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// NOTIFICATION
function notify(message) {
    const notification = document.getElementById("notification");

    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// 3D MOUSE EFFECT
const universe = document.getElementById("universe");

universe.addEventListener("mousemove", (e) => {
    const rect = universe.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    universe.style.transform =
        `rotateY(${(x - 0.5) * 15}deg) rotateX(${(0.5 - y) * 15}deg)`;
});

universe.addEventListener("mouseleave", () => {
    universe.style.transform = "rotateY(0) rotateX(0)";
});

// PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = "rgba(0,229,255,0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 65; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        for (let j = index + 1; j < particles.length; j++) {
            const other = particles[j];

            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 110) {
                ctx.strokeStyle =
                    `rgba(0,229,255,${1 - distance / 110})`;

                ctx.lineWidth = 0.4;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// LEARNING MODAL
const learningData = {
    hardware: {
        title: "Computer Hardware",
        content: `
            <h5>Materi Computer Hardware</h5>
            <p>Hardware merupakan perangkat keras komputer yang dapat dilihat dan disentuh.</p>
            <ul>
                <li>Motherboard</li>
                <li>Processor (CPU)</li>
                <li>RAM</li>
                <li>Hard Disk dan SSD</li>
                <li>Power Supply</li>
                <li>Input dan Output Device</li>
            </ul>
        `
    },

    networking: {
        title: "Computer Networking",
        content: `
            <h5>Materi Computer Networking</h5>
            <p>Jaringan komputer merupakan hubungan antara dua atau lebih perangkat untuk berbagi data dan sumber daya.</p>
            <ul>
                <li>LAN</li>
                <li>MAN</li>
                <li>WAN</li>
                <li>Topologi Jaringan</li>
                <li>IP Address</li>
            </ul>
        `
    },

    os: {
        title: "Operating System",
        content: `
            <h5>Materi Operating System</h5>
            <p>Sistem operasi merupakan perangkat lunak yang mengelola perangkat keras dan aplikasi komputer.</p>
            <ul>
                <li>Windows</li>
                <li>Linux</li>
                <li>Ubuntu</li>
                <li>Instalasi Sistem Operasi</li>
            </ul>
        `
    },

    configuration: {
        title: "Network Configuration",
        content: `
            <h5>Materi Network Configuration</h5>
            <p>Konfigurasi jaringan digunakan untuk mengatur komunikasi antarperangkat.</p>
            <ul>
                <li>IP Address</li>
                <li>Subnet Mask</li>
                <li>Gateway</li>
                <li>DNS</li>
                <li>DHCP</li>
            </ul>
        `
    },

    security: {
        title: "Cybersecurity",
        content: `
            <h5>Materi Cybersecurity</h5>
            <p>Cybersecurity merupakan upaya melindungi sistem, jaringan, dan data digital.</p>
            <ul>
                <li>Password Security</li>
                <li>Firewall</li>
                <li>Antivirus</li>
                <li>Data Protection</li>
                <li>Phishing Awareness</li>
            </ul>
        `
    },

    programming: {
        title: "Programming",
        content: `
            <h5>Materi Programming</h5>
            <p>Pemrograman merupakan proses membuat instruksi untuk menjalankan suatu tugas pada komputer.</p>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Algoritma Dasar</li>
            </ul>
        `
    }
};

document.querySelectorAll(".explore-btn").forEach(button => {
    button.addEventListener("click", () => {
        const topic = button.dataset.topic;
        const data = learningData[topic];

        document.getElementById("modalTitle").textContent = data.title;
        document.getElementById("modalBody").innerHTML = data.content;

        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("learningModal")
        ).show();
    });
});

// LEARNING PROGRESS
let progress = 0;

document.getElementById("addProgress").addEventListener("click", () => {
    progress = Math.min(progress + 10, 100);

    document.getElementById("learningProgress").style.width = progress + "%";
    document.getElementById("progressText").textContent = progress + "%";
    document.getElementById("progressLabel").textContent = progress + "%";

    notify("Learning progress berhasil diperbarui!");
});

// QUIZ
const quizData = [
    {
        question: "Apa fungsi utama RAM pada komputer?",
        answers: [
            "Menyimpan data sementara",
            "Menampilkan gambar",
            "Menghubungkan internet",
            "Mencetak dokumen"
        ],
        correct: 0
    },
    {
        question: "Perangkat yang digunakan untuk menghubungkan jaringan adalah?",
        answers: [
            "Keyboard",
            "Router",
            "Monitor",
            "Speaker"
        ],
        correct: 1
    },
    {
        question: "Apa kepanjangan dari LAN?",
        answers: [
            "Local Area Network",
            "Large Access Network",
            "Long Area Node",
            "Local Access Number"
        ],
        correct: 0
    },
    {
        question: "Manakah yang termasuk sistem operasi?",
        answers: [
            "Google Chrome",
            "Microsoft Word",
            "Linux",
            "HTML"
        ],
        correct: 2
    },
    {
        question: "Apa fungsi utama firewall?",
        answers: [
            "Mengatur kecerahan layar",
            "Melindungi jaringan",
            "Mencetak data",
            "Menyimpan file"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextQuestion");

function showQuestion() {
    answered = false;

    const question = quizData[currentQuestion];

    questionElement.textContent = question.question;

    document.getElementById("questionNumber").textContent =
        `QUESTION ${currentQuestion + 1}/${quizData.length}`;

    document.getElementById("quizProgress").style.width =
        `${(currentQuestion / quizData.length) * 100}%`;

    answersElement.innerHTML = "";

    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === quizData.length - 1
            ? "Finish"
            : "Next Question";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(index, selectedButton) {
    if (answered) return;

    answered = true;

    const correct = quizData[currentQuestion].correct;
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach((button, i) => {
        button.disabled = true;

        if (i === correct) {
            button.classList.add("correct");
        }
    });

    if (index === correct) {
        score += 20;
        selectedButton.classList.add("correct");
        notify("Benar! Jawaban kamu tepat.");
    } else {
        selectedButton.classList.add("wrong");
        notify("Jawaban belum tepat. Pelajari kembali materinya.");
    }

    document.getElementById("score").textContent = score;
    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    questionElement.textContent = "Challenge Completed!";

    answersElement.innerHTML = `
        <h3 class="text-center" style="color:#00e5ff">
            YOUR SCORE: ${score}/100
        </h3>
        <p class="text-center">
            ${
                score >= 80
                    ? "Excellent! Pengetahuan TKJ kamu sangat baik."
                    : score >= 60
                    ? "Good Job! Terus tingkatkan kemampuanmu."
                    : "Tetap semangat! Pelajari kembali materi TKJ."
            }
        </p>
    `;

    document.getElementById("quizProgress").style.width = "100%";
    nextButton.textContent = "Try Again";
    nextButton.disabled = false;

    nextButton.onclick = () => {
        currentQuestion = 0;
        score = 0;
        document.getElementById("score").textContent = 0;
        document.getElementById("quizResult").textContent = "";
        nextButton.onclick = null;
        nextButton.addEventListener("click", () => {});
        showQuestion();
    };
}

showQuestion();

// INTERACTIVE TERMINAL
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

function terminalCommand() {
    const command = terminalInput.value.trim().toLowerCase();

    if (!command) return;

    const userLine = document.createElement("p");
    userLine.textContent = "student@netspace:~$ " + command;
    terminalOutput.appendChild(userLine);

    const response = document.createElement("p");

    switch (command) {
        case "help":
            response.textContent =
                "Available commands: help, about, date, clear, network";
            break;

        case "about":
            response.textContent =
                "NETSPACE - TKJ Learning Hub SMKN 1 Garut.";
            break;

        case "date":
            response.textContent = new Date().toLocaleString("id-ID");
            break;

        case "network":
            response.textContent =
                "Network simulation: PC -> Router -> Internet.";
            break;

        case "clear":
            terminalOutput.innerHTML = "";
            terminalInput.value = "";
            return;

        default:
            response.textContent =
                "Command not found. Type 'help' to see commands.";
    }

    terminalOutput.appendChild(response);
    terminalInput.value = "";
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

document.getElementById("terminalSend")
    .addEventListener("click", terminalCommand);

terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") terminalCommand();
});

// NETWORK SIMULATION
let networkConnected = false;

document.getElementById("connectNetwork")
    .addEventListener("click", () => {

        networkConnected = !networkConnected;

        const pcStatus = document.getElementById("pcStatus");
        const internetStatus = document.getElementById("internetStatus");

        pcStatus.textContent = networkConnected ? "Online" : "Offline";
        internetStatus.textContent = networkConnected ? "Connected" : "Offline";

        pcStatus.classList.toggle("online", networkConnected);
        internetStatus.classList.toggle("online", networkConnected);

        document.getElementById("connectionLine")
            .classList.toggle("active", networkConnected);

        document.getElementById("connectionLine2")
            .classList.toggle("active", networkConnected);

        notify(networkConnected
            ? "Network berhasil terhubung!"
            : "Koneksi jaringan diputus.");
    });

// MINI GAME
const games = [
    {
        question: "Aku merupakan otak dari komputer. Siapakah aku?",
        answers: ["RAM", "CPU", "Monitor", "Keyboard"],
        correct: 1
    },
    {
        question: "Perangkat yang menghubungkan beberapa jaringan adalah?",
        answers: ["Router", "Mouse", "Printer", "Speaker"],
        correct: 0
    },
    {
        question: "Perangkat untuk menghubungkan komputer ke jaringan kabel adalah?",
        answers: ["NIC", "Monitor", "Scanner", "Webcam"],
        correct: 0
    },
    {
        question: "Manakah media transmisi jaringan tanpa kabel?",
        answers: ["UTP", "Fiber Optic", "Wi-Fi", "Coaxial"],
        correct: 2
    }
];

let currentGame = 0;

function showGame() {
    const game = games[currentGame];

    document.getElementById("gameQuestion").textContent = game.question;
    document.getElementById("gameFeedback").textContent = "";

    const gameAnswers = document.getElementById("gameAnswers");
    gameAnswers.innerHTML = "";

    game.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent = answer;

        button.addEventListener("click", () => {
            gameAnswers.querySelectorAll("button").forEach(btn => {
                btn.disabled = true;
            });

            const feedback = document.getElementById("gameFeedback");

            if (index === game.correct) {
                feedback.textContent = "Correct! Jawaban kamu benar.";
                feedback.style.color = "#00ff91";
            } else {
                feedback.textContent =
                    "Belum tepat. Jawaban benar: " + game.answers[game.correct];
                feedback.style.color = "#ff7777";
            }
        });

        gameAnswers.appendChild(button);
    });
}

document.getElementById("newGame").addEventListener("click", () => {
    currentGame = (currentGame + 1) % games.length;
    showGame();
});

showGame();

// GOOGLE FORM ATTENDANCE
// Ganti URL berikut dengan link Google Form resmi.
const googleFormURL = "https://forms.gle/GANTI_LINK_FORM";

const attendanceLink = document.getElementById("attendanceLink");
attendanceLink.href = googleFormURL;

attendanceLink.addEventListener("click", (e) => {
    if (googleFormURL.includes("GANTI_LINK_FORM")) {
        e.preventDefault();
        notify("Masukkan link Google Form absensi terlebih dahulu.");
    }
});

// TILT EFFECT
document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - 0.5) * -8;
        const rotateY = (x / rect.width - 0.5) * 8;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0)";
    });
});

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(
    ".info-card, .learning-card, .dashboard-card, .news-card, .gallery-item"
).forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});

// END
console.log("NETSPACE TKJ Learning Hub initialized successfully.");












