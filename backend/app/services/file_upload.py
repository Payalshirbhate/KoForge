
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile, HTTPException


# Upload configuration
BASE_DIR = Path(__file__).resolve().parents[2]

UPLOAD_DIR = BASE_DIR / "uploads" / "consultations"

ALLOWED_EXTENSIONS = {".pdf", ".dwg", ".xlsx"}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

CHUNK_SIZE = 1024 * 1024  # 1 MB


async def save_consultation_attachment(
    file: UploadFile
) -> str:

    file_path = None

    try:
        # Validate file extension
        extension = Path(file.filename or "").suffix.lower()

        if extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="Only PDF, DWG and XLSX files are allowed."
            )

        # Create upload directory
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

        # Generate a unique and safe filename
        unique_filename = f"{uuid4().hex}{extension}"

        file_path = UPLOAD_DIR / unique_filename

        total_size = 0

        # Save file in chunks
        with file_path.open("xb") as destination:

            while chunk := await file.read(CHUNK_SIZE):

                total_size += len(chunk)

                if total_size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail="File size must not exceed 10 MB."
                    )

                destination.write(chunk)

        # Reject empty files
        if total_size == 0:
            raise HTTPException(
                status_code=400,
                detail="Empty files are not allowed."
            )

        # Return relative path for database storage
        return file_path.relative_to(BASE_DIR).as_posix()

    except HTTPException:
        if file_path:
            file_path.unlink(missing_ok=True)
        raise

    except OSError:
        if file_path:
            file_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=500,
            detail="Unable to save attachment."
        )

    finally:
        await file.close()
