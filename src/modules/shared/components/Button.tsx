interface ButtonProps {
  onClick: () => void
  text: string
}
export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className="bg-blue-300" onClick={onClick}>
      {text}
    </button>
  )
}
