# ROUTE NEWS

          
| Endpoint | Method | Description |
| :---: | :---: | :---: |
| api/news  | GET | Untuk mendapatkan semua data news |
| api/news/:id  | GET |  Untuk mendapatkan data berdasarkan ID |
| api/news  | POST | Untuk menyimpan data |
| api/news  | PUT | Untuk mengedit data |
| api/news/:id  | DELETE | Untuk menghapus data |

Collection : News

Field

id       : String, 

title    : String,

image  : String,

description : String,

# ROUTE COMMENT

| Endpoint | Method | Description |
| :---: | :---: | :---: |
| api/comments  | GET | Untuk mendapatkan semua data Komentar |
| api/comments/:newsid  | GET | Untuk mendapatkan semua data berdasarkan News ID |
| api/comments  | POST | Untuk menyimpan data |
| api/comments  | PUT | Untuk mengedit data |
| api/comments/:id  | DELETE | Untuk menghapus data |

Collection : Comment

Field

id       : String, 

newsId    : String,

user  : String,

comment : String,




