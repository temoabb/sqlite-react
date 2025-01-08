export interface TaskEntity {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export type TaskStatus = "completed" | "incomplete";

export const TASKS: TaskEntity[] = [
  {
    id: 1,
    title: "Project Alpha",
    description: "Initial phase of the Alpha project.",
    isCompleted: true,
  },
  {
    id: 2,
    title: "Market Research",
    description: "Conduct a thorough analysis of market trends.",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Prototype Design",
    description: "Create an interactive prototype for testing.",
    isCompleted: true,
  },
  {
    id: 4,
    title: "Budget Planning",
    description: "Prepare the financial plan for the upcoming quarter.",
    isCompleted: false,
  },
  {
    id: 5,
    title: "Team Onboarding",
    description: "Introduce new members to the project framework.",
    isCompleted: true,
  },
  {
    id: 6,
    title: "Risk Assessment",
    description: "Evaluate potential risks and mitigation strategies.",
    isCompleted: false,
  },
  {
    id: 7,
    title: "Client Feedback",
    description: "Incorporate client feedback into project deliverables.",
    isCompleted: true,
  },
  {
    id: 8,
    title: "UI Enhancements",
    description: "Improve the user interface for better accessibility.",
    isCompleted: false,
  },
  {
    id: 9,
    title: "Code Review",
    description: "Perform a detailed review of the application code.",
    isCompleted: true,
  },
  {
    id: 10,
    title: "System Testing",
    description: "Conduct end-to-end testing for system stability.",
    isCompleted: false,
  },
  {
    id: 11,
    title: "Launch Prep",
    description: "Finalize all tasks in preparation for the launch.",
    isCompleted: true,
  },
  {
    id: 12,
    title: "Documentation",
    description: "Compile detailed project documentation.",
    isCompleted: false,
  },
  {
    id: 13,
    title: "Marketing Campaign",
    description: "Develop a strategic plan for the marketing campaign.",
    isCompleted: true,
  },
  {
    id: 14,
    title: "Performance Review",
    description: "Assess the performance of the deployed features.",
    isCompleted: false,
  },
  {
    id: 15,
    title: "Customer Support",
    description: "Set up support channels for customer queries.",
    isCompleted: true,
  },
  {
    id: 16,
    title: "Backend Optimization",
    description: "Enhance the backend for faster response times.",
    isCompleted: false,
  },
  {
    id: 17,
    title: "Security Audit",
    description: "Conduct a thorough audit of application security.",
    isCompleted: true,
  },
  {
    id: 18,
    title: "Data Migration",
    description: "Transfer legacy data to the new system.",
    isCompleted: false,
  },
  {
    id: 19,
    title: "Training Sessions",
    description: "Organize training for team members on new tools.",
    isCompleted: true,
  },
  {
    id: 20,
    title: "Post-Launch Review",
    description: "Analyze project outcomes after the official launch.",
    isCompleted: false,
  },
];
