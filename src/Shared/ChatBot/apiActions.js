// src/Shared/ChatBot/apiActions.js
import axiosClient from "../../Utils/AxoisClient";

export const handleIntent = async (intent) => {
  switch (intent) {
    case "TASK_COUNT": {
      const res = await axiosClient.get("/Task/count");
      return res.data; // { toDo, inProgress, done }
    }

    case "USER_COUNT": {
      const res = await axiosClient.get("/Users/count");
      return res.data; // { activatedEmployeeCount, deactivatedEmployeeCount }
    }

    case "CURRENT_USER": {
      const res = await axiosClient.get("/Users/currentUser");
      return res.data; // { userName, role, ... }
    }

    default:
      return null;
  }
};
