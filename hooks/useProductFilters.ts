import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useCallback } from 'react';

export type TProductFilters = {
  category?: string;
  collection?:string;
  color?: string;
  sizes?: string;
  highlight?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  brands?:string;
};

export function useProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { category_slug } = useParams();
  const getParam = (key: string) => searchParams.get(key) || '';
  const getNumericParam = (key: string) =>
    searchParams.get(key) ? parseInt(searchParams.get(key) as string) : undefined;

  const filters: TProductFilters = {
    category: getParam('category') ? getParam('category') : category_slug + "",
    collection: getParam('collection'),
    color: getParam('color'),
    sizes: getParam('sizes'),
    highlight: getParam('highlight'),
    min_price: getNumericParam('min_price'),
    max_price: getNumericParam('max_price'),
    search: getParam('search'),
    brands: getParam('brands'),
  };

  const setFilters = useCallback((newFilters: TProductFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  return { ...filters, setFilters };
}
