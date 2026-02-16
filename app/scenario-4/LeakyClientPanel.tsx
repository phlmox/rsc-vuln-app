"use client";

/**
 * ZAFİYET: Bu bileşen "use client" ile client tarafında çalışıyor.
 * getEnv() sunucu için yazılmış bir fonksiyon olmasına rağmen burada
 * import ediliyor. Derleme sırasında getEnv'in döndürdüğü değerler
 * (veya kullanılan sabitler) client JS chunk'larına gömülür.
 * Tarayıcıda "Kaynağı Görüntüle" veya DevTools → Sources ile
 * chunk dosyalarında "sk-demo-leak" vb. aranırsa API key bulunabilir.
 */
import { getEnv } from "@/lib/env";

export function LeakyClientPanel() {
  const env = getEnv();
  return (
    <div className="card vuln">
      <h3>Zafiyetli: &quot;use client&quot; + getEnv()</h3>
      <p className="label">Bu bileşen client component; getEnv burada çağrılıyor.</p>
      <p>
        <strong>API_KEY (sızdı):</strong> <code>{env.API_KEY}</code>
      </p>
      <div className="warning">
        Bu sayfa build edildiğinde (npm run build), .next/static/chunks içindeki
        JS dosyalarında bu string aranabilir. API key client bundle ile
        tarayıcıya teslim edilir.
      </div>
    </div>
  );
}
