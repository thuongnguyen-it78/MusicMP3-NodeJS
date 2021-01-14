# Auth
1. Login
    - API: POST /auth/login
    - Input: username, password
    - Output: token, có payload là userID.
    - *) Điều kiện đăng nhập là tài khoản, mật khẩu đúng và active = true
2. Signup
    - API: POST /auth/signup
    - Input: fullname, email, password, gender
    - Output: token, có payload là userID. Server gửi code verify user qua email.
3. Vefify user
    - API: POST /auth/verify
    - Input: code 
    - Output: 
# Chức Năng 
1. Home
    - API: GET /
    - Output:
2. Search
    - API: GET /search?q=...
    - Output:
3. Tạo một album
    - API: POST /me/album
    - Input: albumName
    - Output: success or false
4. Xóa một album theo id
    - API: DELETE /me/album/:id
    - Output: success or false
5. Thêm một bài hát vào album theo id bài hát
    - API: POST me/album/store/:id
    - Output: success or false
6. Thêm một bài hát vào danh sách bài hát yêu thích
7. Xóa một bài hát ra khỏi danh sách yêu thích
8. Lấy ra một bài hát theo id
9. Lấy ra một album theo id

