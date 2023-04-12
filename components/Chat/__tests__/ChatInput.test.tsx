import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInput from "../ChatInput";

describe("ChatInput", () => {
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
