"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()
import os
DB_URL = DB_URL = os.getenv("DB_URL")
engine = create_engine(DB_URL,echo=True)
SessionLocal = sessionmaker(autocommit=False,autoflush=False, bind=engine)

Base = declarative_base()
"""
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Path to store DB in Documents/MyApp
db_folder = os.path.join(os.environ["USERPROFILE"], "Documents", "MyApp")
os.makedirs(db_folder, exist_ok=True)  # Create folder if it doesn't exist

# Full path to SQLite file
db_path = os.path.join(db_folder, "mydb.sqlite")

# SQLite URL format
DATABASE_URL = f"sqlite:///{db_path}"

# Create SQLite engine
# `check_same_thread=False` is needed for SQLite in FastAPI when using multiple threads
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}, echo=True
)

# Session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
"""
import os
import platform
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Detect platform and choose DB folder
system_name = platform.system().lower()

if "windows" in system_name:
    # Windows → store in Documents/MyApp
    home_dir = os.environ.get("USERPROFILE", os.path.expanduser("~"))
    db_folder = os.path.join(home_dir, "Documents", "MyApp")

elif "linux" in system_name or "android" in system_name:
    # Linux / Android → store in ~/MyApp
    # (Termux home dir is usually /data/data/com.termux/files/home)
    home_dir = os.path.expanduser("~")
    db_folder = os.path.join(home_dir, "MyApp")

elif "darwin" in system_name:  # macOS
    home_dir = os.path.expanduser("~")
    db_folder = os.path.join(home_dir, "Documents", "MyApp")

else:
    # Fallback → just use current directory
    db_folder = os.path.join(os.getcwd(), "MyApp")

# Ensure the folder exists
os.makedirs(db_folder, exist_ok=True)

# Path to SQLite database file
db_path = os.path.join(db_folder, "mydb.sqlite")

# SQLAlchemy connection string for SQLite
DATABASE_URL = f"sqlite:///{db_path}"

# Create database engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # Needed for SQLite multithreading
    echo=True  # Log SQL queries
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
