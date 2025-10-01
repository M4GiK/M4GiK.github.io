# M4GiK Portfolio Terminal

A modern, interactive terminal-based portfolio website built with Jekyll, TypeScript, and jQuery Terminal. Features a professional command-line interface with smooth animations and responsive design.

![Terminal Preview](https://M4GiK.github.io)

## ✨ Features

### 🎯 Core Features
- **Interactive Terminal Interface** - Full command-line experience
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dynamic Height Calculation** - Automatically adjusts to screen size
- **Smooth Animations** - Professional typing effects and transitions
- **Command Auto-completion** - Intelligent tab completion
- **Command History** - Navigate through previous commands

### 🎨 Design & UX
- **Retro Terminal Aesthetic** - Classic green-on-black terminal look
- **Smooth Animations** - CSS-powered transitions and effects
- **Professional Typography** - Monospace fonts for authentic terminal feel
- **Accessibility** - Keyboard navigation and screen reader support

### 🛠️ Technical Features
- **TypeScript Implementation** - Type-safe, maintainable code
- **Design Patterns** - Command, Strategy, Singleton, Facade patterns
- **Modular Architecture** - Clean separation of concerns
- **Error Handling** - Comprehensive error management
- **Performance Optimized** - Efficient rendering and memory usage

## 🚀 Quick Start

### Prerequisites

#### **Wymagane:**
- **Ruby** 2.7+ (dla Jekyll)
- **Bundler** (`gem install bundler`)
- **Git** (do klonowania repozytorium)

#### **Dla Pełnej Funkcjonalności (TypeScript):**
- **Node.js** 16+ LTS (dla kompilacji TypeScript)
- **npm** 7+ (dołączony do Node.js)

#### **Systemy Operacyjne:**
- **macOS** 10.15+ (zalecane)
- **Windows** 10+ z WSL
- **Linux** Ubuntu 18.04+ / CentOS 7+

#### **Przeglądarki:**
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/M4GiK/M4GiK.github.io.git
   cd M4GiK.github.io
   ```

2. **Install Ruby dependencies:**
   ```bash
   bundle install
   ```

3. **Install Node.js dependencies (optional, for TypeScript development):**
   ```bash
   npm install
   ```

### Running the Application

#### Option 1: Jekyll Only (Recommended)
```bash
bundle exec jekyll serve
```
- Opens at `http://localhost:4000`
- Uses pre-compiled JavaScript
- Fastest way to get started

#### Option 2: With TypeScript Compilation (Development)
```bash
# Terminal 1: Compile TypeScript
npm run build

# Terminal 2: Run Jekyll
bundle exec jekyll serve
```

#### Option 3: Development Mode with Watch
```bash
# Terminal 1: Watch TypeScript changes
npm run dev

# Terminal 2: Run Jekyll with live reload
bundle exec jekyll serve --livereload
```

## 📖 Usage

### Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `help` | Show all available commands | `help` |
| `about` | About M4GiK | `about` |
| `blog` | Latest blog posts | `blog` |
| `calc` | Simple calculator | `calc 2+3` |
| `cat` | Display file contents | `cat README.md` |
| `cd` | Change directory | `cd documents` |
| `clear` | Clear terminal | `clear` |
| `contact` | Contact information | `contact` |
| `date` | Current date/time | `date` |
| `echo` | Echo text back | `echo Hello World` |
| `help` | Show all available commands | `help` |
| `joke` | Random programming joke | `joke` |
| `ls` | List directory contents | `ls [directory]` |
| `projects` | Recent projects | `projects` |
| `pwd` | Print working directory | `pwd` |
| `resume` | Resume download | `resume` |
| `skills` | Technical skills | `skills` |
| `social` | Social media links | `social` |
| `status` | Current status | `status` |
| `tree` | Display directory tree | `tree [directory]` |
| `uptime` | System uptime | `uptime` |
| `whoami` | Current user | `whoami` |

### Terminal Features

- **Tab Completion**: Press `Tab` for intelligent command completion
- **Command History**: Use `↑/↓` arrows to navigate history
- **Auto-scroll**: Terminal automatically scrolls for long output
- **Responsive**: Adapts to different screen sizes
- **Keyboard Shortcuts**: Standard terminal navigation

### File System Navigation

The terminal includes a virtual file system for exploring portfolio content:

#### Directory Structure
```
/ (root)
portfolio
├── 📁 personal/
    ├── 📄 bio.md
    ├── 📄 interests.md
    └── 📄 timeline.md
├── 📁 skillsets/
    ├── 📄 frontend.md
    ├── 📄 backend.md
    ├── 📄 tools.md
    └── 📄 methodologies.md
├── 📁 work-history/
    ├── 📄 experience.md
    ├── 📄 achievements.md
    └── 📄 references.md
├── 📁 code-examples/
    ├── 📁 web-apps/
    │   ├── 📄 portfolio-site.md
    │   ├── 📄 ecommerce-platform.md
    │   └── 📄 dashboard.md
    ├── 📁 mobile-apps/
    │   ├── 📄 ios-app.md
    │   ├── 📄 android-app.md
    │   └── 📄 cross-platform.md
    ├── 📁 scripts/
    │   ├── 📄 automation-tools.md
    │   ├── 📄 build-scripts.md
    │   └── 📄 utilities.md
    └── 📁 libraries/
    │   ├── 📄 open-source.md
    │   ├── 📄 components.md
    │   └── 📄 frameworks.md
```

## 🛠️ Development

### TypeScript Compilation
```bash
# One-time compilation
npm run build

# Watch mode (auto-compile on changes)
npm run dev
```

### Jekyll Development
```bash
# Basic server
bundle exec jekyll serve

# With live reload
bundle exec jekyll serve --livereload

# Custom host/port
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting (if configured)
- **Prettier**: Code formatting (if configured)
- **Design Patterns**: Professional architecture patterns

## 🔧 Troubleshooting

### Common Issues

#### **Problem: `bundle exec jekyll serve` nie działa**
```bash
# Sprawdź wersję Ruby
ruby -v

# Zainstaluj bundler jeśli brakuje
gem install bundler

# Zainstaluj zależności
bundle install

# Jeśli problem z uprawnieniami na macOS
sudo gem install bundler
```

#### **Problem: TypeScript compilation fails**
```bash
# Sprawdź Node.js
node --version
npm --version

# Zainstaluj zależności
npm install

# Wyczyść cache npm jeśli problemy
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### **Problem: Terminal nie ładuje się w przeglądarce**
```bash
# Sprawdź konsolę przeglądarki (F12)
# Szukaj błędów JavaScript

# Sprawdź czy pliki są dostępne
ls -la assets/js/main.js
ls -la assets/css/styles.css

# Wyczyść cache przeglądarki
# Ctrl+Shift+R (Chrome/Firefox)
```

#### **Problem: Komendy nie działają**
```bash
# Sprawdź konsolę przeglądarki
# Szukaj błędów: "Function expects X got Y"

# Upewnij się że używasz poprawnej składni
help                    # Lista komend
ls                      # Lista plików
cd documents           # Zmiana katalogu
cat README.md          # Wyświetlanie pliku
```

### Development Tips

#### **Debugowanie TypeScript:**
```bash
# Kompilacja z source maps
tsc --sourceMap

# Szczegółowe błędy
tsc --noEmit --listFiles
```

#### **Optymalizacja Wydajności:**
```bash
# Minifikacja JavaScript (jeśli potrzebna)
npm install -g uglify-js
uglifyjs assets/js/main.js -o assets/js/main.min.js
```

#### **Testowanie na Różnych Przeglądarkach:**
- Chrome DevTools: Console + Sources
- Firefox DevTools: Console + Debugger
- Safari: Develop menu (włączyć w Preferences)

## 📊 Technical Specifications

### Performance
- **Bundle Size**: ~150KB (nieskompresowane)
- **Load Time**: <2s na szybkim łączu
- **Memory Usage**: <50MB dla typowej sesji
- **CPU Usage**: Minimalne (głównie CSS animations)

### Compatibility
- **ES2017+**: Używane features (async/await, classes)
- **CSS Grid/Flexbox**: Nowoczesne layouty
- **Web APIs**: requestAnimationFrame, localStorage
- **jQuery Terminal**: v2.43+ required

### Security
- **CSP Compatible**: Content Security Policy friendly
- **No External Dependencies**: Wszystko hostowane lokalnie
- **Input Sanitization**: Bezpieczne przetwarzanie komend
- **Error Boundaries**: Zapobieganie crashom aplikacji

## 🎯 Advanced Usage

### Custom Commands
```typescript
// Dodaj nową komendę w src/commands/
export class CustomCommand extends BaseCommand {
    execute(terminal: any, arg?: string): void {
        // Twoja logika
        this.echo(terminal, `Wykonano: ${arg}`);
    }

    getDescription(): string {
        return 'Opis komendy';
    }

    getUsage(): string {
        return 'custom [argument]';
    }
}
```

### File System Extensions
```typescript
// Rozszerz FileSystem w src/utils/FileSystem.ts
addFile(path: string, content: string): void {
    this.fileContents[path] = content;
}

createDirectory(path: string): boolean {
    // Logika tworzenia katalogów
}
```

### Theme Customization
```css
/* assets/css/styles.css */
.terminal {
    --terminal-bg: #031e11;
    --terminal-fg: #9acd32;
    --terminal-accent: #32cd32;
}

/* Dark theme variant */
[data-theme="dark"] .terminal {
    --terminal-bg: #000000;
    --terminal-fg: #00ff00;
}
```

## 🎨 Customization

### Terminal Appearance
Edit `assets/css/styles.css` to customize:
- Colors and themes
- Animation timings
- Font sizes and families
- Layout and spacing

### Commands
Add new commands in `src/commands/`:
1. Create new command class extending `BaseCommand`
2. Implement `execute()`, `getDescription()`, `getUsage()`
3. Register in `TerminalApplication.initializeCommands()`

### Animations
Modify animations in `assets/css/styles.css`:
- `.terminal-typing` - Welcome message animation
- Terminal initialization effects
- Command result animations

## 📱 Browser Support

- **Chrome** 70+
- **Firefox** 65+
- **Safari** 12+
- **Edge** 79+
- **Mobile browsers** with touch support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use established design patterns
- Write clear, documented code
- Test on multiple browsers
- Maintain responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **jQuery Terminal** - Terminal interface library
- **Jekyll** - Static site generator
- **TypeScript** - Type-safe JavaScript
- **Design Patterns** - Professional software architecture

## 📞 Contact

**M4GiK**
- **Email**: michal.szczygiel@wp.pl
- **GitHub**: [https://github.com/M4GiK](https://github.com/M4GiK)
- **LinkedIn**: [https://www.linkedin.com/in/michal-szczygiel](https://www.linkedin.com/in/michal-szczygiel)

---

**⭐ Star this repo if you find it useful!**
