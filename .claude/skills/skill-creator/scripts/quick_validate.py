#!/usr/bin/env python3
"""
Quick validation script for skills - minimal version
"""

import sys
import os
import re
from pathlib import Path

def validate_skill(skill_path):
    """Basic validation of a skill"""
    skill_path = Path(skill_path)
    warnings = []

    # Check SKILL.md exists
    skill_md = skill_path / 'SKILL.md'
    if not skill_md.exists():
        return False, "SKILL.md not found", []

    # Read and validate frontmatter
    content = skill_md.read_text()
    if not content.startswith('---'):
        return False, "No YAML frontmatter found", []

    # Extract frontmatter
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return False, "Invalid frontmatter format", []

    frontmatter = match.group(1)

    # Check required fields
    if 'name:' not in frontmatter:
        return False, "Missing 'name' in frontmatter", []
    if 'description:' not in frontmatter:
        return False, "Missing 'description' in frontmatter", []

    # Extract name for validation
    name_match = re.search(r'name:\s*(.+)', frontmatter)
    if name_match:
        name = name_match.group(1).strip()
        # Check naming convention (hyphen-case: lowercase with hyphens)
        if not re.match(r'^[a-z0-9-]+$', name):
            return False, f"Name '{name}' should be hyphen-case (lowercase letters, digits, and hyphens only)", []
        if name.startswith('-') or name.endswith('-') or '--' in name:
            return False, f"Name '{name}' cannot start/end with hyphen or contain consecutive hyphens", []
        # Check max length
        if len(name) > 64:
            return False, f"Name '{name}' exceeds 64 character limit ({len(name)} chars)", []
        # Check reserved words
        reserved_words = ['anthropic', 'claude']
        for word in reserved_words:
            if word in name:
                return False, f"Name '{name}' contains reserved word '{word}'", []

    # Extract and validate description
    desc_match = re.search(r'description:\s*(.+)', frontmatter)
    if desc_match:
        description = desc_match.group(1).strip()
        # Check for angle brackets (XML tags)
        if '<' in description or '>' in description:
            return False, "Description cannot contain angle brackets (< or >)", []
        # Check max length
        if len(description) > 1024:
            return False, f"Description exceeds 1024 character limit ({len(description)} chars)", []

    # Check SKILL.md line count
    line_count = len(content.splitlines())
    if line_count > 500:
        warnings.append(f"SKILL.md is {line_count} lines (recommended max: 500). Consider splitting into references.")

    return True, "Skill is valid!", warnings

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python quick_validate.py <skill_directory>")
        sys.exit(1)

    valid, message, warnings = validate_skill(sys.argv[1])
    print(message)
    for warning in warnings:
        print(f"WARNING: {warning}")
    sys.exit(0 if valid else 1)