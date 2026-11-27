from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT current_database()")
        )

        print("Database connected successfully!")
        print("Database name:", result.scalar())

except Exception as e:
    print("Database connection failed:", e)