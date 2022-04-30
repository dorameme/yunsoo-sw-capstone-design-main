import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const WriterChapter = () => {
  // 데이터를 가져오는 작업
  const location = useLocation();
  const state =
    location.state || JSON.parse(localStorage.getItem("currentNovel"));
  if (location.state)
    localStorage.setItem("currentNovel", JSON.stringify(location.state));

  console.log(state);

  return (
    <>
      <Link
        to={`/novel-list/writer/novel/editor/${state.novelTitle}?chapterNo=${
          state.howManyChapter + 1
        }`}
        state={{
          title: state.novelTitle,
        }}
      >
        <button>챕터 작성하기</button>
      </Link>
    </>
  );
};

export default WriterChapter;
