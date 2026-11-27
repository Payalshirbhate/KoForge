
from sqlalchemy import (
    Column, Integer, String, Text,
    Float, DateTime, JSON, CheckConstraint
)
from sqlalchemy.sql import func
from app.database import Base

class ConsultationRequest(Base):

    __tablename__ = "consultation_requests"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Service and Industry
    required_service = Column(String(150), nullable=False)
    industry_type = Column(String(150), nullable=False)

    # Conveyor Specifications
    conveyor_types = Column(JSON, nullable=False)
    conveyor_lines = Column(Integer, nullable=False)
    conveyor_length = Column(Float, nullable=True)
    max_load_capacity = Column(Float, nullable=True)
    existing_control_system = Column(String(100), nullable=True)

    # Project Details
    expected_timeline = Column(String(50), nullable=False)
    budget_range = Column(String(100), nullable=True)
    project_requirements = Column(Text, nullable=False)

    # Customer Details
    contact_name_designation = Column(String(200), nullable=False)
    company = Column(String(200), nullable=False)
    business_email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    city_state = Column(String(200), nullable=False)

    # Consultation Preferences
    preferred_mode = Column(String(50), nullable=False)
    preferred_date_time = Column(DateTime, nullable=True)

    # File Attachment
    attachment_path = Column(String(500), nullable=True)

    # Submission Timestamp
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    # Database Constraints
    __table_args__ = (
        CheckConstraint(
            "conveyor_lines BETWEEN 1 AND 500",
            name="check_conveyor_lines"
        ),
        CheckConstraint(
            "conveyor_length >= 0",
            name="check_conveyor_length"
        ),
        CheckConstraint(
            "max_load_capacity >= 0",
            name="check_max_load_capacity"
        ),
    )