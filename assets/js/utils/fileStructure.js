// ==========================================
// File System Structure
// ==========================================
export const fileSystemStructure = {
    '/': {
        type: 'directory',
        children: ['portfolio', 'documents', 'projects', 'tools', 'commands']
    },
    '/portfolio': {
        type: 'directory',
        children: ['personal', 'skillsets', 'work-history', 'code-examples', 'writing']
    },
    '/portfolio/personal': {
        type: 'directory',
        children: ['bio.md', 'interests.md', 'timeline.md']
    },
    '/portfolio/personal/bio.md': {
        type: 'file'
    },
    '/portfolio/personal/interests.md': {
        type: 'file'
    },
    '/portfolio/personal/timeline.md': {
        type: 'file'
    },
    '/portfolio/skillsets': {
        type: 'directory',
        children: ['frontend.md', 'backend.md', 'tools.md', 'methodologies.md']
    },
    '/portfolio/skillsets/frontend.md': {
        type: 'file'
    },
    '/portfolio/skillsets/backend.md': {
        type: 'file'
    },
    '/portfolio/skillsets/tools.md': {
        type: 'file'
    },
    '/portfolio/skillsets/methodologies.md': {
        type: 'file'
    },
    '/portfolio/work-history': {
        type: 'directory',
        children: ['experience.md', 'achievements.md', 'references.md']
    },
    '/portfolio/work-history/experience.md': {
        type: 'file'
    },
    '/portfolio/work-history/achievements.md': {
        type: 'file'
    },
    '/portfolio/work-history/references.md': {
        type: 'file'
    },
    '/portfolio/code-examples': {
        type: 'directory',
        children: ['web-apps', 'mobile-apps', 'scripts', 'libraries']
    },
    '/portfolio/code-examples/web-apps': {
        type: 'directory',
        children: ['portfolio-site.md', 'ecommerce-platform.md', 'dashboard.md']
    },
    '/portfolio/code-examples/web-apps/portfolio-site.md': {
        type: 'file'
    },
    '/portfolio/code-examples/web-apps/ecommerce-platform.md': {
        type: 'file'
    },
    '/portfolio/code-examples/web-apps/dashboard.md': {
        type: 'file'
    },
    '/portfolio/code-examples/mobile-apps': {
        type: 'directory',
        children: ['ios-app.md', 'android-app.md', 'cross-platform.md']
    },
    '/portfolio/code-examples/mobile-apps/ios-app.md': {
        type: 'file'
    },
    '/portfolio/code-examples/mobile-apps/android-app.md': {
        type: 'file'
    },
    '/portfolio/code-examples/mobile-apps/cross-platform.md': {
        type: 'file'
    },
    '/portfolio/code-examples/scripts': {
        type: 'directory',
        children: ['automation-tools.md', 'build-scripts.md', 'utilities.md']
    },
    '/portfolio/code-examples/scripts/automation-tools.md': {
        type: 'file'
    },
    '/portfolio/code-examples/scripts/build-scripts.md': {
        type: 'file'
    },
    '/portfolio/code-examples/scripts/utilities.md': {
        type: 'file'
    },
    '/portfolio/code-examples/libraries': {
        type: 'directory',
        children: ['open-source.md', 'components.md', 'frameworks.md']
    },
    '/portfolio/code-examples/libraries/open-source.md': {
        type: 'file'
    },
    '/portfolio/code-examples/libraries/components.md': {
        type: 'file'
    },
    '/portfolio/code-examples/libraries/frameworks.md': {
        type: 'file'
    },
    '/portfolio/writing/blog-posts/coding-tips.md': {
        type: 'file'
    },
    '/portfolio/writing/blog-posts/best-practices.md': {
        type: 'file'
    },
    '/portfolio/writing/blog-posts/career-advice.md': {
        type: 'file'
    },
    '/portfolio/writing/tutorials/typescript-guide.md': {
        type: 'file'
    },
    '/portfolio/writing/tutorials/react-patterns.md': {
        type: 'file'
    },
    '/portfolio/writing/tutorials/devops-basics.md': {
        type: 'file'
    },
    '/portfolio/writing/tech-talks/conference-talks.md': {
        type: 'file'
    },
    '/portfolio/writing/tech-talks/meetups.md': {
        type: 'file'
    },
    '/portfolio/writing/tech-talks/workshops.md': {
        type: 'file'
    },
    '/documents/resume/m4gik-resume.pdf': {
        type: 'file'
    },
    '/documents/resume/skills-matrix.md': {
        type: 'file'
    },
    '/documents/resume/achievement-timeline.md': {
        type: 'file'
    },
    '/documents/certificates/aws-certifications/aws-developer-associate.pdf': {
        type: 'file'
    },
    '/documents/certificates/aws-certifications/aws-solutions-architect.pdf': {
        type: 'file'
    },
    '/documents/certificates/programming-certificates/typescript-certificate.pdf': {
        type: 'file'
    },
    '/documents/certificates/programming-certificates/react-specialization.pdf': {
        type: 'file'
    },
    '/documents/certificates/project-certifications': {
        type: 'directory',
        children: []
    },
    '/documents/legal/terms-of-service.md': {
        type: 'file'
    },
    '/documents/legal/privacy-policy.md': {
        type: 'file'
    },
    '/projects/projects/legacy-apps/v1-portfolio.md': {
        type: 'file'
    },
    '/projects/archived/legacy-apps/old-website.md': {
        type: 'file'
    },
    '/projects/collaborations/open-source.md': {
        type: 'file'
    },
    '/projects/collaborations/team-projects.md': {
        type: 'file'
    },
    '/projects/experiments/prototypes.md': {
        type: 'file'
    },
    '/projects/experiments/proof-of-concepts.md': {
        type: 'file'
    },
    '/tools/bin/helpers': {
        type: 'directory',
        children: []
    },
    '/tools/bin/utilities': {
        type: 'directory',
        children: []
    },
    '/tools/bin/scripts': {
        type: 'directory',
        children: []
    },
    '/tools/config/editor-settings.md': {
        type: 'file'
    },
    '/tools/config/environment-setup.md': {
        type: 'file'
    },
    '/tools/notes/tech-learning.md': {
        type: 'file'
    },
    '/tools/notes/project-ideas.md': {
        type: 'file'
    },
    '/tools/notes/bookmarks.md': {
        type: 'file'
    },
    '/tools/templates/project-template.md': {
        type: 'file'
    },
    '/tools/templates/readme-template.md': {
        type: 'file'
    },
    '/commands/help.md': {
        type: 'file'
    },
    '/commands/cd.md': {
        type: 'file'
    },
    '/commands/ls.md': {
        type: 'file'
    },
    '/commands/cat.md': {
        type: 'file'
    },
    '/commands/pwd.md': {
        type: 'file'
    },
    '/commands/echo.md': {
        type: 'file'
    },
    '/commands/calc.md': {
        type: 'file'
    },
    '/commands/clear.md': {
        type: 'file'
    },
    '/commands/whoami.md': {
        type: 'file'
    },
    '/commands/date.md': {
        type: 'file'
    },
    '/commands/uptime.md': {
        type: 'file'
    },
    '/commands/tree.md': {
        type: 'file'
    },
    '/commands/skills.md': {
        type: 'file'
    },
    '/commands/projects.md': {
        type: 'file'
    },
    '/commands/about.md': {
        type: 'file'
    },
    '/commands/contact.md': {
        type: 'file'
    },
    '/commands/social.md': {
        type: 'file'
    },
    '/commands/resume.md': {
        type: 'file'
    },
    '/commands/blog.md': {
        type: 'file'
    },
    '/commands/status.md': {
        type: 'file'
    },
    '/projects/current/portfolio-terminal.md': {
        type: 'file'
    },
    '/projects/current/ai-assistant.md': {
        type: 'file'
    },
    '/projects/current/ecommerce-platform.md': {
        type: 'file'
    }
};
//# sourceMappingURL=fileStructure.js.map