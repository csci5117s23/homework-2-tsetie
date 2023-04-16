import * as React from 'react';
import { Card, Checkbox, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function TodoItem() {
    const [checked, setChecked] = React.useState(false);
   
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleTodo = (event) => {
        alert("add code to add todo to data source")
    };

    return (
        <>
            <Stack width="90vw" m="5vw" spacing={2}>
                <Card>
                    <Stack
                        direction="row"
                    >
                        <Checkbox
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            onChange={handleChange}
                        />
                        <TextField
                            id="todoItem"
                            defaultValue="Yo"
                            variant="standard"
                            fullWidth
                            multiline
                        />
                        
                    </Stack>
                </Card>

                <Button variant="contained" sx={{backgroundColor: "gray",  "&:hover": { backgroundColor: "#FFFFFF", color: "black" }}}>Submit Edited Task</Button>
                <Button variant="contained" sx={{backgroundColor: "gray",  "&:hover": { backgroundColor: "#d1332e", color: "black" }}}>Delete Task</Button>
            </Stack>
        </>
    );
}
