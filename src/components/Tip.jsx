export function TipWrapper({ children }) {
  return <div className="tip_wrapper">{children}</div>;
}

export function TipBox({ className, children }) {
  return <div className={`tip ${className}`}>{children}</div>;
}
