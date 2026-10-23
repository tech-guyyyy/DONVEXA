# DONVEXA Digital Solutions --- Business Logic & Integration Specification

**Version:** 1.0 planning draft

## 1. Purpose

This document defines authoritative application behavior for checkout,
Paystack, downloads, discounts, refunds, email, promotions and admin
actions. Implement the rules on the server; client UI is not an
authority for money or access.

## 2. Product lifecycle

1.  Admin creates a draft.
2.  Admin supplies required metadata, price, cover/thumbnail and
    file(s).
3.  System validates file extension/type, size and upload success.
4.  Before publication, validate required fields and confirm at least
    one available required digital file exists.
5.  Product becomes publicly visible only when published.
6.  Unpublishing prevents new purchases but must not silently erase
    historical orders or legitimate existing entitlements.
7.  File replacement/versioning must not unexpectedly invalidate
    previous purchases; choose and document whether existing buyers
    receive old versions, new versions, or both.

## 3. Cart and pricing

-   Client cart is a convenience layer and may persist locally for 30
    days, subject to browser limitations.
-   Server must re-fetch products and prices during checkout.
-   Deduplicate repeated additions of the same product unless a product
    explicitly supports multiple units/licenses.
-   Reject unpublished/unavailable products.
-   Revalidate discount validity, eligibility, date window, usage limits
    and current subtotal on the server.
-   Use integer money arithmetic.
-   Display NGN currency clearly.
-   The final total sent to Paystack is computed server-side, not
    accepted from the browser.
-   Cart content is not a price reservation.

## 4. Discount rules

Supported types: - Percentage discount. - Fixed-amount discount.

Minimum rules: - Code normalized consistently (e.g. trim whitespace and
normalize case). - Active status and start/end dates checked at
validation and checkout. - Usage limits enforced atomically to avoid
race conditions. - Fixed discount uses the order currency and cannot
make the total negative. - Percentage values must be within valid
bounds. - Discounts and redemption records must be idempotent for
repeated requests. - Record actual amount applied to the order. -
Discount stacking, global cap, minimum order amount, product/category
eligibility, and per-customer limits remain configurable/pending until
approved. Do not silently enable stacking.

## 5. Paystack checkout and verification

### Initialize

-   Client requests checkout with item IDs and optional discount code.
-   Server calculates subtotal, discount and final total.
-   Server creates a pending order/payment attempt with a unique
    internal reference and idempotency handling.
-   Server initializes Paystack using the verified server-calculated
    amount and NGN currency.
-   Return only the data required to redirect the customer to Paystack.

### Verify

-   On callback, the server verifies transaction status through
    Paystack's server-side verification endpoint.
-   Validate the provider reference, expected order, amount, currency
    and successful status.
-   A callback URL parameter alone is never proof of payment.
-   Customer screenshot/receipt is never proof of payment.
-   Only a verified transaction can mark the order paid and grant
    download entitlements.

### Webhook

-   Validate webhook authenticity/signature using current Paystack
    documentation and the raw request body as required by the provider.
-   Acknowledge valid events appropriately and process safely.
-   Be idempotent by provider reference/event identity and conditional
    state transitions.
-   Do not assume event delivery order.
-   Log failures with a correlation/reference, but never log secrets.
-   If verification or database processing fails, support safe
    retries/reconciliation.

### Failure states

-   Pending: no entitlement; provide safe refresh/check status and
    support guidance.
-   Failed/cancelled: no entitlement; allow the customer to retry
    safely.
-   Duplicate callback/webhook: no duplicate order, payment fulfillment,
    discount redemption or email.
-   Payment success but email failure: order remains paid; email can
    retry.
-   Payment status unclear: do not show success until authoritative
    verification confirms it.

## 6. Order fulfillment and delivery

-   After verified success, atomically mark payment successful/order
    confirmed and create entitlements once.
-   Generate receipt/order confirmation details from the authoritative
    order snapshot.
-   Show download page to the verified customer.
-   Send transactional email after provider selection and sender
    verification.
