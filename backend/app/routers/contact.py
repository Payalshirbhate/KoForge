from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    BackgroundTasks
)
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.database import get_db
from app.models.contact import ContactEnquiry
from app.schemas.contact import ContactCreate, ContactResponse
from app.config import settings
from app.services.email_service import send_email


router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)


@router.post(
    "",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED
)
def create_contact(
    contact: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    new_enquiry = ContactEnquiry(
        **contact.model_dump()
    )

    try:
        db.add(new_enquiry)
        db.commit()
        db.refresh(new_enquiry)

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unable to save contact enquiry."
        )

    # 1. Company notification email
    company_subject = (
        f"New Contact Enquiry - {contact.subject} | KoForge"
    )

    company_body = f"""
Dear KoForge Team,

A new contact enquiry has been received.

Enquiry ID: {new_enquiry.id}
Full Name: {contact.full_name}
Email: {contact.email}
Phone: {contact.phone or 'Not provided'}
Company: {contact.company or 'Not provided'}
Subject: {contact.subject}
Consent: {'Yes' if contact.consent else 'No'}
Submitted At: {new_enquiry.created_at}

Customer Message:
{contact.message}

Please review the enquiry and contact the customer.

Regards,
KoForge Notification System
"""

    background_tasks.add_task(
        send_email,
        str(settings.CONTACT_RECEIVER_EMAIL),
        company_subject,
        company_body
    )

    # 2. Customer acknowledgement email
    customer_subject = "Thank You for Contacting KoForge"

    customer_body = f"""
Dear {contact.full_name},

Thank you for contacting KoForge.

We have successfully received your enquiry
regarding {contact.subject}.

Our team will review your message and
get back to you shortly.

Enquiry Reference ID: {new_enquiry.id}

Thank you for your interest in KoForge.

Best regards,
Team KoForge
"""

    background_tasks.add_task(
        send_email,
        str(contact.email),
        customer_subject,
        customer_body
    )

    return ContactResponse(
        id=new_enquiry.id,
        message="Enquiry submitted successfully.",
        created_at=new_enquiry.created_at
    )