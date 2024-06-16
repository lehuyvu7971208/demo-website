import SinglePost from "./single-post";
import { GetSinglePostResponse } from "@/api/post";
import { render, screen } from "@testing-library/react";

const sampleData: GetSinglePostResponse = {
  id: 1,
  title: "His mother had always taught him",
  body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
  tags: ["history", "american", "crime"],
  reactions: {
    likes: 192,
    dislikes: 25,
  },
  views: 305,
  userId: 121,
};

describe("Test Component <SinglePost />", () => {
  test("Render <SinglePost /> with title, body", () => {
    const { queryByTestId } = render(<SinglePost data={sampleData} />);

    expect(queryByTestId("image")).not.toBeNull();
    expect(
      queryByTestId("image")?.getAttribute("alt") === sampleData.title
    ).toBeTruthy();

    expect(queryByTestId("statistic")).toBeInTheDocument();

    const viewElement = queryByTestId("views");
    expect(viewElement).toHaveTextContent("Lượt xem");
    expect(viewElement?.querySelector("span")).toHaveTextContent(/^305$/);

    const likeElement = queryByTestId("likes");
    expect(likeElement).not.toBeNull();
    expect(likeElement?.querySelector("svg")).toBeTruthy();
    expect(likeElement).toHaveTextContent(/^192$/i);

    const dislikeElement = queryByTestId("dislikes");
    expect(dislikeElement).not.toBeNull();
    expect(dislikeElement?.querySelector("svg")).toBeTruthy();
    expect(dislikeElement).toHaveTextContent(/^25$/i);

    expect(queryByTestId("body")).toHaveTextContent(sampleData.body);
    expect(queryByTestId("title")).toHaveTextContent(sampleData.title);
  });

  test("Render <SinglePost /> with no title", () => {
    const data = { ...sampleData };

    // @ts-ignore
    delete data.title;

    const { queryByTestId } = render(<SinglePost data={data} />);

    expect(queryByTestId("title")).toBeNull();
    expect(queryByTestId("body")).toHaveTextContent(sampleData.body);
  });

  test("Render <SinglePost /> with no body", () => {
    const data = { ...sampleData };

    // @ts-ignore
    delete data.body;

    const { queryByTestId } = render(<SinglePost data={data} />);

    expect(queryByTestId("body")).toBeNull();
    expect(queryByTestId("title")).toHaveTextContent(data.title);
  });

  test("Render <SinglePost /> with no views", () => {
    const data = { ...sampleData, views: 0 };

    const { queryByTestId } = render(<SinglePost data={data} />);

    expect(queryByTestId("statistic")).toBeInTheDocument();

    const viewElement = queryByTestId("views");
    expect(viewElement).toHaveTextContent("Lượt xem");
    expect(viewElement?.querySelector("span")).toHaveTextContent(/^0$/);
  });

  test("Render <SinglePost /> with no reactions", () => {
    const data = { ...sampleData, views: null, reactions: { likes: null, dislikes: null } };

    // @ts-ignore
    const { queryByTestId } = render(<SinglePost data={data} />);

    expect(queryByTestId("statistic")).toBeInTheDocument();

    const likeElement = queryByTestId("likes");
    expect(likeElement).toBeNull();

    const dislikeElement = queryByTestId("dislikes");
    expect(dislikeElement).toBeNull();
  });
});
