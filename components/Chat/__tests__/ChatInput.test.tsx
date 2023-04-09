import { User } from "@/types/backendTypes";
import { render, screen } from "@testing-library/react";
import ChatInput from "../ChatInput";
import userEvent from "@testing-library/user-event";

const mockUser: User = {
  gender: "string",
  name: {
    title: "string",
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
    coordinates: {
      latitude: "string",
      longitude: "string",
    },
    timezone: {
      offset: "string",
      description: "string",
    },
  },
  email: "string",
  login: {
    uuid: crypto.getRandomValues(new Uint32Array(10)).toString(),
    username: "string",
    password: "string",
    salt: "string",
    md5: "string",
    sha1: "string",
    sha256: "string",
  },
  dob: {
    date: "string",
    age: 123,
  },
  registered: {
    date: "string",
    age: 123,
  },
  phone: "string",
  cell: "string",
  id: {
    name: "string",
    value: null,
  },
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
  it("submits after hitting submit button", async () => {
    const mockOnSubmit = jest.fn();
    render(<ChatInput input="" setInput={jest.fn()} onSubmit={mockOnSubmit} />);
    const input = screen.getByRole("input");

    await userEvent.click(input);
    await userEvent.type(input, "test");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(mockOnSubmit).toBeCalledWith("test");
  });

  it("submits after hitting {Enter}", async () => {
    const mockOnSubmit = jest.fn();
    render(<ChatInput input="" setInput={jest.fn()} onSubmit={mockOnSubmit} />);

    await userEvent.click(screen.getByRole("input"));
    await userEvent.keyboard("test{Enter}");

    expect(mockOnSubmit).toBeCalledWith("test");
  });

  it("adds line break when hitting {Shift>}{Enter}", async () => {
    const mockOnSubmit = jest.fn();
    render(<ChatInput input="" setInput={jest.fn()} onSubmit={mockOnSubmit} />);

    await userEvent.click(screen.getByRole("input"));
    await userEvent.keyboard("test{Shift>}{Enter}");
    await userEvent.keyboard("test");

    expect(screen.getByDisplayValue("test test")).toBeDefined();
    expect(mockOnSubmit).not.toBeCalled();
  });
});
