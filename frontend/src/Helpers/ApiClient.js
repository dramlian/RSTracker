import { toast } from 'react-toastify';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  hasToken() {
    return !!this.token;
  }

  async request(method, suffix, data = null, shouldToast = false) {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (this.token) {
        options.headers["Authorization"] = `Bearer ${this.token}`;
      }

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${this.baseUrl}/${suffix}`, options);
      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.error);
        throw new Error(`${method} request failed: ${response.statusText}`);
      }

      if (shouldToast) {
        toast.success(responseData.message);
      }

      return responseData;
    } catch (error) {
      console.error(`Error in ${method} request:`, error);
      throw error;
    }
  }

  get(suffix) {
    return this.request("GET", suffix);
  }

  post(suffix, data) {
    return this.request("POST", suffix, data, true);
  }

  put(suffix, data) {
    return this.request("PUT", suffix, data, true);
  }

  delete(suffix) {
    return this.request("DELETE", suffix, null, true);
  }
}

const api = new ApiClient("https://rstracker-api.kindcoast-63f12bd5.polandcentral.azurecontainerapps.io/player");
export default api;
