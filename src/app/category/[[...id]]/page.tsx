
import { Store } from "../../../stores";
import { fetchProduct } from "../../../stores/product-store";
import { AddBasketButton } from "../../../components/add-basket-button";
import Table from "../../../components/table/Table";

export default async function ProductDetailPage({ params: { id } }) {
  await Store.dispatch(fetchProduct(id));
  const product = Store.getState()?.products?.dataByCategories;

  if (!product?.length) {
    return (
      <>
        <AddBasketButton product={product} />
        <h1>No products</h1>
      </>
    );
  }
  return (
    <>
      <AddBasketButton product={product} />
      <div >
        <Table
          data={product}
          checked_all={true}
          checkable={true}
          //Use Translation File For Columns
          columns={[
            {
              title: false,
              field: "checkbox",
            },
            {
              title: "Product Image",
              field: "image",
            },
            {
              title: "Product Name",
              field: "title",
              reSize: true,
              sortableColumn: true,
            },
            {
              title: "Category",
              field: "category",
              sortableColumn: false,
            },
            {
              title: "Price",
              field: "price",
              sortableColumn: true,
            },
          ]}
        />
      </div>
    </>
  );
}
