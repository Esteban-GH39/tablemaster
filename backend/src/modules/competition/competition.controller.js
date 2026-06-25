import { startCompetition } from "./competition.service.js";

export const startCompetitionController = async (req,res)=>{
    try{
        const result=await startCompetition(
            Number(req.params.id)
        );
        res.status(201).json(result);
    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
};