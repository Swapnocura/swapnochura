# স্বপ্নচূড়া — Final Version V1

এই ZIP-টি বর্তমান `swapnochura-main` সাইটের উপর ভিত্তি করে তৈরি করা হয়েছে।

## মূল পুরোনো সিস্টেম রাখা হয়েছে
- Product Management
- Active / Inactive
- Display Order
- Stock
- Product Search (Admin)
- Cart
- Customer Order Submit
- Admin Order List/Search/Status
- Firebase Firestore
- Admin Firebase Authentication

## Final V1-এ যোগ করা হয়েছে
- Mobile hamburger menu
- Product search on customer site
- Wishlist
- WhatsApp contact
- Customer Order Tracking
- Customer account (Email/Password)
- Customer Order History
- Payment method selection: COD / bKash / Nagad / Rocket
- Transaction ID field
- Payment status: pending / verified / rejected
- Admin payment verify/reject
- Coupon / Promo Code management
- Basic sales analytics
- New-order browser notification/polling
- Order tracking history updates
- Firebase-root hosting paths corrected

## গুরুত্বপূর্ণ
bKash/Nagad/Rocket-এর **automatic gateway API payment** এই V1-এ চালু করা হয়নি। Merchant/API credentials এবং gateway approval প্রয়োজন। এখানে payment method + transaction ID + Admin Verify/Reject workflow প্রস্তুত আছে।

## Deploy
প্রথমে বর্তমান Live site-এর backup রাখুন। তারপর এই folder-এ গিয়ে:

`firebase deploy --only hosting`

Functions deploy করবেন না, কারণ এই Final ZIP-এর লক্ষ্য Hosting update।

## Firestore collections
Existing:
- `products`
- `orders`

New:
- `coupons`

Customer login ব্যবহার করলে Firebase Authentication-এ Email/Password provider enabled থাকতে হবে।



FINAL V2 Dashboard Update (2026-10-06)
- Added full Sales Dashboard to admin.html.
- Period filters: Today, Last 7 Days, This Month, All Time.
- KPIs: sales value, order count, item quantity, average order value.
- Daily sales bars.
- Payment method breakdown.
- Order status summary.
- Top-selling products by quantity.
- CSV sales report download.
- Existing product/order/payment/coupon systems remain in place.
- Profit is not calculated because the current product data does not contain a verified cost-price field.

## Sales & Profit Dashboard Update

এই সংস্করণে Sales Dashboard উন্নত করা হয়েছে:
- Product-এ Cost Price / ক্রয়মূল্য সংরক্ষণ
- নতুন Order-এ Cost Price snapshot
- মোট Sales, Cost ও Gross Profit
- Today / Last 7 Days / This Month / All Time
- Custom From Date / To Date report
- COD / bKash / Nagad / Rocket আলাদা Sales breakdown
- Top Selling Products-এর Sales ও Profit
- বিস্তারিত searchable Sales History
- Sales CSV export-এ Product, Qty, Sales, Cost, Profit

### গুরুত্বপূর্ণ
নতুন Product যোগ/এডিট করার সময় Cost Price অবশ্যই দিন। পুরোনো Order-এ যদি Cost Price snapshot না থাকে, Dashboard বর্তমান Product-এর Cost Price ব্যবহার করে estimated historical profit দেখাবে।

Sales হিসাবের মধ্যে `confirmed`, `processing`, এবং `delivered` Order ধরা হয়। `new`, `cancelled`, এবং `rejected` Order Sales হিসেবে ধরা হয় না।
