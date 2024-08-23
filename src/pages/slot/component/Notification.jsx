import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

interface NotificationProps {
  message: string;
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
}

const Notification: React.FC<NotificationProps> = ({ message, setMessage }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage && setMessage("");
    }, 6000);
    return () => clearTimeout(timer);
  }, [message, setMessage]);

  return (
    <>
      {/* <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            >
        <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
        >
          
                      </Alert>
      </Snackbar> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;
