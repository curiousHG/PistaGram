import Message from "../Models/Message.js";
import Room from "../Models/Room.js";

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const room = await Room.findOne({
            people: { $all: [senderId, receiverId] },
        }).populate("messages");

        if (!room) {
            return res.status(200).json([]);
        }
        const messages = room.messages;

        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in Get Message Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during message gathering!",
        });
    }
};

export const registerMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let room = await Room.findOne({
            people: { $all: [senderId, receiverId] },
        });

        if (!room) {
            room = await Room.create({
                people: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (!newMessage) {
            return res.status(400).json({
                error: "Internal Server error while creating new message!",
            });
        }

        room.messages.push(newMessage._id);

        await Promise.all([newMessage.save(), room.save()]);

        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in Register Message Controller: ", error.message);
        res.status(500).json({
            error: "Server Error: Internal error occurred during message registering!",
        });
    }
};
