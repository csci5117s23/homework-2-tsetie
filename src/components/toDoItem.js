import * as React from "react";
import { Card, Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "@clerk/nextjs";

export default function TodoItem() {
  const [todo, setTodo] = React.useState({});
  const [updatedTodo, setUpdatedTodo] = React.useState("");
  const [updated, setUpdated] = React.useState({});
  const { getToken } = useAuth();
  const API_ENDPOINT = "https://backend-valk.api.codehooks.io/dev";
  
  const id = window.location.pathname.split('/')[2]

  React.useEffect(() => {
    async function getTodo() {
      const token = await getToken({ template: "codehooks" });
      const url = API_ENDPOINT + "/todo?id="+id;
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });
      const data = await response.json();
      setTodo(data);
      setUpdated(false)
    }
    getTodo();
  }, [updated]);

  async function updateTodo() {
    const token = await getToken({ template: "codehooks" });
    const url = API_ENDPOINT + "/todos/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        todo: updatedTodo,
      }),
    });
    const data = await response.json();
    console.log(response);
    setTodo(data);
    setUpdated(true);
  }

  async function deleteTodo() {
    const token = await getToken({ template: "codehooks" });
    const url = API_ENDPOINT + "/todos/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });
    console.log(response);
    window.location.href = "../todos";
  }

  async function setCompleted() {
    const token = await getToken({ template: "codehooks" });
    const url = API_ENDPOINT + "/todos/" + todo["_id"];
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        completed: !todo["completed"],
      }),
    });
    console.log(response);
    setUpdated(true);
  }

  return (
    <>
      <Stack width="90vw" m="5vw" spacing={2}>
        <Card>
          <Stack direction="row">
          <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={todo['completed'] ? true : false}
              onChange={setCompleted}
            />
            <TextField
              id="todoItem"
              defaultValue={todo['todo']}
              variant="standard"
              fullWidth
              multiline
              onChange={(event) => {
                setUpdatedTodo(event.target.value);
              }}
            />
          </Stack>
        </Card>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "#FFFFFF", color: "black" },
          }}
          onClick={updateTodo}
        >
          Submit Edited Task
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "#d1332e", color: "black" },
          }}
          onClick={deleteTodo}
        >
          Delete Task
        </Button>
      </Stack>
    </>
  );
}
