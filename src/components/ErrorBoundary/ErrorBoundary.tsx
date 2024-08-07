import { Component } from "react";
import "./ErrorBoundary.module.css";

interface ErrorProps {
  children: React.ReactNode;
}

interface ErrorState {
  getError: boolean;
}

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = {
      getError: false,
    };
  }

  static getDerivedStateFromError() {
    return { getError: true };
  }

  render() {
    return this.state.getError ? (
      <div className="error-boundary">Oops, something went wrong...</div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
