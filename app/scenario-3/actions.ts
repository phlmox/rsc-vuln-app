"use server";

import { getDocumentByIdInsecure } from "@/lib/db";

/**
 * ZAFİYETLİ Server Action: Sadece ID alıyor, "çağıran kullanıcı bu dökümana
 * yetkili mi?" kontrolü yapmıyor. Client tarafından herhangi bir ID ile
 * çağrılabilir (BOLA).
 *
 * React dokümantasyonu: Server Actions are exposed to the client — they can be
 * called from the client, so input validation and authorization must be done
 * inside the action, not assumed because "it runs on the server".
 */
export async function getDocumentByIdAction(docId: number) {
  const doc = getDocumentByIdInsecure(docId);
  return doc
    ? {
        id: doc.id,
        owner_id: doc.owner_id,
        title: doc.title,
        content: doc.content,
        secret_metadata: doc.secret_metadata,
      }
    : null;
}
