# RHC Solutions Design System

## Color Palette (Cyber Theme)
- **Primary Colors**:
  - Cyber Green: #00FF41
  - Cyber Cyan: #00D9FF
  - Cyber Blue: #0066FF
  - Cyber Purple: #9933FF

- **Background Colors**:
  - Dark: #0A0E27
  - Dark Lighter: #1A1F3A
  - Gradient: linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%)

- **Text Colors**:
  - Primary: #FFFFFF
  - Secondary: #A0AEC0
  - Muted: #718096

## Typography
- **Headings**: Bold, uppercase for emphasis
- **Body**: Readable, good contrast
- **Mono**: For technical/code elements

## Layout Patterns

### 1. **List + Filter + Detail Modal**
Used for: Careers, Case Studies, Services, Partners
- Horizontal scrollable filters/search at top
- Clean list items with key info
- Click to open detail modal
- Hover effects for interactivity

### 2. **Card-Based Grid**
Used for: Features, Services, Capabilities
- Gradient borders or top borders
- Icon + Title + Description
- Hover animations (lift effect)
- Color-coded by category

### 3. **Hero Section**
- Animated background orbs
- Gradient text for emphasis
- Clear CTA buttons
- Motion animations on load

### 4. **Feature Sections**
- Alternating left/right layouts
- Icon/illustration on one side
- Content on other side
- Gradient accents

## Components

### Buttons
- **Primary**: btn-primary (gradient background)
- **Secondary**: btn-secondary (outline/dark)
- **CTA**: btn-cta (prominent, animated)

### Cards
- **card-cyber**: Dark background with borders
- **card-dark**: Darker variant
- Border colors: Use gradient colors as left/top border
- Hover: Lift effect (y-5px), glow shadow

### Animations
- Fade in on scroll: opacity 0 → 1
- Slide in: translateY 20px → 0
- Hover: scale/lift effects
- Smooth transitions: 0.3-0.6s duration

## Common Patterns

1. **Section Padding**: section-padding class (consistent spacing)
2. **Container**: container-custom (max-width, centered)
3. **Grid**: grid-cols-1, md:grid-cols-2, lg:grid-cols-3
4. **Gradients**: Use color combinations like `from-cyber-blue to-cyber-cyan`
5. **Spacing**: Consistent use of tailwind spacing (mb-6, gap-8, etc.)

## Page Structure

All pages follow:
1. Hero Section (with gradient background)
2. Main Content (card-based or list-based)
3. CTA Section (gradient background, call-to-action)
4. Consistent header/footer

