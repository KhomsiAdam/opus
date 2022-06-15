import { FaArrowDown, FaArrowUp, FaArrowsAltH } from 'react-icons/fa';

import { IssuePriority } from '@/App/constants/issues';

type iconOptions = {
  [key: string]: any;
};
const fontIconCodes: iconOptions = {
  'arrow-down': <FaArrowDown color="#5fbe6e" />,
  'arrow-up': <FaArrowUp color="#c94242" />,
  'arrow-left-right': <FaArrowsAltH color="#E97F33" />,
};

const IssuePriorityIcon = ({ priority, ...otherProps }: any) => {
  const iconType = [IssuePriority.LOW].includes(priority)
    ? 'arrow-down'
    : [IssuePriority.HIGH].includes(priority)
    ? 'arrow-up'
    : 'arrow-left-right';

  return <span>{fontIconCodes[iconType]}</span>;
};

export default IssuePriorityIcon;
