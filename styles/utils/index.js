export async function storefront(query, variables = {}) {
  const response = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (!response.ok) {
    console.error("Shopify API error:", json);
    throw new Error(`Shopify Storefront API returned ${response.status}`);
  }

  if (!json.data) {
    console.error("Shopify API returned no data:", json);
    throw new Error("No data field in Shopify response");
  }

  return json;
}
