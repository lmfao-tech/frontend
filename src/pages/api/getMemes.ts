import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

// let current_memes: any[] = [];
let last_updated_timestamp = 0;

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

  const { last , max_tweets} = req.query;

  // if (Date.now() - last_updated_timestamp < 120000) {
  //   console.log("Returning current memes");
    
  //   // Return current memes [last: last+max_tweets]
  //   res.status(200).json(current_memes.slice(Number(last), Number(last) + Number(max_tweets)));
    
  // } else {
    fetch("https://api.lmfao.tech/get_memes?last=" + last + "&max_tweets=" + max_tweets)
      .then((res) => res.json())
      .then((data) => {
        // current_memes = data;
        last_updated_timestamp = Date.now();
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  }
// }
