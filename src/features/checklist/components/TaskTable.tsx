import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useCallback, useEffect, useState } from "react";
import { StatusPill } from "../../../shared/components/StatusPill";
import { TaskStatus } from "../../task/models/task";
import { TaskWithUser } from "../models/taskWithUsers";

interface Column {
  id: "id" | "full_id" | "title" | "status" | "manager" | "assignee";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "id", label: "#", minWidth: 20 },
  { id: "full_id", label: "ID", minWidth: 20 },
  { id: "title", label: "TITLE", minWidth: 170 },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
  {
    id: "manager",
    label: "Manager",
    minWidth: 100,
  },
  {
    id: "assignee",
    label: "Assignee",
    minWidth: 100,
  },
];

interface Data {
  id: number;
  full_id: string;
  title: string;
  status: string;
  manager: string;
  assignee: string;
}

function createData(
  id: number,
  full_id: string,
  title: string,
  status: string,
  manager: string,
  assignee: string
): Data {
  return { id, full_id, title, status, manager, assignee };
}

const TaskTable = ({ tasks }: { tasks: TaskWithUser[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Data[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const populateTable = useCallback(() => {
    const newRows = tasks.map((task) =>
      createData(
        task.id,
        task.full_id,
        task.title,
        task.status,
        task.manager,
        task.user.first_name
      )
    );
    setRows(newRows);
  }, [tasks]);

  useEffect(() => {
    populateTable();
  }, [populateTable, tasks]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "status") {
                        return (
                          <TableCell key={column.id}>
                            <StatusPill status={value as TaskStatus} />
                          </TableCell>
                        );
                      }
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TaskTable;
