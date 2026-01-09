import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from '@/pages/Products/productTable';

interface ProductDetailsDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailsDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailsDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-64 w-64 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-2">
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Brand:</span> {product.brand}
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Category:</span>{' '}
                {product.category}
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Price:</span> ${product.price}
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Rating:</span> {product.rating} ⭐
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Stock:</span> {product.stock}
              </p>
              <p className="text-muted-foreground text-sm">
                <span className="font-medium">Discount:</span>{' '}
                {product.discountPercentage}%
              </p>
              <div>
                <h4 className="mb-2 font-medium">Description</h4>
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
