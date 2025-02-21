import { useState, useEffect } from "react"
import styled from "styled-components"
import Jokes from "./components/Jokes"
import { Joke } from "./interface/Joke"
import "./App.css"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  width: 100%;
`;

const JokeGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  height: 100%;
  // border: 1px solid black;
`;

const FetchNewButton = styled.button`
    margin: 10px 0;
    align-self: center;
`;

function App() {
  const [joke, setJoke] = useState<Joke>();
  const [fetchNewJoke, setFetchNewJoke] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [displayPunchline, setDisplayPunchline] = useState(false);

  // Fetch a new joke
  useEffect(() => {
    async function fetchJokes(): Promise<void> {
      setIsFetching(true);
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");
      const newJoke: Joke = await response.json() as Joke;
      setDisplayPunchline(false);
      setJoke(newJoke);
      setIsFetching(false);
    }

    fetchJokes()
      .then(() => console.log("Jokes fetched"))
      .catch((error) => {
        console.error("Error fetching jokes", error);
        setIsFetching(false);
      });
  }, [fetchNewJoke]);

  // Set the title of the page
  useEffect(() => {
    document.getElementsByTagName("title")[0].innerHTML = "Joke | Michael's MP2";
  }, []);

  return (
    <MainContainer>
      <h1>Why so serious?</h1>
      <JokeGallery>
        {joke && <Jokes joke={joke} displayPunchline={displayPunchline} setDisplayPunchline={setDisplayPunchline} />}
        <FetchNewButton onClick={() => setFetchNewJoke(!fetchNewJoke)}>
          {isFetching ? "Fetching..." : "Give me a new one."}
        </FetchNewButton>
      </JokeGallery>
    </MainContainer>
  )
}

export default App
