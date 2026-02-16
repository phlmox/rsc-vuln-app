export default function Home() {
  return (
    <main>
      <h1 style={{ marginBottom: "1rem" }}>RSC Güvenlik Zafiyetleri Demo</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "2rem" }}>
        Bu uygulama, React Server Components (RSC) ile geliştirme yaparken karşılaşılabilecek
        dört güvenlik senaryosunu gösterir. Her senaryoda zafiyetli ve güvenli yaklaşım açıklanır.
      </p>

      <div className="card vuln">
        <h2>Senaryo 1: RSC Payload Veri Sızıntısı</h2>
        <p>
          Veritabanından tüm sütunlar çekilip RSC payload (Flight protokolü) ile gönderilirse,
          arayüzde sadece isim gösterilse bile kaynakta (RSC payload) tüm veri görülebilir.
        </p>
        <a href="/scenario-1">Senaryo 1 sayfasına git →</a>
      </div>

      <div className="card vuln">
        <h2>Senaryo 2: BOLA (Broken Object Level Authorization)</h2>
        <p>
          RSC sunucuda çalıştığına güvenilip yetki kontrolü atlanırsa, kullanıcı başkasının
          dökümanına ID ile erişebilir.
        </p>
        <a href="/scenario-2">Senaryo 2 sayfasına git →</a>
      </div>

      <div className="card vuln">
        <h2>Senaryo 3: Server Action Yetkisiz Kullanım</h2>
        <p>
          Server Function&apos;ların client tarafından çağrılabilir bir route&apos;a sahip olduğu
          unutulup veri/yetki kontrolü yapılmazsa zafiyet oluşur.
        </p>
        <a href="/scenario-3">Senaryo 3 sayfasına git →</a>
      </div>

      <div className="card vuln">
        <h2>Senaryo 4: &quot;use client&quot; ile API Key Sızıntısı</h2>
        <p>
          &quot;use client&quot; eklenen bileşende getEnv() gibi API key getiren kod kullanılırsa,
          anahtar JS chunk&apos;ları ile tarayıcıya gider ve sızıntı olur.
        </p>
        <a href="/scenario-4">Senaryo 4 sayfasına git →</a>
      </div>
    </main>
  );
}
