import React from 'react';

const ContactBar = () => {
  return (
    <div className="bg-dark text-white p-2">
      <div className="container">
        <div className="row text-center">
          {/* Delhi Locations */}
          <div className="col-md-6 mb-2 mb-md-0">
            <p className="mb-1">
              <strong>Delhi Locations:</strong>
              <span className="ms-2">Rohini,</span>
              <span className="ms-1">Pitampura,</span>
              <span className="ms-1">Dwarka</span>
            </p>
          </div>

          {/* Noida Locations */}
          <div className="col-md-6">
            <p className="mb-1">
              <strong>Noida Locations:</strong>
              <span className="ms-2">Sec 60,</span>
              <span className="ms-1">Sec 40,</span>
              <span className="ms-1">Sec 66</span>
            </p>
          </div>
        </div>
        
        {/* Mobile Number */}
        <div className="row text-center mt-2">
          <div className="col-12">
            <p className="mb-0">
              <strong>Mobile:</strong>
              <span className="ms-2">+91 98765 43210</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;