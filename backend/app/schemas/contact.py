
from datetime import datetime
from typing import Literal

from pydantic import (
    BaseModel, EmailStr, Field,
    ConfigDict, field_validator
)


class ContactCreate(BaseModel):

    model_config = ConfigDict(str_strip_whitespace=True)

    full_name: str = Field(min_length=1, max_length=150)
    email: EmailStr
    phone: str | None = None

    company: str | None = Field(default=None, max_length=200)

    subject: Literal["General", "Sales", "Support", "Partnership"]

    message: str = Field(min_length=10, max_length=1000)
    consent: bool

    @field_validator("full_name")
    @classmethod
    def validate_name(cls, value):
        if not any(char.isalpha() for char in value):
            raise ValueError("Please enter a valid name.")
        return value
    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):
        if value is None or value == "":
            return None

        if len(value) != 10 or not value.isascii() or not value.isdigit():
            raise ValueError("Phone number must contain exactly 10 digits.")

        return value

    @field_validator("consent")
    @classmethod
    def validate_consent(cls, value):
        if not value:
            raise ValueError("Consent is required.")
        return value

    @field_validator("message")
    @classmethod
    def validate_message(cls, value):
        if sum(char.isalnum() for char in value) < 5:
            raise ValueError("Please enter a meaningful message.")
        return value


class ContactResponse(BaseModel):

    id: int
    message: str
    created_at: datetime
