import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../lib/api";

export default function AdminDashboard() {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setAuthToken(token);

    async function load() {
      const res = await api.get("/api/content");
      setContent(res.data);
    }
    load();
  }, []);

  function logout() {
    localStorage.removeItem("admin_token");
    setAuthToken(null);
    navigate("/admin");
  }

  async function save() {
    setSaving(true);
    try {
      await api.put("/api/admin/content", content);
      alert("✅ Content updated!");
      navigate("/", { replace: true });
    } catch (e) {
      alert(e?.response?.data?.message || "❌ Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!content) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar responsive */}
      <div className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between">
          <h1 className="font-bold text-lg">Admin Dashboard</h1>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={save}
              className="px-4 py-2 rounded-lg bg-black text-white"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={logout} className="px-4 py-2 rounded-lg border">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid gap-6 max-w-6xl mx-auto">
        {/* NAVBAR - FIXED schema */}
        <Card title="Navbar">
          <Field
            label="CTA Button Text"
            value={content.navbar.ctaText}
            onChange={(v) =>
              setContent({ ...content, navbar: { ...content.navbar, ctaText: v } })
            }
          />

          <ListEditor
            label="Navbar Links"
            items={content.navbar.links}
            onChange={(newLinks) =>
              setContent({ ...content, navbar: { ...content.navbar, links: newLinks } })
            }
            renderItem={(item, onItemChange) => (
              <div className="grid md:grid-cols-2 gap-3">
                <Field
                  label="Label"
                  value={item.label}
                  onChange={(v) => onItemChange({ ...item, label: v })}
                />
                <Field
                  label="Section ID (example: home, amenities, faq)"
                  value={item.id}
                  onChange={(v) => onItemChange({ ...item, id: v })}
                />
              </div>
            )}
            newItem={() => ({ label: "New Link", id: "home" })}
          />
        </Card>

        {/* keep your other cards as-is */}
      </div>
    </div>
  );
}

/* helpers unchanged */
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}
function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-700">{label}</label>
      <input
        className="mt-1 w-full border rounded-lg p-2"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
function ListEditor({ label, items, onChange, renderItem, newItem }) {
  const list = Array.isArray(items) ? items : [];

  function updateAt(i, newVal) {
    const next = [...list];
    next[i] = newVal;
    onChange(next);
  }
  function removeAt(i) {
    const next = list.filter((_, idx) => idx !== i);
    onChange(next);
  }
  function add() {
    onChange([...list, newItem()]);
  }

  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{label}</div>
        <button type="button" onClick={add} className="px-3 py-1.5 rounded-lg bg-black text-white text-sm">
          + Add
        </button>
      </div>

      <div className="mt-4 grid gap-4">
        {list.map((item, idx) => (
          <div key={`${item?.label || "item"}-${idx}`} className="rounded-xl border p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-semibold">Item #{idx + 1}</div>
              <button type="button" onClick={() => removeAt(idx)} className="px-3 py-1.5 rounded-lg border text-sm hover:bg-white">
                Remove
              </button>
            </div>
            {renderItem(item, (newVal) => updateAt(idx, newVal))}
          </div>
        ))}
      </div>
    </div>
  );
}
