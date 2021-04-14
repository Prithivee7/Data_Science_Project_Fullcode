import pdfplumber

with pdfplumber.open("Resume5.pdf") as pdf:
    data = ""
    first_page = pdf.pages[0]
    print(pdf.pages)
    for page in pdf.pages:
        data = data + page.extract_text()
    # print(first_page.extract_text())

resume = {}

data = data.split('\n')

data = [i for i in data if i and i != ' ' and 'naukri' not in i]
for i in data:
    print(i)
    print()

size = 0

resume['Name'] = data[0].strip()

for i in data:
    #Current Location -- Total Experience; Current Designation -- Total Experience
    #Preferred Location -- Highest Degree; Current Location -- Highest Degree
    #Current Company -- Highest Degree;
    if i[0:16] == 'Current Location':
        if 'Total Experience' not in resume and 'Total Experience:' in i:
            index = i.find('Total Experience')
            current_location = i[0:index]
            total_experience = i[index:]
            temp = current_location.split(':')
            resume['Current Location'] = temp[1].strip()
            temp = total_experience.split(':')
            resume['Total Experience'] = temp[1].strip()
        elif 'Highest Degree' not in resume and 'Highest Degree:' in i:
            index = i.find('Highest Degree')
            current_location = i[0:index]
            highest_degree = i[index:]
            temp = current_location.split(':')
            resume['Current Location'] = temp[1].strip()
            temp = highest_degree.split(':')
            resume['Highest Degree'] = temp[1].strip()

    if i[0:14] == 'Pref. Location':
        if 'Highest Degree' not in resume and 'Highest Degree:' in i:
            index = i.find('Highest Degree')
            preferred_location = i[0:index]
            highest_degree = i[index:]
            temp = preferred_location.split(':')
            resume['Preferred Location'] = temp[1].strip()
            temp = highest_degree.split(':')
            resume['Highest Degree'] = temp[1].strip()
        else:
            temp = i.split(':')
            resume['Preferred Location'] = temp[1].strip()
    
    if i[0:19] == 'Current Designation' and 'Total Experience' in i and 'Total Experience' not in resume:
        index = i.find('Total Experience')
        total_experience = i[index:]
        temp = total_experience.split(':')
        resume['Total Experience'] = temp[1].strip()
    
    if i[0:15] == 'Current Company' and 'Highest Degree' in i and 'Highest Degree' not in resume:
        index = i.find('Highest Degree')
        total_experience = i[index:]
        temp = total_experience.split(':')
        resume['Highest Degree'] = temp[1].strip()

    if i[0:15] == 'Functional Area':
        temp = i.split(':')
        value = temp[1].strip()
        temp_size = size + 1
        while data[temp_size][0:5] != 'Role:':
            value += ' ' + data[temp_size]
            temp_size += 1
        resume['Functional Area'] = value.strip()


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

    #Category -- Job Type; Physically Challenged -- Employment Status
    #Physically Challenged -- Job Type
    #Employment Status
    #Job Type
    # if i[0:9] == 'Category:':
    #     index = i.find('Job Type')
    #     category = i[0:index]
    #     job_type = i[index:]
    #     temp = category.split(':')
    #     resume['Category'] = temp[1].strip()
    #     temp = job_type.split(':')
    #     resume['Job Type'] = temp[1].strip()

    # if i[0:22] == 'Physically Challenged:':
    #     index = i.find('Employment Status')
    #     physically_challenged = i[0:index]
    #     employment_status = i[index:]
    #     temp = physically_challenged.split(':')
    #     resume['Physically Challenged'] = temp[1].strip()
    #     temp = employment_status.split(':')
    #     resume['Employment Status'] = temp[1].strip()

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
        IT_Skills = []
        IT_Skills_Experience = []
        temp_size = size+2
        while temp_size < len(data) and data[temp_size] != 'Languages Known':
            value = data[temp_size].strip()
            temp_list = [g.strip() for g in value.split(',')]
            experience = 0
            last_element = temp_list[-1]
            years = 0
            months = 0
            last_skill = ''
            last_element_list = last_element.split(' ')
            for j in range(len(last_element_list)):
                if last_element_list[j] == 'Year(s)':
                    years = int(last_element_list[j-1])
                if last_element_list[j] == 'Month(s)':
                    months = int(last_element_list[j-1])
            for j in range(len(temp_list)-1):
                IT_Skills.append(temp_list[j].strip())
            for j in last_element_list:
                try:
                    number = int(j)
                    break
                except:
                    last_skill += j+' '
            count = len(temp_list)-1
            if len(last_skill) > 0:
                IT_Skills.append(last_skill.strip())
                count += 1
            for j in range(count):
                IT_Skills_Experience.append(str(years)+'.'+str(months))
            temp_size += 1

        resume['IT Skills'] = (',').join(IT_Skills)
        resume['IT Skills Experience'] = (',').join(IT_Skills_Experience)

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
print("********************************************************************************************")
for i in resume.keys():
    print(i + ' --> ' + resume[i])
    print()
