// src/Shared/ChatBot/ChatBot.jsx
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { detectIntent } from "./botLogic";
import { handleIntent } from "./apiActions";
import { AuthContext } from "../../Context/AuthContext";

export default function ChatBot() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I'm your Project Management Assistant!" },
  ]);

  // Suggested messages based on role
  useEffect(() => {
    if (!user) return;

    // منع تكرار الرسائل
    const botSuggestedAlready = messages.some((msg) =>
      msg.text.includes("Try asking:"),
    );
    if (botSuggestedAlready) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text:
          user.userGroup === "Manager"
            ? "Try asking:\n- My projects\n- New project\n- Task count\n- User count\n- Project status\n- Who is assigned to my project?\n- What is this website about?\n- How can I use it?"
            : "Try asking:\n- user count\n-  My tasks\n- Task count\n- My projects\n- Who am I?\n- What is this website about?\n- How can I use it?",
      },
    ]);
  }, [user, messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    const intent = detectIntent(userMsg);

    // Role permissions
    if (intent === "NAV_CREATE_PROJECT" && user?.role !== "Manager") {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Only managers can create a new project." },
      ]);
      setLoading(false);
      return;
    }

    // Navigation
    if (intent === "NAV_PROJECTS") {
      navigate("/dashboard/projects");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Opened your projects 👌" },
      ]);
      setLoading(false);
      return;
    }

    if (intent === "NAV_TASKS") {
      navigate("/dashboard/tasks");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Opened tasks ✅" },
      ]);
      setLoading(false);
      return;
    }

    if (intent === "NAV_CREATE_PROJECT") {
      navigate("/dashboard/projects/create");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Let's create a new project 🚀" },
      ]);
      setLoading(false);
      return;
    }

    // API Calls or suggested questions
    try {
      const res = await handleIntent(intent);

      let reply = "I need more details 🤔";

      switch (intent) {
        case "TASK_COUNT": {
          const { toDo = 0, inProgress = 0, done = 0 } = res || {};
          reply = `Tasks:\nTo Do: ${toDo}\nIn Progress: ${inProgress}\nDone: ${done}`;
          break;
        }

        case "USER_COUNT": {
          const { activatedEmployeeCount = 0, deactivatedEmployeeCount = 0 } =
            res || {};
          const total = activatedEmployeeCount + deactivatedEmployeeCount;
          reply = `Users:\nTotal: ${total}\nActive: ${activatedEmployeeCount}\nInactive: ${deactivatedEmployeeCount}`;
          break;
        }

        case "CURRENT_USER": {
          const userName = res?.userName ?? res?.name ?? "User";
          reply = `Hello ${userName} 😊`;
          break;
        }

        case "SITE_INFO": {
          reply =
            "This website is a Project Management System (PMS) that helps you manage projects, tasks, and employees efficiently.";
          break;
        }

        case "SITE_USAGE": {
          reply =
            "You can use this website to create projects, assign tasks, track progress, and monitor team performance. Managers have extra privileges to add or manage employees.";
          break;
        }

        default:
          reply = "I didn't understand that. Could you please clarify?";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong ❌ Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Open button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#0E382F] dark:bg-(--sidebar-bg) text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all z-50 border-2 border-white/10 dark:border-(--border-dim)"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-(--bg-card) rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 dark:border-(--border-dim) transition-all duration-300 overflow-hidden">
          {/* Header */}
          <div className="bg-[#0E382F] dark:bg-(--sidebar-bg) text-white p-4 font-bold flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>PMS Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-80 overflow-y-auto text-sm space-y-4 bg-[#F8F9FB] dark:bg-(--bg-card)">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-[#0E382F] dark:bg-emerald-700 text-white rounded-tr-none"
                      : "bg-white dark:bg-(--bg-surface) text-gray-800 dark:text-(--text-primary) rounded-tl-none border border-gray-100 dark:border-(--border-dim)"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <p className="text-gray-400 dark:text-emerald-500/60 animate-pulse font-medium italic">
                  typing...
                </p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex p-4 gap-2 border-t border-gray-100 dark:border-(--border-dim) bg-white dark:bg-(--bg-card)">
            <input
              value={input}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-(--bg-surface) border border-gray-200 dark:border-(--border-strong) rounded-xl px-4 py-2 text-gray-900 dark:text-(--text-primary) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
              placeholder="Ask anything..."
            />
            <button
              onClick={sendMessage}
              className="bg-[#0E382F] dark:bg-emerald-600 text-white px-4 rounded-xl font-bold hover:bg-[#1a4d43] dark:hover:bg-emerald-500 transition-all active:scale-95 shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
