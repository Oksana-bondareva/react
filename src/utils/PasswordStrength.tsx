import { PasswordStrengthProps } from "../Modal/Interfaces";

const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  return score;
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const score = calculatePasswordStrength(password);
  const num = (score * 100) / 5;

  const progressColor = () => {
    switch (score) {
      case 0:
        return "#e20b07";
      case 1:
        return "#EFE84A";
      case 2:
        return "#ffbf00";
      case 3:
        return "#0b75ed";
      case 4:
        return "#8BEF4A";
      case 5:
        return "#329A60";
      default:
        return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: progressColor(),
    height: "7px",
    margin: "0",
  });

  return (
    <div className="password-strength-progress" style={changePasswordColor()} />
  );
};

export default PasswordStrength;
