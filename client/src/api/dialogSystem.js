import dialogsData from '../redux/dialogs/dialogsData';

class DialogSystem {
    getDialogs() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(dialogsData);
            }, 1000)
        })
    }
};

export default new DialogSystem();