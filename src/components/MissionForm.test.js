import { fireEvent, render, screen } from "@testing-library/react";
import MissionForm from "./MissionForm";
import React from "react";

//in our MissionForm component we want to test that when the data is being fetched that the we are fetching data message is being rendered, and when data is not being fetched that our button Get Data is being shown, and that when we click on the Get Data button that the property we pass into getData() we want to make sure the props.getData() method is being called

test("MissionForm renders correctly", () => {
  render(<MissionForm />);
});

test("renders the message correctly when isFetching data is true", () => {
  render(<MissionForm isFetchingData={true} />);
  const value = screen.queryByText(/we are fetching data/i); //using the screen method because we are looking for the we are fetching data text to be rendered on the screen and use the slashes so the test is not case sensitive
  expect(value).not.toBeNull(); //the value should NOT be null because it, the text/value, should be rendered on the screen because we ARE fetching data bc isFetchData is true so the we are fetching data message should be rendered on the screen
});

test("render button when isFetchingData is false", () => {
  render(<MissionForm isFetchingData={false} />);
  const value = screen.queryByRole("button");
  expect(value).not.toBeNull();
});

test("call getData when the button is pressed", () => {
  //a spy is a function that we can pass into a value of a property to see if it gets run properly
  const mockGetData = jest.fn(() => {return("hello")});
  render(<MissionForm getData={mockGetData} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  console.log(mockGetData);
  expect(mockGetData.mock.calls).toHaveLength(1); //so we are going to expect our mockGetData that has a property mock on it and the property calls, and calls will be an array of all our calls, so if we click on the get data button twice we would have two calls, so when we say toHaveLength(1) that means we are expecting that if the button is clicked on once, that our calls array (since its an array with an index so we can see what its length is) we use toHaveLength(1) to ensure it just has the one call in it since the button was clicked on once
});
