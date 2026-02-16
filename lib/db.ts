/**
 * Demo veritabanı - RSC güvenlik senaryoları için örnek veri.
 * Gerçek uygulamada bu veriler DB'den gelir; payload sızıntısı ve BOLA
 * aynı şekilde geçerli olur.
 */

export interface UserRow {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  ssn: string;
  credit_card_last4: string;
  internal_notes: string;
  role: string;
}

export interface DocumentRow {
  id: number;
  owner_id: number;
  title: string;
  content: string;
  secret_metadata: string;
}

const users: UserRow[] = [
  {
    id: 1,
    name: "Ali Yılmaz",
    email: "ali@example.com",
    password_hash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSm/jw4.Zv.Zv.Zv.Zv.Zv.Zv.Zv.Z",
    ssn: "123-45-6789",
    credit_card_last4: "4242",
    internal_notes: "VIP müşteri - özel indirim uygula",
    role: "vip",
  },
  {
    id: 2,
    name: "Ayşe Demir",
    email: "ayse@example.com",
    password_hash: "$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    ssn: "987-65-4321",
    credit_card_last4: "1111",
    internal_notes: "Şikayet geçmişi var",
    role: "user",
  },
];

const documents: DocumentRow[] = [
  { id: 101, owner_id: 1, title: "Ali'nin Gizli Notu", content: "Bu not sadece Ali'ye aittir.", secret_metadata: "confidential-1" },
  { id: 102, owner_id: 1, title: "Proje Planı", content: "Q1 hedefleri...", secret_metadata: "confidential-2" },
  { id: 201, owner_id: 2, title: "Ayşe'nin Günlüğü", content: "Kişisel notlar...", secret_metadata: "confidential-3" },
];

export function getUserById(id: number): UserRow | undefined {
  return users.find((u) => u.id === id);
}

/** Tüm sütunları döndürür - ZAFİYET: RSC payload'a hepsi gider (Senaryo 1) */
export function getUserFull(id: number): UserRow | undefined {
  return getUserById(id);
}

/** Sadece arayüzde gereken alanları döndürür - GÜVENLİ */
export function getUserSafe(id: number): Pick<UserRow, "id" | "name" | "email"> | undefined {
  const u = getUserById(id);
  if (!u) return undefined;
  return { id: u.id, name: u.name, email: u.email };
}

export function getDocumentById(id: number): DocumentRow | undefined {
  return documents.find((d) => d.id === id);
}

/** Yetki kontrolü OLMADAN döküman getirir - BOLA (Senaryo 2) */
export function getDocumentByIdInsecure(id: number): DocumentRow | undefined {
  return getDocumentById(id);
}

/** Yetki kontrolü ile - sadece sahibi görebilir */
export function getDocumentByIdSecure(id: number, currentUserId: number): DocumentRow | undefined {
  const doc = getDocumentById(id);
  if (!doc || doc.owner_id !== currentUserId) return undefined;
  return doc;
}
