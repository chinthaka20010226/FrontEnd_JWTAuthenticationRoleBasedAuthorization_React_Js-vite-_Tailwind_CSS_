// Define an object representing ISendMessageDto
export const ISendMessageDto = {
    receiverUserName: '', // string
    text: '' // string
};

// Define an object representing IMessageDto
export const IMessageDto = {
    id: 0, // number
    senderUserName: '', // string
    createAt: '', // string
    receiverUserName: '', // string (inherited from ISendMessageDto)
    text: '' // string (inherited from ISendMessageDto)
};
