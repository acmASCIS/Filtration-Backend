import _ from 'lodash';
import CodeforcesClient from '@acmascis/codeforces-client';
import { Submission } from '@acmascis/codeforces-client/build/interfaces/submission.interface';

export const getStatusData = async (client: CodeforcesClient, contestId: string) => {
    
    const contestStatus = await client.contest.status({ contestId: contestId });

    return contestStatus;   };


