import os
from pathlib import Path

import pandas as pd
import psycopg2
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent 
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)

REQUIRED_VARS = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"]


def get_connection():
    missing = [var for var in REQUIRED_VARS if not os.environ.get(var)]
    if missing:
        raise RuntimeError(
            f"Faltan variables en tu .env: {', '.join(missing)}. "
            f"Verifica que el archivo exista en: {ENV_PATH}"
        )
    connection = psycopg2.connect(
        host=os.environ.get("DB_HOST"),
        port=os.environ.get("DB_PORT"),
        dbname=os.environ.get("DB_NAME"),
        user=os.environ.get("DB_USER"),
        password=os.environ.get("DB_PASSWORD"),
    )
    return connection

def run_query(sql, params=None):
    connection = get_connection()
    try:
        return pd.read_sql_query(sql, connection, params=params)
    finally:
        connection.close()

if __name__ == "__main__":

    connection = get_connection()
    connection.close()
    print("✅ Conexión verificada correctamente.")