import { Submission } from "@acmascis/codeforces-client/build/interfaces/submission.interface";

    
  export const calculatePointsForContest = (
    submissions: Submission[],
    pointsArray: number[],
    existingPoints: { [handle: string]: number },
    upsolving: boolean
): { [handle: string]: number } => {

    const handlesProcecessed =  new Set();
    submissions.forEach(submission => {
        if (submission.verdict === 'OK' 
        && (upsolving? submission.author.participantType === 'CONTESTANT' 
        || submission.author.participantType === 'PRACTICE' 
        : submission.author.participantType === 'CONTESTANT')) {
            
            const handle = submission.author.members[0].handle;
            const problemIndex = submission.problem.index.charCodeAt(0) - 'A'.charCodeAt(0);
            if (handlesProcecessed.has(handle+problemIndex)) {
                return;
            }
            handlesProcecessed.add(handle+problemIndex);
            

            if (!existingPoints[handle]) {
                existingPoints[handle] = 0;
            }

            if (pointsArray[problemIndex] !== undefined) {
                existingPoints[handle] += pointsArray[problemIndex];
            }
        }
    });

    return existingPoints;
};

export const sortPoints = (userPoints: { [handle: string]: number }) =>{
    const sortedUserPoints = Object.entries(userPoints)
        .sort((a, b) => b[1] - a[1])
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        return sortedUserPoints;
}


