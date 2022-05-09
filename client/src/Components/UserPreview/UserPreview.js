import "./UserPreview.css";

const UserPreview = ({ userInfo, setUser }) => {
  const { first_name, second_name, id } = { ...userInfo };

  const handleOnClick = () => {
    const data = { userName: `${first_name} ${second_name}`, userId: id };

    setUser(data);
  };

  return (
    <div className="find-user-preview" onClick={handleOnClick}>
      <h2>{`${first_name} ${second_name}`}</h2>
    </div>
  );
};

export default UserPreview;
