import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: string;
}


export default async (
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | object[]>
  ): Promise<void> => {
    if (req.method === "POST") {
      const { city } = req.body;
        
      if (!city) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }
      
      const { db } = await connect();
      const response = await db.collection('daily-average').find({ city }).toArray();

      if (response.length === 0) {
        res.status(404).json({ error: "City not found" });
        return;
      }

      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }
};