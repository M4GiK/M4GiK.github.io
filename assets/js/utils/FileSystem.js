// ==========================================
// File System (Singleton Pattern)
// ==========================================
import { Logger } from './Logger.js';
import { fileSystemStructure } from './fileStructure.js';
import { fileContentsData } from './fileContents.js';
export class FileSystem {
    constructor() {
        this.logger = Logger.getInstance();
        this.currentDirectory = '/portfolio';
        this.files = {};
        this.fileContents = {};
        if (FileSystem.instance) {
            return FileSystem.instance;
        }
        FileSystem.instance = this;
        this.initializeFileSystem();
    }
    static getInstance() {
        if (!FileSystem.instance) {
            FileSystem.instance = new FileSystem();
        }
        return FileSystem.instance;
    }
    initializeFileSystem() {
        // Import data from separate files for better organization
        this.files = fileSystemStructure;
        this.fileContents = fileContentsData;
    }
    // Public methods for commands to use
    getCurrentDirectory() {
        return this.currentDirectory;
    }
    setCurrentDirectory(path) {
        const resolvedPath = this.resolvePath(path);
        if (this.files[resolvedPath] && this.files[resolvedPath].type === 'directory') {
            this.currentDirectory = resolvedPath;
            return true;
        }
        return false;
    }
    resolvePath(path) {
        // Ensure path is a string and normalize
        if (typeof path !== 'string') {
            path = String(path || '');
        }
        // Normalize path by removing trailing slashes, except for root
        let normalizedPath = path.replace(/\/+$/, '');
        if (normalizedPath === '')
            normalizedPath = '/';
        if (normalizedPath.startsWith('/')) {
            return normalizedPath;
        }
        if (normalizedPath === '..') {
            const parts = this.currentDirectory.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }
        if (normalizedPath === '.') {
            return this.currentDirectory;
        }
        return this.currentDirectory + (this.currentDirectory === '/' ? '' : '/') + normalizedPath;
    }
    getDirectoryContents(path) {
        const resolvedPath = this.resolvePath(path);
        const directory = this.files[resolvedPath];
        if (!directory || directory.type !== 'directory') {
            return null;
        }
        return directory.children || [];
    }
    getFileInfo(path) {
        const resolvedPath = this.resolvePath(path);
        return this.files[resolvedPath] || null;
    }
    readFile(path) {
        const resolvedPath = this.resolvePath(path);
        return this.fileContents[resolvedPath] || null;
    }
    fileExists(path) {
        const resolvedPath = this.resolvePath(path);
        return this.files[resolvedPath] !== undefined;
    }
    isDirectory(path) {
        const resolvedPath = this.resolvePath(path);
        const file = this.files[resolvedPath];
        return file && file.type === 'directory';
    }
}
//# sourceMappingURL=FileSystem.js.map