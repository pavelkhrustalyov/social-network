import messageData from '../redux/messages/messagesData';

class MessageSystem {
    getMessages() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(messageData);
            }, 1000)
        })
    }

    getCurrentMessage(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(messageData.find(item => item.dialogId === id));
            }, 1000);
        });
    }
};

export default new MessageSystem();