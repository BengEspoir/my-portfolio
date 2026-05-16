import json
import os

# --- Configuration ---
JSON_SOURCE = r'c:\Users\PC\Desktop\Porfolio\projects.json'
MIGRATION_FILE = r'c:\Users\PC\Desktop\Porfolio\supabase\migrations\0003_seed_all_projects.sql'
DASHBOARD_FILE = r'c:\Users\PC\Desktop\Porfolio\SUPABASE_RUN_IN_DASHBOARD.sql'

def format_sql_value(val, col=None):
    if val is None:
        return "NULL"
    if val == "UUID_AUTO":
        return "gen_random_uuid()"
    if val == "NOW":
        return "NOW()"
    if isinstance(val, list):
        if col == 'ux_flow':
            json_str = json.dumps(val).replace("'", "''")
            return f"'{json_str}'::jsonb"
            
        if not val:
            return "ARRAY[]::text[]"
        safe_items = []
        for i in val:
            safe_val = str(i).replace("'", "''")
            safe_items.append(f"'{safe_val}'")
        
        return f"ARRAY[{', '.join(safe_items)}]::text[]"

    if isinstance(val, bool):
        return "true" if val else "false"
    if isinstance(val, (int, float)):
        return str(val)
    
    # String handling
    escaped = str(val).replace("'", "''")
    return f"'{escaped}'"

def generate_sql():
    if not os.path.exists(JSON_SOURCE):
        print(f"Error: {JSON_SOURCE} not found.")
        return

    with open(JSON_SOURCE, 'r', encoding='utf-8') as f:
        projects = json.load(f)

    columns = [
        'id', 'title', 'slug', 'description', 'categories', 'status',
        'image_url', 'cta_type', 'cta_label', 'cta_link', 'prototype_url', 'prototype_embed',
        'preview_screens', 'project_background', 'problem_statement',
        'design_journey', 'challenges', 'solution', 'outcome',
        'ux_flow', 'tools_tech', 'apk_url', 'brand_color', 'live_url', 'published_at', 'sort_order'
    ]

    sql_header = f"-- Idempotent Seed Migration for {len(projects)} Portfolio Projects\n"
    sql_header += "-- Generated from projects.json\n\n"
    
    # Cleanup broken records first (optional but recommended for this specific migration)
    sql_header += "-- Cleanup projects with missing slugs to avoid duplicates during update\n"
    sql_header += "DELETE FROM public.projects WHERE slug = '' OR slug IS NULL;\n\n"
    
    sql_body = f"INSERT INTO public.projects (\n  {', '.join(columns)}\n) VALUES \n"
    
    value_blocks = []
    for p in projects:
        vals = []
        for col in columns:
            vals.append(format_sql_value(p.get(col), col))
        
        # Build block with commas BEFORE comments
        block_lines = []
        for i, (val, col) in enumerate(zip(vals, columns)):
            is_last = (i == len(columns) - 1)
            line = f"  {val}{'' if is_last else ','} -- {col}"
            block_lines.append(line)
        
        block = "(\n" + "\n".join(block_lines) + "\n)"
        value_blocks.append(block)

    sql_body += ",\n".join(value_blocks)
    
    # ADD ON CONFLICT
    sql_body += "\nON CONFLICT (slug) DO UPDATE SET\n"
    update_cols = [c for c in columns if c not in ['id', 'slug', 'created_at']]
    sql_body += ",\n".join([f"  {col} = EXCLUDED.{col}" for col in update_cols])
    sql_body += ";"

    final_sql = sql_header + sql_body

    # Write to Migration File
    with open(MIGRATION_FILE, 'w', encoding='utf-8') as f:
        f.write(final_sql)
    
    # Write to Dashboard File (Combined)
    # We might want to keep the table creation logic in the dashboard file if it's the only one they run
    with open(DASHBOARD_FILE, 'w', encoding='utf-8') as f:
        f.write(final_sql)

    print(f"Successfully generated idempotent SQL for {len(projects)} projects.")
    print(f"Updated: {MIGRATION_FILE}")
    print(f"Updated: {DASHBOARD_FILE}")

if __name__ == "__main__":
    generate_sql()