import Image from "next/image";
import ReactIcon from "./icons/react-icon";

const Header = () => {
  return (
    <header className="flex w-full gap-2 bg-primary-2 border-b border-primary-3 items-center justify-center py-2">
      <ReactIcon className="size-14 " />
      <h1 className=" text-2xl"> React Quiz</h1>
    </header>
  );
};

export default Header;
