import { LeakyClientPanel } from "./LeakyClientPanel";
import { SafeServerPanel } from "./SafeServerPanel";

export default function Scenario4Page() {
  return (
    <main>
      <h1>Senaryo 4: &quot;use client&quot; ile API Key Sızıntısı</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
        Client ve server sınırı bulanıklaşınca, geliştirici bir bileşeni client
        yapmak için &quot;use client&quot; ekleyebilir. Eğer o sayfada/ bileşende
        API key getiren bir fonksiyon (getEnv) kullanılıyorsa, bu anahtar build
        sırasında JS chunk&apos;larına gömülüp tarayıcıya teslim edilir.
      </p>

      <LeakyClientPanel />
      <SafeServerPanel />

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Nasıl doğrulanır?</h3>
        <ol style={{ marginLeft: "1.25rem", marginTop: "0.5rem" }}>
          <li><code>npm run build</code> çalıştır.</li>
          <li><code>.next/static/chunks/</code> altındaki .js dosyalarında &quot;sk-demo-leak&quot;
              veya &quot;sk_live_demo&quot; ara; zafiyetli bileşenin kullandığı
              key bu chunk&apos;larda yer alır.</li>
          <li>Güvenli tarafta getEnvServer &quot;server-only&quot; ile korunduğu için
              client bundle&apos;da bulunmaz.</li>
        </ol>
      </div>
    </main>
  );
}
