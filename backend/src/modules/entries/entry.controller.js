import { createEntry, getEntries, deleteEntry } from "./entry.service.js";

export const createEntryController = async (req, res, next) => {
    try {
        const tournamentId = Number(req.params.id);
        const entry = await createEntry(
            tournamentId,
            req.body
        );
        res.status(201).json(entry);
    } catch (error) {
        next(error);
    }
};

export const getEntriesController = async (req, res, next) => {
    try {
        const tournamentId = Number(req.params.id);
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
        const entryId = Number(req.params.entryId);
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