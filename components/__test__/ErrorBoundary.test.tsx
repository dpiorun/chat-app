import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import ErrorBoundary from "../ErrorBoundary";

describe("Error Boundary", () => {
  const ThrowError = () => {
    throw new Error("Test");
  };

  jest.spyOn(console, "error").mockImplementation(() => null);

  it("renders fallback", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("errorboundary")).toBeVisible();
  });

  it("renders custom fallback", () => {
    render(
      <ErrorBoundary fallback={<p>Custom fallback</p>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Custom fallback")).toBeVisible();
  });
});
