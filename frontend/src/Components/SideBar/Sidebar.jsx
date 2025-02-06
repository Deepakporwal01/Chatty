import Conversations from  "../SideBar/Conversations";
import LogoutButton from "../SideBar/LogoutButton";
import SearchInput from "../SideBar/SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;