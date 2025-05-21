import { Link } from 'react-router-dom'; 

const FooterCopyRights = () => {
  return (
    <div className="d-flex justify-content-between w-100">
      <div>© {new Date().getFullYear()} WinCity InfraWorks LLP.</div>
      <div>
        Designed & Developed BY
        <Link
          className="text-white mx-2 text-decoration-underline"
          href={`https://botdigitalsolutions.com/`}
          target="_blank"
        >
          TheBot
        </Link>
      </div>
    </div>
  );
};

export default FooterCopyRights;
