import { Conversation, Message } from "@/types/backendTypes";
import getRandomInt from "@/utils/getRandomInt";

class Conversations {
  private conversations: Conversation[];
  private myId: string;

  constructor(myId: string) {
    this.conversations = [];
    this.myId = myId;
  }

  getConversation(userId: string) {
    return this.conversations.find((conversation) => conversation.id == userId);
  }

  addMessage(
    conversationId: string,
    message: { authorId: string; content: string }
  ) {
    const newMessage: Message = {
      timestamp: new Date().toISOString(),
      read: message.authorId == this.myId,
      ...message,
    };

    const conversation = this.conversations.find(
      (conversation) => conversation.id == conversationId
    );
    if (!conversation) {
      this.conversations.unshift({
        id: conversationId,
        messages: [newMessage],
        numberOfUnreadMessages: newMessage.read ? 1 : 0,
      });
    } else {
      conversation.messages.unshift(newMessage);
      conversation.numberOfUnreadMessages = conversation.messages.filter(
        (message) => !message.read
      ).length;
    }

    if (message.authorId == this.myId) {
      this.answer(conversationId);
    }

    return newMessage;
  }

  answer(userId: string) {
    const response = "I answer: " + this.getLastMessage(userId)?.content;
    setTimeout(() => {
      this.addMessage(userId, {
        authorId: userId,
        content: response,
      });
    }, getRandomInt(1000, 2000));
  }

  getLastMessage(id: string) {
    return this.conversations
      .find((conversation) => conversation.id == id)
      ?.messages.at(0);
  }

  markAsRead(id: string) {
    this.conversations = this.conversations.map((conversation) => {
      if (conversation.id == id) {
        return {
          ...conversation,
          messages: conversation.messages.map((message) => ({
            ...message,
            read: true,
          })),
          numberOfUnreadMessages: 0,
        };
      }
      return conversation;
    });
  }

  getNumberOfUnreadMessages() {
    return this.conversations
      .flatMap((conversation) => conversation.messages)
      .filter((message) => !message.read).length;
  }

  getMyId() {
    return this.myId;
  }
}

export const conversations = new Conversations("me");
