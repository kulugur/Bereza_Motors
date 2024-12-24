import json
import csv
import pandas as pd




with open('sample_export.csv',  'r',encoding='utf-8') as csvfile:
    data = pd.read_csv(csvfile, delimiter=';', skiprows=0,  encoding='utf-8', low_memory=False)
    output = r'Output.json'
    json_data = data.to_json(path_or_buf='Output.json', orient='records', force_ascii=False)
    print(json_data)
with open('Output.json',  'r', encoding='utf-8') as file:
    file_content = file.read()
    templates = json.loads(file_content)
    for i in templates:
        i['Фотография'] = i['Фотография'].split(',')
        if i["Примечание"]:
            i["Примечание"] = i["Примечание"].replace('\\n', '')

with open('Output.json',  'w', encoding='utf-8') as file:
    json.dump(templates, file, ensure_ascii=False, indent=4)