import * as service from "./team.service.js";

export const getTeamsController=async(req,res)=>{
    res.json(await service.getTeams());
};
export const getTeamByIdController=async(req,res)=>{
    const team=await service.getTeamById(req.params.id);
    if(!team){
        return res.status(404).json({message:"Team not found"});
    }
    res.json(team);
};

export const createTeamController=async(req,res)=>{
    res.status(201).json(await service.createTeam(req.body));
};

export const updateTeamController=async(req,res)=>{
    res.json(await service.updateTeam(req.params.id,req.body));
};

export const deleteTeamController=async(req,res)=>{
    res.json(await service.deleteTeam(req.params.id));
};

export const addPlayerController=async(req,res)=>{
    const {playerId}=req.body;
    res.status(201).json(
        await service.addPlayerToTeam(
            req.params.id,
            playerId
        )
    );
};

export const getPlayersController=async(req,res)=>{
    res.json(await service.getTeamPlayers(req.params.id));
};

export const removePlayerController=async(req,res)=>{
    res.json(
        await service.removePlayerFromTeam(
            req.params.id,
            req.params.playerId
        )
    );
};