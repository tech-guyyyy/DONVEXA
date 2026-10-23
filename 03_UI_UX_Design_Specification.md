# DONVEXA Digital Solutions --- UI/UX Design Specification

**Version:** 1.0 planning draft\
**Priority:** Mobile-first customer storefront; desktop-first admin
dashboard

## 1. Design intent

DONVEXA should feel like a credible, curated digital bookstore/resource
shop: premium, clean, editorial, calm and easy to use. The customer UI
must prioritize phones because many customers will browse and buy on
mobile. The admin UI should preserve the approved dark dashboard
direction and optimize common work for a laptop.

Avoid generic SaaS marketing visuals, overdone gradients, excessive
rounded cards, neon effects, fake metrics, and decorative UI that
competes with book covers. The approved DONVEXA logo is supplied in
`brand-assets/`. Use the charcoal-and-muted-copper primary version on light
surfaces and the warm-ivory-and-copper reversed version on dark surfaces.
Do not substitute a temporary wordmark or distort the logo.

## 2. Visual direction

### Customer storefront

-   Base: warm white or soft ivory.
-   Main text: deep charcoal/near-black.
-   Secondary text: restrained warm gray.
-   Accent: muted copper #B86F4B, approved as the initial brand accent.
-   Borders: subtle neutral lines.
-   Cards: clean surfaces, light separators and restrained shadows only
    where useful.
-   Typography: editorial-feeling heading face paired with a highly
    legible sans-serif body/interface face. Choose exact fonts only
    after checking availability, readability and licensing.
-   Images: product covers and media thumbnails should be the visual
    focus; maintain consistent aspect ratios and crop behavior.
-   Avoid relying on colour alone for statuses.
-   Initial brand hex values for the planning handoff: charcoal #292521, warm ivory #F6F1E8, muted copper #B86F4B. Check contrast in implementation; accessible states must not rely on copper alone.

### Admin dashboard

-   Near-black/graphite background, charcoal panels and subdued borders.
-   Clear contrast, compact but readable data hierarchy.
-   Sidebar, top bar, KPI cards, sales chart, recent orders and
    product/order tables.
-   Use restrained accent colours for chart series and statuses; do not
    use glow or neon styling.
-   Preserve the previously approved dashboard concept rather than
    redesigning it into a light generic SaaS dashboard.

## 3. Responsive rules

### Customer experience

-   Design and validate at narrow phone widths first (approximately
    320--390 CSS px), then larger phones, tablets and desktop.
-   Single-column product details on phones; product cover and purchase
    action appear early.
-   Product grids may use two columns only when cards remain readable;
    otherwise use one column or a compact layout.
-   Sticky mobile purchase/cart controls may be used only if they do not
    obscure content or keyboard focus.
-   Mobile navigation should be compact and accessible; search and cart
    must be easy to reach.
-   Inputs should be touch-friendly, labels visible, and error messages
    placed near the relevant field.
-   Avoid hover-only functionality.
-   Checkout must not require horizontal scrolling.
-   Large tables on mobile become stacked records or controlled
    horizontal table regions with clear labels, not tiny unreadable
    desktop tables.

### Admin experience

-   Desktop/laptop first: persistent or collapsible sidebar, top bar,
    main content area.
-   On tablets and phones, sidebar collapses into an accessible drawer
    and tables adapt to cards/compact views.
-   Critical tasks---publish/unpublish, order lookup, resend delivery
    notice, and review refund---must remain possible on mobile.
-   Avoid making mobile admin the primary optimization target, but it
    must not break.

## 4. Site map

### Public pages

1.  Home
2.  Browse/catalogue
3.  Search results
4.  Category page
5.  Product details
6.  Cart
7.  Checkout/contact details
8.  Payment result: success/pending/failed
9.  Download/receipt page
10. Guest purchase recovery
11. Optional account sign-in/register
12. Customer library/order history if accounts are enabled
13. About
14. Contact/support
15. FAQ
16. Privacy Policy
17. Terms of Service
18. Refund Policy
19. Not found and general error pages

### Admin pages

1.  Sign-in
2.  Overview
3.  Products list/create/edit
4.  Product file/version management
5.  Orders list/detail
6.  Transactions/payment detail
7.  Refund review
8.  Customers/detail
9.  Analytics
10. Promotions/banner management
11. Discount management
12. Email/delivery events
13. Settings/integrations
14. Audit log

## 5. Customer page specifications

### Home

-   Header: approved DONVEXA logo, browse/search access, cart,
    optional library/account.
-   Hero: concise value proposition, search or browse CTA, optional
    scheduled campaign artwork.
-   Featured products and new releases.
-   Browse by category/product type.
-   Promotional banner region controlled from admin.
-   Trust/support strip with truthful statements only.
-   Footer: About, Contact, FAQ, Privacy, Terms, Refund Policy.
-   On mobile, avoid oversized hero height that pushes all products far
    below the fold.

### Catalogue

-   Page title and concise context.
-   Search input with clear action and empty-state messaging.
-   Filters: category and product type/format only where meaningful.
-   Sort: newest, title, price ascending/descending.
-   Product cards: cover/thumbnail, title, author/creator, price in NGN,
    optional format/type label.
-   Accessible pagination or load more.
-   Filters usable by keyboard and touch; show active filters and a
    clear-all action.

### Product details

-   Cover/media thumbnail, title, creator, price, product type,
    description and relevant format/size metadata.
