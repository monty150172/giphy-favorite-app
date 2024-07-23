import React from "react";
import "./GifContainer.css";

function GifContainer({
    gif,
    onAddToFavorites,
    onRemoveFromFavorites,
    isFavorite,
}) {
    return (
        <div className="gif-container">
            <img src={gif.images.fixed_height.url} alt={gif.title} />
            <div className="gif-actions">
                {isFavorite ? (
                    <button onClick={() => onRemoveFromFavorites(gif.id)}>
                        Remove from Favorites
                    </button>
                ) : (
                    <button onClick={() => onAddToFavorites(gif)}>
                        Add to Favorites
                    </button>
                )}
            </div>
        </div>
    );
}

export default GifContainer;
