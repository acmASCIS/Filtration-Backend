import { Request, Response } from "express";
import { getStatusData } from "../services/status";
import { codeForcesClient } from "..";
import { calculatePointsForContest, sortPoints } from "../services/filterService";



export const filter = async (req: Request, res: Response) => {

    const contestIds: string[] = req.body.contestIds;
    const contestPoints: number[][] = req.body.contestPoints;
    let userPoints: { [handle: string]: number } = {};

    for (const [index, contestId] of contestIds.entries()) {
        try {
            const response = await getStatusData(codeForcesClient, contestId);
            if (response.status === 'OK') {
                userPoints = calculatePointsForContest(response.result, contestPoints[index], userPoints);
            }
            else {
                return res.status(500).json({ status: "failed", error: `Error fetching data for contest ${contestId}`, message: response.comment });

            }
        } catch (error) {
            return res.status(500).json({ error: `Error fetching data for contest ${contestId}` });
        }
    }


    const sortedUserPoints = sortPoints(userPoints)
    res.json(sortedUserPoints);
}



