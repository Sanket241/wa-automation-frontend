import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { MessageSquare } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={`${product.brand} ${product.name} bag`}
          className="w-full h-full object-cover object-center" 
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
          <span className="text-[#128C7E] font-bold">{product.price}</span>
        </div>
        <p className="mt-2 text-gray-600 text-sm">
          {product.description}
        </p>
        {product.sourceChat && (
          <div className="mt-3 text-xs text-gray-500 flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            From: {product.sourceChat}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
