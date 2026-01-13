import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { productService, type Product } from '@/services/productService';

interface ProductUpdateFormProps {
  product: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductUpdateForm({ product, onSuccess, onCancel }: ProductUpdateFormProps) {
  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    category: product.category || '',
    brand: product.brand || '',
    price: product.price?.toString() || '',
    stock: product.stock?.toString() || '',
    discountPercentage: product.discountPercentage?.toString() || '',
    rating: product.rating?.toString() || '',
    thumbnail: product.thumbnail || ''
  });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const maxSize = 300;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, thumbnail: compressedDataUrl }));
      };
      
      img.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await productService.updateProduct(product._id!, {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        brand: formData.brand,
        stock: Number(formData.stock),
        discountPercentage: Number(formData.discountPercentage) || 0,
        rating: Number(formData.rating) || 0,
        thumbnail: formData.thumbnail
      });

      onSuccess();
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        className="w-full p-2 border rounded"
        rows={3}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="p-2 border rounded"
          required
        />
        <input
          placeholder="Brand"
          value={formData.brand}
          onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Discount %"
          value={formData.discountPercentage}
          onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: e.target.value }))}
          className="p-2 border rounded"
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={formData.rating}
          onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
          className="p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="product-image-update" className="block text-sm font-medium mb-2">Product Image</label>
        <input
          id="product-image-update"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
        />
        {formData.thumbnail && (
          <img src={formData.thumbnail} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Updating...' : 'Update Product'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}