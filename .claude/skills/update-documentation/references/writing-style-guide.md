# Eneris Documentation Writing Style Guide

## Table of Contents
1. [Tone and Voice](#tone-and-voice)
2. [Formatting Conventions](#formatting-conventions)
3. [Image Standards](#image-standards)
4. [MDX Patterns](#mdx-patterns)
5. [Content Structure](#content-structure)

## Tone and Voice

- Professional yet approachable — accessible to non-technical users
- Action-oriented instructions with step-by-step guidance
- Explanatory paragraphs before diving into steps ("what" and "why" first)
- Encouraging language ("You're in control", "No problem")
- Avoid jargon; explain technical concepts in plain language

## Formatting Conventions

### Headings
- **H1 (#)**: Main page title only (one per file)
- **H2 (##)**: Major sections
- **H3 (###)**: Subsections
- **H4 (####)**: Rare, further nesting only

### Text Formatting
- **Bold** for UI elements, feature names, and key concepts
- Italic used sparingly
- Numbered lists for sequential steps
- Bullet lists for non-sequential information

### Admonitions
```
:::info
Informational callouts
:::

:::tip
Helpful tips
:::

:::warning
Important warnings
:::
```

## Image Standards

### Dimensions
- Mobile screenshots: `maxWidth: '250px'`
- Web/desktop screenshots: `maxWidth: '800px'`
- All images: `width: '100%'` for responsiveness

### Formats
- **WebP** (primary): All final documentation images
- **GIF**: Animations showing interactions
- **PNG**: Source/original images before compression

### Alt Text
- Always required and descriptive
- Clear, imperative descriptions (e.g., "Create new inspection using plus button")
- Never use generic "screenshot" text

### Image Location
- Store in `docs/04-concepts/img/` (or equivalent section img/ folder)
- Follow existing naming convention: `feature-name-action.webp`

### Spotlight Settings (matching Shottr defaults)
- Border color: `#F05539`
- Border width: 6px
- Darkness level: 3 (out of 9)
- Corner radius: 4px

## MDX Patterns

### Image Import Pattern
```jsx
import FeatureScreenshot from './img/feature-screenshot.webp';

<img src={FeatureScreenshot} style={{ maxWidth: '250px', width: '100%' }} alt="Descriptive alt text" />
```

### Multiple Images
Import all at the top of the file, then use throughout:
```jsx
import StepOne from './img/step-one.webp';
import StepTwo from './img/step-two.webp';
import StepThree from './img/step-three.webp';
```

## Content Structure

### Concept Pages
- Opening paragraph explaining the concept
- Key features/capabilities
- Step-by-step usage instructions with screenshots
- Cross-references to related concepts

### Getting Started Pages
- Tutorial-style with numbered steps
- Clear prerequisites and outcomes
- Links to next logical steps

### FAQ/Support Pages
- HTML `<details>/<summary>` for expandable Q&A
- Problem-solution format

### File Naming
- Numbered prefixes for sidebar ordering: `01-feature-name.mdx`
- Lowercase, hyphenated names
- Use `.mdx` for files with image imports or JSX components
