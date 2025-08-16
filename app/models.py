from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users0"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(String(10), index=True)  # Adjust the length as needed
    date = Column(String(20), unique=True, index=True)  # Adjust as needed
    amount = Column(Float, nullable=True)
    is_active = Column(Boolean, default=True)

    todo = relationship("Todo", back_populates="owner", uselist=False)

class Todo(Base):
    __tablename__ = "todos0"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True)  # Adjust as needed
    description = Column(String(500), index=True)  # Adjust as needed
    owner_id = Column(Integer, ForeignKey("users0.id"), unique=True)

    owner = relationship("User", back_populates="todo")
