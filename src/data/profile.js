// Edit this file to personalize the entire site — every component reads from here.
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { HardHat, Leaf, Mail, Sprout, Terminal, TrafficCone } from "lucide-react";
import profilePhoto from "../assets/pas_foto.jpg";

export const profile = {
  name: "Harris Kristanto",
  role: "Computer Science Student",
  tagline: "Building things for the web, one line of code at a time.",
  bio: "I'm a Computer Science student at BINUS University, passionate about software development, web technologies, and solving real-world problems through code. Always learning, always building.",
  location: "Jakarta, Indonesia",
  avatarInitials: "HK",
  // Paste an image URL here, e.g. "https://example.com/photo.jpg".
  // For a local file instead: drop it in src/assets/, then import it at
  // the top of this file and reference the import here, as done above.
  photo: profilePhoto,
};

export const education = [
  {
    school: "SMA Katolik Sang Timur",
    degree: "Senior High School Diploma",
    period: "2021 — 2024",
    status: "Graduated",
    description:
      "Completed senior high school education, building a strong foundation in mathematics and science before continuing on to study Computer Science.",
  },
  {
    school: "BINUS University",
    degree: "Bachelor of Computer Science",
    period: "2024 — Present",
    status: "In Progress",
    // Optional — omit this field on entries that shouldn't show a GPA.
    gpa: "3.84 / 4.00",
    description:
      "Currently pursuing a Bachelor's degree in Computer Science, focusing on software engineering, algorithms, and web development.",
  },
];

export const organizations = [
  {
    name: "KLIFONARA BINUS",
    role: "Member",
    period: "2024 — Present",
  },
  {
    name: "Data Science Club BINUS",
    role: "Activist",
    period: "2025 — Present",
    // Optional — roles held in specific events or programs run by the org.
    experiences: ["Secretary of DSC x Ureeka Workshop 2026"],
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
    // Optional: a lucide-react icon for the card. Falls back to a folder icon.
    icon: Sprout,
    description:
      "A website that provides plant recommendation based on user's environment and preferences.",
    tags: ["React", "FastAPI", "Bootstrap"],
    demo: "https://plantiz.vercel.app/",
  },
  {
    title: "Plant Species Classifier",
    icon: Leaf,
    description:
      "An image classification model that identifies plant species from a photo, deployed as an interactive Gradio app on Hugging Face Spaces.",
    tags: ["PyTorch", "Gradio"],
    demo: "https://huggingface.co/spaces/harriskr14/plant-species-classifier",
  },
  {
    title: "PPE Surveillance Application",
    icon: HardHat,
    description:
      "Detects hardhats and safety vests on people in uploaded images or video and flags anyone missing required PPE, using a YOLO model fine-tuned on a construction site safety dataset.",
    tags: ["YOLO", "PyTorch", "Gradio"],
    demo: "https://huggingface.co/spaces/harriskr14/PPE-Surveillance",
  },
  {
    title: "C++ Playground",
    icon: Terminal,
    description:
      "A browser-based C++ runner that compiles and executes code with a chosen standard and optimization level, then displays the program output or compiler errors.",
    tags: ["JavaScript", "Python", "Compiler Explorer"],
    demo: "https://cpp-runner-rose.vercel.app/",
  },
  {
    title: "Traffic Violation Detection",
    icon: TrafficCone,
    description:
      "Detects vehicles, riders, and traffic violations such as missing helmets, triple riding, and phone use in images, using a YOLO model fine-tuned on a 12-class traffic violation dataset.",
    tags: ["YOLO", "PyTorch", "Gradio"],
    demo: "https://huggingface.co/spaces/harriskr14/traffic-violation-detection",
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
