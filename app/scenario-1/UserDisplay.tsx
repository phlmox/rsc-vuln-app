"use client";

import type { UserRow } from "@/lib/db";

/**
 * Client Component: Sadece name gösteriyor ama prop olarak TÜM user objesi
 * geliyor. Server'dan client'a geçen tüm props RSC payload'ında serialize
 * edilir — yani password_hash, ssn, internal_notes vb. response'ta görünür.
 */
export function UserDisplay({ user }: { user: UserRow }) {
  return (
    <div className="card vuln">
      <h3>Zafiyetli örnek – arayüzde sadece isim</h3>
      <p><strong>Gösterilen:</strong> {user.name}</p>
      <div className="warning">
        Bu bileşen sadece <code>user.name</code> render ediyor ama prop olarak
        tüm <code>user</code> objesi (password_hash, ssn, credit_card_last4,
        internal_notes, role…) gönderildi. DevTools → Network → sayfa isteği →
        Response gövdesinde bu stringleri ara; RSC payload içinde düz metin
        olarak geçiyor.
      </div>
    </div>
  );
}
