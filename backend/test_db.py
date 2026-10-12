from app.database import test_database_connection

result = test_database_connection()

print("Database connection successful!")
print("Test result:", result)