import { v4 as uuidv4 } from "uuid";

const userAccount = {
  userId: uuidv4(),
  point: 12000,
  writingNovelList: [],
  purchasedNovelList: [],
};

export default userAccount;
