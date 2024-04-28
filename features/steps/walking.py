from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
from behave import *

@given(u'the user is on the game website and has started playing')
def step_impl(context):
    options = webdriver.ChromeOptions()
    options.add_argument('--headless=new')
    options.set_capability("goog:loggingPrefs", {  # old: loggingPrefs
    "browser": "ALL"})
    context.browser = webdriver.Chrome(options = options)
    context.browser.get("https://nmarhari.github.io/SWE-Alpha/")
    time.sleep(10)
    start_button = context.browser.find_element(by=By.TAG_NAME, value='button')
    start_button.click()


@when(u'the user is pressing up arrow key')
def step_impl(context):
    ActionChains(context.browser)\
        .key_down(Keys.ARROW_UP)\
        .perform()
    time.sleep(1)


@then(u'the position should change')
def step_impl(context):
    context.browser.execute_script("console.log('x: '+player.position.x)")
    #f = open('output.txt', "w")
    #for log in context.browser.get_log("browser"):
    
        #f.write(log['message'][log['message'].find("x:"):log['message'].find("x:")+6][-3:-1])
    #parses the console for a the message executed above and checkes the the x value has changed
    log = context.browser.get_log("browser")
    assert(int(log[-1]['message'][log[-1]['message'].find("x:"):log[-1]['message'].find("x:")+6][-3:-1]) > 5)
    
    

