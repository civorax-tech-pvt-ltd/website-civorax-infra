export type TeamMember = {
  slug: string;
  name: string;
  qualification: string;
  role: string;
  expertise: string[];
  department: string;
  image?: string;
  linkedin?: string;
};

export type TeamDepartment = {
  slug: string;
  label: string;
  description: string;
};

export const teamDepartments: TeamDepartment[] = [
  {
    slug: "architecture-design",
    label: "Architecture & Design",
    description:
      "Designing spaces that are functional, sustainable, and visually timeless.",
  },
  {
    slug: "engineering",
    label: "Engineering",
    description:
      "Structural and technical engineering that keeps every project safe and buildable.",
  },
  {
    slug: "construction-site",
    label: "Construction & Site Operations",
    description:
      "Hands-on execution, supervision, and quality at the construction site.",
  },
  {
    slug: "project-planning",
    label: "Project Planning",
    description:
      "Schedules, coordination, and decision-making that keep projects on track.",
  },
  {
    slug: "interior-design",
    label: "Interior Design",
    description:
      "Practical, premium interior direction for homes, offices, and commercial spaces.",
  },
  {
    slug: "3d-visualization",
    label: "3D Visualization",
    description:
      "Visual concepts and renders that help clients see design before execution.",
  },
  {
    slug: "quantity-surveying",
    label: "Quantity Surveying",
    description:
      "BOQ, estimation, and cost guidance that keeps scope and budget aligned.",
  },
  {
    slug: "administration-finance",
    label: "Administration & Finance",
    description:
      "Finance, compliance, and the operational backbone of the company.",
  },
   {
    slug: "it-systems",
    label: "IT and Systems",
    description:
      "Research and development, IT systems and digital infrastructure for project delivery.",
  },
  {
    slug: "client-relations",
    label: "Client Relations",
    description:
      "Communication, follow-ups, and a clear point of contact for every client.",
  },
  
  {
    slug: "documentation-support",
    label: "Documentation & Support",
    description:
      "Records, drawings, and documentation that keep every project organized.",
  },
 
];

