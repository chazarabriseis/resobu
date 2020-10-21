import createChatAttendeesFunctions as ccaf
from pprint import pprint


if __name__ == '__main__':
    input = [
             {'email': 'm1', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'male', 'connected': []},
             {'email': 'm2', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'male', 'connected': []},
             {'email': 'm3', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm4', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm5', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm6', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'male', 'connected': []},
             {'email': 'm7', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'male', 'connected': []},
             {'email': 'm8', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm9', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm10', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm11', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'male', 'connected': []},
             {'email': 'm12', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'male', 'connected': []},
             {'email': 'm13', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm14', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm15', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm16', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'male', 'connected': []},
             {'email': 'm17', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'male', 'connected': []},
             {'email': 'm18', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm19', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []},
             {'email': 'm20', 'teammembers': [], 'projectmembers': [], 'location': [], 'gender': 'female', 'connected': []}
    ]



    pprint(ccaf.calculate_max_meeting_number(20, 2))