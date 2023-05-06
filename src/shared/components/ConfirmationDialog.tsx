import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  content: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title,
  content,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
