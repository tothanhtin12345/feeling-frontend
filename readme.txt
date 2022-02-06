- Project: Mạng xã hội - Feeling
- Truy cập trang web sau để xem phần giao diện của project (chưa có backend): https://social-feelings.vercel.app/
- Hoặc từ source code:
	+ Gọi lệnh npm i để cài đặt các modules cho project
	+ Sau đó gọi lệnh npm start để khởi chạy project ở local (port: 3000)

-Lưu ý: một số giao diện chưa thể truy cập thông qua giao diện trang chủ chính do chưa có backend do đó phải thêm các path sau sau domain để truy cập đến các giao diện này (Ví dụ localhost:3000/login)
	+ /login: giao diện đăng nhập
	+ /verification-code: giao diện nhập mã xác nhận lấy lại mật khẩu

-Một số vấn đề mà nhóm chưa xử lý được
	+ Vấn đề xử lý text để thực hiện chức năng tag khi bình luận vào một bài viết
	+ Hình ảnh chưa được xử lý tốt - giả sử người dùng có thể upload nhiều hình với nhiều kích thước cỡ khác nhau cho bài post thì các hình sẽ không được hiển thị một cách đầy đủ như nhau, có thể một vài hình có height quá dài sẽ bị cắt bớt - nhưng khi ở chế độ xem hình ở post modal thì hình vẫn được hiển thị đầy đủ nội dung
	+ Nhóm chưa xây dựng giao diện cho người quản lý (admin) - giao diện của phần này nhóm dự định sẽ xây dựng sau khi hoàn thành backend