-   Prominent Buy Now and Add to Cart controls.
-   Explain that the product is digital and how delivery works.
-   Include usage/license information only when supplied by the owner.
-   Related items are optional.
-   On mobile, purchase controls should be reachable without excessive
    scrolling, but must not obscure product information.

### Cart

-   Item thumbnail/title/format, unit price, remove action, discount
    field, subtotal, discount and total.
-   One line per unique digital product by default.
-   Clear "Continue shopping" and "Proceed to checkout" actions.
-   Empty-cart state links back to browse.
-   Explain that price and discount eligibility are revalidated at
    checkout.

### Checkout

-   Minimal distractions; do not force account creation.
-   Email field, order summary, discount summary and clear NGN total.
-   Clear notice that payment is handled by Paystack.
-   Disable duplicate submissions while a request is processing.
-   Validation and error states must be readable on mobile.
-   Never ask for payment card data directly in DONVEXA forms if
    Paystack hosts the payment step.

### Payment result

-   Success only after server verification.
-   Pending state: explain that verification may take time and provide
    safe check-again/support options.
-   Failed/cancelled state: explain that payment is not confirmed and
    offer safe retry.
-   Do not create a second charge automatically.
-   Avoid showing private file URLs in page source or analytics.

### Download/receipt

-   Order reference, product list, file format/version, download
    controls and purchase confirmation.
-   Explain how to recover access.
-   Handle expired link, unavailable file, refund/revocation, and
    permission errors with helpful next steps.
-   Do not expose private storage paths.

### Guest recovery and account

-   Guest recovery begins with email submission and verification.
-   Do not reveal whether an email address has purchased products before
    verification.
-   Optional accounts can show library and order history.
-   Authentication screens should be simple, accessible and responsive.

## 6. Admin dashboard specifications

### Global shell

-   Dark sidebar with wordmark, section navigation and clear active
    state.
-   Top bar with page title, admin menu, and integration/alert access
    where useful.
-   Content area uses consistent spacing and restrained panel styling.
-   Confirm destructive actions and show clear success/error feedback.

### Overview

-   KPI cards: gross sales, orders, refunds, customers and
    visitor/conversion metrics where data is available.
-   Sales chart with a defined date range and honest empty/loading
    states.
-   Recent orders and top products.
-   Operational alerts: missing file on published product, payment
    verification issues, email failures.
-   Clearly distinguish gross sales, refunds, fees and settlement
    figures where available; do not imply gross sales equals bank
    deposits.

### Products

-   List with search, filters, status, type, price and updated date.
-   Editor grouped into information, media/cover, files/formats,
    price/category, SEO/share metadata if needed, and publication.
-   Draft/publish/unpublish/archive actions.
-   Warn if a product cannot be published because its required file or
    metadata is missing.
-   File version management should preserve order history and avoid
    silently replacing a file in a way that breaks old purchases.

### Orders and transactions

-   Search by order reference, customer email and provider reference.
-   Detail view shows item price snapshots, discount, total, payment
    verification, delivery and refund status.
-   Separate order status, payment status, fulfillment status and refund
    status.
-   Safe action buttons with confirmations and audit entries.

### Promotions and discounts

-   Banner editor: image, headline, optional body, CTA label,
    destination URL, placement, start/end date and active state.
-   Discount editor: code, percentage/fixed amount, start/end, limits,
    eligibility and active state.
-   Preview before activation and clear expired/inactive states.

### Analytics and delivery

-   Date-range controls, event definitions and data-source notes.
-   Email/delivery list includes status, timestamp, recipient, message
    type and safe resend action.
-   Avoid rendering secrets or complete signed download URLs in the
    admin interface.

## 7. Components and states

Create reusable components for: - Header/navigation, mobile menu,
footer. - Product card, price display, category chip, search and filter
controls. - Buttons, inputs, select, dialog, toast/inline alert, loading
skeleton. - Empty state, error state, pagination. - Cart line, order
summary, status label, data table/adaptive record. - Admin sidebar, top
bar, KPI card, chart container, confirmation dialog. - Upload dropzone
with file progress, validation, retry and removal. - Download action
with loading/expired/error states.

Every major page needs loading, empty, success and failure states. Form
errors must be associated with fields and announced accessibly. Use
skeletons only where they improve perceived responsiveness.

## 8. Accessibility and content

-   Target WCAG 2.2 AA where practical.
-   Visible keyboard focus; correct semantic headings and landmarks.
-   Buttons and links must have clear accessible names.
-   Touch targets should be comfortably usable.
-   Contrast must remain sufficient in both light storefront and dark
    admin.
-   Do not use placeholder-only labels.
-   Avoid fake reviews, fake sales counts, stock scarcity, invented
    author credentials, or unsupported trust claims.
-   Use real product content supplied by the owner; use clearly labelled
    sample content only in development.

## 9. UI acceptance checks

-   At 320px width, public flows do not cause page-level horizontal
    overflow.
-   Catalogue, product details, cart, checkout and download pages remain
    usable with touch and keyboard.
-   Header, search, cart and checkout CTA remain easy to locate.
-   Admin dashboard works at laptop widths and has a usable responsive
    fallback.
-   Status meaning is communicated by text/icon as well as colour.
-   Empty/loading/error/success states are designed rather than left as
    blank screens.
-   Use the approved supplied logo and initial palette; do not invent an alternate logo. Exact fonts remain to be selected.
