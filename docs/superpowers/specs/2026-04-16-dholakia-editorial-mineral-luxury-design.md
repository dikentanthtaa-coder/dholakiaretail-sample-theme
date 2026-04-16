# Dholakia Retail Editorial Mineral Luxury Redesign

Date: 2026-04-16
Status: Approved for planning review

## Summary

Redesign the full Dholakia Retail website using a Petra Lithe-inspired visual language adapted for a premium retail group. Keep the existing Dholakia brand, routes, business structure, and overall content scope, but replace the current dark glass-heavy presentation with a lighter editorial system built around warm mineral tones, refined typography, restrained motion, and image-led layouts.

This is a site-wide design-system refactor, not a brand rename or information-architecture reset.

## Goals

- Keep Dholakia Retail as the brand and preserve the current route map
- Redesign the full site, not only the homepage
- Shift the visual language from dark cinematic/glass luxury to light editorial mineral luxury
- Make the site feel more curated, premium, spacious, and product-grade
- Establish a consistent shared system across homepage and all internal pages
- Preserve usability and responsive behavior across desktop and mobile

## Non-Goals

- Do not change the business identity from Dholakia Retail to Petra Lithe
- Do not clone Petra Lithe's exact content or product framing
- Do not rewrite the site's information architecture or route structure
- Do not turn the site into a generic corporate layout with minimal personality
- Do not keep the current dark neon/glass direction as the primary visual system

## Reference Interpretation

The reference site contributes the following qualities:

- warm natural palette
- editorial whitespace
- restrained and elegant motion
- large imagery with strong surface/material presence
- minimal navigation chrome
- product-like section rhythm

For Dholakia, these qualities should be adapted into a sharper premium retail expression rather than copied literally. The final result should feel closer to an editorial luxury group website than an architectural materials catalog.

## Visual System

### Palette

Adopt a light mineral palette as the default visual base:

- ivory / off-white primary backgrounds
- sand and pale stone secondary surfaces
- charcoal primary text
- muted taupe, olive, or bronze support accents
- occasional dark sections only when contrast or emphasis is needed

Remove the current blue-accent noir theme as the main design language. Avoid glossy black UI, blue glows, and high-contrast glassmorphism.

### Typography

Use a more editorial typographic hierarchy:

- larger, cleaner headings
- more restrained body text styling
- strong spacing around titles and paragraphs
- less dense, less tech-forward presentation

Typography should feel architectural, premium, and calm rather than dramatic or futuristic.

### Surfaces

Interface surfaces should become quieter:

- flatter cards
- finer borders
- minimal shadow usage
- no dominant blur-based glass treatments
- emphasis created through layout, proportion, imagery, and spacing

### Motion

Motion should be reduced and refined:

- soft fades
- sectional reveal-on-scroll
- subtle image drift/parallax where it adds atmosphere
- understated hover feedback
- smooth header state changes

Avoid full-screen dramatic mobile takeovers, aggressive clips, and flashy transitions.

## Global Layout And Navigation

### Header

Replace the current dark translucent header behavior with a lighter editorial shell:

- visible across all pages, including the homepage
- slimmer logo lockup
- cleaner spacing
- quiet CTA styling
- subtle compressed state on scroll
- soft tinted background and thin border after scroll

Dropdowns should behave like curated content panels rather than glossy floating menus.

### Footer

Redesign the footer into a calmer editorial footer:

- lighter visual treatment
- cleaner column layout
- more negative space
- no oversized dark wordmark in the background
- clearer hierarchy for brand, links, and legal items

### Shared Page Frame

All pages should align to one shared editorial frame:

- wide but controlled container width
- more open vertical rhythm
- asymmetrical compositions where appropriate
- page intro block with eyebrow, title, and concise supporting text
- image-led and text-led sections alternating for rhythm
- fewer boxed sections, more open layouts separated by spacing and lines

### Mobile Navigation

Replace the current dramatic fullscreen takeover with a cleaner panel or sheet pattern:

- readable spacing
- straightforward nested navigation handling
- elegant but simple transitions
- consistent with the lighter editorial brand system

## Page Strategy

### Homepage

Homepage remains the brand overview page, but should be rebuilt as a curated editorial sequence rather than a dark cinematic landing page.

Core homepage sections remain in scope:

- hero
- values
- about teaser
- portfolio preview
- stats
- manufacturing/sustainability
- news
- closing CTA

These sections should be visually reworked into lighter editorial bands with better spacing, stronger image hierarchy, and cleaner text composition.

### Internal Pages

The following pages should share a common internal-page language:

- About
- Sustainability
- Investor Relations
- Careers
- Contact

Shared internal-page pattern:

- concise page intro
- strong visual or statement block
- modular editorial sections
- text and image pairings
- metrics/list/FAQ blocks where appropriate
- calm closing CTA

### Portfolio And Brand Pages

Portfolio and brand-detail pages need the strongest elevation because they carry the premium retail storytelling.

Portfolio page direction:

- cleaner listing/grid
- stronger cover imagery
- more whitespace
- simpler card treatment

Brand detail page direction:

- generous hero presentation
- clear key facts
- stronger editorial story layout
- premium gallery/content rhythm
- improved balance between story and brand/product presentation

### News And Article Pages

News listing and article pages should move toward a magazine/editorial reading experience:

- simplified article cards
- better typography hierarchy
- clearer metadata treatment
- cleaner reading width
- calmer detail page layout

## Component System

Shared components should be refactored into one authored design language:

- header
- footer
- buttons
- section headers
- CTA blocks
- content cards
- grids
- page intro blocks
- image/text split sections

The redesign should feel systematic, not like independent page-level restyling.

## Architecture And Implementation Boundaries

This work should be executed as a design-system refactor on top of the existing React/Vite application.

Primary implementation layers:

- theme tokens and global CSS
- typography rules
- shared layout shell
- homepage section rebuild
- internal page shared patterns
- specialized portfolio/brand/news layouts
- motion pass

Current routes should stay intact. Existing components may be restyled, reorganized, or partially rebuilt to fit the new system, but routing should not be reimagined.

## Testing And Verification

Minimum verification expectations:

- all existing routes still render
- header, footer, and mobile navigation work
- build passes successfully
- visual system is consistent across pages
- light theme maintains readable contrast
- responsive layout remains usable on mobile and desktop
- portfolio, brand, and news pages retain distinct hierarchy within the shared system

## Risks

- A site-wide redesign can drift into inconsistent page-by-page styling without a strong shared system
- Converting from dark to light theme can introduce contrast and spacing issues
- Homepage polish can consume effort and leave internal pages under-designed if not planned deliberately
- Existing motion patterns may conflict with the calmer editorial direction and need targeted simplification

## Recommended Delivery Shape

Implementation planning should prioritize:

1. theme foundation and shared shell
2. homepage rebuild
3. shared internal-page patterns
4. specialized portfolio/brand/news refinement
5. verification and polish

This order reduces the risk of local styling decisions diverging from the approved system.
