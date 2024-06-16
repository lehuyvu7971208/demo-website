import { render } from "@testing-library/react";
import Modal from "./modal";
import userEvent from "@testing-library/user-event";

describe("Test Component <Modal />", () => {
  test("Render Component <Modal /> not open", () => {
    const { queryByTestId } = render(<Modal open={false} />);

    expect(queryByTestId("modal")).not.toBeInTheDocument();
  });

  test("Render Component <Modal /> with default", async () => {
    const closeFn = jest.fn();

    const user = userEvent.setup();

    const { queryByTestId, getByTestId } = render(
      <Modal open={true} title="My Modal" onClose={closeFn}>
        Hello world
      </Modal>
    );

    expect(queryByTestId("modal")).toBeInTheDocument();

    expect(queryByTestId("modal-title")).toBeInTheDocument();
    expect(queryByTestId("modal-title")).toHaveTextContent(/my modal/i);

    expect(queryByTestId("modal-body")).toBeInTheDocument();
    expect(queryByTestId("modal-body")).toHaveTextContent(/hello world/i);

    expect(queryByTestId("modal-close")).toBeInTheDocument();
    await user.click(getByTestId("modal-close"));

    expect(closeFn).toHaveBeenCalled();
  });

  test("Render Component <Modal /> with persistence", async () => {
    const { queryByTestId } = render(
      <Modal persistence open={true} title="My Modal">
        Hello world
      </Modal>
    );

    expect(queryByTestId("modal-close")).not.toBeInTheDocument();
  });

  test("Render Component <Modal /> no title", async () => {
    const { queryByTestId } = render(<Modal open={true}>Hello world</Modal>);

    expect(queryByTestId("modal-title")).toBeInTheDocument();
    expect(queryByTestId("modal-title")).toHaveTextContent("");
  });
});
