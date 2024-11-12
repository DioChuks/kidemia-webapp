export const getAuthToken = (): string | null => {
    const session = sessionStorage.getItem("userData");
    if (session) {
      try {
        const parsedSession = JSON.parse(session); // Parse the session data
        return parsedSession?.token || null; // Return token or null if not found
      } catch (error) {
        console.error("Error parsing userData:", error);
        return null; // Return null if there's an error parsing the session data
      }
    }
    return null; // Return null if no session is found
  };
  