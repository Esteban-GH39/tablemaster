export const sortStandings = (standings) => {
    return [...standings].sort((a, b) =>{
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        if (b.setDifference !== a.setDifference) {
            return b.setDifference - a.setDifference;
        }
        return b.pointDifference - a.pointDifference;
    });
};