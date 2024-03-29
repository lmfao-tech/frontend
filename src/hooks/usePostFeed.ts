import { useEffect, useState } from "react";
import Post from "~/types/Post";


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

export default function usePostFeed({ url } : {url: string}) {
  const [memes, setMemes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [meta, setMeta] = useState<any>({});

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then(
        async (res) => {
          let data = await res.json();
          if (data.error === "Unauthorized") {
            data = []
          }
          setMeta(data.meta);
          setMemes(memes => Array.from(new Set([...memes, ...data.memes])));
          setLoading(false);
          setHasMore(data.length >= 100);
        }
      );
  }, [url]);

  return { memes, loading, hasMore, meta };
}
