import { useState } from "react";

import { createTournament, updateTournament } from "../../services/tournaments.service";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

function TournamentForm({tournament, onSuccess, onClose}) {

    const [formData, setFormData] = useState({
        name: tournament?.name ?? "",
        description: tournament?.description ?? "",
        location: tournament?.location ?? "",
        startDate: tournament?.startDate ?? "",
        endDate: tournament?.endDate ?? "",
        status: tournament?.status ?? "draft",
        maxPlayers: tournament?.maxPlayers ?? 16
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                ...formData,
                maxPlayers: Number(formData.maxPlayers)
            };
            if (tournament) {
                await updateTournament(
                    tournament.id,
                    data
                );
            } else {
                await createTournament(data);
            }
            onSuccess();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error saving tournament."
            );
        }
    };

    return (
        <form
            className="tournament-form"
            onSubmit={handleSubmit}
        >
            <div className="form-grid">
                <Input
                    label="Tournament Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <Input
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
                <Input
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
                <Input
                    label="Max Players"
                    type="number"
                    name="maxPlayers"
                    value={formData.maxPlayers}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="draft">
                            Draft
                        </option>
                        <option value="registration">
                            Registration
                        </option>
                        <option value="in_progress">
                            In Progress
                        </option>
                        <option value="finished">
                            Finished
                        </option>
                        <option value="cancelled">
                            Cancelled
                        </option>
                    </select>
                </div>
                <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-actions">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button type="submit">
                    {
                        tournament
                            ? "Update Tournament"
                            : "Create Tournament"
                    }
                </Button>
            </div>
        </form>
    );
}

export default TournamentForm;