export const teamMembers: TeamMember[] = [
  // Architecture & Design


  {
    slug: "ranju-sodari",
    name: "Ranju Sodari",
    qualification: "Bachelor of Architecture",
    role: "Architect",
    expertise: ["Residential Design", "Concept Design"],
    department: "architecture-design",
    image: "/images/team/webp_images/RanjuSodari.webp",
  },
  {
    slug: "kabita-parsain",
    name: "Kabita Prasain",
    qualification: "Bachelor of Architecture",
    role: "Architect",
    expertise: ["Residential Design", "Concept Design"],
    department: "architecture-design",
    image: "/images/team/webp_images/KabitaParsain.webp",
  },





  // Engineering
  {
    slug: "anij-bhandari",
    name: "Anij Bhandari",
    qualification: "B.E. Civil Engineering",
    role: "Structural Engineer",
    expertise: ["Structural Design", "RCC Design", "Steel Structures"],
    department: "engineering",
    image: "/images/team/webp_images/Anij Bhandari.webp",
  },



  // Construction & Site Operations

  {
    slug: "bharat-dhakal",
    name: "Bharat Dhakal",
    qualification: "B.E. Civil Engineering",
    role: "Site Engineer",
    expertise: ["BOQ", "Estimation"],
    department: "construction-site",
    image: "/images/team/webp_images/Bharatdhakal.webp",
  },
  {
    slug: "Bipul-chaudhary",
    name: "Bipul Chaudhary",
    qualification: "Diploma in Civil Engineering",
    role: "Construction Supervisor",
    expertise: ["Site Supervision", "Vendor Coordination", "Safety"],
    department: "construction-site",
    image: "/images/team/webp_images/BipulChaudhary.webp",
  },


  // Project Planning
  {
    slug: "Divash Chaudhary",
    name: "Divash Chaudhary",
    qualification: "MBA, Project Management",
    role: "Project Planner",
    expertise: ["Project Planner", "Planning", "Client Updates"],
    department: "project-planning",
    image: "/images/team/webp_images/Diwas_Chaudhary.webp",
  },
  {
    slug: "pujan-rajbanshi",
    name: "Pujan Rajbanshi",
    qualification: "BBA, Operations",
    role: "Project Coordinator",
    expertise: ["Scheduling", "Coordination", "Estimation"],
    department: "project-planning",
    image: "/images/team/webp_images/PujanRajbanshi.webp",
  },

  // Interior Design
 
  {
    slug: "Sabin BK",
    name: "Sabin BK",
    qualification: "Diploma in Interior Design",
    role: "Interior Designer",
    expertise: ["Commercial", "Renovation", "Furniture Layout"],
    department: "interior-design",
    image: "/images/team/webp_images/Sabin_BK.webp",
  },

  // 3D Visualization
    {
    slug: "dheeraj-uparkoti",
    name: "Dheeraj Uparkoti",
    qualification: "B.E. Civil Engineering",
    role: "3D Visualization & Design",
    expertise: ["Steel Structures", "RCC Design", "Site Supervision"],
    department: "3d-visualization",
    image: "/images/team/webp_images/DheerajUparkoti.webp",
  },


  // Quantity Surveying
    {
    slug: "ashish-poudel",
    name: "Ashish Poudel",
    qualification: "B.E. Civil Engineering",
    role: "Quantity Surveyor",
    expertise: ["BOQ", "Estimation", "Cost Planning"],
    department: "quantity-surveying",
    image: "/images/team/webp_images/AshishPoudel.webp",
  },


  // Administration & Finance
 {
    slug: "babin-thapa",
    name: "Babin Thapa",
    qualification: "MBA, Finance",
    role: "Finance & Admin",
    expertise: ["Finance", "Operations", "Administration"],
    department: "administration-finance",
    image: "/images/team/webp_images/BabinThapa.webp",
  },
//  IT and Systems
  {
    slug: "saugat-dhungana",
    name: "Saugat Dhungana",
    qualification: "Computer Engineering",
    role: "Research and Analyst",
    expertise: ["IT Systems", "Research and Development", "Systems"],
    department: "it-systems",
    image: "/images/team/webp_images/SaugatDhungana.webp",
  },
  {
    slug: "shishir-uparkoti",
    name: "Shishir Uparkoti",
    qualification: "B.E. Civil Engineering",
    role: "System Maintainence",
    expertise: ["Documentation", "Drawings"],
    department: "it-systems",
    image: "/images/team/webp_images/ShisirUparkoti.webp",
  },
  // Client Relations
   {
    slug: "Sudip-Bhandari",
    name: "Sudip Bhandari",
    qualification: "BBA",
    role: "Client Relations",
    expertise: ["Client Support", "Communication", "Follow-ups"],
    department: "client-relations",
    image: "/images/team/webp_images/Sudip  Bhandari.webp",
  },
  // {
  //   slug: "Sujan-Karki",
  //   name: "Sujan Karki",
  //   qualification: "BBA",
  //   role: "Client Relations",
  //   expertise: ["Client Support", "Communication", "Follow-ups"],
  //   department: "client-relations",
  //   image: avatar("men/22"),
  // },

  // Documentation & Support
  // {
  //   slug: "arun-khadka",
  //   name: "Arun Khadka",
  //   qualification: "B.E. Civil Engineering",
  //   role: "Documentation Engineer",
  //   expertise: ["Documentation", "Drawings", "Records"],
  //   department: "documentation-support",
  //   image: avatar("men/85"),
  // },




];

export const teamMembersByDepartment = (slug: string) =>
  teamMembers.filter((member) => member.department === slug);

export const getTeamMemberBySlug = (slug: string) =>
  teamMembers.find((member) => member.slug === slug);
