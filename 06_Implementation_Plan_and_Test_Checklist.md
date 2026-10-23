# DONVEXA Digital Solutions --- Implementation Plan & Testing Checklist

**Version:** 1.0 planning draft\
**Instruction:** Do not begin coding until the owner approves the
handoff specification.

## 1. Working rules for the implementation agent

-   Read all six handoff documents before implementation.
-   Treat the PRD and business rules as the source of truth; flag
    contradictions instead of guessing.
-   Keep the application mobile-first on the customer side and
    desktop-first for admin.
-   Use GitHub for version control and small, reviewable commits.
-   Never commit secrets, `.env` files, customer data, or live payment
    credentials.
-   Use Paystack test mode until explicit production approval.
-   Do not fabricate completed tests, real data, or deployment status.
-   If a requirement is ambiguous, list it as a blocker or make a
    clearly documented temporary assumption.
-   Do not silently expand scope.
-   After each milestone, report changed files, tests run/results,
    remaining issues and the next milestone.

## 2. Recommended milestones

### Milestone 0 --- Repository and architecture

-   Confirm exact cloud development environment.
-   Create GitHub repository structure and branch/commit conventions.
-   Establish Next.js/TypeScript setup, linting, formatting, type
    checking and test strategy.
-   Add `.env.example` with descriptions only.
-   Configure Supabase development project and migration workflow.
-   Set up Vercel preview integration without live secrets. **Gate:**
    app runs in development; secrets are absent from repository;
    architecture and folder conventions documented.

### Milestone 1 --- Design system and responsive shell

-   Integrate the approved DONVEXA primary/reversed logo assets and verify responsive sizing, transparent edges, and contrast.
-   Establish light editorial storefront tokens and dark admin tokens.
-   Implement accessible shared components and responsive navigation.
-   Build page shells and loading/empty/error states. **Gate:** visual
    review at narrow mobile, tablet and laptop sizes; no major overflow;
    keyboard focus works.

### Milestone 2 --- Database and authorization

-   Create schema migrations, indexes, constraints and RLS policies.
-   Configure admin identity and protected routes.
-   Add seed/sample catalogue data clearly marked as development-only.
-   Test anonymous/customer/admin/server permissions. **Gate:**
    unauthorized users cannot access private customer, order, payment,
    admin or file data.

### Milestone 3 --- Catalogue and product management

-   Build homepage, catalogue, search/filter/sort, product details.
-   Build admin product CRUD, categories, covers and private product
    file upload.
-   Validate publication requirements and file metadata. **Gate:**
    published products appear publicly; drafts do not; private file keys
    are not exposed.

### Milestone 4 --- Cart, discounts and checkout

-   Implement 30-day cart persistence with safe fallback.
-   Implement server-side price and discount validation.
-   Implement order creation and Paystack test-mode initialization.
    **Gate:** totals are server-calculated; discounts cannot bypass
    limits; duplicate submissions are handled.

### Milestone 5 --- Verification, fulfillment and downloads

-   Implement callback verification and signed/authorized download
    access.
-   Implement idempotent webhook processing and recovery/reconciliation.
-   Build success, pending and failed states. **Gate:** only verified
    payments grant access; repeated events do not duplicate fulfillment.

### Milestone 6 --- Orders, refunds and delivery events

-   Build admin order/transaction/refund workflows.
-   Record refund request, decision and provider processing separately.
-   Implement provider-independent email event abstraction; select
    provider only after approval. **Gate:** refund cannot be reported
    completed without confirmed outcome; email failure does not
    invalidate payment.

### Milestone 7 --- Promotions, analytics and settings

-   Build promotions and discount management.
-   Integrate approved analytics with privacy controls.
-   Add operational alerts, audit log and settings. **Gate:** expired
    promotions are hidden; analytics are not used as proof of payment.

### Milestone 8 --- Quality assurance and launch readiness

-   Run functional, responsive, accessibility, security and regression
    checks.
-   Test payment webhooks, retry behavior, file access, email failures,
    refund paths and backup restoration.
-   Obtain owner review of content, legal policies, brand direction and
    all unresolved decisions.
-   Configure production domain and integrations after approval.
    **Gate:** owner explicitly approves launch; only then switch
    Paystack to live mode.

## 3. Functional test checklist

### Catalogue

-   [ ] Published products display correct current metadata and NGN
    price.
-   [ ] Draft/unpublished products are not publicly discoverable.
-   [ ] Search, category filter, sorting, pagination and empty state
    work.
-   [ ] Invalid/unavailable products cannot be purchased.
-   [ ] Missing required file prevents publication or raises a clear
    admin alert.

### Cart and discount

