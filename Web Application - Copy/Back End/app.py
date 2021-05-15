from flask import Flask, request
from flask_cors import CORS, cross_origin
import pandas as pd
import pdfplumber

app = Flask(__name__)

@app.route('/')
def start():
    return "Server is Up and Running"

def getText(file):
    print(type(file))
    cols = ['Current Location', 'Preferred Location', 'Functional Area', 'Industry', 'Total Experience', 'Highest Degree', 'UG', 'PG', 'Category', 'Job Type', 'Employment Status', 'Physically Challenged', 'Key Skills', 'Name', 'Role', 'Summary', 'IT Skills', 'Languages Known', 'Work Experience', 'Resume']
    df = pd.DataFrame(columns = cols)

    resume = {}

    with pdfplumber.open(file) as pdf:
        data = ""
        for page in pdf.pages:
            data = data + page.extract_text()

    data = data.split('\n')

    data = [i for i in data if i and i != ' ' and 'naukri' not in i]

    size = 0

    resume['Name'] = data[0].strip()

    for i in data:
        if i[0:16] == 'Current Location':
            index = i.find('Total Experience')
            current_location = i[0:index]
            total_experience = i[index:]
            temp = current_location.split(':')
            resume['Current Location'] = temp[1].strip()
            temp = total_experience.split(':')
            resume['Total Experience'] = temp[1].strip()

        if i[0:14] == 'Pref. Location':
            index = i.find('Highest Degree')
            preferred_location = i[0:index]
            highest_degree = i[index:]
            temp = preferred_location.split(':')
            resume['Preferred Location'] = temp[1].strip()
            temp = highest_degree.split(':')
            resume['Highest Degree'] = temp[1].strip()

        if i[0:15] == 'Functional Area':
            temp = i.split(':')
            resume['Functional Area'] = temp[1].strip() + ' Maintenance'

        if i[0:9] == 'Industry:':
            temp = i.split(':')
            resume['Industry'] = temp[1].strip()

        if i[0:3] == 'UG:':
            temp = i.split(':')
            value = temp[1].strip()
            temp_size = size+1
            while data[temp_size][0:2] != 'PG' and data[temp_size] != 'IT Skills':
                value += ' '+data[temp_size]
                temp_size += 1
            resume['UG'] = value

        if i[0:3] == 'PG:':
            temp = i.split(':')
            resume['PG'] = temp[1].strip()

        if i[0:9] == 'Category:':
            index = i.find('Job Type')
            category = i[0:index]
            job_type = i[index:]
            temp = category.split(':')
            resume['Category'] = temp[1].strip()
            temp = job_type.split(':')
            resume['Job Type'] = temp[1].strip()

        if i[0:22] == 'Physically Challenged:':
            index = i.find('Employment Status')
            physically_challenged = i[0:index]
            employment_status = i[index:]
            temp = physically_challenged.split(':')
            resume['Physically Challenged'] = temp[1].strip()
            temp = employment_status.split(':')
            resume['Employment Status'] = temp[1].strip()

        if i[0:11] == 'Key Skills:':
            temp_size = size+1
            value = i.split(':')[1].strip()+','
            while data[temp_size][0:10] != 'Verified :' and data[temp_size][0:12] != 'Last Active:' and data[temp_size][0:7] != 'Summary':
                value += data[temp_size]+","
                temp_size += 1
            value = value.strip()[0:-1]
            if value[-1] == ',' or value[-1] == '.':
                value = value[0:-1]
            key_skills_list = value.split(',')
            for skill in range(len(key_skills_list)):
                key_skills_list[skill] = key_skills_list[skill].strip()
            resume['Key Skills'] = (',').join(key_skills_list)

        if i[0:5] == 'Role:':
            temp = i.split(':')
            resume['Role'] = temp[1].strip()

        if i[0:7] == 'Summary':
            value = ''
            temp_size = size+1
            while data[temp_size] != 'Work Experience':
                value += data[temp_size].strip()+' '
                temp_size += 1
            resume['Summary'] = value.strip()

        if i[0:9] == 'IT Skills':
            value = ''
            temp_size = size+2
            while temp_size < len(data) and data[temp_size] != 'Languages Known':
                value += data[temp_size].strip()+', '
                temp_size += 1
            value = value.strip()[0:-1]
            IT_skills_list = value.split(',')
            for skill in range(len(IT_skills_list)):
                IT_skills_list[skill] = IT_skills_list[skill].strip()
            resume['IT Skills'] = (',').join(IT_skills_list)

        if i[0:15] == 'Languages Known':
            value = ''
            temp_size = size+2
            while temp_size < len(data) and data[temp_size][0:18] != 'Affirmative Action':
                value += data[temp_size].strip()+', '
                temp_size += 1
            resume['Languages Known'] = value.strip()[0:-1]
        
        if i[0:15] == 'Work Experience':
            temp_size = size+1
            value = ''
            while (data[temp_size][0:9] != 'Education'):
                value += data[temp_size]+" "
                temp_size += 1
            value = value.strip()
            resume['Work Experience'] = value

        size += 1

    if 'PG' not in resume:
        resume['PG'] = 'None'

    if 'Languages Known' not in resume:
        resume['Languages Known'] = 'None'

    for j in cols:
        if j not in resume:
            resume[j] = 'None'
    df = df.append(resume, ignore_index = True)
    df.to_csv('Resume.csv', index = False)

@app.route('/getFile', methods=['POST'])
@cross_origin()
def getFile():
    print(request.files)
    file = request.files['File']
    print("Reached")
    print(getText(file))
    return "Successfully Done"

if __name__ == "__main__":
  app.run(debug=True)
