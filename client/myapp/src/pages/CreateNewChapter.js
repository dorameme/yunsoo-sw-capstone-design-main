import { useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { postData } from "../components/http-request";
import axios from "axios";
import React from "react";

// 이건 진짜 서버
const api = "http://localhost:8081img";

const uploadImage = async (blob) => {
  console.log(blob);
  const formData = new FormData();
  formData.append("image", blob);

  // 서버로부터 이미지 주소 받아옴
  return await axios.post(api, formData).then((res) => {
    console.log(res.data.url);
    return res.data.url;
  });
};

const CreateNewChapter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [chapterTitle, setChapterTitle] = useState("");
  const [readTrue, setReadTrue] = useState(false);
  const [content, setContent] = useState("");
  const location = useLocation();
  const editorRef = useRef();
  const chapterNo = searchParams.get("chapterNo");

  console.log(location.state);

  const handleChangeEditor = async () => {
    const regExp = /!\[alt text\]\((?:https?:\/\/([a-zA-Z0-9/.:]{2,256}))\)/g;
    const currentContent = editorRef.current.getInstance().getMarkdown();
    const sumLength = currentContent.length;
    const getImageIndexArray = [];

    // 정규표현식이 제대로 작동되고 있는 지 확인해보기
    console.log(currentContent.match(regExp));

    // 일러스트 위치 정보 꺼내기
    for (let idx = 0; idx < sumLength; idx++) {
      const findImageIndex = currentContent.indexOf("![alt text]", idx);
      console.log(findImageIndex);
      if (findImageIndex === -1) break;
      getImageIndexArray.push(findImageIndex);
      idx = findImageIndex;
    }

    console.log(getImageIndexArray);
    // currentContent.setReadTrue(true);

    // 현재 콘텐츠에서 일러스트 이미지와 텍스트를 따로 떼어내기 (나중에 할 예정)

    // 분리된 데이터를 JSON 포맷으로 묶어 서버측에 보내면 챕터 등록 페이지로 자동 이동했을 때 등록한 챕터가 보여져야 한다.
    console.log(currentContent);

    // 일단 소설과 관련된 데이터를 이곳으로 넘겨주어야 json 포맷으로 만들어서 서버측에 보낼 수 있을 것 같다.
    // const result = await postData(`upload/${}/`);
  };

  const submitHandler = () => {};

  console.log(chapterTitle);

  return (
    <>
      <h1>소설 작성하기 - {chapterNo}화</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="chapterTitle">챕터명</label>
          <input
            id="chapterTitle"
            type="text"
            onChange={(event) => setChapterTitle(event.target.value)}
          />
        </div>
        <Editor
          usageStatistics={false}
          previewStyle="tab"
          height="600px"
          useCommandShortcut={true}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const img_url = await uploadImage(blob);
              callback(img_url, "alt text");
              return false;
            },
          }}
          ref={editorRef}
        />
        <div id="toastUIEditor">
          <div id="button">
            <Link to={`/novel-list/writer/novel/${location.state.novelTitle}`}>
              <button
                type="submit"
                className="btn-save"
                onClick={handleChangeEditor}
              >
                챕터 등록하기
              </button>
            </Link>

            {/* {readTrue && <Viewer initialValue={content} />} */}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateNewChapter;
