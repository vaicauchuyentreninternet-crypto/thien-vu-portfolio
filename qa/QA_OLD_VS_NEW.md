# Old vs New — cổng duyệt trước khi deploy (2026-11-15)

So sánh **live đang chạy** (`origin/main` = `3a8678c`) với **bản local** (`main` = `78a02fd`,
5 commit ahead, fast-forward). Đây là cổng bắt buộc của `ui-ux-review-rubric` trước khi đưa
lên root/live.

## Cách chụp (đã xác minh từng bước)
- Chrome thật, cùng viewport: desktop **1440×900**, mobile **390×844**.
- Mỗi lần chụp: đợi `body.boot-complete`, đặt `scroll-behavior:auto`, `scrollTo` rồi **đọc lại
  `window.scrollY` khớp tuyệt đối** trước khi chụp; kiểm tra `location.href` để chắc chắn
  tab đang chụp đúng bản (cũ/live vs mới/local).
- Ảnh: `qa/side_desktop.png`, `qa/side_mobile.png` (lưới cũ|mới × fold / khu SKU / giữa trang).

## Kết quả pixel-diff (ngưỡng >8/255 so với ảnh cùng kích thước)
| Vị trí | desktop 1440 | mobile 390 |
|---|---|---|
| Fold (y=0) | 0.01 % | 0.00 % (max lệch 2) |
| Giữa trang | 0.04 % (y=9000) | 0.00 % (max lệch 1, y=6000) |
| Khu vực SKU decoder | **0.44 %** (y=12471) | **1.82 %** (y=14547) |

**Kết luận:** danh tính thị giác giữ nguyên — fold và giữa trang gần như pixel-identical giữa
hai bản. Khác biệt đáng chú ý duy nhất nằm ở khu vực `#sku-lab`.

## Phát hiện quan trọng: bản mới đã xoá 2 widget ĐANG CHẠY
Commit `3ff6a59` ("Remove SKU decoder + email/consent demos (inert widgets)") gọi hai widget là
*inert* — **sai**. Trên bản live chúng hoạt động thật, đã test bằng Chrome:

- `#sku-lab` — "Try the SKU decoder.": nhập `G75N1ZT00010476` → decode ra Material / Purity /
  Product type / Remaining code; nhập SKU sai định dạng → báo lỗi. **Chạy.**
- `.email-test` — "Validate email and consent.": nhập email + tick consent → "Validation passed:
  email format and explicit consent confirmed." **Chạy.**

Bản mới xoá cả HTML lẫn JS của hai widget này (còn 16 section thay vì 17) và sửa mô tả mục
"About this portfolio" cho khớp. Đây là **thay đổi nội dung**, không phải chỉ thêm motion — theo
rubric nói là regression cho tới khi chứng minh tốt hơn.

## Cần user quyết
1. **Giữ nguyên bản xoá** (gọn hơn, nhưng mất 2 demo tương tác đang chạy), hoặc
2. **Khôi phục lại** `#sku-lab` + `.email-test` rồi mới push.

Chưa push. Chỉ có thể lên live sau khi user duyệt.
