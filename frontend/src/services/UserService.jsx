import axios from 'axios';
import API_BASE_URL from "../config.jsx";


class UserService {
    createUser(User) {
        return axios.post(`${API_BASE_URL}/api/customer`, User);
    }

    createCustomerProfile(customer) {
        return axios.post(`${API_BASE_URL}/api/customerProfile`, customer);
    }

    sendVerificationCode(Email){
        return axios.post(`${API_BASE_URL}/api/code`, Email);
    }

    validateCode(verificationCode){
        return axios.post(`${API_BASE_URL}/api/verifyCode`, verificationCode);
    }
    ResetPassword(passwordResetDto) {
        return axios.put(`${API_BASE_URL}/api/customer`, passwordResetDto, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

export default new UserService();
