import {
    createChallenge,
    getIncomingChallenges,
    getOutgoingChallenges,
    confirmChallenge,
    rejectChallenge
} from "./challenge.service.js";

export const createChallengeController = async (req, res) => {
    try {
        const { opponentPlayerId, sets, setsToWin } = req.body;
        const challenge = await createChallenge(
            req.user.id,
            opponentPlayerId,
            sets,
            setsToWin
        );
        res.status(201).json(challenge);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getIncomingChallengesController = async (req, res) => {
    try {
        const challenges = await getIncomingChallenges(req.user.id);
        res.json(challenges);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOutgoingChallengesController = async (req, res) => {
    try {
        const challenges = await getOutgoingChallenges(req.user.id);
        res.json(challenges);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const confirmChallengeController = async (req, res) => {
    try {
        const result = await confirmChallenge(req.user.id, req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const rejectChallengeController = async (req, res) => {
    try {
        await rejectChallenge(req.user.id, req.params.id);
        res.json({ message: "Challenge rejected." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
