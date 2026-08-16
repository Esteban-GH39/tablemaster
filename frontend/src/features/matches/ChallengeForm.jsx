import { useState } from "react";

import { proposeFriendlyMatch } from "../../services/matches.service";

import Button from "../../components/ui/Button/Button";
import SetScoreInput from "../matchResults/SetScoreInput";
import "../matchResults/MatchResult.css";

import { MATCH_FORMAT_LABELS } from "../../utils/constants";

const emptySet = () => ({ playerOneScore: "", playerTwoScore: "" });

    const validateSet = (playerOneScore, playerTwoScore) => {
    if (playerOneScore === "" || playerTwoScore === "") return null;
    if (playerOneScore === playerTwoScore) return "Sets can't end in a tie.";
    const winner = Math.max(playerOneScore, playerTwoScore);
    const loser = Math.min(playerOneScore, playerTwoScore);
    if (winner < 11) return "Whoever wins a set needs at least 11 points.";
    if (winner === 11) {
        return loser <= 9 ? null : "With 11 points, the opponent must have 9 or fewer.";
    }
    return winner - loser === 2 ? null : "Past 11 points, the win margin must be exactly 2.";
};

const countSetWins = (sets) => {
    let playerOneSets = 0;
    let playerTwoSets = 0;
    for (const set of sets) {
        if (set.playerOneScore === "" || set.playerTwoScore === "") continue;
        if (validateSet(set.playerOneScore, set.playerTwoScore)) continue;
        if (set.playerOneScore > set.playerTwoScore) playerOneSets++;
        else playerTwoSets++;
    }
    return { playerOneSets, playerTwoSets };
};

function ChallengeForm({ myPlayer, players, onSuccess, onClose }) {

    const opponents = players.filter((player) => player.id !== myPlayer.id);

    const [opponentId, setOpponentId] = useState("");
    const [setsToWin, setSetsToWin] = useState(3);
    const [sets, setSets] = useState(Array.from({ length: 3 }, emptySet));
    const [submitError, setSubmitError] = useState("");
    const [saving, setSaving] = useState(false);

    const opponentName = opponents.find((p) => p.id === opponentId)?.fullName ?? "Opponent";

    const minSets = setsToWin;
    const maxSets = setsToWin * 2 - 1;

    const setErrors = sets.map((set) => validateSet(set.playerOneScore, set.playerTwoScore));
    const { playerOneSets, playerTwoSets } = countSetWins(sets);
    const matchDecided = playerOneSets === setsToWin || playerTwoSets === setsToWin;

    const handleFormatChange = (value) => {
        const newSetsToWin = Number(value);
        setSetsToWin(newSetsToWin);
        setSets(Array.from({ length: newSetsToWin }, emptySet));
    };

    const handleSetChange = (index, updatedSet) => {
        setSets((previous) => previous.map((set, i) => (i === index ? updatedSet : set)));
    };

    const handleAddSet = () => {
        if (sets.length >= maxSets || matchDecided) return;
        setSets((previous) => [...previous, emptySet()]);
    };

    const handleRemoveSet = (index) => {
        if (sets.length <= minSets) return;
        setSets((previous) => previous.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError("");

        if (!opponentId) {
            setSubmitError("Choose who you played against.");
            return;
        }
        if (sets.some((set) => set.playerOneScore === "" || set.playerTwoScore === "")) {
            setSubmitError("Fill in every set's score.");
            return;
        }
        if (setErrors.some(Boolean)) {
            setSubmitError("Fix the invalid sets before sending.");
            return;
        }
        if (!matchDecided) {
            setSubmitError(`The match isn't decided yet — one player needs ${setsToWin} set wins.`);
            return;
        }

        setSaving(true);
        try {
            await proposeFriendlyMatch({
                opponentId,
                setsToWin,
                sets: sets.map((set) => ({
                    playerOneScore: Number(set.playerOneScore),
                    playerTwoScore: Number(set.playerTwoScore)
                }))
            });
            onSuccess();
        } catch (error) {
            console.error(error);
            setSubmitError(
                error.response?.data?.message ||
                "Error sending the challenge."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <form className="match-result-form" onSubmit={handleSubmit}>

            <p className="challenge-hint">
                You (<strong>{myPlayer.fullName}</strong>) as Player One. Pick who you
                played and enter the real score — they'll need to confirm it before it counts.
            </p>

            <div className="form-group">
                <label>Opponent</label>
                <select
                    value={opponentId}
                    onChange={(event) => setOpponentId(event.target.value)}
                >
                    <option value="">Select a player...</option>
                    {
                        opponents.map((player) => (
                            <option key={player.id} value={player.id}>
                                {player.fullName}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="form-group">
                <label>Format</label>
                <select
                    value={setsToWin}
                    onChange={(event) => handleFormatChange(event.target.value)}
                >
                    {
                        Object.entries(MATCH_FORMAT_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))
                    }
                </select>
            </div>

            <div className="match-result-players">
                <span>{myPlayer.fullName}</span>
                <span className="match-result-tally">{playerOneSets} - {playerTwoSets}</span>
                <span>{opponentName}</span>
            </div>

            <div className="match-result-sets">
                {
                    sets.map((set, index) => (
                        <SetScoreInput
                            key={index}
                            setNumber={index + 1}
                            set={set}
                            onChange={(updatedSet) => handleSetChange(index, updatedSet)}
                            onRemove={() => handleRemoveSet(index)}
                            canRemove={sets.length > minSets}
                            playerOneName={myPlayer.fullName}
                            playerTwoName={opponentName}
                            error={setErrors[index]}
                        />
                    ))
                }
            </div>

            <button
                type="button"
                className="match-result-add-set"
                onClick={handleAddSet}
                disabled={sets.length >= maxSets || matchDecided}
            >
                + Add Set
            </button>

            {submitError && <p className="match-result-submit-error">{submitError}</p>}

            <div className="form-actions">
                <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                    {saving ? "Sending..." : "Send Challenge"}
                </Button>
            </div>
        </form>
    );
}

export default ChallengeForm;
