from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr, EmailStr


class Settings(BaseSettings):

    # Database Configuration
    DATABASE_URL: str

    # Email Configuration
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 465
    SMTP_USER: EmailStr
    SMTP_PASSWORD: SecretStr
    SMTP_FROM_NAME: str = "KoForge"

    # Default Enquiry Recipients
    CONTACT_RECEIVER_EMAIL: EmailStr
    CONSULTATION_RECEIVER_EMAIL: EmailStr

    # Service-Based Email Recipients
    ENGINEERING_RECEIVER_EMAIL: EmailStr | None = None
    AUTOMATION_RECEIVER_EMAIL: EmailStr | None = None
    SOFTWARE_RECEIVER_EMAIL: EmailStr | None = None
    INTEGRATION_RECEIVER_EMAIL: EmailStr | None = None
    MAINTENANCE_RECEIVER_EMAIL: EmailStr | None = None

    model_config = SettingsConfigDict(
        env_file=".env"
    )


settings = Settings()