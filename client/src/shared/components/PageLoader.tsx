import StyledSpinner from '@/shared/components/StyledSpinner';


const PageLoader = () => (
  <div className='w-full py-[200px] px-0 text-center'>
    <StyledSpinner size={70} />
  </div>
);

export default PageLoader;
