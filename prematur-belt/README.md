yan# Prematur Belt — Deployment Guide

## Deploy ke Vercel (Gratis, ~5 menit)

### Cara 1: Drag & Drop (Paling Mudah)
1. Buka **vercel.com** → Sign up / Login (bisa pakai GitHub/Google)
2. Klik **"Add New Project"**
3. Klik **"Upload"** lalu drag folder `prematur-belt` ini ke browser
4. Vercel akan otomatis detect React → klik **Deploy**
5. Selesai! Kamu dapat link seperti `prematur-belt.vercel.app`

### Cara 2: Via GitHub (Recommended untuk update mudah)
1. Upload folder ini ke GitHub (buat repo baru)
2. Buka **vercel.com** → connect ke GitHub
3. Import repo tersebut → klik Deploy
4. Setiap kali kamu push ke GitHub, website otomatis update

---

## Struktur File
```
prematur-belt/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── App.js
│   └── PrematurBelt.jsx   ← komponen utama
├── package.json
└── vercel.json
```

## Jalankan Lokal (Optional)
```bash
npm install
npm start
```
Buka http://localhost:3000
