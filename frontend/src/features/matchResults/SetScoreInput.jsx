import { X } from "lucide-react";

function SetScoreInput ({
    setNumber,
    set,
    onChange,
    onRemove,
    playerOneName,
    playerTwoName,
    error,
    canRemove
}) {
    const handleScoreChange = (player, value) => {
        const numericValue = value === "" ? "" : Number(value);
        onChange({
            ...set,
            [player]: numericValue
        });
    };

    return (
        <div className="set-input-row">
            <span className="set-input-label">
                Set {setNumber}
            </span>

            <div className="set-input-scores">
                <div className="set-input-score">
                    <label>{playerOneName}</label>
                    <input
                        type="number"
                        min="0"
                        value={set.playerOneScore}
                        onChange={(event) => handleScoreChange("playerOneScore", event.target.value)}
                    />
                </div>

                <div className="set-input-score">
                    <label>{playerTwoName}</label>
                    <input
                        type="number"
                        min="0"
                        value={set.playerTwoScore}
                        onChange={(event) => handleScoreChange("playerTwoScore", event.target.value)}
                    />
                </div>

                {
                    canRemove && (
                        <button
                            type="button"
                            className="set-input-remove"
                            onClick={onRemove}
                            aria-label={`Remove set ${setNumber}`}
                        >
                            <X size={16} />
                        </button>
                    )
                }
            </div>

            {error && <p className="set-input-error">{error}</p>}
        </div>
    );
}

export default SetScoreInput;