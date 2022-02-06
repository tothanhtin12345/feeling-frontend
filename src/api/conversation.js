import httpRequest from "../utils/http/httpRequest";

//fetch conversations
export const fetchConversationsRequest = ({ skip, limit, type, updatedAt }) =>
  httpRequest.get("/conversation", {
    params: {
      skip,
      limit,
      type,
      updatedAt,
    },
  });

//lấy mã conversationId cho mỗi người dùng online
export const getConversationIdForEachUser = ({ usersId }) =>
  httpRequest.request({
    method: "POST",
    url: "/conversation/id-for-each-user",
    data: { usersId },
  });


