const ChatResponse = ({ response }) => {
  if (!response) return null;

  return (
    <div className=" my-4">
      <h3
        className="mb-4 text-[#2bccb4] font-[seraphon] tracking-wider text-xl"
      >
        Response from Daddy:
      </h3>
      <div
        className="fade-in"
        role="alert"
        style={{
          whiteSpace: 'pre-wrap',
          fontSize: '1.05rem',
          lineHeight: '1.7',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          padding: '24px',
          color: '#d6f5f2',
          backdropFilter: 'blur(4px)',
        }}
        dangerouslySetInnerHTML={{ __html: response }}
      />
    </div>
  );
};

export default ChatResponse;
