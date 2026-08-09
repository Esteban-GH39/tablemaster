import { Trophy } from "lucide-react";

import "./BracketView.css";

const MATCH_HEIGHT = 56;
const MATCH_GAP = 24;
const UNIT = MATCH_HEIGHT + MATCH_GAP;
const ROUND_WIDTH = 200;
const CONNECTOR_WIDTH = 32;
const TITLE_HEIGHT = 32;

const matchCenter = (roundIndex, matchIndex) =>
    UNIT * Math.pow(2, roundIndex) * (matchIndex + 0.5);

function PlayerSlot({ name, isWinner, isBye }) {
    return (
        <div className={`bracket-player ${isWinner ? "is-winner" : ""} ${isBye ? "is-bye" : ""}`}>
            {name}
        </div>
    );
}

function BracketConnectorPair({ y1, y2 }) {

    const top = Math.min(y1, y2);
    const height = Math.abs(y2 - y1);
    const mid = (y1 + y2) / 2;

    return (
        <>
            <div style={{ position: "absolute", top: y1 - 1, left: 0, width: CONNECTOR_WIDTH / 2, height: 2.5, background: "#8a8a8a" }} />
            <div style={{ position: "absolute", top: y2 - 1, left: 0, width: CONNECTOR_WIDTH / 2, height: 2.5, background: "#8a8a8a" }} />
            <div style={{ position: "absolute", top, left: CONNECTOR_WIDTH / 2 - 1, width: 2.5, height, background: "#8a8a8a" }} />
            <div style={{ position: "absolute", top: mid - 1, left: CONNECTOR_WIDTH / 2, width: CONNECTOR_WIDTH / 2, height: 2.5, background: "#8a8a8a" }} />
        </>
    );

}

function BracketView({ rounds, playerName }) {

    if (!rounds.length) {
        return (
            <div className="bracket-empty">
                No knockout matches yet.
            </div>
        );
    }

    const totalHeight = UNIT * rounds[0].length;

    const finalRound = rounds[rounds.length - 1];
    const finalMatch = finalRound[0];
    const champion =
        finalMatch?.status === "finished" && finalMatch.winnerId
            ? playerName(finalMatch.winnerId)
            : null;

    return (
        <div className="bracket-scroll">
            <div className="bracket">

                {
                    rounds.map((matches, roundIndex) => (
                        <div key={roundIndex} className="bracket-columns">

                            <div className="bracket-column">
                                <div className="bracket-round-title" style={{ height: TITLE_HEIGHT }}>
                                    {matches[0]?.round}
                                </div>
                                <div
                                    className="bracket-round"
                                    style={{ width: ROUND_WIDTH, height: totalHeight }}
                                >
                                    {
                                        matches.map((match, matchIndex) => {

                                            const y = matchCenter(roundIndex, matchIndex);

                                            return (
                                                <div
                                                    key={match.id}
                                                    className="bracket-match"
                                                    style={{
                                                        top: y - MATCH_HEIGHT / 2,
                                                        height: MATCH_HEIGHT,
                                                        width: ROUND_WIDTH
                                                    }}
                                                >
                                                    <PlayerSlot
                                                        name={
                                                            match.playerOneId
                                                                ? playerName(match.playerOneId)
                                                                : "BYE"
                                                        }
                                                        isWinner={
                                                            !!match.winnerId &&
                                                            match.winnerId === match.playerOneId
                                                        }
                                                        isBye={!match.playerOneId}
                                                    />
                                                    <PlayerSlot
                                                        name={
                                                            match.playerTwoId
                                                                ? playerName(match.playerTwoId)
                                                                : "BYE"
                                                        }
                                                        isWinner={
                                                            !!match.winnerId &&
                                                            match.winnerId === match.playerTwoId
                                                        }
                                                        isBye={!match.playerTwoId}
                                                    />
                                                </div>
                                            );

                                        })
                                    }
                                </div>
                            </div>

                            {
                                roundIndex < rounds.length - 1 && (
                                    <div className="bracket-column">
                                        <div className="bracket-round-title" style={{ height: TITLE_HEIGHT }} />
                                        <div
                                            className="bracket-connectors"
                                            style={{ width: CONNECTOR_WIDTH, height: totalHeight, position: "relative" }}
                                        >
                                            {
                                                matches.map((match, matchIndex) => {

                                                    if (matchIndex % 2 !== 0) return null;

                                                    const partner = matches[matchIndex + 1];
                                                    if (!partner) return null;

                                                    return (
                                                        <BracketConnectorPair
                                                            key={match.id}
                                                            y1={matchCenter(roundIndex, matchIndex)}
                                                            y2={matchCenter(roundIndex, matchIndex + 1)}
                                                        />
                                                    );

                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    ))
                }

                {
                    champion && (
                        <div className="bracket-column">
                            <div className="bracket-round-title" style={{ height: TITLE_HEIGHT }} />
                            <div className="bracket-champion-wrap" style={{ height: totalHeight }}>
                                <div
                                    className="bracket-champion"
                                    style={{ top: matchCenter(rounds.length - 1, 0) }}
                                >
                                    <Trophy size={18} />
                                    <div>
                                        <span className="bracket-champion-label">Champion</span>
                                        <strong>{champion}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default BracketView;
