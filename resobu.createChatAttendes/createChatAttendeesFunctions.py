import random
from itertools import combinations
import numpy as np

def create_chat_attendees(input, group_size, date):
    chat_list =[]

    for person_1 in input:
        if check_if_person_already_as_kex():
            break
        chat_list.append({person_1.email: []})
        random_number = random.randint(0, length(input))
        person_2 = input[random_number]

    return input

def check_if_already_connected(object, key, value_to_check):
    if (person[key].includes(person_to_check)):
        return True
    else:
        return False

def calculate_max_meeting_number(number_people, group_size):
    people = 'ABCDEFGHIJ'
    print((10*9*8*7)/(2*3*4))
    print(len(people))
    result = list(combinations(people, 4))
    print(result)
    print(len(result))