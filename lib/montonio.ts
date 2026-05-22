import jwt from "jsonwebtoken"

const ACCESS_KEY = process.env.MONTONIO_ACCESS_KEY!
const SECRET_KEY = process.env.MONTONIO_SECRET_KEY!
const IS_SANDBOX = process.env.MONTONIO_SANDBOX === "true"

const API_URL = IS_SANDBOX
  ? "https://sandbox-stargate.montonio.com/api/orders"
  : "https://stargate.montonio.com/api/orders"

export type MontonioOrderResponse = {
  paymentUrl: string
  uuid: string
}

export async function createMontonioOrder({
  listingId,
  amount,
  merchantReference,
  returnUrl,
  notificationUrl,
  locale = "en",
}: {
  listingId: string
  amount: number
  merchantReference: string
  returnUrl: string
  notificationUrl: string
  locale?: string
}): Promise<MontonioOrderResponse> {
  const isLocal = notificationUrl.includes("localhost") || notificationUrl.includes("127.0.0.1")
  const resolvedNotificationUrl = isLocal
    ? (process.env.APP_URL ? `${process.env.APP_URL}/api/market/pay/callback` : "https://racesin.com/api/market/pay/callback")
    : notificationUrl

  const payload = {
    accessKey: ACCESS_KEY,
    merchantReference,
    returnUrl,
    notificationUrl: resolvedNotificationUrl,
    grandTotal: amount,
    currency: "EUR",
    locale,
    payment: {
      method: "paymentInitiation",
      amount,
      currency: "EUR",
    },
    merchantData: JSON.stringify({ listing_id: listingId }),
    exp: Math.floor(Date.now() / 1000) + 60 * 10,
  }

  const token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256" })

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: token }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Montonio error: ${text}`)
  }

  return res.json()
}

export function verifyMontonioToken(token: string): Record<string, unknown> {
  return jwt.verify(token, SECRET_KEY) as Record<string, unknown>
}
