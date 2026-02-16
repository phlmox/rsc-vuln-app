/**
 * Sunucu tarafında kullanılması gereken ortam değişkeni/API key okuma.
 * Bu dosya "server-only" ile işaretlenmediği için yanlışlıkla "use client"
 * bileşeninden import edilirse, değerler client bundle'a girer ve sızıntı olur.
 */

export function getEnv() {
  return {
    API_KEY: process.env.SECRET_API_KEY ?? "sk-demo-leak-if-in-client-bundle-12345",
    STRIPE_SECRET: process.env.STRIPE_SECRET ?? "sk_live_demo_stripe_key_never_use_in_client",
  };
}
