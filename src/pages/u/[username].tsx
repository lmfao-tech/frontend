import React, { useEffect } from "react";
import { useRouter } from "next/router";
import FeedPage from "~/components/layouts/FeedPage";
import { ReactElement } from "react";
import NotFeedPage from "~/components/layouts/NotFeedPage";

function UserProfile() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>();
  const { username } = router.query;

  useEffect(() => {
    const res = fetch(`/api/db/user?username=${username}`)
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        setUser(user.data);
      });
  }, [username, router]);

  return (
    <div className="grid lg:grid-cols-6">
      <div className="col-span-4 bg-blue-600 min-h-screen w-full"></div>
      <div>
        {/* Display the user object*/}
        {user && (
          <div>
            <p>{user.name}</p>
            <p>{user.screen_name}</p>
            <p>{user.profile_image_url}</p>
            <p>{user.number_of_memes}</p>
            <p>{user.rank}</p>
            <p>{user.lmfao}</p>
            <p>{user.haha}</p>
            <p>{user.streaks}</p>
            <p>{user.max_streaks}</p>
          </div>
        )}
      </div>
    </div>
  );
}

UserProfile.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default UserProfile;
