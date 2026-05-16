import re
import json

def extract_sql_to_json(sql_file, output_json):
    with open(sql_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the entire VALUES block
    # Note: This is a simplified parser for this specific file structure
    values_match = re.search(r'INSERT INTO public\.projects \(.*?\) VALUES\s*\((.*?)\);', content, re.DOTALL)
    if not values_match:
        print("Could not find VALUES block")
        return

    values_str = values_match.group(1)
    
    # Split by '), (' but be careful about strings containing '), ('
    # Actually, the file uses a very consistent format:
    # (
    #   gen_random_uuid(), -- id
    #   'Title', -- title
    #   ...
    # ),
    
    projects = []
    # Find blocks between ( and )
    blocks = re.findall(r'\((.*?)\),?\n(?=\(|$)', values_str, re.DOTALL)
    
    # Define columns in order
    columns = [
        'id', 'title', 'slug', 'description', 'categories', 'status',
        'image_url', 'cta_type', 'cta_label', 'cta_link', 'prototype_url', 'prototype_embed',
        'preview_screens', 'project_background', 'problem_statement',
        'design_journey', 'challenges', 'solution', 'outcome',
        'ux_flow', 'tools_tech', 'apk_url', 'brand_color', 'live_url', 'published_at', 'sort_order'
    ]

    for block in blocks:
        # Split by comma but ignore commas inside single quotes or ARRAY[...]
        # This is tricky with regex, so we'll do a simple line-by-line split since the file is well-formatted
        lines = [line.strip() for line in block.split('\n') if line.strip()]
        
        project = {}
        for i, line in enumerate(lines):
            if i >= len(columns): break
            
            # Remove trailing comma and comments
            clean_val = re.sub(r',?\s*--.*$', '', line).strip()
            
            # Handle types
            if clean_val == 'NULL':
                val = None
            elif clean_val == 'gen_random_uuid()':
                val = "UUID_AUTO"
            elif clean_val == 'NOW()':
                val = "NOW"
            elif clean_val.startswith("ARRAY["):
                # Extract items: ARRAY['item1', 'item2'] -> ['item1', 'item2']
                items = re.findall(r"'(.*?)'", clean_val)
                val = items
            elif clean_val.startswith("'") and clean_val.endswith("'"):
                val = clean_val[1:-1].replace("''", "'") # Unescape quotes
            else:
                # Numbers or other literals
                try:
                    val = int(clean_val)
                except:
                    val = clean_val
            
            project[columns[i]] = val
        projects.append(project)

    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)
    
    print(f"Successfully extracted {len(projects)} projects to {output_json}")

if __name__ == "__main__":
    extract_sql_to_json(
        r'c:\Users\PC\Desktop\Porfolio\supabase\migrations\0003_seed_all_projects.sql',
        r'c:\Users\PC\Desktop\Porfolio\projects.json'
    )
