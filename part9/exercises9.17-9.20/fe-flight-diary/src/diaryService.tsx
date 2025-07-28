import axios from "axios";
import type { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const handleApiError = (error: unknown, operation: string): never => {
  if (axios.isAxiosError(error)) {
    // Handle different types of axios errors
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data || error.message;
      throw new Error(`Failed to ${operation}: ${error.response.status} - ${errorMessage}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error(`Failed to ${operation}: No response from server. Please check if the server is running.`);
    } else {
      // Something else happened
      throw new Error(`Failed to ${operation}: ${error.message}`);
    }
  } else {
    // Non-axios error
    throw new Error(`Failed to ${operation}: An unexpected error occurred`);
  }
};

export const getEntries = async (): Promise<NonSensitiveDiaryEntry[]> => {
  try {
    const response = await api.get<NonSensitiveDiaryEntry[]>("/diaries");
    return response.data;
  } catch (error) {
    return handleApiError(error, "fetch entries");
  }
};

export const addEntry = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const response = await api.post<DiaryEntry>("/diaries", entry);
    return response.data;
  } catch (error) {
    return handleApiError(error, "add entry");
  }
};
