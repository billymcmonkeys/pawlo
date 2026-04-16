<div align="center">

# 🐾 Pawlo

### AI-Powered Lost Pet Reunification Platform

**Reunite. Rescue. Repeat.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://github.com/billymcmonkeys/pawlo) • [Report Bug](https://github.com/billymcmonkeys/pawlo/issues) • [Request Feature](https://github.com/billymcmonkeys/pawlo/issues)

</div>

---

## 📖 About This Project

**Pawlo** is a mobile-first web application designed to help reunite lost pets with their owners through AI-powered photo matching and community collaboration. Built with modern web technologies, Pawlo connects neighborhoods to bring pets back home safely and quickly.

### 🎨 Created by MC Monkeys

This project was built by **[MC Monkeys](https://mcmonkeys.up.railway.app/)** — where humans and AI agents collaborate to build real-world digital solutions. MC Monkeys is the team behind **Mission Control for Claude Code**, a system that makes AI agent work visible in real time.

**Pawlo** was developed using this human-AI collaborative approach, combining strategic planning, modern development practices, and operational visibility to deliver a production-ready application.

**Learn more:** [https://mcmonkeys.up.railway.app/](https://mcmonkeys.up.railway.app/)

---

## ✨ Features

- 🔍 **AI Photo Matching** — Upload a photo of a found pet and get instant matches with registered pets
- 📱 **Mobile-First Design** — Optimized for on-the-go pet spotting and reporting
- 🐕 **Pet Registration** — Easy 4-step process to register your pet with photos and details
- 🏘️ **Neighborhood Network** — Connect with your community to help lost pets
- 🎯 **Smart Filtering** — Search by breed, size, color, and location
- ⚡ **Real-Time Status** — Track pets as Lost, Safe, or Reunited
- 📊 **Success Stories** — View reunited pets and community impact statistics
- 🎨 **Beautiful UI** — Modern, accessible design with smooth animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **[Next.js 14](https://nextjs.org/)** | React framework with App Router for optimal performance |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe development and better developer experience |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first styling with custom design tokens |
| **[Lucide React](https://lucide.dev/)** | Beautiful, consistent icons |
| **[Vercel](https://vercel.com/)** | Deployment platform (recommended) |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.17 or higher)
- **npm** (v9 or higher) or **yarn** / **pnpm**
- **Git** for version control

---

## 🚀 Installation

Follow these steps to get Pawlo running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/billymcmonkeys/pawlo.git
cd pawlo
```

### 2. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

The page will automatically reload when you make changes to the code.

---

## 📱 How to Use

### For Pet Owners

1. **Register Your Pet**
   - Navigate to the registration flow (`/register`)
   - Upload 3-5 clear photos of your pet
   - Fill in details (name, breed, size, color, distinctive features)
   - Add your contact information
   - Review and submit

2. **Mark as Lost** (if needed)
   - Go to your pet's profile
   - Update status to "Lost"
   - Your neighborhood will be notified automatically

3. **Reunite**
   - When your pet is found, update status to "Reunited"
   - Share your success story!

### For Community Members

1. **Found a Pet?**
   - Go to `/found/upload`
   - Upload a photo of the found pet
   - Add location details
   - Submit for AI matching

2. **Review Matches**
   - View similarity-ranked results
   - Contact the most likely owner
   - Help reunite pets with their families

---

## 📂 Project Structure

```
pawlo/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── how-it-works/         # Information pages
│   ├── register/             # Pet registration flow
│   │   ├── step-1/           # Photo upload
│   │   ├── step-2/           # Pet details
│   │   ├── step-3/           # Owner info
│   │   └── review/           # Final review
│   ├── found/                # Found pet flow
│   │   ├── upload/           # Upload found pet photo
│   │   ├── processing/       # AI matching process
│   │   ├── results/          # Match results
│   │   └── match/[id]/       # Individual match details
│   └── pets/[id]/            # Pet profile pages
├── components/               # Reusable React components
│   ├── Navbar.tsx
│   ├── PetCard.tsx
│   ├── StatusBadge.tsx
│   ├── HeroCarousel.tsx
│   └── ...
├── data/                     # Mock data (Phase 0)
│   ├── pets.ts               # Sample pets data
│   └── mock-results.ts       # Sample match results
├── lib/                      # Utility functions
│   ├── pets.ts               # Pet data helpers
│   ├── matches.ts            # Matching logic
│   └── store.ts              # State management
├── docs/                     # Documentation
│   ├── architecture.md       # Technical architecture
│   ├── wireframe-*.md        # Design wireframes
│   └── ...
├── public/                   # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind + design tokens
└── tsconfig.json             # TypeScript configuration
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript type checking |

---

## 🗺️ Roadmap

### Phase 0 (Current) — Frontend Prototype
- ✅ Responsive UI/UX
- ✅ Mock data structure
- ✅ Complete user flows
- ✅ Design system implementation

### Phase 1 — Backend Integration
- ⏳ Database setup (Prisma + PostgreSQL)
- ⏳ REST API endpoints
- ⏳ Real data persistence
- ⏳ User authentication

### Phase 2 — AI Integration
- ⏳ Real AI photo matching API
- ⏳ Improved matching algorithms
- ⏳ Confidence scoring

### Phase 3 — Advanced Features
- ⏳ Push notifications
- ⏳ Geolocation services
- ⏳ In-app messaging
- ⏳ Social sharing
- ⏳ Multi-language support

---

## 🌟 Key Features in Detail

### AI Photo Matching
Upload a photo and our AI compares it against registered pets, ranking matches by similarity score based on visual features like:
- Breed characteristics
- Coat color and patterns
- Size and body structure
- Distinctive markings

### Multi-Step Registration
A user-friendly 4-step wizard guides pet owners through registration:
1. **Photo Upload** — Multiple angles for better matching
2. **Pet Details** — Comprehensive information capture
3. **Owner Contact** — Secure contact method storage
4. **Review** — Verify before submission

### Community Dashboard
View neighborhood statistics:
- Total pets reunited
- Average reunification time
- Active registered pets
- Lost pet alerts

---

## 🐛 Known Issues & Limitations

### Current Limitations (Phase 0)
- **No Backend**: All data is mock/static
- **No Persistence**: Refreshing the page resets state
- **No Authentication**: No user accounts or login
- **Simulated AI**: Matches are pre-defined, not computed

These limitations are intentional for the prototype phase and will be addressed in future updates.

---

## 🤝 Contributing

We welcome contributions! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and passes all linting checks.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

### Project Creator: MC Monkeys

**MC Monkeys** is a human-AI collaborative system building real-world digital solutions. The team uses Claude Code agents with full operational visibility through Mission Control.

- 🌐 **Website:** [https://mcmonkeys.up.railway.app/](https://mcmonkeys.up.railway.app/)
- 🎯 **Mission Control:** [Live Demo](https://mcmonkeys.up.railway.app/app)
- 📖 **Our Story:** [Read the Story](https://mcmonkeys.up.railway.app/web/story)
- 💼 **GitHub:** [@billymcmonkeys](https://github.com/billymcmonkeys)
- 📧 **Email:** billy.mcmonkeys@gmail.com

### Need Help?

- 🐛 [Report a Bug](https://github.com/billymcmonkeys/pawlo/issues)
- 💡 [Request a Feature](https://github.com/billymcmonkeys/pawlo/issues)
- 💬 [Ask a Question](https://github.com/billymcmonkeys/pawlo/discussions)

---

## 🙏 Acknowledgments

- Built using **human-AI collaborative workflows** with Claude Code agents
- Developed with full operational visibility through **[MC Monkeys Mission Control](https://mcmonkeys.up.railway.app/)**
- Pet photos courtesy of [Unsplash](https://unsplash.com/) and placeholder services
- Icons by [Lucide](https://lucide.dev/)
- Inspired by real-world pet reunification challenges
- Built with ❤️ for pet lovers everywhere

---

<div align="center">

### 🐾 Help us bring more pets home safely! 🐾

**[Visit MC Monkeys](https://mcmonkeys.up.railway.app/)** | **[Star this repo ⭐](https://github.com/billymcmonkeys/pawlo)**

Built with human-AI collaboration by [MC Monkeys](https://mcmonkeys.up.railway.app/) 🐵

*Making AI agent work visible. One project at a time.*

</div>