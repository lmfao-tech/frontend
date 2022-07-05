import { Avatar, Button } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Profile() {
  const { data: session } = useSession();
  
  // @ts-ignore 
  let av = session?.user?.image;
  if (av) {
    av = av.replace(/_normal./, ".");
  } else {
    av = "";
  }

  useEffect(() => {
    // console.log(session)
  },[session])

  return (
    <div className="overflow-auto">
      {session ? (
        <div>
          <div className="flex flex-col items-center px-5 py-10">
            <div className="rounded-full mx-auto bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
              <div className="flex flex-col justify-between h-full text-white bg-white rounded-full">
                <Avatar img={av} rounded={true} alt="avatar" size="xl" />
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xl text-black font-trispace">
                {" "}
                {session?.user?.name}
              </span>
              <br />
              <span className="text-slate-500"></span>
            </div>
          </div>
          <div className="flex items-center justify-between mx-10">
            
            {/* TODO: Fix this */}
            <div className="text-center">
              {/* @ts-ignore */}
              <span className="font-bold">{session?.twitter?.postCount}</span>
              <br />
              Posts
            </div>
            
            <div className="text-center">
              {/* @ts-ignore */}
              <span className="font-bold">{session?.twitter?.followersCount}</span>
              <br />
              Followers
            </div>
            
            <div className="text-center">
              {/* @ts-ignore */}
              <span className="font-bold">{session?.twitter?.followingCount}</span>
              <br />
              Following
            </div>
            
          </div>

          {/* Some top accounts here */}
          
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen gap-3 px-10">
          <h1 className="text-3xl font-bold main-heading">
            <span
              className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              LMFAO
            </span>
            .tech
          </h1>
          <p className="text-sm text-center">
            A content discovery platform where you can find the best memes
            across twitter, follow memers and stay for a good laugh!
          </p>
          <Button
            outline
            size="lg"
            gradientDuoTone="purpleToPink"
            onClick={() => signIn("twitter")}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
}
