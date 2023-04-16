import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Card, Checkbox, Typography } from "@mui/material";
import { useAuth } from "@clerk/nextjs";
import TodoInputs from "../components/todoInputs.js";
import Link from 'next/link'

export default function Content(props) {
  const [todos, setTodos] = React.useState([]);
  const [updated, setUpdated] = React.useState(false);

  const { userId, getToken } = useAuth();
  const { done } = props;
  const API_ENDPOINT = "https://backend-valk.api.codehooks.io/dev";

  React.useEffect(() => {
    async function getTodos() {
      const token = await getToken({ template: "codehooks" });
      const url = done
        ? API_ENDPOINT + "/done?user_id=" + userId
        : API_ENDPOINT + "/todos?user_id=" + userId;

      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });
      const data = await response.json();

      //Sorting logic found on stack overflow https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
      setTodos(
        data.sort(function (a, b) {
          return new Date(b["createdOn"]) - new Date(a["createdOn"]);
        })
      );
      setUpdated(false);
    }
    getTodos();
  }, [updated]);

  return (
    <>
      <TodoInputs done={done} setUpdated={setUpdated} />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        mt="3vw"
      >
        {todos.map((todo) => {
          return <TodoItem done={done} todo={todo} setUpdated={setUpdated} />;
        })}
      </Stack>
    </>
  );
}

function TodoItem(props) {
  const { todo, done, setUpdated } = props;
  const { getToken } = useAuth();
  const API_ENDPOINT = "https://backend-valk.api.codehooks.io/dev";

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
      <Box width="70vw">
        <Card>
          <Stack direction="row">
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={done ? done : false}
              onChange={setCompleted}
            />

            <Link href={"/todo/"+ todo["_id"]} id="LinkTag">
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={8}
                height="2vh"
                width={"60vw"}
                m="1em"
              >
                <Typography noWrap variant="h5">
                  {todo["todo"]}
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Card>
      </Box>
    </>
  );
}
