import axios from 'axios';

import API_BASE_URL from "../config.jsx";
class OrderService {
    saveOrder() {
        return axios.get(`${API_BASE_URL}/order/save`);
    }
}

export default new OrderService();