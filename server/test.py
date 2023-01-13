import os
import random
from curses import flash
from typing import Dict, List
from flask import redirect, request
from flask_restful import Resource

import pandas as pd
from sklearn import ensemble, linear_model, neural_network


class Test(Resource):
    def post(self):
        json = request.get_json()
        filename = json.get('filename')
        payload = json.get('payload')
        output_columns = json.get('outputColumns')
        if filename is None or payload is None or output_columns is None:
            flash('No data')
            return redirect(request.url)

        dataset = pd.read_csv(os.path.join('uploads', filename))
        result = train_model_and_make_prediction(
            dataset,
            output=output_columns[0],
            inputs=payload.keys(),
            hypothetical_input=payload,
        )
        
        return {'message': 'Testing complete.', 'result': result}

MODEL_TYPES = [
    linear_model.LogisticRegression,
    neural_network.MLPClassifier,
    ensemble.RandomForestClassifier,
]

def train_model_and_make_prediction(
    dataset: pd.DataFrame,
    output: str,
    inputs: List[str],
    hypothetical_input: Dict[str, float],
) -> float:  # probability of output being `True` for hypothetical input
    assert dataset[output].dtype in (bool,)
    assert all(dataset[input].dtype in (float, int) for input in inputs)

    X = dataset[inputs]
    y = dataset[output]

    model = random.choice(MODEL_TYPES)()
    model.fit(X, y)

    return model.predict_proba(
        pd.DataFrame({input: [hypothetical_input[input]] for input in inputs})
    )[0, model.classes_.tolist().index(True)]