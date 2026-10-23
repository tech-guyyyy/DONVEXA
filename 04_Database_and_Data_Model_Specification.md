# DONVEXA Digital Solutions --- Database & Data Model Specification

**Version:** 1.0 planning draft

## 1. Database principles

Use PostgreSQL through Supabase. Use migrations, foreign keys,
constraints, appropriate indexes, and explicit access policies. Store
monetary amounts as integer minor units (kobo for NGN) or another
consistently documented exact representation; do not use floating-point
values for money. Store timestamps in UTC and display them in the
appropriate locale/time zone.

Historical order records must be immutable snapshots of what was
purchased. Current product prices or descriptions must not rewrite a
customer's old receipt.

## 2. Proposed entities

Names are conceptual and can be adapted during implementation, but their
responsibilities must remain clear.

### products

-   id (UUID primary key)
-   title
-   slug (unique)
-   creator/author
-   short_description
-   full_description
-   product_type (extensible classification, e.g. ebook, guide, footage,
    media_asset)
-   category_id (nullable if category handling permits)
-   price_amount (integer minor units)
-   currency (NGN at launch)
-   cover_asset_key or public cover URL, depending on storage design
-   status (draft, published, unpublished/archived)
-   is_featured, is_new_release
-   language/publication metadata where applicable
-   created_at, updated_at, published_at

### product_files

-   id
-   product_id
-   storage_key (private object key; never a public permanent URL)
-   original_filename
-   display_filename
-   format/extension
-   MIME type where available
-   size_bytes
-   version_label or version_number
-   is_primary
-   is_available
-   created_at, updated_at
-   optional checksum for integrity verification

A product may have multiple files/formats. Initial ebook formats are PDF
and EPUB. If footage/media is enabled at launch, its allowed formats and
maximum sizes must be explicitly configured and documented.

### categories

-   id, name, slug, description, display_order, is_active, created_at,
    updated_at

### customers

-   id
-   normalized_email
-   email_verified_at (nullable)
-   optional auth_user_id (nullable; unique when present)
-   created_at, updated_at

Do not expose customer rows publicly. Avoid duplicate customer
identities caused by email case or whitespace differences.

### orders

-   id
-   public_order_reference (unique, non-guessable)
-   customer_id
-   customer_email_snapshot
-   currency
-   subtotal_amount
-   discount_amount
-   total_amount
-   order_status (e.g. pending, confirmed, cancelled,
    refunded/partially_refunded as policy permits)
-   payment_status (e.g. pending, successful, failed,
    partially_refunded, refunded)
-   fulfillment_status (e.g. not_ready, ready, partially_revoked,
    revoked)
-   discount_id (nullable)
-   created_at, updated_at, paid_at
-   metadata only for non-sensitive operational fields

Keep separate state fields where the concepts differ. Do not overload
one status to represent payment, delivery and refund simultaneously.

### order_items

-   id
-   order_id
-   product_id (nullable if a historical product is later removed;
    preserve snapshot)
-   product_title_snapshot
-   creator_snapshot
-   product_type_snapshot
-   quantity (normally 1 for digital products unless licensed quantity
    is later defined)
-   unit_price_amount
-   discount allocation where applicable
-   line_total_amount
-   purchased file/version metadata snapshot as appropriate

### payments

-   id
-   order_id
-   provider (Paystack)
-   provider_reference (unique)
-   provider_transaction_id if available
-   amount_amount
-   currency
-   status (initialized, pending, verified_success, failed, reversed or
    provider-defined states mapped carefully)
-   verification result and timestamps
-   created_at, updated_at
-   safe provider metadata only; no secrets or card data

### refunds

-   id
-   payment_id and order_id
-   requested_by/customer reference as available
-   request_reason
-   requested_amount
-   approved_amount
-   decision_status (requested, approved, rejected, cancelled)
-   processing_status (not_started, processing, completed, failed)
-   provider_refund_reference where available
-   reviewed_by_admin_id
-   reviewed_at, processed_at, created_at, updated_at
-   notes suitable for operational use; avoid storing unnecessary
    sensitive data

Approval and provider processing are separate facts.

### discounts

-   id, code (normalized and unique)
-   type (percentage, fixed_amount)
-   value
-   currency for fixed amount
-   starts_at, ends_at
-   is_active
-   usage_limit_total, usage_limit_per_customer where required
-   usage_count or derived redemption count with concurrency-safe
    enforcement
-   minimum_order_amount if supported
-   product/category eligibility rules if approved
-   created_by, created_at, updated_at

### discount_redemptions

-   id, discount_id, order_id, customer_id/email identity as
    appropriate, amount_applied, redeemed_at
-   enforce idempotency so a retried checkout does not consume usage
    twice

