# 🍅 Live Minimalist Pomodoro Timer

Aplikasi Web Pomodoro Timer yang dirancang dengan estetika minimalis modern, profesional, dan interaktif. Dilengkapi dengan motif latar belakang *Black Grid*, optimasi tipografi jam digital, manajemen menu pengaturan, serta integrasi multi-bahasa.

## ✨ Fitur Utama

- **Estetika Minimalis & Profesional:** Menggunakan palet warna monokrom (*Zinc-based Dark Mode*) yang nyaman di mata untuk fokus jangka panjang.
- **Efek Visual Hidup (Live UI):** Efek pendaran cahaya (*pulse-glow*) halus pada angka jam saat waktu berjalan dan mikro-animasi elastis pada setiap tombol.
- **Latar Belakang Black Grid:** Motif grid futuristik menggunakan CSS *linear-gradient* murni tanpa aset gambar eksternal.
- **Dinamis Tab Halaman:** Sisa waktu hitungan mundur akan muncul langsung di judul tab browser Anda (contoh: `(24:59) Ruang Fokus`).
- **Menu Pengaturan (Settings Modal):** Antarmuka pop-up terisolasi untuk mengonfigurasi preferensi aplikasi secara rapi.
- **Dukungan Multi-Bahasa:** Opsi beralih bahasa antara **Bahasa Indonesia** dan **English** langsung melalui menu pengaturan tanpa perlu memuat ulang halaman (*zero reload*).
- **Kustomisasi Waktu Bebas:** Selain tombol cepat (*Preset 25m, 5m, 15m*), pengguna dapat menentukan durasi fokus mereka sendiri secara fleksibel pada kolom *Custom*.

## 📁 Struktur Direktori Project

```text
├── index.html          # Struktur kerangka aplikasi & komponen Modal Settings
├── style.css           # Konfigurasi Font (Orbitron & Inter) dan core CSS Black Grid
├── script.js           # Logika Hitung Mundur, Manajemen State UI, & Sistem Penerjemah (i18n)
└── assets/
    └── alarm.mp3       # Berkas audio efek suara ketika waktu fokus berakhir