-   [ ] Add/remove product works on mobile.
-   [ ] Repeated add clicks do not create duplicate product lines.
-   [ ] Cart persists for 30 days where supported and handles storage
    failure gracefully.
-   [ ] Price is revalidated at checkout.
-   [ ] Valid percentage discount is calculated correctly.
-   [ ] Valid fixed discount is calculated correctly.
-   [ ] Expired, disabled, exhausted or ineligible codes are rejected.
-   [ ] Discount cannot make the total negative.
-   [ ] Concurrent redemption cannot bypass usage limits.
-   [ ] Client-submitted totals are ignored.

### Payments and orders

-   [ ] Pending payment does not grant downloads.
-   [ ] Verified successful Paystack payment confirms order once.
-   [ ] Incorrect amount, currency, reference or failed verification
    does not fulfill.
-   [ ] Invalid webhook signature is rejected.
-   [ ] Duplicate webhook/callback does not duplicate entitlements,
    redemptions or side effects.
-   [ ] Failed/cancelled checkout can be retried safely.
-   [ ] Customer cannot access another customer's order by guessing an
    identifier.
-   [ ] Historical receipt retains purchase-time price after product
    price changes.

### Files and delivery

-   [ ] Product files are private.
-   [ ] Unauthenticated/unauthorized access is denied.
-   [ ] Expired links are denied and can be safely reissued to eligible
    customers.
-   [ ] File must belong to the entitled product.
-   [ ] Revoked entitlement is denied according to policy.
-   [ ] Missing file produces a useful message and admin alert.
-   [ ] PDF/EPUB format labels and versions are accurate.
-   [ ] Media/footage file rules are tested if that capability is
    enabled.
-   [ ] Email failure does not revoke paid access.
-   [ ] Guest recovery requires verified email ownership.

### Refunds

-   [ ] Request is recorded for admin review.
-   [ ] Rejection is recorded and does not trigger a refund.
-   [ ] Approval is not shown as completed before provider confirmation.
-   [ ] Failed refund processing is visible and safely recoverable.
-   [ ] Partial refund behavior follows an explicit approved policy.
-   [ ] Access behavior after refund follows the approved policy.
-   [ ] Important actions are audited.

### Admin/security

-   [ ] Admin routes reject unauthorized sessions.
-   [ ] Public signup cannot create an administrator.
-   [ ] RLS is tested for anonymous, customer, admin and server
    contexts.
-   [ ] Service-role and payment secrets are absent from client bundles
    and Git.
-   [ ] Upload type/size validation works.
-   [ ] Sensitive endpoints have appropriate rate limits.
-   [ ] Admin price/file/refund changes create audit records.

## 4. Responsive and accessibility checklist

-   [ ] Test at approximately 320, 360, 390, 768, 1024 and 1440 CSS px.
-   [ ] No page-level horizontal overflow in storefront flows.
-   [ ] Mobile navigation and cart are easy to reach.
-   [ ] Product card text and prices remain readable.
-   [ ] Checkout inputs and error messages work on a phone.
-   [ ] Admin tables adapt to smaller screens.
-   [ ] All actions are keyboard reachable with visible focus.
-   [ ] Inputs have persistent labels.
-   [ ] Status is not communicated by colour alone.
-   [ ] Loading, empty, error and success states exist for major flows.
-   [ ] Images have meaningful alt text where appropriate.
-   [ ] Motion respects reduced-motion preferences where motion is used.

## 5. Launch checklist

-   [ ] Owner approved PRD, UI, technical architecture and unresolved
    policy choices.
-   [ ] Production domain and DNS are configured.
-   [ ] Privacy, Terms and Refund Policy content is reviewed and
    published.
-   [ ] Paystack production account and live credentials are
    approved/configured.
-   [ ] Webhook endpoint and signature verification are tested.
-   [ ] Email provider and sender/domain authentication are configured.
-   [ ] Private storage access is tested.
-   [ ] Admin authentication and recovery are tested.
-   [ ] Backups and a restore test are documented.
-   [ ] Monitoring and error reporting are active.
-   [ ] No development seed orders appear in production.
-   [ ] A real, owner-authorized end-to-end test purchase and refund
    procedure is documented.
-   [ ] Rollback and incident contact steps are documented.

## 6. Definition of done

A feature is not complete just because its screen exists. It is complete
when: - UI and server behavior match the specification. - Authorization
and data access are tested. - Loading, empty, success, failure and retry
states are implemented where relevant. - Mobile and desktop layouts are
checked. - Automated/manual tests and their results are reported
honestly. - Documentation and environment variables are updated. - No
known critical security or payment correctness issue remains.
