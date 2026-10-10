-- Shiveshwar Textiles: wholesale inquiries (Cloudflare D1 / SQLite)
CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    country TEXT,
    subject TEXT,
    vat_number TEXT,
    source TEXT,
    message TEXT NOT NULL,
    selected_products TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries (email);
