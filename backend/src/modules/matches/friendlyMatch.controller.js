import {
    proposeFriendlyMatch,
    confirmFriendlyMatch,
    rejectFriendlyMatch,
    getPendingConfirmationsForUser
} from "./friendlyMatch.service.js";

export const proposeFriendlyMatchController = async (req, res, next) => {
    try {
        const { opponentId, sets, setsToWin } = req.body;
        const match = await proposeFriendlyMatch(
            req.user.id,
            opponentId,
            sets,
            setsToWin
        );
        res.status(201).json(match);
    } catch (error) {
        next(error);
    }
};

export const confirmFriendlyMatchController = async (req, res, next) => {
    try {
        const result = await confirmFriendlyMatch(req.params.id, req.user.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const rejectFriendlyMatchController = async (req, res, next) => {
    try {
        const result = await rejectFriendlyMatch(req.params.id, req.user.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getPendingConfirmationsController = async (req, res, next) => {
    try {
        const pending = await getPendingConfirmationsForUser(req.user.id);
        res.json(pending);
    } catch (error) {
        next(error);
    }
};
