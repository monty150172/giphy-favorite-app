import React, { useState, useEffect, useCallback, useRef } from "react";
import { GiphyProvider, useGiphy } from "./logic";
import Search from "./components/Search";
import GifContainer from "./components/GifContainer";
import "./App.css";

function GifGrid({
    gifs,
    onAddToFavorites,
    onRemoveFromFavorites,
    isFavoriteView,
    loadMore,
}) {
    const observer = useRef();
    const lastGifElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isFavoriteView) {
                    loadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loadMore, isFavoriteView]
    );

    return (
        <div className="gif-grid">
            {gifs.map((gif, index) => (
                <div
                    key={gif.id}
                    ref={index === gifs.length - 1 ? lastGifElementRef : null}
                >
                    <GifContainer
                        gif={gif}
                        onAddToFavorites={onAddToFavorites}
                        onRemoveFromFavorites={onRemoveFromFavorites}
                        isFavorite={isFavoriteView}
                    />
                </div>
            ))}
        </div>
    );
}

function AppContent() {
    const [showFavorites, setShowFavorites] = useState(false);
    const {
        gifs,
        favorites,
        loading,
        error,
        searchGifs,
        addToFavorites,
        removeFromFavorites,
        loadMoreGifs,
    } = useGiphy();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!showFavorites) {
            searchGifs("trending");
        }
    }, [searchGifs, showFavorites]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        searchGifs(query);
    };

    const handleLoadMore = useCallback(() => {
        if (!showFavorites) {
            loadMoreGifs(searchQuery);
        }
    }, [loadMoreGifs, showFavorites, searchQuery]);

    return (
        <div className="app-content">
            <h1>
                FavoriteGiphy{" "}
                <span role="img" aria-label="heart">
                    ❤️
                </span>
            </h1>
            <div className="nav-buttons">
                <button
                    onClick={() => setShowFavorites(false)}
                    className={!showFavorites ? "active" : ""}
                >
                    Feed
                </button>
                <button
                    onClick={() => setShowFavorites(true)}
                    className={showFavorites ? "active" : ""}
                >
                    Favorites
                </button>
            </div>
            <Search onSearch={handleSearch} />
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <GifGrid
                gifs={showFavorites ? favorites : gifs}
                onAddToFavorites={addToFavorites}
                onRemoveFromFavorites={removeFromFavorites}
                isFavoriteView={showFavorites}
                loadMore={handleLoadMore}
            />
        </div>
    );
}

function App() {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <GiphyProvider>
            <div className={`app ${theme}`}>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
                <AppContent />
            </div>
        </GiphyProvider>
    );
}

export default App;
