import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

import {
    getPendingConfirmations,
    confirmFriendlyMatch,
    rejectFriendlyMatch
} from "../../services/matches.service";

import Button from "../../components/ui/Button/Button";

function PendingConfirmations({ onResolved }) {

    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            const data = await getPendingConfirmations();
            setPending(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleConfirm = async (matchId) => {
        setBusyId(matchId);
        try {
            await confirmFriendlyMatch(matchId);
            await load();
            onResolved?.();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error confirming the match"
            );
        } finally {
            setBusyId(null);
        }
    };

    const handleReject = async (matchId) => {
        const confirmed = window.confirm("Reject this result? It will be discarded.");
        if (!confirmed) return;

        setBusyId(matchId);
        try {
            await rejectFriendlyMatch(matchId);
            await load();
            onResolved?.();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error rejecting the match"
            );
        } finally {
            setBusyId(null);
        }
    };

    if (loading || pending.length === 0) return null;

    return (
        <div className="pending-confirmations">
            <h3>Pending Confirmations</h3>
            <p className="pending-confirmations-hint">
                These players say they played you — confirm if the score is right.
            </p>

            {
                pending.map((match) => {
                    const setsSummary = match.proposedSets
                        .map((set) => `${set.playerOneScore}-${set.playerTwoScore}`)
                        .join(", ");

                    return (
                        <div key={match.id} className="pending-confirmation-card">
                            <div>
                                <strong>{match.proposerName}</strong> says they beat/played you
                                <div className="pending-confirmation-sets">{setsSummary}</div>
                            </div>
                            <div className="pending-confirmation-actions">
                                <Button
                                    onClick={() => handleConfirm(match.id)}
                                    disabled={busyId === match.id}
                                >
                                    <Check size={15} /> Confirm
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleReject(match.id)}
                                    disabled={busyId === match.id}
                                >
                                    <X size={15} /> Reject
                                </Button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default PendingConfirmations;
