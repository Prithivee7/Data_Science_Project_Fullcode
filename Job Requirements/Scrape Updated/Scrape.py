from selenium import webdriver
import time
import json
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.webdriver.common.by import By

url = 'https://www.naukri.com/software-developer-jobs?k=software%20developer'

driver = webdriver.Chrome()
driver.get(url)
time.sleep(2)
num = 3192
main_window = driver.current_window_handle

while True:
    for n in range(1,21):
        try:
            time.sleep(1)
            # driver.find_element_by_xpath('/html/body/div[1]/div[3]/div[2]/section[2]/div[2]/article['+ str(n) +']').click()
            button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div[3]/div[2]/section[2]/div[2]/article[{0}]'.format(n))))
            button.click()
            window = driver.window_handles[1]
            driver.switch_to_window(window)
            time.sleep(1)
            soup = BeautifulSoup(driver.page_source, "html.parser")

            data = {}
            data['Job Title'] = soup.find(class_='jd-header-title').get_text()
            data['Company'] = soup.find(class_='pad-rt-8').get_text()
            data['Experience'] = soup.find(class_='exp').get_text()
            data['Salary'] = soup.find(class_='salary').get_text()
            data['Location'] = soup.find(class_='location').get_text()
            data['Job Description'] = soup.find(class_='dang-inner-html').get_text()

            details_list = soup.find(class_='other-details').find_all(class_='details')
            details_names_list = ['Role', 'Industry Type', 'Functional Area', 'Employment Type', 'Role Category']
            for i in range(len(details_list)):
                data[details_names_list[i]] = details_list[i].find('span').get_text()
                # print(details_list[i].find('span').get_text())
                # print()

            education_list = soup.find(class_='education').find_all(class_='details')
            education_names_list = ['UG', 'PG', 'Doctorate']
            for i in range(len(education_list)):
                data[education_names_list[i]] = education_list[i].find('span').get_text()
                # print(education_list[i].find('span').get_text())
                # print()

            if 'Doctorate' not in data:
                data['Doctorate'] = 'None'

            key_skills_object = soup.find(class_='key-skill')
            key_skills = []
            for skill in key_skills_object.find_all('span'):
                key_skills.append(skill.get_text())
            data['Key Skills'] = key_skills

            file_name = 'D:\Second Year\Data-Science-Project\Job Requirements\Scrape Updated\Data\\'+str(num)+'.json'
            with open(file_name, 'w') as outfile:
                json.dump(data, outfile)
            # print(driver.window_handles)
            driver.close()
            # print(driver.window_handles)
            driver.switch_to_window(main_window)
            time.sleep(1)
            # print(driver.current_window_handle)
            num = num + 1
        except Exception as e:
            if len(driver.window_handles) > 1:
                driver.close()
                driver.switch_to_window(main_window)
                time.sleep(1)
            continue
    # driver.find_element_by_xpath('/html/body/div[1]/div[3]/div[2]/section[2]/div[3]/a[2]').click()
    # WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#root > div.search-result-container > div.content > section.listContainer.fleft > div.pagination.mt-64.mb-60 > a.fright.fs14.btn-secondary.br2'))).click()
    driver.execute_script("arguments[0].click();", WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "#root > div.search-result-container > div.content > section.listContainer.fleft > div.pagination.mt-64.mb-60 > a.fright.fs14.btn-secondary.br2"))))
    if num == 5500:
        break
