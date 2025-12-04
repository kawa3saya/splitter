import { PaymentForm } from "@/app/trips/[id]/_components/payment-form";

export const TablePayments = ({
  payments,
  currencies,
  users,
}: {
  payments: Payment[];
  currencies: Currency[];
  users: User[];
}) => {
  return (
    <>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        onClick={() => {}}
      >
        Add Payment
      </button>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        disabled
      >
        Delete Trip
      </button>

      {payments.length === 0 ? (
        <p>No payments yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Payer</th>
              <th className="border p-2 text-right">Amount</th>
              <th className="border p-2 text-center">Currency</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">
                  {p.user_name || users.find((u) => u.id === p.user_id)?.name}
                </td>
                <td className="border p-2 text-right">{p.amount}</td>
                <td className="border p-2 text-center">
                  {p.currency_code ||
                    currencies.find((c) => c.id === p.currency_id)?.code}
                </td>
                <td className="border p-2">{p.description}</td>
                <td className="border p-2 text-sm text-gray-500">
                  {new Date(p.created_at).toLocaleString("en-US", {
                    timeZone: "UTC",
                  })}
                </td>
                <td className="border p-2">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* {showForm && (
        <PaymentForm
          tripId={trip.id}
          payment={editPayment}
          currencies={currencies}
          users={users}
          onSuccess={fetchPayments}
           onClose={() => setShowForm(false)}
        />
      )} */}
    </>
  );
};
