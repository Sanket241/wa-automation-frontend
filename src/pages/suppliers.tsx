import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SupplierTable } from "@/components/SupplierTable";
import { suppliersData } from "@/lib/handbags";
import { Search, Plus } from "lucide-react";
import { Supplier } from "@/lib/types";

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [suppliers, setSuppliers] = useState<Supplier[]>(suppliersData);
  
  // Get unique locations
  const uniqueLocations = Array.from(new Set(suppliersData.map(supplier => supplier.location)))
    .filter(Boolean)
    .sort() as string[];
  
  // Filter suppliers based on search and location
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          supplier.phoneNumber.includes(searchTerm) ||
                          supplier.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter && locationFilter !== 'all_countries' ? supplier.location === locationFilter : true;
    
    return matchesSearch && matchesLocation;
  });
  
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
          <p className="text-gray-600 mt-1">Manage your product suppliers and contacts</p>
        </div>
        <div>
          <Button className="bg-[#128C7E] hover:bg-[#075E54] flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b flex items-center gap-3 flex-wrap">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-auto min-w-[180px]">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_countries">All Countries</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <SupplierTable suppliers={filteredSuppliers} />
          
          {filteredSuppliers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No suppliers found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


