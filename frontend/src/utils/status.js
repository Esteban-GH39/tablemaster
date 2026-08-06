import { capitalize } from "./formatText";

import { TOURNAMENT_STATUS, MATCH_STATUS } from "./constants";

export const getStatusVariant = (status) => {
    switch(status){
        case TOURNAMENT_STATUS.DRAFT:
        case MATCH_STATUS.PENDING:
            return "warning";
        case TOURNAMENT_STATUS.REGISTRATION:
            return "success";
        case TOURNAMENT_STATUS.IN_PROGRESS:
            return "info";
        case TOURNAMENT_STATUS.FINISHED:
            return "secondary";
        case TOURNAMENT_STATUS.CANCELLED:
            return "danger";
        default:
            return "default";
    }
};

export const formatStatus = capitalize;