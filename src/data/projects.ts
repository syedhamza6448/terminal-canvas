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
  {
    id: 15,
    name: 'FinTrack',
    description: 'FinTrack is a personal finance dashboard web application that helps users manage their finances comprehensively. It allows users to track expenses, manage budgets, maintain an investment portfolio, handle debt management, set and monitor savings goals, view financial reports, and access educational resources.',
    date: '02-2026',
    status: 'in-progress',
    category: 'full-stack',
    techStack: ['ASP.NET Core', 'C#', 'Tailwind CSS', 'MS SQL Server', 'Chart.js', 'Javascript', 'GSAP', 'Razor Views(.cshtml)'],
    link: null,
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
    favicon: ''
  },
  {
    id: 1,
    name: 'Subway Surfers (Fan Tribute)',
    description: 'A nostalgic Subway Surfers fan tribute that brings childhood memories to life with playful motion and game UI.',
    date: '01-2026',
    status: 'archived',
    category: 'frontend',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://subway-surfer-tribute.vercel.app',
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
