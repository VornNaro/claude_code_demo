# CLAUDE.md

## Project Overview

Samsung Store - an e-commerce product catalog and shopping cart with wishlist, filtering, and search, built with Next.js (App Router).

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Language**: TypeScript 5 (strict mode)
- **UI**: React 19, Tailwind CSS 4 (via `@tailwindcss/postcss`)
- **State Management**: Zustand (with `persist` middleware for cart & wishlist)
- **Icons**: lucide-react
- **Utilities**: react-intersection-observer
- **Linting**: ESLint 9 with `eslint-config-next` (core-web-vitals + typescript)

## Project Structure

```
src/
  app/
    layout.tsx            # Root layout (Header, Footer, Toast, Geist fonts)
    page.tsx              # Main store page (product grid + filters)
    loading.tsx           # Loading skeleton
    not-found.tsx         # 404 page
    globals.css           # Global styles + Tailwind
    search/page.tsx       # Search results page
    product/[id]/page.tsx # Product detail page (gallery, specs, actions)
    cart/page.tsx         # Cart page
    wishlist/page.tsx     # Wishlist page
  components/
    ui/                   # Reusable UI primitives
      Button.tsx, Badge.tsx, Skeleton.tsx, QuantitySelector.tsx, Toast.tsx, HeroBanner.tsx
    layout/               # App shell components
      Header.tsx, Footer.tsx, SearchBar.tsx, MobileNav.tsx
    product/              # Product display components
      ProductCard.tsx, ProductGrid.tsx, ProductGallery.tsx, ProductSpecs.tsx, ProductActions.tsx
    cart/                 # Cart components
      CartItem.tsx, CartSummary.tsx
    wishlist/
      WishlistItem.tsx
    filters/              # Filtering & sorting components
      CategoryFilter.tsx, PriceRangeFilter.tsx, SortSelect.tsx, FilterSidebar.tsx, FilterMobile.tsx
  stores/
    cartStore.ts          # Zustand cart store (persisted as 'samsung-cart')
    wishlistStore.ts      # Zustand wishlist store (persisted as 'samsung-wishlist')
    filterStore.ts        # Zustand filter store (categories, price range, sort, search)
  hooks/
    useHydration.ts       # SSR hydration guard
    useProducts.ts        # Client-side filtering, sorting, and pagination
  types/
    index.ts              # Product, CartItem, FilterState, ProductCategory, SortOption
  lib/
    constants.ts          # SITE_CONFIG, PAGE_SIZE (12), CATEGORIES, SORT_OPTIONS, TAX_RATE
    utils.ts              # formatCurrency, cn, getDiscountPercentage
    products.ts           # getAllProducts, getProductById, getProductsByIds, getRelatedProducts
  data/
    products.json         # Product catalog data
```

## Key Commands

```bash
npm run dev      # Start dev server (Turbopack, port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Conventions

- Path alias: `@/*` maps to `./src/*`
- Prices stored in **cents** (integer) - use `formatCurrency()` from `@/lib/utils` to display
- Product categories: `smartphones`, `tablets`, `tvs`, `watches`, `earbuds`, `laptops`
- Use `cn()` utility for conditional class concatenation
- Tax rate: 8% (`TAX_RATE` in `@/lib/constants`)
- Page size: 12 products per page (`PAGE_SIZE` in `@/lib/constants`)
- Fonts: Geist Sans + Geist Mono (CSS variables `--font-geist-sans`, `--font-geist-mono`)
- Cart and wishlist stores use Zustand `persist` middleware (localStorage keys: `samsung-cart`, `samsung-wishlist`)
- Use `useHydration()` hook to guard against SSR/client mismatch when reading persisted stores

## Types

Core types are in `src/types/index.ts`:
- `Product` - id, name, category, price (cents), originalPrice?, description, specs, images, colors, rating, reviewCount, inStock, isNew?, isFeatured?
- `ProductColor` - name, hex
- `CartItem` - productId, color, quantity
- `FilterState` - categories, priceRange (cents tuple), sortBy, searchQuery
- `ProductCategory` - union: `'smartphones' | 'tablets' | 'tvs' | 'watches' | 'earbuds' | 'laptops'`
- `SortOption` - union: `'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'`
