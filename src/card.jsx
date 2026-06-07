import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/onenevada.svg";
import { supabase } from "./supabaseClient";
import { usePageUser } from "./pageHelpers";

export default function CardForm() {
  const { user, logout } = usePageUser();
  const [activeNav, setActiveNav] = useState("Card");
  const [card, setCard] = useState({ card_type: "", full_name: "", phone: "", ssn: "", address: "", annual_income: "", employment: "", credit_score: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);
  const setF = (k) => (e) => setCard((c) => ({ ...c, [k]: e.target.value }));

  const handleApply = async () => {
    setStatus({ type: "", msg: "" });
    if (!card.card_type || !card.full_name.trim()) {
      setStatus({ type: "error", msg: "Please select a card type and enter your full name." });
      return;
    }
    setSubmitting(true);
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase.from("card_applications").insert({
      user_id: auth.user.id,
      card_type: card.card_type,
      full_name: card.full_name,
      phone: card.phone,
      address: card.address,
      annual_income: card.annual_income ? Number(card.annual_income) : null,
      employment: card.employment,
      credit_score: card.credit_score ? Number(card.credit_score) : null,
    });
    setSubmitting(false);
    if (error) { setStatus({ type: "error", msg: error.message }); return; }
    setStatus({ type: "success", msg: "Card application submitted! We'll review and notify you." });
    setCard({ card_type: "", full_name: "", phone: "", ssn: "", address: "", annual_income: "", employment: "", credit_score: "" });
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
      <main className="w-full pt-24 pb-10 ">
        <div className="max-w-xl mx-auto px-4">

          <div className="bg-white p-6 rounded-[28px] shadow-2xl shadow-slate-900/10">

            <h1 className="text-3xl font-bold text-center text-[#07133B] mb-6">
              Apply for a Card
            </h1>

            {/* Card Type */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#0B1C48] mb-2">
                Card Type
              </label>

              <select value={card.card_type} onChange={setF("card_type")} className="w-full bg-white text-[#041a49] px-4 py-2.5 rounded-xl outline-none border border-slate-300 focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100">
                <option value="">Select...</option>
                <option>Visa® Signature</option>
                <option>Visa® Platinum</option>
                <option>Visa® Shared Secured</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#0B1C48] mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Full Name"
                value={card.full_name}
                onChange={setF("full_name")}
                className="w-full bg-white text-[#041a49] px-4 py-2.5 rounded-xl outline-none border border-slate-300 placeholder:text-gray-400 focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#0B1C48] mb-2">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="123-456-7890"
                value={card.phone}
                onChange={setF("phone")}
                className="w-full bg-white text-[#041a49] px-4 py-2.5 rounded-xl outline-none border border-slate-300 placeholder:text-gray-400 focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
              />
            </div>


            <div className="mb-5">
              <label className="block text-sm font-medium text-[#0B1C48] mb-2">
                SSN
              </label>

              <input
                type="text"
                placeholder="123-45-6789"
                value={card.ssn}
                onChange={setF("ssn")}
                className="w-full bg-white text-[#041a49] px-4 py-2.5 rounded-xl outline-none border border-slate-300 placeholder:text-gray-400 focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Address */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#0B1C48] mb-2">
                Address
              </label>

              <input
                type="text"
                placeholder="Your address"
                value={card.address}
                onChange={setF("address")}
                className="w-full bg-white text-[#041a49] px-4 py-2.5 rounded-xl outline-none border border-slate-300 placeholder:text-gray-400 focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Annual Income */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#0B1C48] mb-2">
                Annual Income
              </label>

              <input
                type="number"
                placeholder="50000"
                value={card.annual_income}
                onChange={setF("annual_income")}
                className="w-full bg-white text-[#041a49] px-4 py-2.5 rounded-xl outline-none border border-slate-300 placeholder:text-gray-400 focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Employment Status */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#0B1C48] mb-2">
                Employment Status
              </label>

              <select value={card.employment} onChange={setF("employment")} className="w-full bg-white text-[#041a49] px-4 py-2.5 rounded-xl outline-none border border-slate-300 focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100">
                <option value="">Select...</option>
                <option>Employed</option>
                <option>Self Employed</option>
                <option>Unemployed</option>
              </select>
            </div>

            {/* Credit Score */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0B1C48] mb-2">
                Credit Score
              </label>

              <input
                type="number"
                placeholder="700"
                value={card.credit_score}
                onChange={setF("credit_score")}
                className="w-full bg-white text-[#041a49] px-4 py-2.5 rounded-xl outline-none border border-slate-300 placeholder:text-gray-400 focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {status.msg && (
              <div className={`mb-4 rounded-xl px-4 py-3 text-sm font-semibold ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
                {status.type === "success" ? "✓ " : "⚠ "}{status.msg}
              </div>
            )}

            {/* Apply Button */}
            <button onClick={handleApply} disabled={submitting} className="w-full bg-[#041a49] hover:bg-[#0c2b70] text-white font-semibold py-2.5 rounded-xl transition duration-300 shadow-lg disabled:bg-slate-300">
              {submitting ? "Submitting…" : "Apply"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
