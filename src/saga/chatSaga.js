import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { getMembersSuccess, sendMessageToChat, replyMessageToChat, getChats, getChatsSuccess, updateSelectedUser, createChat } from "src/redux/User/Chat/action";
import { WATCH_CHAT_MEMBERS, WATCH_CHAT_SUCCESS, SEND_MESSAGE_WATCHER, REPLY_MESSAGE_WATCHER, CREATE_CHAT_WATCHER } from "src/redux/User/Chat/actionTypes";
import { chats, chatSuccess } from "src/redux/User/Chat/data";

function* fetchChatMemberAsyn() {
    console.log(chats);
    yield put(getMembersSuccess(chats));
}

function* fetchChatAsyn() {
    const chatData = chatSuccess;
    const currentUserId = 0;
    yield put(getChats(chatData));
    const online = true;
    const chats = chatData;
    const chat = chats.filter((x) => x.users.includes(currentUserId));
    const selectedUser = chats[0].users.find((x) => x !== currentUserId);
    yield put(getChatsSuccess(chat, selectedUser, online));
    yield put(updateSelectedUser(selectedUser, online));
}

function* sendMessageAsyn({ currentUserId, selectedUserId, messageInput, chats, online }) {
    let chat = chats.find((x) => x.users.includes(currentUserId) && x.users.includes(selectedUserId));
    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes();
    const status = online;
    if (chat) {
        chat.messages.push({
            sender: currentUserId,
            time: time,
            text: messageInput,
            status: true,
        });
        chat.lastMessageTime = time;
        chat.online = status;

        let chats_data = chats.filter((x) => x.id !== chat.id);
        chats_data.splice(0, 0, chat);
        yield put(getChatsSuccess(chats, selectedUserId, online));
    }
    yield put(sendMessageToChat(currentUserId, selectedUserId, messageInput, chats, online));
}

function* replyByUserAsyn({ currentUserId, selectedUserId, replyMessage, chats, online }) {
    let chat = chats.find((x) => x.users.includes(currentUserId) && x.users.includes(selectedUserId));
    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes();
    const status = online;
    if (chat) {
        chat.messages.push({
            sender: selectedUserId,
            time: time,
            text: replyMessage,
            status: true,
        });
        chat.lastMessageTime = time;
        chat.online = status;
        let chats_data = chats.filter((x) => x.id !== chat.id);
        chats_data.splice(0, 0, chat);

        yield put(getChatsSuccess(chats_data, selectedUserId, online));
    }
    yield put(replyMessageToChat(currentUserId, selectedUserId, replyMessage, chats, online));
}

function* createNewChatAsyn({ currentUserId, selectedUserId, chats }) {
    yield put(createChat(currentUserId, selectedUserId, chats));
    let conversation = {
        id: chats.length + 1,
        users: [currentUserId, selectedUserId],
        lastMessageTime: "-",
        messages: [],
    };
    chats.splice(0, 0, conversation);
    yield put(getChatsSuccess(chats, selectedUserId));
}

export function* WatcherChatApp() {
    yield takeLatest(WATCH_CHAT_MEMBERS, fetchChatMemberAsyn);
    yield takeLatest(WATCH_CHAT_SUCCESS, fetchChatAsyn);
    yield takeLatest(SEND_MESSAGE_WATCHER, sendMessageAsyn);
    yield takeLatest(REPLY_MESSAGE_WATCHER, replyByUserAsyn);
    yield takeLatest(CREATE_CHAT_WATCHER, createNewChatAsyn);
}
