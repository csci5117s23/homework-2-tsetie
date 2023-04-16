import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { useAuth } from "@clerk/nextjs";

export default function TodoInputs(props) {
  const { userId, getToken } = useAuth();
  const { done, setUpdated } = props;
  const [newTodo, setNewTodo] = React.useState("");
  const [category, setCategory] = React.useState("");
  const API_ENDPOINT = "https://backend-valk.api.codehooks.io/dev";
  const API_KEY = "8e1aa1b4-9a30-4051-bfa4-7af3a7a89325";

  if (done) {
    return null;
  }

  async function addItem() {
    const token = await getToken({ template: "codehooks" });
    setUpdated(true);
    if (newTodo === "") {
      return;
    }

    const response = await fetch(API_ENDPOINT + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        userId: userId,
        todo: newTodo,
        category: category,
        completed: false,
        createdOn: new Date(),
      }),
    });
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
        sx={{ position: "static", bottom: "0" }}
      >
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "31vw" },
          }}
        >
          <TextField
            id="todo"
            label="ToDo"
            onChange={(event) => {
              setNewTodo(event.target.value);
            }}
          />
          <TextField
            id="category"
            label="Category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
        </Box>
        <Button variant="outlined" sx={{ height: "5vh" }} onClick={addItem}>
          Enter
        </Button>
      </Stack>
    </Stack>
  );
}
