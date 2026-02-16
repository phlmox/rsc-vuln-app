import "server-only";

/**
 * GÜVENLİ: "server-only" paketi sayesinde bu modül yalnızca sunucu ortamında
 * import edilebilir. Client bileşeni buradan import etmeye çalışırsa build
 * hatası alır.
 */
export function getEnvServer() {
  return {
    API_KEY: process.env.SECRET_API_KEY ?? "only-on-server",
    STRIPE_SECRET: process.env.STRIPE_SECRET ?? "only-on-server",
  };
}
