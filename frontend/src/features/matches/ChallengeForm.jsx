import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { createChallenge } from "../../services/challenges.service";

import SetScoreInput from "../matchResults/SetScoreInput";
import Button from "../../components/ui/Button/Button";

import { MATCH_FORMAT_LABELS } from "../../utils/constants";

import "./ChallengeForm.css";

const emptySet = () => ({ playerOneScore: "", playerTwoScore: "" });

const validateSet = (playerOneScore, playerTwoScore) => {
    if (playerOneScore === "" || playerTwoScore === "") return null;
    if (playerOneScore === playerTwoScore) return "Sets can't end in a tie.";
    const winner = Math.max(playerOneScore, playerTwoScore);
    const loser = Math.min(playerOneScore, playerTwoScore);
    if (winner < 11) return "Whoever wins a set needs at least 11 points.";
    if (winner === 11) return loser <= 9 ? null : "With 11 points, the opponent must have 9 or fewer.";
    return winner - loser === 2 ? null : "Past 11 points, the win margin must be exactly 2.";
};

const countSetWins = (sets) => {
    let mine = 0;
    let theirs = 0;
    for (const set of sets) {
        if (set.playerOneScore === "" || set.playerTwoScore === "") continue;
        if (validateSet(set.playerOneScore, set.playerTwoScore)) continue;
        if (set.playerOneScore > set.playerTwoScore) mine++;
        else theirs++;
    }
    return { mine, theirs };
};

function ChallengeForm({ opponents, myName, onSuccess, onClose }) {

    const [opponentId, setOpponentId] = useState("");
    const [opponentOpen, setOpponentOpen] = useState(false);
    const opponentRef = useRef(null);

    const [setsToWin, setSetsToWin] = useState(3);
    const minSets = setsToWin;

    const [sets, setSets] = useState(Array.from({ length: minSets }, emptySet));
    const [submitError, setSubmitError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleFormatChange = (value) => {
        setSetsToWin(value);
        setSets(Array.from({ length: value }, emptySet));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (opponentRef.current && !opponentRef.current.contains(event.target)) {
                setOpponentOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const opponent = opponents.find((player) => player.id === opponentId);
    const setErrors = sets.map((set) => validateSet(set.playerOneScore, set.playerTwoScore));
    const { mine, theirs } = countSetWins(sets);
    const matchDecided = mine === setsToWin || theirs === setsToWin;

    const handleSetChange = (index, updatedSet) => {
        setSets((previous) => previous.map((set, i) => (i === index ? updatedSet : set)));
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
            await createChallenge(
                opponentId,
                sets.map((set) => ({
                    playerOneScore: Number(set.playerOneScore),
                    playerTwoScore: Number(set.playerTwoScore)
                })),
                setsToWin
            );
            onSuccess();
        } catch (error) {
            setSubmitError(
                error.response?.data?.message ||
                "Error sending the challenge."
            );
        } finally {
            setSaving(false);
        }

    };

    return (
        <form className="challenge-form" onSubmit={handleSubmit}>

            <div className="challenge-form-field" ref={opponentRef}>

                <label className="challenge-form-label">
                    Who did you play against?
                </label>

                <div className="challenge-form-select-wrap">

                    <button
                        type="button"
                        className={`challenge-form-select ${opponentOpen ? "is-open" : ""}`}
                        onClick={() => setOpponentOpen((open) => !open)}
                    >
                        <span className={opponent ? "" : "challenge-form-placeholder"}>
                            {opponent ? opponent.fullName : "Select a player"}
                        </span>
                        <ChevronDown size={18} className="challenge-form-select-chevron" />
                    </button>

                    {
                        opponentOpen && (
                            <div className="challenge-form-select-list" role="listbox">
                                {
                                    opponents.map((player) => (
                                        <div
                                            key={player.id}
                                            role="option"
                                            aria-selected={player.id === opponentId}
                                            className={`challenge-form-select-option ${
                                                player.id === opponentId ? "is-selected" : ""
                                            }`}
                                            onClick={() => {
                                                setOpponentId(player.id);
                                                setOpponentOpen(false);
                                            }}
                                        >
                                            {player.fullName}
                                            {player.id === opponentId && <Check size={16} />}
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }

                </div>

            </div>

            <div className="challenge-form-field">

                <label className="challenge-form-label">
                    Format
                </label>

                <div className="challenge-form-format-toggle">
                    {
                        Object.entries(MATCH_FORMAT_LABELS).map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                className={Number(value) === setsToWin ? "is-active" : ""}
                                onClick={() => handleFormatChange(Number(value))}
                            >
                                {label}
                            </button>
                        ))
                    }
                </div>

            </div>

            <div className="challenge-form-players">
                <span>{myName}</span>
                <span className="challenge-form-tally">{mine} - {theirs}</span>
                <span>{opponent ? opponent.fullName : "Opponent"}</span>
            </div>

            <div className="challenge-form-sets">
                {
                    sets.map((set, index) => (
                        <SetScoreInput
                            key={index}
                            setNumber={index + 1}
                            set={set}
                            onChange={(updatedSet) => handleSetChange(index, updatedSet)}
                            canRemove={false}
                            playerOneName={myName}
                            playerTwoName={opponent ? opponent.fullName : "Opponent"}
                            error={setErrors[index]}
                        />
                    ))
                }
            </div>

            {submitError && <p className="challenge-form-error">{submitError}</p>}

            <p className="challenge-form-hint">
                {opponent ? opponent.fullName : "Your opponent"} will need to confirm this
                result before it counts as a finished match.
            </p>

            <div className="challenge-form-actions">

                <Button type="button" variant="secondary" onClick={onClose} disabled={saving}>
                    Cancel
                </Button>

                <Button type="submit" variant="primary" disabled={saving}>
                    {saving ? "Sending..." : "Send Challenge"}
                </Button>

            </div>

        </form>
    );

}

export default ChallengeForm;
