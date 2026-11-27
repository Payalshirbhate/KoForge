
from datetime import datetime
from typing import Literal

from pydantic import (
    BaseModel, EmailStr, Field,
    ConfigDict, field_validator
)
import re

class ConsultationCreate(BaseModel):

    model_config = ConfigDict(str_strip_whitespace=True)

    # Service and Industry
    required_service: Literal[
        "Conveyor Management Systems",
        "Conveyor Automation",
        "Industrial Software Solutions",
        "System Integration",
        "Monitoring and Maintenance Solutions",
        "Custom Engineering Solutions",
        "Not sure"
    ]

    industry_type: Literal[
        "Manufacturing & Assembly",
        "Warehousing & Logistics",
        "Mining & Minerals",
        "Food & Beverage Processing",
        "Automotive",
        "Pharmaceuticals",
        "Ports & Airports",
        "Cement & Steel",
        "Other"
    ]

    # Conveyor Specifications
    conveyor_types: list[Literal[
        "Belt", "Roller", "Chain", "Screw",
        "Bucket elevator", "Overhead", "Not sure"
    ]] = Field(min_length=1, max_length=7)

    conveyor_lines: int = Field(ge=1, le=500)

    conveyor_length: float | None = Field(
        default=None, ge=0, allow_inf_nan=False
    )

    max_load_capacity: float | None = Field(
        default=None, ge=0, allow_inf_nan=False
    )

    existing_control_system: Literal[
        "None", "Siemens", "Allen-Bradley",
        "Mitsubishi", "Schneider", "Other"
    ] | None = None

    # Project Details
    expected_timeline: Literal[
        "Under 1 month",
        "1-3 months",
        "3-6 months",
        "6+ months"
    ]

    budget_range: Literal[
        "Not decided",
        "Under 10 lakh",
        "10-50 lakh",
        "50 lakh-2 crore",
        "Above 2 crore"
    ] | None = None

    project_requirements: str = Field(
        min_length=10, max_length=5000
    )

    # Customer Details
    contact_name_designation: str = Field(
        min_length=2, max_length=200
    )

    company: str = Field(min_length=1, max_length=200)

    business_email: EmailStr

    phone: str

    city_state: str = Field(min_length=2, max_length=200)

    # Consultation Preferences
    preferred_mode: Literal[
        "Phone call",
        "Video call",
        "On-site visit"
    ]

    preferred_date_time: datetime | None = None

    # Custom Validations
    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value):
        if (
            len(value) != 10
            or not value.isascii()
            or not value.isdigit()
        ):
            raise ValueError(
                "Phone number must contain exactly 10 digits."
            )
        return value

    @field_validator("conveyor_types")
    @classmethod
    def validate_conveyor_types(cls, value):
        if "Not sure" in value and len(value) > 1:
            raise ValueError(
                "'Not sure' cannot be selected with other conveyor types."
            )

        if len(value) != len(set(value)):
            raise ValueError(
                "Duplicate conveyor types are not allowed."
            )

        return value

    @field_validator("project_requirements")
    @classmethod
    def validate_requirements(cls, value):
        if sum(char.isalnum() for char in value) < 5:
            raise ValueError(
                "Please enter meaningful project requirements."
            )
        return value

    @field_validator("preferred_date_time")
    @classmethod
    def validate_date(cls, value):
        if value is None:
            return value

        now = datetime.now(value.tzinfo)

        if value <= now:
            raise ValueError(
                "Please select a future date and time."
            )

        if value.weekday() == 6:
            raise ValueError(
                "Please select a date between Monday and Saturday."
            )

        return value

    @field_validator("contact_name_designation")
    @classmethod
    def validate_contact_name(cls, value):
        if not value[0].isalpha() or not all(
            char.isalpha() or char in " .,'’&()/-"
            for char in value
        ):
            raise ValueError(
                "Please enter a valid contact name and designation without numbers."
            )

        return value

class ConsultationResponse(BaseModel):

    id: int
    message: str
    created_at: datetime
