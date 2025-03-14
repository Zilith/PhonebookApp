const Notification = ({ Message, Class }) => {
  if (!Message) {
    return null;
  }
  return (
    <div className={Class}>
      {Message}
    </div>
  );
};

export default Notification;
