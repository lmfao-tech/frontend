import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

let current_memes = {"meme_stream":[]};
let last_updated_timestamp = 0;

const shuffle_memes = (memes:any) => {
  let new_memes = [];
  while (memes.length > 0) {
    let index = Math.floor(Math.random() * memes.length);
    new_memes.push(memes[index]);
    memes.splice(index, 1);
  }
  return new_memes;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (Date.now() - last_updated_timestamp < 120000) {
    console.log("Returning current memes");
    res.status(200).json(current_memes);  
  } else {
    fetch("https://api.lmfao.tech/get_memes")
      .then((res) => res.json())
      .then((data) => {
        current_memes = data;
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
}
