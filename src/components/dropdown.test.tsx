import { render, waitFor } from "@testing-library/react";
import Dropdown from "./dropdown";
import userEvent from "@testing-library/user-event";

describe("Test Component <Dropdown>", () => {
  test("Render <Dropdown /> with default", async () => {
    const user = userEvent.setup();

    const { getByTestId, queryByTestId } = render(
      <Dropdown
        toggle={({ toggle }) => (
          <button onClick={toggle} data-testid="dropdown-toggle">
            Click me
          </button>
        )}
        menu={({ toggle }) => (
          <div data-testid="dropdown-menu">
            <a data-testid="dropdown-menu-item" onClick={toggle}>
              Menu item
            </a>
          </div>
        )}
      />
    );
    expect(queryByTestId("dropdown-menu")).toBeNull();
    expect(getByTestId("dropdown-toggle")).toBeInTheDocument();

    await user.click(getByTestId("dropdown-toggle"));
    await waitFor(async () => {
      expect(getByTestId("dropdown-menu")).toBeInTheDocument();

      await user.click(getByTestId("dropdown-menu-item"));
      await waitFor(() => {
        expect(queryByTestId("dropdown-menu")).toBeNull();
      });
    });

    await user.click(getByTestId("dropdown-toggle"));
    await user.keyboard("foo");

    await waitFor(() => {
      expect(queryByTestId("dropdown-menu")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(queryByTestId("dropdown-menu")).not.toBeInTheDocument();
    });
  });
});
