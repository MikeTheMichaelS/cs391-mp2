import styled from 'styled-components';

import { Joke } from '../interface/Joke';

const JokeWrapper = styled.div`
  padding: 10px;
  border: 1px solid black;
  margin: 10px 0;
  width: 80%;
  height: 100%;
`;

const JokeSetup = styled.p`
    font-weight: bold;
`;

const JokePunchlineButton = styled.button`
    margin: 10px 0;
    align-self: center;
`;

const JokePunchline = styled.p<{ $isVisible: boolean }>`
    display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
    font-style: italic;
`;

export default function Jokes({ joke, displayPunchline, setDisplayPunchline }: { joke: Joke, displayPunchline: boolean, setDisplayPunchline: (displayPunchline: boolean) => void }) {

    return (
        <JokeWrapper>
            <JokeSetup>{joke.setup}</JokeSetup>
            <JokePunchlineButton onClick={() => { setDisplayPunchline(!displayPunchline) }}>
                {displayPunchline ? 'Hide Punchline' : 'Show Punchline'}
            </JokePunchlineButton>
            <JokePunchline $isVisible={displayPunchline}>{joke.punchline}</JokePunchline>
        </JokeWrapper>
    )
}
