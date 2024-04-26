import { render, screen, fireEvent, wait } from "@testing-library/react";
import React from "react";
import App from "./App";

import mockFetchMissions from "./api/fetchMissions";
jest.mock("./api/fetchMissions");

//we want to make sure our App component renders
test("renders without errors", () => {
  render(<App />);
});

//want to test to see if it fetches and renders mission data, so here since we are reaching out to our backend we are going to have some asynchornous functionality since we are waiting for some data to be returned from our backend before we are able to render it to the screen
test("fetches and renders mission data", async () => {
  render(<App />);
  mockFetchMissions.mockResolveValueOnce({
    data: [
      { mission_name: "Mission 1", mission_id: "mission 1" },
      { mission_name: "Mission 2", mission_id: "mission 2" },
    ],
  });
  //so now there is just one button on this application which is in the MissionForm, get data button, so i want to go ahead and select that button so i can click on it, so we need to import screen to get access to our screen
  const button = screen.getByRole("button");
  fireEvent.click(button); //so when we click this button it calls our mock api, our mockFetchMissions, and it will resolve with this mission data but we have to wait for the data to come in so we have to use await wait
  await wait();//waits for our promise, or our call to the backend to be resolved
  expect(screen.getAllByTestId("mission")).toHaveLength(2);
});
