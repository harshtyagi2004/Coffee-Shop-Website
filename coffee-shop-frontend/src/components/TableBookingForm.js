import React from 'react';
import './TableBookingForm.css';

const TableBookingForm = () => {
  return (
    <div className="container mt-5 booking-form-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card booking-card">
            <div className="card-header text-center">
              <h3>Book Your Table</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="guests" className="form-label">Number of Guests</label>
                    <input type="number" className="form-control" id="guests" min="1" max="10" defaultValue="1" required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <input type="time" className="form-control" id="time" required />
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary mt-3">Reserve Table</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableBookingForm;