const Avatar = ({ avatarUrl, name, size }: any) => {
  if (avatarUrl) {
    return (
      <div className="avatar">
        <img className="inline-block object-cover w-[32px] h-[32px] rounded-full" src={avatarUrl} alt={name} />
      </div>
    );
  }

  return (
    <div
      className={`avatar inline-block w-[32px] h-[32px] rounded-full text-[CircularStdMedium] uppercase text-white bg-${getColorFromName(
        name,
      )} flex items-center justify-center h-full`}
    >
      {name.charAt(0)}
    </div>
  );
};

// const colors = ['#DA7657', '#6ADA57', '#5784DA', '#AA57DA', '#DA5757', '#DA5792', '#57DACA', '#57A5DA'];
const colors = ['primary-500', 'primary-500', 'primary-500', 'primary-500', 'primary-500', 'primary-500', 'primary-500', 'primary-500'];

const getColorFromName = (name: any) => colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length];

export default Avatar;
