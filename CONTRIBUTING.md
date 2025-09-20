# CONTRIBUTING.md
# Contributing to Calvine's Portfolio

Thank you for your interest in contributing to this portfolio website! This document provides guidelines and instructions for contributors.

## 🤝 How to Contribute

### Reporting Issues
Before creating an issue, please:
1. Check if the issue already exists
2. Use the issue template (if available)
3. Provide clear reproduction steps
4. Include browser and device information
5. Add screenshots if applicable

### Submitting Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the coding standards below
4. Test your changes thoroughly
5. Update documentation if needed
6. Commit with descriptive messages
7. Push to your fork
8. Create a Pull Request

## 📋 Development Guidelines

### Code Style
- **HTML**: Use semantic HTML5 elements, proper indentation (4 spaces)
- **CSS**: Follow BEM naming convention, use CSS custom properties
- **JavaScript**: Use ES6+ features, avoid `var`, prefer `const`/`let`
- **Comments**: Write clear, concise comments for complex logic

### File Organization
```
portfolio-website/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── script.js      # Main JavaScript
│   └── images/            # Optimized images
├── docs/                  # Documentation
└── deployment/            # Deployment configs
```

### Testing Requirements
Before submitting:
- [ ] Test on Chrome, Firefox, Safari, and Edge
- [ ] Verify responsive design (mobile, tablet, desktop)
- [ ] Check accessibility with screen readers
- [ ] Validate HTML and CSS
- [ ] Run Lighthouse performance test (score > 90)
- [ ] Test dark/light theme toggle
- [ ] Verify all links work correctly

### Performance Guidelines
- Optimize images before adding (use WebP when possible)
- Minimize HTTP requests
- Use efficient CSS selectors
- Avoid render-blocking resources
- Keep JavaScript bundle size < 30KB
- Keep CSS bundle size < 50KB

### Accessibility Standards
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast (4.5:1 minimum)
- Include alt text for images
- Test with screen readers

## 🔧 Development Setup

### Prerequisites
- Modern web browser
- Text editor (VS Code recommended)
- Git
- Node.js (optional, for build tools)

### Local Development
```bash
# Clone the repository
git clone https://github.com/Cdasilver29/portfolio-website.git
cd portfolio-website

# Install development dependencies (optional)
npm install

# Start local server
npm run serve
# OR
python -m http.server 8000
```

### Build Process
```bash
# Run all validations
npm run validate

# Build optimized version
npm run build

# Run performance analysis
npm run lighthouse
```

## 🎨 Design Principles

### Visual Hierarchy
- Use consistent spacing (CSS custom properties)
- Follow typography scale
- Maintain proper contrast ratios
- Use color purposefully

### User Experience
- Prioritize mobile-first design
- Ensure fast loading times
- Provide clear navigation
- Include loading states
- Add helpful error messages

### Brand Consistency
- Maintain color scheme integrity
- Use consistent fonts (Inter family)
- Follow established spacing patterns
- Keep animations subtle and purposeful

## 📝 Commit Message Guidelines

Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no functional changes)
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `build`: Build system changes

Examples:
```
feat(hero): add typewriter animation effect
fix(nav): resolve mobile menu closing issue
docs(readme): update deployment instructions
style(css): improve responsive breakpoints
```

## 🚀 Deployment

### GitHub Pages
The site auto-deploys to GitHub Pages from the `main` branch.

### Manual Deployment
```bash
# Build and deploy
npm run build
npm run deploy
```

## 📞 Getting Help

- 📧 Email: [Calvinedasilver96@gmail.com](mailto:Calvinedasilver96@gmail.com)
- 💼 LinkedIn: [calvine-dasilver-047849188](https://linkedin.com/in/calvine-dasilver-047849188/)
- 🐱 GitHub Issues: [Create an issue](https://github.com/Cdasilver29/portfolio-website/issues)

## 🙏 Recognition

Contributors will be acknowledged in the project documentation. Thank you for helping make this portfolio better!

---

**Remember**: Quality over quantity. Well-tested, thoughtful contributions are always preferred over quick fixes.
