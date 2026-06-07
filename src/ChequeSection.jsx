import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/onenevada.svg";
import { supabase } from "./supabaseClient";
import { usePageUser, fetchMyAccounts } from "./pageHelpers";

export default function ChequeSection() {
  const { user, logout } = usePageUser();
  const [form, setForm] = useState({
    chequeSerial: "",
    senderName: "",
    amount: "",
    accountName: "",
    accountNumber: "",
    remark: "",
  });

  const [fileName, setFileName] = useState("");
  const [activeNav, setActiveNav] = useState("Cash Cheque");
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchMyAccounts().then(setAccounts); }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmitCheque = async () => {
    setStatus({ type: "", msg: "" });
    const amount = Number(String(form.amount).replace(/[^0-9.]/g, ""));
    if (!(amount > 0)) { setStatus({ type: "error", msg: "Enter a valid cheque amount." }); return; }
    const target = accounts[0];
    if (!target) { setStatus({ type: "error", msg: "No account found to deposit into." }); return; }
    setSubmitting(true);
    const { error } = await supabase.rpc("make_deposit", {
      p_account: target.id,
      p_amount: amount,
      p_source: form.senderName ? `Cheque from ${form.senderName}` : "Cheque Deposit",
    });
    setSubmitting(false);
    if (error) { setStatus({ type: "error", msg: error.message }); return; }
    setStatus({ type: "success", msg: `Cheque submitted. $${amount.toFixed(2)} credited to ${target.type}.` });
    setForm({ chequeSerial: "", senderName: "", amount: "", accountName: "", accountNumber: "", remark: "" });
    setFileName("");
  };

  return (
   <div className="min-h-screen bg-[#D6EAF8] font-sans flex flex-col mt-[-50px]">
      
      {/* ───────── NAVBAR ───────── */}
      <header className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-14 bg-white flex items-center justify-center overflow-hidden px-3 rounded-md">
              <img
                src={logo}
                alt="One Nevada Credit Union"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/dashboard"
              className={`text-sm font-semibold transition-all duration-200 hover:text-[#117ACA]
              ${
                activeNav === "Account"
                  ? "text-[#041a49] border-b-2 border-[#041a49] pb-1"
                  : "text-[#041a49]"
              }`}
              onClick={() => setActiveNav("Account")}
            >
              Account
            </Link>

            <Link
              to="/cheque"
              className={`text-sm font-semibold transition-all duration-200 hover:text-[#117ACA]
              ${
                activeNav === "Cash Cheque"
                  ? "text-[#041a49] border-b-2 border-[#041a49] pb-1"
                  : "text-[#041a49]"
              }`}
              onClick={() => setActiveNav("Cash Cheque")}
            >
              Cash Cheque
            </Link>

            <Link
              to="/transaction"
              className={`text-sm font-semibold transition-all duration-200 hover:text-[#117ACA]
              ${
                activeNav === "Transaction"
                  ? "text-[#041a49] border-b-2 border-[#041a49] pb-1"
                  : "text-[#041a49]"
              }`}
              onClick={() => setActiveNav("Transaction")}
            >
              Transaction
            </Link>

            <Link
              to="/transfer"
              className={`text-sm font-semibold transition-all duration-200 hover:text-[#117ACA]
              ${
                activeNav === "Transfer"
                  ? "text-[#041a49] border-b-2 border-[#041a49] pb-1"
                  : "text-[#041a49]"
              }`}
              onClick={() => setActiveNav("Transfer")}
            >
              Transfer
            </Link>

            <Link
              to="/card"
              className={`text-sm font-semibold transition-all duration-200 hover:text-[#117ACA]
              ${
                activeNav === "Card"
                  ? "text-[#041a49] border-b-2 border-[#041a49] pb-1"
                  : "text-[#041a49]"
              }`}
              onClick={() => setActiveNav("Card")}
            >
              Card
            </Link>

            <Link
              to="/report"
              className={`text-sm font-semibold transition-all duration-200 hover:text-[#117ACA]
              ${
                activeNav === "Report Issue"
                  ? "text-[#041a49] border-b-2 border-[#041a49] pb-1"
                  : "text-[#041a49]"
              }`}
              onClick={() => setActiveNav("Report Issue")}
            >
              Report Issue
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Settings */}
            <Link to="/settings" className="border border-[#041a49] text-[#041a49] hover:bg-[#041a49] hover:text-white transition-colors px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
              ⚙️ Settings
            </Link>

            {/* Logout */}
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md">
              ⏻ Logout
            </button>

            {/* User */}
            <div className="hidden md:flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 bg-white">
              <div className="w-8 h-8 rounded-full bg-[#117ACA] text-white flex items-center justify-center text-xs font-black">
                {user.initials}
              </div>

              <div className="text-left leading-tight">
                <p className="text-sm font-semibold text-[#041a49]">
                  {user.name}
                </p>
                <p className="text-[11px] text-gray-500">
                  Premium Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ───────── MAIN CONTENT ───────── */}
      <main className="max-w-5xl mx-auto px-4 pt-28 pb-10">
        
        <div className="rounded-[32px] bg-white p-8 shadow-2xl shadow-slate-900/10">
          
          {/* Header */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-2xl uppercase tracking-[0.35em] text-slate-500">
                Cash Out Cheque
              </p>

            
            </div>

            <div className="rounded-3xl bg-[#D6EAF8] px-4 py-3 text-sm text-[#041a49] font-medium">
              Upload image of the cheque (JPEG, PNG)
            </div>
          </div>

          {/* Form Container */}
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            
            {/* Upload */}
            <label
              htmlFor="cheque-file"
              className="group cursor-pointer rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center transition hover:border-[#117ACA] hover:bg-blue-50"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D6EAF8] text-2xl text-[#117ACA]">
                📎
              </div>

              <p className="mt-4 text-base font-semibold text-[#041a49]">
                Click to upload cheque
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {fileName || "Upload image of the cheque (JPEG, PNG)"}
              </p>

              <input
                id="cheque-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Row 1 */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Cheque Serial Number</span>

                <input
                  type="text"
                  name="chequeSerial"
                  value={form.chequeSerial}
                  onChange={handleChange}
                  placeholder="Cheque Serial Number"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Your Account Name</span>

                <input
                  type="text"
                  name="accountName"
                  value={form.accountName}
                  onChange={handleChange}
                  placeholder="Your Account Name"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            {/* Row 2 */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Sender Name</span>

                <input
                  type="text"
                  name="senderName"
                  value={form.senderName}
                  onChange={handleChange}
                  placeholder="Sender Name"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Your Account Number</span>

                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  placeholder="Your Account Number"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            {/* Row 3 */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Amount on the Cheque</span>

                <input
                  type="text"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="150,000"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Remark</span>

                <textarea
                  name="remark"
                  value={form.remark}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Remark"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </label>
            </div>

            {status.msg && (
              <div className={`rounded-2xl px-4 py-3 text-sm font-semibold ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
                {status.type === "success" ? "✓ " : "⚠ "}{status.msg}
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center justify-center pt-4">
              <button
                type="button"
                onClick={handleSubmitCheque}
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-[#041a49] px-10 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0c2b70] disabled:bg-slate-300"
              >
                {submitting ? "Submitting…" : "Submit Cheque"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
