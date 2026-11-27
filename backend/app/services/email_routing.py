from app.config import settings


def get_consultation_receiver(service: str) -> str:

    service_email_mapping = {
        "Conveyor Management Systems":
            settings.ENGINEERING_RECEIVER_EMAIL,

        "Conveyor Automation":
            settings.AUTOMATION_RECEIVER_EMAIL,

        "Industrial Software Solutions":
            settings.SOFTWARE_RECEIVER_EMAIL,

        "System Integration":
            settings.INTEGRATION_RECEIVER_EMAIL,

        "Monitoring and Maintenance Solutions":
            settings.MAINTENANCE_RECEIVER_EMAIL,

        "Custom Engineering Solutions":
            settings.ENGINEERING_RECEIVER_EMAIL,

        "Not sure":
            settings.CONSULTATION_RECEIVER_EMAIL
    }

    receiver = service_email_mapping.get(service)

    return str(
        receiver or settings.CONSULTATION_RECEIVER_EMAIL
    )