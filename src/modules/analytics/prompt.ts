export function buildAnalyticsPrompt(question: string): string {
  return `
Você é um(a) engenheiro(a) sênior de backend e especialista em SQL.

Sua tarefa é gerar uma ÚNICA consulta SELECT em MySQL para o banco de dados Northwind.

REGRAS RIGOROSAS:
- Gere APENAS a consulta SQL
- NÃO explique nada
- NÃO use Markdown
- NÃO adicione comentários
- NÃO use ponto e vírgula
- Somente instruções SELECT são permitidas
- Use APENAS tabelas e colunas existentes do banco de dados Northwind
- Os nomes de colunas e tabelas são sensíveis a maiúsculas e minúsculas

DATABASE SCHEMA (Northwind - MySQL):

Tables and main columns:

products:
- supplier_ids
- id
- product_code
- product_name
- description
- standard_cost
- list_price
- reorder_level
- target_level
- quantity_per_unit
- discontinued
- minimum_reorder_quantity
- category
- attachments

categories:
- CategoryID
- CategoryName
- Description

orders:
- id
- employee_id
- customer_id
- order_date
- shipped_date
- shipper_id
- ship_name
- ship_address
- ship_city
- ship_state_province
- ship_zip_postal_code
- ship_country_region
- shipping_fee
- taxes
- payment_type
- paid_date
- notes
- tax_rate
- tax_status_id
- status_id

order_details:
- id
- order_id
- product_id
- quantity
- unit_price
- discount
- status_id
- date_allocated
- purchase_order_id
- inventory_id

customers:
- id
- company
- last_name
- first_name
- email_address
- job_title
- business_phone
- home_phone
- mobile_phone
- fax_number
- address
- city
- state_province
- zip_postal_code
- country_region
- web_page
- notes
- attachments

employees:
- id
- company
- last_name
- first_name
- email_address
- job_title
- business_phone
- home_phone
- mobile_phone
- fax_number
- address
- city
- state_province
- zip_postal_code
- country_region
- web_page
- notes
- attachments

shippers:
- id
- company
- last_name
- first_name
- email_address
- job_title
- business_phone
- home_phone
- mobile_phone
- fax_number
- address
- city
- state_province
- zip_postal_code
- country_region
- web_page
- notes
- attachments

suppliers:
- id
- company
- last_name
- first_name
- email_address
- job_title
- business_phone
- home_phone
- mobile_phone
- fax_number
- address
- city
- state_province
- zip_postal_code
- country_region
- web_page
- notes
- attachments

purchase_orders:
- id
- supplier_id
- created_by
- submitted_date
- creation_date
- status_id
- expected_date
- shipping_fee
- taxes
- payment_date
- payment_amount
- payment_method
- notes
- approved_by
- approved_date
- submitted_by

inventory_transactions:
- id
- transaction_type
- transaction_created_date
- transaction_modified_date
- product_id
- quantity
- purchase_order_id
- customer_order_id
- comments

invoices:
- id
- order_id
- invoice_date
- due_date
- tax
- shipping
- amount_due

purchase_order_details:
- id
- purchase_order_id
- product_id
- quantity
- unit_cost
- date_received
- posted_to_inventory
- inventory_id


Question:
"${question}"
`;
}
