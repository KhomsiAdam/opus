import { AiFillBug } from 'react-icons/ai';

const PageError = () => (
  <div className="p-[64px]">
    <div className="mx-auto max-w-[1440px] py-[200px] px-0">
      <div className="relative mx-auto max-w-[480px] p-[32px] rounded-[3px] border border-solid error-box">
        <AiFillBug className="absolute top-[32px] left-[32px] text-[30px] text-primary-500" />
        <h1 className='mb-[16px] pl-[42px] text-[29px]'>There’s been a glitch…</h1>
        <p>
          {'We’re not quite sure what went wrong. Please contact us or try looking on our '}
          <a href="https://support.atlassian.com/jira-software-cloud/">Help Center</a>
          {' if you need a hand.'}
        </p>
      </div>
    </div>
  </div>
);

export default PageError;
