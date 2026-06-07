import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/onenevada.svg";
import { supabase } from "./supabaseClient";
import { usePageUser } from "./pageHelpers";

const navItems = [
  { label: "Account", path: "/dashboard" },
  { label: "Cash Cheque", path: "/cheque" },
  { label: "Transfer", path: "/transfer" },
  { label: "Transaction", path: "/transaction" },
  { label: "Card", path: "/card" },
  { label: "Report Issue", path: "/report" },
];

export default function ReportPage() {
  const { user, logout } = usePageUser();
  const [form, setForm] = useState({
    issueType: "",
    account: "",
    subject: "",
    description: "",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setStatus({ type: "", msg: "" });
    if (!form.issueType || !form.subject.trim()) {
      setStatus({ type: "error", msg: "Please choose an issue type and enter a subject." });
      return;
    }
    setSubmitting(true);
    const { data: auth } = await supabase.auth.getUser();
    const { error } = await supabase.from("support_tickets").insert({
      user_id: auth.user.id,
      issue_type: form.issueType,
      account_ref: form.account,
      subject: form.subject,
      description: form.description,
    });
    setSubmitting(false);
    if (error) { setStatus({ type: "error", msg: error.message }); return; }
    setStatus({ type: "success", msg: "Report submitted. We'll review it within 1 business day." });
    setForm({ issueType: "", account: "", subject: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-[#D6EAF8] font-sans">
      <header className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="px-6 h-20 flex items-center justify-between">
          <div className="h-14 bg-white flex items-center justify-center overflow-hidden px-3 rounded-md">
            <img src={logo} alt="One Nevada Credit Union" className="h-full w-auto object-contain" />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-semibold transition-all duration-200 hover:text-[#117ACA] ${
                  item.label === "Report Issue"
                    ? "text-[#041a49] border-b-2 border-[#041a49] pb-1"
                    : "text-[#041a49]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/settings" className="border border-[#041a49] text-[#041a49] hover:bg-[#041a49] hover:text-white transition-colors px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
              Settings
            </Link>

            <button onClick={logout} className="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md">
              Logout
            </button>

            <div className="hidden md:flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 bg-white">
              <div className="w-8 h-8 rounded-full bg-[#117ACA] text-white flex items-center justify-center text-xs font-black">
                {user.initials}
              </div>
              <div className="text-left leading-tight">
                <p className="text-sm font-semibold text-[#041a49]">{user.name}</p>
                <p className="text-[11px] text-gray-500">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-[28px] shadow-2xl shadow-slate-900/10 p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#117ACA]">Support</p>
              <h1 className="mt-2 text-3xl font-bold text-[#07133B]">Report an Issue</h1>
            </div>
            <div className="rounded-2xl bg-[#D6EAF8] px-4 py-3 text-sm text-[#041a49] font-medium">
              We will review your report within 1 business day.
            </div>
          </div>

          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Issue Type</span>
                <select
                  name="issueType"
                  value={form.issueType}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select issue type</option>
                  <option>Account access</option>
                  <option>Transaction dispute</option>
                  <option>Card problem</option>
                  <option>Cheque issue</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Related Account</span>
                <input
                  type="text"
                  name="account"
                  value={form.account}
                  onChange={handleChange}
                  placeholder="Account or card ending"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="font-medium">Subject</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Briefly describe the issue"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="font-medium">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Add any details that can help us understand what happened"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#117ACA] focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </label>

            {status.msg && (
              <div className={`rounded-2xl px-4 py-3 text-sm font-semibold ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
                {status.type === "success" ? "✓ " : "⚠ "}{status.msg}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-[#041a49] px-10 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0c2b70] disabled:bg-slate-300"
              >
                {submitting ? "Submitting…" : "Submit Report"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
