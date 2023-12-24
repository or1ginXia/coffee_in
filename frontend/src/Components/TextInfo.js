const TextInfo = ({ field, content }) => {
  return (
    <>
      <p>
        <strong>{field}:</strong> {content}
      </p>
    </>
  );
};

export default TextInfo;
