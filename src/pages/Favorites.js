import React from "react";
import { useGiphy } from "../logic";
import GifContainer from "../components/GifContainer";
import "../App.css";

function Favorites() {
    const { favorites, removeFromFavorites } = useGiphy();

    return (
        <div className="favorites">
            {favorites.map((gif) => (
                <GifContainer
                    key={gif.id}
                    gif={gif}
                    onRemoveFromFavorites={removeFromFavorites}
                    isFavorite={true}
                />
            ))}
        </div>
    );
}

export default Favorites;
