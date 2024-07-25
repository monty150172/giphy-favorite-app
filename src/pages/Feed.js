import React, { useEffect } from "react";
import { useGiphy } from "../logic";
import GifContainer from "../components/GifContainer";
function Feed() {
    const { gifs, loading, error, searchGifs, addToFavorites } = useGiphy();

    useEffect(() => {
        searchGifs("trending");
    }, [searchGifs]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="feed">
            <h2>Feed</h2>
            <div className="gif-grid">
                {gifs.map((gif) => (
                    <GifContainer
                        key={gif.id}
                        gif={gif}
                        onAddToFavorites={addToFavorites}
                        isFavorite={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default Feed;
