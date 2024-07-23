import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect,
} from "react";
import axios from "axios";

const GiphyContext = createContext();

export const useGiphy = () => useContext(GiphyContext);

export const GiphyProvider = ({ children }) => {
    const [gifs, setGifs] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const searchGifs = useCallback(async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://api.giphy.com/v1/gifs/search?api_key=d6flSJfuEbzzbwMDjfFaOgeOHLkeTNl1&q=${query}&limit=50`
            );
            setGifs(response.data.data);
        } catch (err) {
            setError("Error fetching gifs");
        } finally {
            setLoading(false);
        }
    }, []);

    const addToFavorites = (gif) => {
        setFavorites((prev) => {
            if (!prev.some((favGif) => favGif.id === gif.id)) {
                return [...prev, gif];
            }
            return prev;
        });
    };

    const removeFromFavorites = (id) => {
        setFavorites((prev) => prev.filter((gif) => gif.id !== id));
    };

    return (
        <GiphyContext.Provider
            value={{
                gifs,
                favorites,
                loading,
                error,
                searchGifs,
                addToFavorites,
                removeFromFavorites,
            }}
        >
            {children}
        </GiphyContext.Provider>
    );
};

export default GiphyProvider;
