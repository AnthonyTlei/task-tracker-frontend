import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";

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
  const [newStartDate, setNewStartDate] = useState<Date>(startDate);
  const [newEndDate, setNewEndDate] = useState<Date>(endDate);
  return (
    <Box>
      <Card>
        <CardContent>
          <DatePicker
            label={startText}
            value={dayjs(startDate)}
            onChange={(newValue) => {
                if (newValue) setNewStartDate(newValue.toDate());
              }}
          />
          <DatePicker
            label={endText}
            value={dayjs(endDate)}
            onChange={(newValue) => {
              if (newValue) setNewEndDate(newValue.toDate());
            }}
          />
        </CardContent>
        <CardActions>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"row-reverse"}
            px={1}
          >
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => onConfirm(newStartDate, newEndDate)}
            >
              Apply
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
