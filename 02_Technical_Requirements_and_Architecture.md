# DONVEXA Digital Solutions --- Technical Requirements & Architecture

**Version:** 1.0 planning draft

## 1. Purpose

This document defines the intended system architecture and technical
constraints for Claude or another implementation agent. It does not
authorize immediate deployment or use of real credentials. Build in
small, testable milestones and ask before making material scope changes.

## 2. Provisional stack

-   Application: Next.js with TypeScript.
-   UI: accessible, responsive component system; select and document a
    stable styling approach before implementation.
-   Hosting: Vercel.
-   Backend platform: Supabase.
    -   PostgreSQL for relational data.
    -   Supabase Auth only for supported account/admin authentication
        flows.
    -   Private Supabase Storage bucket(s) or another approved private
        object store for product files and protected media.
    -   Row Level Security (RLS) on exposed tables.
-   Payments: Paystack.
-   Email: undecided. Evaluate Resend and Brevo, current free-tier
    limits, sender verification, domain requirements, and API/webhook
    capabilities before selecting.
-   Source control: GitHub repository.
-   Development: cloud-based environment. Exact cloud IDE/agent
    environment is not yet confirmed.
-   Analytics: provider undecided; abstract event tracking behind a
    small interface so provider can change.

## 3. Architecture principles

1.  Mobile-first experience for customers; desktop-first admin.
2.  Server-authoritative pricing, discount calculations, payment
    verification, order status and file access.
3.  Least privilege: browser clients must never receive service-role
    secrets or payment secret keys.
4.  Private files by default.
5.  Idempotent external event handling.
6.  Keep payment provider, email provider, analytics provider and
    storage access behind clear modules/interfaces.
7.  No secrets in source control, logs, client bundles or error
    messages.
8.  Use migrations for database changes; do not rely on manual
    production-only schema edits.
9.  Preserve historical order data and avoid recalculating old order
    totals from current prices.
10. Graceful failure: email or analytics outage must not invalidate a
    verified purchase.

## 4. System boundaries

### Browser/client

May render catalogue, maintain a convenience cart, submit checkout
requests, and request authorized download actions. It is not trusted to
declare a payment successful or calculate authoritative totals.

### Server-side application code

Creates orders/payment attempts, validates products and discounts,
verifies Paystack transactions, handles webhooks, issues authorized
download access, and executes admin actions after authorization.

### Supabase

Stores relational business data and provides database/auth/storage
capabilities. RLS and server authorization must be deliberately
configured and tested. Never expose the Supabase service-role key to the
browser.

### Paystack

Handles checkout/payment collection. The application must verify
transactions through the server-side provider API and validate webhook
signatures according to current Paystack documentation.

### Email service

Sends transactional messages after provider selection and sender
verification. Email failure is logged/retryable and does not roll back a
successful payment.

### Vercel

Hosts the application and environment-specific configuration. Confirm
route/function limits and webhook requirements against the selected
Vercel plan.

## 5. Security requirements

-   Admin-only routes and server actions require server-side
    authorization on every request.
-   No public admin registration.
-   Use secure, modern authentication; protect admin accounts with
    strong credentials and MFA where supported.
-   Apply RLS to tables exposed through Supabase APIs; deny access by
    default and add only necessary policies.
-   Public visitors may read only published product metadata and public
    cover/preview assets.
-   Customer data, orders, payment details, discount-redemption data,
    download entitlements and audit records must not be publicly
    readable.
-   Do not put Paystack secret keys, Supabase service-role keys, or
    email API keys in client-side environment variables.
-   Validate inputs on the server; enforce size/type limits on uploaded
    files.
-   Restrict upload permissions to authorized administrators.
-   Prevent path traversal and arbitrary object-key access in download
    endpoints.
-   Use signed URLs with short expiry or an equivalent authenticated
    server-side download gateway.
-   Rate-limit sensitive endpoints: auth/recovery, checkout creation,
    discount validation, download recovery and other abuse-prone routes.
-   Sanitize rendered user/admin-provided content; avoid unsafe HTML
    rendering.
-   Log meaningful security and business events without logging secrets,
    complete signed URLs, or unnecessary personal data.
-   Establish backup/restore and incident-response procedures before
    launch.

## 6. Payment architecture

