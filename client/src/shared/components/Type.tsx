import { IssueType, IssueTypeCopy } from '@/App/constants/issues';
import IssueTypeIcon from './IssueTypeIcon';
import Button from './Button';
import Select from './Select';

const Type = ({ issue, updateIssue }: any) => (
  <Select
    variant="empty"
    dropdownWidth={150}
    withClearValue={false}
    name="type"
    value={issue.type}
    options={Object.values(IssueType).map((type) => ({
      value: type,
      label: IssueTypeCopy[type],
    }))}
    onChange={(type: any) => updateIssue({ type })}
    renderValue={({ value: type }: any) => (
      <Button className="uppercase inline-flex items-center tracking-[0.5px] text-[#5E6C84] text-[13px]" icon={<IssueTypeIcon type={type} />}>
        {`${IssueTypeCopy[type]}-${issue._id}`}
      </Button>
    )}
    renderOption={({ value: type }: any) => (
      <div className="flex items-center" key={type} onClick={() => updateIssue({ type })}>
        <IssueTypeIcon type={type} top={1} />
        <div className="text-[15px] py-0 pr-[5px] pl-[7px]">{IssueTypeCopy[type]}</div>
      </div>
    )}
  />
);

export default Type;
