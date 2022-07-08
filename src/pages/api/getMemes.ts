import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

let current_memes = {"meme_stream":[]};
let last_updated_timestamp = 0;

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (Date.now() - last_updated_timestamp < 120000) {
    console.log("Returning current memes");
    const shuffled = shuffle(current_memes.meme_stream);
    res.status(200).json({"meme_stream": shuffled});  
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
