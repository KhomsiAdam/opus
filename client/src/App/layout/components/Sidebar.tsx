import { AiFillPlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Sidebar = ({ issueSearchModalOpen, issueCreateModalOpen }: any) => (
  <aside className="aside">
    <Link className="relative block left-0 mt-[20px] mb-[10px] mx-0 transition-left" to="/">
      <Logo className="inline-block ml-[8px] p-[10px] cursor-pointer user-select-none" size="28" />
    </Link>

    <div className='flex items-center relative w-full h-[42px] leading-10 pl-[64px] text-[#deebff] transition-colors cursor-pointer select-none hover:bg-[#ffffff19]' onClick={issueSearchModalOpen}>
      <AiOutlineSearch size={22} className='absolute left-[18px]' />
      <div className='relative uppercase transition-all navbar-link font-bold text-[12px]'>Search Issue</div>
    </div>

    <div className='flex items-center relative w-full h-[42px] leading-10 pl-[64px] text-[#deebff] transition-colors cursor-pointer select-none hover:bg-[#ffffff19]' onClick={issueCreateModalOpen}>
      <AiFillPlusCircle className='absolute left-[18px]' size={27} />
      <div className='relative uppercase transition-all navbar-link font-bold text-[12px]'>Create Issue</div>
    </div>
  </aside>
);

export default Sidebar;
