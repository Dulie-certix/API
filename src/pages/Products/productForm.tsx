import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { productService } from '@/services/productService';

interface ProductFormProps {
  onSuccess: () => void;
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    discountPercentage: '',
    rating: '',
    thumbnail: ''
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
      await productService.createProduct({
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
      setFormData({
        name: '', description: '', category: '', brand: '',
        price: '', stock: '', discountPercentage: '', rating: '', thumbnail: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
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
        <label htmlFor="product-image" className="block text-sm font-medium mb-2">Product Image</label>
        <input
          id="product-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
        />
        {formData.thumbnail && (
          <img src={formData.thumbnail} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />
        )}
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Adding...' : 'Add Product'}
      </Button>
    </form>
  );
}