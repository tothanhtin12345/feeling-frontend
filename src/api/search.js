import httpRequest from "../utils/http/httpRequest";

//fetch conversations
export const searchRequest = (data) =>
  httpRequest.get("/search", {
    params: {
      ...data,
    },
  });
