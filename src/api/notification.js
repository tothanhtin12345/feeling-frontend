import httpRequest from "../utils/http/httpRequest";

//fetch notifications
export const fetchNotificationsRequest = ({ skip, limit }) =>
  httpRequest.get("/notification", {
    params: {
      skip,
      limit,
    },
  });

//đọc một thông báo (thực chất là set read của nó = true)
export const readNotificationRequest = (data) =>
  httpRequest.put("/notification/read", data);

//xóa một notification
export const deleteNotificationRequest = (data) =>
  httpRequest.delete("/notification", { params: { _id: data } });
