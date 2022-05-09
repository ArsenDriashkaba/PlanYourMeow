import "./UserPreview.css";

const UserPreview = ({ name }) => {
  return (
    <div className="assign-user-preview">
      <li>{name}</li>
      <img src="" alt="IMG" />
    </div>
  );
};

export default UserPreview;
