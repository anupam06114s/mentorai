import sqlite3
from pathlib import Path

db_path = Path(__file__).resolve().parent / "mentorpilot.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(users)")
existing_cols = {row[1] for row in cursor.fetchall()}

new_cols = [
    ("phone", "TEXT DEFAULT ''"),
    ("avatar_url", "TEXT DEFAULT ''"),
    ("education", "TEXT DEFAULT ''"),
    ("college", "TEXT DEFAULT ''"),
    ("degree", "TEXT DEFAULT ''"),
    ("career_interests", "TEXT DEFAULT ''"),
    ("target_role", "TEXT DEFAULT 'Full Stack Developer'"),
    ("created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
]

for col_name, col_type in new_cols:
    if col_name not in existing_cols:
        cursor.execute(f"ALTER TABLE users ADD COLUMN {col_name} {col_type}")
        print(f"Added column {col_name}")

conn.commit()
cursor.execute("PRAGMA table_info(users)")
print("Updated columns:", [row[1] for row in cursor.fetchall()])
conn.close()
