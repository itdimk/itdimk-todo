import { Container } from "../components/Layout/Container";
import { TodoList } from "../components/TodoList/TodoList";

function App() {
  return (
    <Container padding="1rem 15%">
      <TodoList />
    </Container>
  );
}

export default App;
