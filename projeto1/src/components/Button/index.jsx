import "./style.css";

export const Button = ({ children, onClick, disabled }) => (
  <button disabled={disabled} onClick={onClick} className="button-default">
    {children}
  </button>
);
