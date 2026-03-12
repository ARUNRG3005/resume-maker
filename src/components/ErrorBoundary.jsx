import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo: errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ff3366', background: '#fff', zIndex: 99999, position: 'relative', minHeight: '100vh' }}>
          <h1>React Runtime Error:</h1>
          <h3>{this.state.error && this.state.error.toString()}</h3>
          <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto', background: '#f4f4f5', padding: '1rem', marginTop: '1rem', color: '#000' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
