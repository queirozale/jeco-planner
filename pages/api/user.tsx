import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database'

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  type: string;
  type_var1: string;
  type_var2: string;
  type_var3: string;

}

export default async (
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
  ): Promise<void> => {
    const { name, email, cellphone, type,
            type_var1, type_var2, type_var3 } = req.body;

    if (type === "false") {
      if (!name || !email || !cellphone || !type) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }
    } else if (type === "true") {
      if (
        !name ||
        !email ||
        !cellphone ||
        !type ||
        !type_var1 ||
        !type_var2 ||
        !type_var3
      ) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }
    }
    
    
    const { db } = await connect();

    if (req.method === "POST") {
      const response = await db.collection('users').insertOne({
        name, 
        email,
        cellphone, 
        type
      });
      res.status(200).json(response.ops[0]);
    } else {
      res.status(400).json({ error: name })
    }


};