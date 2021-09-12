import { api, data, Request, Response } from "@serverless/cloud";
import { nanoid } from "nanoid";

interface Item {
  id: string;
}

api.get(
  "/api/items",
  async (req: Request, res: Response): Promise<Response<Item>> => {
    const id = nanoid(12);
    //Write a random item to the table
    await data.set(`item:${id}`, { id });
    //Retrieve all of the items
    const itemResponse = await data.get<Item>("item:*");
    return res.json(itemResponse?.items?.map((keyValue) => keyValue.value));
  }
);
