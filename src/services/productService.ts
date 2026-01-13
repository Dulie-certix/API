import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
  discountPercentage?: number;
  rating?: number;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

class ProductService {
  private baseURL = `${API_BASE_URL}/products`;

  async createProduct(product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      const response = await axios.post<Product>(this.baseURL, product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(this.baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await axios.get<Product>(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
      const response = await axios.patch<Product>(`${this.baseURL}/${id}`, product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }
}

export const productService = new ProductService();