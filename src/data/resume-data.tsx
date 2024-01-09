import { ResumeData } from '@/lib/types';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export const RESUME_DATA: ResumeData = {
  name: 'Jatin',
  initials: 'JK',
  location: 'Jamshedpur, India',
  locationLink: 'https://www.google.com/maps/place/Chennai',
  specialisation: 'Software Developer',
  about:
    'Software Developer with experience in various technologies, focused on creating seamless applications.',
  summary:
    'A passionate Software Developer currently pursuing B.Tech in CSE from SRM Institute Of Science And Technology. Experienced in Flutter, Node.js, TypeScript, and various other technologies. Actively involved in multiple organizations as a technical lead.',
  personalWebsiteUrl: 'https://jatinkumar.dev',
  contact: {
    email: 'main.jatink@gmail.com',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/jatindotdev',
        icon: GithubIcon,
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/jatinnkumar',
        icon: LinkedinIcon,
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/jatindotdev',
        icon: TwitterIcon,
      },
    ],
  },
  education: [
    {
      school: 'SRM Institute Of Science And Technology',
      degree: "Bachelor's Degree in Computer Science and Engineering",
      start: '2022',
      end: 'Present',
      link: 'https://srmist.edu.in/',
    },
  ],
  work: [
    {
      company: 'Climec Labs',
      link: 'https://climeclabs.com/',
      badges: ['Hybrid', 'Startup'],
      title: 'SDE Intern',
      logo: 'https://climeclabs.com/cropped.jpg',
      start: 'Jul 2023',
      end: 'Nov 2023',
      description: [
        'Developed a Flutter application that seamlessly integrates with WiFi-enabled Air Purifiers.',
        'Built a Flutter app with Dart, seamlessly integrating Firebase as the backend.',
        "My contributions primarily centred on implementing device connection functionality and designing the application's user flow.",
      ],
    },
  ],
  organisations: [
    {
      name: 'SRMKZILLA (Official mozilla campus club)',
      link: 'https://srmkzilla.net/',
      badges: ['Open Source', 'Campus Club'],
      title: 'Associate Technical Lead',
      logo: 'https://srmkzilla.net/assets/images/logo.png',
      start: 'Oct 2022',
      end: 'Present',
      description: [
        'Started as a member, went on to become an associate technical lead in my second year.',
        'Worked on many open and closed source projects in MERN stack and Flutter.',
        'Created a Flutter application designed for managing event check-ins and attendance.',
        'Worked on the development of the backend of a CMS in Node.js and TypeScript.',
      ],
    },
  ],
  skillset: [
    {
      label: 'Development and Cloud',
      skills: [
        'Node.js',
        'MongoDB',
        'ExpressJS',
        'PostgreSQL',
        'MySQL',
        'AWS S3',
        'AWS SES',
        'ReactJS',
        'RemixJS',
        'NextJS',
        'Tailwind CSS',
        'Firebase',
        'Deno',
      ],
    },
    {
      label: 'Programming Languages',
      skills: [
        'TypeScript',
        'JavaScript',
        'Python',
        'C',
        'C++',
        'GO',
        'SQL',
        'Java',
      ],
    },
  ],
  projects: [
    {
      title: 'KzCMS',
      techStack: [
        'MERN',
        'TypeScript',
        'Node.js',
        'Express',
        'React',
        'AWS S3',
      ],
      link: {
        href: 'https://github.com/srm-kzilla/kzcms',
        label: 'GitHub',
      },
      description: [
        'Developed a CMS for SRMKZILLA using the MERN stack with TypeScript, Node.js, Express, and React.',
        'Designed and implemented a controller service architecture for authentication, validation, and middleware logic.',
        'Built an Image Upload service using AWS S3 to allow users to upload and manage images within the CMS.',
        'Contributed to various CMS features, including user management, content creation, and publishing.',
      ],
    },
    {
      title: 'Chat App',
      techStack: ['HTML', 'CSS', 'Vanilla JS', 'Firebase'],
      description: [
        'Built a real-time chat app using HTML, CSS, Vanilla JS, and Firebase, enabling seamless communication.',
        'Implemented secure user authentication and authorization with Firebase Auth.',
        'Used Firebase Realtime Database to efficiently store and retrieve messages, enabling real-time messaging.',
        'Developed a scalable chat platform that can handle high user volumes and traffic.',
      ],
      link: {
        href: 'https://chat-withme.vercel.app/',
        label: 'chat-withme.vercel.app',
      },
    },
    {
      title: 'Fashiontonic',
      techStack: ['Flutter', 'GetX'],
      description: [
        'Developed a Shopping App using Flutter and GetX for state management.',
        'Designed and implemented a modular architecture for the app, making it easy to maintain and extend.',
        'Designed the frontend to integrate seamlessly with the backend for a smooth user experience.',
        'Implemented a variety of UI elements, such as banners and filters, using the Flutter framework.',
      ],
      link: {
        href: 'https://github.com/jatindotdev/fashiontonic',
        label: 'GitHub',
      },
    },
    {
      title: 'Music Player',
      techStack: ['Deno', 'YouTube Data API'],
      description: [
        'Built a music player web app with Deno, a modern JavaScript runtime.',
        'Used the YouTube Data API to search for and play videos.',
        'Deployed the app to the edge using Deno Deploy, making it fast and reliable for users around the world.',
        'The app is responsive and easy to use, with a clean and modern design.',
      ],
      link: {
        href: 'https://music-player.deno.dev/',
        label: 'music-player.deno.dev',
      },
    },
  ],
};
