import pandas as pd

from database import get_connection

def main():
    connection = get_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT id, full_name, club, dominant_hand FROM players;")
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        df = pd.DataFrame(rows, columns = columns)
        print(df)
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    main()