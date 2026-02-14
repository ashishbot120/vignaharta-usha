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
    } catch (e) {
      alert(e?.response?.data?.message || "❌ Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!content) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">Admin Dashboard</h1>
        <div className="flex gap-2">
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

      <div className="p-6 grid gap-6 max-w-5xl mx-auto">
        {/* NAVBAR */}
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
                  label="Href (example: #amenities)"
                  value={item.href}
                  onChange={(v) => onItemChange({ ...item, href: v })}
                />
              </div>
            )}
            newItem={() => ({ label: "New Link", href: "#home" })}
          />
        </Card>

        {/* HERO */}
        <Card title="Hero Section">
          <TwoCol>
            <Field
              label="Headline"
              value={content.hero.headline}
              onChange={(v) => setContent({ ...content, hero: { ...content.hero, headline: v } })}
            />
            <Field
              label="Project Name"
              value={content.hero.projectName}
              onChange={(v) => setContent({ ...content, hero: { ...content.hero, projectName: v } })}
            />
          </TwoCol>

          <TwoCol>
            <Field
              label="Subline 1"
              value={content.hero.subline1}
              onChange={(v) => setContent({ ...content, hero: { ...content.hero, subline1: v } })}
            />
            <Field
              label="Subline 2"
              value={content.hero.subline2}
              onChange={(v) => setContent({ ...content, hero: { ...content.hero, subline2: v } })}
            />
          </TwoCol>

          <TextArea
            label="Address Line"
            value={content.hero.addressLine}
            onChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, addressLine: v } })
            }
          />

          <TwoCol>
            <Field
              label="Left Price Title"
              value={content.hero.leftPriceTitle}
              onChange={(v) =>
                setContent({ ...content, hero: { ...content.hero, leftPriceTitle: v } })
              }
            />
            <Field
              label="Left Price"
              value={content.hero.leftPrice}
              onChange={(v) =>
                setContent({ ...content, hero: { ...content.hero, leftPrice: v } })
              }
            />
          </TwoCol>

          <TwoCol>
            <Field
              label="Right Price Title"
              value={content.hero.rightPriceTitle}
              onChange={(v) =>
                setContent({ ...content, hero: { ...content.hero, rightPriceTitle: v } })
              }
            />
            <Field
              label="Right Price"
              value={content.hero.rightPrice}
              onChange={(v) =>
                setContent({ ...content, hero: { ...content.hero, rightPrice: v } })
              }
            />
          </TwoCol>

          <Field
            label="Enquiry Button Text"
            value={content.hero.enquiryBtnText}
            onChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, enquiryBtnText: v } })
            }
          />
        </Card>

        {/* ABOUT */}
        <Card title="About Project">
          <Field
            label="Title"
            value={content.aboutProject.title}
            onChange={(v) =>
              setContent({ ...content, aboutProject: { ...content.aboutProject, title: v } })
            }
          />
          <TextArea
            label="Description"
            value={content.aboutProject.description}
            onChange={(v) =>
              setContent({
                ...content,
                aboutProject: { ...content.aboutProject, description: v },
              })
            }
          />
          <Field
            label="Brochure Button Text"
            value={content.aboutProject.brochureBtnText}
            onChange={(v) =>
              setContent({
                ...content,
                aboutProject: { ...content.aboutProject, brochureBtnText: v },
              })
            }
          />
        </Card>

        {/* AMENITIES */}
        <Card title="Amenities">
          <Field
            label="Title"
            value={content.amenities.title}
            onChange={(v) =>
              setContent({ ...content, amenities: { ...content.amenities, title: v } })
            }
          />
          <TextArea
            label="Subtitle"
            value={content.amenities.subtitle}
            onChange={(v) =>
              setContent({ ...content, amenities: { ...content.amenities, subtitle: v } })
            }
          />
          <Field
            label="View More Text"
            value={content.amenities.viewMoreText}
            onChange={(v) =>
              setContent({ ...content, amenities: { ...content.amenities, viewMoreText: v } })
            }
          />

          <ListEditor
            label="Amenities Items"
            items={content.amenities.items}
            onChange={(items) =>
              setContent({ ...content, amenities: { ...content.amenities, items } })
            }
            renderItem={(item, onItemChange) => (
              <TwoCol>
                <Field
                  label="Title"
                  value={item.title}
                  onChange={(v) => onItemChange({ ...item, title: v })}
                />
                <Field
                  label="Description (optional)"
                  value={item.description}
                  onChange={(v) => onItemChange({ ...item, description: v })}
                />
              </TwoCol>
            )}
            newItem={() => ({ title: "New Amenity", description: "" })}
          />
        </Card>

        {/* EXPLORE BUILDINGS */}
        <Card title="Explore Buildings">
          <Field
            label="Title"
            value={content.exploreBuildings.title}
            onChange={(v) =>
              setContent({
                ...content,
                exploreBuildings: { ...content.exploreBuildings, title: v },
              })
            }
          />
          <ListEditor
            label="Cards"
            items={content.exploreBuildings.cards}
            onChange={(cards) =>
              setContent({
                ...content,
                exploreBuildings: { ...content.exploreBuildings, cards },
              })
            }
            renderItem={(item, onItemChange) => (
              <Field
                label="Card Label"
                value={item.label}
                onChange={(v) => onItemChange({ ...item, label: v })}
              />
            )}
            newItem={() => ({ label: "Newly Launched - New Building" })}
          />
        </Card>

        {/* FLOOR PLANS */}
        <Card title="Floor Plans">
          <Field
            label="Title"
            value={content.floorPlans.title}
            onChange={(v) =>
              setContent({ ...content, floorPlans: { ...content.floorPlans, title: v } })
            }
          />
          <Field
            label="Download Button Text"
            value={content.floorPlans.downloadBtnText}
            onChange={(v) =>
              setContent({
                ...content,
                floorPlans: { ...content.floorPlans, downloadBtnText: v },
              })
            }
          />
          <Field
            label="Video Title"
            value={content.floorPlans.videoTitle}
            onChange={(v) =>
              setContent({ ...content, floorPlans: { ...content.floorPlans, videoTitle: v } })
            }
          />

          <ListEditor
            label="Tabs"
            items={content.floorPlans.tabs}
            onChange={(tabs) =>
              setContent({ ...content, floorPlans: { ...content.floorPlans, tabs } })
            }
            renderItem={(item, onItemChange) => (
              <Field
                label="Tab Label"
                value={item.label}
                onChange={(v) => onItemChange({ ...item, label: v })}
              />
            )}
            newItem={() => ({ label: "3 BHK" })}
          />

          <CardMini title="Selected Info Labels">
            <Field
              label="Type Label"
              value={content.floorPlans.selectedInfo.typeLabel}
              onChange={(v) =>
                setContent({
                  ...content,
                  floorPlans: {
                    ...content.floorPlans,
                    selectedInfo: { ...content.floorPlans.selectedInfo, typeLabel: v },
                  },
                })
              }
            />
            <Field
              label="Area Label"
              value={content.floorPlans.selectedInfo.areaLabel}
              onChange={(v) =>
                setContent({
                  ...content,
                  floorPlans: {
                    ...content.floorPlans,
                    selectedInfo: { ...content.floorPlans.selectedInfo, areaLabel: v },
                  },
                })
              }
            />
            <Field
              label="Price Label"
              value={content.floorPlans.selectedInfo.priceLabel}
              onChange={(v) =>
                setContent({
                  ...content,
                  floorPlans: {
                    ...content.floorPlans,
                    selectedInfo: { ...content.floorPlans.selectedInfo, priceLabel: v },
                  },
                })
              }
            />
          </CardMini>
        </Card>

        {/* DEVELOPER */}
        <Card title="Developer">
          <Field
            label="Title"
            value={content.developer.title}
            onChange={(v) =>
              setContent({ ...content, developer: { ...content.developer, title: v } })
            }
          />
          <TextArea
            label="Description"
            value={content.developer.description}
            onChange={(v) =>
              setContent({
                ...content,
                developer: { ...content.developer, description: v },
              })
            }
          />

          <ListEditor
            label="Stats"
            items={content.developer.stats}
            onChange={(stats) =>
              setContent({ ...content, developer: { ...content.developer, stats } })
            }
            renderItem={(item, onItemChange) => (
              <TwoCol>
                <Field
                  label="Value"
                  value={item.value}
                  onChange={(v) => onItemChange({ ...item, value: v })}
                />
                <Field
                  label="Label"
                  value={item.label}
                  onChange={(v) => onItemChange({ ...item, label: v })}
                />
              </TwoCol>
            )}
            newItem={() => ({ value: "0", label: "New Stat" })}
          />
        </Card>

        {/* CONSTRUCTION UPDATES */}
        <Card title="Construction Updates">
          <Field
            label="Title"
            value={content.constructionUpdates.title}
            onChange={(v) =>
              setContent({
                ...content,
                constructionUpdates: { ...content.constructionUpdates, title: v },
              })
            }
          />

          <ListEditor
            label="Cards"
            items={content.constructionUpdates.cards}
            onChange={(cards) =>
              setContent({
                ...content,
                constructionUpdates: { ...content.constructionUpdates, cards },
              })
            }
            renderItem={(item, onItemChange) => (
              <TwoCol>
                <Field
                  label="Card Title"
                  value={item.title}
                  onChange={(v) => onItemChange({ ...item, title: v })}
                />
                <Field
                  label="Card Subtitle"
                  value={item.subtitle}
                  onChange={(v) => onItemChange({ ...item, subtitle: v })}
                />
              </TwoCol>
            )}
            newItem={() => ({ title: "New Update", subtitle: "View More" })}
          />
        </Card>

        {/* FAQ */}
        <Card title="FAQ">
          <Field
            label="Title"
            value={content.faq.title}
            onChange={(v) => setContent({ ...content, faq: { ...content.faq, title: v } })}
          />

          <ListEditor
            label="Questions"
            items={content.faq.items}
            onChange={(items) =>
              setContent({ ...content, faq: { ...content.faq, items } })
            }
            renderItem={(item, onItemChange) => (
              <div className="grid gap-3">
                <Field
                  label="Question"
                  value={item.question}
                  onChange={(v) => onItemChange({ ...item, question: v })}
                />
                <TextArea
                  label="Answer"
                  value={item.answer}
                  onChange={(v) => onItemChange({ ...item, answer: v })}
                />
              </div>
            )}
            newItem={() => ({ question: "New question?", answer: "New answer..." })}
          />
        </Card>

        {/* FOOTER */}
        <Card title="Footer">
          <Field
            label="Contact Title"
            value={content.footer.contactTitle}
            onChange={(v) =>
              setContent({ ...content, footer: { ...content.footer, contactTitle: v } })
            }
          />
          <TextArea
            label="Contact Line"
            value={content.footer.contactLine}
            onChange={(v) =>
              setContent({ ...content, footer: { ...content.footer, contactLine: v } })
            }
          />
          <Field
            label="Copyright"
            value={content.footer.copyright}
            onChange={(v) =>
              setContent({ ...content, footer: { ...content.footer, copyright: v } })
            }
          />
        </Card>
      </div>
    </div>
  );
}

/* ------------------ UI helpers ------------------ */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function CardMini({ title, children }) {
  return (
    <div className="rounded-xl border bg-gray-50 p-4">
      <div className="font-semibold text-sm mb-3">{title}</div>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

function TwoCol({ children }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
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

function TextArea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-700">{label}</label>
      <textarea
        className="mt-1 w-full border rounded-lg p-2 min-h-[110px]"
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
        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 rounded-lg bg-black text-white text-sm"
        >
          + Add
        </button>
      </div>

      <div className="mt-4 grid gap-4">
        {list.map((item, idx) => (
          <div key={idx} className="rounded-xl border p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-semibold">Item #{idx + 1}</div>
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="px-3 py-1.5 rounded-lg border text-sm hover:bg-white"
              >
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
