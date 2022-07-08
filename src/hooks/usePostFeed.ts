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

export default function usePostFeed({lastMemeIndex} : {lastMemeIndex: number}) {
  const [memes, setMemes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/getMemes?last=${lastMemeIndex}&max_tweets=5`)
      .then((res) => res.json())
      .then((data) => {
        setMemes(memes => Array.from(new Set([...memes, ...data])));
        setLoading(false);
        setHasMore(data.length >= 500);
      });
  }, [lastMemeIndex]);

  return { memes, loading, hasMore };
}
