import axios from "axios";

// Tạo một instance axios với cấu hình cơ bản
const customAxios = axios.create({
  baseURL: "https://localhost:7253/api", // URL của API backend
  timeout: 10000, // Thời gian chờ tối đa cho mỗi request (10 giây)
  withCredentials: true, // Cho phép gửi cookie cùng với request
});

// Interceptor cho request: thêm token xác thực nếu có
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi xảy ra trước khi gửi request
    return Promise.reject(error);
  }
);

// Interceptor cho response: xử lý lỗi hoặc thực hiện các hành động sau khi nhận response
customAxios.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu nếu request thành công
    return response;
  },
  (error) => {
    // Xử lý các trường hợp lỗi
    if (error.response) {
      // Trường hợp có phản hồi từ server nhưng là lỗi
      switch (error.response.status) {
        case 401:
          // Nếu không có quyền truy cập, có thể redirect đến trang đăng nhập
          console.error("Unauthorized, redirecting to login...");
          // window.location.href = "/sign-in";
          break;
        case 403:
          console.error("Forbidden, you do not have permission to access this resource.");
          break;
        case 500:
          console.error("Server error, please try again later.");
          break;
        default:
          console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      }
    } else if (error.request) {
      // Trường hợp không nhận được phản hồi từ server
      console.error("No response from server, please check your network.");
    } else {
      // Lỗi xảy ra khi tạo request
      console.error("Error in request setup: ", error.message);
    }

    return Promise.reject(error);
  }
);

export default customAxios; // Xuất instance để sử dụng trong các file khác
