import { NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify"

const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function POST(req: Request) {
  const { lineItems } = await req.json()

  const data = await shopifyFetch({
    query: CART_CREATE,
    variables: {
      input: {
        lines: lineItems.map((item: { variantId: string; quantity: number }) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        })),
      },
    },
  })

  const cart = data?.cartCreate?.cart
  const errors = data?.cartCreate?.userErrors

  if (errors?.length) {
    return NextResponse.json({ error: errors[0].message }, { status: 400 })
  }

  if (!cart?.checkoutUrl) {
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
  }

  return NextResponse.json({ checkoutUrl: cart.checkoutUrl })
}
