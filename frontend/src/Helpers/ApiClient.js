class ApiClient {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async request(method, suffix, data = null) {
      try {
        const options = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        if (data) {
          options.body = JSON.stringify(data);
        }
  
        const response = await fetch(`${this.baseUrl}/${suffix}`, options);
  
        if (!response.ok) {
          throw new Error(`${method} request failed: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error(`Error in ${method} request:`, error);
        throw error;
      }
    }
  
    get(suffix) {
      return this.request("GET", suffix);
    }
  
    post(suffix, data) {
      return this.request("POST", suffix, data);
    }
  
    put(suffix, data) {
      return this.request("PUT", suffix, data);
    }
  
    delete(suffix) {
      return this.request("DELETE", suffix);
    }
  }
  
  export default new ApiClient("http://localhost:5001/player");