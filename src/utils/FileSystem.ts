// ==========================================
// File System (Singleton Pattern)
// ==========================================

import { Logger } from './Logger.js';

export class FileSystem {
    private static instance: FileSystem;
    private logger = Logger.getInstance();
    private currentDirectory = '/home/m4gik';

    private files: { [key: string]: any } = {};
    private fileContents: { [key: string]: string } = {};

    constructor() {
        if (FileSystem.instance) {
            return FileSystem.instance;
        }
        FileSystem.instance = this;
        this.initializeFileSystem();
    }

    static getInstance(): FileSystem {
        if (!FileSystem.instance) {
            FileSystem.instance = new FileSystem();
        }
        return FileSystem.instance;
    }

    private initializeFileSystem(): void {
        // Initialize the file system structure
        this.files = {
            '/': {
                type: 'directory',
                children: ['home', 'usr', 'bin', 'etc']
            },
            '/home': {
                type: 'directory',
                children: ['m4gik']
            },
            '/home/m4gik': {
                type: 'directory',
                children: ['documents', 'projects', 'README.md', 'resume.pdf', 'about.txt']
            },
            '/home/m4gik/documents': {
                type: 'directory',
                children: ['notes.txt', 'projects.txt']
            },
            '/home/m4gik/projects': {
                type: 'directory',
                children: ['portfolio', 'web-app', 'mobile-app']
            },
            '/usr': {
                type: 'directory',
                children: ['bin', 'share']
            },
            '/bin': {
                type: 'directory',
                children: ['ls', 'cat', 'cd', 'pwd']
            },
            '/etc': {
                type: 'directory',
                children: ['config.txt', 'settings.json']
            }
        };

        // File contents
        this.fileContents = {
            '/home/m4gik/README.md': `# M4GiK - Software Developer

Welcome to my interactive portfolio terminal!

## About Me
I'm a passionate software developer specializing in:
- Full-stack web development
- TypeScript/JavaScript
- React, Node.js, Python
- DevOps and cloud technologies

## Skills
- **Frontend**: React, Vue.js, HTML5, CSS3, TypeScript
- **Backend**: Node.js, Python, PostgreSQL, MongoDB
- **DevOps**: Docker, AWS, CI/CD, Linux
- **Tools**: Git, VS Code, Jest, Webpack

## Contact
- Email: contact@m4gik.dev
- GitHub: https://github.com/M4GiK
- LinkedIn: https://linkedin.com/in/m4gik

Feel free to explore my portfolio using the terminal commands!
`,

            '/home/m4gik/resume.pdf': `[This would be a PDF file - Download available at: https://drive.google.com/file/d/resume-m4gik.pdf]

M4GiK - Software Developer Resume

EXPERIENCE:
- Senior Full-Stack Developer at TechCorp (2022-Present)
- Frontend Developer at StartupXYZ (2020-2022)
- Junior Developer at DevAgency (2019-2020)

SKILLS:
- Languages: TypeScript, JavaScript, Python, Java
- Frameworks: React, Node.js, Express, Django
- Databases: PostgreSQL, MongoDB, Redis
- Tools: Docker, AWS, Git, Jenkins

EDUCATION:
- Computer Science, University of Technology (2015-2019)

CONTACT:
- Email: contact@m4gik.dev
- Phone: +1 (555) 123-4567
- Location: San Francisco, CA
`,

            '/home/m4gik/about.txt': `Hi there! 👋

I'm M4GiK, a passionate software developer with over 4 years of experience
in creating innovative web applications and solutions.

My journey in tech started with a curiosity about how websites work, and
it has evolved into a career focused on:
• Building scalable web applications
• Creating exceptional user experiences
• Solving complex technical challenges
• Mentoring junior developers

When I'm not coding, you can find me:
• Contributing to open source projects
• Writing technical blog posts
• Speaking at tech meetups
• Exploring new technologies

I'm always excited to take on new challenges and collaborate on
interesting projects. Feel free to reach out!

Best regards,
M4GiK
`,

            '/home/m4gik/documents/notes.txt': `Personal Notes - M4GiK

TODO:
- [ ] Finish portfolio terminal project
- [ ] Update resume with latest projects
- [ ] Prepare for upcoming tech conference
- [ ] Review pull requests on GitHub

Ideas for future projects:
- AI-powered code review tool
- Real-time collaborative coding platform
- Personal finance management app
- Open source contribution tracker

Learning goals:
- Master React Server Components
- Deep dive into WebAssembly
- Improve system design skills
- Learn advanced DevOps practices

Remember: "Code is poetry written in logic." 🚀
`,

            '/home/m4gik/documents/projects.txt': `Current Projects - M4GiK

1. PORTFOLIO TERMINAL (Current)
   - Interactive terminal-based portfolio
   - Built with Jekyll, TypeScript, jQuery Terminal
   - Features: File system navigation, command system
   - Status: In development

2. E-COMMERCE PLATFORM
   - Full-stack e-commerce solution
   - Tech: React, Node.js, PostgreSQL, Stripe
   - Features: User auth, payment processing, admin panel
   - Status: MVP completed

3. AI CHATBOT
   - Intelligent conversational AI
   - Tech: Python, TensorFlow, FastAPI
   - Features: Natural language processing, context awareness
   - Status: Prototype phase

4. DEVOPS AUTOMATION
   - CI/CD pipeline automation
   - Tech: Docker, Jenkins, AWS, Terraform
   - Features: Auto-deployment, monitoring, scaling
   - Status: Production ready

Future Projects:
- Real-time collaboration tool
- Personal knowledge management system
- Open source package for terminal UIs
`,

            '/etc/config.txt': `# System Configuration File
# M4GiK Terminal Portfolio v1.0

[SYSTEM]
version=1.0.0
environment=production
debug=false

[TERMINAL]
theme=dark
font_family=monospace
font_size=14px
max_history=100

[USER]
name=M4GiK
email=contact@m4gik.dev
role=Software Developer

[FEATURES]
animations=true
auto_complete=true
file_system=true
responsive=true
`,

            '/etc/settings.json': `{
  "application": {
    "name": "M4GiK Terminal Portfolio",
    "version": "1.0.0",
    "author": "M4GiK"
  },
  "terminal": {
    "theme": "dark",
    "colors": {
      "background": "#031e11",
      "foreground": "#9acd32",
      "accent": "#32cd32"
    },
    "font": {
      "family": "monospace",
      "size": "14px"
    }
  },
  "features": {
    "animations": true,
    "autoComplete": true,
    "fileSystem": true,
    "responsive": true,
    "history": true
  },
  "commands": {
    "available": [
      "help", "about", "skills", "projects", "contact",
      "social", "resume", "blog", "status", "echo",
      "calc", "joke", "date", "whoami", "ls", "pwd",
      "cat", "cd", "clear", "uptime"
    ]
  }
}`
        };
    }

