const CreateHeader = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid justify-content-between">
        <button className="btn btn-light" type="button">
          Cancel
        </button>
        <button className="btn btn-secondary" type="button">
          Post
        </button>
      </div>
    </nav>
  );
};

export default CreateHeader;
