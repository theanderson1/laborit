const FORBIDDEN_KEYWORDS = [
  "INSERT",
  "UPDATE",
  "DELETE",
  "DROP",
  "TRUNCATE",
  "ALTER",
  "CREATE",
  "REPLACE",
];

const ALLOWED_TABLES = [
  "products",
  "categories",
  "orders",
  "order_details",
  "customers",
  "employees",
  "shippers",
  "suppliers",
  "purchase_orders",
  "inventory_transactions",
  "invoices",
  "purchase_order_details",
];

export function validateSQL(sql: string): void {
  const normalized = sql.trim().toUpperCase();

  if (!normalized.startsWith("SELECT")) {
    throw new Error("Only SELECT statements are allowed");
  }

  for (const keyword of FORBIDDEN_KEYWORDS) {
    if (normalized.includes(keyword)) {
      throw new Error(`Forbidden SQL keyword detected: ${keyword}`);
    }
  }

  const tableRegex = /FROM\s+([a-zA-Z_]+)/gi;
  let match;

  while ((match = tableRegex.exec(sql)) !== null) {
    const table = match[1].toLowerCase();

    if (!ALLOWED_TABLES.includes(table)) {
      throw new Error(`Table not allowed: ${table}`);
    }
  }

 
}
