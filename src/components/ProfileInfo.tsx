import { Avatar } from "flowbite-react";
import React from "react";

function ProfileInfo({
  profile_image_url,
  name,
  screen_name,
  number_of_memes,
  rank,
  lmfao,
  haha,
  streaks,
  max_streaks,
}: {
  profile_image_url: string;
  name: string;
  screen_name: string;
  number_of_memes: number;
  rank: number;
  lmfao: number;
  haha: number;
  streaks: number;
  max_streaks: number;
}) {
  return (
    <div>
      <Avatar img={profile_image_url} />
    </div>
  );
}

export default ProfileInfo;
