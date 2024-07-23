// src/components/GifGrid.js
import React from "react";
import GifContainer from "./GifContainer";
import "./GifContainer.css";

function GifGrid({
    gifs,
    onAddToFavorites,
    onRemoveFromFavorites,
    isFavoriteView,
}) {
    const leftColumnGifs = gifs.filter((_, index) => index % 2 === 0);
    const rightColumnGifs = gifs.filter((_, index) => index % 2 !== 0);

    return (
        <div className="gif-grid">
            <div className="gif-column">
                {leftColumnGifs.map((gif) => (
                    <GifContainer
                        key={gif.id}
                        gif={gif}
                        onAddToFavorites={onAddToFavorites}
                        onRemoveFromFavorites={onRemoveFromFavorites}
                        isFavorite={isFavoriteView}
                    />
                ))}
            </div>
            <div className="gif-column">
                {rightColumnGifs.map((gif) => (
                    <GifContainer
                        key={gif.id}
                        gif={gif}
                        onAddToFavorites={onAddToFavorites}
                        onRemoveFromFavorites={onRemoveFromFavorites}
                        isFavorite={isFavoriteView}
                    />
                ))}
            </div>
        </div>
    );
}

export default GifGrid;
