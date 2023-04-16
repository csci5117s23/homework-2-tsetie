import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Card, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "@clerk/nextjs";
import TodoInputs from "../components/todoInputs.js";

export default function Content(props) {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [todos, setTodos] = React.useState([]);
  const [updated, setUpdated] = React.useState(false);
  const { userId, getToken } = useAuth();
  const { done } = props;
  const API_ENDPOINT = "https://backend-valk.api.codehooks.io/dev";

  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const categories = ["All"];

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
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          handleChange={handleChange}
        />
        {todos.map((todo) => {
          return (
            <TodoItem done={done} todo={todo} />
          );
        })}
      </Stack>
      <TodoInputs done={done} setUpdated={setUpdated} />
    </>
  );
}

function TodoItem(props) {
  const [checked, setChecked] = React.useState(false);
  const { todo, done } = props;
  const { userId, getToken } = useAuth();
  const API_ENDPOINT = "https://backend-valk.api.codehooks.io/dev";

  async function fetchData() {
    const token = await getToken({ template: "codehooks" });
    const url = API_ENDPOINT + "/todos/" + todo['_id'];
    const response = await fetch(url, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token },
      body: JSON.stringify({
        userId: todo['userId'],
        todo: todo['todo'],
        category: todo['category'],
        completed: true,
        createdOn: todo['createdOn'],
      }),
    });
    const data = await response.json();
    console.log(response);
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleTodo = (event) => {
    alert("add code to add todo to data source");
  };

  return (
    <>
      <Box width="70vw">
        <Card>
          <Stack direction="row">
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={done ? done : checked}
              onChange={fetchData}
            />

            <div onClick={handleTodo}>
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
                  {todo['todo']}
                </Typography>
              </Stack>
            </div>
          </Stack>
        </Card>
      </Box>
    </>
  );
}

function CategoryTabs(props) {
  var { selectedCategory, handleChange, categories } = props;

  return (
    <TabContext value={selectedCategory}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange}>
          {categories.map((category) => {
            return <Tab label={category} value={category} />;
          })}
          <Button
            variant="text"
            startIcon={<DeleteIcon />}
            color="inherit"
            sx={{
              color: "#d11b1b",
              "&:hover": { backgroundColor: "#d11b1b", color: "white" },
            }}
          >
            Delete Category
          </Button>
        </TabList>
      </Box>
    </TabContext>
  );
}
