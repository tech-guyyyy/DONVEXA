# DONVEXA Digital Solutions — Project Overview and Toolkit

**Purpose:** A plain-language overview for the owner, designer, developer, or AI assistant who needs to understand the project before implementation. This complements, and does not replace, the six detailed specifications.

## 1. What DONVEXA is

DONVEXA is planned as a single-store digital products website. Customers will browse a curated catalogue, purchase digital products, and receive secure access to their files after a verified payment. The first version is focused on digital books and downloadable resources—not a multi-vendor marketplace, subscription service, SaaS product, or AI product.

The initial confirmed file formats are PDF and EPUB. Footage and other media resources are possible, but whether they launch in Version 1, along with their file types, size limits, licensing metadata and preview behaviour, is still undecided.

## 2. What the product contains

### Customer-facing storefront

- Home page and product discovery/catalogue.
- Search and category browsing.
- Product detail pages with cover/preview, description, price and supported formats.
- Shopping cart with planned 30-day persistence, subject to browser storage limits.
- Checkout in Nigerian naira (NGN) using Paystack.
- Payment result states for success, pending and failure.
- Secure download/receipt experience after server-side payment verification.
- Email receipt and guest purchase recovery, once an email provider and verified sending domain are configured.
- Optional customer account/library decision remains open for Version 1.
- Terms, privacy and refund policy pages, with final legal wording still to be supplied/reviewed.

### Admin workspace

A dark, laptop-first admin dashboard with responsive fallback. Planned sections include Overview, Products, Orders, Transactions, Customers, Analytics, Promotions, Discounts, Email & Delivery, Settings and Audit Log. Admin tasks include managing product information and files, publishing/unpublishing products, inspecting orders and payment state, reviewing refunds, configuring discounts and promotions, and monitoring delivery events. The previously approved dashboard concept should be supplied as a reference asset if it is expected to be followed precisely; it is not included in this ZIP.

### Core business behaviour

- Server-side pricing and discount validation.
- Paystack transaction verification before fulfilment.
- Idempotent webhook handling and safe reconciliation for missed events.
- Private file storage and controlled download access; avoid permanent public file URLs.
- Separate order, payment, fulfilment and refund states.
- Audit records for sensitive admin actions.
- Email delivery failures must not reverse a successfully paid order.
- Analytics should avoid sending customer emails, order references or signed download URLs to third parties.

## 3. Proposed technology toolkit

| Tool | Planned responsibility | Status / note |
|---|---|---|
| **Next.js** | Web application framework for storefront, admin UI and server-side routes/actions. | Proposed. |
| **TypeScript** | Type-safe application code and clearer contracts between UI and server logic. | Proposed. |
| **Vercel** | Hosting and preview deployments for the web application. | Proposed; plan limits and scheduled-job needs must be checked. |
| **Supabase** | PostgreSQL database, authentication and potentially private object storage with access policies. | Proposed; final file-storage choice is open. |
| **GitHub** | Source control, code review and change history. | Confirmed as source-control direction. |
| **Paystack** | NGN checkout and payment processing. | Selected; live-account readiness, webhook setup and refund behaviour must be verified before launch. |
| **Resend or Brevo** | Transactional emails such as receipts, download notices and recovery messages. | Not selected. A verified sending domain is required. |
| **Analytics provider** | Visitor/product/funnel and conversion reporting. | Not selected; consent and privacy behaviour must be decided. |
| **Cloud development environment** | Browser-based development workspace if desired. | Not selected. |
| **Styling/component library** | Consistent responsive UI and accessible reusable components. | Not selected. |

This stack is a plan, not an implementation claim. No code has been created by this document, and no hosting/payment service has been configured through it.

## 4. High-level system flow

1. An admin creates a product, sets its price and uploads approved digital files.
2. The storefront displays published products and their metadata.
3. The customer adds products to a cart and proceeds to checkout.
4. The server validates the product status, current prices, discounts and total, then creates a pending order.
5. Paystack handles payment. The server independently verifies the transaction; a browser redirect alone is not proof of payment.
6. A verified payment triggers one-time fulfilment and download entitlement creation. Duplicate callbacks/webhooks must not create duplicate entitlements.
7. The customer reaches the secure download experience, and transactional email is attempted separately. The immediate post-payment guest-access method still needs a decision.
8. Admins can inspect order/payment/refund status and delivery history. Scheduled reconciliation and retry jobs must be planned around the selected hosting tier.

