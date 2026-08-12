import {
    createEntry,
    getEntries,
    deleteEntry,
    createSelfEntry,
    deleteSelfEntry
} from "./entry.service.js";

export const createEntryController = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;
        const entry = await createEntry(
            tournamentId,
            req.body
        );
        res.status(201).json(entry);
    } catch (error) {
        next(error);
    }
};

export const createSelfEntryController = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;
        const entry = await createSelfEntry(
            tournamentId,
            req.user.id
        );
        res.status(201).json(entry);
    } catch (error) {
        next(error);
    }
};

export const deleteSelfEntryController = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;
        await deleteSelfEntry(
            tournamentId,
            req.user.id
        );
        res.json({
            message: "Withdrew from tournament"
        });
    } catch (error) {
        next(error);
    }
};

export const getEntriesController = async (req, res, next) => {
    try {
        const tournamentId = req.params.id;
        const entries = await getEntries(
            tournamentId
        );
        res.json(entries);
    } catch (error) {
        next(error);
    }
};

export const deleteEntryController = async (req, res, next) => {
    try {
        const entryId = req.params.entryId;
        const entry = await deleteEntry(entryId);
        if (!entry) {
            return res.status(404).json({
                message: "Entry not found"
            });
        }
        res.json({
            message: "Entry deleted"
        });
    } catch (error) {
        next(error);
    }
};