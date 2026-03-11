// Cyber Portfolio
import cyberPortfolio from '/public/img/projects/cyberPortfolio/cyberPortfolioHero.png'
// EventSphere
import eventSphereDashboard from '/public/img/projects/eventSphere/eventSphereDashboard.png'
import eventSphereEventsPage from '/public/img/projects/eventSphere/eventSphereEventsPage.png'
import eventSphereFAQ from '/public/img/projects/eventSphere/eventSphereFAQ.png'
import eventSphereHero from '/public/img/projects/eventSphere/eventSphereHero.png'
import eventSphereFav from '/public/img/projects/eventSphere/fav-logo1.png'
// Expense Voyage
import expenseVoyageHero from '/public/img/projects/expenseVoyage/expenseVoyageHero.png'
import expenseVoyageFooter from '/public/img/projects/expenseVoyage/expenseVoyageFooter.png'
import expenseVoyageAdminDashboard from '/public/img/projects/expenseVoyage/expenseVoyageAdminDashboard.png'
import expenseVoyageFav from '/public/img/projects/expenseVoyage/expense_voyage_favicon.png'
// Inquizzitive
import inquizzitiveBrowseQuiz from '/public/img/projects/inquizzitive/inquizzitiveBrowseQuiz.png'
import inquizzitiveHero from '/public/img/projects/inquizzitive/inquizzitiveHero.png'
import inquizzitiveHeroDark from '/public/img/projects/inquizzitive/inquizzitiveHeroDark.png'
import inquizzitiveProfile from '/public/img/projects/inquizzitive/inquizzitiveProfile.png'
import inquizzitiveQuizResult from '/public/img/projects/inquizzitive/inquizzitiveQuizResult.png'
import inquizzitiveSidebar from '/public/img/projects/inquizzitive/inquizzitiveSidebar.png'
// Mini Projects
import instaClone from '/public/img/projects/miniProjects/instaClone.png'
import netflixClone from '/public/img/projects/miniProjects/netflixClone.png'
import steamClone from '/public/img/projects/miniProjects/steamClone.png'
import weatherWidget from '/public/img/projects/miniProjects/weatherWidget.png'
import zoroGallery from '/public/img/projects/miniProjects/zoroGallery.png'
// Portfolio V1
import potfolioV1Hero from '/public/img/projects/portfolioV1/potfolioV1Hero.png'
import potfolioV1Service from '/public/img/projects/portfolioV1/potfolioV1Service.png'
// Portfolio V2
import potfolioV2About from '/public/img/projects/portfolioV2/potfolioV2About.png'
import potfolioV2Contact from '/public/img/projects/portfolioV2/potfolioV2Contact.png'
// Subway Surfers (Tribute)
import subSurfHero from '/public/img/projects/subSurf/subSurfHero.png'
import subSurfBoardDisplay from '/public/img/projects/subSurf/subSurfBoardDisplay.png'
import subSurfBoards from '/public/img/projects/subSurf/subSurfBoards.png'
import subSurfCharDisplay from '/public/img/projects/subSurf/subSurfCharDisplay.png'
import subSurfChars from '/public/img/projects/subSurf/subSurfChars.png'
import subSurfDestination from '/public/img/projects/subSurf/subSurfDestination.png'
import subSurfFav from '/public/img/projects/subSurf/subway-surfers-logo.png'
// Synscript
import synscriptHero from '/public/img/projects/synscript/synscriptHero.png'
import synscriptDarkHero from '/public/img/projects/synscript/synscriptDarkHero.png'
import synscriptDashboard from '/public/img/projects/synscript/synscriptDashboard.png'
import synscriptNoti from '/public/img/projects/synscript/synscriptNoti.png'
import synscriptVault from '/public/img/projects/synscript/synscriptVault.png'
import synscriptFav from '/public/img/projects/synscript/icon.png'
// Wellnex
import wellnexHero from '/public/img/projects/wellnex/wellnexHero.png'
import wellnexHeroLight from '/public/img/projects/wellnex/wellnexHeroLight.png'

export type ProjectStatus = 'completed' | 'in-progress' | 'archived';
export type ProjectCategory = 'full-stack' | 'frontend' | 'mini-projects';

export interface Project {
  id: number;
  name: string;
  description: string;
  date: string; // MM-YYYY
  status: ProjectStatus;
  category: ProjectCategory;
  techStack: string[];
  link: string | null;
  github?: string;
  favicon?: string;
  screenshots?: string[];
  fonts?: string[];
  featured?: boolean;
  modalEnabled?: boolean; // defaults to true
}

