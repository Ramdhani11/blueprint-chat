import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import "./App.css";

interface DataProps {
  id: number;
  speaker: string;
  english_text: string;
  japanese_text: string;
}

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err));

const App = () => {
  // const [datas, setDatas] = useState([]);
  const [text, setText] = useState("");
  const { data, error, isLoading } = useSWR(
    "http://localhost:8083/api/conversations",
    fetcher
  );

  const postData = async (text: string) => {
    const respone = await axios.post(
      "http://localhost:8083/api/conversations",
      {
        speaker: "107",
        user_id: "user1",
        chat_room_id: "room13",
        original_message: text,
      }
    );

    console.log(respone.data);
  };

  const clickHandler = async () => {
    await postData(text).catch(() => setText(""));
    setText("");
  };

  // useEffect(() => {
  //   (async () => {
  //     await axios
  //       .get("http://t-chat.107.jp/api/conversations")
  //       .then((res) => setDatas(res.data))
  //       .catch((err) => console.log(err));
  //   })();
  // }, []);
  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Error....</div>;
  return (
    <div>
      
      {/* {data.message} */}
      {data?.map((data: DataProps) => {
        return (
          <div key={data.id} style={{ color: "#fff" }}>
            {data.english_text}
          </div>
        );
      })}
      <input
        type="text"
        name="ori_text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={() => clickHandler()}>Kirim</button>
    </div>
  );
};

export default App;