-   Email delivery must not be a prerequisite for on-site access.
-   A missing file should trigger an operational alert; do not show a
    broken download button as if the file were available.
-   If the same product has PDF and EPUB versions, show the formats the
    customer is entitled to access.
-   For footage/media products, display relevant file metadata and
    usage/licensing details only if configured.

## 7. Download authorization

Every download request must verify: 1. The entitlement exists and is
active. 2. The associated payment/order is in a qualifying state. 3. The
requested file belongs to the purchased product. 4. The entitlement has
not been revoked under the approved policy. 5. The request passes
rate-limit and abuse controls.

Use a short-lived signed URL or a server-controlled stream/redirect.
Never store permanent public download URLs in the page, email, analytics
or database as the only security barrier. Do not expose private storage
keys to unauthorized clients.

Guest access recovery must verify email ownership through a
time-limited, single-use token/code. Do not reveal order existence
before verification. Provide clear expired-link and retry states.

## 8. Refund workflow

1.  Customer submits a request through the documented support path.
2.  Store request details and set refund decision state to
    requested/pending review.
3.  Administrator reviews order, payment, request reason and relevant
    policy.
4.  Administrator approves or rejects with an audit record.
5.  For approved refunds, initiate the supported Paystack refund
    process.
6.  Track processing separately from approval.
7.  Verify provider outcome and update refund/payment/order state.
8.  Notify customer after email integration is configured.
9.  Apply download-access policy only according to the approved rule;
    partial refunds require explicit policy.
10. Never label refund complete merely because an admin clicked approve
    or an API request was sent.

Support failed refund processing and safe retry/reconciliation without
issuing duplicate refunds.

## 9. Email events

Provider remains undecided. Design provider-independent templates/events
for: - Order receipt/confirmation. - Download access/recovery. - Payment
pending or failed where useful. - Email verification for guest
recovery. - Refund received, approved/rejected, processing,
completed/failed. - Operational alert for missing files/payment/email
errors.

Requirements: - Store send status and provider message ID when
available. - Retry transient failures with bounded retries/backoff. -
Avoid duplicate messages for repeated webhook events; use idempotency
keys/event records. - Never include secret keys, sensitive payment data
or long-lived public file URLs. - Verify sender/domain before
production. - Do not treat an email provider's free-tier availability or
branding terms as confirmed until evaluated.

## 10. Promotions

Admin can create promotional banners/flyers with: - Image asset. -
Headline and optional supporting copy. - CTA label. - Destination URL
(internal or external). - Placement. - Start/end schedule. -
Active/inactive state. Validate destination URLs and reject unsafe
schemes. Expired or inactive promotions must not be shown. Preview
before activation is recommended.

## 11. Admin actions and audit

Record important changes such as: - Product publish/unpublish and file
replacement. - Price changes. - Discount create/edit/disable. - Refund
approval/rejection/processing. - Manual recovery or access revocation. -
Integration and store settings changes. Audit entries must identify the
actor and affected entity and must not include secrets.

## 12. Analytics

Track relevant events such as view_product, search, add_to_cart,
begin_checkout, verified_purchase, and download_requested where privacy
policy permits. Purchase revenue must come from verified payment/order
records. Do not count a browser success-page visit as a purchase. Avoid
sending personal email addresses, payment references, or signed URLs to
third-party analytics unless explicitly justified and disclosed.

## 13. Operational failure matrix

-   Paystack unavailable during initialization: preserve cart; explain
    issue; do not mark paid.
-   Webhook delayed: verify by server-side status check; keep pending
    until confirmed.
-   Webhook duplicated: idempotent no-op after prior processing.
-   File upload incomplete: do not publish.
-   File missing after publication: alert admin and suppress broken
    download action.
-   Email provider outage: keep purchase valid; record and retry email.
-   Discount race: enforce limits atomically and return clear message if
    exhausted.
-   Refund API failure: keep refund processing/failed, alert admin, and
    prevent blind duplicate retries.
-   Storage link expired: reauthorize and issue a new short-lived link
    if entitlement remains valid.
