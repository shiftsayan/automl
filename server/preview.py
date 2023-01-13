import csv
import os
from curses import flash
from flask import redirect, request
from flask_restful import Resource


class Preview(Resource):
    def post(self):
        json = request.get_json()
        filename = json.get('filename')
        limit = json.get('limit') or 100
        if filename is None:
            flash('No filename')
            return redirect(request.url)

        with open(os.path.join('uploads', filename), 'r') as f:
            csvreader = csv.reader(f)
            columns = [{ 'field': "id", 'headerName': "ID", 'width': 80, 'sortable': False }]
            rows = []
            firstRow = None
            index = 0

            header = next(csvreader)    
            for row in csvreader:
                if not firstRow: firstRow = row
                row_data = dict(zip(header, row))
                row_data['id'] = index
                rows.append(row_data)
                index += 1
                if index >= limit: break

            for column, value in zip(header, firstRow):
                columns.append({
                    'field': column,
                    'headerName': column,
                    'width': 180 if value.isnumeric() else 80,
                    'type': 'number' if value.isnumeric() else 'boolean',
                })

            return {'message': 'Preview generated.', 'columns': columns, 'rows': rows}

