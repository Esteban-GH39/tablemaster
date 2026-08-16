import {
    getPlayerInsights,
    getMatchPredictions,
    getPredictionForMatch,
    getInsightsSummary
} from "./insight.service.js";

export const getPlayerInsightsController = async (req, res, next) => {
    try {
        res.json(await getPlayerInsights());
    } catch (error) {
        next(error);
    }
};

export const getMatchPredictionsController = async (req, res, next) => {
    try {
        res.json(await getMatchPredictions());
    } catch (error) {
        next(error);
    }
};

export const getPredictionForMatchController = async (req, res, next) => {
    try {
        const prediction = await getPredictionForMatch(req.params.matchId);
        if (!prediction) {
            return res.status(404).json({
                message: "No prediction computed yet for this match"
            });
        }
        res.json(prediction);
    } catch (error) {
        next(error);
    }
};

export const getInsightsSummaryController = async (req, res, next) => {
    try {
        res.json(await getInsightsSummary());
    } catch (error) {
        next(error);
    }
};
