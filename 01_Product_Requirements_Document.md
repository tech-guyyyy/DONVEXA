# DONVEXA Digital Solutions --- Product Requirements Document (PRD)

**Version:** 1.0 planning draft\
**Status:** Ready for implementation planning; unresolved items are
explicitly marked\
**Product:** DONVEXA Digital Solutions digital storefront

## 1. Product summary

DONVEXA is a digital commerce website for discovering, purchasing, and
securely downloading digital products. Initial products include e-books
and other book-like resources, PDF and EPUB publications,
guides/manuals, and downloadable footage or media assets where
applicable. The product catalogue must be extensible so new digital
product types and file formats can be added without redesigning the
whole application.

This is a focused single-store e-commerce product---not a SaaS dashboard
sold to customers, not a multi-vendor marketplace, not a subscription
product, and not an AI-product platform.

## 2. Goals

-   Make it easy and trustworthy to discover and buy digital resources,
    especially on phones.
-   Deliver purchased files promptly after verified payment.
-   Let one administrator manage products, files, orders, customers,
    promotions, discounts, refunds, and store content.
-   Protect paid files from public, permanent access.
-   Provide reliable records for payment reconciliation, customer
    support, and bookkeeping.
-   Establish a maintainable foundation for later product formats and
    capabilities.

## 3. Non-goals for Version 1

-   Multi-vendor seller accounts or marketplace commissions.
-   Subscriptions, memberships, or recurring billing.
-   Affiliate network.
-   AI-generated products or AI customer support.
-   Physical inventory, shipping, or delivery addresses.
-   Multi-currency checkout at launch.
-   Native mobile apps. The website must be responsive and
    installability/PWA features are not required unless separately
    approved.

## 4. Users and roles

### Customer

Can browse without an account, search/filter the catalogue, view product
details, manage a cart, pay using Paystack, and access purchased
downloads. Optional account creation may provide a purchase library and
order history.

### Administrator

Initially one authorized administrator. Can manage catalogue content and
files, orders, payment/refund states, customer records, promotions,
discounts, settings, and audit records. No public admin registration.

### Future staff roles

Do not build a full role-management system in V1, but avoid architecture
that assumes all future staff must share one credential. Admin-only
functions must be access-controlled.

## 5. Confirmed business decisions

-   Mobile-first customer storefront; desktop/laptop-first admin
    workspace, both responsive.
-   Storefront style: premium, clean, light editorial.
-   Admin style: approved dark dashboard concept with sidebar, KPI
    cards, charts, recent orders, and data tables.
-   The DONVEXA logo is approved for use. Use the supplied transparent
    charcoal-and-muted-copper primary logo on light storefront surfaces and
    the warm-ivory-and-copper reversed variant on dark admin surfaces. Do not
    replace it with a temporary typographic wordmark.
-   Audience: people looking for digital books and downloadable
    resources, including footage/media assets.
-   Cloud-based development; source code maintained in GitHub.
-   Frontend/application hosting: Vercel.
-   Backend services: Supabase, including PostgreSQL and private Storage
    where appropriate.
-   Payments: Paystack.
-   Checkout currency at launch: NGN only. Any foreign-currency display,
    if later approved, must be clearly labelled as an estimate and must
    not imply foreign-currency charging.
-   Email provider: undecided; evaluate Resend and Brevo before
    selection.
-   Supported launch formats: PDF and EPUB, with extensibility for
    additional formats. Downloadable media/footage may require other
    file types; confirm exact allowed extensions and limits before
    launch rather than assuming footage must be converted to PDF/EPUB.
-   Discounts: percentage and fixed-amount.
-   Refunds: administrator reviews requests and processes approved
    refunds through the supported payment workflow.
-   Cart persistence: 30 days, subject to browser/device storage limits
    and privacy settings.
-   Guest checkout is the intended default; customers should not be
    forced to create an account just to purchase. Verified-email
    recovery is required.
-   Digital files must not be stored in a public bucket or exposed
    through permanent public URLs.

## 6. Primary customer journeys

1.  Discover: customer lands on the homepage, browses featured
    items/categories or searches.
2.  Evaluate: customer opens a product page and understands what the
    item is, its format, price, file size where useful, and
    usage/delivery details.
3.  Cart: customer adds a product, sees confirmation, and can
    review/remove items. Repeated clicks must not create duplicate lines
    for the same digital product.
4.  Checkout: customer enters email, reviews total and discount, then
    proceeds to Paystack.
5.  Payment result: application verifies the transaction server-side.
    The UI shows success only after verified payment; pending and failed
    states have safe recovery actions.
6.  Delivery: verified customers receive an on-site download experience
    and, once email is configured, a receipt/download message. Download
    authorization must be enforced by the backend.
7.  Recovery: guest can verify their email to recover eligible
    purchases; registered customers can use their library.
8.  Support/refund: customer can find support and refund-policy
    information; refund request handling is reviewed by the
    administrator.

## 7. Storefront requirements

### Homepage

-   Clear header with wordmark, Browse/Search, account/library entry
    where applicable, and cart.
-   Prominent search and an editorial hero/promotional area.
-   Featured products, categories, new releases, and curated sections
    where content exists.
-   Clickable promotional banners with configurable destination and
    schedule.
-   Trust cues that are truthful: secure checkout, digital delivery,
    support contact and policy links.
-   Footer with About, Contact, FAQ, Privacy, Terms, and Refund Policy.
-   Do not fabricate testimonials, ratings, popularity numbers, or
    claims.

### Catalogue/search

-   Search by product title, author/creator, keyword, and relevant
    metadata.
