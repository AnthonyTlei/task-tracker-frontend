import React, {useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { TaskWithUser } from "../models/taskWithUsers";
import { TaskStatus } from "../../task/models/task";
import { StatusPill } from "../../../shared/components/StatusPill";
import { formatDate } from "../../../shared/utilities/date.utils";
import OptionsMenu from "../../../shared/components/OptionsMenu";

interface Column {
  name: string;
  label: string;
}

const columns: Column[] = [
  { name: "id", label: "ID" },
  { name: "full_id", label: "Full ID" },
  { name: "title", label: "Title" },
  { name: "manager", label: "Manager" },
  { name: "assignee", label: "Assignee" },
  { name: "status", label: "Status" },
  { name: "date_assigned", label: "Date Assigned" },
  { name: "date_completed", label: "Date Completed" },
];

interface TaskTableProps {
  tasks: TaskWithUser[];
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, boolean>
  >({
    id: false,
    full_id: true,
    title: true,
    assignee: true,
    manager: false,
    status: true,
    date_assigned: false,
    date_completed: false,
  });
  const handleOptionChange = (name: string, checked: boolean) => {
    setSelectedOptions({
      ...selectedOptions,
      [name]: checked,
    });
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <OptionsMenu
        label="Show Columns"
        options={columns}
        selectedOptions={selectedOptions}
        onOptionChange={handleOptionChange}
      />
      <TableContainer component={Paper} sx={{ marginBottom: "75px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="task table">
          <TableHead>
            <TableRow>
              {Object.entries(selectedOptions).map(([name, checked]) => {
                if (checked) {
                  const col = columns.find((col) => col.name === name);
                  return <TableCell key={name}>{col?.label}</TableCell>;
                }
                return null;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.id}>
                  {selectedOptions.id && <TableCell>{task.id}</TableCell>}
                  {selectedOptions.full_id && (
                    <TableCell>{task.full_id}</TableCell>
                  )}
                  {selectedOptions.title && <TableCell>{task.title}</TableCell>}
                  {selectedOptions.assignee && (
                    <TableCell>{task.user.first_name}</TableCell>
                  )}
                  {selectedOptions.manager && (
                    <TableCell>{task.manager}</TableCell>
                  )}
                  {selectedOptions.status && (
                    <TableCell>
                      <StatusPill status={task.status as TaskStatus} />
                    </TableCell>
                  )}
                  {selectedOptions.date_assigned && (
                    <TableCell>
                      {task.date_assigned ? formatDate(task.date_assigned) : ""}
                    </TableCell>
                  )}
                  {selectedOptions.date_completed && (
                    <TableCell>
                      {task.date_completed
                        ? formatDate(task.date_completed)
                        : ""}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
                count={tasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTable;
