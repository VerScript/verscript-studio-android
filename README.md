# VerScript Studio for Android 📱

Official standalone, offline-first mobile IDE for the **VerScript** programming language on Android devices.

![VerScript Android Banner](https://raw.githubusercontent.com/VerScript/VerScript.github.io/main/assets/banner_preview.png)

---

## ⚡ Features

- **100% Offline Execution Engine**: Bundles the complete VerScript virtual machine with all 17 standard libraries (`Matrix`, `Crypto`, `Stats`, `Math`, `Fs`, `Json`, etc.) directly on your phone. No internet or backend server required.
- **Mobile-First Ergonomics**:
  - Responsive layout optimized for portrait and landscape on smartphones and tablets.
  - Notch & Safe-area inset support for modern edge-to-edge Android devices.
  - Floating Action Button (`▶ Run`) for instant single-tap execution.
- **Above-Keyboard Quick Code Strip**:
  - Insert keywords (`set`, `display`, `?color=`, `loop`, `if`, `load`, `def`) and punctuation symbols (`{}`, `[]`, `()`, `""`, `:`, `!`, `==`, `+`, `-`, `*`, `/`, `Tab`) with one touch.
- **Touch-Friendly Code Editor**:
  - Line numbers, real-time line/char counters, undo/redo, auto-closing brackets, and dynamic font sizing (`A-` / `A+`).
- **Interactive ANSI Terminal**:
  - Truecolor ANSI & 256-color output rendering.
  - Interactive input prompts (`prompt age ?default=25`) with on-screen response bar.
  - Execution duration timer and single-tap copy output to clipboard.
- **Local Project File Manager**:
  - Save unlimited `.vrs` scripts locally in device storage.
  - Import existing `.vrs` files from your device.
  - Export and download scripts anytime.
  - Preloaded templates: Matrix Math, Prime Sieve, Geometry, and Watchdogs.
- **Offline Cheatsheet & Documentation**:
  - Built-in syntax references with one-tap "Insert into Editor" functionality.
- **VS# AI Assistant Tab**:
  - Interactive mobile assistant for syntax assistance, debugging, and code generation.

---

## 📥 How to Run & Install on Android

### Method 1: Instant PWA Install (Recommended — 100% Offline, Zero Parse Errors)
Because Android's package manager requires specific digital signing certificates for raw `.apk` files, the cleanest and fastest way to install on any Android phone is via **PWA (Progressive Web App)**:

1. On your Android phone, open Chrome or Brave and visit **[https://verscript.github.io/IDE/](https://verscript.github.io/IDE/)** (or open the VerScript Studio Web App).
2. Tap the browser menu (**⋮** top right) and select **"Add to Home screen"** or **"Install app"**.
3. Android creates a full-screen standalone application icon on your phone's home screen.
4. Launch it anytime — it runs **100% offline** with full local file persistence, quick coding toolbar, and the complete 17-module VerScript VM!

---

### Method 2: Sideload Compiled Android APK
1. Download the latest compiled debug/release `.apk` from the [Releases](https://github.com/VerScript/verscript-studio-android/releases) page.
2. In Android Settings, ensure **"Install unknown apps"** is allowed for your browser or file manager.
3. Tap the `.apk` file to install.
4. Launch **VerScript Studio** and enjoy offline mobile coding!

---

## 🛠️ Building from Source

```bash
# Clone the repository
git clone https://github.com/VerScript/verscript-studio-android.git
cd verscript-studio-android

# Install web dependencies
npm install

# Build offline web assets
npm run build

# Android build (using Android Studio or Gradle wrapper)
cd android
./gradlew assembleDebug
```

---

## 📄 License

MIT License &copy; 2026 VerScript Project Contributors.
