import { AiFillBug } from 'react-icons/ai';
import { HiBookmark } from 'react-icons/hi';
import { FaCheckSquare } from 'react-icons/fa';

type iconOptions = {
  [key: string]: any;
};
const fontIconCodes: iconOptions = {
  bug: <AiFillBug color='#c94242' />,
  task: <FaCheckSquare color='#2b777d' />,
  story: <HiBookmark color='#5fbe6e' size={18} />,
};

const IssueTypeIcon = ({ type }: any) => <span>{fontIconCodes[type]}</span>;

export default IssueTypeIcon;
