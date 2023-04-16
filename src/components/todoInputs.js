import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { useAuth } from "@clerk/nextjs";

export default function TodoInputs(props) {
  const { userId, getToken } = useAuth();
  const { done, setUpdated } = props;
  const [todo, setTodo] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const API_ENDPOINT = "https://backend-valk.api.codehooks.io/dev";

  if (done) {
    return null;
  }

  async function addItem() {
    const token = await getToken({ template: "codehooks" });
    setUpdated(true);
    if (todo === "") {
      return;
    }

    const response = await fetch(API_ENDPOINT + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        userId: userId,
        todo: todo,
        category: category,
        completed: false,
        createdOn: new Date(),
      }),
    });
    setTodo("")
    console.log(response);
  }

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        mt={3}
        spacing={2}
        sx={{ position: "static", bottom: "0" }}
      >
          <TextField
            id="todo"
            label="ToDo"
            value={todo}
            sx={{width:"50vw"}}
            onChange={(event) => {
              setTodo(event.target.value);
            }}
          />
        <Button variant="outlined" sx={{maxWidth:"100px",maxHeight:"53px",borderColor:"white", color: "gray", backgroundColor:"white", '&:hover':{borderColor:"#d4d4d4", color:"gray", backgroundColor: "#d4d4d4"} }} onClick={addItem}>
          Add Task
        </Button>
      </Stack>

    </Stack>
  );
}  
