export const getFirstConversation = (state) => state.chatTab.conversationIdArr[0]; //nếu không có giá trị ở ví trí này thì sẽ nhận dược undefined
export const getSecondConversation = (state) => state.chatTab.conversationIdArr[1];