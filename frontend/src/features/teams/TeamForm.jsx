import { useState } from "react";

import { createTeam, updateTeam } from "../../services/teams.service";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

function TeamForm({ team, onSuccess, onClose }) {

    const [formData, setFormData] = useState({
        name: team?.name ?? "",
        type: team?.type ?? "club",
        format: team?.format ?? "team"
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            if (team) {
                await updateTeam(team.id, formData);
            } else {
                await createTeam(formData);
            }

            onSuccess();

        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error saving team"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="team-form">

            <Input
                label="Team name"
                name="name"
                placeholder="e.g. Bogota Table Tennis Club"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <div className="form-grid">

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="club">Club</option>
                        <option value="selection">Selection</option>
                        <option value="school">School</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Format</label>
                    <select
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                    >
                        <option value="doubles">Doubles (max. 2 players)</option>
                        <option value="team">Team (max. 6 players)</option>
                    </select>
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
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Team"}
                </Button>
            </div>

        </form>
    );
}

export default TeamForm;
