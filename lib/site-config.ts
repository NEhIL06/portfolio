
export const siteConfig = {
  name: "Nehil Chandrakar",
  tagline: "builder — crafting systems, shaping experiences.",
  role: "Developer • Engineer • Designer",
  contact: {
    email: "nehil.contact@gmail.com",
    phone: "",
    location: "Tumkur, India",
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/nehil-chandrakar-272410259/",
    x: "https://x.com/Chandrakar43234",
    github: "https://github.com/NEhIL06",
    leetcode: "https://leetcode.com/u/jolly_fog/",
  },
  navItems: [
    { href: "/#home", label: "Home" },
    { href: "/about", label: "Who Am I" },
    { href: "/projects", label: "Projects" },
    { href: "/#skills", label: "Skills" },
    { href: "/#achievements", label: "Achievements" },
    { href: "/#clubs", label: "Clubs" },
  ],
  education: {
    institute: "Siddaganga Institute of Technology",
    location: "Tumkur, India",
    degree: "B.E. in CSE (AI/ML)",
    graduation: "Jun 2026",
  },
  skills: {
    languages: ["Java", "JavaScript", "Python"],
    frameworks: [
      "Spring Boot",
      "React.js",
      "Node.js",
      "Express.js",
      "React Native",
      "AWS (Lambda, SageMaker)",
      "Git",
      "Docker",
      "MongoDB",
      "MySQL",
      "Redis",
    ],
    fundamentals: [
      "Database Management",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Object-Oriented Programming",
    ],
  },
  projectsPage: {
    title: "Selected Projects",
    quote: "My Goal is to build systems that look simple on the surface and remain dependable under pressure.",
  },
  projects: [
    // Provided additions
    {
      title: "Krishi Baazar",
      description: "Mobile app empowering small farmers to list crops and connect directly with buyers.",
      stack: ["React Native", "Appwrite", "Node.js", "Redis", "REST APIs"],
      link: "https://github.com/NEhIL06/Krishi_Bazaar",
      demo: "https://landingpage-kb.vercel.app/",
      image: "/krishibazar.png",
      facts: [
        "Real-time weather and market news inside the app",
        "Appwrite auth/storage/notifications",
        "Redis caching boosted API performance",
      ],
    },
    {
      title: "SkyScope",
      description: "Backend for a real-time 2D virtual office enabling presence and collaboration.",
      stack: ["TurboRepo", "Node.js", "WebSockets", "WebRTC", "MongoDB", "Redis", "Docker", "CI/CD"],
      link: "https://github.com/NEhIL06/metaverse_2d",
      demo: "https://metaverse-frontend-6gjy.onrender.com/",
      image: "/skyscope.png",
      facts: [
        "Proximity-based P2P voice chat",
        "Public chat with MongoDB persistence",
        "TDD, containers, CI/CD",
      ],
    },
    {
      title: "Avanti",
      description: "AI assistant simplifying travel ticketing and banking for elderly & multilingual users.",
      stack: ["Three.js", "React.js", "Node.js", "Flask", "Gemini", "11Labs", "Rhubarb", "ffmpeg", "Sarvam.ai", "COnversational AI"],
      link: "https://github.com/NEhIL06/Avanti",
      demo: undefined,
      image: "/avanti.png",
      facts: [
        "Interactive avatar with lip-sync",
        "Bridges language gaps",
        "Speech recognition + TTS + Flask NLP",
      ],
    },
    {
      title: "The Journal ",
      description: "Minimal Next.js front-end for a journaling platform focused on clarity and calm UI.",
      stack: ["SpringBoot", "React", "Tailwind CSS", "Java", "Apache Kafka", "MongoDB", "JWT", "Swagger", "REST APIs"],
      link: "https://github.com/NEhIL06/The_Journal",
      demo: "https://the-journal-frontend-kvh8.vercel.app/",
      image: "/journal.png",
      facts: ["Keyboard-first interactions", "Local drafts & autosave", "Theming and accessibility"],
    }, {
      title: "zenletics",
      description: "AI-powered fitness app offering personalized workout plans, nutrition advice, and progress tracking.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "JWT", "REST APIs", "Generative AI", "Gemini AI"],
      link: "https://github.com/NEhIL06/zenfit",
      demo: "https://zenletics.vercel.app/",
      image: "/zenletics.png",
      facts: ["Personalized workout plans", "Nutrition advice", "Progress tracking"]
    },
    {
      title: "KeyBank",
      description: "AI-enabled API key management to store, rotate, and retrieve keys securely.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "JWT"],
      link: "#",
      demo: "https://keybankpro.vercel.app/",
      image: "/keybank.png",
      facts: ["Secret versioning & rotation", "AI suggestions for least-privilege policies", "Audit trails"],
    },

    {
      title: "NewsAnchor — AI-powered news anchor",
      description: "An AI-powered news anchor that summarizes, narrates, and presents daily headlines.",
      stack: ["Three.js", "Vite.js", "React.js", "Node.js", "Flask", "Gemini", "11Labs", "Rhubarb", "ffmpeg", "Sarvam.ai"],
      link: "https://github.com/NEhIL06/NEWS_ANCHOR",
      demo: undefined,
      image: "/newsanchor.png",
      facts: ["Multi-lingual narration", "Topic clustering", "Daily digest pipeline"],
    },
    {
      title: "InstaFood",
      description: "Instant food delivery experience with streamlined browsing and checkout.",
      stack: ["React Native", "Node.js", "Stripe", "Redis", "JavaScript"],
      link: "https://github.com/NEhIL06/Instafood",
      demo: undefined,
      image: "/instafood.png",
      facts: ["Real-time delivery tracking", "Optimized menus & search", "Offer scheduling"],
    },
    {
      title: "AWS Music Recommender",
      description: "AI-based music recommender backed by AWS services.",
      stack: ["AWS", "Python", "SageMaker", "Lambda"],
      link: "https://github.com/NEhIL06/AWSMusicRecommeder",
      demo: undefined,
      image: "/awsmusicrecommender.png",
      facts: ["Feature stores on AWS", "Hybrid recommenders", "A/B tested playlists"],
    },
    {
      title: "WebGen",
      description: "AI-powered website generator that scaffolds modern, responsive sites.",
      stack: ["React.js", "LLM", "Tailwind CSS", "Node.js", "Express.js", "JWT", "REST APIs"],
      link: "https://github.com/NEhIL06/web_gen",
      demo: undefined,
      image: "/webgen.png",
      facts: ["Component library aware generation", "Prompt presets", "One-click export"],
    },
    {
      title: "AI Food Recommender",
      description: "AI-powered recommendation system suggesting dishes based on cravings, calories, and health preferences.",
      stack: ["Python", "Crew AI", "GRPO", "Vector DBMS", "LLM"],
      link: "https://github.com/NEhIL06/RAG-Engine-for-food-recommendation",
      demo: undefined,
      image: "/awsmusicrecommender.png",
      facts: [
        "Improved recommendation accuracy by 30%",
        "Multilingual support across 5+ Indian languages",
        "Personalized health and diet-aware suggestions"
      ],
    }, {
      title: "RAG_Talent_Search",
      description: "A talent search engine leveraging Retrieval-Augmented Generation (RAG) to match candidates with job descriptions effectively.",
      stack: ["Python", "FastAPI", "RAG", "LLM", "ChromaDB", "Elasticsearch"],
      link: "https://github.com/NEhIL06/RAG_talent_search",
      demo: undefined,
      image: "/streaming.png",
      facts: [
        "Combines dense and sparse retrieval for improved candidate-job matching",
        "Implements reranking with CrossEncoder (MiniLM-L-6-v2) for fine-grained scoring",
        "Evaluated using Recall@K, Precision@K, and MRR metrics for retrieval quality",
        "Dockerized architecture for seamless local orchestration and deployment"
      ],
    },
    {
      title: "Interview Assitant Pro",
      description: "Interview assistant, a platform dedicated to help HRs shortlist candidates and save company time.",
      stack: ["React.js", "Express.js", "TypeScript", "Generative AI", "MongoDB", "Node.js", "JWT", "REST APIs", "Gemini", "RAG"],
      link: "https://github.com/NEhIL06/InterviewAssistant",
      demo: "https://interviewassistantfe.onrender.com/",
      image: "/interviewassistant.png",
      facts: [
        "Scores each response and summary of each candidates and a summary of the interview",
        "Conducts structured interviews based on the candidates resume",
        "Saves HR time by automating the interview process"
      ],
    },
    {
      title: "EcoSap",
      description: "An Platform designed to give initative to the small farmers to grow more trees and reduce the carbon footprint.",
      stack: ["React.js", "Express.js", "TypeScript", "FASTApi", "YOLO", "MongoDB", "Node.js", "REST APIs", "Gemini", "Distributed Services"],
      link: "https://github.com/NEhIL06/Ecosap",
      demo: undefined,
      image: "/interviewassistant.png",
      facts: [
        "Easy Setup and the automative monitoring of the trees",
        "Ecocredicts are granted based on the growth of the trees",
        "The Credits can then be used to buy agricultural products from the platform",
      ],
    },

    // Previously included


  ],
  achievements: [
    { title: "Mercuria India Hackathon 2024 — EcoSap", subtitle: "2nd Prize", date: "Nov 2024" },
    { title: "Emerging Tech Hackathon 2024 — Multi-Agent Orchestration for Choice Prediction", subtitle: "Honourable Mention", date: "Dec 2024" },
    { title: "The Better Hack 2025 — Jarvis for Food (Multi-agentic orchestration using GRPO)", subtitle: "Top 5", date: "May 2025" },

  ],
  clubs: [
    {
      name: "AI BREWERY",
      role: "Co-Founder & Secretary Community",
      since: "Nov 2024 – Present",
      location: "SIT, KA",
      posts: ["Co-founded an organization empowering students in emerging tech."],
    },
    {
      name: "SARK",
      role: "Member",
      since: "Dec 2022 – Present",
      location: "SIT, KA",
      posts: ["Conducted workshops teaching 350+ students."],
    },
  ],
  about: {
    intro:
      "Beyond building systems, I explore design, communities, and learning in public. I love hackathons, photography, and sharing knowledge through video.",
    hobbies: [
      {
        title: "Travel",
        description: "Exploring new places and cultures.",
        image: "/travel.jpg",
      },
      {
        title: "Hackathons",
        description: "Rapidly prototyping ideas with a bias for shipping.",
        image: "/hackathons.jpg",
      },
      {
        title: "Photography",
        description: "Capturing stories in light and contrast.",
        image: "/me1.jpg",
      },

    ],
    gallery: [
      { src: "/mercuria.jpg", caption: "EcoSap — 2nd Prize, Mercuria 2024" },
      { src: "/metadome.jpg", caption: "Multi-agent orchestration at Emerging Tech 2024" },
      { src: "/latenights.jpg", caption: "latenights sprints" },
      { src: "/companyvisits2.jpg", caption: "Company visits" },
      { src: "/sarkworkshop.jpg", caption: "Hands-on workshop at SARK" },
      { src: "/projectbooth.jpg", caption: "Project demo booth" },
      { src: "/companyvisits.jpg", caption: "Conversations and connections" },
    ],
    youtube: {
      channelName: "NehilChandrakar",
      tagline: "Engineering, design, and shipping better software.",
      link: "https://www.youtube.com/@nehilchandrakar9251",
      latestVideo: "https://youtu.be/1INa8_HbocU?si=Xl_WdT7wgUkrzQXL",
      preview: "/youtube-preview.png",
    },
  },
}
