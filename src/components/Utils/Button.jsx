export const Button = ({ text, bgcolor, color }) => {
     const basic = "px-4 py-4 rounded-md transition w-full";
  
    return (
      <button className={`${basic} ${bgcolor} ${color}`}>
        {text}
      </button>
    );
  };