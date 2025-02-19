import XSvg from "../svgs/X";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Navbar = () => {
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <nav className="fixed top-0 left-0 w-full bg-black border-b border-gray-700 py-3 px-6 flex items-center justify-between z-50" style={{ marginBottom: "30px" }}>
      <Link to="/" className="flex items-center">
        <XSvg className="w-10 h-10 fill-white hover:bg-stone-900 rounded-full p-2" />
      </Link>
      <ul className="flex gap-6 items-center">
        <li>
          <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-400">
            <MdHomeFilled className="w-6 h-6" />
            <span className="hidden md:inline">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="flex items-center gap-2 text-white hover:text-gray-400">
            <IoNotifications className="w-6 h-6" />
            <span className="hidden md:inline">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/chat" className="flex items-center gap-2 text-white hover:text-gray-400">
            💬 <span className="hidden md:inline">Messages</span>
          </Link>
        </li>
        <li className="flex justify-center md:justify-start">
    <Link to="/reels" className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer">
        🎥 <span className="text-lg hidden md:block">Reels</span>
    </Link>
</li>

        <li>
          <Link to="/news" className="flex items-center gap-2 text-white hover:text-gray-400">
            📰 <span className="hidden md:inline">Global News</span>
          </Link>
        </li>
      </ul>
      {authUser && (
        <div className="flex items-center gap-4">
          <Link to={`/profile/${authUser.username}`} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={authUser?.profileImg || "/avatar-placeholder.png"} alt="Profile" />
            </div>
            <div className="hidden md:block">
              <p className="text-white font-bold text-sm">{authUser?.fullName}</p>
              <p className="text-gray-400 text-sm">@{authUser?.username}</p>
            </div>
          </Link>
          <BiLogOut className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" onClick={logout} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
