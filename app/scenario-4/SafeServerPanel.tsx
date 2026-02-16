import { getEnvServer } from "@/lib/env.server";

/**
 * GÜVENLİ: Bu bileşen Server Component (use client yok). getEnvServer
 * "server-only" kullandığı için yalnızca sunucuda çalışır; API key
 * RSC payload'ında sadece gösterim için gönderilirse yine risk olabilir,
 * bu örnekte sadece "only-on-server" placeholder gösteriyoruz.
 * Gerçek uygulamada hassas değerleri hiç client'a göndermemelisiniz.
 */
export function SafeServerPanel() {
  const env = getEnvServer();
  return (
    <div className="card safe">
      <h3>Güvenli: Server Component + server-only</h3>
      <p className="label">getEnvServer sadece sunucuda import edilebilir.</p>
      <p>
        <strong>Placeholder (gerçek key asla gösterilmez):</strong>{" "}
        <code>{env.API_KEY}</code>
      </p>
      <div className="info">
        Hassas konfigürasyonu sadece server-only modülde tutun; client
        bileşenlerinde asla import etmeyin.
      </div>
    </div>
  );
}
