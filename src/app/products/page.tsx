"use client";

import { useState } from "react";
import { Footer, Header, ProductCard } from "@/components/storefront";
import { mockProducts } from "@/lib/products";

type SortOption = "title-asc" | "price-asc" | "price-desc";

const availableTypes = [...new Set(mockProducts.map((product) => product.type))];
const typeFilters = ["All", ...availableTypes] as const;
type Filter = (typeof typeFilters)[number];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<SortOption>("title-asc");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = mockProducts
    .filter((product) => activeFilter === "All" || product.type === activeFilter)
    .filter((product) => normalizedQuery.length === 0 || [product.title, product.creator, product.description, product.format, product.type].some((value) => value.toLowerCase().includes(normalizedQuery)))
    .sort((first, second) => {
      if (sort === "price-asc") return first.price - second.price;
      if (sort === "price-desc") return second.price - first.price;
      return first.title.localeCompare(second.title);
    });
  const hasActiveFilters = query.length > 0 || activeFilter !== "All" || sort !== "title-asc";

  function clearFilters() {
    setQuery("");
    setActiveFilter("All");
    setSort("title-asc");
  }

  return (
    <><Header /><main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:px-12"><p className="eyebrow">The collection</p><div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end"><h1 className="editorial-display max-w-2xl text-5xl leading-none sm:text-7xl">Things worth keeping close.</h1><p className="max-w-xs text-sm leading-6 text-warm-gray">A small, growing catalogue of digital books and resources. All prices shown in NGN.</p></div></section>
      <section className="border-y border-line bg-paper"><div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12"><div className="grid gap-6 border-b border-line pb-6 lg:grid-cols-[minmax(0,1fr)_auto]"><div><label htmlFor="catalogue-search" className="eyebrow">Search the collection</label><input id="catalogue-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, creator, format, or type" className="focus-ring mt-3 w-full border-b border-charcoal bg-transparent px-0 py-3 text-base placeholder:text-warm-gray/75" /></div><div className="flex items-end"><label htmlFor="catalogue-sort" className="sr-only">Sort products</label><select id="catalogue-sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="focus-ring min-h-11 w-full border border-line bg-ivory px-3 py-2 text-sm font-semibold lg:w-52"><option value="title-asc">Title A–Z</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="newest" disabled>Newest (date not provided)</option></select></div></div><div className="flex flex-col gap-4 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold" aria-live="polite">{visibleProducts.length} products <span className="font-normal text-warm-gray">· development catalogue</span></p><p className="mt-1 text-xs text-warm-gray">Type filters are based on the available mock data.</p></div><div className="flex flex-wrap gap-2 text-xs font-semibold" aria-label="Filter products by type" role="group">{typeFilters.map((filter) => { const selected = activeFilter === filter; return <button key={filter} className={selected ? "rounded-full bg-charcoal px-4 py-2 text-ivory" : "rounded-full border border-line px-4 py-2 hover:border-charcoal"} type="button" aria-pressed={selected} onClick={() => setActiveFilter(filter)}>{filter === "E-book" ? "E-books" : filter === "All" ? "All" : `${filter}s`}</button>; })}</div></div>{hasActiveFilters && <button type="button" onClick={clearFilters} className="focus-ring mt-5 text-sm font-semibold underline decoration-copper underline-offset-8 hover:text-copper-dark">Clear filters</button>}{visibleProducts.length > 0 ? <div className="grid gap-x-5 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="py-16 text-center"><p className="editorial-display text-3xl">Nothing matched that search.</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-warm-gray">Try a different title, creator, format, or type, or clear the current filters.</p><button type="button" onClick={clearFilters} className="focus-ring mt-6 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-ivory hover:bg-copper-dark">Clear filters</button></div>}</div></section>
    </main><Footer /></>
  );
}