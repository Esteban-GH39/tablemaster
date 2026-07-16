import { getGlobalRanking, getTournamentRanking } from "./ranking.service.js";

export const getGlobalRankingController = async (req, res, next) => {
    try {
        const ranking = await getGlobalRanking();
        res.json(ranking);
    } catch (error) {
        next(error);
    }
};

export const getTournamentRankingController = async (req, res, next) => {
    try {
        const ranking = await getTournamentRanking(Number(req.params.id));
        res.json(ranking);
    } catch (error) {
        next(error);
    }
};