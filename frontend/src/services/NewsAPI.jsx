import axios from "axios";

const API_KEY = "4b5610d37d814811ae169e1c7c9069ff"; // 🔥 Replace with your API key
const BASE_URL = "https://newsapi.org/v2";

export const fetchNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/top-headlines`, {
            params: {
                maxResults: 100,
                country: "us", // Change for other countries (e.g., "fr" for France)
                category: "general",
                apiKey: API_KEY,
            },
        });
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