export const projects: Project[] = [
  // {
  //   id: 99,
  //   name: 'NexaFlow',
  //   description: 'NexaFlow is a full-stack project management platform with real-time collaboration, Kanban boards, Gantt charts, and AI-powered task prioritization. Built for teams that move fast and need clarity across sprints, milestones, and deliverables.',
  //   date: '02-2026',
  //   status: 'completed',
  //   category: 'full-stack',
  //   techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Socket.io', 'Prisma', 'Zod'],
  //   link: 'https://nexaflow-demo.vercel.app',
  //   github: 'https://github.com/demo/nexaflow',
  //   favicon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  //   screenshots: [
  //     'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  //     'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  //     'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  //   ],
  //   fonts: ['JetBrains Mono', 'Inter', 'Space Grotesk'],
  //   featured: true,
  // },
  {
    id: 15,
    name: 'FinTrack',
    description: 'FinTrack is a personal finance dashboard web application that helps users manage their finances comprehensively. It allows users to track expenses, manage budgets, maintain an investment portfolio, handle debt management, set and monitor savings goals, view financial reports, and access educational resources.',
    date: '02-2026',
    status: 'in-progress',
    category: 'full-stack',
    techStack: ['ASP.NET Core', 'C#', 'Tailwind CSS', 'MS SQL Server', 'Chart.js', 'Javascript', 'GSAP', 'Razor Views(.cshtml)'],
    link: null,
    github: 'https://github.com/syedhamza6448/FinTrack',
    featured: true,
  },
  {
    id: 14,
    name: 'SynScript',
    description: 'A collaborative research & citation engine where researchers build shared Knowledge Vaults with real-time sync, annotated PDFs, role-based access control, and Redis-powered caching.',
    date: '02-2026',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Redis', 'React Query', 'GSAP', 'Zod', 'Radix UI'],
    link: 'https://synscript.vercel.app',
    favicon: synscriptFav,
    screenshots: [
      synscriptHero, synscriptDarkHero, synscriptDashboard, synscriptNoti, synscriptVault
    ],
    github: 'https://github.com/syedhamza6448/SynScript',
    fonts: ['DM Mono', 'Space Grotesk']
  },
  {
    id: 1,
    name: 'Subway Surfers (Fan Tribute)',
    description: 'A nostalgic Subway Surfers fan tribute that brings childhood memories to life with playful motion and game UI.',
    date: '01-2026',
    status: 'completed',
    category: 'frontend',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    favicon: subSurfFav,
    screenshots: [
      subSurfHero, subSurfChars, subSurfCharDisplay, subSurfDestination, subSurfBoards, subSurfBoardDisplay
    ],
    link: 'https://subway-surfer-tribute.vercel.app',
    github: 'https://github.com/syedhamza6448/subway-run-tribute',
    fonts: ['Titan One', 'Lato']
  },
  {
    id: 2,
    name: 'Inquizzitive',
    description: 'Full-stack quiz platform with real-time gameplay, scoring logic, and result tracking.',
    date: '08-2025',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Blade Template Engine(HTML, CSS, JS)', 'Laravel(PHP)', 'MySQL', 'REST APIs'],
    link: 'https://www.inquizzitive.io',
    favicon: 'https://inquizzitive.io/assets/images/Inquizzitive_logo_darkmode.png',
    screenshots: [
      inquizzitiveHeroDark, inquizzitiveHero, inquizzitiveBrowseQuiz, inquizzitiveProfile, inquizzitiveQuizResult, inquizzitiveSidebar
    ],
    fonts: ['Outfit']
  },
  {
    id: 3,
    name: 'Cyber Portfolio',
    description: 'React-based frontend project exploring component-driven UI and state management.',
    date: '12-2025',
    status: 'archived',
    category: 'frontend',
    techStack: ['React', 'JavaScript', 'Tailwind'],
    link: null,
    screenshots: [
      cyberPortfolio
    ],
    fonts: ['Nexa', 'Subject Zero Display']
  },
  {
    id: 4,
    name: 'Portfolio v2',
    description: 'Previous iteration of my personal portfolio website.',
    date: '02-2025',
    status: 'completed',
    category: 'frontend',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://syedhamza6448.github.io/VCard-Portfolio',
    screenshots: [
      potfolioV2About, potfolioV2Contact
    ],
    fonts: ['Poppins'],
    github: 'https://github.com/syedhamza6448/VCard-Portfolio'
  },
  {
    id: 5,
    name: 'Expense Voyage',
    description: 'Expense Voyage is a travel planning and expense management web app that lets users create trips, set budgets, and track expenses in real time.',
    date: '10-2025',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Blade Template Engine(HTML, CSS, JS)', 'Laravel(PHP)', 'Bootstrap', 'MySQL', 'REST APIs'],
    link: null,
    screenshots: [
      expenseVoyageHero, expenseVoyageAdminDashboard, expenseVoyageFooter
    ],
    favicon: expenseVoyageFav,
    fonts: ['Jost']
  },
  {
    id: 6,
    name: 'Event Sphere',
    description: 'EventSphere is a centralized web-based event management platform that streamlines college events by enabling seamless event creation, registration, tracking, and engagement.',
    date: '10-2025',
    status: 'completed',
    category: 'full-stack',
    techStack: ['Blade Template Engine(HTML, CSS, JS)', 'Laravel(PHP)', 'Bootstrap', 'MySQL', 'REST APIs'],
    link: null,
    screenshots: [
      eventSphereHero, eventSphereFAQ, eventSphereEventsPage, eventSphereDashboard
    ],
    favicon: eventSphereFav,
    fonts: ['Space Grotesk', 'Figtree']
  },
  {
    id: 7,
    name: 'Wellnex Systems',
    description: 'Wellnex Systems is a unified HealthTech platform combining fitness, mental wellness, and smart digital services. Built to deliver personalized, scalable, and future-ready wellness experiences.',
    date: '11-2025',
    status: 'completed',
    category: 'frontend',
    techStack: ['React', 'Tailwind CSS'],
    link: 'https://wellnex-eight.vercel.app',
    screenshots: [
      wellnexHeroLight, wellnexHero
    ],
    fonts: ['Inter'],
    github: 'https://github.com/syedhamza6448/Wellnex'
  },
  {
    id: 8,
    name: 'Weather Widget',
    description: 'A minimalist weather widget.',
    date: '01-2024',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS', 'API Integration'],
    link: 'https://syedhamza6448.github.io/Weather-App',
    screenshots: [
      weatherWidget
    ],
    github: 'https://github.com/syedhamza6448/Weather-App'
  },
  {
    id: 9,
    name: 'Zoro Gallery',
    description: 'A slider component to showcase my favourite anime character',
    date: '02-2024',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://syedhamza6448.github.io/Zoro-Gallery',
    screenshots: [
      zoroGallery
    ],
    github: 'https://github.com/syedhamza6448/Zoro-Gallery'
  },
  {
    id: 10,
    name: 'Instagram Clone',
    description: 'A clone of Instagram, cloned it in my early days of Web Designing',
    date: '10-2023',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS'],
    link: 'https://syedhamza6448.github.io/Clones/Instagram/source%20files/index.html',
    screenshots: [
      instaClone
    ],
    github: 'https://github.com/syedhamza6448/Clones'
  },
  {
    id: 11,
    name: 'Steam Clone',
    description: 'A clone of Steam, cloned it in my early days of Web Designing',
    date: '11-2023',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS'],
    link: 'https://syedhamza6448.github.io/Clones/Steam/source%20files/index.html',
    github: 'https://github.com/syedhamza6448/Clones',
    screenshots: [
      steamClone
    ]
  },
  {
    id: 12,
    name: 'Netflix Clone',
    description: 'A clone of Netflix, cloned it in my early days of Web Designing',
    date: '12-2023',
    status: 'completed',
    category: 'mini-projects',
    techStack: ['HTML', 'CSS'],
    link: 'https://syedhamza6448.github.io/Clones/Netflix/source%20file/netflix.html',
    screenshots: [
      netflixClone
    ],
    github: 'https://github.com/syedhamza6448/Clones'
  },
  {
    id: 13,
    name: 'Portfolio v1',
    description: 'An early portfolio website created with core web technologies. Focused on learning layout, styling, and basic interactivity.',
    date: '11-2024',
    status: 'completed',
    category: 'frontend',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    link: 'https://syedhamza6448.github.io/Portfolio',
    github: 'https://github.com/syedhamza6448/Portfolio',
    screenshots: [
      potfolioV1Hero, potfolioV1Service
    ]
  },
];

/** Parse MM-YYYY date string to a sortable timestamp */
export function parseProjectDate(dateStr: string): number {
  const [month, year] = dateStr.split('-').map(Number);
  return year * 100 + month;
}

/** Sort projects by date descending (most recent first) */
export function sortProjectsByDate(list: Project[]): Project[] {
  return [...list].sort((a, b) => parseProjectDate(b.date) - parseProjectDate(a.date));
}
