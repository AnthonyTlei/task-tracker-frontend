import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface DateRangePickerProps {
  startText: string;
  endText: string;
  startDate: Date;
  endDate: Date;
  onConfirm: (newStart: Date, newEnd: Date) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startText,
  endText,
  startDate,
  endDate,
  onConfirm,
}) => {
  const [newStartDate, setNewStartDate] = useState<dayjs.Dayjs>(
    dayjs(startDate)
  );
  const [newEndDate, setNewEndDate] = useState<dayjs.Dayjs>(dayjs(endDate));
  const [all, setAll] = useState<boolean>(false);
  const handleReset = () => {
    setNewStartDate(dayjs(startDate));
    setNewEndDate(dayjs(endDate));
    setAll(false);
  };
  useEffect(() => {
    if (all) {
      setNewStartDate(dayjs(new Date(0)));
      setNewEndDate(dayjs(new Date()));
    } else {
      setNewStartDate(dayjs(startDate));
      setNewEndDate(dayjs(endDate));
    }
  }, [all, startDate, endDate]);
  return (
    <Box width={"100%"} display={"flex"} flexDirection={"row"}>
      <Card>
        <CardContent>
          <DatePicker
            label={startText}
            value={newStartDate}
            onChange={(newValue) => {
              if (newValue) setNewStartDate(newValue);
            }}
            readOnly={all}
          />
          <DatePicker
            label={endText}
            value={newEndDate}
            onChange={(newValue) => {
              if (newValue) setNewEndDate(newValue);
            }}
            readOnly={all}
          />
        </CardContent>
        <CardActions>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            px={1}
          >
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={all}
                    onClick={() => setAll(!all)}
                  />
                }
                label="ALL"
              />
            </Box>
            <Stack direction={"row"} spacing={1}>
              <Button
                size="small"
                color="secondary"
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() =>
                  onConfirm(newStartDate.toDate(), newEndDate.toDate())
                }
              >
                Apply
              </Button>
            </Stack>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