### download_entitlements

-   id, order_item_id, customer_id
-   status (active, revoked, expired if applicable)
-   granted_at, revoked_at, revocation_reason
-   access policy metadata

Entitlements should be created only after verified successful payment.

### download_events

-   id, entitlement_id, product_file_id
-   event type (requested, authorized, completed if measurable, denied)
-   created_at
-   non-sensitive diagnostics only

A request event is not proof that a full file was downloaded.

### promotions

-   id, title, body, image_storage_key/public asset reference, CTA
    label, destination URL
-   placement
-   starts_at, ends_at
-   is_active
-   created_at, updated_at

### email_events

-   id, order_id/customer_id where appropriate
-   provider, provider_message_id
-   template/type
-   recipient
-   status, attempts, last_error (sanitized), sent_at, created_at,
    updated_at

### admin_profiles / admin identity mapping

Use Supabase Auth identities for authentication and a protected
profile/role mapping only if needed. Do not create a public signup path
that grants administrator access. Admin authorization must be checked
server-side and through appropriate database policies.

### audit_logs

-   id
-   actor_admin_id
-   action
-   entity_type, entity_id
-   timestamp
-   safe before/after summary where useful
-   request/correlation ID if available
-   do not log secrets or complete signed URLs

### analytics

Prefer a privacy-conscious external analytics provider for visitor and
funnel analytics. Store only business events in the database when needed
for operational reporting. Do not use analytics as the source of truth
for payment revenue.

## 3. Relationships

-   One category can have many products.
-   One product can have many product files.
-   One customer can have many orders.
-   One order has one or more order items.
-   An order can have one or more payment attempts, subject to the
    chosen payment model.
-   A payment can have refund records.
-   An order item can grant one or more file entitlements according to
    product file/version rules.
-   Discounts can have many redemption records.
-   Promotions are independent of product purchases unless an explicit
    association is introduced.
-   Audit logs reference administrator identities and affected records
    where possible.

## 4. Constraints and indexes

-   Unique product slug.
-   Unique normalized discount code.
-   Unique Paystack provider reference.
-   Unique public order reference.
-   Foreign keys for all stable relationships.
-   Index order creation date, order status, payment status, customer
    email/ID, provider reference, product status/category, and download
    entitlement lookup fields.
-   Validate positive prices and sensible discount ranges.
-   Fixed discounts cannot exceed eligible subtotal unless explicit
    policy defines a different behavior; total must never become
    negative.
-   Use database transactions or atomic server operations for payment
    fulfillment and discount redemption.
-   Ensure a single verified payment cannot grant duplicate
    entitlements.
-   Ensure public reads can only return published product fields and
    never private storage keys.

## 5. RLS and access policy outline

-   Anonymous users: read only published catalogue fields and public
    cover/preview assets.
-   Authenticated customers: access only their own profile and
    authorized orders/library, subject to a verified identity/ownership
    model.
-   Guest recovery: use server-mediated, time-limited verification
    tokens; never make guest orders publicly queryable by order
    reference alone.
-   Administrator: authorized read/write according to the approved admin
    role; no public signup grants admin rights.
-   Service/server operations: privileged access only on the server;
    secrets never reach browser code.
-   Storage: private bucket for purchased files; public bucket only for
    approved public cover/preview assets if chosen.
-   RLS policies must be tested for anonymous, authenticated, admin, and
    server/service contexts.

## 6. Order/payment state model

Keep payment status separate from order and fulfillment status. -
Pending order + pending payment: no download entitlement. - Verified
successful payment: mark payment successful, order confirmed, create
entitlements exactly once. - Failed/abandoned payment: no entitlement;
allow safe retry or new attempt under a defined idempotency strategy. -
Partial refund: record exact amount and status; apply an owner-approved
access policy. - Completed full refund: record provider-confirmed
outcome; access handling follows the explicitly approved refund
policy. - Webhook duplicate: no duplicated order, discount redemption,
email side effect or entitlement. - Email failure: payment/order remain
valid; email event records retryable failure.

## 7. Migration and data integrity requirements

-   Schema changes must be versioned and repeatable.
-   Never edit production schema manually without a migration.
-   Include development seed data clearly marked as sample; never mix
    fake orders with production financial reports.
-   Plan backup and restoration before launch.
-   Add tests for constraints, RLS policies, duplicate webhooks,
    discount concurrency, and order snapshot integrity.

## 8. Decisions requiring confirmation

-   Exact product type/category taxonomy.
-   Whether media/footage file formats are enabled in the first release
    and their size limits.
-   Customer account scope for V1.
-   Discount stacking and exact usage limits.
-   Partial refund and download revocation policy.
-   Whether an email outbox/queue table is required beyond email event
    logging.
