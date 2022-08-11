import React, { ReactElement, useEffect } from "react";
import NotFeedPage from "~/components/layouts/NotFeedPage";

function Supermod() {
  const [data, setData] = React.useState<any>({ total: {} });
  const [blocked, setBlocked] = React.useState<string[]>([]);
  const [urls, setUrls] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<string[]>([]);
  const [action, setAction] = React.useState<string>("add");
  const [selectedType, setSelectedType] = React.useState<string>("url");
  const [values, setValues] = React.useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/supermod");
      const data = await response.json();
      setBlocked(data.keywords);
      setUrls(data.urls);
      setUsers(data.blocked);
      setData(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const fetchUrl = `/api/supermod?action=${action}&${
      selectedType ? selectedType : "word"
    }=${values}`;
    const response = await fetch(fetchUrl);
    const data = await response.json();
    setBlocked(data.keywords);
    setUrls(data.urls);
    setUsers(data.blocked);
  };

  return (
    <div>
      <div className="flex justify-center text-center">
        <h1 className="text-3xl dark:text-white mt-10">Supermod</h1>
      </div>

      <div className="mx-3 mt-10">
        <div className="dark:text-white mb-4 flex w-full justify-around items-center">
          <div>
            <span className="text-xl">Total memes</span>
            {data?.total &&
              Object.keys(data.total).map((key) => (
                <div key={key}>
                  {key} : {data.total[key]}
                </div>
              ))}
          </div>

          <div className="max-h-min">
            <span className="text-xl">Moderator performance</span>
            {data?.mods &&
              Object.keys(data.mods).map((key) => (
                <div key={key}>
                  {key} : {data.mods[key]}
                </div>
              ))}
          </div>
        </div>
        <div className="flex w-full justify-center items-center gap-2 mb-4">
          <select
            onChange={(e) => setAction(e.target.value)}
            name="action"
            value={action}
            required
          >
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>

          <select
            name="type"
            required
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
          >
            <option value="url">URL</option>
            <option value="users">User</option>
            <option value="word">Keyword</option>
          </select>

          <input
            type="text"
            name="value"
            placeholder="Value"
            required
            onChange={(e) => setValues(e.target.value)}
            value={values}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 rounded-md px-3 py-2"
          >
            Submit
          </button>
        </div>

        <div className="flex justify-around">
          <div>
            <span className="text-xl dark:text-white font-bold">
              Blocked users
            </span>
            <ul className="dark:text-white h-96 overflow-auto">
              {users.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xl dark:text-white font-bold">
              Blocked URLs
            </span>
            <ul className="dark:text-white h-96 overflow-auto">
              {urls.map((url_) => (
                <li key={url_}>{url_}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xl dark:text-white font-bold">
              Blocked keywords
            </span>
            <ul className="dark:text-white h-96 overflow-auto">
              {blocked.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
Supermod.getLayout = (page: ReactElement) => {
  return <NotFeedPage>{page}</NotFeedPage>;
};

export default Supermod;
