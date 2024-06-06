import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of a product
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

// Define the shape of a product review
interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// Define the shape of the products context
interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  fetchProducts: (pageNum: number) => void;
}

// Create the products context
const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  error: null,
  page: 0,
  totalPages: 0,
  nextPage: () => {},
  prevPage: () => {},
  fetchProducts: (pageNum: number) => {},
});

// Custom hook to use the products context
export const useProducts = () => useContext(ProductsContext);

// Products provider component
export const ProductsProvider: React.FC<{ children: any }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Track current page
  const [totalPages, setTotalPages] = useState<number>(1); // Total number of pages

  const fetchProducts = async (pageNum: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=30&skip=${
          (pageNum - 1) * 30
        }&select=title,price,thumbnail,description`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 30));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts(page);
  }, [page]); // Refetch products when page changes

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        page,
        totalPages,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
