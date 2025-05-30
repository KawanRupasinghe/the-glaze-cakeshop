import axios from 'axios';

import API_BASE_URL from "../config.jsx";

class ProductService {
    getAllProductTypes() {
        return axios.get(`${API_BASE_URL}/productType/all`);
    }
}

export default new ProductService();