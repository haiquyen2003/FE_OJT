import customAxios from "./customAxios";

// API liên quan đến người dùng: đăng nhập và đăng ký
const AuthAPI = {
  // API đăng nhập
  login: async (email, password) => {
    try {
      const response = await customAxios.post("/Account/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login error: ", error);
      // Ném lỗi với response gốc để xử lý ở component
      throw error;
    }
  },
  
  loginWithGoogle: async () => {
    try {
      // Điều hướng người dùng đến Google login page
      window.location.href = "https://localhost:7253/api/Account/login-google";
      
      // Khi Google xác thực thành công, backend sẽ trả về JSON
      // Sau đó, bạn có thể bắt thông tin ở phần khác (trong frontend, sau khi Google trả về redirect).
    } catch (error) {
      console.error("Google Login error: ", error);
      throw error;
    }
  },
  
  // API đăng ký
  register: async (username, email, password) => {
    try {
      const response = await customAxios.post("/Account/register", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Register error: ", error);
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await customAxios.post("/Account/forgot-password", {
        email,
        clienUrl: "http://localhost:3000/resetpass",
      });
      return response.data;
    } catch (error) {
      console.error("Forgot Password error: ", error);
      throw error;
    }
  },

  resetPassword: async (token, password, confirmPassword, email) => {
    try {
      const response = await customAxios.post("/Account/reset-password", {
        password,
        confirmPassword,
        email,
        token,
      });
      return response.data;
    } catch (error) {
      console.error("Reset Password error: ", error);
      throw error;
    }
  },
};

export default AuthAPI;
