
import smtplib
import ssl
import logging

from email.message import EmailMessage
from email.utils import formataddr

from app.config import settings


logger = logging.getLogger(__name__)


def send_email(
    recipient: str,
    subject: str,
    body: str
) -> bool:

    try:
        message = EmailMessage()

        message["From"] = formataddr((
            settings.SMTP_FROM_NAME,
            str(settings.SMTP_USER)
        ))

        message["To"] = recipient
        message["Subject"] = subject

        message.set_content(body)

        context = ssl.create_default_context()

        # Connect using SSL
        with smtplib.SMTP_SSL(
            settings.SMTP_HOST,
            settings.SMTP_PORT,
            context=context,
            timeout=30
        ) as server:

            server.login(
                str(settings.SMTP_USER),
                settings.SMTP_PASSWORD.get_secret_value()
            )

            server.send_message(message)

        return True

    except Exception as error:
        logger.error(
            "Email delivery failed: %s - %s",
            type(error).__name__,
            str(error)
        )

        return False
