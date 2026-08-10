import pandas as pd

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

from database import run_query
from dashboard_data import players_dataset

def build_training_data():
    matches_sql = """
        SELECT player_one_id, player_two_id, winner_id
        FROM matches
        WHERE status = 'finished'
        AND player_one_id IS NOT NULL
        AND player_two_id IS NOT NULL
        AND winner_id IS NOT NULL;
    """
    matches = run_query(matches_sql)
    players = players_dataset()[["player_id", "win_rate_percent"]]

    data = matches.merge(
        players, left_on="player_one_id", right_on="player_id"
    ).rename(columns={"win_rate_percent": "win_rate_one"})

    data = data.merge(
        players, left_on="player_two_id", right_on="player_id"
    ).rename(columns={"win_rate_percent": "win_rate_two"})

    data["win_rate_diff"] = data["win_rate_one"] - data["win_rate_two"]
    data["player_one_won"] = (data["winner_id"] == data["player_one_id"]).astype(int)

    return data[["win_rate_diff", "player_one_won"]]

def train_model():
    data = build_training_data()

    X = data[["win_rate_diff"]]
    y = data["player_one_won"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = LogisticRegression()
    model.fit(X_train, y_train)

    accuracy = accuracy_score(y_test, model.predict(X_test))

    return model, accuracy

def predict_match(model, win_rate_one, win_rate_two):
    win_rate_diff = win_rate_one - win_rate_two
    probability = model.predict_proba([[win_rate_diff]])[0][1]
    return round(probability * 100, 2)

if __name__ == "__main__":
    model, accuracy = train_model()
    print(f"Model accuracy on test data: {accuracy * 100:.2f}%")

    probability = predict_match(model, win_rate_one=70, win_rate_two=40)
    print(f"Predicted probability that Player 1 wins: {probability}%")