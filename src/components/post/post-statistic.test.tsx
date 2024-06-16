import PostStatistic from "./post-statistic";
import { render, screen } from "@testing-library/react";

describe("Test Component <PostStatistic>", () => {
  test("Render <PostStatistic views={10} likes={15} dislikes={5} />", () => {
    render(<PostStatistic views={10} likes={15} dislikes={5} />);

    const viewElement = screen.getByTestId("views");
    expect(viewElement).toHaveTextContent("Lượt xem");
    expect(viewElement.querySelector("span")).toHaveTextContent(/^10$/);

    const likeElement = screen.getByTestId("likes");
    expect(likeElement.querySelector("svg")).toBeTruthy();
    expect(likeElement).toHaveTextContent(/^15$/i);

    const dislikeElement = screen.getByTestId("dislikes");
    expect(dislikeElement.querySelector("svg")).toBeTruthy();
    expect(dislikeElement).toHaveTextContent(/^5$/i);
  });

  test("Render <PostStatistic views={0} likes={15} dislikes={5} />", () => {
    render(<PostStatistic views={0} likes={15} dislikes={5} />);

    const viewElement = screen.getByTestId("views");
    expect(viewElement).toHaveTextContent("Lượt xem");
    expect(viewElement.querySelector("span")).toHaveTextContent(/^0$/);

    const likeElement = screen.getByTestId("likes");
    expect(likeElement.querySelector("svg")).toBeTruthy();
    expect(likeElement).toHaveTextContent(/^15$/i);

    const dislikeElement = screen.getByTestId("dislikes");
    expect(dislikeElement.querySelector("svg")).toBeTruthy();
    expect(dislikeElement).toHaveTextContent(/^5$/i);
  });

  test("Render <PostStatistic views={0} likes={0} dislikes={5} />", () => {
    const { queryByTestId } = render(
      <PostStatistic views={0} likes={0} dislikes={5} />
    );

    const viewElement = screen.getByTestId("views");
    expect(viewElement).toHaveTextContent("Lượt xem");
    expect(viewElement.querySelector("span")).toHaveTextContent(/^0$/);

    expect(queryByTestId("likes")).toBeNull();
  });

  test("Render <PostStatistic views={0} likes={0} dislikes={0} />", () => {
    const { queryByTestId } = render(
      <PostStatistic views={0} likes={0} dislikes={0} />
    );

    const viewElement = screen.getByTestId("views");
    expect(viewElement).toHaveTextContent("Lượt xem");
    expect(viewElement.querySelector("span")).toHaveTextContent(/^0$/);

    expect(queryByTestId("likes")).toBeNull();
    expect(queryByTestId("dislikes")).toBeNull();
  });
});
