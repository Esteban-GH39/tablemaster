import { useState } from "react";

import { createMatch, updateMatch } from "../../services/matches.service";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

const toDateTimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
};

function MatchForm({ match, players, tournaments, onSuccess, onClose }) {

    const [formData, setFormData] = useState({
        tournamentId: match?.tournamentId ?? tournaments[0]?.id ?? "",
        playerOneId: match?.playerOneId ?? "",
        playerTwoId: match?.playerTwoId ?? "",
        winnerId: match?.winnerId ?? "",
        round: match?.round ?? "",
        matchOrder: match?.matchOrder ?? 1,
        status: match?.status ?? "pending",
        playedAt: toDateTimeLocal(match?.playedAt)
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
                tournamentId: formData.tournamentId,
                playerOneId: formData.playerOneId || null,
                playerTwoId: formData.playerTwoId || null,
                winnerId: formData.winnerId || null,
                round: formData.round,
                matchOrder: Number(formData.matchOrder),
                status: formData.status,
                ...(formData.playedAt
                    ? { playedAt: new Date(formData.playedAt).toISOString() }
                    : {})
            };
            if (match) {
                await updateMatch(match.id, data);
            } else {
                await createMatch(data);
            }
            onSuccess();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Error saving match."
            );
        }
    };

    const possibleWinners = [formData.playerOneId, formData.playerTwoId]
        .filter(Boolean);

    return (
        <form
            className="match-form"
            onSubmit={handleSubmit}
        >
            <div className="form-grid">
                <div className="form-group">
                    <label>Tournament</label>
                    <select
                        name="tournamentId"
                        value={formData.tournamentId}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select tournament
                        </option>
                        {
                            tournaments.map((tournament) => (
                                <option key={tournament.id} value={tournament.id}>
                                    {tournament.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <Input
                    label="Round"
                    name="round"
                    placeholder="e.g. Quarterfinal"
                    value={formData.round}
                    onChange={handleChange}
                    required
                />

                <div className="form-group">
                    <label>Player One</label>
                    <select
                        name="playerOneId"
                        value={formData.playerOneId}
                        onChange={handleChange}
                    >
                        <option value="">TBD</option>
                        {
                            players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.fullName}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Player Two</label>
                    <select
                        name="playerTwoId"
                        value={formData.playerTwoId}
                        onChange={handleChange}
                    >
                        <option value="">TBD</option>
                        {
                            players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.fullName}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Winner</label>
                    <select
                        name="winnerId"
                        value={formData.winnerId}
                        onChange={handleChange}
                        disabled={possibleWinners.length === 0}
                    >
                        <option value="">None yet</option>
                        {
                            possibleWinners.map((id) => {
                                const player = players.find((player) => player.id === id);
                                return player ? (
                                    <option key={id} value={id}>
                                        {player.fullName}
                                    </option>
                                ) : null;
                            })
                        }
                    </select>
                </div>

                <Input
                    label="Match Order"
                    type="number"
                    name="matchOrder"
                    value={formData.matchOrder}
                    onChange={handleChange}
                    required
                />

                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">
                            Pending
                        </option>
                        <option value="in_progress">
                            In Progress
                        </option>
                        <option value="finished">
                            Finished
                        </option>
                    </select>
                </div>

                <Input
                    label="Played At"
                    type="datetime-local"
                    name="playedAt"
                    value={formData.playedAt}
                    onChange={handleChange}
                />
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
                        match
                            ? "Update Match"
                            : "Create Match"
                    }
                </Button>
            </div>
        </form>
    );
}

export default MatchForm;
