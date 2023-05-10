import { LoadingOutlined } from '@ant-design/icons';
const LoadingSpinner = () => {
  return (
    <LoadingOutlined
      style={{
        fontSize: 72,
        margin: '3rem auto',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default LoadingSpinner;
