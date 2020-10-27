export const conferenceChatInfo = { 
    chatActivation: false, chats: [
        {id: '2021-01-01@11:30', chatName: "Morning Chat", chatDate: "2021-01-01", chatTime: '10:30', chatLength: '30', chatSize: '2'},
        {id: '2021-01-01@14:30', chatName: "Afternoon Chat", chatDate: "2021-01-01", chatTime: '14:30', chatLength: '30', chatSize: '2'}
    ],
    inviteText: '<p>Hello $NAME$,</p><p><br></p><p>you have a <strong>Remote Social Butterfly Chat</strong> happening on $DATE$ at $TIME$ for $CHATLENGTH$ with $CHATPARTNER$.</p><p>Please get in touch with each other to organise your chat.</p><p><br></p><p>If you have feedback about the Remote Social Butterfly Chats, just reply to this email.</p><p><br></p><p>Happy connecting!</p><p>Your Organizers and the Remote Social Butterfly Team</p>',
    todoList: {enteredEmails: false, personalisedInvite: false, scheduledMeeting: false, choseMeetingTime: false, activated: false},
}

export const businessChatInfo = {
    chatActivation: false, nextChats: [{chatName: "Chat 1", chatTime: "11:30", chatLength: "30", chatDate: "1609718400000"},
        {chatName: "Chat 2", chatTime: "11:30", chatLength: "30", chatDate: "1610323200000"},
        {chatName: "Chat 3", chatTime: "11:30", chatLength: "30", chatDate: "1610928000000"},
        {chatName: "Chat 4", chatTime: "11:30", chatLength: "30", chatDate: "1611532800000"},
        {chatName: "Chat 5", chatTime: "11:30", chatLength: "30", chatDate: "1612137600000"},
        {chatName: "Chat 6", chatTime: "11:30", chatLength: "30", chatDate: "1612742400000"},
        {chatName: "Chat 7", chatTime: "11:30", chatLength: "30", chatDate: "1613347200000"},
        {chatName: "Chat 8", chatTime: "11:30", chatLength: "30", chatDate: "1613952000000"},
        {chatName: "Chat 9", chatTime: "11:30", chatLength: "30", chatDate: "1614556800000"},
        {chatName: "Chat 10", chatTime: "11:30", chatLength: "30", chatDate: "1615161600000"}],
    frequency: 'weekly', startDate: "2021-01-01", endDate: "2033-01-01", chatLength: '30',
    weekday: 'friday', chatTime: '11:30', weekOfMonth: 'first',
    inviteText: '<p>Hello $NAME$,</p><p><br></p><p>you have a <strong>Remote Social Butterfly Chat</strong> happening on $DATE$ at $TIME$ for $CHATLENGTH$ with $CHATPARTNER$.</p><p>Please get in touch with each other to organise your chat.</p><p><br></p><p>If you have feedback about the Remote Social Butterfly Chats, just reply to this email.</p><p><br></p><p>Happy connecting!</p><p>Your Organizers and the Remote Social Butterfly Team</p>',
    todoList: {enteredEmails: false, personalisedInvite: false, scheduledMeeting: false,
    choseMeetingTime: false, activated: false},
    chatSize: '2'
}