/* 
   to edit site content.

   every project page are built from this file.
 */

window.SITE = {
  name: "Michelle David",
  email: "michelle.david@pau.edu.ng",
  phoneDisplay: "0806 084 9835",
  whatsapp: "2348060849835",            // international format, no + or spaces
  github: "https://github.com/mdavid001",
  linkedin: "https://www.linkedin.com/in/michelle-ada-david-89885725b",
  cv: "assets/cv/Michelle_David_CV.pdf",
  play: "play/",
  // Free key from https://web3forms.com (enter your email, the key arrives by email)
  web3formsKey: "TODO_WEB3FORMS_ACCESS_KEY"
};

/* Tools shown as filter pills, in this order */
window.FILTERS = ["React", "TypeScript", "Next.js", "PostgreSQL", "Java", "Python", "Figma"];

window.PROJECTS = [
  /* ---------------------------------------------------- 1 */
  {
    id: "tonative",
    name: "Tonative",
    role: "AI Engineer (frontend)",
    dates: "Apr – Jul 2026",
    status: "",
    oneLiner: "Frontend for an AI translation dashboard, plus a company website upgrade.",
    summary: "Michelle David built the frontend of Tonative's AI translation dashboard in React, TypeScript and Redux Toolkit, and upgraded the company website.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "RTK Query"],
    links: { live: "[TODO: Tonative live URL]", code: "" },
    cover: { src: "assets/img/projects/tonative/cover.webp", alt: "Tonative translation dashboard showing an uploaded file and its translation status" },
    overview: [
      "During my time as an AI Engineer at Tonative I worked on two things: an upgrade of the company website, and the frontend of an AI translation dashboard.",
      "The dashboard takes a user from uploading a file to downloading the translated result, with every step in between visible: choosing and configuring the translation engine, watching the job's status, previewing results in a table, and finding past jobs in a history view."
    ],
    problem: [
      "Translation jobs take time and pass through several stages. Users need one place to start a job, see where it is, check the output and get the file back, without asking anyone what is happening."
    ],
    constraints: [
      "The dashboard had to work with the backend's existing translation status, results and download APIs.",
      "The website upgrade used Next.js with React Server Components, which brought a rendering conflict with the country flag icons (country-flag-icons) that had to be resolved."
    ],
    features: [
      "File upload to start a translation job",
      "Translation engine configuration",
      "Job status tracking while a file is processed",
      "Results preview table",
      "History view of past jobs",
      "Integration with the backend status, results and download APIs",
      "Company website upgraded with Next.js, TypeScript and Tailwind CSS"
    ],
    shots: [
      { src: "assets/img/projects/tonative/1.webp", alt: "Upload and engine configuration screen", caption: "Upload and engine settings" },
      { src: "assets/img/projects/tonative/2.webp", alt: "Job status and results preview table", caption: "Status and results preview" },
      { src: "assets/img/projects/tonative/3.webp", alt: "Upgraded Tonative company website", caption: "The upgraded website" }
    ],
    tech: [
      { name: "Next.js", use: "Company website" },
      { name: "React + TypeScript", use: "Dashboard UI" },
      { name: "Redux Toolkit", use: "App state" },
      { name: "RTK Query", use: "Calls to the status, results and download APIs" },
      { name: "Tailwind CSS", use: "Styling" }
    ],
    learned: ["[TODO: in your words. Prompts: what was hard about the RSC flag bug and how did you find the cause? What did RTK Query change about how you handle API data?]"]
  },

  /* ---------------------------------------------------- 2 */
  {
    id: "sibas",
    name: "SIBAS",
    role: "Database Administrator and Software Developer",
    dates: "Dec 2025 – present",
    status: "Group project",
    oneLiner: "Automated attendance for PAU's School of Science and Technology.",
    summary: "SIBAS replaces manual attendance at PAU's School of Science and Technology with a PostgreSQL and Streamlit system that tracks, scores and flags attendance per course.",
    tools: ["PostgreSQL", "Python", "Streamlit"],
    links: { live: "", code: "[TODO: GitHub repo URL, if public]" },
    cover: { src: "assets/img/projects/sibas/cover.webp", alt: "SIBAS attendance report with students below 80% flagged" },
    overview: [
      "SIBAS, the Student Information and Biometric Attendance System, is a group project for the School of Science and Technology at Pan-Atlantic University. It moves attendance from a manual process into a database, so the school can see each student's attendance per course at any time.",
      "My roles were database administrator and software developer. I designed the ER model and the fully normalised PostgreSQL schema, and worked on the Python and Streamlit app that administrators, lecturers and students use in the browser."
    ],
    problem: [
      "Attendance in the school was taken manually. A manual record is slow to collect, easy to get wrong, and hard to question: answering something simple, like which students have fallen below the 80% attendance requirement for a course, means going back through the records by hand.",
      "We set out to automate it: record attendance as it happens, keep it in one database, and let the system work out the scores and the flags."
    ],
    constraints: [
      "Three kinds of users, three sets of permissions. Administrators, lecturers and students each see and change only what their role allows.",
      "Student records are personal, so passwords are hashed, sessions are managed, and every query is parameterised to stop SQL injection.",
      "The rule is fixed: any student below 80% attendance in a course has to be flagged.",
      "People make mistakes in class, so lecturers need to be able to correct a session after it starts.",
      "Adding a whole class one student at a time isn't realistic, so registration has to work in bulk.",
      "It was a group project, so the schema had to be clear enough for everyone to build on."
    ],
    features: [
      "ER design and a fully normalised PostgreSQL schema",
      "Role-based access for Administrator, Lecturer and Student",
      "Secure sign-in: hashed passwords, session management, parameterised queries",
      "Lecturer-started attendance sessions, with manual corrections",
      "Per-course attendance scores, with students below 80% flagged",
      "Reports exported to CSV and PDF",
      "Bulk student registration by CSV upload"
    ],
    shots: [
      { src: "assets/img/projects/sibas/1.webp", alt: "SIBAS sign-in screen", caption: "Sign-in, with a role for each user" },
      { src: "assets/img/projects/sibas/2.webp", alt: "Lecturer starting an attendance session for a course", caption: "A lecturer starts a session" },
      { src: "assets/img/projects/sibas/3.webp", alt: "Attendance report with students below 80 percent flagged", caption: "Per-course report with the 80% flag" },
      { src: "assets/img/projects/sibas/4.webp", alt: "Administrator uploading a CSV of students", caption: "Bulk registration by CSV" }
    ],
    tech: [
      { name: "PostgreSQL", use: "Normalised schema, constraints and the attendance data" },
      { name: "Python", use: "App logic, authentication, scoring and exports" },
      { name: "Streamlit", use: "Browser frontend for all three roles" },
      { name: "CSV / PDF", use: "Bulk upload in, reports out" }
    ],
    learned: [
      "[TODO: your words. Prompt: what did normalising the schema teach you, and did it change anything once the app was built on it?]",
      "[TODO: your words. Prompt: what did you learn about security from hashing passwords and parameterising queries?]",
      "[TODO: your words. Prompt: what did working as the team's database person teach you about working in a group?]"
    ]
  },

  /* ---------------------------------------------------- 3 */
  {
    id: "sante",
    name: "Sante Diagnostics",
    role: "Developer",
    dates: "",
    status: "Course project · CSC310",
    oneLiner: "Lab information system with three roles and a test builder.",
    summary: "Sante Diagnostics is a Laboratory Information Management System in JavaFX and PostgreSQL, with three roles, a test builder and a payment-checked request queue.",
    tools: ["Java", "JavaFX", "PostgreSQL"],
    links: { live: "", code: "[TODO: GitHub repo URL, if public]" },
    cover: { src: "assets/img/projects/sante/cover.webp", alt: "Sante Diagnostics request queue shown as cards" },
    overview: [
      "Sante Diagnostics is a Laboratory Information Management System (LIMS) built for a PAU course (CSC310) as a JavaFX desktop app on a PostgreSQL database.",
      "It has three roles: a super admin who manages users and tests, lab attendants who work through test requests, and customers who request tests."
    ],
    problem: [
      "A diagnostics lab has to keep track of who requested which test, whether it has been paid for, and which tests it offers at all. This system puts those records, and the people who handle them, in one app."
    ],
    constraints: [
      "Three roles with different powers, from managing users to placing a request.",
      "New accounts must change their password on first sign-in, and accounts can be deactivated.",
      "Requests carry a payment confirmation step."
    ],
    features: [
      "User management with a forced password change on first login",
      "Account deactivation",
      "Test builder for managing the lab's test types",
      "Card-based request queue with payment confirmation",
      "Custom in-app dialogs"
    ],
    shots: [
      { src: "assets/img/projects/sante/1.webp", alt: "Sante sign-in and forced password change", caption: "First sign-in" },
      { src: "assets/img/projects/sante/2.webp", alt: "Test builder screen", caption: "Test builder" },
      { src: "assets/img/projects/sante/3.webp", alt: "Card-based request queue", caption: "Request queue" }
    ],
    tech: [
      { name: "Java + JavaFX", use: "Desktop app and UI" },
      { name: "PostgreSQL", use: "Users, tests and requests" }
    ],
    learned: ["[TODO: in your words]"]
  },

  /* ---------------------------------------------------- 4 */
  {
    id: "p2p",
    name: "P2P Tutorials",
    role: "Frontend developer",
    dates: "",
    status: "In progress",
    oneLiner: "Peer tutoring platform for PAU students, built from Figma designs.",
    summary: "P2P Tutorials is a React and TypeScript frontend for a PAU peer tutoring platform, with tutor and tutee sign-up and a dashboard.",
    tools: ["React", "TypeScript", "Figma"],
    links: { live: "", code: "[TODO: GitHub repo URL, if public]" },
    cover: { src: "assets/img/projects/p2p/cover.webp", alt: "P2P Tutorials sign-up screen with tutor and tutee options" },
    overview: [
      "P2P Tutorials is a peer tutoring platform for my school. I'm building the frontend in React and TypeScript from Figma designs; the backend is built separately.",
      "Students sign up as a tutor or a tutee, register for help or volunteer to give it, and manage things from a dashboard. There's also an FAQ page."
    ],
    problem: ["[TODO: one or two lines on why the school needs this. For example: how do students find a tutor today?]"],
    constraints: [
      "The UI follows the Figma designs.",
      "The frontend has to fit a backend that is being built separately."
    ],
    features: [
      "Tutor and tutee sign-up flows",
      "Register for tutoring or volunteer to tutor",
      "Dashboard",
      "FAQ page"
    ],
    shots: [
      { src: "assets/img/projects/p2p/1.webp", alt: "Tutor and tutee sign-up", caption: "Sign-up" },
      { src: "assets/img/projects/p2p/2.webp", alt: "P2P dashboard", caption: "Dashboard" }
    ],
    tech: [
      { name: "React + TypeScript", use: "Frontend" },
      { name: "Figma", use: "Source designs" }
    ],
    learned: ["[TODO: in your words]"]
  },

  /* ---------------------------------------------------- 5 */
  {
    id: "shopsphere",
    name: "ShopSphere",
    role: "Full-stack developer",
    dates: "2026",
    status: "Frontend complete",
    oneLiner: "E-commerce app with product listings, cart and checkout.",
    summary: "ShopSphere is a full-stack e-commerce app in React with REST APIs: product listings, cart management and checkout.",
    tools: ["React", "REST APIs"],
    links: { live: "[TODO: live URL, if deployed]", code: "[TODO: GitHub repo URL]" },
    cover: { src: "assets/img/projects/shopsphere/cover.webp", alt: "ShopSphere product listing page" },
    overview: [
      "ShopSphere is a full-stack e-commerce platform with product listings, cart management and checkout. The React frontend is complete and talks to backend services through RESTful APIs."
    ],
    problem: ["[TODO: who is ShopSphere for, or what did you want to practise with it?]"],
    constraints: ["[TODO: what made it hard? For example, keeping the cart in sync, or checkout steps]"],
    features: [
      "Product listings",
      "Cart management",
      "Checkout flow",
      "Responsive UI"
    ],
    shots: [
      { src: "assets/img/projects/shopsphere/1.webp", alt: "Product listings", caption: "Listings" },
      { src: "assets/img/projects/shopsphere/2.webp", alt: "Cart", caption: "Cart" },
      { src: "assets/img/projects/shopsphere/3.webp", alt: "Checkout", caption: "Checkout" }
    ],
    tech: [
      { name: "React", use: "Frontend" },
      { name: "REST APIs", use: "Backend services" }
    ],
    learned: ["[TODO: in your words]"]
  },

  /* ---------------------------------------------------- 6 */
  {
    id: "cinematch",
    name: "CineMatch",
    role: "Developer",
    dates: "2026",
    status: "",
    oneLiner: "Movie recommendations from collaborative and content-based filtering.",
    summary: "CineMatch is a deployed movie recommendation system that matches users with films using collaborative filtering and content-based algorithms.",
    tools: ["Machine learning", "Recommender systems"],
    links: { live: "[TODO: CineMatch live URL]", code: "[TODO: GitHub repo URL]" },
    cover: { src: "assets/img/projects/cinematch/cover.webp", alt: "CineMatch showing recommended films" },
    overview: [
      "CineMatch is a movie recommendation system that matches people with films based on their preferences. It combines collaborative filtering with content-based recommendation, and I built and deployed a frontend for it."
    ],
    problem: ["[TODO: one or two lines on the problem, for example choosing what to watch]"],
    constraints: ["[TODO: what made it hard? For example, data, cold start, or deployment]"],
    features: [
      "Collaborative filtering",
      "Content-based recommendations",
      "Web frontend",
      "Deployed online"
    ],
    shots: [
      { src: "assets/img/projects/cinematch/1.webp", alt: "CineMatch home", caption: "Home" },
      { src: "assets/img/projects/cinematch/2.webp", alt: "CineMatch recommendations", caption: "Recommendations" }
    ],
    tech: [
      { name: "[TODO: language and libraries]", use: "Recommendation model" },
      { name: "[TODO: frontend stack]", use: "Frontend" }
    ],
    learned: ["[TODO: in your words]"]
  },

  /* ---------------------------------------------------- 7 */
  {
    id: "pau-cafe",
    name: "PAU Café",
    role: "Developer",
    dates: "2026",
    status: "Course project · CSC310",
    oneLiner: "Desktop ordering app for the campus café, with a wallet and manager dashboard.",
    summary: "PAU Café is a JavaFX and PostgreSQL desktop app for ordering from the campus café, with role-based login, a wallet, order history and a manager dashboard.",
    tools: ["Java", "JavaFX", "PostgreSQL"],
    links: { live: "", code: "[TODO: GitHub repo URL, if public]" },
    cover: { src: "assets/img/projects/pau-cafe/cover.webp", alt: "PAU Café menu with items and a cart" },
    overview: [
      "PAU Café is a desktop ordering app for the university café, built in JavaFX on PostgreSQL for CSC310 (CA2).",
      "Students browse and search the menu, add items to a cart and pay from a wallet balance. Managers keep the menu up to date from their own dashboard."
    ],
    problem: ["[TODO: one or two lines on how ordering worked at the café before]"],
    constraints: [
      "Students and managers sign in to different views (role-based login).",
      "Orders are paid from a wallet, so the balance has to stay correct."
    ],
    features: [
      "Role-based login",
      "Menu search",
      "Cart",
      "Wallet balance",
      "Order history",
      "Manager dashboard with menu create, edit and delete"
    ],
    shots: [
      { src: "assets/img/projects/pau-cafe/1.webp", alt: "Menu and cart", caption: "Menu and cart" },
      { src: "assets/img/projects/pau-cafe/2.webp", alt: "Wallet and order history", caption: "Wallet and orders" },
      { src: "assets/img/projects/pau-cafe/3.webp", alt: "Manager dashboard", caption: "Manager dashboard" }
    ],
    tech: [
      { name: "Java + JavaFX", use: "Desktop app and UI" },
      { name: "PostgreSQL", use: "Menu, users, wallet and orders" }
    ],
    learned: ["[TODO: in your words]"]
  },

  /* ---------------------------------------------------- 8 */
  {
    id: "unipath",
    name: "Unipath 360",
    role: "Product designer and researcher",
    dates: "2025",
    status: "Concept",
    oneLiner: "A guidance app concept for Nigerian students applying to universities.",
    summary: "Unipath 360 is a mobile-first product concept that guides Nigerian secondary school students through university applications, designed in Figma with the NABC framework.",
    tools: ["Figma", "NABC framework", "UX research"],
    links: { live: "[TODO: Figma prototype link, if shareable]", code: "" },
    cover: { src: "assets/img/projects/unipath/cover.webp", alt: "Unipath 360 mobile prototype screens" },
    overview: [
      "Unipath 360 is a mobile-first platform concept for Nigerian secondary school students applying to university. I developed the product concept with the NABC framework (Need, Approach, Benefits, Competition) and designed the app in Figma, from wireframes to UI prototypes."
    ],
    problem: [
      "Many students face information gaps in the admissions process, and families often pay agents to fill them."
    ],
    constraints: [
      "Mobile-first: the audience is secondary school students.",
      "The concept needed a feasible value proposition, worked through with the NABC framework."
    ],
    features: [
      "Product concept built with the NABC framework",
      "End-to-end Figma wireframes",
      "UI prototypes for the mobile app",
      "Projected impact (estimates, not measured): about 40% fewer application errors, 60% less research time, and ₦400,000 to ₦900,000 saved per family in agent fees"
    ],
    shots: [
      { src: "assets/img/projects/unipath/1.webp", alt: "Unipath 360 wireframes", caption: "Wireframes" },
      { src: "assets/img/projects/unipath/2.webp", alt: "Unipath 360 prototype screens", caption: "Prototype" }
    ],
    tech: [
      { name: "Figma", use: "Wireframes and prototypes" },
      { name: "NABC framework", use: "Product concept" }
    ],
    learned: ["[TODO: in your words]"]
  },

  /* ---------------------------------------------------- 9 */
  {
    id: "victoria-simon",
    name: "Client portfolio site",
    role: "Web designer and developer",
    dates: "",
    status: "Domain coming",
    oneLiner: "Email marketing portfolio site for a client.",
    summary: "A portfolio website Michelle David designed and built for email marketer Victoria Simon, deployed on Vercel.",
    tools: ["Vercel", "React"],
    links: { live: "[TODO: live URL once the domain is ready]", code: "" },
    cover: { src: "assets/img/projects/victoria-simon/cover.webp", alt: "Adaeze Victoria Simon's email marketing portfolio home page" },
    overview: [
      "A portfolio website for Adaeze Victoria Simon to show her email marketing work to prospective clients. I designed and built it, and it is deployed on Vercel."
    ],
    problem: [
      "Adaeze's email marketing work was shown in a Canva portfolio, with her CV, certificates and testimonials kept separately.",
      "She needed one website of her own where e-commerce and beauty brands could see her work, read what she offers and contact her.",
    ],
    constraints: [
      "The design had to follow her brand palette: deep forest green, soft blush pink, warm cream, muted gold and charcoal.",
      "Her campaign samples were very long full-page email screenshots, so they had to be cropped to fit on the page.",
      "Content arrived in mixed formats: testimonials as images and a PDF, certificates as pictures with captions, and a logo supplied as one image holding three variations.",
      "Her contact details are public, so the site needed a safe way to receive messages without relying on people copying her email.",
      "The domain wasn't ready at launch, so the site went live on Vercel first."
    ],
    features: [
      "Services section with icons",
      "Featured work with clickable images, each with context",
      "A Google Drive link on each project to show more of her work",
      "Tools shown as pills",
      "Testimonials",
      "Certificates that open full size when tapped",
      "CV preview before download, plus a download link",
      "FAQ section",
      "Contact form that sends messages straight to her email",
      "Footer bar with her email, phone and LinkedIn",
      "Her photos and logo used across the site"
    ],
    shots: [
      { src: "assets/img/projects/victoria-simon/1.webp", alt: "Client site home page", caption: "Home" },
      { src: "assets/img/projects/victoria-simon/2.webp", alt: "Client site work samples", caption: "Work samples" }
    ],
    tech: [
      { name: "React + Next js", use: "Site" },
      { name: "Vercel", use: "Hosting" }
    ],
    learned: ["[TODO: in your words]"]
  }
];
