import userAccount from "./userAccount";

const CurrentPoint = () => {
  return <h2>{`현재 포인트: ${userAccount.point}`}</h2>;
};

export default CurrentPoint;
