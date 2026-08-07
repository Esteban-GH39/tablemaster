import { useState } from "react";

import { registerMatchResult } from "../../services/matchResults.service";

import Button from "../../components/ui/Button/Button";
import SetScoreInput from "./SetScoreInput";

import "./MatchResult.css";

import { MATCH_FORMAT_LABELS } from "../../utils/constants";

const emptySet = () => ({ playerOneScore: "", playerTwoScore: "" });

// Mirrors backend/src/modules/matchResults/matchResult.service.js validateSet()
// exactly, so the user gets the same verdict here that the API would give.
const validateSet = (playerOneScore, playerTwoScore) => {
    if (playerOneScore === "" || playerTwoScore === "") {
        return null; // not filled in yet, no verdict
    }
    if (playerOneScore === playerTwoScore) {
        return "Sets can't end in a tie.";
    }
    const winner = Math.max(playerOneScore, playerTwoScore);
    const loser = Math.min(playerOneScore, playerTwoScore);
    if (winner < 11) {
        return "Whoever wins a set needs at least 11 points.";
    }
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
        if (validateSet(set.playerOneScore, set.playerTwoScore)) continue; // invalid set, don't count
        if (set.playerOneScore > set.playerTwoScore) playerOneSets++;
        else playerTwoSets++;
    }
    return { playerOneSets, playerTwoSets };
};

function MatchResultForm({ match, playerOneName, playerTwoName, onSuccess, onClose }) {

    const setsToWin = match.setsToWin ?? 3;
    const minSets = setsToWin;
    const maxSets = setsToWin * 2 - 1;
    const formatLabel = MATCH_FORMAT_LABELS[setsToWin] ?? `First to ${setsToWin} sets`;

    const [sets, setSets] = useState(
        Array.from({ length: minSets }, emptySet)
    );
    const [submitError, setSubmitError] = useState("");
    const [saving, setSaving] = useState(false);

    const setErrors = sets.map((set) => validateSet(set.playerOneScore, set.playerTwoScore));
    const { playerOneSets, playerTwoSets } = countSetWins(sets);
    const matchDecided = playerOneSets === setsToWin || playerTwoSets === setsToWin;

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

        if (sets.some((set) => set.playerOneScore === "" || set.playerTwoScore === "")) {
            setSubmitError("Fill in every set's score.");
            return;
        }
        if (setErrors.some(Boolean)) {
            setSubmitError("Fix the invalid sets before saving.");
            return;
        }
        if (!matchDecided) {
            setSubmitError(`The match isn't decided yet — one player needs ${setsToWin} set wins.`);
            return;
        }

        setSaving(true);
        try {
            await registerMatchResult(match.id, sets.map((set) => ({
                playerOneScore: Number(set.playerOneScore),
                playerTwoScore: Number(set.playerTwoScore)
            })));
            onSuccess();
        } catch (error) {
            console.error(error);
            setSubmitError(
                error.response?.data?.message ||
                "Error registering the result."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <form className="match-result-form" onSubmit={handleSubmit}>
            <p className="match-result-format">{formatLabel}</p>

            <div className="match-result-players">
                <span>{playerOneName}</span>
                <span className="match-result-tally">{playerOneSets} - {playerTwoSets}</span>
                <span>{playerTwoName}</span>
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
                            playerOneName={playerOneName}
                            playerTwoName={playerTwoName}
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
                    {saving ? "Saving..." : "Save Result"}
                </Button>
            </div>
        </form>
    );
}

export default MatchResultForm;
