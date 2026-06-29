// --- 1. FITUR MULTI-BAHASA (I18N) & KAMUS ---
const translations = {
    id: {
        title: "zPomodoro Timer",
        start: "Mulai",
        pause: "Jeda",
        resume: "Lanjut",
        reset: "Ulangi",
        customLabel: "Custom",
        setBtn: "Setel",
        alertDone: "Waktu habis!",
        alertError: "Silakan masukkan jumlah menit yang valid (minimal 1).",
        settingsTitle: "Pengaturan",
        languageLabel: "Bahasa"
    },
    en: {
        title: "zPomodoro Focus",
        start: "Start",
        pause: "Pause",
        resume: "Resume",
        reset: "Reset",
        customLabel: "Custom",
        setBtn: "Set",
        alertDone: "Time's up!",
        alertError: "Please enter a valid number of minutes (minimum 1).",
        settingsTitle: "Settings",
        languageLabel: "Language"
    }
};

let currentLang = 'id'; 

// Mengambil elemen HTML
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const langSelect = document.getElementById('lang-select');

// Fungsi untuk menerapkan terjemahan ke seluruh web
function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        
        // Logika aman untuk tombol Start / Resume
        if (key === 'start') {
            if (!isRunning && startBtn.textContent !== translations.id.start && startBtn.textContent !== translations.en.start) {
                // Jika sedang di-jeda, gunakan teks "Resume" / "Lanjut"
                el.textContent = translations[currentLang].resume;
            } else {
                // Jika sedang berhenti total, gunakan teks "Start" / "Mulai"
                el.textContent = translations[currentLang].start;
            }
        } else {
            el.textContent = translations[currentLang][key];
        }
    });
}

// Saat opsi bahasa di Settings diubah
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    applyLanguage();
});


// --- 2. LOGIKA MODAL SETTINGS ---
const settingsBtn = document.getElementById('settings-btn');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const settingsModal = document.getElementById('settings-modal');
const settingsContent = document.getElementById('settings-content');

// Buka modal
settingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('opacity-0', 'pointer-events-none');
    settingsContent.classList.remove('scale-95');
});

// Tutup modal
closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('opacity-0', 'pointer-events-none');
    settingsContent.classList.add('scale-95');
});


// --- 3. LOGIKA TIMER ---
let defaultTime = 25 * 60; 
let timeLeft = defaultTime; 
let timerId = null; 
let isRunning = false; 

const display = document.getElementById('timer-display');
const alarmSound = document.getElementById('alarm-sound');
const preset25 = document.getElementById('preset-25');
const preset5 = document.getElementById('preset-5');
const preset15 = document.getElementById('preset-15');
const customInput = document.getElementById('custom-input');
const applyCustomBtn = document.getElementById('apply-custom-btn');
const presetButtons = document.querySelectorAll('.preset-btn');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    
    // 1. Perbarui teks waktu di dalam halaman web
    display.textContent = `${formattedMinutes}:${formattedSeconds}`;
    
    // 2. Perbarui teks di Tab Halaman Browser secara dinamis
    if (isRunning) {
        // Jika timer berjalan, tampilkan sisa waktu diikuti nama aplikasi (Contoh: "25:00 - Pomodoro")
        document.title = `(${formattedMinutes}:${formattedSeconds}) ${translations[currentLang].title}`;
    } else {
        // Jika timer berhenti/reset, kembalikan ke nama aplikasi normal
        document.title = translations[currentLang].title;
    }
}

function changeDuration(minutes) {
    clearInterval(timerId);
    isRunning = false;
    defaultTime = minutes * 60; 
    timeLeft = defaultTime; 
    updateDisplay();
    
    pauseBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    startBtn.textContent = translations[currentLang].start; // Terapkan teks sesuai bahasa
    
    display.classList.remove('running'); 
}

function setActivePresetButton(activeButton) {
    presetButtons.forEach(btn => btn.classList.remove('active-preset'));
    if (activeButton) {
        activeButton.classList.add('active-preset');
    }
}

preset25.addEventListener('click', () => { changeDuration(25); setActivePresetButton(preset25); });
preset5.addEventListener('click', () => { changeDuration(5); setActivePresetButton(preset5); });
preset15.addEventListener('click', () => { changeDuration(15); setActivePresetButton(preset15); });

applyCustomBtn.addEventListener('click', () => {
    const value = parseInt(customInput.value);
    if (!isNaN(value) && value > 0) {
        changeDuration(value);
        setActivePresetButton(null); 
    } else {
        alert(translations[currentLang].alertError);
    }
});

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        display.classList.add('running');

        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                display.classList.remove('running');
                alarmSound.play();
                alert(translations[currentLang].alertDone);
                resetTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
    pauseBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    startBtn.textContent = translations[currentLang].resume; 
    display.classList.remove('running');
    
    updateDisplay(); // TAMBAHAN: Paksa update agar tanda kurung waktu di tab hilang saat di-jeda
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = defaultTime; 
    updateDisplay(); // Sudah ada, ini akan otomatis mengembalikan judul tab ke normal
    pauseBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    startBtn.textContent = translations[currentLang].start; 
    display.classList.remove('running');
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Jalankan pengaturan awal
applyLanguage();
updateDisplay();