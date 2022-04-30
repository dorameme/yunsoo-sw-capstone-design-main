import { useParams } from "react-router-dom";

const novelList = {
  harrypotter: {
    name: "해리 포터",
    description: "마법 소년",
  },
  gameofthrones: {
    name: "왕좌의 게임",
    description: "얼음과 불의 노래",
  },
};

const ReaderChapter = () => {
  const params = useParams();
  const info = novelList[params.title];

  return (
    <>
      <h1>독자소설페이지</h1>
      <div>
        <h2>{info.name}</h2>
        <p>{info.description}</p>
      </div>
    </>
  );
};

export default ReaderChapter;
