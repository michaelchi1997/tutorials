from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

PATH = '/Users/dychi/Documents/webdriver/chromedriver'
driver = webdriver.Chrome(PATH)

driver.get("http://sg.9wee.com/")

driver.implicitly_wait(5)

userName = driver.find_element_by_id('user-name')
userName.send_keys('wuhui8013ee')

password_hidden = driver.find_element_by_id('showPass')
password_hidden.click()

password = driver.find_element_by_id('user-wp')
password.send_keys('baidu@88')

password.send_keys(Keys.RETURN)

try:
    lastUserLogin = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "user_lastlogin"))
    )
    loginLink = lastUserLogin.find_elements_by_tag_name('a')
    if len(loginLink) > 0:
        loginLink[0].click()

    driver.switch_to_window(driver.window_handles[1])
    actualGamePage = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "body"))
    )
    print(actualGamePage.text)
finally:
    time.sleep(10)
    driver.quit()


