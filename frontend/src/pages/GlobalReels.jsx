import { useEffect, useState } from "react";
import axios from "axios";

const GlobalReels = () => {
    const [reels, setReels] = useState([]);
    const API_KEY = "AIzaSyAAVJO_mFYISBBgJIA6V64b-i0ps-etIYM"; // Replace with your actual API key

    useEffect(() => {
        const fetchReels = async () => {
            try {
                const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                    params: {
                        part: "snippet",
                        maxResults: 100,
                        type: "video",
                        videoDuration: "short", // Fetch only short videos (YouTube Shorts)
                        key: API_KEY,
                    },
                });
                setReels(response.data.items);
            } catch (error) {
                console.error("Error fetching YouTube Shorts:", error);
            }
        };

        fetchReels();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">🎥 Global Reels</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {reels.length > 0 ? (
                    reels.map((reel) => (
                        <div key={reel.id.videoId} className="border p-2 rounded-lg shadow">
                            <iframe
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${reel.id.videoId}`}
                                title={reel.snippet.title}
                                allowFullScreen
                                className="rounded-lg"
                            ></iframe>
                            <p className="text-sm mt-2">{reel.snippet.title}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Loading reels...</p>
                )}
            </div>
        </div>
    );
};

export default GlobalReels;
