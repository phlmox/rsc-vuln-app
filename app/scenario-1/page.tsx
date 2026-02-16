import { getUserFull } from "@/lib/db";
import { UserDisplay } from "./UserDisplay";

/**
 * ZAFİYET: Veritabanından tüm sütunlar çekilip Client Component'e prop olarak
 * veriliyor. Arayüzde sadece name gösterilse bile, RSC Flight payload'ında
 * tüm obje serialize edilip istemciye gider. Network → Response'ta
 * password_hash, ssn, internal_notes vb. görülebilir.
 */
export default async function Scenario1Page() {
  const user = getUserFull(1);
  if (!user) return <p>Kullanıcı bulunamadı.</p>;

  return (
    <main>
      <h1>Senaryo 1: RSC Payload Veri Sızıntısı</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
        Veritabanından gelen tüm sütunlar Client Component'e prop verilirse,
        arayüzde sadece bir alan gösterilse bile RSC payload'ında hepsi
        serialize edilir ve response'ta görünür.
      </p>

      <UserDisplay user={user} />

      <div className="card">
        <h3>Nasıl kontrol edilir?</h3>
        <ol style={{ marginLeft: "1.25rem", marginTop: "0.5rem" }}>
          <li>Bu sayfayı aç, DevTools (F12) → Network sekmesine geç.</li>
          <li>Sayfayı yenile (F5), ilk document isteğine (bu sayfanın URL'si) tıkla.</li>
          <li>Response sekmesinde gövdeye bak; <code>password_hash</code>, <code>ssn</code>, <code>internal_notes</code>, <code>123-45-6789</code>, <code>VIP müşteri</code> gibi stringleri ara.</li>
          <li>RSC/Flight formatında serialize edilmiş veri bu response içinde düz metin olarak gelir.</li>
        </ol>
      </div>
    </main>
  );
}
