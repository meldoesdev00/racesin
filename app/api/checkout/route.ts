import { NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify"

const CHECKOUT_CREATE = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`

export async function POST(req: Request) {
  const { lineItems } = await req.json()

  const data = await shopifyFetch({
    query: CHECKOUT_CREATE,
    variables: {
      input: {
        lineItems: lineItems.map((item: { variantId: string; quantity: number }) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
    },
  })

  const checkout = data?.checkoutCreate?.checkout
  const errors = data?.checkoutCreate?.checkoutUserErrors

  if (errors?.length) {
    return NextResponse.json({ error: errors[0].message }, { status: 400 })
  }

  if (!checkout?.webUrl) {
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
  }

  return NextResponse.json({ checkoutUrl: checkout.webUrl })
}
