import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingButton: React.FC<ButtonProps & { loading: boolean }> = ({
  loading,
  children,
  ...buttonProps
}) => {
  return (
    <Button disabled={loading} {...buttonProps}>
      {children}
      {loading && <CircularProgress size={14} />}
    </Button>
  );
};

export default LoadingButton;