1.  Client submits desired cart items and discount code.
2.  Server loads current product/price data and validates publication
    state, file availability, discounts and total.
3.  Server creates a pending order/payment attempt with an idempotency
    strategy.
4.  Server initializes Paystack transaction using server-computed amount
    and NGN currency.
5.  Client is redirected to Paystack or uses the supported Paystack
    checkout flow.
6.  Callback and webhook are treated as signals, not proof on their own.
7.  Server verifies transaction status, reference, amount, currency and
    relationship to the pending order through Paystack's server API.
8.  A single atomic/idempotent transition marks payment verified and
    grants download entitlement.
9.  Customer success page reads the server's authoritative state.
10. Email sending is queued/attempted after payment verification and
    retried separately if it fails.

Repeated callbacks/webhooks must be safe. Enforce uniqueness for
provider references and use transactions/conditional updates to prevent
duplicate fulfillment.

## 7. File and download architecture

-   Product file metadata is stored in the database; file bytes are
    stored in private object storage.
-   Store object keys, not permanent public URLs, as the canonical
    reference.
-   Separate public cover/thumbnail assets from private paid files.
-   Validate allowed file extensions, MIME types where practical, size
    limits, and file availability at publish time.
-   PDF and EPUB are initial book formats; media/footage support
    requires an explicit allowed-type/size policy before launch.
-   A product may have multiple formats or versions.
-   Download authorization checks a verified order entitlement, correct
    product/file relationship, and any refund/revocation policy.
-   Generate short-lived signed access or stream through an authorized
    server endpoint.
-   Record download events without treating them as proof of payment.
-   Do not guarantee that a digital file can never be copied after a
    legitimate download; the goal is to prevent unauthorized access to
    the original hosted file.

## 8. Email integration

Provider is intentionally pending. Define an internal
transactional-email interface and templates for: - Purchase
receipt/order confirmation. - Download access notice. - Payment pending
or action-needed notice where appropriate. - Guest purchase recovery
verification. - Refund request/decision/processing status. - Admin
operational alerts for missing files or repeated delivery failures. Use
provider message IDs, send attempts, timestamps and errors. Never send
access links to an unverified or mismatched email address without a
secure verification flow.

## 9. Observability and operations

-   Structured server logs with correlation IDs for order/payment
    operations.
-   Admin-facing integration health indicators where feasible.
-   Alerts for payment verification errors, repeated webhook failures,
    missing product files and email delivery failures.
-   Audit logs for sensitive admin changes.
-   Health checks appropriate to the deployment model.
-   Database backup policy, file backup/retention policy and documented
    restore test.
-   Separate development, preview/staging, and production configuration
    where feasible.
-   Do not use real customer or payment data in test environments.

## 10. Environments and secrets

Create documented environment variables only after exact names are
decided. Use separate credentials for development and production. Add
`.env.example` with variable names and descriptions but no secrets.
Ensure local environment files are ignored by Git. Configure production
secrets in the hosting/provider dashboards.

## 11. Performance and accessibility

-   Prioritize mobile performance, optimized responsive images, minimal
    client JavaScript, and efficient database queries.
-   Use pagination for large catalogues and order lists.
-   Avoid loading large paid media files until a customer explicitly
    requests download/preview.
-   Use semantic HTML, keyboard-accessible controls, visible focus,
    meaningful labels, sufficient contrast and accessible
    validation/error messages.
-   Meet WCAG 2.2 AA as a target where practical.
-   Avoid horizontal overflow at common mobile widths.

## 12. Deployment approach

1.  Create repository and project conventions.
2.  Configure development environment and Supabase project.
3.  Build and test against non-production credentials.
4.  Configure Vercel preview deployment and environment variables.
5.  Configure Paystack test mode and verify callback/webhook handling.
6.  Configure private storage and test access denial.
7.  Select email provider and verify sender identity.
8.  Complete security, responsive, payment and restore tests.
9.  Obtain owner approval for policies/content and production settings.
10. Switch to live Paystack credentials only after explicit approval and
    a launch checklist review.

## 13. Technical decisions pending

-   Exact cloud development environment.
-   Final styling/component libraries.
-   Supabase Storage versus another private object storage provider.
-   Email service.
-   Domain and DNS setup.
-   Analytics provider and consent strategy.
-   Media/footage formats and file size limits.
-   Final refund/access-revocation policy.
