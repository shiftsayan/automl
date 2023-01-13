import csv
import os
from curses import flash
from flask import redirect, request
from flask_restful import Resource


class Setup(Resource):
    def post(self):
        json = request.get_json()
        filename = json.get('filename')
        if filename is None:
            flash('No filename')
            return redirect(request.url)

        with open(os.path.join('uploads', filename), 'r') as f:
            inputs = []
            outputs = []

            csvreader = csv.reader(f)
            header = next(csvreader)   
            firstRow = next(csvreader)

            for column, value in zip(header, firstRow):
                if (value.isnumeric()):
                    inputs.append(column)
                else:
                    outputs.append(column)

            return {'message': 'Setup started.', 'inputs': inputs, 'outputs': outputs}

