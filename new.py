import csv
import json
from collections import defaultdict

csv_file_path = 'salaries.csv'
json_file_path = 'data.json'

data = defaultdict(lambda: {'total_jobs': 0, 'total_salary': 0, 'job_titles': defaultdict(int)})

with open(csv_file_path, mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        year = int(row['work_year'])
        salary = float(row['salary_in_usd'])
        job_title = row['job_title']
        
        data[year]['total_jobs'] += 1
        data[year]['total_salary'] += salary
        data[year]['job_titles'][job_title] += 1

for year, stats in data.items():
    stats['average_salary'] = stats['total_salary'] / stats['total_jobs']

# Convert defaultdict to regular dict for JSON serialization
data = {year: dict(stats) for year, stats in data.items()}

with open(json_file_path, mode='w') as json_file:
    json.dump(data, json_file, indent=4)
