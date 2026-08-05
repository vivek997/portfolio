export const personal = {
  name: "Vivek Rawal",
  fullName: "Vivek Kumar Rawal",
  role: "Software Engineer",
  tagline: "Backend Systems . GenAI . Python . Cloud",
  location: "New Delhi (NCR), India",
  email: "vivekrawal997@gmail.com",
  github: "https://github.com/vivek997",
  githubUser: "vivek997",
  linkedin: "https://linkedin.com/in/vivek-rawal/",
  // Set to true once an up-to-date, PII-scrubbed resume PDF is added at
  // public/resume.pdf (no phone number / DOB). Until then, resume links
  // fall back to a "request via email" flow so nothing sensitive is
  // publicly downloadable.
  resumeAvailable: false,
  resumeUrl: "/resume.pdf",
  summary:
    "Software Engineer with 6+ years of experience in backend development, API design, cloud infrastructure, and automation. Currently building GenAI-powered systems with Python. Proficient in Django, Flask, ETL pipelines, and AWS, with a strong focus on scalable, production-ready solutions.",
  yearsExperience: 6,
};

export const ltmJoinDate = new Date(2026, 0, 15); // 15 Jan 2026
export const careerStartDate = new Date(2019, 8, 1); // Sep 2019 (Clix Capital, exact day unknown)

export const resumeRequestUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
  "Resume request"
)}&body=${encodeURIComponent("Hi Vivek,\n\nCould you share your latest resume?\n\nThanks!")}`;

export const socials = [
  { label: "GitHub", href: personal.github, icon: "github" },
  { label: "LinkedIn", href: personal.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${personal.email}`, icon: "mail" },
];

export type Experience = {
  company: string;
  role: string;
  duration: string;
  startDate: Date;
  endDate?: Date; // undefined = ongoing/present
  current: boolean;
  hash: string;
  location: string;
  client?: string;
  bullets: string[];
  projects?: { name: string; description: string; tech?: string }[];
};

