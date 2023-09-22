import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
 id?: any,
 title?: string,
 category?: string,
 description?: string,
 price?: number,
 image?: string
}

interface ProductsState {
  data?: Product[];
  dataByCategories?: Product[];
  loading?: boolean;
}

const initialState: ProductsState = {
  data: [],
  dataByCategories: [],
  loading: false,
};

export const fetchProduct = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (id) => {
    if ( id[0] === "all") {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();

      return products;
    } else {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${id}`
      );
      const products = await response.json();
      return products;
    }
  }
);

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProduct",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.dataByCategories = action.payload;
    });
  },
});

export default productsSlice.reducer;
