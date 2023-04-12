export interface User {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
  };
  login: {
    uuid: string;
  };
  dob: {
    date: string;
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface Message {
  timestamp: string;
  authorId: string;
  content: string;
  read?: boolean;
}

export interface Conversation {
  id: string;
  messages: Message[];
  numberOfUnreadMessages: number;
}
