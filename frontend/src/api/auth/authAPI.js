
export const loginAPI = async (credentials) => {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    // Make sure to parse the response body as JSON
    const data = await response.json();

    // Ensure the response contains the 'user' and 'token' fields
    if (data.token && data.user) {
        return { user: data.user, token: data.token }; // Returning the necessary fields
    } else {
        throw new Error("Invalid response data");
    }
  };
  
  export const registerAPI = async (credentials) => {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    // Make sure to parse the response body as JSON
    const data = await response.json();

    // Ensure the response contains the 'user' and 'token' fields
    if (data.token && data.user) {
        return { user: data.user, token: data.token }; // Returning the necessary fields
    } else {
        throw new Error("Invalid response data");
    }
  };
  

  