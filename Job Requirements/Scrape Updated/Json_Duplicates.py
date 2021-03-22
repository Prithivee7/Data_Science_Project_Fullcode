import json

data = []

for i in range(1,5640):
    print(i)
    with open(str(i)+'.json') as f:
        data.append(json.load(f))

duplicates = []

for i in data:
    count = 0
    for j in data:
        if i == j:
            count = count + 1
    if count > 1:
        duplicates.append(i)

print(len(duplicates))

for i in duplicates:
    data.remove(i)

for i in range(1, len(data)+1):
    with open('D:/Second Year/Data-Science-Project/Job Requirements/Scrape Updated/Updated_Data/'+str(i)+'.json', 'w') as file:
        json.dump(data[i-1], file)
