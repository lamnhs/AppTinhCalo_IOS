# 📱 HƯỚNG DẪN CÀI ĐẶT CÁ NHÂN ỨNG DỤNG LÂMBE CALORIE LÊN IPHONE 14 PRO MAX

Tệp hướng dẫn này tổng hợp đầy đủ 2 phương pháp cài đặt ứng dụng **LâmBe Calorie** trực tiếp lên **iPhone 14 Pro Max** mà không cần qua AppStore.

---

## ⚡ CÁCH 1: CÀI TRỰC TIẾP KHÔNG DÂY QUA SAFARI (KHUYÊN DÙNG - KHÔNG CẦN CÁP USB)

> **Ưu điểm:** Cực nhanh (10 giây), dùng được ngay mà KHÔNG CẦN CẮM DÂY, KHÔNG LO HẾT HẠN CHỨNG CHỈ, giao diện tràn màn hình chuẩn Native iOS 100%.

### 🔹 Bước 1: Kích hoạt link 1 lần duy nhất trên GitHub (trên máy tính)
1. Mở trang cài đặt GitHub của bạn:  
   👉 [https://github.com/lamnhs/AppTinhCalo_IOS/settings/pages](https://github.com/lamnhs/AppTinhCalo_IOS/settings/pages)
2. Tại mục **Build and deployment** -> **Source**: Đổi từ `Deploy from a branch` sang chọn **`GitHub Actions`**.

### 🔹 Bước 2: Thêm ứng dụng vào màn hình chính iPhone 14 Pro Max
1. Mở trình duyệt **Safari** trên iPhone 14 Pro Max và truy cập link:  
   👉 **`https://lamnhs.github.io/AppTinhCalo_IOS/`**
2. Bấm vào nút **Chia sẻ (Share)** (hình vuông có biểu tượng mũi tên chỉ lên ở thanh công cụ dưới Safari).
3. Cuộn xuống chọn **`Thêm vào Màn hình chính` (`Add to Home Screen`)**.
4. Nhấn **Thêm (Add)** ở góc trên bên phải.

🎉 **Kết quả:** Biểu tượng **LâmBe Calorie** xuất hiện ngay trên màn hình chính iPhone 14 Pro Max của bạn. Mở lên dùng full màn hình, offline mượt mà!

---

## 🔌 CÁCH 2: CÀI FILE `.IPA` NATIVE BẰNG SIDELOADLY (KHI VỀ NHÀ CÓ CÁP USB)

> **Ưu điểm:** Cài thành 1 tệp `.ipa` Native hoàn toàn trong hệ thống iOS.

### 🔹 Các bước thực hiện:
1. **Chuẩn bị:** Mở phần mềm **Sideloadly** trên máy tính Windows.
2. **Kéo file IPA:** Kéo tệp **`LamBeCalorie.ipa`** (được tải về từ GitHub Actions hoặc thư mục dự án) thả vào ô hình vuông có biểu tượng **`IPA`** bên trái Sideloadly.
3. **Nhập Apple ID:** Điền tài khoản `lamlove613680@gmail.com` vào ô `Apple ID`.
4. **Cắm cáp USB:** Cắm iPhone 14 Pro Max vào máy tính bằng cáp sạc USB.
   * Trên iPhone: Chọn **`Tin cậy máy tính này` (`Trust`)** và nhập mật khẩu mở khóa màn hình.
   * Ô `iDevice` trên Sideloadly sẽ tự động chuyển từ `<no devices detected>` sang tên **iPhone 14 Pro Max** của bạn.
5. **Bấm Start:** Nhấn nút **`Start`** màu xanh phía dưới -> Nhập mật khẩu Apple ID khi phần mềm hỏi -> Chờ 30 giây cài xong!
6. **Kích hoạt Tin cậy trên iPhone 14 Pro Max:**
   * Vào **Cài đặt (Settings)** -> **Cài đặt chung (General)** -> **Quản lý VPN & Thiết bị (VPN & Device Management)**.
   * Chọn tài khoản Apple ID `lamlove613680@gmail.com` -> Nhấn **`Tin cậy` (`Trust`)**.

---

## 🛠️ CÁCH LẤY FILE `.IPA` MỚI NHẤT TRÊN GITHUB (KHI CÓ UPDATE)
1. Truy cập: [https://github.com/lamnhs/AppTinhCalo_IOS/actions](https://github.com/lamnhs/AppTinhCalo_IOS/actions)
2. Bấm vào bản build mới nhất thành công (Dấu tích xanh `Success`).
3. Cuộn xuống phần **Artifacts** -> Bấm biểu tượng nút **Tải về (Download)** tại dòng **`LamBeCalorie-iOS-IPA`**.
4. Giải nén file `.zip` ra để lấy file `LamBeCalorie.ipa` mới nhất.

---
*Ghi chú được khởi tạo tự động cho người dùng LâmBe Calorie.*