## 5. Brand and visual direction

The DONVEXA logo is approved and is included in `brand-assets/`. The initial palette for this handoff is:

- Charcoal: `#292521`
- Warm ivory: `#F6F1E8`
- Muted copper: `#B86F4B`

Use the primary charcoal-and-copper logo on the light, editorial storefront. Use the reversed warm-ivory-and-copper logo on the dark admin dashboard. The customer experience is mobile-first, including 320–390px phone widths; the admin is laptop-first with a usable mobile fallback. Exact fonts remain undecided.

## 6. Scope boundaries

**Included in the Version 1 plan:** single-store product catalogue, cart, NGN checkout, verified Paystack payment, controlled digital delivery, admin product/order operations, promotions/discounts, email integration and analytics subject to pending provider decisions.

**Not included unless explicitly approved later:** multi-vendor marketplace, subscriptions/memberships, AI product features, foreign-currency charging, or a complex staff-role management system.

## 7. Unresolved decisions from the review

The uploaded review identifies these pending items. They are recorded here so a developer does not silently invent business rules.

### P1–P15: original pending decisions

- **P1 — Partially resolved:** logo approved and initial palette selected as above; exact font pairing and any further brand refinements remain open.
- **P2 — Open:** product categories/taxonomy and footage licensing metadata.
- **P3 — Open:** whether footage/media launches in Version 1; allowed extensions, size limits and previews.
- **P4 — Open:** email provider and verified sending domain.
- **P5 — Open:** domain name and support email.
- **P6 — Open:** refund window, partial refunds and access after refund.
- **P7 — Open:** discount stacking, global caps, usage limits, minimum order and eligibility/per-customer limits.
- **P8 — Open:** analytics provider and consent behaviour.
- **P9 — Open:** final Terms, Privacy and Refund Policy wording.
- **P10 — Open:** customer accounts in Version 1 versus guest recovery only.
- **P11 — Open:** cloud development environment.
- **P12 — Open:** styling/component libraries.
- **P13 — Open:** Supabase Storage versus another private object store.
- **P14 — Open:** whether existing buyers receive old files, new versions, or both after replacement.
- **P15 — Open:** whether a durable email outbox table is needed beyond event logging.

### G1–G12: additional gaps from the review

- **G1 — Open:** secure immediate guest access after payment, before email recovery is used.
- **G2 — Open:** retry model, pending-order expiry and when discount usage is counted.
- **G3 — Open:** whether free products or 100% discounts are allowed and how zero-total orders are fulfilled without Paystack charging zero.
- **G4 — Open:** how to handle repeat purchase of a product already owned.
- **G5 — Open:** entitlement duration, download limits and access to formats added later.
- **G6 — Open:** per-item versus per-order refunds and API-driven versus manually initiated Paystack refunds.
- **G7 — Open:** tax/VAT and invoice treatment, tax-inclusive pricing and Paystack fee reporting. Requires qualified local tax/legal review where appropriate.
- **G8 — Open:** admin MFA and single-admin account recovery.
- **G9 — Open:** content ownership/licensing and takedown handling.
- **G10 — Open:** data retention/erasure rules and the handling of financial records/audit logs; assign an owner and obtain appropriate Nigeria data-protection advice.
- **G11 — Open:** Paystack live account verification, webhooks and refund readiness.
- **G12 — Open:** current Vercel/Supabase plan terms, commercial use, backups, pausing, storage and function limits. These were not verified in the supplied review.

## 8. Security and launch dependencies

Implementation should account for duplicate payment events, discount race conditions, guessable order references, key exposure, admin role protection, database/storage access policies, signed-link leakage, unsafe uploaded files, content injection, missed webhooks, rate limiting, privacy leaks and admin lockout recovery. The detailed security requirements belong in the technical and integration documents.

Important dependency chains include: domain/DNS → sender verification → email provider → guest recovery; refund/revocation policy → download authorization → refund workflow; media decision → storage choice → file limits → hosting plan; analytics provider → data source/consent design; and Paystack account readiness → live payment launch.

## 9. Planning and approval boundary

The six detailed specifications and this overview are planning documents. Do not begin implementation, deploy production services, use live payment credentials, or make irreversible provider changes until the owner explicitly approves the relevant milestone and decisions. Unknown business rules should remain clearly marked as pending or be implemented behind a documented interface only after approval.
