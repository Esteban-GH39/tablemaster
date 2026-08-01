import { useState } from "react";

import { createPlayer, updatePlayer } from "../../services/players.service";

function PlayerForm({ player, onSuccess }) {

    const [formData, setFormData] = useState({
        fullName: player?.fullName ?? "",
        age: player?.age ?? "",
        gender: player?.gender ?? "male",
        club: player?.club ?? "",
        dominantHand: player?.dominantHand ?? "right",
        playStyle: player?.playStyle ?? "offensive",
        gripType: player?.gripType ?? "shakehand"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newPlayer = {
                ...formData,
                age: Number(formData.age)
            };
            if (player) {
                await updatePlayer(player.id, newPlayer);
            } else {
                await createPlayer(newPlayer);
            }
            onSuccess();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error creating player"
            );
        }
    };

    return (
        <form
            className="player-form"
            onSubmit={handleSubmit}
        >
            <div className="form-grid">
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Club</label>
                    <input
                        type="text"
                        name="club"
                        value={formData.club}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Dominant Hand</label>
                    <select
                        name="dominantHand"
                        value={formData.dominantHand}
                        onChange={handleChange}
                    >
                        <option value="right">Right</option>
                        <option value="left">Left</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Play Style</label>
                    <select
                        name="playStyle"
                        value={formData.playStyle}
                        onChange={handleChange}
                    >
                        <option value="offensive">Offensive</option>
                        <option value="defensive">Defensive</option>
                        <option value="control">Control</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Grip Type</label>
                    <select
                        name="gripType"
                        value={formData.gripType}
                        onChange={handleChange}
                    >
                        <option value="shakehand">Shakehand</option>
                        <option value="penhold">Penhold</option>
                    </select>
                </div>
            </div>
            <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn-primary"
                >
                    Save Player
                </button>
            </div>
        </form>
    );

}

export default PlayerForm;