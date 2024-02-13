import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ToddoListsList from "../features/TodoListsList/ToddoListsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";
import { RequestStatusType } from "./app-reducer";

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {status === "loading" ? <LinearProgress /> : ""}
        <ErrorSnackbar />
      </AppBar>
      <Container fixed>
        <ToddoListsList />
      </Container>
    </div>
  );
}

export default App;
