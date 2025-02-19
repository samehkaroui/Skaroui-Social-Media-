import { useEffect, useState } from "react";
import { fetchNews } from "../services/NewsAPI";

const GlobalNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNews = async () => {
            setLoading(true);
            const newsData = await fetchNews();
            if (newsData.length > 0) {
                setNews(newsData);
            } else {
                setError("No news available");
            }
            setLoading(false);
        };

        getNews();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📰 Global News</h1>

            {loading && <p>Loading news...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {news.length > 0 ? (
                <ul className="space-y-6">
                    {news.map((article, index) => (
                        <li key={index} className="border p-4 rounded-lg">
                            <h2 className="text-lg font-bold">{article.title}</h2>
                            {article.urlToImage && (
                                <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover mt-2 rounded-lg" />
                            )}
                            <p className="text-sm text-gray-600">{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                Read more
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
};

export default GlobalNews;
