// Edit this file to personalize the entire site — every component reads from here.
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

export const profile = {
  name: "Harris Kristanto",
  role: "Computer Science Student",
  tagline: "Building things for the web, one line of code at a time.",
  bio: "I'm a Computer Science student at BINUS University, passionate about software development, web technologies, and solving real-world problems through code. Always learning, always building.",
  location: "Jakarta, Indonesia",
  avatarInitials: "HK",
};

export const education = [
  {
    school: "BINUS University",
    degree: "Bachelor of Computer Science",
    period: "2023 — Present",
    status: "In Progress",
    description:
      "Currently pursuing a Bachelor's degree in Computer Science, focusing on software engineering, algorithms, and web development.",
  },
];

export const skills = [
  "JavaScript",
  "React.js",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "Tailwind CSS",
  "Git & GitHub",
];

export const projects = [
  {
    title: "Plantiz",
    description:
      "A website that provides plant recommendation based on user's environment and preferences.",
    tags: ["React", "FastAPI", "Bootstrap"],
    github: "https://github.com/RizStillLearning/plantiz",
    demo: "",
  },
  {
    title: "Project Two",
    description:
      "A short description of your second project — highlight the tech stack and your role in building it.",
    tags: ["Python", "Flask", "PostgreSQL"],
    github: "https://github.com/yourusername/project-two",
    demo: "",
  },
  {
    title: "Project Three",
    description:
      "A short description of your third project — mention what makes it interesting or what you learned.",
    tags: ["Java", "Android"],
    github: "https://github.com/yourusername/project-three",
    demo: "",
  },
];

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/RizStillLearning",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/harris-kristanto-73271326b",
    icon: FaLinkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/harris_krs2606",
    icon: FaInstagram,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/harris_krs2606",
    icon: FaXTwitter,
  },
  { name: "Email", href: "mailto:harrisk2606@gmail.com", icon: Mail },
];
