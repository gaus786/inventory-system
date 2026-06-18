from pydantic import BaseModel, EmailStr, field_validator
from typing import List, Optional
from datetime import datetime


# ---- PRODUCT ----
class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    quantity: int

    @field_validator("quantity")
    def quantity_non_negative(cls, v):
        if v < 0:
            raise ValueError("Quantity cannot be negative")
        return v

    @field_validator("price")
    def price_positive(cls, v):
        if v <= 0:
            raise ValueError("Price must be positive")
        return v

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    sku: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None

class ProductOut(BaseModel):
    id: int
    name: str
    sku: str
    price: float
    quantity: int
    created_at: datetime

    class Config:
        from_attributes = True


# ---- CUSTOMER ----
class CustomerCreate(BaseModel):
    full_name: str
    email: str
    phone: str

class CustomerOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---- ORDER ----
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]

class OrderItemOut(BaseModel):
    product_id: int
    quantity: int
    unit_price: float

    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    status: str
    created_at: datetime
    items: List[OrderItemOut] = []

    class Config:
        from_attributes = True