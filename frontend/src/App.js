import BooksList from "./components/BookList";
import "./App.css";

const App = () => {
  return (
    <div className="bg-container">
      <div className="landing-section">
        <h1 className="heading">Good Reads</h1>
        <p className="quote">Meet Your Next Favourite Book</p>
      </div>

      <BooksList />
    </div>
  );
};

export default App;