    getCurrentDirectory(): string {
        return this.currentDirectory;
    }

    setCurrentDirectory(path: string): boolean {
        if (this.files[path] && this.files[path].type === 'directory') {
            this.currentDirectory = path;
            return true;
        }
        return false;
    }

    resolvePath(path: string): string {
        if (path.startsWith('/')) {
            return path;
        }

        if (path === '..') {
            const parts = this.currentDirectory.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }

        if (path === '.') {
            return this.currentDirectory;
        }

        return this.currentDirectory + (this.currentDirectory === '/' ? '' : '/') + path;
    }

    getDirectoryContents(path: string): string[] | null {
        const resolvedPath = this.resolvePath(path);
        const directory = this.files[resolvedPath];

        if (!directory || directory.type !== 'directory') {
            return null;
        }

        return directory.children || [];
    }

    getFileInfo(path: string): any {
        const resolvedPath = this.resolvePath(path);
        return this.files[resolvedPath] || null;
    }

    readFile(path: string): string | null {
        const resolvedPath = this.resolvePath(path);
        return this.fileContents[resolvedPath] || null;
    }

    fileExists(path: string): boolean {
        const resolvedPath = this.resolvePath(path);
        return this.files[resolvedPath] !== undefined;
    }

    isDirectory(path: string): boolean {
        const resolvedPath = this.resolvePath(path);
        const file = this.files[resolvedPath];
        return file && file.type === 'directory';
    }
}
