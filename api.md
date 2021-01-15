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
    - Output: true or false
# Chức Năng 
## Site
1. Home
    - API: GET /
    - Output:
2. Search
    - API: GET /search?q=...
    - Output:

## Album
1. Lấy ra một album theo id
    - API: GET /album/:id
    - Output: 

2. Lấy ra toàn bộ album
    - API: GET /album
    - Output: 

3. Tạo một album
    - API: POST /album
    - Input: albumName
    - Output: true or false

4. Chỉnh sửa tên album theo id
    - API: PATCH /album/:id
    - Input: album name
    - Output: true or false

5. Xóa một album theo id
    - API: DELETE /album/:id
    - Output: true or false

6. Thêm một bài hát vào album
    - API: POST /album/:id/add (:id là id của album)
    - Input: id bài hát (id của bài hát)
    - Output: true or false

7. Xóa một bài hát vào album
    - API: POST /album/:id/delete (:id là id của album)
    - Input: id bài hát (id của bài hát)
    - Output: true or false

## Playlist

1. Lấy ra danh sách playlist của một user
    - API: GET /me/playlist
    - Ouput: Danh sách playlist

2. Lấy ra một playlist của user theo id
    - API: GET /me/playlist/:id
    - Output: một playlist

3. Tạo một playlist
    - API: POST /me/playlist
    - Input: playlist name
    - Output: true or false

4. Chỉnh sửa tên playlist
    - API: PATCH /me/playlist:id
    - Input: new playlist name
    - Output: true or false

5. Xóa playlist
    - API: DELETE /me/playlist:id
    - Output: true or false

5. Thêm một bài hát vào playlist
    - API: POST /me/playlist/:id/add 
    - Input: id của bài hát
    - Output: true or false
6. Xóa một bài hát khỏi playlist
    - API: POST /me/playlist/:id/delete 
    - Input: id của bài hát
    - Output: true or false

## FavoriteSongs
1. Lấy ra danh sách bài hát của user
    - API: GET /me/favorite
2. Thêm một bài hát vào danh sách yêu thích
    - API: POST /me/favotite
    - Input: song id
    - Output: true or false

3. Xóa một bài hát khỏi danh sách yêu thích
    - API: PATCH /me/favorite
    - Input: song id
    - Output: true or false

## Song
1. Lấy ra toàn bộ bài hát
    - API: GET /song
2. Lấy ra một bài hát theo id
    - API: GET /song/:id
3. Thêm một bài hát
    - API: POST /song
4. Chỉnh sửa một bài hát
    - API: UPDATE /song/:id
5. Xóa một bài hát
    - API: DELETE /song/:id


