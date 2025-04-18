// /components/UserCard.jsx

import { UserCircleIcon } from '@heroicons/react/24/solid';

const UserCard = ({ user }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <UserCircleIcon className="h-16 w-16 text-blue-500" />
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.specialization}</p>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
