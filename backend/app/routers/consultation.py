from fastapi import (
    APIRouter, Depends, HTTPException,
    status, Request, BackgroundTasks
)
from starlette.datastructures import UploadFile
from starlette.concurrency import run_in_threadpool
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from pydantic import ValidationError

from app.database import get_db
from app.models.consultation import ConsultationRequest
from app.schemas.consultation import (
    ConsultationCreate,
    ConsultationResponse
)
from app.services.file_upload import (
    save_consultation_attachment,
    BASE_DIR
)
from app.config import settings
from app.services.email_service import send_email
from app.services.email_routing import get_consultation_receiver

router = APIRouter(
    prefix="/api/consultation",
    tags=["Consultation"]
)


# Save consultation details in database
def save_consultation(
    consultation: ConsultationCreate,
    attachment_path: str | None,
    db: Session
):
    new_request = ConsultationRequest(
        **consultation.model_dump(),
        attachment_path=attachment_path
    )

    try:
        db.add(new_request)
        db.flush()

        db.refresh(new_request)

        response = ConsultationResponse(
            id=new_request.id,
            message="Consultation request submitted successfully.",
            created_at=new_request.created_at
        )

        db.commit()

        return response

    except SQLAlchemyError:
        db.rollback()

        # Remove attachment if database saving fails
        if attachment_path:
            try:
                (BASE_DIR / attachment_path).unlink(
                    missing_ok=True
                )
            except OSError:
                pass

        raise HTTPException(
            status_code=500,
            detail="Unable to save consultation request."
        )


# Schedule consultation notification emails
def schedule_consultation_emails(
    consultation: ConsultationCreate,
    response: ConsultationResponse,
    attachment_path: str | None,
    background_tasks: BackgroundTasks
):
    conveyor_types = ", ".join(
        consultation.conveyor_types
    )

    conveyor_length = (
        f"{consultation.conveyor_length} m"
        if consultation.conveyor_length is not None
        else "Not provided"
    )

    load_capacity = (
        f"{consultation.max_load_capacity} tons/hr"
        if consultation.max_load_capacity is not None
        else "Not provided"
    )

    preferred_date = (
        consultation.preferred_date_time.strftime(
            "%d %B %Y, %I:%M %p"
        )
        if consultation.preferred_date_time is not None
        else "Not specified"
    )

    # 1. Company notification email
    company_subject = (
        f"New Consultation Request - "
        f"{consultation.required_service} | KoForge"
    )

    company_body = f"""
Dear KoForge Team,

A new consultation request has been received.

Request ID: {response.id}
Submitted At: {response.created_at}

----------------------------------------
CUSTOMER DETAILS
----------------------------------------

Contact Name and Designation:
{consultation.contact_name_designation}

Company: {consultation.company}
Business Email: {consultation.business_email}
Phone: {consultation.phone}
Location: {consultation.city_state}

----------------------------------------
SERVICE AND INDUSTRY
----------------------------------------

Required Service: {consultation.required_service}
Industry: {consultation.industry_type}

----------------------------------------
CONVEYOR SPECIFICATIONS
----------------------------------------

Conveyor Types: {conveyor_types}
Number of Conveyor Lines: {consultation.conveyor_lines}
Approximate Conveyor Length: {conveyor_length}
Maximum Load Capacity: {load_capacity}

Existing Control System:
{consultation.existing_control_system or 'Not provided'}

----------------------------------------
PROJECT DETAILS
----------------------------------------

Expected Timeline: {consultation.expected_timeline}
Budget Range: {consultation.budget_range or 'Not provided'}

Project Requirements:
{consultation.project_requirements}

----------------------------------------
CONSULTATION PREFERENCES
----------------------------------------

Preferred Mode: {consultation.preferred_mode}
Preferred Date and Time: {preferred_date}

Supporting Attachment:
{'Uploaded and stored in the system' if attachment_path else 'Not uploaded'}

Please review the consultation request and contact
the customer to discuss the project requirements.

Regards,
KoForge Notification System
"""

    receiver_email = get_consultation_receiver(
    consultation.required_service
    )

    background_tasks.add_task(
        send_email,
        receiver_email,
        company_subject,
        company_body
    )
        # 2. Customer acknowledgement email
    customer_subject = (
            "Consultation Request Received - KoForge"
        )

    customer_body = f"""
Dear {consultation.contact_name_designation},

Thank you for your interest in KoForge.

We have successfully received your consultation
request. Our team will review your project
requirements and contact you shortly.

Your request details:

Reference ID: {response.id}
Company: {consultation.company}
Required Service: {consultation.required_service}
Preferred Consultation Mode: {consultation.preferred_mode}
Preferred Date and Time: {preferred_date}

Please note that your preferred consultation
date and time are subject to confirmation
by our team.

We look forward to discussing your requirements
and providing suitable industrial solutions.

Best regards,
Team KoForge
"""

    background_tasks.add_task(
        send_email,
        str(consultation.business_email),
        customer_subject,
        customer_body
    )


@router.post(
    "",
    response_model=ConsultationResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_consultation(
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    attachment_path = None

    content_type = request.headers.get(
        "content-type", ""
    ).lower()

    try:
        # Accept form data with optional attachment
        if content_type.startswith("multipart/form-data"):

            async with request.form(
                max_files=1,
                max_fields=5
            ) as form:

                consultation_data = form.get("data")
                attachment = form.get("attachment")

                if not isinstance(consultation_data, str):
                    raise HTTPException(
                        status_code=422,
                        detail="Consultation data is required."
                    )

                # Apply existing Pydantic validations
                consultation = (
                    ConsultationCreate.model_validate_json(
                        consultation_data
                    )
                )

                if attachment is not None:
                    if not isinstance(attachment, UploadFile):
                        raise HTTPException(
                            status_code=422,
                            detail="Invalid attachment."
                        )

                    if attachment.filename:
                        attachment_path = (
                            await save_consultation_attachment(
                                attachment
                            )
                        )

        # Preserve existing JSON request functionality
        elif content_type.startswith("application/json"):

            consultation = (
                ConsultationCreate.model_validate_json(
                    await request.body()
                )
            )

        else:
            raise HTTPException(
                status_code=415,
                detail="Unsupported content type."
            )

    except ValidationError as exc:
        raise HTTPException(
            status_code=422,
            detail=exc.errors(
                include_context=False,
                include_input=False,
                include_url=False
            )
        )

    # Save consultation in PostgreSQL
    response = await run_in_threadpool(
        save_consultation,
        consultation,
        attachment_path,
        db
    )

    # Schedule emails only after successful database save
    schedule_consultation_emails(
        consultation,
        response,
        attachment_path,
        background_tasks
    )

    return response