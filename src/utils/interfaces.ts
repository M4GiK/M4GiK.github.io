// ==========================================
// File System Interfaces
// ==========================================

export interface FileNode {
    type: 'file' | 'directory';
    children?: string[];
}

export interface FileSystemStructure {
    [path: string]: FileNode;
}

export interface FileContents {
    [path: string]: string;
}
