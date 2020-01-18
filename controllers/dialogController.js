const Message = require('../models/MessageModel');
const Dialog = require('../models/DialogModel');

const ErrorResponse = require('../utils/errorResponse');

exports.createDialog = async (req, res, next) => {
    const { partnerId } = req.params;
    if (!req.body.text) {
        return next(new ErrorResponse('Сообщение не может быть пустым!', 400));
    }
    try {
        let dialog = await Dialog.findOne({ $or: [
            {
                author: req.user.id,
                partner: partnerId
            },
            {
                author: partnerId,
                partner: req.user.id
            },
        ]
          
        });

        let message;

        if (dialog) {
            message = await Message.create({
                user: req.user.id,
                dialogId: dialog._id,
                text: req.body.text
            });
            dialog.lastMessage = message._id;

        } else {
            dialog = await Dialog.create({
                author: req.user.id,
                partner: partnerId
            });
            message = await Message.create({
                user: req.user.id,
                dialogId: dialog._id,
                text: req.body.text
            });
            dialog.lastMessage = message._id;
        };

        await message.save();
        await dialog.save();
        res.status(201).json(dialog);
        io.emit('DIALOG_CREATED', dialog);
        io.emit('CREATE_MESSAGE', message);
    } catch (error) {
        next(error);
    }
};

exports.getDialogs = async (req, res, next) => {
    try {
        const dialogs = await Dialog.find()
        .or([{ author: req.user.id }, { partner: req.user.id }])
        .populate([
            { path: 'author', select: 'fullName avatar' },
            { path: 'partner', select: 'fullName avatar' },
        ])
        .populate({
            path: 'lastMessage',
            populate: {
                path: 'user',
                select: 'fullName avatar',
            },
        })
        .sort({ createdAt: -1 })
        .exec();
        res.status(200).json(dialogs);
    } catch (error) {
        next(error);
    }
};


exports.createMessage = async (req, res, next) => {
    const { dialogId } = req.params;
    const { text } = req.body;
    try {
        const dialog = await Dialog.findOne({ _id: dialogId });
        if (dialog.partner.toString() !== req.user.id 
        && dialog.author.toString() !== req.user.id) {
            return next(new ErrorResponse('Диалог не найден', 404));
        }
        const message = await Message.create({
            dialogId: dialog._id,
            user: req.user.id,
            text
        });
        dialog.lastMessage = message._id;
        dialog.createdAt = message.createdAt;
        await dialog.save();
        await message.save();
        res.status(201).json(message);
        io.emit('CREATE_MESSAGE', message);
        io.on('MESSAGE_CLIENT', (data) => console.log(data));
    } catch (error) {
        next(error);
    }
};


exports.getMessages = async (req, res, next) => {
    const { dialogId } = req.params;
    const limit = req.query.limit;
    try {
        const messages = (await Message.find({ dialogId })
            .populate('user', 'firstName')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            ).reverse();
        const count = await Message.find({dialogId}).countDocuments();
        
        const dialog = await Dialog.findById(dialogId);
        if (!dialog) {
            return next(new ErrorResponse('Диалог не найден', 404));
        }

        if (dialog.author.toString() !== req.user.id && 
            dialog.partner.toString() !== req.user.id) {
            return next(new ErrorResponse('Диалог не найден', 404));
        }

        res.status(200).json({ count, messages });
        io.emit('GET_MESSAGES', messages);
    } catch (error) {
        next(error);
    }
};