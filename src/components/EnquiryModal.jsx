import { useState } from "react";
import { api } from "../lib/api";

export function EnquiryModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("Name and phone are required.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/enquiries", form);

      setStatus("✅ Submitted successfully!");
      setForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => onClose?.(), 700);
    } catch (err) {
      setStatus(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Enquiry</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-gray-100">
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Phone *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2 min-h-[90px]"
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          {status && <p className="text-sm text-gray-700">{status}</p>}

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#c0ff00] font-bold hover:bg-[#d4ff4d] transition active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
