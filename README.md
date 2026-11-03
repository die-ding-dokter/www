# Die Ding Dokter — website

Source for https://www.diedingdokter.co.za/ using GitHub Pages.

## What's included

Responsive business site with:
- Homepage and full navigation, mobile menu and prominent calls to action.
- Services, dedicated repairs, shop category filters and product enquiries.
- Business hardware, partnerships, about, contact and privacy pages.
- WhatsApp click-to-chat, click-to-call, email and Facebook.
- Client-side enquiry form that drafts a WhatsApp message and opens WhatsApp. No form data are sent to a website server.
- Metadata, sitemap, robots, social sharing artwork, Schema.org structured data and custom 404.

The shop link points to https://store.diedingdokter.co.za/ as requested. This external Shopify store is not built, configured or verified in this repository.

## Local preview

Serve the repository directory on localhost, e.g.:

    python3 -m http.server 8080

Then visit http://localhost:8080/.

## Validate

    node --check assets/site.js
    node scripts/check-site.mjs

The GitHub Actions workflow validates pull requests and deploys main to GitHub Pages. Repository Settings > Pages > Build and deployment > Source must be GitHub Actions. The committed CNAME is www.diedingdokter.co.za.

## Before launch

- Confirm actual service location, opening hours, returns, repair terms and warranty.
- Confirm Shopify is live and has its own custom domain, catalogue, payment and policies.
- Publish manufacturer/distributor logos and partner claims only with written authorisation.
- Confirm this notice and POPIA compliance with the business owner.
- Add real product photos, specifications and stock only when verified.
- Confirm www DNS points to GitHub Pages and HTTPS is enforced.

## Links

- Facebook: https://www.facebook.com/diedingdokter
- WhatsApp: https://wa.me/27620207093
- Email: sales@diedingdokter.co.za

Current product cards represent enquiry categories, not live inventory.
