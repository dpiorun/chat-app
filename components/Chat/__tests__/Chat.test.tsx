import { User } from "@/types/backendTypes";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chat from "../Chat";

const mockUser: User = {
  gender: "string",
  name: {
    first: "string",
    last: "string",
  },
  location: {
    street: {
      number: 123,
      name: "string",
    },
    city: "string",
    state: "string",
    country: "string",
    postcode: 123,
  },
  login: {
    uuid: crypto.getRandomValues(new Uint32Array(10)).toString(),
  },
  dob: {
    date: "string",
  },
  phone: "string",
  picture: {
    large: "string",
    medium: "string",
    thumbnail: "string",
  },
  nat: "string",
};

beforeEach(() => {
  mockUser.login.uuid = crypto.getRandomValues(new Uint32Array(10)).toString();
});

describe("Chat", () => {
  it.only("user answers with 'I answer: {repeat original message}'", async () => {
    const chat = (
      <Chat
        user={mockUser}
        toggleShowUserDetails={jest.fn()}
        dispatch={jest.fn()}
      />
    );
    render(chat);
    const input = screen.getByRole("input");

    await userEvent.click(input);
    await userEvent.type(input, "test");
    await userEvent.click(screen.getByTestId("submit-button"));

    render(chat);
    expect(await screen.findByText("I answer: test")).toBeDefined();
  });
});
