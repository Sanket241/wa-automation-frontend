import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/product_card";
import { Product } from "@/lib/types";
import { handbagsData } from "@/lib/handbags";
import { Search, List } from "lucide-react";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [sortOption, setSortOption] = useState("name_asc");
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  // Get unique brands from products data
  const uniqueBrands = Array.from(new Set(handbagsData.map(product => product.brand)))
    .sort((a, b) => a.localeCompare(b));
  
  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...handbagsData];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply brand filter
    if (brandFilter && brandFilter !== 'all_brands') {
      filteredProducts = filteredProducts.filter(product => 
        product.brand === brandFilter
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "name_asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price_asc":
        filteredProducts.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        });
        break;
      case "price_desc":
        filteredProducts.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceB - priceA;
        });
        break;
      default:
        break;
    }
    
    setProducts(filteredProducts);
    setCurrentPage(1);  // Reset to first page when filters change
  }, [searchTerm, brandFilter, sortOption]);
  
  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Catalog</h1>
          <p className="text-gray-600 mt-1">Manage your luxury handbag inventory</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          
          <div className="flex gap-3">
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_brands">All Brands</SelectItem>
                {uniqueBrands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                <SelectItem value="price_asc">Price (Low-High)</SelectItem>
                <SelectItem value="price_desc">Price (High-Low)</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <List className="h-5 w-5" />
              <span>List</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="grid product-grid gap-6">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Pagination */}
      {products.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{Math.min(products.length, productsPerPage)}</span> of <span className="font-medium">{products.length}</span> products
          </div>
          
          <div className="flex">
            <Button
              variant="outline"
              className="rounded-l-md"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                className={`${
                  currentPage === index + 1 ? "bg-[#128C7E] text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              className="rounded-r-md"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {/* Empty state */}
      {products.length === 0 && (
        <Card className="mt-6">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <p className="text-gray-500 my-8">No products found matching your filters.</p>
            <Button onClick={() => {
              setSearchTerm("");
              setBrandFilter("all_brands");
              setSortOption("name_asc");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
