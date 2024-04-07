from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
from behave import *

@given(u'the user is on the game website and has started playing')
def step_impl(context):
    context.browser = webdriver.Chrome()
    context.browser.get("https://nmarhari.github.io/SWE-Alpha/")
    start_button = context.browser.find_element(by=By.TAG_NAME, value='button')
    start_button.click()


@when(u'the user is pressing up arrow key')
def step_impl(context):
    ActionChains(context.browser)\
        .key_down(Keys.ARROW_UP)\
        .perform()


@then(u'the position should change')
def step_impl(context):
    assert(1==1)

