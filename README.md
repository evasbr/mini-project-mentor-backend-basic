
# Mini project Mentoring TSC Backend Basic KSM ANDROID 2024

Ini adalah contoh mini project dari kelas TSC Backend Basic yang didemokan pada kelas. 

## Aplikasi Backend sederhana untuk postingan sosial media

## Menggunakan program
Untuk menggunakan program, install proyek dan lakukan

```bash
  npm install
```

## Format Data Postingan

Berikut adalah format data yang digunakan untuk postingan:
| field    	| Tipe   	| Keterangan                                  	|   	|   	|
|----------	|--------	|---------------------------------------------	|---	|---	|
| id       	| int    	| Required, unik, digenerate di dalam program 	|   	|   	|
| username 	| String 	| Required                                    	|   	|   	|
| image    	| Array  	| Required, minimal 1, dapat lebih            	|   	|   	|
| caption  	| String 	| Opsional                                    	|   	|   	|
| location 	| String 	| Opsional                                    	|   	|   	|
| like     	| int    	| Default 0, digenerate dalam program         	|   	|   	|


## Ketentuan API

### 1. CREATE (Menambahkan Postingan Baru)

- **Endpoint**: `/post/create`
- **Method**: `POST`
- **Body Request**:
    ```json
    {
        "username": "string",
        "image": ["string", ...],
        "caption": "string (optional)",
        "location": "string (optional)"
    }
    ```
- **Response**:
    - **Sukses**:
        - Status: `201 Created`
        - Pesan: `"Postingan berhasil dibuat"`
        - Data:
        ```json
        {
            "id": "generated_id",
            "username": "string",
            "image": ["string", ...],
            "caption": "string (optional)",
            "location": "string (optional)",
            "like": 0
        }
        ```
    - **Gagal**:

      ***Tidak ada username:***
        - Status: `400 Bad Request`
        - Pesan: `"Username harus ada dan tidak boleh kosong"`

      ***Format dan jumlah image salah***:
        - Status: `400 Bad Request`
        - Pesan: `"Image harus dikirim dam bentuk array dan memiliki minimal 1 elemen"`

### 2. READ (Melihat Semua Postingan)

- **Endpoint**: `/post/all`
- **Method**: `GET`
- **Response**:
    - **Tidak Ada Data**:
        - Status: `400 Not Found`
        - Pesan: `"Tidak ada postingan"`
    - **Ada Data**:
        - Status: `200 OK`
        - Data:
        ```json
        [
            {
                "id": "string",
                "username": "string",
                "image": ["string", ...],
                "caption": "string (optional)",
                "location": "string (optional)",
                "like": 0
            },
            ...
        ]
        ```

### 3. UPDATE 1 (Melakukan Like)

- **Endpoint**: `/posts/{id}/like`
- **Method**: `PATCH`
- **Response**:
    - **Postingan Tidak Ditemukan**:
        - Status: `404 Not Found`
        - Pesan: `"Postingan tidak ditemukan"`
    - **Sukses**:
        - Status: `200 OK`
        - Pesan: `"Postingan berhasil dilike"`
    - **Gagal**:
        - Status: `404 Not found`
        - Pesan: `"Postingan tidak ditemukan"`

### 4. UPDATE 2 (Mengganti Informasi Postingan)

- **Endpoint**: `/posts/{id}`
- **Method**: `PUT`
- **Body Request**:
    ```json
    {
        "caption": "string (optional)",
        "location": "string (optional)",
        "image": ["string", ...] // Gambar tidak boleh kosong
    }
    ```
- **Response**:
    - **Postingan Tidak Ditemukan**:
        - Status: `404 Not Found`
        - Pesan: `"Postingan tidak ditemukan. Gagal mengedit postingan"`
    - **Sukses**:
        - Status: `200 OK`
        - Pesan: `"Postingan berhasil dihapus"`
        - Data:
        ```json
        {
            "id": "string",
            "username": "string",
            "image": ["string", ...],
            "caption": "string (optional)",
            "location": "string (optional)",
            "like": 0
        }
        ```

### 5. DELETE (Menghapus Postingan Tertentu)

- **Endpoint**: `/posts/{id}`
- **Method**: `DELETE`
- **Response**:
    - **Postingan Tidak Ditemukan**:
        - Status: `404 Not Found`
        - Pesan: `"Postingan tidak ditemukan. Gagal menghapus postingan"`
    - **Sukses**:
        - Status: `200 OK`
        - Pesan: `"Postingan berhasil dihapus"`

---