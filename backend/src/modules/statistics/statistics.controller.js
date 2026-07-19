import { getPlayerStatistics, getTournamentStatistics } from "./statistics.service.js";

export const getPlayerStatisticsController = async (req, res, next) => {
    try {
        const statistics = await getPlayerStatistics(
            Number(req.params.id)
        );
        res.json(statistics);
    } catch (error) {
        next(error);
    }
};

export const getTournamentStatisticsController = async (req, res, next) => {
    try {
        const statistics = await getTournamentStatistics(
            req.params.id
        );
        res.json(statistics);
    } catch (error) {
        next(error);
    }
};