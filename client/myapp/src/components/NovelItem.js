// novelTitle: "",
// novelGenre: "fantasy",
// selectedImage: null,
// novelDescription: "",
// userId: userAccount.userId,
// novelId: uuidv4(),

import { Link } from "react-router-dom";

const NovelItem = ({ data, listId }) => {
  console.log(data);
  return (
    <>
      <Link
        to={`/novel-list/writer/novel/${data.novelTitle}`}
        state={{
          novelTitle: data.novelTitle,
          novelDescription: data.novelDescription,
          selectedImageUrl: data.selectedImage.src,
          howManyChapter: data.currentChapter,
        }}
      >
        <h3 style={{ marginTop: "10px", fontSize: "30px" }}>
          {data.novelTitle}
        </h3>
        <img src={data.selectedImage.src} width="300px" alt={listId} />
      </Link>
      {/* 'px' 부분은 임시적으로 한 것이니 바꾸어야 한다. */}
      <p>작가: {data.userId}</p>
      <p>장르: {data.novelGenre}</p>
    </>
  );
};

export default NovelItem;
