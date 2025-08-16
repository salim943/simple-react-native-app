from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from sklearn.linear_model import LinearRegression
import numpy as np

router = APIRouter()

# ---------------- database.py ----------------
import os
import platform
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Detect platform and choose DB folder
system_name = platform.system().lower()

if "windows" in system_name:
    home_dir = os.environ.get("USERPROFILE", os.path.expanduser("~"))
    db_folder = os.path.join(home_dir, "Documents", "MyApp")

elif "linux" in system_name or "android" in system_name:
    home_dir = os.path.expanduser("~")
    db_folder = os.path.join(home_dir, "MyApp")

elif "darwin" in system_name:  # macOS
    home_dir = os.path.expanduser("~")
    db_folder = os.path.join(home_dir, "Documents", "MyApp")

else:
    db_folder = os.path.join(os.getcwd(), "MyApp")

os.makedirs(db_folder, exist_ok=True)

db_path = os.path.join(db_folder, "mydb.sqlite")
DATABASE_URL = f"sqlite:///{db_path}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ---------------- models.py ----------------
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class UserDB(Base):
    __tablename__ = "users0"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(String(10), index=True)
    date = Column(String(20), unique=True, index=True)
    amount = Column(Float, nullable=True)
    is_active = Column(Boolean, default=True)

    todo = relationship("Todo", back_populates="owner", uselist=False)


class Todo(Base):
    __tablename__ = "todos0"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True)
    description = Column(String(500), index=True)
    owner_id = Column(Integer, ForeignKey("users0.id"), unique=True)

    owner = relationship("UserDB", back_populates="todo")

# ---------------- schemas.py ----------------
from pydantic import BaseModel
from typing import Optional

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None

class TodoCreate(TodoBase):
    pass

class TodoOut(TodoBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    day: str
    date: str
    amount: Optional[float] = None 

class UserCreate(UserBase):
    pass

class UserOut(UserBase):
    id: int
    is_active: bool
    todo: Optional[TodoOut] = None

    class Config:
        orm_mode = True

# ---------------- crud.py ----------------
def create_user_db(db: Session, user: UserCreate):
    db_user = UserDB(day=user.day, date=user.date, amount=user.amount)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_todo_db(db: Session, user_id: int, todo: TodoCreate):
    existing_todo = db.query(Todo).filter(Todo.owner_id == user_id).first()
    if existing_todo:
        return None
    
    db_todo = Todo(**todo.dict(), owner_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_users_from_db(db: Session):
    return db.query(UserDB).all()

# ---------------- FastAPI ----------------
app = FastAPI()
app.include_router(router)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user_db(db, user)

@router.post("/users/{user_id}/todos/", response_model=TodoOut)
def create_todo(user_id: int, todo: TodoCreate, db: Session = Depends(get_db)):
    created_todo = create_todo_db(db, user_id, todo)
    if not created_todo:
        raise HTTPException(status_code=400, detail="User already has a todo")
    return created_todo

@router.get("/users/", response_model=list[UserOut])
def get_users(db: Session = Depends(get_db)):
    return get_users_from_db(db)

@router.get("/predict-next-month-expense")
def predict_expense():
    months = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)
    expenses = np.array([3000, 3200, 3500, 3700, 4000])

    model = LinearRegression()
    model.fit(months, expenses)

    next_month = 6
    predicted_expense = model.predict([[next_month]])[0]

    return {
        "month": next_month,
        "predicted_expense": round(float(predicted_expense), 2)
    }
