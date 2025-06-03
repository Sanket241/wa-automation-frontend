import { Supplier } from "@/lib/types";
import { cn, getInitials } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface SupplierTableProps {
  suppliers: Supplier[];
}

export function SupplierTable({ suppliers }: SupplierTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Supplier</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>WhatsApp Number</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map(supplier => (
            <TableRow key={supplier.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="text-sm font-medium">{getInitials(supplier.name)}</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                    <div className="text-sm text-gray-500">{supplier.specialty}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-900">{supplier.location}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-900">{supplier.phoneNumber}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-900">{supplier.productCount} products</div>
              </TableCell>
              <TableCell>
                <span className={cn(
                  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                  supplier.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                )}>
                  {supplier.status}
                </span>
              </TableCell>
              <TableCell className="text-right text-sm font-medium">
                <Button variant="ghost" className="text-[#128C7E] hover:text-[#075E54] mr-3">Edit</Button>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {suppliers.length > 0 && (
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{suppliers.length}</span> of <span className="font-medium">{suppliers.length}</span> suppliers
            </div>
            <div className="flex">
              <Button variant="outline" className="px-3 py-1 rounded-l-md" disabled>
                Previous
              </Button>
              <Button className="px-3 py-1 bg-[#128C7E] text-white border border-[#128C7E]">
                1
              </Button>
              <Button variant="outline" className="px-3 py-1 rounded-r-md" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
