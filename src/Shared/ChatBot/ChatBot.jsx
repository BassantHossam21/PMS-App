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
  const botSuggestedAlready = messages.some(
    (msg) => msg.text.includes("Try asking:")
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
          const { activatedEmployeeCount = 0, deactivatedEmployeeCount = 0 } = res || {};
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
          reply = "This website is a Project Management System (PMS) that helps you manage projects, tasks, and employees efficiently.";
          break;
        }

        case "SITE_USAGE": {
          reply = "You can use this website to create projects, assign tasks, track progress, and monitor team performance. Managers have extra privileges to add or manage employees.";
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
        className="fixed bottom-6 right-6 bg-[#0e382f] text-white w-14 h-14 rounded-full shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col">
          <div className="bg-[#0e382f] text-white p-3 rounded-t-xl">
            PMS Assistant
          </div>

          <div className="p-3 h-64 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user" ? "bg-[#0e382f] text-white" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && <p className="text-gray-400">typing...</p>}
          </div>

          <div className="flex p-2 gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-2"
              placeholder="Ask about projects, tasks, or website info..."
            />
            <button
              onClick={sendMessage}
              className="bg-[#0e382f] text-white px-3 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
