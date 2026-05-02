import {
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiC,
  SiCanva,
  SiCplusplus,
  SiCss3,
  SiDjango,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPhp,
  SiReact,
  SiWordpress
} from "react-icons/si";
import { FaFileExcel, FaFilePowerpoint, FaFileWord, FaJava } from "react-icons/fa6";
import { FiBookOpen, FiCpu, FiMonitor, FiPenTool, FiStar } from "react-icons/fi";

// Shared source of truth for the Skills section across pages.
export const skillCategories = [
  {
    title: "Design",
    color: "design",
    icon: FiPenTool,
    items: ["User Interface", "Graphics", "Motion", "Infography"]
  },
  {
    title: "Web Development",
    color: "web",
    icon: FiMonitor,
    items: ["Front-End", "Back-End"]
  },
  {
    title: "Programming",
    color: "programming",
    icon: FiCpu,
    items: ["Procedural", "Object-Oriented"]
  },
  {
    title: "Documentation",
    color: "documentation",
    icon: FiBookOpen,
    items: ["Word Processor", "Spreadsheet", "Presentation"]
  },
  {
    title: "Others",
    color: "others",
    icon: FiStar,
    items: ["Git Control", "UI Testing", "Communication", "Collaboration/Team work", "Problem Solving"]
  }
];

// Tool list powers the compact bars in Home and detailed cards in About.
export const toolSkills = [
  { name: "Figma", level: 90, icon: SiFigma, domain: "design" },
  { name: "HTML5", level: 90, icon: SiHtml5, domain: "web" },
  { name: "C Programming", level: 85, icon: SiC, domain: "programming" },
  { name: "MS Word", level: 86, icon: FaFileWord, domain: "documentation" },
  { name: "Canva", level: 90, icon: SiCanva, domain: "design" },
  { name: "CSS", level: 90, icon: SiCss3, domain: "web" },
  { name: "C++", level: 85, icon: SiCplusplus, domain: "programming" },
  { name: "MS Excel", level: 85, icon: FaFileExcel, domain: "documentation" },
  { name: "Photoshop", level: 90, icon: SiAdobephotoshop, domain: "design" },
  { name: "JavaScript", level: 75, icon: SiJavascript, domain: "web" },
  { name: "Java", level: 56, icon: FaJava, domain: "programming" },
  { name: "MS PowerPoint", level: 85, icon: FaFilePowerpoint, domain: "documentation" },
  { name: "Illustrator", level: 95, icon: SiAdobeillustrator, domain: "design" },
  { name: "React JS", level: 60, icon: SiReact, domain: "web" },
  { name: "WordPress", level: 80, icon: SiWordpress, domain: "web" },
  { name: "InDesign", level: 80, icon: SiAdobeindesign, domain: "documentation" },
  { name: "PHP", level: 50, icon: SiPhp, domain: "web" },
  { name: "Django", level: 77, icon: SiDjango, domain: "web" },
  { name: "Premiere Pro", level: 70, icon: SiAdobepremierepro, domain: "design" },
  { name: "MySQL", level: 85, icon: SiMysql, domain: "programming" }
];

export const quickFacts = [
  { label: "Location", value: "Cameroon" },
  { label: "Creative Strength", value: "UI/UX and Branding Design" },
  { label: "Passion", value: "Turning ideas into functional and aesthetic digital solutions" },
  { label: "Collaboration", value: "Git and GitHub workflow" }
];
