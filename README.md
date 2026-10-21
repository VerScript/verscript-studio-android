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

## 📥 Installation

Download the latest APK or release package from the [Releases](https://github.com/VerScript/verscript-studio-android/releases) page.

1. Download `VerScript-Studio-Android-v1.0.0.apk` on your Android device.
2. Open the downloaded file and select **Install** (enable "Install from unknown sources" if prompted).
3. Launch **VerScript Studio** and start coding instantly offline!

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
