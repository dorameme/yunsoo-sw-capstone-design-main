import NovelItem from "./NovelItem";

const NovelList = ({ title, value }) => {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {value.map((novelData, idx) => (
          <li key={idx}>
            <NovelItem data={novelData} ilstId={idx} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NovelList;
