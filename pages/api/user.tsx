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
  type: boolean;
  type_var1: string[];
  type_var2: string[];
  type_var3: object;

}

export default async (
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
  ): Promise<void> => {
    if (req.method === "POST") {
      const { name, email, cellphone, type,
        type_var1, type_var2, type_var3 } = req.body;
        
      if (!type) {
        if (!name || !email || !cellphone) {
          res.status(400).json({ error: "Missing body parameter" });
          return;
        }
      } else{
        if (
          !name ||
          !email ||
          !cellphone ||
          !type_var1 ||
          !type_var2 ||
          !type_var3
        ) {
          res.status(400).json({ error: "Missing body parameter" });
          return;
        }
      }
      
      const { db } = await connect();

      const response = await db.collection('users').insertOne({
        name, 
        email,
        cellphone, 
        type,
        type_var1: type_var1 || [],
        // if the variable exists: it is recorded in DB, else: it is seted to be an empty array.
        // The same logic is applied to other variables
        type_var2: type_var2 || [],
        type_var3: type_var3 || {}
      });

      res.status(200).json(response.ops[0]);
    } else if (req.method === "GET") {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Missing email on request body"});
        return;
      }

      const { db } = await connect();
      const response = await db.collection('users').findOne({ email })

      if (!response) {
        res.status(200).json({ error: "User with this email not found" });
        return;
      }

      res.status(200).json(response)
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }


};