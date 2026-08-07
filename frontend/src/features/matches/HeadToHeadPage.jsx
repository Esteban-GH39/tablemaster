import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getHeadToHead } from "../../services/matches.service";
import { getPlayers } from "../../services/players.service";

import Badge from "../../components/ui/Badge/Badge";
import { getStatusVariant } from "../../utils/status";
import { formatDate } from "../../utils/formatDate";
import { MATCH_FORMAT_LABELS } from "../../utils/constants";

import "./HeadToHead.css";

function HeadToHeadPage() {

    const [players, setPlayers] = useState([]);
    const [playerOneId, setPlayerOneId] = useState("");
    const [playerTwoId, setPlayerTwoId] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getPlayers()
            .then(setPlayers)
            .catch((error) => console.error(error));
    }, []);

    const playerName = (id) => {
        const player = players.find((player) => player.id === id);
        return player ? player.fullName : "Unknown player";
    };

    const handleCompare = async (event) => {
        event.preventDefault();
        setError("");
        if (!playerOneId || !playerTwoId) return;
        if (playerOneId === playerTwoId) {
            setError("Choose two different players.");
            return;
        }
        setLoading(true);
        try {
            const result = await getHeadToHead(playerOneId, playerTwoId);
            setData(result);
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.message ||
                "Error loading head-to-head record."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h2h-page">
            <Link to="/matches" className="h2h-back">
                <ArrowLeft size={16} />
                Back to Matches
            </Link>

            <div className="h2h-header">
                <h1>Head to Head</h1>
                <p>
                    Compare two players and see every time they've faced each other,
                    in tournaments or friendly matches.
                </p>
            </div>

            <form className="h2h-picker" onSubmit={handleCompare}>
                <div className="form-group">
                    <label>Player One</label>
                    <select
                        value={playerOneId}
                        onChange={(event) => setPlayerOneId(event.target.value)}
                        required
                    >
                        <option value="" disabled>Select player</option>
                        {
                            players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.fullName}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <span className="h2h-vs">vs</span>

                <div className="form-group">
                    <label>Player Two</label>
                    <select
                        value={playerTwoId}
                        onChange={(event) => setPlayerTwoId(event.target.value)}
                        required
                    >
                        <option value="" disabled>Select player</option>
                        {
                            players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.fullName}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit" className="button button-primary">
                    Compare
                </button>
            </form>

            {error && <p className="h2h-error">{error}</p>}

            {loading && <p>Loading...</p>}

            {
                data && !loading && (
                    <>
                        <div className="h2h-summary">
                            <div className="h2h-summary-player">
                                <span className="h2h-summary-name">{playerName(playerOneId)}</span>
                                <span className="h2h-summary-score">{data.summary.playerOneWins}</span>
                            </div>
                            <div className="h2h-summary-mid">
                                <span>{data.summary.totalMatches} match{data.summary.totalMatches === 1 ? "" : "es"}</span>
                            </div>
                            <div className="h2h-summary-player">
                                <span className="h2h-summary-score">{data.summary.playerTwoWins}</span>
                                <span className="h2h-summary-name">{playerName(playerTwoId)}</span>
                            </div>
                        </div>

                        {
                            data.matches.length === 0
                                ? <p className="h2h-empty">These players haven't faced each other yet.</p>
                                : (
                                    <div className="h2h-list">
                                        {
                                            data.matches.map((match) => (
                                                <div key={match.id} className="h2h-match-card">
                                                    <div className="h2h-match-top">
                                                        <span className="h2h-match-tournament">
                                                            {match.tournamentName ?? "Friendly match"}
                                                        </span>
                                                        <span className="h2h-match-format">
                                                            {MATCH_FORMAT_LABELS[match.setsToWin] ?? `First to ${match.setsToWin}`}
                                                        </span>
                                                        <Badge variant={getStatusVariant(match.status)}>
                                                            {match.status.replace("_", " ")}
                                                        </Badge>
                                                    </div>
                                                    <div className="h2h-match-mid">
                                                        <span className={match.winnerId === match.playerOneId ? "h2h-winner" : ""}>
                                                            {playerName(match.playerOneId)}
                                                        </span>
                                                        <span className="h2h-match-round">{match.round}</span>
                                                        <span className={match.winnerId === match.playerTwoId ? "h2h-winner" : ""}>
                                                            {playerName(match.playerTwoId)}
                                                        </span>
                                                    </div>
                                                    {
                                                        match.sets?.length > 0 && (
                                                            <div className="h2h-sets">
                                                                {
                                                                    match.sets.map((set) => (
                                                                        <span key={set.setNumber} className="h2h-set">
                                                                            {set.playerOneScore}-{set.playerTwoScore}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    <div className="h2h-match-date">
                                                        {formatDate(match.playedAt ?? match.createdAt)}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                        }
                    </>
                )
            }
        </div>
    );
}

export default HeadToHeadPage;
