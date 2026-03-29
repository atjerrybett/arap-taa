# Arap Taa Family Legacy - Web Application

A modern, scalable family tree web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Preserves and celebrates the heritage of the Arap Taa family across generations.

## 🌳 Features

### Core Functionality
- **Interactive Family Tree** - Visualize the complete family structure with expandable branches
- **People Directory** - Browse all family members with rich profiles
- **Path Highlighting** - Trace direct lineage between any two family members
- **Global Search** - Find family members by name across the entire tree
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices

### Data Structure
- **Three Houses** - House of Bot Evaline (main), House of Bot Jonah, and House of Bot Samson
- **Five Generations** - From Arap Taa (patriarch) through to current generation
- **25+ Family Members** - Comprehensive initial dataset with room for expansion
- **Rich Profiles** - Each person has name, vital dates, bio, occupation, and relationships

### User Interface
- **Warm, Elegant Design** - Earth tones with amber, sage green accents
- **Dark Mode Support** - Full dark theme for comfortable viewing
- **Modal Profiles** - Click any person to view detailed information
- **Smooth Animations** - Beautiful transitions and interactive feedback
- **Accessibility** - Semantic HTML and keyboard navigation support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to project directory
cd arap-taa-family-legacy

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
arap-taa/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage with hero & tree preview
│   │   ├── layout.tsx            # Root layout with navigation & footer
│   │   ├── globals.css           # Global styles & custom themes
│   │   ├── error.tsx             # Error page
│   │   ├── not-found.tsx         # 404 page
│   │   ├── sitemap.ts            # SEO sitemap
│   │   ├── robots.ts             # SEO robots.txt
│   │   ├── tree/
│   │   │   ├── page.tsx          # Full family tree page
│   │   │   └── layout.tsx        # Tree page layout & metadata
│   │   ├── people/
│   │   │   ├── page.tsx          # People directory with search/filters
│   │   │   └── layout.tsx        # People page layout & metadata
│   │   └── about/
│   │       ├── page.tsx          # About page with FAQ
│   │       └── layout.tsx        # About page layout & metadata
│   │
│   ├── components/
│   │   ├── Navigation.tsx        # Top navigation bar
│   │   ├── Footer.tsx            # Footer component
│   │   ├── SearchModal.tsx       # Global search modal
│   │   ├── ProfileModal.tsx      # Person profile modal
│   │   ├── PersonNode.tsx        # Individual person node component
│   │   ├── FamilyTree.tsx        # Tree rendering logic
│   │   ├── HomeTreeView.tsx      # Homepage tree visualization
│   │   ├── Stats.tsx             # Statistics component
│   │   ├── FAQ.tsx               # FAQ accordion
│   │   └── index.ts              # Component exports
│   │
│   ├── data/
│   │   └── familyData.ts         # Complete family dataset & helper functions
│   │
│   ├── store/
│   │   └── familyStore.ts        # Global state management (Zustand)
│   │
│   ├── hooks/
│   │   └── useFamily.ts          # Custom React hooks for family relations
│   │
│   ├── utils/
│   │   └── treeUtils.ts          # Tree traversal & utility functions
│   │
│   └── types/
│       └── index.ts              # TypeScript interfaces & types
│
├── public/                        # Static assets
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── next.config.ts                 # Next.js configuration
└── README.md                       # This file
```

## 🎨 Design System

### Color Palette
- **Earth Tones**: Primary background and text colors
- **Amber**: Primary accent for CTAs and highlights
- **Sage Green**: Secondary accent for balance
- **House Colors**:
  - Bot Evaline: Amber (#d97706)
  - Bot Jonah: Cyan (#0891b2)
  - Bot Samson: Violet (#7c3aed)

### Typography
- **Sans Serif**: Inter for body text and UI
- **Serif**: Georgia for special emphasis

### Components
- Custom Tailwind components using `@apply`
- Lucide icons for consistent iconography
- Smooth animations with Framer Motion
- Responsive grid system

## 📊 Family Data

### Current Structure

**Patriarch:**
- Arap Taa (Great-Grandfather)

**Three Wives/Houses:**
1. **House of Bot Evaline** (5 generations documented)
   - Children: Elizabeth, Samuel Nyolei, Daniel Nyolei
   - Extensive lineage through Elizabeth to Malcolm

2. **House of Bot Jonah** (placeholder, expandable)
3. **House of Bot Samson** (placeholder, expandable)

### Adding New Family Members

Edit `src/data/familyData.ts`:

```typescript
// Add person
export const people: Record<string, Person> = {
  'person-id': {
    id: 'person-id',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    birthDate: '1990-01-15',
    house: 'Bot Evaline',
    bio: 'Short biography...',
  },
  // ... existing entries
};

// Add marriage
export const marriages: Marriage[] = [
  {
    id: 'marriage-id',
    spouse1Id: 'person-id-1',
    spouse2Id: 'person-id-2',
    isActive: true,
    childrenIds: ['child-id-1', 'child-id-2'],
  },
  // ... existing entries
];

// Add parent-child relationship
export const parentChildRelations: ParentChild[] = [
  { parentId: 'parent-id', childId: 'child-id', relationship: 'biological' },
  // ... existing entries
];
```

## 🔧 Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Utilities**: clsx
- **Linting**: ESLint

## 📋 Pages & Routes

| Route | Purpose | Features |
|-------|---------|----------|
| `/` | Homepage | Hero section, tree preview, stats |
| `/tree` | Full Family Tree | Interactive tree, expandable houses, path highlight |
| `/people` | People Directory | Search, filters by house/gender, person cards |
| `/about` | About Legacy | Project info, features, FAQ, mission |
| `/api/*` | Future API routes | Reserved for backend expansion |

## 🎯 Key Features Explained

### Path Highlighting
Traces the direct lineage from Arap Taa to Malcolm:
```
Arap Taa → Bot Evaline → Elizabeth → Betsy → Valerie → Malcolm
```

### Tree Expansion
- Default: Bot Evaline house expanded, others collapsed
- Click "Explore House" to expand other branches
- Click expand/collapse buttons on each person node

### Search & Discovery
- Global search bar (top navigation)
- Directory filtering by house and gender
- Quick links to view full profiles

### Responsive Behavior
- Desktop: Multi-column layout, hover effects
- Tablet: Adjusted spacing, two-column grids
- Mobile: Single-column stacked layout

## 🔮 Future Enhancements

- [ ] Add photos for each person (with placeholders)
- [ ] Family stories and memories section
- [ ] Timeline view of family events
- [ ] In-laws and extended family support
- [ ] Admin panel for adding/editing family members
- [ ] Database integration for data persistence
- [ ] Export family tree as PDF
- [ ] Share specific family branches
- [ ] Multi-language support
- [ ] PWA offline support
- [ ] User authentication for private notes
- [ ] Advanced genealogy features

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- No external analytics by default
- Client-side rendering for privacy
- No personal information stored externally
- Future: Admin controls for visibility settings

## 📞 Contact & Contributing

This is a family legacy project. For additions or corrections, contact the family archivists.

## 📄 License

Created for and by the Arap Taa family.

---

**Built with ❤️ by Jerry for the Arap Taa Family Legacy**
