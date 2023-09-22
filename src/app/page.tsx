'use client'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../stores/product-store';
import { RootState } from '../stores';

import { AddBasketButton } from '../components/add-basket-button';
import Table from '../components/table/Table';

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!products?.length) {
    return (
      <>
        <AddBasketButton product={products} />
        <h1>No products</h1>
      </>
    );
  }

  return (
    <>
      <AddBasketButton product={products} />

      <div >
        <Table
          data={products}
          checked_all={true}
          checkable={true}
          // Sütunlar için çeviri dosyasını kullan
          columns={[
            {
              title: false,
              field: 'checkbox',
            },
            {
              title: 'Product Image',
              field: 'image',
            },
            {
              title: 'Product Name',
              field: 'title',
              reSize: true,
              sortableColumn: true,
            },
            {
              title: 'Category',
              field: 'category',
              sortableColumn: true,
            },
            {
              title: 'Price',
              field: 'price',
              sortableColumn: true,
            },
          ]}
        />
      </div>
    </>
  );
}
