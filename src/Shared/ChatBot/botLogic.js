// src/Shared/ChatBot/botLogic.js
export const detectIntent = (message) => {
  const text = message.toLowerCase();

  // Projects
  if (text.includes("my projects")) return "NAV_PROJECTS";
  if (text.includes("new project")) return "NAV_CREATE_PROJECT";

  // Tasks
  if (text.includes("my tasks")) return "NAV_TASKS";
  if (text.includes("task count")) return "TASK_COUNT";

  // Users
  if (text.includes("user count")) return "USER_COUNT";
  if (text.includes("who am i")) return "CURRENT_USER";

  // Suggested questions
  if (text.includes("what is this website about")) return "SITE_INFO";
  if (text.includes("how can i use it")) return "SITE_USAGE";

  return "UNKNOWN";
};
