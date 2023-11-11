import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

describe("<Header />", () => {
  test("should check if logo is present in the header", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });
});
