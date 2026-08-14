import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

import {
    getIncomingChallenges,
    confirmChallenge,
    rejectChallenge
} from "../../services/challenges.service";

import "./PendingConfirmations.css";

function PendingConfirmations({ onChanged }) {

    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState(null);

    const load = async () => {
        try {
            const data = await getIncomingChallenges();
            setChallenges(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleConfirm = async (id) => {
        setBusyId(id);
        try {
            await confirmChallenge(id);
            await load();
            onChanged?.();
        } catch (error) {
            alert(error.response?.data?.message || "Error confirming this result.");
        } finally {
            setBusyId(null);
        }
    };

    const handleReject = async (id) => {
        const confirmed = window.confirm("Reject this reported result?");
        if (!confirmed) return;

        setBusyId(id);
        try {
            await rejectChallenge(id);
            await load();
            onChanged?.();
        } catch (error) {
            alert(error.response?.data?.message || "Error rejecting this result.");
        } finally {
            setBusyId(null);
        }
    };

    if (loading || !challenges.length) return null;

    return (
        <div className="pending-confirmations">

            <h2>Pending Confirmations</h2>
            <p>Results other players reported against you — review before they count.</p>

            <div className="pending-confirmations-list">
                {
                    challenges.map((challenge) => {

                        const sets = challenge.proposedSets || [];
                        const challengerSets = sets.filter((set) => set.playerOneScore > set.playerTwoScore).length;
                        const mySets = sets.filter((set) => set.playerTwoScore > set.playerOneScore).length;
                        const busy = busyId === challenge.id;

                        return (
                            <div key={challenge.id} className="pending-confirmation-card">

                                <div className="pending-confirmation-info">
                                    <strong>{challenge.challengerName}</strong>
                                    <span>reported a result against you</span>
                                    <span className="pending-confirmation-tally">
                                        {challengerSets} - {mySets}
                                    </span>
                                </div>

                                <div className="pending-confirmation-actions">
                                    <button
                                        type="button"
                                        className="pending-confirmation-confirm"
                                        onClick={() => handleConfirm(challenge.id)}
                                        disabled={busy}
                                    >
                                        <Check size={15} />
                                        Confirm
                                    </button>
                                    <button
                                        type="button"
                                        className="pending-confirmation-reject"
                                        onClick={() => handleReject(challenge.id)}
                                        disabled={busy}
                                    >
                                        <X size={15} />
                                        Reject
                                    </button>
                                </div>

                            </div>
                        );

                    })
                }
            </div>

        </div>
    );

}

export default PendingConfirmations;
