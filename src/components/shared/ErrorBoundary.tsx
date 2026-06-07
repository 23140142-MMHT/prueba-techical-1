"use client";

import * as React from "react";

/**
 * ErrorBoundary genérico: si algo falla al renderizar sus hijos (por ejemplo,
 * el modelo .glb no existe todavía o está corrupto), muestra `fallback` en vez
 * de tumbar toda la página.
 */
interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Útil para depurar en consola si el modelo no carga.
    console.error("[ErrorBoundary]", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
