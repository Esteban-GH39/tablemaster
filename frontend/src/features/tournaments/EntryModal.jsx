import { useEffect, useRef, useState } from "react";

import { Check, ChevronDown } from "lucide-react";

import Modal from "../../components/ui/Modal/Modal";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

import { createEntry } from "../../services/entries.service";

import "./EntryModal.css";

function EntryModal({
    tournamentId,
    availablePlayers,
    onClose,
    onSuccess
}) {

    const [playerId, setPlayerId] = useState("");
    const [seed, setSeed] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [playerOpen, setPlayerOpen] = useState(false);
    const playerRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (playerRef.current && !playerRef.current.contains(event.target)) {
                setPlayerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    const selectedPlayer = availablePlayers.find(
        (player) => player.id === playerId
    );

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!playerId) {
            setError("Please select a player");
            return;
        }

        try {

            setLoading(true);
            setError("");

            await createEntry(tournamentId, {
                playerId,
                seed: seed ? Number(seed) : undefined
            });

            onSuccess();

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Error registering player"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <Modal
            title="Register Player"
            onClose={onClose}
            width="480px"
        >
            <form className="entry-form" onSubmit={handleSubmit}>

                <div className="entry-form-field" ref={playerRef}>

                    <label className="entry-form-label">
                        Player
                    </label>

                    <div className="entry-form-select-wrap">

                        <button
                            type="button"
                            className={`entry-form-select ${playerOpen ? "is-open" : ""}`}
                            onClick={() => setPlayerOpen((open) => !open)}
                            disabled={!availablePlayers.length}
                        >
                            <span className={selectedPlayer ? "" : "entry-form-placeholder"}>
                                {
                                    selectedPlayer
                                        ? `${selectedPlayer.fullName}${
                                            selectedPlayer.club ? ` — ${selectedPlayer.club}` : ""
                                        }`
                                        : availablePlayers.length
                                            ? "Select a player"
                                            : "No players available"
                                }
                            </span>
                            <ChevronDown size={18} className="entry-form-select-chevron" />
                        </button>

                        {
                            playerOpen && (
                                <div className="entry-form-select-list" role="listbox">
                                    {
                                        availablePlayers.map((player) => (
                                            <div
                                                key={player.id}
                                                role="option"
                                                aria-selected={player.id === playerId}
                                                className={`entry-form-select-option ${
                                                    player.id === playerId ? "is-selected" : ""
                                                }`}
                                                onClick={() => {
                                                    setPlayerId(player.id);
                                                    setPlayerOpen(false);
                                                }}
                                            >
                                                <span>
                                                    {player.fullName}
                                                    {
                                                        player.club && (
                                                            <span className="entry-form-select-sub">
                                                                {" "}— {player.club}
                                                            </span>
                                                        )
                                                    }
                                                </span>
                                                {
                                                    player.id === playerId && (
                                                        <Check size={16} />
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }

                    </div>

                </div>

                <Input
                    type="number"
                    name="seed"
                    label="Seed (optional)"
                    placeholder="e.g. 1"
                    value={seed}
                    onChange={(event) => setSeed(event.target.value)}
                    min={1}
                />

                {
                    error && (
                        <p className="entry-form-error">
                            {error}
                        </p>
                    )
                }

                <div className="entry-form-actions">

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading || !availablePlayers.length}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>

                </div>

            </form>
        </Modal>
    );
}

export default EntryModal;