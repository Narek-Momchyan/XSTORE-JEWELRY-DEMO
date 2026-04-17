import axios from "axios";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://crud-backend-1-izw0.onrender.com"
})
