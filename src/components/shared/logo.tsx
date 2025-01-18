import Image from "next/image";
import LogoImg from "../../../public/icons/logo-1.png";

interface LogoProps {
  width?: string;
  height?: string;
}

export const Logo = ({ width = "100%", height = "100%" }: LogoProps) => {
  return (
    <div className="z-50" style={{ width, height }}>
      <Image
        src={LogoImg}
        alt="GoShop"
        className="w-full h-full object-cover overflow-visible"
      />
    </div>
  );
};
