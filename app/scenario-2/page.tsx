import Link from "next/link";
import { getDocumentByIdInsecure, getDocumentByIdSecure } from "@/lib/db";

/**
 * ZAFİYETLİ: Döküman ID'ye göre getiriliyor, "bu döküman şu anki kullanıcıya mı ait?"
 * kontrolü YAPILMIYOR. Saldırgan URL'de id=201 yazarak Ayşe'nin dökümanını
 * (owner_id=2) görebilir. Örnek: /scenario-2?id=201
 */
async function InsecureDocument({ docId }: { docId: number }) {
  const doc = getDocumentByIdInsecure(docId);
  if (!doc)
    return (
      <div className="card vuln">
        <p>Bu ID ile döküman bulunamadı.</p>
      </div>
    );
  return (
    <div className="card vuln">
      <h3>Zafiyetli: Yetki kontrolü yok (BOLA)</h3>
      <p><strong>Başlık:</strong> {doc.title}</p>
      <p><strong>İçerik:</strong> {doc.content}</p>
      <p className="label">owner_id: {doc.owner_id} | secret_metadata: {doc.secret_metadata}</p>
      <div className="warning">
        Bu sayfa &quot;giriş yapmış kullanıcı&quot; simülasyonu yapmıyor; sadece ID ile
        çekiyor. Gerçek uygulamada oturum açmış kullanıcı ID&apos;si ile doc.owner_id
        karşılaştırılmadığı için başkasının dökümanı okunabiliyor.
      </div>
    </div>
  );
}

/**
 * GÜVENLİ: getDocumentByIdSecure(docId, currentUserId) kullanılıyor.
 * Döküman sadece sahibine döner.
 */
async function SecureDocument({ docId, currentUserId }: { docId: number; currentUserId: number }) {
  const doc = getDocumentByIdSecure(docId, currentUserId);
  if (!doc)
    return (
      <div className="card safe">
        <p>Bu dökümana erişim yetkiniz yok veya döküman yok.</p>
      </div>
    );
  return (
    <div className="card safe">
      <h3>Güvenli: Yetki kontrolü var</h3>
      <p><strong>Başlık:</strong> {doc.title}</p>
      <p><strong>İçerik:</strong> {doc.content}</p>
      <div className="info">
        Sadece owner_id === currentUserId ise döküman dönüyor; başkasının ID&apos;si
        ile erişilemez.
      </div>
    </div>
  );
}

export default async function Scenario2Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const rawId = searchParams.id;
  const docId = rawId ? parseInt(rawId, 10) : 101;
  const validId = Number.isNaN(docId) ? 101 : docId;

  return (
    <main>
      <h1>Senaryo 2: BOLA (Broken Object Level Authorization)</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
        RSC sunucuda çalışıyor diye yetki kontrolü atlanırsa, verilen ID üzerinden
        başkasının verisine erişim mümkün olur.
      </p>

      <div className="card">
        <p className="label">URL ile döküman ID&apos;si değiştirilebilir (örn. ?id=201)</p>
        <p>
          <Link href="/scenario-2?id=101">id=101</Link> (Ali) ·{" "}
          <Link href="/scenario-2?id=102">id=102</Link> (Ali) ·{" "}
          <Link href="/scenario-2?id=201">id=201</Link> (Ayşe)
        </p>
      </div>

      <InsecureDocument docId={validId} />

      <p style={{ marginTop: "1rem" }}>Aynı ID ile güvenli versiyon (currentUserId=1, yani Ali):</p>
      <SecureDocument docId={validId} currentUserId={1} />

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h3>Özet</h3>
        <p>
          Zafiyetli tarafta id=201 yaparsan Ayşe&apos;nin dökümanı görünür; sunucu
          &quot;bu istek Ali&apos;ye mi ait?&quot; diye sormuyor. Güvenli tarafta
          currentUserId=1 ile id=201 sorgulandığında &quot;erişim yetkiniz yok&quot;
          döner.
        </p>
      </div>
    </main>
  );
}
