export default function TransactionsPage() {
  const transactions = [
    {
      amount: "$2000.00",
      sender: "Aron burleson",
      receiver: "Maria Amiron",
      type: "Debit",
      status: "Pending",
      date: "May 9th, 2026",
    },
    {
      amount: "$2000.00",
      sender: "Aron burleson",
      receiver: "Sharon stones",
      type: "Debit",
      status: "Successful",
      date: "Feb 5th, 2026",
    },
    {
      amount: "$8600.00",
      sender: "Aron burleson",
      receiver: "Maria Amorim",
      type: "Debit",
      status: "Successful",
      date: "Apr 30th, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f2d52] text-white p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Transaction</h1>

        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-pink-300"></div>
          <p className="text-lg">Hi Aron</p>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Balance */}
        <div className="bg-[#12406f] rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">Balance</h2>
          <p className="text-5xl font-bold">$64,850.00</p>
        </div>

        {/* Withdrawals */}
        <div className="bg-[#12406f] rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Withdrawals</h2>

          <p className="text-sm text-gray-300 mb-5">
            Total Withdrawals for the Month
          </p>

          <p className="text-5xl font-bold">$16,400.00</p>
        </div>

        {/* Deposits */}
        <div className="bg-[#12406f] rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Deposits</h2>

          <p className="text-sm text-gray-300 mb-5">
            Total Deposits for the Month
          </p>

          <p className="text-5xl font-bold">$42,000.00</p>
        </div>
      </div>

      {/* TRANSACTION FILTER */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-6">Transactions</h2>

        <div className="space-y-4">
          <button className="w-full bg-[#1e5ea8] hover:bg-[#2870c5] py-4 rounded-xl text-lg font-semibold transition">
            All
          </button>

          <button className="w-full bg-white text-black py-4 rounded-xl text-lg font-medium">
            Credit
          </button>

          <button className="w-full bg-white text-black py-4 rounded-xl text-lg font-medium">
            Debit
          </button>
        </div>
      </div>

      {/* STATUS FILTER */}
      <div className="flex justify-end mb-6">
        <select className="bg-white text-black px-5 py-3 rounded-lg outline-none">
          <option>All Status</option>
          <option>Pending</option>
          <option>Successful</option>
          <option>Failed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl overflow-hidden text-black">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-5">AMOUNT</th>
              <th className="p-5">SENDER</th>
              <th className="p-5">RECEIVER</th>
              <th className="p-5">TYPE</th>
              <th className="p-5">STATUS</th>
              <th className="p-5">DATE</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-5 text-orange-500 font-semibold">
                  {transaction.amount}
                </td>

                <td className="p-5">{transaction.sender}</td>

                <td className="p-5">{transaction.receiver}</td>

                <td className="p-5 text-red-500 font-semibold">
                  {transaction.type}
                </td>

                <td
                  className={`p-5 font-semibold ${
                    transaction.status === "Successful"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {transaction.status}
                </td>

                <td className="p-5">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