export const experience: Experience[] = [
  {
    company: "LTIMindtree (LTM)",
    role: "GenAI Python Developer",
    duration: "Jan 2026 - Present",
    startDate: ltmJoinDate,
    current: true,
    hash: "a1b2c3d",
    location: "New Delhi (NCR), India",
    client: "BNY (The Bank of New York Mellon Corporation)",
    bullets: [
      "Assigned to LTIMindtree's engagement with BNY (The Bank of New York Mellon Corporation), building LLM-powered automation and intelligent backend systems.",
      "Driving two key GenAI initiatives, AADI and TREX, from design through production deployment.",
      "Collaborating with cross-functional teams to design, develop, and deploy scalable, production-ready GenAI-driven applications.",
      "Applying human-in-the-loop review patterns and solid Python engineering practices to safely integrate LLMs into enterprise workflows.",
    ],
    projects: [
      {
        name: "AADI - AI-Powered Test Management",
        description:
          "End-to-end AI-driven test management pipeline: pulls user story details from JIRA, evaluates story quality, and generates test cases via an LLM. After human-in-the-loop review and approval, cases are uploaded to Zephyr/JIRA. The LLM then generates test scripts, which are validated, approved, and pushed to GitLab for execution, with results published back to Zephyr/JIRA.",
        tech: "Python, LLMs, JIRA API, Zephyr, GitLab",
      },
      {
        name: "TREX - Internal AI Agents Testing Suite",
        description:
          "Internal testing suite integrating multiple AI agents to enable end-to-end agent workflow testing, validating agent inputs and outputs across the pipeline to ensure reliability before deployment.",
        tech: "Python, LLM Agents, Test Automation",
      },
    ],
  },
  {
    company: "Clix Capital Services Pvt. Ltd.",
    role: "Software Engineer - Python (Sr. Manager)",
    duration: "Sep 2019 - Jan 2026",
    startDate: careerStartDate,
    endDate: ltmJoinDate,
    current: false,
    hash: "7f3e9a1",
    location: "India",
    bullets: [
      "Developed clean, efficient, and scalable code based on technical specifications.",
      "Tested, deployed, and maintained production-grade systems and APIs using PyTest, Postman, and Linux.",
      "Improved existing software architecture and fixed live issues with unit testing.",
      "Collaborated cross-functionally in an Agile/Scrum environment using JIRA to gather and implement business requirements.",
    ],
    projects: [
      {
        name: "Delphi - Business Rule Engine",
        description:
          "Built a BRE integrating ML models and credit policy rules to assess loan eligibility across multiple products and partners. Integrated CIBIL/Experian, Dedupe, Hunter, and Perfios.",
      },
      {
        name: "Disbursement App",
        description:
          "Secure Flask/Python middleware automating fund disbursement through bank APIs, with token validation, SSL, and real-time LMS payment tracking.",
        tech: "Python, Flask",
      },
      {
        name: "DMS - Document Management System",
        description:
          "Serverless document upload system using pre-signed URLs to securely manage documents on AWS S3.",
        tech: "AWS S3, Python",
      },
      {
        name: "Clix Portal",
        description:
          "Internal employee portal for KYC, TDS, and document management with role-based access and service-level permissions.",
      },
      {
        name: "AI-Powered OCR & Data Processing System",
        description:
          "OCR-powered system extracting and refining document data using LLMs, regex, and Python logic, with a review UI before pushing into the LMS - automating manual document processing and improving accuracy.",
        tech: "Python, Django, FastAPI, AWS (S3, EC2), PostgreSQL, OCR, LLM",
      },
      {
        name: "DORM Portal",
        description:
          "Django-based Data Overview and Risk Management portal for data insights and reporting.",
        tech: "Django",
      },
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  company: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "AI-Powered OCR & Data Processing System",
    description:
      "An OCR-powered pipeline that extracts and refines data from uploaded documents using LLMs, regex, and custom Python logic. Includes a review UI for humans to verify/edit extracted data before it's pushed into the loan management system - cutting manual document processing time.",
    tech: ["Python", "Django", "FastAPI", "AWS S3", "AWS EC2", "PostgreSQL", "OCR", "LLM"],
    company: "Clix Capital",
    featured: true,
  },
  {
    name: "Delphi - Business Rule Engine",
    description:
      "A Business Rule Engine combining ML models with credit policy rules to evaluate loan eligibility across multiple products and lending partners, integrating bureau and verification data sources.",
    tech: ["Python", "ML Integration", "CIBIL/Experian", "Perfios"],
    company: "Clix Capital",
    featured: true,
  },
  {
    name: "Disbursement Middleware",
    description:
      "Secure middleware service automating fund/payment disbursement through bank APIs with token validation, SSL, and real-time tracking via LMS integration.",
    tech: ["Python", "Flask", "Bank APIs", "SSL"],
    company: "Clix Capital",
  },
  {
    name: "DMS - Document Management System",
    description:
      "A serverless document upload and storage system built with pre-signed URLs for secure, scalable document handling on AWS S3.",
    tech: ["AWS S3", "Serverless", "Python"],
    company: "Clix Capital",
  },
  {
    name: "Clix Employee Portal",
    description:
      "An internal portal for employee services - KYC, TDS, and document management - with fine-grained, role-based access control.",
    tech: ["Django", "RBAC"],
    company: "Clix Capital",
  },
  {
    name: "DORM Portal",
    description:
      "A Django-based Data Overview & Risk Management portal providing data insights and reporting for business teams.",
    tech: ["Django", "PostgreSQL", "Reporting"],
    company: "Clix Capital",
  },
];

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "SQL", "JavaScript", "HTML & CSS"],
  },
  {
    category: "Frameworks",
    skills: ["Django", "Flask", "FastAPI"],
  },
  {
    category: "GenAI / LLM",
    skills: ["LLM Integration", "Prompt Engineering", "OCR + LLM Pipelines"],
  },
  {
    category: "Cloud (AWS)",
    skills: [
      "EC2",
      "S3",
      "Lambda",
      "ECS & ECR",
      "CloudWatch",
      "CloudFormation",
      "Load Balancer",
    ],
  },
  {
    category: "Tools & Practices",
    skills: ["Docker", "Git", "REST APIs", "PyTest", "Postman", "Linux", "Agile/Scrum", "ETL"],
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Manav Rachna International Institute of Research and Studies, Faridabad, Haryana",
    year: "2019",
  },
  {
    degree: "Class XII",
    school: "Indra Higher Secondary School, Datia, MP",
    year: "2015",
  },
  {
    degree: "Class X",
    school: "Jawahar Navodaya Vidyalaya, Datia, MP",
    year: "2012",
  },
];

export const achievements = [
  "Clix Award of Excellence - October 2024",
  "Clix Hackathon Award - February 2022",
  "Clix IT Star Performer - June 2020",
  "Published research paper on \"Network Security\" - Journal of Engineering and Applied Sciences (2017)",
  "Published research paper on UAV control systems - International Journal of Computer Applications (2018)",
];
