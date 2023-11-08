import { Stack, Box, Paper, Grid, Divider } from "@mui/material";

import './CommBoard.css';
import Slice from "../slice";

function getTimeIntervalString(startDate, endDate) {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = 60 * millisecondsPerSecond;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;
  const millisecondsPerMonth = 30 * millisecondsPerDay;
  const millisecondsPerYear = 365 * millisecondsPerDay;

  const timeDifference = Math.abs(endDate - startDate);

  if (timeDifference < millisecondsPerMinute) {
    return "right now";
  } else if (timeDifference < millisecondsPerHour) {
    const minutes = Math.floor(timeDifference / millisecondsPerMinute);
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  } else if (timeDifference < millisecondsPerDay) {
    const hours = Math.floor(timeDifference / millisecondsPerHour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (timeDifference < millisecondsPerMonth) {
    const days = Math.floor(timeDifference / millisecondsPerDay);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (timeDifference < millisecondsPerYear) {
    const months = Math.floor(timeDifference / millisecondsPerMonth);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(timeDifference / millisecondsPerYear);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

function CommBoard(props) {
    console.log(props.data);
    return <Box sx={{padding: '5px'}}>
<Stack direction="column" spacing={0.5}>
{
Object.entries(props.data).map(
    ([key, value]) => 
    <Paper elevation={1} sx={{
        width: '100%', 
        overflow: 'auto',
    }}>
        <Box className="card">
            <Box className="card-top">
                <Box className="card-place">
                    {value.place}
                </Box>
                <Box className="card-title" sx={{
                    color: 'green',
                }}>
                    {value.title}
                </Box>
            </Box>
            <Box className="card-body">
                {value.body}
            </Box>
            <Box className="card-bottom">
                <Box className="card-time">
                    {getTimeIntervalString(value.time, Date.now())}
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box className="card-level">
                    {value.level}
                </Box>
            </Box>
        </Box>
    </Paper>
)
}
</Stack>
    </Box>;
}

export default CommBoard;