-   Filter by category and available product type/format.
-   Sort by newest, title, and price.
-   Responsive product grid; clear loading, empty, and error states.
-   Use pagination or a scalable load-more pattern rather than loading
    an unlimited catalogue.
-   Filters must be usable with touch and keyboard.

### Product details

-   Stable, shareable slug URL.
-   Cover/preview image or media thumbnail, title, creator/author,
    summary, full description, price, product type, supported file
    format(s), file size when appropriate, and relevant usage/licensing
    information if supplied.
-   Primary "Buy now" and secondary "Add to cart" actions.
-   "Buy now" starts checkout with that item; "Add to cart" confirms the
    action without navigating unexpectedly.
-   Related products are optional and only appear when relevant data
    exists.
-   Do not expose the private storage key or raw permanent file URL.

### Cart

-   Persist for 30 days where browser storage permits.
-   One line per unique digital product by default; quantity is not
    meaningful unless a product explicitly supports multiple
    licenses/units.
-   Remove item, continue shopping, enter discount code, show
    subtotal/discount/total in NGN.
-   Revalidate product availability, current price, and discount on the
    server at checkout.
-   Clearly explain that the cart is not a price guarantee until
    checkout.

### Checkout and payment states

-   Email required for receipt and guest recovery.
-   Clear itemized summary, discount, total, and currency before
    redirecting to Paystack.
-   Do not trust browser redirects, screenshots, or client-side payment
    claims.
-   Support success, pending, failed, cancelled/abandoned, and safe
    retry states.
-   Never create a second paid order because a webhook or callback is
    repeated.

### Download/library

-   Only verified successful payments create download entitlements.
-   Show purchased products, available file versions/formats, download
    actions, order reference, and receipt details.
-   Use short-lived signed links or a server-authorized download
    endpoint.
-   Allow reasonable recovery for legitimate customers without making
    files public.
-   Handle missing/unavailable files with a clear message and
    administrator alert.

## 8. Admin dashboard requirements

Sections: 1. Overview: revenue summary, orders, customers,
visitor/commerce analytics, recent orders, top products, alerts. 2.
Products: create/edit, title, slug, creator, descriptions,
cover/thumbnail, category, product type, price, files, publication
state, featured/new release, previews, versioning, archive. 3. Orders:
reference, email, line items, price snapshots, discount, total, status,
delivery state, dates. 4. Transactions: Paystack reference,
amount/currency, verification status, refund records and provider
outcomes. 5. Customers: guest and registered buyers, verified email
state where available, purchase history. 6. Analytics: visitors, product
views, add-to-cart, checkout starts, conversion, traffic sources where
available, top products. 7. Promotions: upload flyer/banner, headline,
optional copy, CTA, URL, placement, scheduling, active state. 8.
Discounts: code, percentage/fixed amount, validity, usage limits,
eligible products/categories if supported, active state and redemptions.
9. Email & Delivery: message events, failures, safe resend,
download-access recovery, link expiry/access events. 10. Settings: store
details, wordmark, support email, categories, NGN currency, policies,
featured content, integrations, admin security. 11. Audit log: important
administrator actions.

The admin dashboard must prioritize desktop/laptop efficiency with a
collapsible sidebar and usable responsive fallback on smaller screens.
Avoid destructive actions without confirmation.

## 9. Refund requirements

-   Provide a visible policy explaining how to contact DONVEXA and
    request a refund.
-   Record request reason, order/payment reference, requested amount,
    decision, administrator, timestamps, provider processing status, and
    outcome.
-   Approval is not equivalent to a completed refund.
-   Use the payment provider's supported refund workflow and verify the
    outcome.
-   Do not claim a refund has completed until confirmed by the provider
    or reconciled evidence.
-   Define separately how partial refunds affect access; this is an open
    policy decision.

## 10. Analytics and privacy

Track only useful commerce events: page/product views, search,
add-to-cart, checkout start, verified purchase, and relevant referral
source when available. Payment records---not analytics events---are the
source of truth for sales. Add privacy disclosures and any required
consent controls before activating analytics. Never send payment secrets
or private download URLs to analytics.

## 11. Acceptance criteria

-   A customer can complete a mobile purchase with a valid Paystack
    payment and receive authorized access to the correct files.
-   An unverified or failed payment cannot unlock downloads.
-   Replayed webhook/callback events do not duplicate orders or
    entitlements.
-   A discount cannot produce an invalid negative total or bypass
    server-side rules.
-   A guest can recover eligible purchases through a verified email
    flow.
-   Admin-only pages and actions are inaccessible to unauthorized users.
-   Product files are private and are never served through permanent
    public URLs.
-   Cart, checkout, catalogue, product details, and download screens
    work at narrow mobile widths without horizontal overflow.
-   Important flows include loading, empty, success, pending, error, and
    retry states.
-   No fake data is presented as real production revenue or analytics.

## 12. Open decisions --- do not invent silently

-   Logo approval and the initial brand palette are resolved for planning: charcoal #292521, warm ivory #F6F1E8, and muted copper #B86F4B. Exact font pairing and any final refinements remain open.
-   Exact product categories and metadata needed for footage/media
    licensing.
-   Whether footage/media downloads are enabled at initial launch and
    exact allowed extensions, size limits, and preview behavior.
-   Email provider and verified sending domain.
-   Domain name and support email.
-   Refund eligibility window, partial refund policy, and
    download-access rule after refunds.
-   Discount stacking policy, global caps, and exact usage limits.
-   Final analytics provider and consent behavior.
-   Legal/business wording for Terms, Privacy, and Refund Policy;
    content needs owner review.
-   Whether optional customer accounts ship in the first release or
    guest recovery is sufficient for launch.
