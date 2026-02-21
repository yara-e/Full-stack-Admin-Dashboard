import { useParams, useNavigate } from "react-router-dom";
 
import { Button } from "@/components/ui/button";
import { useOrderDetails } from "./hooks/useOrderDetails";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const orderId = Number(id);

 
  const { data, isLoading } = useOrderDetails(orderId)


 
  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Order #{orderId} 
        </h1>

        <Button
          onClick={() => navigate("/orders")}
          
        >
          Back
        </Button>
      </div>

      {/* Empty State */}
      {data?.length === 0 && (
        <div className="border rounded-xl p-8 text-center text-muted-foreground bg-muted/30">
          No orders here
        </div>
      )}

      {/* Orders */}
      
        <div
          
          className="border rounded-xl p-6 shadow-sm bg-white space-y-5"
        >
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div>
              <h2 className="text-lg font-semibold">
                Order #{data.order.id}
              </h2>
              <p className="text-sm text-muted-foreground">
                {new Date(data.order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <StatusBadge status={data.order.status} />
              <PaymentBadge payment={data.order.Payment} />
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm border-t pt-4">
            <div>
              <p className="text-muted-foreground">Total Amount</p>
              <p className="font-medium">${data.order.amount}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Items Count</p>
              <p>{data.order.OrderProduct.length}</p>
            </div>

            <div>
              <p className="text-muted-foreground">User ID</p>
              <p>{data.order.userId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">User Email</p>
              <p>{data.order.User.email}</p>
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="font-medium mb-2">Products</h3>

            {data.order.OrderProduct.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No products in this order
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded-md">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-left">Quantity</th>
                      <th className="p-2 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.order.OrderProduct.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">
                          {item.Product?.name}
                        </td>
                        <td className="p-2">
                          {item.quantity}
                        </td>
                        <td className="p-2">
                          ${item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Payment</h3>

            {data.order.Payment ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Method</p>
                  <p>{data.order.Payment.method}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p>{data.order.Payment.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Paid At</p>
                  <p>
                    {new Date(data.order.Payment.paidAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No payment recorded
              </p>
            )}
          </div>
        </div>
       
    </div>
  );
}


function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({ payment }: any) {
  if (!payment)
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        UNPAID
      </span>
    );

  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
      {payment.method} • {payment.status}
    </span>
  );
}
