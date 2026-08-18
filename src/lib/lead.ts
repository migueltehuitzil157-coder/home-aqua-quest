export type Lead = {
  homeOwnership: string;
  waterSymptoms: string[];
  visitTiming: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  zip: string;
  source: string;
  submittedAt: string;
};

/**
 * Integration point for GoHighLevel (or any CRM webhook).
 * Set VITE_LEAD_WEBHOOK_URL later and the lead payload is posted as-is.
 */
export async function submitLead(lead: Lead): Promise<void> {
  const webhook = import.meta.env["VITE_LEAD_WEBHOOK_URL"] as string | undefined;

  if (!webhook) {
    console.info("[lead] captured (no webhook configured yet)", lead);
    return;
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    throw new Error(`Lead webhook failed [${res.status}]: ${await res.text()}`);
  }
}

export const PHONE_DISPLAY = "+1 908-201-8655";
export const PHONE_HREF = "tel:+19082018655";