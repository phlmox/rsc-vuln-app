"use client";

import { useState } from "react";
import { getDocumentByIdAction } from "./actions";

/**
 * Senaryo 3: Server Action'ların client'tan çağrılabilir bir route'u vardır.
 * Geliştirici bunu unutup action içinde yetki/veri kontrolü yapmazsa,
 * herhangi bir client herhangi bir ID ile action'ı tetikleyebilir (BOLA).
 *
 * Bu sayfa "use client" ile client component; form submit'te server action
 * çağrılıyor. Action içinde sadece ID ile döküman çekiliyor, "kim çağırdı?"
 * kontrolü yok.
 */
export default function Scenario3Page() {
  const [docId, setDocId] = useState("101");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await getDocumentByIdAction(parseInt(docId, 10));
      setResult(data ? JSON.stringify(data, null, 2) : "Döküman bulunamadı veya erişim yok.");
    } catch (err) {
      setResult("Hata: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Senaryo 3: Server Action Yetkisiz Kullanım</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
        Server Function&apos;lar client tarafından çağrılabilir; route&apos;u bulunur.
        React dokümantasyonu bu yüzden action içinde yetki ve girdi doğrulaması
        yapılması gerektiğini vurgular. Burada action sadece ID alıp döküman
        döndürüyor — &quot;çağıran kullanıcı bu dökümana yetkili mi?&quot; kontrolü yok.
      </p>

      <div className="card vuln">
        <h3>Zafiyetli: ID gir, döküman getir (yetkisiz)</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: "0.75rem" }}>
          <input
            type="number"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            placeholder="Döküman ID"
            min={101}
            max={999}
          />
          <button type="submit" disabled={loading}>
            {loading ? "..." : "Getir"}
          </button>
        </form>
        <div className="warning" style={{ marginTop: "1rem" }}>
          id=101, 102 (Ali), 201 (Ayşe) deneyebilirsin. Sunucu &quot;şu an kim
          giriş yapmış?&quot; sormadan dökümanı döndürüyor; bu BOLA örneği.
        </div>
        {result && (
          <pre style={{ marginTop: "1rem", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {result}
          </pre>
        )}
      </div>

      <div className="card">
        <h3>Neden tehlikeli?</h3>
        <p>
          Server Action, client bundle&apos;dan tetiklenir ve Next.js bu çağrıyı
          sunucuya bir istek olarak gönderir. Eğer action içinde session/cookie
          ile &quot;current user&quot; doğrulanmaz ve nesne seviyesinde yetki
          (bu döküman bu kullanıcıya mı ait?) kontrol edilmezse, herkes her ID
          ile action&apos;ı çağırabilir.
        </p>
      </div>
    </main>
  );
}
