import { useState } from "react";

import { createPlayer } from "../../services/players.service";

function PlayerForm({ onSuccess }) {

    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        gender: "male",
        club: "",
        dominantHand: "right",
        playStyle: "offensive",
        gripType: "shakehand"
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
            const player = await createPlayer(newPlayer);
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