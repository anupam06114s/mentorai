import os
import logging
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")

logger = logging.getLogger("mentorpilot.db")

class Base(DeclarativeBase):
    pass

def init_engine():
    target_url = DATABASE_URL
    if target_url and target_url.startswith("postgresql"):
        try:
            # Test PostgreSQL connection with a 2-second timeout
            test_engine = create_engine(
                target_url,
                echo=False,
                connect_args={"connect_timeout": 2}
            )
            with test_engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            print("[DB] Connected to PostgreSQL database successfully.")
            return test_engine
        except Exception as err:
            print("[DB] PostgreSQL not reachable. Falling back to SQLite local database.")
            target_url = ""

    # SQLite fallback
    if os.getenv("VERCEL"):
        sqlite_url = "sqlite:////tmp/mentorpilot.db"
    else:
        db_file = Path(__file__).resolve().parent.parent / "mentorpilot.db"
        sqlite_url = f"sqlite:///{db_file}"
    sqlite_engine = create_engine(
        sqlite_url,
        echo=False,
        connect_args={"check_same_thread": False}
    )
    print(f"[DB] Using local SQLite database: {sqlite_url}")
    return sqlite_engine

engine = init_engine()

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

def test_database_connection():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        return result.scalar()

def create_tables():
    from . import models
    Base.metadata.create_all(bind=engine)