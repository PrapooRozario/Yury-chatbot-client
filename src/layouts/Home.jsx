import { Outlet } from "react-router";
export default function Home() {
  return (
    <div className="font-display container mx-auto">
      <div className="flex items-center fixed z-50">
        <img src="/yury.svg" alt="Yury" className="w-28 h-28" />
      </div>
      <Outlet></Outlet>
    </div>
  );
}
